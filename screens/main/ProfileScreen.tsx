import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SettingsInfoKey, SettingsInfoModal } from '@/components/SettingsInfoModal';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
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
  const { user, userProfile, logout, deleteAccount, updateUserProfile } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [activeSettingsModal, setActiveSettingsModal] = useState<SettingsInfoKey | null>(null);

  const [editHealthVisible, setEditHealthVisible] = useState(false);
  const [editAge, setEditAge] = useState('');
  const [editHeight, setEditHeight] = useState('');
  const [editWeight, setEditWeight] = useState('');
  const [editConditions, setEditConditions] = useState('');
  const [editSaving, setEditSaving] = useState(false);

  const [logoutConfirmVisible, setLogoutConfirmVisible] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteEmail, setDeleteEmail] = useState('');
  const [deleteError, setDeleteError] = useState<string | null>(null);

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
    setLogoutError(null);
    setLogoutConfirmVisible(true);
  };

  const confirmLogout = async () => {
    if (logoutLoading) return;
    setLogoutLoading(true);
    setLogoutError(null);
    try {
      const result = await logout();
      if (!result.success) {
        setLogoutError(result.error ?? "Impossible de se déconnecter pour le moment.");
      } else {
        setLogoutConfirmVisible(false);
      }
    } finally {
      setLogoutLoading(false);
    }
  };

  const handleEditProfile = () => {
    setEditAge(healthProfile.age === null || healthProfile.age === undefined ? '' : String(healthProfile.age));
    setEditHeight(
      healthProfile.height === null || healthProfile.height === undefined ? '' : String(healthProfile.height)
    );
    setEditWeight(
      healthProfile.weight === null || healthProfile.weight === undefined ? '' : String(healthProfile.weight)
    );
    setEditConditions(healthProfile.conditions.join(', '));
    setEditHealthVisible(true);
  };

  const closeEditHealth = () => {
    if (editSaving) return;
    setEditHealthVisible(false);
  };

  const parseNumberOrNull = (value: string, label: string) => {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const num = Number(trimmed);
    if (!Number.isFinite(num)) {
      throw new Error(`${label} invalide`);
    }
    return num;
  };

  const sanitizeCommaList = (value: string) =>
    value
      .split(',')
      .map((v) => v.trim())
      .filter((v) => v.length > 0 && v.toLowerCase() !== 'none');

  const saveHealthProfile = async () => {
    if (editSaving) return;

    try {
      setEditSaving(true);

      const age = parseNumberOrNull(editAge, 'Âge');
      const height = parseNumberOrNull(editHeight, 'Taille');
      const weight = parseNumberOrNull(editWeight, 'Poids');
      const conditions = sanitizeCommaList(editConditions);

      const result = await updateUserProfile({
        age,
        height,
        weight,
        conditions,
      });

      if (!result.success) {
        Alert.alert('Erreur', result.error ?? "Impossible d'enregistrer votre profil santé.");
        return;
      }

      setEditHealthVisible(false);
    } catch (error: any) {
      Alert.alert('Erreur', error?.message ?? 'Valeurs invalides');
    } finally {
      setEditSaving(false);
    }
  };

  const handleDeleteAccount = () => {
    if (!deleteAccount) {
      Alert.alert('Indisponible', "La suppression du compte n'est pas disponible pour le moment.");
      return;
    }

    setActiveSettingsModal(null);
    setDeleteEmail('');
    setDeleteError(null);
    setDeleteConfirmVisible(true);
  };

  const currentEmail = (user?.email ?? '').trim();
  const emailMatches =
    currentEmail.length > 0 && deleteEmail.trim().toLowerCase() === currentEmail.toLowerCase();

  const confirmDeleteAccount = async () => {
    if (!deleteAccount) return;
    if (deleteLoading) return;

    if (!currentEmail) {
      setDeleteError("Aucune adresse email n'est associée à ce compte.");
      return;
    }

    if (!emailMatches) {
      setDeleteError("L'adresse email ne correspond pas.");
      return;
    }

    setDeleteLoading(true);
    setDeleteError(null);
    try {
      const result = await deleteAccount();
      if (!result.success) {
        setDeleteError(
          result.error ??
            "Impossible de supprimer le compte. Il peut être nécessaire de vous reconnecter avant de réessayer.",
        );
        return;
      }
      setDeleteConfirmVisible(false);
      setDeleteEmail('');
    } finally {
      setDeleteLoading(false);
    }
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

          <Modal transparent animationType="fade" visible={editHealthVisible} onRequestClose={closeEditHealth}>
            <Pressable style={styles.modalOverlay} onPress={closeEditHealth}>
              <Pressable style={styles.modalCardWrapper} onPress={() => undefined}>
                <Card style={styles.modalCard}>
                  <View style={styles.healthModalHeader}>
                    <View style={styles.healthModalHeaderLeft}>
                      <View style={styles.healthModalHeaderIcon}>
                        <Ionicons name="create-outline" size={18} color={Colors.neutral.white} />
                      </View>
                      <Text style={styles.healthModalTitle}>Modifier mon profil santé</Text>
                    </View>
                    <TouchableOpacity onPress={closeEditHealth} hitSlop={10}>
                      <Ionicons name="close" size={18} color={Colors.neutral.white} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.healthModalBody}>
                    <View style={styles.healthModalRow}>
                      <View style={styles.healthModalHalf}>
                        <Input
                          label="Âge"
                          placeholder="35"
                          value={editAge}
                          onChangeText={setEditAge}
                          keyboardType="numeric"
                          icon={<Ionicons name="person-outline" size={16} color={Colors.neutral.gray600} />}
                        />
                      </View>
                      <View style={styles.healthModalHalf}>
                        <Input
                          label="Taille (cm)"
                          placeholder="170"
                          value={editHeight}
                          onChangeText={setEditHeight}
                          keyboardType="numeric"
                          icon={<Ionicons name="resize-outline" size={16} color={Colors.neutral.gray600} />}
                        />
                      </View>
                    </View>

                    <Input
                      label="Poids (kg)"
                      placeholder="70"
                      value={editWeight}
                      onChangeText={setEditWeight}
                      keyboardType="numeric"
                      icon={<Ionicons name="fitness-outline" size={16} color={Colors.neutral.gray600} />}
                    />

                    <Input
                      label="Pathologies"
                      placeholder="pre-diabetes"
                      value={editConditions}
                      onChangeText={setEditConditions}
                      autoCapitalize="none"
                    />
                    <Text style={styles.healthModalHelper}>
                      Séparez plusieurs pathologies par des virgules.
                    </Text>

                    <View style={styles.modalActionsRow}>
                      <Button title="Annuler" variant="outline" onPress={closeEditHealth} style={styles.modalActionButton} />
                      <Button
                        title={editSaving ? 'Enregistrement…' : 'Enregistrer'}
                        onPress={saveHealthProfile}
                        disabled={editSaving}
                        style={styles.modalActionButton}
                      />
                    </View>
                  </View>
                </Card>
              </Pressable>
            </Pressable>
          </Modal>

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
                onPress={() => setActiveSettingsModal('privacy')}
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
                onPress={() => setActiveSettingsModal('support')}
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
                onPress={() => setActiveSettingsModal('legal')}
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
            icon={<Ionicons name="log-out-outline" size={20} color={Colors.status.error} />}
            style={styles.logoutButton}
            textStyle={styles.logoutText}
          />
        </View>
      </ScrollView>

      <Modal
        transparent
        animationType="fade"
        visible={logoutConfirmVisible}
        onRequestClose={() => setLogoutConfirmVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => {
            if (!logoutLoading) setLogoutConfirmVisible(false);
          }}
        >
          <Pressable style={styles.modalCardWrapper} onPress={() => undefined}>
            <Card style={styles.modalCard}>
              <View style={styles.modalHeaderRow}>
                <Text style={styles.modalTitle}>Déconnexion</Text>
                <TouchableOpacity
                  onPress={() => {
                    if (!logoutLoading) setLogoutConfirmVisible(false);
                  }}
                  hitSlop={12}
                >
                  <Ionicons name="close" size={22} color={Colors.neutral.gray600} />
                </TouchableOpacity>
              </View>

              <Text style={styles.modalBody}>Êtes-vous sûr de vouloir vous déconnecter ?</Text>

              {logoutError ? <Text style={styles.modalError}>{logoutError}</Text> : null}

              <View style={styles.modalActionsRow}>
                <Button
                  title="Annuler"
                  variant="outline"
                  onPress={() => setLogoutConfirmVisible(false)}
                  disabled={logoutLoading}
                  style={styles.modalActionButton}
                />
                <Button
                  title="Déconnexion"
                  variant="outline"
                  onPress={confirmLogout}
                  loading={logoutLoading}
                  style={[styles.modalActionButton, styles.destructiveButton]}
                  textStyle={styles.destructiveText}
                />
              </View>
            </Card>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        transparent
        animationType="fade"
        visible={deleteConfirmVisible}
        onRequestClose={() => setDeleteConfirmVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => {
            if (!deleteLoading) setDeleteConfirmVisible(false);
          }}
        >
          <Pressable style={styles.modalCardWrapper} onPress={() => undefined}>
            <Card style={styles.modalCard}>
              <View style={styles.modalHeaderRow}>
                <Text style={styles.modalTitle}>Supprimer mon compte</Text>
                <TouchableOpacity
                  onPress={() => {
                    if (!deleteLoading) setDeleteConfirmVisible(false);
                  }}
                  hitSlop={12}
                >
                  <Ionicons name="close" size={22} color={Colors.neutral.gray600} />
                </TouchableOpacity>
              </View>

              <Text style={styles.modalBody}>
                Cette action est irréversible. Pour confirmer, saisissez votre adresse email.
              </Text>

              <Input
                label="Adresse email"
                value={deleteEmail}
                onChangeText={(text) => {
                  setDeleteEmail(text);
                  setDeleteError(null);
                }}
                placeholder={currentEmail || 'ex: nom@domaine.com'}
                autoCapitalize="none"
                keyboardType="email-address"
                error={deleteError ?? undefined}
                editable={!deleteLoading}
              />

              <View style={styles.modalActionsRow}>
                <Button
                  title="Annuler"
                  variant="outline"
                  onPress={() => setDeleteConfirmVisible(false)}
                  disabled={deleteLoading}
                  style={styles.modalActionButton}
                />
                <Button
                  title="Supprimer"
                  variant="outline"
                  onPress={confirmDeleteAccount}
                  loading={deleteLoading}
                  disabled={!emailMatches}
                  style={[styles.modalActionButton, styles.destructiveButton]}
                  textStyle={styles.destructiveText}
                />
              </View>
            </Card>
          </Pressable>
        </Pressable>
      </Modal>

      <SettingsInfoModal
        visible={activeSettingsModal !== null}
        infoKey={activeSettingsModal}
        onClose={() => setActiveSettingsModal(null)}
        footer={
          activeSettingsModal === 'privacy' ? (
            <Button
              title="Supprimer mon compte"
              variant="outline"
              onPress={handleDeleteAccount}
              icon={<Ionicons name="trash-outline" size={20} color={Colors.status.error} />}
              style={styles.deleteButton}
              textStyle={styles.deleteText}
            />
          ) : null
        }
      />
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
    borderColor: Colors.status.error,
    marginBottom: Spacing.xl,
  },
  logoutText: {
    color: Colors.status.error,
  },

  deleteButton: {
    borderColor: Colors.status.error,
  },
  deleteText: {
    color: Colors.status.error,
  },
  appCopyright: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: `${Colors.neutral.gray900}66`,
  },
  modalCardWrapper: {
    width: '100%',
    maxWidth: 520,
  },
  modalCard: {
    gap: Spacing.lg,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    ...Typography.h3,
    color: Colors.neutral.gray900,
  },
  modalBody: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
    lineHeight: 20,
  },
  modalError: {
    ...Typography.body2,
    color: Colors.status.error,
  },
  modalActionsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  modalActionButton: {
    flex: 1,
  },
  destructiveButton: {
    borderColor: Colors.status.error,
  },
  destructiveText: {
    color: Colors.status.error,
  },

  healthModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.primary.green,
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg,
  },
  healthModalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
  },
  healthModalHeaderIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: `${Colors.primary.greenDark}66`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  healthModalTitle: {
    ...Typography.h3,
    color: Colors.neutral.white,
  },
  healthModalBody: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  healthModalRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  healthModalHalf: {
    flex: 1,
  },
  healthModalHelper: {
    ...Typography.caption,
    color: Colors.neutral.gray600,
  },
});

export default ProfileScreen;
