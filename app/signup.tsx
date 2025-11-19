import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/src/contexts/AuthContext';
import { signUpWithEmail, signInWithGoogle } from '@/src/services/authService';
import { signInWithGoogleAsync } from '@/src/services/googleAuth';
import GoogleLogo from '@/src/components/GoogleLogo';
import BackButton from '@/src/components/BackButton';

export default function SignupScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Gérer les erreurs de callback OAuth
  useEffect(() => {
    if (params.error) {
      const errorMsg = decodeURIComponent(params.error as string);
      let message = 'Erreur lors de l\'authentification Google.';
      
      if (errorMsg === 'no_token') {
        message = 'Aucun token reçu de Google. Veuillez réessayer.';
      } else if (errorMsg === 'state_mismatch') {
        message = 'Erreur de sécurité. Veuillez réessayer.';
      } else if (errorMsg.includes('firebase')) {
        message = `Erreur Firebase: ${errorMsg}`;
      } else if (errorMsg !== 'unknown_error') {
        message = errorMsg;
      }
      
      Alert.alert('Erreur d\'authentification', message);
      // Nettoyer l'URL
      router.replace('/signup');
    }
  }, [params.error]);

  const validateEmail = (mail: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
    return re.test(String(mail).toLowerCase());
  };

  const handleSignup = async () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Erreur', 'Veuillez entrer une adresse e-mail valide.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    setLoading(true);
    const result = await signUpWithEmail(email, password, {
      firstName,
      lastName,
    });
    setLoading(false);

    if (result.success) {
      login({
        uid: result.user.uid,
        email: result.user.email,
        displayName: `${firstName} ${lastName}`,
      });
      Alert.alert('Inscription', 'Compte créé avec succès !', [
        { text: 'OK', onPress: () => router.replace('/(tabs)') },
      ]);
    } else {
      Alert.alert('Erreur', result.error || 'Erreur lors de l\'inscription');
    }
  };

  const handleGoogleSignup = async () => {
    console.log('🔵 handleGoogleSignup appelé');
    setGoogleLoading(true);
    try {
      console.log('🔵 Appel de signInWithGoogleAsync...');
      const googleResult = await signInWithGoogleAsync();
      console.log('🔵 Résultat Google:', googleResult);
      
      if (googleResult.success) {
        console.log('🔵 Google auth réussie, connexion Firebase...');
        const firebaseResult = await signInWithGoogle(googleResult.idToken);
        console.log('🔵 Résultat Firebase:', firebaseResult);
        
        if (firebaseResult.success) {
          console.log('🔵 Connexion réussie, redirection...');
          login({
            uid: firebaseResult.user.uid,
            email: firebaseResult.user.email,
            displayName: firebaseResult.user.displayName,
            photoURL: firebaseResult.user.photoURL,
          });
          router.replace('/(tabs)');
        } else {
          console.error('❌ Erreur Firebase:', firebaseResult.error);
          Alert.alert('Erreur', firebaseResult.error || 'Erreur de connexion Google');
        }
      } else {
        console.error('❌ Erreur Google:', googleResult.error);
        Alert.alert('Erreur', googleResult.error || 'Connexion Google annulée');
      }
    } catch (error) {
      console.error('❌ Exception dans handleGoogleSignup:', error);
      console.error('❌ Stack trace:', error?.stack);
      console.error('❌ Error details:', JSON.stringify(error, null, 2));
      const errorMessage = error?.message || error?.toString() || 'Erreur inconnue lors de la connexion Google';
      Alert.alert('Erreur', `Erreur: ${errorMessage}\n\nVérifiez la console pour plus de détails.`);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <BackButton />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Créer un compte</Text>

          <Text style={styles.label}>Prénom</Text>
          <TextInput
            placeholder="Prénom"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
            autoCapitalize="words"
          />

          <Text style={styles.label}>Nom</Text>
          <TextInput
            placeholder="Nom"
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
            autoCapitalize="words"
          />

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
            autoComplete="password-new"
          />

          <Text style={styles.label}>Confirmer le mot de passe</Text>
          <TextInput
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
            secureTextEntry
            autoComplete="password-new"
          />

          <TouchableOpacity 
            style={[styles.signupButton, loading && styles.buttonDisabled]} 
            onPress={handleSignup} 
            activeOpacity={0.8}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.signupButtonText}>Créer mon compte</Text>
            )}
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity 
            style={[styles.googleButton, googleLoading && styles.buttonDisabled]} 
            onPress={() => {
              console.log('🔵 Bouton Google cliqué');
              handleGoogleSignup();
            }}
            activeOpacity={0.8}
            disabled={googleLoading}
          >
            {googleLoading ? (
              <ActivityIndicator color="#1A1A1A" />
            ) : (
              <>
                <GoogleLogo size={20} />
                <Text style={styles.googleButtonText}>S'inscrire avec Google</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
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
  signupButton: {
    backgroundColor: '#000000',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 10,
  },
  signupButtonText: {
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
    gap: 8,
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

