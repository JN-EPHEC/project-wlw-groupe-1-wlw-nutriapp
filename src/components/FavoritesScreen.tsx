import { useState } from 'react';
import { Search, Heart, Clock, Flame } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Input } from './ui/input';

interface Recipe {
  id: string;
  title: string;
  image: string;
  time: string;
  calories: number;
  category: 'Petit-déjeuner' | 'Déjeuner' | 'Dîner' | 'Collation';
  badges: string[];
}

const MOCK_FAVORITES: Recipe[] = [
  {
    id: '1',
    title: 'Bowl Açaï & Fruits Rouges',
    image: 'https://images.unsplash.com/photo-1645517976245-569a91016f79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwYnJlYWtmYXN0JTIwYm93bHxlbnwxfHx8fDE3NjM0MDk5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    time: '10 min',
    calories: 285,
    category: 'Petit-déjeuner',
    badges: ['Riche en fibres', 'Antioxydants']
  },
  {
    id: '2',
    title: 'Saumon Grillé & Légumes',
    image: 'https://images.unsplash.com/photo-1580959375944-abd7e991f971?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwc2FsbW9uJTIwZGlubmVyfGVufDF8fHx8MTc2MzM4OTkxNXww&ixlib=rb-4.1.0&q=80&w=1080',
    time: '25 min',
    calories: 420,
    category: 'Dîner',
    badges: ['Compatible diabète', 'Oméga-3']
  },
  {
    id: '3',
    title: 'Salade Quinoa & Avocat',
    image: 'https://images.unsplash.com/photo-1573130437697-c375ce1355d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBzYWxhZCUyMGx1bmNofGVufDF8fHx8MTc2MzQ5ODMyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    time: '15 min',
    calories: 340,
    category: 'Déjeuner',
    badges: ['Végétarien', 'Riche en protéines']
  },
  {
    id: '4',
    title: 'Mix de Noix & Fruits Secs',
    image: 'https://images.unsplash.com/photo-1628624788459-4472cefc61d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc25hY2slMjBudXRzfGVufDF8fHx8MTc2MzQ5MTE0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    time: '2 min',
    calories: 180,
    category: 'Collation',
    badges: ['Sans gluten', 'Énergie rapide']
  }
];

const CATEGORIES = ['Tout', 'Petit-déjeuner', 'Déjeuner', 'Dîner', 'Collation'] as const;

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<Recipe[]>(MOCK_FAVORITES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number]>('Tout');

  const filteredFavorites = favorites.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tout' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter(recipe => recipe.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-6">
        <h1 className="text-h2 text-[#1A1A1A] mb-4">Mes Favoris</h1>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Rechercher une recette..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all
                ${selectedCategory === category
                  ? 'bg-[#1DBF73] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {filteredFavorites.length > 0 ? (
          <>
            <p className="text-body-2 text-gray-500 mb-4">
              {filteredFavorites.length} recette{filteredFavorites.length > 1 ? 's' : ''} enregistrée{filteredFavorites.length > 1 ? 's' : ''}
            </p>
            
            <div className="space-y-4">
              {filteredFavorites.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-xl shadow-unified overflow-hidden"
                >
                  <div className="flex gap-4 p-4">
                    {/* Image */}
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <ImageWithFallback
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-body-1 text-[#1A1A1A] line-clamp-2">
                          {recipe.title}
                        </h3>
                        <button
                          onClick={() => handleRemoveFavorite(recipe.id)}
                          className="flex-shrink-0 text-[#1DBF73] hover:text-[#0F8F55] transition-colors"
                        >
                          <Heart className="w-5 h-5 fill-current" />
                        </button>
                      </div>

                      {/* Info */}
                      <div className="flex items-center gap-4 mb-3 text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span className="text-body-2">{recipe.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Flame className="w-4 h-4" />
                          <span className="text-body-2">{recipe.calories} kcal</span>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2">
                        {recipe.badges.map((badge, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-[#DCF9EA] text-[#0F8F55] text-xs px-3 py-1 rounded-full"
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-h3 text-[#1A1A1A] mb-2">
              Aucune recette enregistrée
            </h3>
            <p className="text-body-2 text-gray-500 max-w-sm">
              {searchQuery || selectedCategory !== 'Tout'
                ? 'Aucun résultat ne correspond à votre recherche.'
                : 'Commencez à ajouter vos recettes préférées pour les retrouver ici.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
