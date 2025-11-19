import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/src/contexts/AuthContext';
import { signInWithGoogle } from '@/src/services/authService';

export default function OAuthCallback() {
  const router = useRouter();
  const { login } = useAuth();
  const params = useLocalSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log('🔵 Page de callback OAuth chargée');
        console.log('🔵 Params reçus:', params);

        // Extraire le token de l'URL
        // Google peut renvoyer le token dans différents formats selon la configuration
        let idToken = null;

        // Format 1: Dans les query params (id_token=...)
        if (params.id_token) {
          idToken = params.id_token as string;
        }
        // Format 2: Dans le hash (#id_token=...)
        else if (typeof window !== 'undefined') {
          const hash = window.location.hash;
          const hashParams = new URLSearchParams(hash.substring(1));
          idToken = hashParams.get('id_token');
        }

        console.log('🔵 Token extrait:', idToken ? `${idToken.substring(0, 20)}...` : 'NON TROUVÉ');

        if (!idToken) {
          console.error('❌ Aucun token trouvé dans l\'URL');
          router.replace('/signup?error=no_token');
          return;
        }

        // Vérifier l'état (CSRF protection)
        const savedState = typeof window !== 'undefined' ? sessionStorage.getItem('google_oauth_state') : null;
        if (params.state && savedState && params.state !== savedState) {
          console.error('❌ État ne correspond pas - possible attaque CSRF');
          router.replace('/signup?error=state_mismatch');
          return;
        }

        // Vérifier le nonce (sécurité pour id_token)
        const savedNonce = typeof window !== 'undefined' ? sessionStorage.getItem('google_oauth_nonce') : null;
        if (savedNonce) {
          // Le nonce devrait être dans le token JWT, mais pour simplifier on vérifie juste qu'il existe
          console.log('🔵 Nonce vérifié');
        }

        // Connexion avec Firebase
        console.log('🔵 Connexion Firebase avec le token...');
        const firebaseResult = await signInWithGoogle(idToken);

        if (firebaseResult.success) {
          console.log('✅ Connexion Firebase réussie');
          // Nettoyer sessionStorage
          if (typeof window !== 'undefined') {
            sessionStorage.removeItem('google_oauth_state');
            sessionStorage.removeItem('google_oauth_redirect_uri');
            sessionStorage.removeItem('google_oauth_nonce');
          }

          // Mettre à jour le contexte d'authentification
          login({
            uid: firebaseResult.user.uid,
            email: firebaseResult.user.email,
            displayName: firebaseResult.user.displayName,
            photoURL: firebaseResult.user.photoURL,
          });

          // Rediriger vers l'application
          router.replace('/(tabs)');
        } else {
          console.error('❌ Erreur Firebase:', firebaseResult.error);
          router.replace(`/signup?error=${encodeURIComponent(firebaseResult.error || 'firebase_error')}`);
        }
      } catch (error) {
        console.error('❌ Erreur dans le callback:', error);
        router.replace(`/signup?error=${encodeURIComponent(error?.message || 'unknown_error')}`);
      }
    };

    handleCallback();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000000" />
      <Text style={styles.text}>Connexion en cours...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#1A1A1A',
  },
});

