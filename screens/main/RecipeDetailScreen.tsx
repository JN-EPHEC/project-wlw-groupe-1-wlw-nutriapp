import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RECIPES } from '@/data/recipes';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants';

export function RecipeDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const recipeId = Array.isArray(params.id) ? params.id[0] : params.id;

  const recipe = useMemo(() => RECIPES.find((item) => item.id === recipeId), [recipeId]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(recipe?.favorite ?? false);
  }, [recipe]);

  if (!recipe) {
    return (
      <SafeAreaView style={styles.emptyContainer} edges={['top']}>
        <View style={styles.emptyContent}>
          <Text style={styles.emptyTitle}>Recette introuvable</Text>
          <Button title="Revenir aux recettes" onPress={() => router.replace('/(tabs)/recipes')} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)', 'transparent']}
          style={styles.gradient}
        />

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={Colors.neutral.gray900} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => setIsFavorite((prev) => !prev)}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={isFavorite ? '#EF4444' : Colors.neutral.gray900}
          />
        </TouchableOpacity>

        <View style={styles.titleOverlay}>
          <Text style={styles.title}>{recipe.title}</Text>
          <View style={styles.stats}>
            <View style={styles.statPill}>
              <Ionicons name="time-outline" size={16} color={Colors.neutral.white} />
              <Text style={styles.statText}>{recipe.time} min</Text>
            </View>
            <View style={styles.statPill}>
              <Ionicons name="flame-outline" size={16} color={Colors.neutral.white} />
              <Text style={styles.statText}>{recipe.calories} kcal</Text>
            </View>
            <View style={styles.statPill}>
              <Ionicons name="people-outline" size={16} color={Colors.neutral.white} />
              <Text style={styles.statText}>2 pers</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.tags}>
          {recipe.tags.map((tag) => (
            <Badge key={tag} label={tag} variant="health" />
          ))}
        </View>

        <Card>
          <View style={styles.cardHeader}>
            <View style={styles.cardIcon}>
              <Ionicons name="flame" size={20} color={Colors.primary.green} />
            </View>
            <Text style={styles.cardTitle}>Informations nutritionnelles</Text>
          </View>

          <View style={styles.nutritionGrid}>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>{recipe.calories}</Text>
              <Text style={styles.nutritionLabel}>Calories</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>{recipe.carbs}g</Text>
              <Text style={styles.nutritionLabel}>Glucides</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>{recipe.protein}g</Text>
              <Text style={styles.nutritionLabel}>Protéines</Text>
            </View>
          </View>

          <View style={styles.nutritionDetails}>
            <View style={styles.nutritionRow}>
              <Text style={styles.nutritionRowLabel}>Lipides</Text>
              <Text style={styles.nutritionRowValue}>{recipe.fat}g</Text>
            </View>
            <View style={styles.nutritionRow}>
              <Text style={styles.nutritionRowLabel}>Sodium</Text>
              <Text style={styles.nutritionRowValue}>{recipe.sodium}mg</Text>
            </View>
          </View>
        </Card>

        <Card>
          <View style={styles.cardHeader}>
            <View style={[styles.cardIcon, { backgroundColor: Colors.secondary.orangePastel }]}> 
              <Ionicons name="restaurant" size={20} color={Colors.secondary.orangeText} />
            </View>
            <Text style={styles.cardTitle}>Ingrédients</Text>
          </View>
          {recipe.ingredients.map((ingredient, index) => (
            <View key={`${ingredient}-${index}`} style={styles.ingredientItem}>
              <View style={styles.ingredientDot} />
              <Text style={styles.ingredientText}>{ingredient}</Text>
            </View>
          ))}
        </Card>

        <Card>
          <View style={styles.cardHeader}>
            <View style={styles.cardIcon}>
              <Ionicons name="list" size={20} color={Colors.primary.green} />
            </View>
            <Text style={styles.cardTitle}>Préparation</Text>
          </View>
          {recipe.steps.map((step, index) => (
            <View key={`${step}-${index}`} style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </Card>

        <Button
          title="Commencer la recette"
          icon={<Ionicons name="play" size={20} color={Colors.neutral.white} />}
          style={styles.actionButton}
          onPress={() => {}}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray100,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: Colors.neutral.gray100,
  },
  emptyContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  emptyTitle: {
    ...Typography.h3,
    textAlign: 'center',
    color: Colors.neutral.gray900,
  },
  imageContainer: {
    height: 288,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: Spacing.lg,
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 48,
    right: Spacing.lg,
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  title: {
    ...Typography.h1,
    color: Colors.neutral.white,
    marginBottom: Spacing.md,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  stats: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statText: {
    ...Typography.body2,
    fontWeight: '500',
    color: Colors.neutral.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
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
  nutritionGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  nutritionItem: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: BorderRadius.md,
  },
  nutritionValue: {
    ...Typography.h2,
    color: Colors.primary.green,
    marginBottom: 4,
  },
  nutritionLabel: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
    fontWeight: '500',
  },
  nutritionDetails: {
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray300,
    gap: Spacing.md,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: BorderRadius.sm,
  },
  nutritionRowLabel: {
    ...Typography.body1,
    color: Colors.neutral.gray600,
  },
  nutritionRowValue: {
    ...Typography.body1,
    fontWeight: '600',
    color: Colors.neutral.gray900,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
  },
  ingredientDot: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary.greenPastel,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  ingredientText: {
    flex: 1,
    ...Typography.body1,
    color: Colors.neutral.gray900,
  },
  stepItem: {
    flexDirection: 'row',
    gap: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    ...Typography.body1,
    fontWeight: '700',
    color: Colors.neutral.white,
  },
  stepText: {
    flex: 1,
    ...Typography.body1,
    color: Colors.neutral.gray900,
    paddingTop: 8,
  },
  actionButton: {
    marginVertical: Spacing.xl,
  },
});

export default RecipeDetailScreen;
