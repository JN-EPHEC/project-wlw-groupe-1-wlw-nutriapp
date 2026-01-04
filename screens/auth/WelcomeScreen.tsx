import { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoogleLogo from '@/components/GoogleLogo';
import { Logo } from '@/components/Logo';
import { SettingsInfoKey, SettingsInfoModal } from '@/components/SettingsInfoModal';
import { Button, Card, Input } from '@/components/ui';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

const PASSWORD_MIN_LENGTH = 6;

type FormMode = 'login' | 'signup';

type WelcomeScreenProps = {
  initialMode?: FormMode;
};

export function WelcomeScreen({ initialMode = 'login' }: WelcomeScreenProps) {
  const router = useRouter();
  const { signup, login, loginWithGoogle } = useAuth();

  const [activeInfoModal, setActiveInfoModal] = useState<SettingsInfoKey | null>(null);

  const [mode, setMode] = useState<FormMode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rgpdAccepted, setRgpdAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const isSignup = mode === 'signup';

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'signup' ? 'login' : 'signup'));
    setPassword('');
    setConfirmPassword('');
  };

  const validateEmail = (value: string) => {
    const pattern = /\S+@\S+\.\S+/;
    return pattern.test(value.trim());
  };

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Erreur', 'Veuillez entrer une adresse email valide');
      return;
    }

    if (password.length < PASSWORD_MIN_LENGTH) {
      Alert.alert('Erreur', `Le mot de passe doit contenir au moins ${PASSWORD_MIN_LENGTH} caractères`);
      return;
    }

    if (isSignup) {
      if (password !== confirmPassword) {
        Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
        return;
      }

      if (!rgpdAccepted) {
        Alert.alert('Erreur', 'Veuillez accepter les conditions RGPD');
        return;
      }
    }

    setLoading(true);

    const result = isSignup
      ? await signup(email.trim(), password, { email: email.trim() })
      : await login(email.trim(), password);

    setLoading(false);

    if (!result.success) {
      Alert.alert('Erreur', result.error ?? 'Impossible de traiter la demande');
    }
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      console.log('[UI] Google button pressed');
      const result = await loginWithGoogle();
      console.log('[UI] loginWithGoogle result:', JSON.stringify(result));
      if (!result.success) {
        Alert.alert('Erreur', result.error ?? 'Impossible de se connecter avec Google');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Logo size="medium" />
          <Text style={styles.title}>{isSignup ? 'Créer un compte' : 'Bienvenue'}</Text>
          <Text style={styles.subtitle}>
            {isSignup
              ? 'Rejoignez NutriAdapt pour des recettes adaptées à votre santé'
              : 'Connectez-vous pour accéder à vos recettes santé'}
          </Text>
        </View>

        <Card style={styles.card}>
          <Input
            label="Email"
            placeholder="votre@email.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            icon={<Ionicons name="mail-outline" size={20} color={Colors.neutral.gray600} />}
          />

          <Input
            label="Mot de passe"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            icon={<Ionicons name="lock-closed-outline" size={20} color={Colors.neutral.gray600} />}
          />

          {isSignup && (
            <Input
              label="Confirmer le mot de passe"
              placeholder="••••••••"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
              icon={<Ionicons name="lock-closed-outline" size={20} color={Colors.neutral.gray600} />}
            />
          )}

          {isSignup && (
            <TouchableOpacity
              onPress={() => setRgpdAccepted((prev) => !prev)}
              style={styles.checkboxRow}
              activeOpacity={0.8}
            >
              <View style={[styles.checkbox, rgpdAccepted && styles.checkboxChecked]}>
                {rgpdAccepted ? <Ionicons name="checkmark" size={16} color={Colors.neutral.white} /> : null}
              </View>
              <Text style={styles.checkboxText}>
                J'accepte que mes données de santé soient traitées conformément au RGPD et à la{' '}
                <Text style={styles.legalInlineLink} onPress={() => setActiveInfoModal('privacy')}>
                  politique de confidentialité
                </Text>
                .
              </Text>
            </TouchableOpacity>
          )}

          {isSignup && (
            <View style={styles.legalCard}>
              <Text style={styles.legalText}>
                En continuant, vous acceptez nos{' '}
                <Text style={styles.legalInlineLink} onPress={() => setActiveInfoModal('legal')}>
                  Conditions d'utilisation
                </Text>{' '}
                et notre{' '}
                <Text style={styles.legalInlineLink} onPress={() => setActiveInfoModal('privacy')}>
                  Politique de confidentialité
                </Text>
                .
              </Text>
            </View>
          )}

          <Button
            title={isSignup ? 'Créer mon compte' : 'Se connecter'}
            onPress={handleSubmit}
            loading={loading}
            style={styles.submitButton}
          />

          {!isSignup && (
            <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotButton}>
              <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
          )}

          <View style={styles.separator}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>Ou continuer avec</Text>
            <View style={styles.separatorLine} />
          </View>

          <Button
            title="Continuer avec Google"
            onPress={handleGoogle}
            variant="outline"
            loading={googleLoading}
            icon={<GoogleLogo size={20} />}
          />
        </Card>

        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>
            {isSignup ? 'Déjà un compte ?' : 'Pas encore de compte ?'}
          </Text>
          <TouchableOpacity onPress={toggleMode}>
            <Text style={styles.switchLink}>{isSignup ? 'Se connecter' : "S'inscrire"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <SettingsInfoModal
        visible={activeInfoModal !== null}
        infoKey={activeInfoModal}
        onClose={() => setActiveInfoModal(null)}
      />
    </SafeAreaView>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray100,
  },
  scrollContent: {
    padding: Spacing.lg,
    justifyContent: 'center',
    minHeight: '100%',
    gap: Spacing.lg,
  },
  header: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  title: {
    ...Typography.h1,
    color: Colors.neutral.gray900,
  },
  subtitle: {
    ...Typography.body1,
    color: Colors.neutral.gray600,
    textAlign: 'center',
  },
  card: {
    gap: Spacing.md,
  },
  submitButton: {
    marginTop: Spacing.sm,
  },
  forgotButton: {
    alignSelf: 'center',
  },
  forgotText: {
    ...Typography.body2,
    color: Colors.primary.green,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginVertical: Spacing.sm,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.neutral.gray300,
  },
  separatorText: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  switchText: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },
  switchLink: {
    ...Typography.body2,
    color: Colors.primary.green,
    fontWeight: '500',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.neutral.white,
  },
  checkboxChecked: {
    backgroundColor: Colors.primary.green,
    borderColor: Colors.primary.green,
  },
  checkboxText: {
    flex: 1,
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },

  legalCard: {
    padding: Spacing.md,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
  },
  legalText: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
    textAlign: 'center',
  },
  legalInlineLink: {
    color: Colors.primary.green,
    fontWeight: '500',
  },
});
