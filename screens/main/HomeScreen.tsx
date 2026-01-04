import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Logo } from '@/components/Logo';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  BorderRadius,
  Colors,
  GOALS,
  sanitizeGoals,
  Spacing,
  toggleGoalWithConflicts,
  Typography,
  type GoalId,
} from '@/constants';
import { useAuth } from '@/contexts/AuthContext';
import { subscribeDailyEntries, toDayKey } from '@/services/firestore';

type WeeklyCaloriesPoint = {
  day: string;
  value: number;
};

const recipeOfTheDay = {
  id: '1',
  title: 'Salade de quinoa aux légumes grillés',
  image: 'https://images.unsplash.com/photo-1640798629665-cb874ae363d2?w=800',
  time: 25,
  calories: 380,
  tags: ['Compatible diabète', 'Riche en fibres', 'Végétarien'],
};

const DAY_LABELS = ['D', 'L', 'M', 'M', 'J', 'V', 'S'] as const;

function getUserGoals(userProfile: Record<string, unknown> | null): GoalId[] {
  const flat = userProfile ?? {};
  const nested =
    typeof (flat as any).profile === 'object' && (flat as any).profile !== null ? ((flat as any).profile as any) : {};

  const v2GoalsSelected = (flat as any)?.goals?.selected;
  const candidate =
    (nested?.goals ?? nested?.objectives ?? v2GoalsSelected ?? (flat as any)?.goals ?? (flat as any)?.objectives) as unknown;

  return sanitizeGoals(candidate);
}

function GoalsModal({
  visible,
  goals,
  onToggle,
  onClose,
  onSave,
  saving,
}: {
  visible: boolean;
  goals: GoalId[];
  onToggle: (id: GoalId) => void;
  onClose: () => void;
  onSave: () => void;
  saving: boolean;
}) {
  const countLabel = `${goals.length} objectif${goals.length > 1 ? 's' : ''} sélectionné${goals.length > 1 ? 's' : ''}`;

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalCardWrapper} onPress={() => undefined}>
          <Card style={styles.goalsModalCard}>
            <View style={styles.goalsHeader}>
              <View style={styles.goalsHeaderLeft}>
                <View style={styles.goalsHeaderIcon}>
                  <Ionicons name="flag" size={20} color={Colors.neutral.white} />
                </View>
                <View>
                  <Text style={styles.goalsHeaderTitle}>Modifier mes objectifs</Text>
                  <Text style={styles.goalsHeaderSubtitle}>Sélectionnez vos objectifs de santé</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.goalsHeaderClose} onPress={onClose} hitSlop={10}>
                <Ionicons name="close" size={18} color={Colors.neutral.white} />
              </TouchableOpacity>
            </View>

            <View style={styles.goalsBody}>
              <Text style={styles.goalsCount}>{countLabel}</Text>
              <ScrollView showsVerticalScrollIndicator={false} style={styles.goalsList}>
                {GOALS.map((goal) => {
                  const selected = goals.includes(goal.id);
                  return (
                    <TouchableOpacity
                      key={goal.id}
                      style={[styles.goalRow, selected && styles.goalRowSelected]}
                      activeOpacity={0.85}
                      onPress={() => onToggle(goal.id)}
                    >
                      <View style={[styles.goalIcon, { backgroundColor: goal.iconBg }]}
                        >
                        <Ionicons name={goal.icon as any} size={18} color={goal.iconColor} />
                      </View>
                      <Text style={[styles.goalLabel, selected && styles.goalLabelSelected]}>{goal.label}</Text>
                      {selected ? (
                        <View style={styles.goalCheck}>
                          <Ionicons name="checkmark" size={18} color={Colors.neutral.white} />
                        </View>
                      ) : null}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <View style={styles.goalsActionsRow}>
                <Button title="Annuler" variant="outline" onPress={onClose} style={styles.goalsAction} />
                <Button
                  title={saving ? 'Enregistrement…' : 'Enregistrer mes objectifs'}
                  onPress={onSave}
                  disabled={saving}
                  style={styles.goalsAction}
                />
              </View>
            </View>
          </Card>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function HomeScreen() {
  const router = useRouter();
  const { user, userProfile, updateUserProfile } = useAuth();

  const caloriesGoal = 2000;

  const weekDays = useMemo(() => {
    const today = new Date();
    const jsDay = today.getDay(); // 0 (Sun) .. 6 (Sat)
    const mondayOffset = (jsDay + 6) % 7; // Monday -> 0
    const monday = new Date(today);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(today.getDate() - mondayOffset);

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      const dayLabel = DAY_LABELS[date.getDay()] ?? '·';
      return {
        date,
        dayKey: toDayKey(date),
        label: dayLabel,
      };
    });
  }, []);

  const todayDayKey = useMemo(() => toDayKey(new Date()), []);

  const [weeklyCalories, setWeeklyCalories] = useState<WeeklyCaloriesPoint[]>(() =>
    weekDays.map((d) => ({ day: d.label, value: 0 }))
  );

  const [todayCalories, setTodayCalories] = useState(0);
  const [todayWaterL, setTodayWaterL] = useState<number | null>(null);
  const [todayActivityMin, setTodayActivityMin] = useState<number | null>(null);
  const [weeklyAverage, setWeeklyAverage] = useState(0);

  const currentGoals = useMemo(() => getUserGoals((userProfile as any) ?? null), [userProfile]);
  const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false);
  const [draftGoals, setDraftGoals] = useState<GoalId[]>([]);
  const [savingGoals, setSavingGoals] = useState(false);

  const openGoalsModal = () => {
    setDraftGoals(currentGoals);
    setIsGoalsModalOpen(true);
  };

  const closeGoalsModal = () => {
    setIsGoalsModalOpen(false);
  };

  const toggleGoal = (id: GoalId) => {
    setDraftGoals((prev) => toggleGoalWithConflicts(prev, id));
  };

  const saveGoals = async () => {
    if (!user?.uid) {
      Alert.alert('Connexion requise', 'Veuillez vous connecter pour enregistrer vos objectifs.');
      return;
    }

    const sanitized = sanitizeGoals(draftGoals);
    setSavingGoals(true);
    const res = await updateUserProfile({ goals: sanitized });
    setSavingGoals(false);

    if (!res.success) {
      Alert.alert('Erreur', res.error ?? "Impossible d'enregistrer vos objectifs.");
      return;
    }

    closeGoalsModal();
  };

  useEffect(() => {
    if (!user?.uid) {
      return;
    }

    const from = new Date(weekDays[0]?.date ?? new Date());
    from.setHours(0, 0, 0, 0);
    const to = new Date(weekDays[6]?.date ?? new Date());
    to.setHours(23, 59, 59, 999);

    const unsubscribe = subscribeDailyEntries(
      user.uid,
      {
        from: Timestamp.fromDate(from),
        to: Timestamp.fromDate(to),
      },
      (items) => {
        const caloriesByDayKey = new Map<string, number>();
        const waterByDayKey = new Map<string, number>();
        const activityByDayKey = new Map<string, number>();
        for (const item of items) {
          const key = item.data.date;
          const value = (item.data.values as any)?.calories_kcal;
          const water = (item.data.values as any)?.water_l;
          const activity = (item.data.values as any)?.activity_min;
          if (typeof key === 'string' && typeof value === 'number') {
            caloriesByDayKey.set(key, value);
          }
          if (typeof key === 'string' && typeof water === 'number') {
            waterByDayKey.set(key, water);
          }
          if (typeof key === 'string' && typeof activity === 'number') {
            activityByDayKey.set(key, activity);
          }
        }

        const points = weekDays.map((d) => ({
          day: d.label,
          value: caloriesByDayKey.get(d.dayKey) ?? 0,
        }));

        setWeeklyCalories(points);

        const todayValue = caloriesByDayKey.get(todayDayKey) ?? 0;
        setTodayCalories(todayValue);

        setTodayWaterL(waterByDayKey.get(todayDayKey) ?? null);
        setTodayActivityMin(activityByDayKey.get(todayDayKey) ?? null);

        const entered = points.map((p) => p.value).filter((v) => v > 0);
        const avg = entered.length > 0 ? entered.reduce((a, b) => a + b, 0) / entered.length : 0;
        setWeeklyAverage(Math.round(avg));
      }
    );

    return () => unsubscribe();
  }, [todayDayKey, user?.uid, weekDays]);

  const caloriesProgress = (todayCalories / caloriesGoal) * 100;
  const barScaleMax = useMemo(() => {
    const max = Math.max(...weeklyCalories.map((p) => p.value), 0);
    return Math.max(caloriesGoal, max, 1);
  }, [caloriesGoal, weeklyCalories]);

  const profileData = (userProfile as Record<string, unknown> | null) ?? null;
  const conditions = Array.isArray((profileData as { conditions?: string[] })?.conditions)
    ? ((profileData as { conditions?: string[] }).conditions as string[])
    : Array.isArray((profileData as { profile?: { conditions?: string[] } })?.profile?.conditions)
      ? (((profileData as { profile?: { conditions?: string[] } }).profile?.conditions as string[]) ?? [])
      : [];

  const hasHealthInfo = conditions.length > 0 && conditions[0] !== 'none';

  const handleNavigate = (route: 'Profile' | 'Recipes' | 'Assistant' | 'Health' | 'Home') => {
    switch (route) {
      case 'Profile':
        router.push('/(tabs)/profile');
        return;
      case 'Recipes':
        router.push('/(tabs)/recipes');
        return;
      case 'Assistant':
        router.push('/(tabs)/ai');
        return;
      case 'Health':
        router.push('/(tabs)/health');
        return;
      case 'Home':
      default:
        router.push('/(tabs)');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[Colors.primary.green, Colors.primary.greenDark]} style={styles.header}>
          <View style={styles.headerContent}>
            <Logo size="small" showText />
            <TouchableOpacity style={styles.profileButton} onPress={() => handleNavigate('Profile')}>
              <View style={styles.profileAvatar}>
                <Ionicons name="person" size={20} color={Colors.neutral.white} />
              </View>
              <Text style={styles.profileText}>Mon profil</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerTitle}>
            <Text style={styles.greeting}>Bonjour ! 👋</Text>
            <Text style={styles.subtitle}>Voici votre tableau de bord santé personnalisé</Text>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.statsGrid}>
            <Card style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Ionicons name="flame" size={20} color={Colors.primary.green} />
              </View>
              <Text style={styles.statValue}>{todayCalories}</Text>
              <Text style={styles.statLabel}>Calories</Text>
            </Card>

            <Card style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: `${Colors.chart.blue}1A` }] }>
                <Ionicons name="water" size={20} color={Colors.chart.blue} />
              </View>
              <Text style={[styles.statValue, { color: Colors.chart.blue }]}>
                {typeof todayWaterL === 'number' ? `${todayWaterL.toFixed(1)}L` : '--'}
              </Text>
              <Text style={styles.statLabel}>Eau</Text>
            </Card>

            <Card style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: Colors.secondary.orangePastel }] }>
                <Ionicons name="fitness" size={20} color={Colors.secondary.orangeText} />
              </View>
              <Text style={[styles.statValue, { color: Colors.secondary.orangeText }]}>
                {typeof todayActivityMin === 'number' ? `${todayActivityMin}m` : '--'}
              </Text>
              <Text style={styles.statLabel}>Activité</Text>
            </Card>
          </View>

          <View style={styles.statsAddRow}>
            <TouchableOpacity
              style={styles.statsAddButton}
              onPress={() => router.push({ pathname: '/(tabs)/health', params: { openEncode: '1' } })}
              accessibilityRole="button"
              accessibilityLabel="Encoder mes données"
              activeOpacity={0.85}
            >
              <Ionicons name="add" size={16} color={Colors.primary.green} />
            </TouchableOpacity>
          </View>

          <Card>
            <View style={styles.chartHeader}>
              <View style={styles.chartTitleContainer}>
                <View style={styles.chartIcon}>
                  <Ionicons name="trending-up" size={20} color={Colors.primary.green} />
                </View>
                <View>
                  <Text style={styles.chartTitle}>Calories cette semaine</Text>
                  <Text style={styles.chartSubtitle}>Moyenne: {weeklyAverage} kcal/jour</Text>
                </View>
              </View>
            </View>

            <View style={styles.barChart}>
              {weeklyCalories.map((item, idx) => {
                const height = (item.value / barScaleMax) * 100;
                const isToday = weekDays[idx]?.dayKey === todayDayKey;
                return (
                  <View key={`${item.day}-${idx}`} style={styles.barContainer}>
                    <View style={styles.barArea}>
                      <View
                        style={[
                          styles.bar,
                          {
                            height: `${Math.max(0, Math.min(100, height))}%`,
                            backgroundColor: isToday
                              ? Colors.primary.green
                              : Colors.primary.greenPastel,
                          },
                        ]}
                      />
                    </View>
                    <Text style={[styles.barLabel, isToday && styles.barLabelActive]}>{item.day}</Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Objectif quotidien</Text>
                <Text style={styles.progressValue}>
                  {todayCalories} / {caloriesGoal} kcal
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${Math.min(caloriesProgress, 100)}%` }]} />
              </View>
            </View>
          </Card>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>✨ Recette du jour</Text>
          </View>

          <Card style={styles.recipeCard}>
            <Image source={{ uri: recipeOfTheDay.image }} style={styles.recipeImage} resizeMode="cover" />
            <View style={styles.recipeBadge}>
              <Badge label="⭐ Recette du jour" variant="health" />
            </View>
            <TouchableOpacity style={styles.recipeFavorite}>
              <Ionicons name="heart-outline" size={20} color={Colors.neutral.gray600} />
            </TouchableOpacity>

            <View style={styles.recipeContent}>
              <Text style={styles.recipeTitle}>{recipeOfTheDay.title}</Text>

              <View style={styles.recipeInfo}>
                <View style={styles.recipeInfoItem}>
                  <Ionicons name="time-outline" size={16} color={Colors.neutral.gray600} />
                  <Text style={styles.recipeInfoText}>{recipeOfTheDay.time} min</Text>
                </View>
                <View style={styles.recipeInfoItem}>
                  <Ionicons name="flame-outline" size={16} color={Colors.neutral.gray600} />
                  <Text style={styles.recipeInfoText}>{recipeOfTheDay.calories} kcal</Text>
                </View>
              </View>

              <View style={styles.recipeTags}>
                {recipeOfTheDay.tags.map((tag) => (
                  <Badge key={tag} label={tag} variant="health" />
                ))}
              </View>

              <Button
                title="Voir la recette"
                onPress={() => handleNavigate('Recipes')}
                icon={<Ionicons name="arrow-forward" size={20} color={Colors.neutral.white} />}
              />
            </View>
          </Card>

          <View style={styles.quickActions}>
            <Button
              title="Conseils IA"
              onPress={() => handleNavigate('Assistant')}
              style={styles.aiButton}
              icon={<Ionicons name="sparkles" size={20} color={Colors.neutral.white} />}
            />

            <View style={styles.actionsGrid}>
              <TouchableOpacity style={styles.actionCard} onPress={() => handleNavigate('Recipes')}>
                <View style={styles.actionIcon}>
                  <Ionicons name="restaurant" size={24} color={Colors.primary.green} />
                </View>
                <Text style={styles.actionTitle}>Mes recettes</Text>
                <Text style={styles.actionSubtitle}>125 recettes adaptées</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionCard} onPress={openGoalsModal}>
                <View style={[styles.actionIcon, { backgroundColor: Colors.secondary.orangePastel }] }>
                  <Ionicons name="flag" size={24} color={Colors.secondary.orangeText} />
                </View>
                <Text style={styles.actionTitle}>Mes objectifs</Text>
                <Text style={styles.actionSubtitle}>Suivi personnalisé</Text>
              </TouchableOpacity>
            </View>
          </View>

          {hasHealthInfo && (
            <View style={styles.healthInfo}>
              <View style={styles.healthInfoIcon}>
                <Ionicons name="heart" size={20} color={Colors.neutral.white} />
              </View>
              <View style={styles.healthInfoContent}>
                <Text style={styles.healthInfoTitle}>Vos recommandations santé</Text>
                <Text style={styles.healthInfoText}>
                  Toutes nos recettes sont adaptées à votre profil de santé pour vous accompagner au mieux dans votre parcours nutritionnel.
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <GoalsModal
        visible={isGoalsModalOpen}
        goals={draftGoals}
        onToggle={toggleGoal}
        onClose={closeGoalsModal}
        onSave={saveGoals}
        saving={savingGoals}
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
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    paddingBottom: 80,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    ...Typography.body2,
    color: Colors.neutral.white,
    fontWeight: '500',
  },
  headerTitle: {
    gap: Spacing.sm,
  },
  greeting: {
    ...Typography.h1,
    color: Colors.neutral.white,
  },
  subtitle: {
    ...Typography.body1,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    marginTop: -48,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    gap: Spacing.lg,
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

  goalsModalCard: {
    padding: 0,
    overflow: 'hidden',
  },
  goalsHeader: {
    backgroundColor: Colors.secondary.orangeText,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  goalsHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  goalsHeaderIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalsHeaderTitle: {
    ...Typography.h3,
    color: Colors.neutral.white,
  },
  goalsHeaderSubtitle: {
    ...Typography.body2,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  goalsHeaderClose: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    marginLeft: Spacing.md,
  },

  goalsBody: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  goalsCount: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },
  goalsList: {
    maxHeight: 420,
  },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    backgroundColor: Colors.neutral.white,
    marginBottom: Spacing.sm,
  },
  goalRowSelected: {
    borderColor: Colors.secondary.orangeText,
    backgroundColor: Colors.neutral.gray100,
  },
  goalIcon: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalLabel: {
    ...Typography.body1,
    color: Colors.neutral.gray900,
    flex: 1,
  },
  goalLabelSelected: {
    color: Colors.secondary.orangeText,
    fontWeight: '600',
  },
  goalCheck: {
    width: 26,
    height: 26,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.secondary.orangeText,
    justifyContent: 'center',
    alignItems: 'center',
  },

  goalsActionsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingTop: Spacing.sm,
  },
  goalsAction: {
    flex: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary.greenPastel,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },

  statsAddRow: {
    alignItems: 'center',
    marginTop: -Spacing.sm,
  },
  statsAddButton: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.neutral.white,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    ...Typography.h2,
    color: Colors.primary.green,
  },
  statLabel: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },
  chartHeader: {
    marginBottom: Spacing.md,
  },
  chartTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  chartIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary.greenPastel,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartTitle: {
    ...Typography.body1,
    fontWeight: '600',
    color: Colors.neutral.gray900,
  },
  chartSubtitle: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },
  barChart: {
    flexDirection: 'row',
    height: 96,
    gap: 6,
    marginBottom: Spacing.md,
  },
  barContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  barArea: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  barLabel: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },
  barLabelActive: {
    color: Colors.primary.green,
    fontWeight: '600',
  },
  progressContainer: {
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray300,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  progressLabel: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },
  progressValue: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },
  progressBar: {
    height: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.neutral.gray300,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary.green,
  },
  sectionHeader: {
    marginTop: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.neutral.gray900,
  },
  recipeCard: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    padding: 0,
  },
  recipeImage: {
    width: '100%',
    height: 220,
    backgroundColor: Colors.neutral.gray300,
  },
  recipeBadge: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
  },
  recipeFavorite: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeContent: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  recipeTitle: {
    ...Typography.h2,
    color: Colors.neutral.gray900,
  },
  recipeInfo: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  recipeInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  recipeInfoText: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },
  recipeTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  quickActions: {
    gap: Spacing.md,
  },
  aiButton: {
    height: 56,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  actionCard: {
    flex: 1,
    backgroundColor: Colors.neutral.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    gap: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary.greenPastel,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionTitle: {
    ...Typography.body1,
    fontWeight: '600',
    color: Colors.neutral.gray900,
  },
  actionSubtitle: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },
  healthInfo: {
    flexDirection: 'row',
    gap: Spacing.md,
    padding: Spacing.lg,
    backgroundColor: Colors.primary.greenPastel,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  healthInfoIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  healthInfoContent: {
    flex: 1,
    gap: Spacing.sm,
  },
  healthInfoTitle: {
    ...Typography.body1,
    fontWeight: '600',
    color: Colors.neutral.gray900,
  },
  healthInfoText: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },
});

export default HomeScreen;
