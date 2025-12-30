import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';

import {
    AuthResponse,
    BasicResponse,
    onAuthStateChange,
    resetPassword as resetPasswordRequest,
    signInWithEmail,
    signInWithGoogle,
    signOut,
    signUpWithEmail,
} from '@/services/authService';
import { signInWithGoogleAsync } from '@/services/googleAuth';
import { getPatientProfile, updatePatientProfile } from '@/services/userService';

export type AuthUser = {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
};

export type UserProfile = Record<string, unknown> | null;

export type AuthActionResult = {
  success: boolean;
  error?: string;
};

export type AuthContextValue = {
  isLoggedIn: boolean;
  user: AuthUser | null;
  userProfile: UserProfile;
  loading: boolean;
  signup: (email: string, password: string, profileData?: Record<string, unknown>) => Promise<AuthActionResult>;
  login: (email: string, password: string) => Promise<AuthActionResult>;
  loginWithGoogle: () => Promise<AuthActionResult>;
  logout: () => Promise<AuthActionResult>;
  resetPassword: (email: string) => Promise<AuthActionResult>;
  updateUserProfile: (profileData: Record<string, unknown>) => Promise<AuthActionResult>;
  loadUserProfile: (uid?: string) => Promise<AuthActionResult>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function mapFirebaseUser(firebaseUser: any): AuthUser {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
  };
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}

function toActionResult(response: AuthResponse | BasicResponse): AuthActionResult {
  return {
    success: response.success,
    error: response.error,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>(null);
  const [loading, setLoading] = useState(true);

  const loadUserProfile = useCallback(
    async (uid?: string): Promise<AuthActionResult> => {
      const targetUid = uid ?? user?.uid;
      if (!targetUid) {
        return { success: false, error: 'Utilisateur non connecté' };
      }

      try {
        const profileResult = await getPatientProfile(targetUid);
        if (profileResult.success) {
          const data = profileResult.data as Record<string, unknown>;
          const nestedProfile = (data?.profile ?? null) as Record<string, unknown> | null;

          if (
            nestedProfile &&
            Object.prototype.hasOwnProperty.call(nestedProfile, 'hasCompletedOnboarding') &&
            !Object.prototype.hasOwnProperty.call(data, 'hasCompletedOnboarding')
          ) {
            data.hasCompletedOnboarding = nestedProfile.hasCompletedOnboarding;
          }

          if (
            nestedProfile &&
            Object.prototype.hasOwnProperty.call(nestedProfile, 'completedAt') &&
            !Object.prototype.hasOwnProperty.call(data, 'completedAt')
          ) {
            data.completedAt = nestedProfile.completedAt;
          }

          setUserProfile(data);
          return { success: true };
        }

        setUserProfile(null);
        return { success: false, error: profileResult.error };
      } catch (error: any) {
        setUserProfile(null);
        return { success: false, error: error?.message ?? 'Impossible de charger le profil' };
      }
    },
    [user?.uid]
  );

  const handleAuthState = useCallback(
    async (firebaseUser: any | null) => {
      if (firebaseUser) {
        const mappedUser = mapFirebaseUser(firebaseUser);
        setUser(mappedUser);
        setIsLoggedIn(true);
        await loadUserProfile(mappedUser.uid);
      } else {
        setUser(null);
        setUserProfile(null);
        setIsLoggedIn(false);
      }
      setLoading(false);
    },
    [loadUserProfile]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChange(handleAuthState);
    return () => unsubscribe?.();
  }, [handleAuthState]);

  const signup = useCallback(
    async (email: string, password: string, profileData: Record<string, unknown> = {}) => {
      const response = await signUpWithEmail(email, password, profileData);
      if (response.success && response.user) {
        const mappedUser = mapFirebaseUser(response.user);
        setUser(mappedUser);
        setIsLoggedIn(true);
        await loadUserProfile(mappedUser.uid);
      }
      return toActionResult(response);
    },
    [loadUserProfile]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      const response = await signInWithEmail(email, password);
      if (response.success && response.user) {
        const mappedUser = mapFirebaseUser(response.user);
        setUser(mappedUser);
        setIsLoggedIn(true);
        await loadUserProfile(mappedUser.uid);
      }
      return toActionResult(response);
    },
    [loadUserProfile]
  );

  const loginWithGoogle = useCallback(async () => {
    try {
      console.log('[Auth] loginWithGoogle start', { platform: Platform.OS });
      if (Platform.OS === 'web') {
        const response = await signInWithGoogle();
        console.log('[Auth] web signInWithGoogle response:', JSON.stringify(response));
        if (response.success && response.user) {
          const mappedUser = mapFirebaseUser(response.user);
          setUser(mappedUser);
          setIsLoggedIn(true);
          await loadUserProfile(mappedUser.uid);
        }
        return toActionResult(response);
      }

      const googleResult = await signInWithGoogleAsync();
      console.log('[Auth] native googleResult:', JSON.stringify(googleResult));
      if (!googleResult.success || !googleResult.idToken) {
        return {
          success: false,
          error: googleResult.error ?? 'Connexion Google annulée',
        };
      }

      const response = await signInWithGoogle(googleResult.idToken);
      console.log('[Auth] firebase signInWithGoogle response:', JSON.stringify(toActionResult(response)));
      if (response.success && response.user) {
        const mappedUser = mapFirebaseUser(response.user);
        setUser(mappedUser);
        setIsLoggedIn(true);
        await loadUserProfile(mappedUser.uid);
      }
      return toActionResult(response);
    } catch (error: any) {
      const message = error?.message ?? 'Erreur inattendue lors de la connexion Google';
      console.log('[Auth] loginWithGoogle exception:', message);
      return { success: false, error: message };
    }
  }, [loadUserProfile]);

  const logout = useCallback(async () => {
    const response = await signOut();
    await AsyncStorage.clear();
    setUser(null);
    setUserProfile(null);
    setIsLoggedIn(false);
    return toActionResult(response);
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    const response = await resetPasswordRequest(email);
    return toActionResult(response);
  }, []);

  const updateUserProfile = useCallback(
    async (profileData: Record<string, unknown>) => {
      if (!user?.uid) {
        return { success: false, error: 'Utilisateur non connecté' };
      }

      try {
        const result = await updatePatientProfile(user.uid, profileData);
        if (result.success) {
          const nextProfile: Record<string, unknown> = {
            ...(userProfile ?? {}),
            profile: profileData,
          };

          if (Object.prototype.hasOwnProperty.call(profileData, 'hasCompletedOnboarding')) {
            nextProfile.hasCompletedOnboarding = Boolean(profileData.hasCompletedOnboarding);
          }

          if (Object.prototype.hasOwnProperty.call(profileData, 'completedAt')) {
            nextProfile.completedAt = profileData.completedAt;
          }
          setUserProfile(nextProfile);
          return { success: true };
        }
        return { success: false, error: result.error };
      } catch (error: any) {
        return { success: false, error: error?.message ?? 'Impossible de mettre à jour le profil' };
      }
    },
    [user?.uid, userProfile]
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoggedIn,
      user,
      userProfile,
      loading,
      signup,
      login,
      loginWithGoogle,
      logout,
      resetPassword,
      updateUserProfile,
      loadUserProfile,
    }),
    [isLoggedIn, user, userProfile, loading, signup, login, loginWithGoogle, logout, resetPassword, updateUserProfile, loadUserProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
