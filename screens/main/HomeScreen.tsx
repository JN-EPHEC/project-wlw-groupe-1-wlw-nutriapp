import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Logo } from '@/components/Logo';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { useAuth } from '@/contexts/AuthContext';

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

const weeklyCalories: WeeklyCaloriesPoint[] = [
  { day: 'L', value: 1850 },
  { day: 'M', value: 1920 },
  { day: 'M', value: 1780 },
  { day: 'J', value: 2050 },
  { day: 'V', value: 1890 },
  { day: 'S', value: 1950 },
  { day: 'D', value: 1820 },
];

export function HomeScreen() {
  const router = useRouter();
  const { userProfile } = useAuth();

  const todayCalories = 1820;
  const caloriesGoal = 2000;
  const caloriesProgress = (todayCalories / caloriesGoal) * 100;

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
              <View style={[styles.statIconContainer, { backgroundColor: '#DBEAFE' }] }>
                <Ionicons name="water" size={20} color="#3B82F6" />
              </View>
              <Text style={[styles.statValue, { color: '#3B82F6' }]}>1.8L</Text>
              <Text style={styles.statLabel}>Eau</Text>
            </Card>

            <Card style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: Colors.secondary.orangePastel }] }>
                <Ionicons name="fitness" size={20} color={Colors.secondary.orangeText} />
              </View>
              <Text style={[styles.statValue, { color: Colors.secondary.orangeText }]}>45m</Text>
              <Text style={styles.statLabel}>Activité</Text>
            </Card>
          </View>

          <Card>
            <View style={styles.chartHeader}>
              <View style={styles.chartTitleContainer}>
                <View style={styles.chartIcon}>
                  <Ionicons name="trending-up" size={20} color={Colors.primary.green} />
                </View>
                <View>
                  <Text style={styles.chartTitle}>Calories cette semaine</Text>
                  <Text style={styles.chartSubtitle}>Moyenne: 1895 kcal/jour</Text>
                </View>
              </View>
            </View>

            <View style={styles.barChart}>
              {weeklyCalories.map((item, idx) => {
                const height = (item.value / 2200) * 100;
                const isToday = idx === weeklyCalories.length - 1;
                return (
                  <View key={`${item.day}-${idx}`} style={styles.barContainer}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: `${height}%`,
                          backgroundColor: isToday ? Colors.primary.green : Colors.primary.greenPastel,
                        },
                      ]}
                    />
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

              <TouchableOpacity style={styles.actionCard} onPress={() => handleNavigate('Health')}>
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
