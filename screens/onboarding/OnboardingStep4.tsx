import { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { Card } from '@/components/ui';
import { SettingsInfoKey, SettingsInfoModal } from '@/components/SettingsInfoModal';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants';

import { OnboardingProfile, UpdateOnboardingProfile } from './types';

type OnboardingStep4Props = {
  data: OnboardingProfile;
  updateData: UpdateOnboardingProfile;
};

export const OnboardingStep4 = ({ data, updateData }: OnboardingStep4Props) => {
  const [activeInfoModal, setActiveInfoModal] = useState<SettingsInfoKey | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.infoCard}>
        <Ionicons name="shield-checkmark" size={24} color={Colors.primary.green} />
        <Text style={styles.infoText}>
          NutriAdapt respecte votre vie privée. Vos données de santé sont chiffrées et ne seront jamais vendues à des
          tiers.
        </Text>
      </View>

      <Card style={styles.consentCard}>
        <View style={styles.consentItem}>
          <View style={styles.consentHeader}>
            <Switch
              value={data.dataSharing}
              onValueChange={(value) => updateData({ dataSharing: value })}
              trackColor={{ false: Colors.neutral.gray300, true: Colors.primary.green }}
              thumbColor={Colors.neutral.white}
            />
            <View style={styles.consentText}>
              <Text style={styles.consentTitle}>Partage anonymisé des données</Text>
              <Text style={styles.consentDescription}>
                Aider la recherche en partageant vos données de manière anonyme (optionnel)
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.consentItem}>
          <View style={styles.consentHeader}>
            <Switch
              value={data.healthNotifications}
              onValueChange={(value) => updateData({ healthNotifications: value })}
              trackColor={{ false: Colors.neutral.gray300, true: Colors.primary.green }}
              thumbColor={Colors.neutral.white}
            />
            <View style={styles.consentText}>
              <Text style={styles.consentTitle}>Notifications santé</Text>
              <Text style={styles.consentDescription}>Recevoir des rappels et conseils personnalisés</Text>
            </View>
          </View>
        </View>
      </Card>

      <View style={styles.legalCard}>
        <Text style={styles.legalText}>
          En continuant, vous acceptez nos{' '}
          <Text style={styles.legalLink} onPress={() => setActiveInfoModal('legal')}>
            Conditions d'utilisation
          </Text>{' '}
          et notre{' '}
          <Text style={styles.legalLink} onPress={() => setActiveInfoModal('privacy')}>
            Politique de confidentialité
          </Text>
          .
        </Text>
      </View>

      <SettingsInfoModal
        visible={activeInfoModal !== null}
        infoKey={activeInfoModal}
        onClose={() => setActiveInfoModal(null)}
      />
    </View>
  );
};

export default OnboardingStep4;

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  infoCard: {
    flexDirection: 'row',
    gap: Spacing.md,
    padding: Spacing.lg,
    backgroundColor: Colors.primary.greenPastel,
    borderRadius: BorderRadius.md,
  },
  infoText: {
    ...Typography.body1,
    color: Colors.neutral.gray900,
    flex: 1,
  },
  consentCard: {
    gap: 0,
  },
  consentItem: {
    paddingVertical: Spacing.sm,
  },
  consentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  consentText: {
    flex: 1,
  },
  consentTitle: {
    ...Typography.body2,
    fontWeight: '500',
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  consentDescription: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.neutral.gray300,
    marginVertical: Spacing.md,
  },
  legalCard: {
    padding: Spacing.lg,
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
  legalLink: {
    color: Colors.primary.green,
    fontWeight: '500',
  },
});
