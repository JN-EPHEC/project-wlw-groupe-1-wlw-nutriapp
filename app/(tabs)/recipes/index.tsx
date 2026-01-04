import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
    Image,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
  useWindowDimensions,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useRouter } from 'expo-router';

import { RECIPES, type Recipe } from '@/data/recipes';
import { RecipeFilters, type RecipeFilterOption } from '@/components/recipes/RecipeFilters';
import { Badge } from '@/components/ui/Badge';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { useAuth } from '@/contexts/AuthContext';

type RecipeListTab = 'all' | 'categories' | 'favorites';

type FilterRule = RecipeFilterOption & {
  predicate: (recipe: Recipe) => boolean;
};

type AllergenKey =
  | 'gluten'
  | 'crustaceans'
  | 'eggs'
  | 'fish'
  | 'peanuts'
  | 'soy'
  | 'milk'
  | 'tree_nuts'
  | 'celery'
  | 'mustard'
  | 'sesame'
  | 'sulphites'
  | 'lupin'
  | 'molluscs';

const ALLERGEN_OPTIONS: Array<{ id: AllergenKey; label: string }> = [
  { id: 'gluten', label: 'Céréales contenant du gluten' },
  { id: 'crustaceans', label: 'Crustacés' },
  { id: 'eggs', label: 'Œufs' },
  { id: 'fish', label: 'Poisson' },
  { id: 'peanuts', label: 'Cacahuètes / arachides' },
  { id: 'soy', label: 'Soja' },
  { id: 'milk', label: 'Lait' },
  { id: 'tree_nuts', label: 'Noix / fruits à coque' },
  { id: 'celery', label: 'Céleri' },
  { id: 'mustard', label: 'Moutarde' },
  { id: 'sesame', label: 'Graines de sésame' },
  { id: 'sulphites', label: 'Dioxyde de soufre et sulfites' },
  { id: 'lupin', label: 'Lupin' },
  { id: 'molluscs', label: 'Mollusques' },
];

const normalizeText = (input: string) =>
  input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const ALLERGEN_KEYWORDS: Record<AllergenKey, string[]> = {
  gluten: ['gluten', 'ble', 'farine', 'pain', 'pates', 'semoule', 'couscous', 'seigle', 'orge', 'avoine', 'chapelure'],
  crustaceans: ['crustace', 'crevette', 'crabe', 'homard', 'langoustine'],
  eggs: ['oeuf', 'oeufs'],
  fish: ['poisson', 'saumon', 'cabillaud', 'thon', 'sardine', 'anchois', 'truite'],
  peanuts: ['cacahuete', 'cacahuetes', 'arachide', 'arachides', 'beurre de cacahuete'],
  soy: ['soja', 'tofu', 'tempeh', 'sauce soja'],
  milk: ['lait', 'yaourt', 'yogourt', 'fromage', 'beurre', 'creme', 'lactose'],
  tree_nuts: ['noix', 'noisette', 'amande', 'pistache', 'cajou', 'pecan', 'macadamia', 'pignon'],
  celery: ['celeri'],
  mustard: ['moutarde'],
  sesame: ['sesame', 'tahini'],
  sulphites: ['sulfite', 'sulfites', 'dioxyde de soufre'],
  lupin: ['lupin'],
  molluscs: ['mollusque', 'mollusques', 'moule', 'huitre', 'calamar', 'seiche', 'poulpe'],
};

function detectRecipeAllergens(recipe: Recipe): AllergenKey[] {
  const text = normalizeText((recipe.ingredients ?? []).join(' | '));
  const found: AllergenKey[] = [];
  for (const option of ALLERGEN_OPTIONS) {
    const keywords = ALLERGEN_KEYWORDS[option.id];
    if (keywords.some((kw) => text.includes(kw))) {
      found.push(option.id);
    }
  }
  return found;
}

function normalizeUserAllergies(input: unknown): AllergenKey[] {
  if (!Array.isArray(input)) return [];
  const set = new Set<AllergenKey>();
  for (const raw of input) {
    if (typeof raw !== 'string') continue;
    // Back-compat with onboarding legacy ids
    if (raw === 'lactose') {
      set.add('milk');
      continue;
    }
    if (raw === 'gluten') {
      set.add('gluten');
      continue;
    }
    if ((ALLERGEN_OPTIONS as any).some((o: any) => o.id === raw)) {
      set.add(raw as AllergenKey);
    }
  }
  return [...set];
}

function AllergensModal({
  visible,
  selected,
  onToggle,
  onClose,
  onApply,
}: {
  visible: boolean;
  selected: AllergenKey[];
  onToggle: (id: AllergenKey) => void;
  onClose: () => void;
  onApply: () => void;
}) {
  const countLabel = `${selected.length} allergène${selected.length > 1 ? 's' : ''} sélectionné${selected.length > 1 ? 's' : ''}`;

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalCardWrapper} onPress={() => undefined}>
          <View style={styles.allergensModalCard}>
            <View style={styles.allergensHeader}>
              <View style={styles.allergensHeaderLeft}>
                <View style={styles.allergensHeaderIcon}>
                  <Ionicons name="alert-circle" size={20} color={Colors.neutral.white} />
                </View>
                <View>
                  <Text style={styles.allergensHeaderTitle}>Allergènes</Text>
                  <Text style={styles.allergensHeaderSubtitle}>Exclure les recettes à risque</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.allergensHeaderClose} onPress={onClose} hitSlop={10}>
                <Ionicons name="close" size={18} color={Colors.neutral.white} />
              </TouchableOpacity>
            </View>

            <View style={styles.allergensBody}>
              <Text style={styles.allergensCount}>{countLabel}</Text>
              <ScrollView showsVerticalScrollIndicator={false} style={styles.allergensList}>
                {ALLERGEN_OPTIONS.map((a) => {
                  const isSelected = selected.includes(a.id);
                  return (
                    <TouchableOpacity
                      key={a.id}
                      style={[styles.allergenRow, isSelected && styles.allergenRowSelected]}
                      activeOpacity={0.85}
                      onPress={() => onToggle(a.id)}
                    >
                      <View style={[styles.allergenCheckbox, isSelected && styles.allergenCheckboxSelected]}>
                        {isSelected ? <Ionicons name="checkmark" size={16} color={Colors.neutral.white} /> : null}
                      </View>
                      <Text style={[styles.allergenLabel, isSelected && styles.allergenLabelSelected]}>{a.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <View style={styles.allergensActionsRow}>
                <TouchableOpacity style={styles.allergensActionOutline} onPress={onClose}>
                  <Text style={styles.allergensActionOutlineText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.allergensActionPrimary} onPress={onApply}>
                  <Text style={styles.allergensActionPrimaryText}>Appliquer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

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
  const { userProfile } = useAuth();
  const { width: windowWidth } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<(typeof CATEGORIES)[number]['id']>('all');
  const [activeTab, setActiveTab] = useState<RecipeListTab>('all');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isAllergensModalOpen, setIsAllergensModalOpen] = useState(false);
  const [selectedAllergens, setSelectedAllergens] = useState<AllergenKey[]>(() => {
    const nested =
      userProfile && typeof (userProfile as any).profile === 'object' && (userProfile as any).profile !== null
        ? (userProfile as any).profile
        : null;
    return normalizeUserAllergies(nested?.allergies ?? (userProfile as any)?.allergies);
  });
  const [draftAllergens, setDraftAllergens] = useState<AllergenKey[]>([]);

  useEffect(() => {
    // If user profile loads after first render, initialize the selection once.
    if (selectedAllergens.length > 0) return;
    const nested =
      userProfile && typeof (userProfile as any).profile === 'object' && (userProfile as any).profile !== null
        ? (userProfile as any).profile
        : null;
    const fromProfile = normalizeUserAllergies(nested?.allergies ?? (userProfile as any)?.allergies);
    if (fromProfile.length > 0) {
      setSelectedAllergens(fromProfile);
    }
  }, [userProfile, selectedAllergens.length]);
  const [favorites, setFavorites] = useState<string[]>(() =>
    RECIPES.filter((recipe) => recipe.favorite).map((recipe) => recipe.id)
  );

  const numColumns = useMemo(() => {
    // On very small screens, fallback to 1 column to avoid cramped cards.
    return windowWidth < 360 ? 1 : 2;
  }, [windowWidth]);

  const cardWidth = useMemo(() => {
    const horizontalPadding = Spacing.lg * 2;
    const availableWidth = Math.max(0, windowWidth - horizontalPadding);
    if (numColumns === 1) {
      return availableWidth;
    }

    const gutter = Spacing.md;
    return (availableWidth - gutter) / numColumns;
  }, [numColumns, windowWidth]);

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

  const openAllergensModal = useCallback(() => {
    setDraftAllergens(selectedAllergens);
    setIsAllergensModalOpen(true);
  }, [selectedAllergens]);

  const closeAllergensModal = useCallback(() => {
    setIsAllergensModalOpen(false);
  }, []);

  const toggleAllergen = useCallback((id: AllergenKey) => {
    setDraftAllergens((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const applyAllergens = useCallback(() => {
    setSelectedAllergens(draftAllergens);
    closeAllergensModal();
  }, [draftAllergens, closeAllergensModal]);

  const filteredRecipes = useMemo(() => {
    return RECIPES.filter((recipe) => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
      const matchesFavorites = activeTab !== 'favorites' || favorites.includes(recipe.id);
      const matchesAllergens =
        selectedAllergens.length === 0 ||
        (() => {
          const recipeAllergens = detectRecipeAllergens(recipe);
          return !selectedAllergens.some((a) => recipeAllergens.includes(a));
        })();
      const matchesAdvancedFilters =
        selectedFilters.length === 0 ||
        selectedFilters.every((filterId) => {
          const rule = FILTER_RULES.find((filter) => filter.id === filterId);
          return rule ? rule.predicate(recipe) : true;
        });

      return matchesSearch && matchesCategory && matchesFavorites && matchesAllergens && matchesAdvancedFilters;
    });
  }, [searchQuery, selectedCategory, activeTab, favorites, selectedFilters, selectedAllergens]);

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
          rightAction={
            <TouchableOpacity style={styles.allergensButton} onPress={openAllergensModal} activeOpacity={0.85}>
              <Ionicons name="alert-circle-outline" size={18} color={Colors.primary.green} />
              <Text style={styles.allergensButtonText}>Allergènes</Text>
            </TouchableOpacity>
          }
          style={styles.filters}
        />
      )}

      <AllergensModal
        visible={isAllergensModalOpen}
        selected={draftAllergens}
        onToggle={toggleAllergen}
        onClose={closeAllergensModal}
        onApply={applyAllergens}
      />

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

      <FlatList
        key={numColumns}
        data={filteredRecipes}
        keyExtractor={(recipe) => recipe.id}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.recipesContent}
        columnWrapperStyle={numColumns > 1 ? styles.recipeRow : undefined}
        renderItem={({ item: recipe }) => {
          const isFavorite = favorites.includes(recipe.id);

          return (
            <TouchableOpacity
              style={[styles.recipeCard, { width: cardWidth }]}
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
        }}
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
    height: 40,
    flexGrow: 0,
    flexShrink: 0,
    marginBottom: Spacing.md,
  },
  categoriesContent: {
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
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
  allergensButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary.greenPastel,
  },
  allergensButtonText: {
    ...Typography.body2,
    fontWeight: '500',
    color: Colors.primary.green,
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

  allergensModalCard: {
    backgroundColor: Colors.neutral.white,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  allergensHeader: {
    backgroundColor: Colors.primary.green,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  allergensHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  allergensHeaderIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  allergensHeaderTitle: {
    ...Typography.h3,
    color: Colors.neutral.white,
  },
  allergensHeaderSubtitle: {
    ...Typography.body2,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  allergensHeaderClose: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    marginLeft: Spacing.md,
  },

  allergensBody: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  allergensCount: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },
  allergensList: {
    maxHeight: 420,
  },
  allergenRow: {
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
  allergenRowSelected: {
    borderColor: Colors.primary.green,
    backgroundColor: Colors.neutral.gray100,
  },
  allergenCheckbox: {
    width: 22,
    height: 22,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.neutral.white,
  },
  allergenCheckboxSelected: {
    backgroundColor: Colors.primary.green,
    borderColor: Colors.primary.green,
  },
  allergenLabel: {
    ...Typography.body2,
    color: Colors.neutral.gray900,
    flex: 1,
  },
  allergenLabelSelected: {
    color: Colors.primary.green,
    fontWeight: '600',
  },
  allergensActionsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingTop: Spacing.sm,
  },
  allergensActionOutline: {
    flex: 1,
    height: 44,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.neutral.white,
  },
  allergensActionOutlineText: {
    ...Typography.body2,
    fontWeight: '600',
    color: Colors.neutral.gray900,
  },
  allergensActionPrimary: {
    flex: 1,
    height: 44,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary.green,
  },
  allergensActionPrimaryText: {
    ...Typography.body2,
    fontWeight: '600',
    color: Colors.neutral.white,
  },
  recipesContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
  },
  recipeRow: {
    justifyContent: 'space-between',
  },
  recipeCard: {
    backgroundColor: Colors.neutral.white,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: Spacing.md,
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
