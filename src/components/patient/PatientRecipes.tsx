import { useState } from 'react';
import { Search, Heart, Clock, Flame, Bell, Star, Download, ArrowDown } from 'lucide-react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import RecipeDetail from './RecipeDetail';

interface Recipe {
  id: string;
  title: string;
  image: string;
  time: number;
  calories: number;
  type: string;
  tags: string[];
  favorite: boolean;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  steps: string[];
}

const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Salade quinoa et avocat',
    image: 'https://images.unsplash.com/photo-1640798629665-cb874ae363d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMG1lYWx8ZW58MXx8fHwxNzYyNTI1MjUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    time: 20,
    calories: 380,
    type: 'Déjeuner',
    tags: ['Sans gluten', 'Riche en fibres'],
    favorite: true,
    protein: 12,
    carbs: 45,
    fat: 18,
    ingredients: [
      '150g de quinoa',
      '1 avocat mûr',
      '200g de tomates cerises',
      '1/2 concombre',
      'Jus de citron',
      'Huile d\'olive',
      'Sel, poivre'
    ],
    steps: [
      'Cuire le quinoa selon les instructions du paquet',
      'Couper l\'avocat, les tomates et le concombre en dés',
      'Mélanger tous les ingrédients dans un saladier',
      'Assaisonner avec le jus de citron, l\'huile d\'olive, sel et poivre',
      'Servir frais'
    ]
  },
  {
    id: '2',
    title: 'Saumon grillé aux légumes',
    image: 'https://images.unsplash.com/photo-1645220559451-aaacbbd7bcc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXRyaXRpb24lMjB2ZWdldGFibGVzfGVufDF8fHx8MTc2MjUyNjY1MHww&ixlib=rb-4.1.0&q=80&w=1080',
    time: 30,
    calories: 420,
    type: 'Dîner',
    tags: ['Riche en Oméga-3', 'Faible en glucides'],
    favorite: false,
    protein: 35,
    carbs: 20,
    fat: 22,
    ingredients: [
      '200g de filet de saumon',
      '1 courgette',
      '1 poivron rouge',
      'Brocoli',
      'Huile d\'olive',
      'Citron',
      'Herbes de Provence'
    ],
    steps: [
      'Préchauffer le four à 200°C',
      'Assaisonner le saumon avec les herbes et le citron',
      'Couper les légumes en morceaux',
      'Disposer le saumon et les légumes sur une plaque',
      'Cuire au four pendant 20-25 minutes',
      'Servir chaud'
    ]
  },
  {
    id: '3',
    title: 'Smoothie bowl aux fruits',
    image: 'https://images.unsplash.com/photo-1640798629665-cb874ae363d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMG1lYWx8ZW58MXx8fHwxNzYyNTI1MjUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    time: 10,
    calories: 290,
    type: 'Petit-déjeuner',
    tags: ['Végétarien', 'Antioxydants'],
    favorite: true,
    protein: 8,
    carbs: 55,
    fat: 6,
    ingredients: [
      '1 banane congelée',
      '150g de fruits rouges',
      '200ml de lait d\'amande',
      '1 c. à soupe de graines de chia',
      'Granola pour topping',
      'Quelques fruits frais'
    ],
    steps: [
      'Mixer la banane, les fruits rouges et le lait d\'amande',
      'Verser dans un bol',
      'Ajouter les graines de chia',
      'Garnir avec le granola et les fruits frais',
      'Déguster immédiatement'
    ]
  }
];

export default function PatientRecipes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState(mockRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        onToggleFavorite={() => toggleFavorite(selectedRecipe.id)}
      />
    );
  }

  return (
    <div className="min-h-full bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-6 py-5">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-[#222222] mb-1">Recettes</h1>
            <p className="text-sm text-[#6B7280]">Adaptées à votre profil</p>
          </div>
          <button 
            onClick={() => {
              const favRecipes = recipes.filter(r => r.favorite);
              if (favRecipes.length > 0) {
                setRecipes([...favRecipes, ...recipes.filter(r => !r.favorite)]);
              }
            }}
            className="flex items-center gap-2 px-4 h-10 rounded-full bg-[#1DBF73] hover:bg-[#0F8F55] text-white transition-colors shadow-sm"
          >
            <Heart className="w-4 h-4 fill-white" strokeWidth={2} />
            <span className="text-sm font-medium">Favoris</span>
          </button>
        </div>
      </div>

      <div className="p-6 pb-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
            <Input
              placeholder="Rechercher une recette..."
              className="pl-12 h-12 rounded-xl border-[#E5E7EB] bg-white shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Recipe Grid */}
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
    </div>
  );
}