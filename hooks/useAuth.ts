import { AuthContextValue, useAuth as useAuthContext } from '@/contexts/AuthContext';

export default function useAuth(): AuthContextValue {
  return useAuthContext();
}

export const loginWithGoogle = async () => {
  try {
    const svc = await import('@/services/googleAuth');
    if (svc && typeof svc.signInWithGoogleAsync === 'function') {
      return svc.signInWithGoogleAsync();
    }
    return { success: false, error: 'Google auth service not available' };
  } catch (e: any) {
    return { success: false, error: e?.message || String(e) };
  }
};

export const logout = async () => {
  try {
    const authSvc = await import('@/services/authService');
    if (authSvc && typeof authSvc.signOut === 'function') {
      return authSvc.signOut();
    }
    return { success: false, error: 'Auth signOut not available' };
  } catch (e: any) {
    return { success: false, error: e?.message || String(e) };
  }
};

export { useAuth as useAuthContext } from '@/contexts/AuthContext';
