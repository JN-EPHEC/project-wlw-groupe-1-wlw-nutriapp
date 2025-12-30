import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { useAuth } from '@/contexts/AuthContext';

type ProfileValue = string | number | null | undefined;

type HealthProfile = {
  age?: ProfileValue;
  height?: ProfileValue;
  weight?: ProfileValue;
  conditions: string[];
  allergies: string[];
};

const sanitizeStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter((item) => item.length > 0 && item.toLowerCase() !== 'none');
};

const toProfileValue = (value: unknown): ProfileValue => {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === 'number' || typeof value === 'string') {
    return value;
  }

  return null;
};

const toDisplayValue = (value: ProfileValue, suffix?: string) => {
  if (value === null || value === undefined || value === '') {
    return '--';
  }

  const base = String(value);
  if (!suffix) {
    return base;
  }
  return `${base}${suffix}`;
};

const showComingSoon = (title: string) => {
  Alert.alert(title, 'Cette fonctionnalité sera bientôt disponible.');
};

export function ProfileScreen() {
  const { user, userProfile, logout } = useAuth();
  const [notifications, setNotifications] = useState(true);

  const healthProfile = useMemo<HealthProfile>(() => {
    const flatProfile = (userProfile ?? {}) as Record<string, unknown>;
    const nestedProfile =
      typeof flatProfile.profile === 'object' && flatProfile.profile !== null
        ? (flatProfile.profile as Record<string, unknown>)
        : {};

    return {
      age: toProfileValue(nestedProfile.age ?? flatProfile.age),
      height: toProfileValue(nestedProfile.height ?? nestedProfile.size ?? flatProfile.height),
      weight: toProfileValue(nestedProfile.weight ?? flatProfile.weight),
      conditions: sanitizeStringArray(nestedProfile.conditions ?? flatProfile.conditions),
      allergies: sanitizeStringArray(nestedProfile.allergies ?? flatProfile.allergies),
    };
  }, [userProfile]);

  const handleLogout = () => {
    Alert.alert('Déconnexion', 'Êtes-vous sûr de vouloir vous déconnecter ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Déconnexion',
        style: 'destructive',
        onPress: async () => {
          const result = await logout();
          if (!result.success) {
            Alert.alert('Erreur', result.error ?? "Impossible de se déconnecter pour le moment.");
          }
        },
      },
    ]);
  };

  const handleEditProfile = () => {
    showComingSoon('Modification du profil');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color={Colors.primary.green} />
          </View>
          <Text style={styles.name}>Mon profil</Text>
          <Text style={styles.email}>{user?.email ?? 'Utilisateur NutriAdapt'}</Text>
        </View>

        <View style={styles.content}>
          <Card>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                <View style={styles.cardIcon}>
                  <Ionicons name="heart" size={20} color={Colors.primary.green} />
                </View>
                <Text style={styles.cardTitle}>Mon profil santé</Text>
              </View>
              <TouchableOpacity onPress={handleEditProfile}>
                <Ionicons name="create-outline" size={20} color={Colors.neutral.gray600} />
              </TouchableOpacity>
            </View>

            <View style={styles.profileStats}>
              <View style={styles.profileStat}>
                <Text style={styles.profileStatValue}>{toDisplayValue(healthProfile.age)}</Text>
                <Text style={styles.profileStatLabel}>Âge</Text>
              </View>
              <View style={styles.profileStatDivider} />
              <View style={styles.profileStat}>
                <Text style={styles.profileStatValue}>{toDisplayValue(healthProfile.height)}</Text>
                <Text style={styles.profileStatLabel}>Taille (cm)</Text>
              </View>
              <View style={styles.profileStatDivider} />
              <View style={styles.profileStat}>
                <Text style={styles.profileStatValue}>{toDisplayValue(healthProfile.weight)}</Text>
                <Text style={styles.profileStatLabel}>Poids (kg)</Text>
              </View>
            </View>

            {healthProfile.conditions.length > 0 && (
              <View style={styles.healthTags}>
                <Text style={styles.healthTagsLabel}>Pathologies :</Text>
                <View style={styles.tagsContainer}>
                  {healthProfile.conditions.map((condition, index) => (
                    <Badge key={`${condition}-${index}`} label={condition} variant="health" />
                  ))}
                </View>
              </View>
            )}

            {healthProfile.allergies.length > 0 && (
              <View style={styles.healthTags}>
                <Text style={styles.healthTagsLabel}>Allergies :</Text>
                <View style={styles.tagsContainer}>
                  {healthProfile.allergies.map((allergy, index) => (
                    <Badge key={`${allergy}-${index}`} label={allergy} variant="allergy" />
                  ))}
                </View>
              </View>
            )}
          </Card>

          <Card>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                <View style={[styles.cardIcon, { backgroundColor: '#EEF2FF' }]}>
                  <Ionicons name="medical" size={20} color="#5B8DEF" />
                </View>
                <View>
                  <Text style={styles.cardTitle}>Mon médecin</Text>
                  <Text style={styles.cardSubtitle}>Partagez vos données</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.doctorCard} onPress={() => showComingSoon('Mon médecin')}>
              <View style={styles.doctorAvatar}>
                <Ionicons name="person" size={24} color="#5B8DEF" />
              </View>
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>Dr. Martin Dupont</Text>
                <Text style={styles.doctorSpecialty}>Endocrinologue</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.neutral.gray600} />
            </TouchableOpacity>

            <Button
              title="Lier un nouveau médecin"
              variant="outline"
              icon={<Ionicons name="add" size={20} color={Colors.neutral.gray900} />}
              onPress={() => showComingSoon('Lier un médecin')}
            />
          </Card>

          <Card>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                <View style={styles.cardIcon}>
                  <Ionicons name="settings" size={20} color={Colors.primary.green} />
                </View>
                <Text style={styles.cardTitle}>Paramètres</Text>
              </View>
            </View>

            <View style={styles.settingsList}>
              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Ionicons name="notifications-outline" size={20} color={Colors.neutral.gray600} />
                  <View style={styles.settingText}>
                    <Text style={styles.settingLabel}>Notifications</Text>
                    <Text style={styles.settingDescription}>Recevoir des rappels santé</Text>
                  </View>
                </View>
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{ false: Colors.neutral.gray300, true: Colors.primary.green }}
                  thumbColor={Colors.neutral.white}
                />
              </View>

              <TouchableOpacity
                style={styles.settingItem}
                onPress={() => showComingSoon('Confidentialité')}
                activeOpacity={0.8}
              >
                <View style={styles.settingLeft}>
                  <Ionicons name="shield-checkmark-outline" size={20} color={Colors.neutral.gray600} />
                  <View style={styles.settingText}>
                    <Text style={styles.settingLabel}>Confidentialité</Text>
                    <Text style={styles.settingDescription}>Gérer vos données</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.neutral.gray600} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.settingItem}
                onPress={() => showComingSoon('Aide & Support')}
                activeOpacity={0.8}
              >
                <View style={styles.settingLeft}>
                  <Ionicons name="help-circle-outline" size={20} color={Colors.neutral.gray600} />
                  <View style={styles.settingText}>
                    <Text style={styles.settingLabel}>Aide & Support</Text>
                    <Text style={styles.settingDescription}>FAQ et contact</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.neutral.gray600} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.settingItem}
                onPress={() => showComingSoon('Mentions légales')}
                activeOpacity={0.8}
              >
                <View style={styles.settingLeft}>
                  <Ionicons name="document-text-outline" size={20} color={Colors.neutral.gray600} />
                  <View style={styles.settingText}>
                    <Text style={styles.settingLabel}>CGU & Mentions légales</Text>
                    <Text style={styles.settingDescription}>Conditions d'utilisation</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.neutral.gray600} />
              </TouchableOpacity>
            </View>
          </Card>

          <View style={styles.appInfo}>
            <Text style={styles.appVersion}>NutriAdapt v1.0.0</Text>
            <Text style={styles.appCopyright}>© 2025 NutriAdapt. Tous droits réservés.</Text>
          </View>

          <Button
            title="Se déconnecter"
            onPress={handleLogout}
            variant="outline"
            icon={<Ionicons name="log-out-outline" size={20} color="#EF4444" />}
            style={styles.logoutButton}
            textStyle={styles.logoutText}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray100,
  },
  header: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray300,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary.greenPastel,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  name: {
    ...Typography.h2,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  email: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },
  content: {
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary.greenPastel,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    ...Typography.h3,
    color: Colors.neutral.gray900,
  },
  cardSubtitle: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },
  profileStats: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  profileStat: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  profileStatDivider: {
    width: 1,
    backgroundColor: Colors.neutral.gray300,
  },
  profileStatValue: {
    ...Typography.h2,
    color: Colors.primary.green,
    marginBottom: 4,
  },
  profileStatLabel: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },
  healthTags: {
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  healthTagsLabel: {
    ...Typography.label,
    color: Colors.neutral.gray600,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
    gap: Spacing.lg,
  },
  doctorAvatar: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.full,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    ...Typography.body1,
    fontWeight: '600',
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  doctorSpecialty: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },
  settingsList: {
    gap: 0,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray300,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    flex: 1,
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    ...Typography.body1,
    fontWeight: '500',
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  settingDescription: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    gap: Spacing.sm,
  },
  appVersion: {
    ...Typography.body2,
    fontWeight: '500',
    color: Colors.neutral.gray600,
  },
  logoutButton: {
    borderColor: '#EF4444',
    marginBottom: Spacing.xl,
  },
  logoutText: {
    color: '#EF4444',
  },
  appCopyright: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },
});

export default ProfileScreen;
