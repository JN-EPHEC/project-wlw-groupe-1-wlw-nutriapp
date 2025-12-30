import { signInWithGoogle } from '@/services/authService';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function OAuthCallback() {
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const idToken = typeof params.id_token === 'string' ? (params.id_token as string) : null;

        if (!idToken) {
          router.replace('/signup?error=no_token');
          return;
        }

        const firebaseResult = await signInWithGoogle(idToken);

        if (firebaseResult.success && firebaseResult.user) {
          router.replace('/');
        } else {
          router.replace(`/signup?error=${encodeURIComponent(firebaseResult.error || 'firebase_error')}`);
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'unknown_error';
        router.replace(`/signup?error=${encodeURIComponent(message)}`);
      }
    };

    handleCallback();
  }, [params, router]);

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

