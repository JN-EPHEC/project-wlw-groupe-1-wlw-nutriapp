import { useEffect } from 'react';
import { Alert } from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';

import WelcomeScreen from '@/screens/auth/WelcomeScreen';

export default function SignupScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params?.error) {
      const errorParam = Array.isArray(params.error) ? params.error[0] : params.error;
      const decoded = decodeURIComponent(errorParam ?? '');

      let message = "Erreur lors de l'authentification Google.";
      if (decoded === 'no_token') {
        message = 'Aucun token reçu de Google. Veuillez réessayer.';
      } else if (decoded === 'state_mismatch') {
        message = 'Erreur de sécurité. Veuillez réessayer.';
      } else if (decoded.includes('firebase')) {
        message = `Erreur Firebase : ${decoded}`;
      } else if (decoded && decoded !== 'unknown_error') {
        message = decoded;
      }

      Alert.alert("Erreur d'authentification", message, [
        {
          text: 'OK',
          onPress: () => router.replace('/signup'),
        },
      ]);
    }
  }, [params?.error, router]);

  return <WelcomeScreen initialMode="signup" />;
}

