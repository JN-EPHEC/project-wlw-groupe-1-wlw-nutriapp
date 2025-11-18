// Service pour l'authentification Google avec Expo
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

// Configuration Google OAuth
const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

// Client ID Google - À configurer dans Google Cloud Console
// Utilisez le Client ID Web de votre projet Firebase
// Format: XXXX-XXXX.apps.googleusercontent.com
const clientId = '733851079907-XXXX.apps.googleusercontent.com'; // À remplacer

// S'assurer que WebBrowser est fermé correctement
WebBrowser.maybeCompleteAuthSession();

/**
 * Authentification Google
 */
export const signInWithGoogleAsync = async () => {
  try {
    const redirectUri = AuthSession.makeRedirectUri({
      scheme: 'nutriadapt',
      path: 'oauth',
    });

    const request = new AuthSession.AuthRequest({
      clientId: clientId,
      scopes: ['openid', 'profile', 'email'],
      responseType: AuthSession.ResponseType.IdToken,
      redirectUri: redirectUri,
      usePKCE: false,
    });

    const result = await request.promptAsync(discovery, {
      useProxy: true,
    });

    if (result.type === 'success') {
      const { id_token } = result.params;
      return { success: true, idToken: id_token };
    } else {
      return { success: false, error: 'Authentication cancelled' };
    }
  } catch (error) {
    console.error('Error with Google auth:', error);
    return { success: false, error: error.message };
  }
};

