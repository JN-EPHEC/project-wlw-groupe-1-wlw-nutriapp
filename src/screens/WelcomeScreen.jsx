import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientBackground from '../components/GradientBackground';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import { theme } from '../styles/theme';
import { useAuth } from '../contexts/AuthContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const { forceLogin } = useAuth();

  const handleSignup = () => {
    router.push('/signup');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <GradientBackground style={styles.gradientContainer}>
        <View style={styles.content}>
          <View style={styles.illustrationContainer}>
            <Image
              source={require('../assets/temp-illustration.png')}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>Welcome to NutriAdapt!</Text>
            
            <Text style={styles.subtitle}>
              Découvrez des recettes adaptées à votre santé{'\n'}
              et suivez l'évolution de vos indicateurs de santé.
            </Text>
          </View>

          <View style={styles.buttonsContainer}>
            <PrimaryButton
              label="Créer un compte"
              onPress={handleSignup}
              style={styles.primaryButton}
            />
            
            <SecondaryButton
              label="Se connecter"
              onPress={handleLogin}
              style={styles.secondaryButton}
            />

            {/* Bouton temporaire pour forcer la connexion */}
            <TouchableOpacity
              style={styles.forceLoginButton}
              onPress={() => {
                forceLogin();
                router.replace('/(tabs)');
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.forceLoginButtonText}>
                🔧 TEMPORAIRE: Forcer la connexion
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </GradientBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
  },
  gradientContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
  },
  illustration: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_WIDTH * 0.7,
    maxWidth: 300,
    maxHeight: 300,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  title: {
    ...theme.typography.title,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    ...theme.typography.subtitle,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: SCREEN_WIDTH * 0.8,
  },
  buttonsContainer: {
    gap: theme.spacing.md,
  },
  primaryButton: {
    width: '100%',
  },
  secondaryButton: {
    width: '100%',
  },
  forceLoginButton: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF5252',
  },
  forceLoginButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});

