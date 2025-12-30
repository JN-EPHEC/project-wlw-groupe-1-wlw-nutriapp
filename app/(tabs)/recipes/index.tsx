import { Ionicons } from '@expo/vector-icons';
import { useCallback, useMemo, useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useRouter } from 'expo-router';

import { RECIPES, type Recipe } from '@/data/recipes';
import { RecipeFilters, type RecipeFilterOption } from '@/components/recipes/RecipeFilters';
import { Badge } from '@/components/ui/Badge';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants';

type RecipeListTab = 'all' | 'categories' | 'favorites';

type FilterRule = RecipeFilterOption & {
  predicate: (recipe: Recipe) => boolean;
};

const CATEGORIES = [
  { id: 'all', label: 'Tout', icon: 'restaurant' as const },
  { id: 'breakfast', label: 'Petit-déj', icon: 'cafe' as const },
  { id: 'lunch', label: 'Déjeuner', icon: 'nutrition' as const },
  { id: 'dinner', label: 'Dîner', icon: 'pizza' as const },
  { id: 'snack', label: 'Collation', icon: 'ice-cream' as const },
] as const;

const FILTER_RULES: FilterRule[] = [
  {
    id: 'diabetes',
    label: 'Compatible diabète',
    description: 'Indice glycémique maîtrisé',
    icon: 'medkit-outline',
    predicate: (recipe) => recipe.tags.some((tag) => tag.toLowerCase().includes('diabète')),
  },
  {
    id: 'gluten-free',
    label: 'Sans gluten',
    description: 'Favorise la digestion',
    icon: 'leaf-outline',
    predicate: (recipe) => recipe.tags.some((tag) => tag.toLowerCase().includes('sans gluten')),
  },
  {
    id: 'vegetarian',
    label: 'Végétarien',
    description: 'Options végétales nutritives',
    icon: 'sparkles-outline',
    predicate: (recipe) => recipe.tags.some((tag) => tag.toLowerCase().includes('végétarien')),
  },
  {
    id: 'low-sodium',
    label: 'Faible sodium',
    description: 'Hypertension maîtrisée',
    icon: 'heart-outline',
    predicate: (recipe) => recipe.sodium <= 180,
  },
  {
    id: 'high-protein',
    label: 'Riche en protéines',
    description: 'Musculation & satiété',
    icon: 'barbell-outline',
    predicate: (recipe) => recipe.protein >= 20,
  },
  {
    id: 'quick',
    label: 'Rapide (-15min)',
    description: 'Prêt en un clin d’œil',
    icon: 'flash-outline',
    predicate: (recipe) => recipe.time <= 15,
  },
];

export default function RecipesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<(typeof CATEGORIES)[number]['id']>('all');
  const [activeTab, setActiveTab] = useState<RecipeListTab>('all');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() =>
    RECIPES.filter((recipe) => recipe.favorite).map((recipe) => recipe.id)
  );

  const filterOptions = useMemo<RecipeFilterOption[]>(
    () => FILTER_RULES.map(({ predicate, ...rest }) => rest),
    []
  );

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favoriteId) => favoriteId !== id) : [...prev, id]
    );
  }, []);

  const toggleFilter = useCallback((filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedFilters([]);
  }, []);

  const filteredRecipes = useMemo(() => {
    return RECIPES.filter((recipe) => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
      const matchesFavorites = activeTab !== 'favorites' || favorites.includes(recipe.id);
      const matchesAdvancedFilters =
        selectedFilters.length === 0 ||
        selectedFilters.every((filterId) => {
          const rule = FILTER_RULES.find((filter) => filter.id === filterId);
          return rule ? rule.predicate(recipe) : true;
        });

      return matchesSearch && matchesCategory && matchesFavorites && matchesAdvancedFilters;
    });
  }, [searchQuery, selectedCategory, activeTab, favorites, selectedFilters]);

  const handlePressRecipe = useCallback(
    (recipe: Recipe) => {
      router.push({ pathname: '/(tabs)/recipes/[id]', params: { id: recipe.id } });
    },
    [router]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Mes recettes</Text>
          <Text style={styles.headerSubtitle}>
            {filteredRecipes.length} recettes adaptées à votre profil
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.favoritesButton, activeTab === 'favorites' && styles.favoritesButtonActive]}
          onPress={() => setActiveTab((current) => (current === 'favorites' ? 'all' : 'favorites'))}
        >
          <Ionicons
            name={activeTab === 'favorites' ? 'heart' : 'heart-outline'}
            size={20}
            color={activeTab === 'favorites' ? Colors.neutral.white : Colors.neutral.gray900}
          />
          <Text
            style={[styles.favoritesText, activeTab === 'favorites' && styles.favoritesTextActive]}
          >
            Favoris
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color={Colors.neutral.gray600} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une recette..."
            placeholderTextColor={Colors.neutral.gray600}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={[styles.filterButton, (showFilters || selectedFilters.length > 0) && styles.filterButtonActive]}
          onPress={() => setShowFilters((prev) => !prev)}
        >
          <Ionicons
            name="options"
            size={20}
            color={showFilters || selectedFilters.length > 0 ? Colors.neutral.white : Colors.neutral.gray900}
          />
        </TouchableOpacity>
      </View>

      {(showFilters || selectedFilters.length > 0) && (
        <RecipeFilters
          filters={filterOptions}
          selectedFilters={selectedFilters}
          onToggle={toggleFilter}
          onClear={clearFilters}
          style={styles.filters}
        />
      )}

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.tabActive]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.tabTextActive]}>Toutes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'categories' && styles.tabActive]}
          onPress={() => setActiveTab('categories')}
        >
          <Text style={[styles.tabText, activeTab === 'categories' && styles.tabTextActive]}>
            Catégories
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'favorites' && styles.tabActive]}
          onPress={() => setActiveTab('favorites')}
        >
          <Text style={[styles.tabText, activeTab === 'favorites' && styles.tabTextActive]}>
            Favoris
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'categories' && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryChip, selectedCategory === category.id && styles.categoryChipActive]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Ionicons
                name={category.icon}
                size={16}
                color={
                  selectedCategory === category.id ? Colors.neutral.white : Colors.neutral.gray600
                }
              />
              <Text
                style={[styles.categoryChipText, selectedCategory === category.id && styles.categoryChipTextActive]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.recipesContent}>
        <View style={styles.recipesGrid}>
          {filteredRecipes.map((recipe) => {
            const isFavorite = favorites.includes(recipe.id);

            return (
              <TouchableOpacity
                key={recipe.id}
                style={styles.recipeCard}
                activeOpacity={0.88}
                onPress={() => handlePressRecipe(recipe)}
              >
                <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
                <TouchableOpacity
                  style={styles.recipeHeart}
                  activeOpacity={0.8}
                  onPress={(event) => {
                    event.stopPropagation();
                    toggleFavorite(recipe.id);
                  }}
                >
                  <Ionicons
                    name={isFavorite ? 'heart' : 'heart-outline'}
                    size={16}
                    color={isFavorite ? '#EF4444' : Colors.neutral.gray600}
                  />
                </TouchableOpacity>

                <View style={styles.recipeCardContent}>
                  <Text style={styles.recipeCardTitle} numberOfLines={2}>
                    {recipe.title}
                  </Text>
                  <View style={styles.recipeCardStats}>
                    <Text style={styles.recipeCardCalories}>{recipe.calories}</Text>
                    <Text style={styles.recipeCardUnit}>kcal</Text>
                    <Text style={styles.recipeDot}>·</Text>
                    <Text style={styles.recipeCardProtein}>{recipe.protein}g</Text>
                    <Text style={styles.recipeCardUnit}>protéines</Text>
                  </View>
                  <View style={styles.recipeTags}>
                    {recipe.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} label={tag} variant="health" style={styles.recipeTag} />
                    ))}
                  </View>
                  <View style={styles.recipeRating}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Ionicons key={star} name="star" size={14} color="#FACC15" />
                    ))}
                    <Text style={styles.ratingCount}>(120)</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray300,
  },
  headerTitle: {
    ...Typography.h2,
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  headerSubtitle: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },
  favoritesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    height: 40,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    backgroundColor: Colors.neutral.white,
  },
  favoritesButtonActive: {
    backgroundColor: Colors.primary.green,
    borderColor: Colors.primary.green,
  },
  favoritesText: {
    ...Typography.body2,
    fontWeight: '500',
    color: Colors.neutral.gray900,
  },
  favoritesTextActive: {
    color: Colors.neutral.white,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    height: 48,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.neutral.white,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
  },
  searchInput: {
    flex: 1,
    ...Typography.body1,
    color: Colors.neutral.gray900,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.neutral.white,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: Colors.primary.green,
    borderColor: Colors.primary.green,
  },
  tabs: {
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 4,
    backgroundColor: Colors.neutral.gray100,
    marginBottom: Spacing.md,
  },
  tab: {
    flex: 1,
    height: 40,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: Colors.neutral.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  tabText: {
    ...Typography.body2,
    fontWeight: '500',
    color: Colors.neutral.gray600,
  },
  tabTextActive: {
    color: Colors.neutral.gray900,
  },
  categoriesScroll: {
    marginBottom: Spacing.md,
  },
  categoriesContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.neutral.white,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    marginRight: Spacing.sm,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary.green,
    borderColor: Colors.primary.green,
  },
  categoryChipText: {
    ...Typography.body2,
    fontWeight: '500',
    color: Colors.neutral.gray600,
  },
  categoryChipTextActive: {
    color: Colors.neutral.white,
  },
  filters: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  recipesContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  recipesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  recipeCard: {
    width: '48%',
    backgroundColor: Colors.neutral.white,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  recipeImage: {
    width: '100%',
    height: 180,
    backgroundColor: Colors.neutral.gray300,
  },
  recipeHeart: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeCardContent: {
    padding: Spacing.md,
  },
  recipeCardTitle: {
    ...Typography.body1,
    fontWeight: '600',
    color: Colors.neutral.gray900,
    marginBottom: Spacing.sm,
    minHeight: 44,
  },
  recipeCardStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  recipeCardCalories: {
    ...Typography.body1,
    fontWeight: '600',
    color: Colors.primary.green,
  },
  recipeCardProtein: {
    ...Typography.body2,
    fontWeight: '600',
    color: Colors.neutral.gray900,
  },
  recipeCardUnit: {
    ...Typography.caption,
    color: Colors.neutral.gray600,
  },
  recipeDot: {
    ...Typography.body1,
    color: Colors.neutral.gray300,
    marginHorizontal: 2,
  },
  recipeTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  recipeTag: {
    marginRight: 0,
  },
  recipeRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  ratingCount: {
    ...Typography.caption,
    color: Colors.neutral.gray600,
  },
});
