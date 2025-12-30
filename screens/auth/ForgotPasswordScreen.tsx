import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Card, Input } from '@/components/ui';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { useAuth } from '@/contexts/AuthContext';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer votre adresse email');
      return;
    }

    setLoading(true);
    const result = await resetPassword(email.trim());
    setLoading(false);

    if (result.success) {
      Alert.alert(
        'Email envoyé',
        "Un lien de réinitialisation vous a été envoyé. Consultez votre boîte mail pour continuer.",
        [
          {
            text: 'Retour',
            onPress: () => router.back(),
          },
        ]
      );
    } else {
      Alert.alert('Erreur', result.error ?? "Impossible d'envoyer l'email de réinitialisation");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="mail-unread-outline" size={28} color={Colors.primary.green} />
          </View>
          <Text style={styles.title}>Réinitialiser le mot de passe</Text>
          <Text style={styles.subtitle}>
            Entrez votre adresse email et nous vous enverrons un lien pour définir un nouveau mot de passe.
          </Text>
        </View>

        <Input
          label="Email"
          placeholder="votre@email.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Button title="Envoyer le lien" onPress={handleSubmit} loading={loading} style={styles.submitButton} />
        <Button title="Annuler" onPress={() => router.back()} variant="ghost" />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray100,
    padding: Spacing.lg,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.lg,
  },
  header: {
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.primary.greenPastel,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...Typography.h2,
    color: Colors.neutral.gray900,
  },
  subtitle: {
    ...Typography.body1,
    color: Colors.neutral.gray600,
  },
  submitButton: {
    marginTop: Spacing.md,
  },
});
