import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/src/contexts/AuthContext';
import { signInWithEmail, signInWithGoogle } from '@/src/services/authService';
import { signInWithGoogleAsync } from '@/src/services/googleAuth';
import GoogleLogo from '@/src/components/GoogleLogo';
import BackButton from '@/src/components/BackButton';

export default function LoginScreen() {
  const router = useRouter();
  const { login, forceLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);
    const result = await signInWithEmail(email, password);
    setLoading(false);

    if (result.success) {
      login({
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
      });
      router.replace('/(tabs)');
    } else {
      Alert.alert('Erreur', result.error || 'Erreur de connexion');
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const googleResult = await signInWithGoogleAsync();
      
      if (googleResult.success) {
        const firebaseResult = await signInWithGoogle(googleResult.idToken);
        
        if (firebaseResult.success) {
          login({
            uid: firebaseResult.user.uid,
            email: firebaseResult.user.email,
            displayName: firebaseResult.user.displayName,
            photoURL: firebaseResult.user.photoURL,
          });
          router.replace('/(tabs)');
        } else {
          Alert.alert('Erreur', firebaseResult.error || 'Erreur de connexion Google');
        }
      } else {
        Alert.alert('Erreur', googleResult.error || 'Connexion Google annulée');
      }
    } catch (error) {
      Alert.alert('Erreur', error.message || 'Erreur lors de la connexion Google');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleForceLogin = () => {
    forceLogin();
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <BackButton />
      <View style={styles.content}>
        <Text style={styles.title}>Se connecter</Text>

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          autoComplete="password"
        />

        <TouchableOpacity 
          style={[styles.loginButton, loading && styles.buttonDisabled]} 
          onPress={handleLogin} 
          activeOpacity={0.8}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.loginButtonText}>Se connecter</Text>
          )}
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity 
          style={[styles.googleButton, googleLoading && styles.buttonDisabled]} 
          onPress={handleGoogleLogin}
          activeOpacity={0.8}
          disabled={googleLoading}
        >
          {googleLoading ? (
            <ActivityIndicator color="#1A1A1A" />
          ) : (
            <>
              <GoogleLogo size={20} />
              <Text style={styles.googleButtonText}>Continuer avec Google</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>

        {/* Bouton temporaire pour forcer la connexion */}
        <TouchableOpacity 
          style={styles.forceLoginButton} 
          onPress={handleForceLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.forceLoginButtonText}>🔧 TEMPORAIRE: Forcer la connexion</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
    color: '#1A1A1A',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1A1A1A',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#ffffff',
    color: '#1A1A1A',
  },
  loginButton: {
    backgroundColor: '#000000',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#6A6A6A',
    fontSize: 14,
  },
  forceLoginButton: {
    marginTop: 20,
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
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#6A6A6A',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    paddingVertical: 14,
    borderRadius: 999,
    marginBottom: 10,
  },
  googleButtonText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});

