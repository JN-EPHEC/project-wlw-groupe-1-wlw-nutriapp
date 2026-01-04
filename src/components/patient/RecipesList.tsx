import { useState } from 'react';
import { Search, Heart, Clock, Flame, Filter, UtensilsCrossed, Apple, Beef, Salad, Users, Star, ChevronLeft, ChevronRight, Menu, User as UserIcon, Plus, ArrowDown } from 'lucide-react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import RecipeDetail from './RecipeDetail';
import FilterPanel, { FilterState } from './FilterPanel';
import Logo from '../Logo';

interface UserProfile {
  conditions?: string[];
  allergies?: string[];
  goals?: string[];
}

interface RecipesListProps {
  profile: UserProfile;
}

interface Recipe {
  id: string;
  title: string;
  image: string;
  time: number;
  calories: number;
  tags: string[];
  favorite: boolean;
  protein: number;
  carbs: number;
  fat: number;
  sodium: number;
  ingredients: string[];
  steps: string[];
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  description?: string;
}

const categories = [
  { id: 'all', label: 'Tout', icon: UtensilsCrossed },
  { id: 'breakfast', label: 'Petit-déj', icon: Apple },
  { id: 'lunch', label: 'Déjeuner', icon: Salad },
  { id: 'dinner', label: 'Dîner', icon: Beef },
  { id: 'snack', label: 'Collation', icon: Apple },
];

const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Salade Keto complète',
    image: 'https://images.unsplash.com/photo-1649531794884-b8bb1de72e68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2FsYWQlMjBib3dsfGVufDF8fHx8MTc2Mjc2MTM2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    time: 15,
    calories: 370,
    tags: ['Compatible diabète', 'Sans gluten', 'Faible glucides'],
    favorite: true,
    protein: 18,
    carbs: 12,
    fat: 28,
    sodium: 220,
    ingredients: [
      '½ cup extra-virgin olive oil',
      '¼ cup lime juice',
      '¼ avocado',
      '½ teaspoon salt',
      '½ teaspoon freshly ground pepper',
      'Pinch of minced garlic',
      '150g mixed greens',
      '100g grilled chicken strips'
    ],
    steps: [
      'Mélanger l\'huile d\'olive, le jus de citron vert, l\'avocat, le sel, le poivre et l\'ail dans un bol',
      'Disposer les légumes verts dans une assiette',
      'Ajouter les morceaux de poulet grillé',
      'Arroser de vinaigrette',
      'Servir immédiatement'
    ],
    category: 'lunch',
    description: 'Healthy and nutritious food recipes'
  },
  {
    id: '2',
    title: 'Poulet grillé & Légumes',
    image: 'https://images.unsplash.com/photo-1682423187670-4817da9a1b23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMG1lYWx8ZW58MXx8fHwxNzYyNjc4ODIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    time: 35,
    calories: 450,
    tags: ['Riche en protéines', 'Sans lactose', 'Faible sel'],
    favorite: false,
    protein: 45,
    carbs: 35,
    fat: 12,
    sodium: 180,
    ingredients: [
      '250g de blanc de poulet',
      '200g de brocoli',
      '1 poivron rouge',
      '1 courgette',
      'Huile d\'olive',
      'Épices cajun',
      'Citron'
    ],
    steps: [
      'Préchauffer le grill à température moyenne',
      'Assaisonner le poulet avec les épices',
      'Couper les légumes en gros morceaux',
      'Griller le poulet 6-8 minutes de chaque côté',
      'Faire sauter les légumes pendant 10 minutes',
      'Servir avec un quartier de citron'
    ],
    category: 'dinner',
    description: 'Grilled chicken with seasonal vegetables'
  },
  {
    id: '3',
    title: 'Porridge aux baies',
    image: 'https://images.unsplash.com/photo-1602682822546-09bc5623461e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBvYXRtZWFsJTIwYmVycmllc3xlbnwxfHx8fDE3NjI3NzQ5MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    time: 10,
    calories: 320,
    tags: ['Végétarien', 'Riche en fibres', 'Sans gluten'],
    favorite: true,
    protein: 12,
    carbs: 55,
    fat: 8,
    sodium: 95,
    ingredients: [
      '80g de flocons d\'avoine sans gluten',
      '300ml de lait d\'amande',
      '100g de myrtilles fraîches',
      '50g de framboises',
      '1 c. à soupe de miel',
      'Graines de chia',
      'Amandes effilées'
    ],
    steps: [
      'Porter le lait d\'amande à ébullition',
      'Ajouter les flocons d\'avoine et réduire le feu',
      'Cuire 5-7 minutes en remuant',
      'Verser dans un bol',
      'Garnir de baies, miel, graines de chia et amandes',
      'Servir chaud'
    ],
    category: 'breakfast',
    description: 'Warm oatmeal with fresh berries'
  },
  {
    id: '4',
    title: 'Saumon & Légumes vapeur',
    image: 'https://images.unsplash.com/photo-1746783840967-738ea85b0f25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoJTIwdmVnZXRhYmxlcyUyMGRpbm5lcnxlbnwxfHx8fDE3NjI3ODM1NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    time: 25,
    calories: 380,
    tags: ['Compatible diabète', 'Riche en Oméga-3', 'Hypertension'],
    favorite: false,
    protein: 35,
    carbs: 18,
    fat: 20,
    sodium: 150,
    ingredients: [
      '200g de filet de saumon',
      '150g de haricots verts',
      '100g de carottes',
      '1 citron',
      'Aneth frais',
      'Huile d\'olive',
      'Poivre'
    ],
    steps: [
      'Préparer le cuiseur vapeur',
      'Assaisonner le saumon avec aneth, citron et poivre',
      'Couper les légumes en morceaux uniformes',
      'Cuire le saumon à la vapeur 12-15 minutes',
      'Cuire les légumes 8-10 minutes',
      'Servir avec un filet d\'huile d\'olive'
    ],
    category: 'dinner',
    description: 'Steamed salmon with fresh vegetables'
  },
  {
    id: '5',
    title: 'Soupe minestrone maison',
    image: 'https://images.unsplash.com/photo-1629032355269-bde5c5da4ab2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc291cCUyMGJvd2x8ZW58MXx8fHwxNzYyNzI1ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    time: 40,
    calories: 280,
    tags: ['Végétarien', 'Riche en fibres', 'Faible calories'],
    favorite: true,
    protein: 10,
    carbs: 42,
    fat: 8,
    sodium: 200,
    ingredients: [
      '1 oignon',
      '2 carottes',
      '2 branches de céleri',
      '1 courgette',
      '200g de haricots blancs',
      '400g de tomates concassées',
      '1L de bouillon de légumes',
      'Basilic frais',
      'Parmesan (optionnel)'
    ],
    steps: [
      'Faire revenir l\'oignon dans une grande casserole',
      'Ajouter carottes et céleri, cuire 5 minutes',
      'Ajouter courgette, tomates et bouillon',
      'Porter à ébullition puis réduire le feu',
      'Ajouter les haricots blancs',
      'Laisser mijoter 25 minutes',
      'Garnir de basilic frais et servir'
    ],
    category: 'lunch',
    description: 'Traditional Italian vegetable soup'
  },
  {
    id: '6',
    title: 'Pâtes primavera légères',
    image: 'https://images.unsplash.com/photo-1628262815115-08c50c64e73c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFyaWFuJTIwcGFzdGF8ZW58MXx8fHwxNzYyNzgzNTQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    time: 20,
    calories: 420,
    tags: ['Végétarien', 'Faible sel', 'Méditerranéen'],
    favorite: false,
    protein: 14,
    carbs: 68,
    fat: 12,
    sodium: 160,
    ingredients: [
      '200g de pâtes complètes',
      '1 courgette',
      '1 poivron jaune',
      '100g de tomates cerises',
      '2 gousses d\'ail',
      'Basilic frais',
      'Huile d\'olive',
      'Parmesan râpé'
    ],
    steps: [
      'Cuire les pâtes al dente',
      'Couper les légumes en petits morceaux',
      'Faire revenir l\'ail dans l\'huile d\'olive',
      'Ajouter les légumes et cuire 8 minutes',
      'Mélanger avec les pâtes égouttées',
      'Garnir de basilic et parmesan',
      'Servir immédiatement'
    ],
    category: 'lunch',
    description: 'Light pasta with spring vegetables'
  },
  {
    id: '7',
    title: 'Tartine avocat & œuf poché',
    image: 'https://images.unsplash.com/photo-1649531794884-b8bb1de72e68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2FsYWQlMjBib3dsfGVufDF8fHx8MTc2Mjc2MTM2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    time: 12,
    calories: 340,
    tags: ['Végétarien', 'Riche en protéines', 'Sans lactose'],
    favorite: true,
    protein: 16,
    carbs: 28,
    fat: 20,
    sodium: 240,
    ingredients: [
      '2 tranches de pain complet',
      '1 avocat mûr',
      '2 œufs',
      'Jus de citron',
      'Flocons de piment',
      'Graines de sésame',
      'Sel, poivre'
    ],
    steps: [
      'Griller le pain',
      'Écraser l\'avocat avec jus de citron, sel et poivre',
      'Porter de l\'eau à frémissement pour les œufs',
      'Pocher les œufs 3-4 minutes',
      'Étaler l\'avocat sur le pain grillé',
      'Disposer l\'œuf poché dessus',
      'Garnir de flocons de piment et graines de sésame'
    ],
    category: 'breakfast',
    description: 'Avocado toast with poached egg'
  },
  {
    id: '8',
    title: 'Bowl buddha végétarien',
    image: 'https://images.unsplash.com/photo-1649531794884-b8bb1de72e68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2FsYWQlMjBib3dsfGVufDF8fHx8MTc2Mjc2MTM2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    time: 30,
    calories: 480,
    tags: ['Végétarien', 'Sans gluten', 'Riche en fibres'],
    favorite: false,
    protein: 20,
    carbs: 62,
    fat: 18,
    sodium: 190,
    ingredients: [
      '150g de quinoa',
      '100g de pois chiches rôtis',
      '1 patate douce',
      '50g d\'épinards frais',
      '¼ d\'avocat',
      'Graines de courge',
      'Sauce tahini',
      'Citron'
    ],
    steps: [
      'Cuire le quinoa',
      'Rôtir la patate douce coupée en dés (20 min à 200°C)',
      'Faire rôtir les pois chiches assaisonnés',
      'Disposer tous les ingrédients dans un bol',
      'Ajouter les épinards frais',
      'Arroser de sauce tahini',
      'Garnir de graines de courge et citron'
    ],
    category: 'lunch',
    description: 'Complete vegetarian buddha bowl'
  },
  {
    id: '9',
    title: 'Smoothie vert détox',
    image: 'https://images.unsplash.com/photo-1602682822546-09bc5623461e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBvYXRtZWFsJTIwYmVycmllc3xlbnwxfHx8fDE3NjI3NzQ5MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    time: 5,
    calories: 180,
    tags: ['Végétarien', 'Antioxydants', 'Sans lactose'],
    favorite: true,
    protein: 6,
    carbs: 32,
    fat: 4,
    sodium: 45,
    ingredients: [
      '1 banane',
      '100g d\'épinards frais',
      '½ concombre',
      '1 pomme verte',
      '200ml d\'eau de coco',
      'Jus de ½ citron',
      'Gingembre frais',
      'Quelques feuilles de menthe'
    ],
    steps: [
      'Laver tous les ingrédients',
      'Couper les fruits et légumes en morceaux',
      'Mettre tous les ingrédients dans le blender',
      'Mixer jusqu\'à obtenir une texture lisse',
      'Ajouter de l\'eau si trop épais',
      'Servir frais avec des glaçons'
    ],
    category: 'snack',
    description: 'Detox green smoothie'
  },
  {
    id: '10',
    title: 'Curry de lentilles corail',
    image: 'https://images.unsplash.com/photo-1629032355269-bde5c5da4ab2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc291cCUyMGJvd2x8ZW58MXx8fHwxNzYyNzI1ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    time: 35,
    calories: 360,
    tags: ['Végétarien', 'Sans gluten', 'Riche en protéines'],
    favorite: false,
    protein: 18,
    carbs: 52,
    fat: 9,
    sodium: 170,
    ingredients: [
      '200g de lentilles corail',
      '400ml de lait de coco',
      '1 oignon',
      '2 gousses d\'ail',
      '1 c. à soupe de curry',
      'Curcuma',
      'Gingembre frais',
      'Coriandre fraîche',
      '400g de tomates concassées'
    ],
    steps: [
      'Faire revenir l\'oignon et l\'ail',
      'Ajouter curry, curcuma et gingembre',
      'Ajouter les lentilles et mélanger',
      'Verser le lait de coco et les tomates',
      'Porter à ébullition puis réduire le feu',
      'Laisser mijoter 25 minutes',
      'Garnir de coriandre fraîche'
    ],
    category: 'dinner',
    description: 'Creamy red lentil curry'
  },
  {
    id: '11',
    title: 'Salade grecque classique',
    image: 'https://images.unsplash.com/photo-1649531794884-b8bb1de72e68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2FsYWQlMjBib3dsfGVufDF8fHx8MTc2Mjc2MTM2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    time: 15,
    calories: 320,
    tags: ['Végétarien', 'Sans gluten', 'Méditerranéen'],
    favorite: true,
    protein: 12,
    carbs: 18,
    fat: 24,
    sodium: 280,
    ingredients: [
      '200g de tomates',
      '1 concombre',
      '1 poivron vert',
      '½ oignon rouge',
      '100g de feta',
      'Olives kalamata',
      'Huile d\'olive',
      'Origan séché',
      'Jus de citron'
    ],
    steps: [
      'Couper les tomates en quartiers',
      'Couper le concombre et le poivron en morceaux',
      'Émincer finement l\'oignon rouge',
      'Disposer les légumes dans un plat',
      'Ajouter les olives et la feta en cubes',
      'Arroser d\'huile d\'olive et jus de citron',
      'Saupoudrer d\'origan et servir'
    ],
    category: 'lunch',
    description: 'Classic Greek salad'
  },
  {
    id: '12',
    title: 'Pancakes protéinés',
    image: 'https://images.unsplash.com/photo-1602682822546-09bc5623461e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBvYXRtZWFsJTIwYmVycmllc3xlbnwxfHx8fDE3NjI3NzQ5MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    time: 20,
    calories: 380,
    tags: ['Riche en protéines', 'Sans lactose', 'Végétarien'],
    favorite: false,
    protein: 24,
    carbs: 48,
    fat: 10,
    sodium: 120,
    ingredients: [
      '2 bananes mûres',
      '4 œufs',
      '50g de flocons d\'avoine',
      '1 c. à café de levure',
      'Cannelle',
      'Sirop d\'érable',
      'Myrtilles fraîches',
      'Huile de coco'
    ],
    steps: [
      'Écraser les bananes dans un bol',
      'Ajouter les œufs et bien mélanger',
      'Incorporer les flocons d\'avoine, levure et cannelle',
      'Laisser reposer 5 minutes',
      'Faire chauffer une poêle avec l\'huile de coco',
      'Verser des petites portions de pâte',
      'Cuire 2-3 minutes de chaque côté',
      'Servir avec sirop d\'érable et myrtilles'
    ],
    category: 'breakfast',
    description: 'Protein-rich banana pancakes'
  }
];

export default function RecipesList({ profile }: RecipesListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState(mockRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'categories' | 'favorites'>('all');
  const [filterState, setFilterState] = useState<FilterState>({
    allergies: [],
    healthConditions: [],
    prepTimeRange: [15, 50]
  });

  // Filter recipes based on search, category, and advanced filters
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Tab-based filtering
    if (activeTab === 'favorites') {
      if (!recipe.favorite) return false;
    }
    
    // Category filtering (only when "Catégories" tab is active)
    const matchesCategory = activeTab !== 'categories' || selectedCategory === 'all' || recipe.category === selectedCategory;
    
    // Filter by preparation time
    const matchesPrepTime = recipe.time >= filterState.prepTimeRange[0] && 
                           recipe.time <= filterState.prepTimeRange[1];
    
    // Filter by allergies (if lactose selected, show "Sans lactose" recipes)
    const matchesAllergies = filterState.allergies.length === 0 || 
      filterState.allergies.some(allergy => {
        const allergyMap: { [key: string]: string } = {
          'Lactose': 'sans lactose',
          'Gluten': 'sans gluten',
          'Peanuts': 'sans arachide',
          'Eggs': 'sans œuf'
        };
        const searchTerm = allergyMap[allergy] || allergy.toLowerCase();
        return recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm));
      });

    // Filter by health conditions
    const matchesHealth = filterState.healthConditions.length === 0 || 
      filterState.healthConditions.some(condition => {
        const conditionMap: { [key: string]: string } = {
          'diabetes': 'diabète',
          'hypertension': 'hypertension',
          'cholesterol': 'cholestérol',
          'obesity': 'faible calories'
        };
        const searchTerm = conditionMap[condition] || condition;
        return recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm));
      });

    return matchesSearch && matchesCategory && matchesPrepTime && matchesAllergies && matchesHealth;
  });

  const toggleFavorite = (id: string) => {
    setRecipes(recipes.map(r => 
      r.id === id ? { ...r, favorite: !r.favorite } : r
    ));
  };

  if (selectedRecipe) {
    return (
      <RecipeDetail 
        recipe={selectedRecipe}
        onBack={() => setSelectedRecipe(null)}
        onToggleFavorite={() => {
          toggleFavorite(selectedRecipe.id);
          setSelectedRecipe({...selectedRecipe, favorite: !selectedRecipe.favorite});
        }}
      />
    );
  }

  return (
    <div className="min-h-full bg-[#F8F8F8]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E5E5] px-6 py-5 shadow-unified">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-h2 text-[#1A1A1A] mb-1">Mes recettes</h1>
            <p className="text-body-2 text-[#6C6C6C]">
              {filteredRecipes.length} recettes adaptées à votre profil
            </p>
          </div>
          <button 
            onClick={() => {
              setActiveTab('favorites');
              setSelectedCategory('all');
            }}
            className={`flex items-center gap-2 px-4 h-10 rounded-full transition-colors shadow-sm ${
              activeTab === 'favorites'
                ? 'bg-[#1DBF73] text-white'
                : 'bg-white text-[#1A1A1A] border border-[#E5E5E5] hover:bg-[#DCF9EA]'
            }`}
          >
            <Heart className={`w-4 h-4 ${activeTab === 'favorites' ? 'fill-white' : ''}`} strokeWidth={2} />
            <span className="text-sm font-medium">Favoris</span>
          </button>
        </div>
      </div>

      <div className="p-6 pb-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Search & Filter */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C6C6C]" strokeWidth={2} />
              <Input
                placeholder="Rechercher une recette..."
                className="pl-12 h-12 rounded-xl border-[#E5E5E5] bg-white shadow-unified"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setFilterPanelOpen(true)}
              className="w-12 h-12 rounded-xl bg-white border border-[#E5E5E5] flex items-center justify-center hover:bg-[#F8F8F8] transition-colors shadow-unified"
            >
              <Filter className="w-5 h-5 text-[#1A1A1A]" strokeWidth={2} />
            </button>
          </div>

          {/* Tab Selector */}
          <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => {
                setActiveTab('all');
                setSelectedCategory('all');
              }}
              className={`flex-1 px-4 py-2.5 rounded-lg transition-all text-body-2 font-medium ${
                activeTab === 'all'
                  ? 'bg-white text-[#1A1A1A] shadow-unified'
                  : 'text-[#6C6C6C] hover:text-[#1A1A1A]'
              }`}
            >
              Toutes
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`flex-1 px-4 py-2.5 rounded-lg transition-all text-body-2 font-medium ${
                activeTab === 'categories'
                  ? 'bg-white text-[#1A1A1A] shadow-unified'
                  : 'text-[#6C6C6C] hover:text-[#1A1A1A]'
              }`}
            >
              Catégories
            </button>
            <button
              onClick={() => {
                setActiveTab('favorites');
                setSelectedCategory('all');
              }}
              className={`flex-1 px-4 py-2.5 rounded-lg transition-all text-body-2 font-medium ${
                activeTab === 'favorites'
                  ? 'bg-white text-[#1A1A1A] shadow-unified'
                  : 'text-[#6C6C6C] hover:text-[#1A1A1A]'
              }`}
            >
              Favoris
            </button>
          </div>

          {/* Category Filter Pills - Only show when Categories tab is active */}
          {activeTab === 'categories' && (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-5 h-10 rounded-full whitespace-nowrap transition-all shadow-unified ${
                      selectedCategory === category.id
                        ? 'bg-[#1DBF73] text-white'
                        : 'bg-white text-[#6C6C6C] border border-[#E5E5E5] hover:border-[#1DBF73]'
                    }`}
                  >
                    <Icon className="w-4 h-4" strokeWidth={2} />
                    <span className="text-body-2 font-medium">{category.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Recipe Grid - 2 Columns */}
          <div className="grid grid-cols-2 gap-4">
            {filteredRecipes.map((recipe) => (
              <Card 
                key={recipe.id} 
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-all bg-white border-0 shadow-sm rounded-2xl flex flex-col h-[340px]"
                onClick={() => setSelectedRecipe(recipe)}
              >
                {/* Image with Heart - Fixed size */}
                <div className="relative w-full h-[180px] bg-gradient-to-br from-[#9CA0B0] to-[#7B7F94] flex-shrink-0">
                  <ImageWithFallback
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Heart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(recipe.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        recipe.favorite ? 'fill-red-500 text-red-500' : 'text-[#6C6C6C]'
                      }`}
                      strokeWidth={2}
                    />
                  </button>
                </div>

                {/* Content - Fixed height */}
                <div className="p-4 flex flex-col flex-1">
                  {/* Title - Fixed height for 2 lines */}
                  <h3 className="font-semibold text-[#1A1A1A] mb-2 line-clamp-2 leading-tight h-[2.75rem]">{recipe.title}</h3>
                  
                  {/* Calories & Protein */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-sm font-medium text-[#1A1A1A]">{recipe.calories}</span>
                      <span className="text-xs text-[#808080]">kcal</span>
                    </div>
                    <span className="text-sm text-[#808080]">·</span>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-sm font-medium text-[#1A1A1A]">{recipe.protein}g</span>
                      <span className="text-xs text-[#808080]">protein</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-auto">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-black text-black" strokeWidth={0} />
                    ))}
                    <span className="text-sm text-[#808080] ml-1.5">(120)</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <FilterPanel
        isOpen={filterPanelOpen}
        onClose={() => setFilterPanelOpen(false)}
        onApplyFilters={(filters) => setFilterState(filters)}
      />
    </div>
  );
}