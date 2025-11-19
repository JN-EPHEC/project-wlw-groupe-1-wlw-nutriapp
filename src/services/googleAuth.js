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

// Client ID Google - Configuré
const clientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '733851079907-bjh187gghn3emjddgsvjo935c3c5f3cl.apps.googleusercontent.com';

// S'assurer que WebBrowser est fermé correctement
WebBrowser.maybeCompleteAuthSession();

/**
 * Authentification Google
 */
export const signInWithGoogleAsync = async () => {
  try {
    console.log('🔵 signInWithGoogleAsync démarré');
    console.log('🔵 Client ID:', clientId ? `${clientId.substring(0, 20)}...` : 'NON DÉFINI');
    
    // Vérifier que le Client ID est configuré
    if (clientId.includes('XXXX') || !clientId || clientId === '') {
      const errorMsg = `Client ID Google non configuré.

📋 INSTRUCTIONS RAPIDES :
1. Allez sur : https://console.firebase.google.com/project/nutriadapt-c55e1/settings/general
2. Faites défiler jusqu'à "Your apps" > Cliquez sur votre app web (ou créez-en une)
3. Copiez le "OAuth 2.0 Client ID" (format: XXXX-XXXX.apps.googleusercontent.com)
4. Créez un fichier .env à la racine avec :
   EXPO_PUBLIC_GOOGLE_CLIENT_ID=VOTRE-CLIENT-ID
   
   OU modifiez directement src/services/googleAuth.js ligne 18`;
      console.error('❌', errorMsg);
      return { 
        success: false, 
        error: errorMsg
      };
    }

    const redirectUri = AuthSession.makeRedirectUri({
      scheme: 'nutriadapt',
      path: 'oauth',
    });
    console.log('🔵 Redirect URI:', redirectUri);

    // Générer un nonce pour la sécurité (requis pour response_type=id_token)
    const generateNonce = () => {
      const array = new Uint8Array(16);
      if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        crypto.getRandomValues(array);
      } else {
        // Fallback pour les environnements sans crypto
        for (let i = 0; i < array.length; i++) {
          array[i] = Math.floor(Math.random() * 256);
        }
      }
      return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    };
    
    const nonce = generateNonce();
    console.log('🔵 Nonce généré:', nonce.substring(0, 20) + '...');

    const request = new AuthSession.AuthRequest({
      clientId: clientId,
      scopes: ['openid', 'profile', 'email'],
      responseType: AuthSession.ResponseType.IdToken,
      redirectUri: redirectUri,
      usePKCE: false, // PKCE n'est pas compatible avec nonce pour id_token
      extraParams: {
        nonce: nonce, // Nonce requis pour response_type=id_token
      },
    });
    
    // Stocker le nonce pour vérification après la redirection
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('google_oauth_nonce', nonce);
    }

    console.log('🔵 Ouverture du navigateur pour authentification...');
    
    // Sur le web, utiliser une redirection complète de page
    if (Platform.OS === 'web') {
      console.log('🔵 Mode web détecté - redirection complète de page');
      try {
        // Créer l'URL d'autorisation
        const authUrl = await request.makeAuthUrlAsync(discovery);
        console.log('🔵 URL d\'autorisation:', authUrl);
        console.log('🔵 Redirection vers Google...');
        
        // Stocker l'état dans sessionStorage pour le récupérer après la redirection
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('google_oauth_state', request.state || '');
          sessionStorage.setItem('google_oauth_redirect_uri', redirectUri);
        }
        
        // Rediriger complètement vers Google
        window.location.href = authUrl;
        
        // Cette ligne ne sera jamais atteinte
        return { success: false, error: 'Redirection en cours...' };
      } catch (error) {
        console.error('❌ Erreur lors de la génération de l\'URL:', error);
        return { success: false, error: error.message || 'Erreur lors de la préparation de l\'authentification' };
      }
    }
    
    // Pour mobile, utiliser la popup normale avec proxy
    const useProxy = true;
    console.log('🔵 useProxy:', useProxy, 'Platform:', Platform.OS);
    const result = await request.promptAsync(discovery, {
      useProxy: useProxy,
    });

    console.log('🔵 Résultat de promptAsync:', JSON.stringify(result, null, 2));
    console.log('🔵 Type de résultat:', result.type);
    console.log('🔵 Params:', result.params);
    console.log('🔵 Error:', result.error);

    if (result.type === 'success') {
      const { id_token } = result.params;
      if (!id_token) {
        console.error('❌ Pas de id_token dans les params:', result.params);
        return { success: false, error: 'Token non reçu. Vérifiez la configuration OAuth.' };
      }
      console.log('✅ Token reçu avec succès');
      return { success: true, idToken: id_token };
    } else if (result.type === 'cancel') {
      console.log('⚠️ Authentification annulée par l\'utilisateur');
      return { success: false, error: 'Authentification annulée' };
    } else if (result.type === 'dismiss') {
      console.log('⚠️ Fenêtre d\'authentification fermée (dismiss)');
      // Sur le web, "dismiss" peut signifier que la popup a été bloquée
      return { 
        success: false, 
        error: 'La fenêtre d\'authentification a été fermée. Vérifiez que les popups ne sont pas bloquées dans votre navigateur.' 
      };
    } else if (result.type === 'error') {
      const errorMsg = result.error?.message || result.error?.error_description || JSON.stringify(result.error);
      console.error('❌ Erreur d\'authentification:', errorMsg);
      console.error('❌ Détails complets:', result);
      return { success: false, error: `Erreur OAuth: ${errorMsg}` };
    } else {
      console.error('❌ Type de résultat inattendu:', result.type);
      console.error('❌ Résultat complet:', result);
      return { success: false, error: `Type de résultat inattendu: ${result.type}. Vérifiez la console pour plus de détails.` };
    }
  } catch (error) {
    console.error('❌ Exception dans signInWithGoogleAsync:', error);
    return { success: false, error: error.message || 'Erreur lors de l\'authentification Google' };
  }
};

