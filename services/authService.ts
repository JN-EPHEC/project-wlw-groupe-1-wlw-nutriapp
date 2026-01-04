import {
    AuthError,
    AuthErrorCodes,
    GoogleAuthProvider,
    User,
    createUserWithEmailAndPassword,
  deleteUser,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithCredential,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
import { Platform } from 'react-native';
import { auth } from './firebase';
import { createPatientProfile } from './userService';

export type AuthResponse = {
  success: boolean;
  user?: User;
  error?: string;
};

export type BasicResponse = {
  success: boolean;
  error?: string;
};

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  [AuthErrorCodes.EMAIL_EXISTS]: 'Un compte est déjà associé à cette adresse email.',
  [AuthErrorCodes.INVALID_EMAIL]: 'Adresse email invalide. Vérifiez le format saisi.',
  [AuthErrorCodes.WEAK_PASSWORD]: 'Le mot de passe doit contenir au moins 6 caractères.',
  [AuthErrorCodes.USER_DELETED]: 'Aucun compte trouvé avec cet email.',
  [AuthErrorCodes.INVALID_PASSWORD]: 'Mot de passe incorrect.',
  [AuthErrorCodes.USER_DISABLED]: 'Ce compte utilisateur est désactivé.',
  [AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER]:
    'Trop de tentatives. Veuillez réessayer plus tard.',
  [AuthErrorCodes.INVALID_IDP_RESPONSE]: 'Le jeton Google est invalide ou expiré.',
  'auth/popup-closed-by-user': "La fenêtre Google s'est fermée avant la validation.",
  'auth/cancelled-popup-request': 'Une autre fenêtre de connexion est déjà ouverte.',
  'auth/popup-blocked': 'Le navigateur a bloqué la fenêtre de connexion Google.',
  'auth/requires-recent-login': 'Veuillez vous reconnecter avant de supprimer votre compte.',
};

const mapAuthError = (fallback: string) => (error: unknown) => {
  const authError = error as AuthError | undefined;
  if (authError?.code && AUTH_ERROR_MESSAGES[authError.code]) {
    return AUTH_ERROR_MESSAGES[authError.code];
  }
  if (authError?.message) {
    return authError.message;
  }
  return fallback;
};

export const signUpWithEmail = async (
  email: string,
  password: string,
  userData: Record<string, unknown> = {}
): Promise<AuthResponse> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await createPatientProfile(user.uid, {
      ...userData,
      email: user.email,
    });

    return { success: true, user };
  } catch (error: any) {
    console.error('Error signing up:', error);
    return { success: false, error: mapAuthError('Impossible de créer le compte.')(error) };
  }
};

export const signInWithEmail = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    console.error('Error signing in:', error);
    return { success: false, error: mapAuthError('Impossible de se connecter.')(error) };
  }
};

export const signInWithGoogle = async (idToken?: string): Promise<AuthResponse> => {
  try {
    let userCredential;

    if (Platform.OS === 'web') {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      userCredential = await signInWithPopup(auth, provider);
    } else {
      if (!idToken) {
        return {
          success: false,
          error: 'Jeton Google manquant. Relancez la procédure de connexion.',
        };
      }
      const credential = GoogleAuthProvider.credential(idToken);
      userCredential = await signInWithCredential(auth, credential);
    }

    const user = userCredential.user;

    try {
      await createPatientProfile(user.uid, {
        email: user.email,
        displayName: user.displayName,
      });
    } catch (profileError) {
      console.log('Profile may already exist:', profileError);
    }

    return { success: true, user };
  } catch (error: any) {
    console.error('Error signing in with Google:', error);
    return { success: false, error: mapAuthError('Connexion Google impossible.')(error) };
  }
};

export const signOut = async (): Promise<BasicResponse> => {
  try {
    await firebaseSignOut(auth);
    return { success: true };
  } catch (error: any) {
    console.error('Error signing out:', error);
    return { success: false, error: mapAuthError('Déconnexion impossible.')(error) };
  }
};

export const deleteAccount = async (): Promise<BasicResponse> => {
  try {
    const current = auth.currentUser;
    if (!current) {
      return { success: false, error: 'Utilisateur non connecté' };
    }
    await deleteUser(current);
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting account:', error);
    return { success: false, error: mapAuthError('Suppression du compte impossible.')(error) };
  }
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const resetPassword = async (email: string): Promise<BasicResponse> => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: any) {
    console.error('Error sending password reset email:', error);
    return {
      success: false,
      error: mapAuthError("Impossible d'envoyer l'email de réinitialisation.")(error),
    };
  }
};
