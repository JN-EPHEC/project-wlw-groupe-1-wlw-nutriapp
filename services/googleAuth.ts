import * as AuthSession from 'expo-auth-session';
import Constants from 'expo-constants';
import * as Crypto from 'expo-crypto';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

// Token exchange helper (Authorization Code + PKCE)
import { exchangeCodeAsync } from 'expo-auth-session';

const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

const DEFAULT_EXPO_CLIENT_ID = '733851079907-bjh187gghn3emjddgsvjo935c3c5f3cl.apps.googleusercontent.com';

const expoClientId = process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID ?? process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID;
const iosClientId = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;
const androidClientId = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID;
const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ?? process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID;

const getProjectNameForProxy = (): string | null => {
  const explicit = process.env.EXPO_PUBLIC_EXPO_PROJECT_FULL_NAME;
  if (explicit) {
    const trimmed = explicit.trim();
    if (trimmed.startsWith('@')) {
      return trimmed;
    }
    // Allow "username/slug" format
    if (trimmed.includes('/')) {
      return `@${trimmed.replace(/^@/, '')}`;
    }
  }

  // IMPORTANT: Expo cannot generate https://auth.expo.io/@owner/slug without a real owner.
  // Do not fallback to "anonymous" because it often causes makeRedirectUri to fall back to exp://...,
  // which Google rejects for Web OAuth clients.
  const owner = Constants.expoConfig?.owner;
  const slug = Constants.expoConfig?.slug;
  if (!owner || !slug) {
    return null;
  }

  return `@${owner}/${slug}`;
};

const isExpoGo = () => {
  const ownership = Constants.appOwnership;
  return ownership === 'expo' || ownership === 'guest';
};

const resolveClientId = (useProxy: boolean) => {
  if (Platform.OS === 'web') {
    return webClientId ?? DEFAULT_EXPO_CLIENT_ID;
  }

  if (useProxy) {
    return expoClientId ?? webClientId ?? DEFAULT_EXPO_CLIENT_ID;
  }

  if (Platform.OS === 'ios') {
    return iosClientId ?? null;
  }

  if (Platform.OS === 'android') {
    return androidClientId ?? null;
  }

  return null;
};

WebBrowser.maybeCompleteAuthSession();

type GoogleAuthResult = {
  success: boolean;
  idToken?: string;
  error?: string;
};

export const signInWithGoogleAsync = async (): Promise<GoogleAuthResult> => {
  const useProxy = isExpoGo();
  const clientId = resolveClientId(useProxy);

  const projectNameForProxy = useProxy ? getProjectNameForProxy() : null;

  console.log('[GoogleAuth] platform:', Platform.OS, 'appOwnership:', Constants.appOwnership);
  if (useProxy) {
    console.log('[GoogleAuth] projectNameForProxy:', projectNameForProxy);
  }

  if (!clientId) {
    return {
      success: false,
      error:
        "Client ID Google non configuré pour l'application native. Configurez EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID (Android) et/ou EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID (iOS).",
    };
  }

  if (Platform.OS === 'web') {
    return {
      success: false,
      error:
        "L'authentification Google via Expo AuthSession est restreinte sur le web. Utilisez plutôt l'application native ou ajoutez une implémentation spécifique web.",
    };
  }

  if (useProxy && !projectNameForProxy) {
    return {
      success: false,
      error:
        'Expo Go requiert une redirect URI proxy de forme https://auth.expo.io/@owner/slug. ' +
        'Ajoutez votre username Expo dans app.json (expo.owner) OU définissez EXPO_PUBLIC_EXPO_PROJECT_FULL_NAME=@username/Project-BA, puis redémarrez Expo (--clear).',
    };
  }

  let redirectUri = useProxy
    ? AuthSession.makeRedirectUri({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        useProxy: true,
        projectNameForProxy: projectNameForProxy ?? undefined,
      })
    : AuthSession.makeRedirectUri({ scheme: 'nutriadapt', path: 'oauth' });

  // Hard fallback: if Expo still returns exp://..., force the correct https proxy URL.
  // This prevents Google "invalid_request" on Expo Go.
  if (useProxy && redirectUri.startsWith('exp://') && projectNameForProxy) {
    redirectUri = `https://auth.expo.io/${projectNameForProxy}`;
  }

  const nonce = Crypto.randomUUID();

  // Expo Go + auth.expo.io:
  // Use the implicit `id_token` flow to avoid exchanging an authorization code on-device.
  // Google often treats Web OAuth clients as confidential (client_secret required) for code exchange,
  // which breaks in a public client like Expo Go.
  if (useProxy) {
    const request = new AuthSession.AuthRequest({
      clientId,
      scopes: ['openid', 'profile', 'email'],
      responseType: AuthSession.ResponseType.IdToken,
      redirectUri,
      // Google rejects PKCE params for implicit/hybrid id_token-only responses.
      usePKCE: false,
      extraParams: {
        nonce,
        prompt: 'select_account',
      },
    });

    console.log('[GoogleAuth] (ExpoGo) clientId:', clientId);
    console.log('[GoogleAuth] (ExpoGo) useProxy:', useProxy, 'redirectUri:', redirectUri);

    const result = await request.promptAsync(
      discovery,
      ({
        useProxy,
        projectNameForProxy: projectNameForProxy ?? undefined,
      } as unknown) as any
    );

    console.log('[GoogleAuth] (ExpoGo) resultType:', result.type);
    if (result.type !== 'success') {
      console.log('[GoogleAuth] (ExpoGo) result:', JSON.stringify(result));
    }

    if (result.type === 'success') {
      const idToken = (result.params as any)?.id_token;
      if (!idToken) {
        return { success: false, error: 'id_token non reçu. Vérifiez la configuration OAuth (redirect URI / client_id).' };
      }
      return { success: true, idToken };
    }

    if (result.type === 'cancel') {
      return { success: false, error: "Authentification annulée par l'utilisateur" };
    }

    if (result.type === 'dismiss') {
      return { success: false, error: "Fenêtre d'authentification fermée" };
    }

    if (result.type === 'error') {
      const anyResult = result as any;
      const errorCode = anyResult?.params?.error ?? anyResult?.errorCode ?? anyResult?.error?.code;
      const errorDescription = anyResult?.params?.error_description ?? anyResult?.error?.message;

      if (errorCode === 'redirect_uri_mismatch') {
        return {
          success: false,
          error:
            'Google OAuth: redirect_uri_mismatch. Ajoutez exactement cette URL dans Google Cloud → Authorized redirect URIs: ' +
            redirectUri,
        };
      }

      if (errorCode === 'invalid_client') {
        return {
          success: false,
          error:
            'Google OAuth: invalid_client. Vérifiez que EXPO_PUBLIC_GOOGLE_CLIENT_ID (Web client) correspond au client_id configuré dans Google Cloud/Firebase.',
        };
      }

      const message = errorDescription ?? 'Erreur inconnue';
      return { success: false, error: `Erreur OAuth${errorCode ? ` (${errorCode})` : ''}: ${message}` };
    }

    return { success: false, error: `Type de résultat inattendu: ${result.type}` };
  }

  // Use Authorization Code + PKCE because it is the most reliable flow on Expo Go
  // when using the auth.expo.io proxy (some browsers block implicit/hybrid responses).
  const request = new AuthSession.AuthRequest({
    clientId,
    scopes: ['openid', 'profile', 'email'],
    responseType: AuthSession.ResponseType.Code,
    redirectUri,
    usePKCE: true,
    extraParams: {
      nonce,
      prompt: 'select_account',
    },
  });

  console.log('[GoogleAuth] clientId:', clientId);
  console.log('[GoogleAuth] useProxy:', useProxy, 'redirectUri:', redirectUri);
  const result = await request.promptAsync(
    discovery,
    ({
      useProxy,
      projectNameForProxy: projectNameForProxy ?? undefined,
    } as unknown) as any
  );

  // Always log the result type for troubleshooting Expo Go / auth.expo.io issues.
  // (Some failures happen before params are returned.)
  console.log('[GoogleAuth] resultType:', result.type);
  if (result.type !== 'success') {
    console.log('[GoogleAuth] result:', JSON.stringify(result));
  }

  if (result.type === 'success') {
    const code = result.params?.code;
    if (!code) {
      return { success: false, error: 'Code OAuth non reçu. Vérifiez la configuration OAuth.' };
    }

    try {
      const tokenResponse = await exchangeCodeAsync(
        {
          clientId,
          code,
          redirectUri,
          extraParams: {
            // Required for PKCE
            code_verifier: request.codeVerifier ?? '',
          },
        },
        { tokenEndpoint: discovery.tokenEndpoint }
      );

      const idToken = (tokenResponse as any)?.idToken ?? (tokenResponse as any)?.id_token;
      if (!idToken) {
        console.log('[GoogleAuth] tokenResponse:', JSON.stringify(tokenResponse));
        return { success: false, error: 'id_token non reçu lors de l’échange de code. Vérifiez OAuth.' };
      }

      return { success: true, idToken };
    } catch (e: any) {
      const message = e?.message ?? String(e);
      console.log('[GoogleAuth] exchangeCodeAsync error:', message);
      return { success: false, error: `Échange de code OAuth impossible: ${message}` };
    }
  }

  if (result.type === 'cancel') {
    return { success: false, error: "Authentification annulée par l'utilisateur" };
  }

  if (result.type === 'dismiss') {
    return { success: false, error: "Fenêtre d'authentification fermée" };
  }

  if (result.type === 'error') {
    // `error` may be an AuthError instance, but structure varies by platform.
    const anyResult = result as any;
    const errorCode = anyResult?.params?.error ?? anyResult?.errorCode ?? anyResult?.error?.code;
    const errorDescription = anyResult?.params?.error_description ?? anyResult?.error?.message;

    if (errorCode === 'state_mismatch') {
      return {
        success: false,
        error:
          "Erreur OAuth (state_mismatch). Le navigateur semble bloquer les cookies/le stockage requis par auth.expo.io (fréquent avec Brave). Essayez avec Chrome ou désactivez les protections pour auth.expo.io, puis relancez l'auth.",
      };
    }

    const message = errorDescription ?? 'Erreur inconnue';
    return { success: false, error: `Erreur OAuth${errorCode ? ` (${errorCode})` : ''}: ${message}` };
  }

  return { success: false, error: `Type de résultat inattendu: ${result.type}` };
};
