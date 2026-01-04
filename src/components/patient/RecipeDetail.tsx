import { ArrowLeft, Heart, Clock, Flame, Users, ChefHat, Play } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useState } from 'react';
import RecipeTimer from './RecipeTimer';

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
  description?: string;
  category?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  onToggleFavorite: () => void;
}

export default function RecipeDetail({ recipe, onBack, onToggleFavorite }: RecipeDetailProps) {
  const [showTimer, setShowTimer] = useState(false);

  return (
    <div className="min-h-full bg-[#F8F8F8]">
      {/* Timer Modal */}
      {showTimer && (
        <RecipeTimer
          totalMinutes={recipe.time}
          onClose={() => setShowTimer(false)}
        />
      )}

      {/* Header with Image */}
      <div className="relative">
        <div className="relative h-72">
          <div className="absolute inset-0 overflow-hidden">
            <ImageWithFallback
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={onBack}
          className="absolute top-6 left-6 w-11 h-11 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-unified hover:scale-105 transition-transform"
        >
          <ArrowLeft className="w-5 h-5 text-[#1A1A1A]" strokeWidth={2} />
        </button>
        <button
          onClick={onToggleFavorite}
          className="absolute top-6 right-6 w-11 h-11 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-unified hover:scale-105 transition-transform"
        >
          <Heart
            className={`w-5 h-5 ${
              recipe.favorite ? 'fill-red-500 text-red-500' : 'text-[#1A1A1A]'
            }`}
            strokeWidth={2}
          />
        </button>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-h1 text-white mb-4 drop-shadow-lg">{recipe.title}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Clock className="w-4 h-4 text-white" strokeWidth={2} />
                <span className="text-body-2 text-white font-medium">{recipe.time} min</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Flame className="w-4 h-4 text-white" strokeWidth={2} />
                <span className="text-body-2 text-white font-medium">{recipe.calories} kcal</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Users className="w-4 h-4 text-white" strokeWidth={2} />
                <span className="text-body-2 text-white font-medium">2 pers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 -mt-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <Badge
                key={tag}
                className="bg-[#DCF9EA] text-[#0F8F55] border-0 h-7 rounded-full px-4 text-body-2 font-medium shadow-unified"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Nutritional Info - Modern Table */}
          <Card className="p-6 bg-white border-0 shadow-unified rounded-xl overflow-hidden">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#DCF9EA] flex items-center justify-center">
                <Flame className="w-5 h-5 text-[#1DBF73]" strokeWidth={2} />
              </div>
              <h3 className="text-h3 text-[#1A1A1A]">Informations nutritionnelles</h3>
            </div>
            
            {/* Main nutritional stats - Grid */}
            <div className="grid grid-cols-3 gap-4 mb-5">
              <div className="text-center p-4 bg-[#F8F8F8] rounded-xl">
                <div className="text-2xl font-bold text-[#1DBF73] mb-1">{recipe.calories}</div>
                <div className="text-body-2 text-[#6C6C6C] font-medium">Calories</div>
              </div>
              <div className="text-center p-4 bg-[#F8F8F8] rounded-xl">
                <div className="text-2xl font-bold text-[#1DBF73] mb-1">{recipe.carbs}g</div>
                <div className="text-body-2 text-[#6C6C6C] font-medium">Glucides</div>
              </div>
              <div className="text-center p-4 bg-[#F8F8F8] rounded-xl">
                <div className="text-2xl font-bold text-[#1DBF73] mb-1">{recipe.protein}g</div>
                <div className="text-body-2 text-[#6C6C6C] font-medium">Protéines</div>
              </div>
            </div>

            {/* Additional nutritional info - Clean rows */}
            <div className="space-y-3 pt-4 border-t border-[#E5E5E5]">
              <div className="flex items-center justify-between p-3 bg-[#F8F8F8] rounded-lg">
                <span className="text-body-1 text-[#6C6C6C]">Lipides</span>
                <span className="text-body-1 text-[#1A1A1A] font-semibold">{recipe.fat}g</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#F8F8F8] rounded-lg">
                <span className="text-body-1 text-[#6C6C6C]">Sodium</span>
                <span className="text-body-1 text-[#1A1A1A] font-semibold">{recipe.sodium}mg</span>
              </div>
            </div>
          </Card>

          {/* Ingredients - Enhanced */}
          <Card className="p-6 bg-white border-0 shadow-unified rounded-xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#FFE8CC] flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-[#F59E0B]" strokeWidth={2} />
              </div>
              <h3 className="text-h3 text-[#1A1A1A]">Ingrédients</h3>
            </div>
            <div className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-start gap-3 p-3 hover:bg-[#F8F8F8] rounded-lg transition-colors">
                  <div className="w-6 h-6 rounded-full bg-[#DCF9EA] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-[#1DBF73]" />
                  </div>
                  <p className="text-body-1 text-[#1A1A1A] flex-1 leading-relaxed">{ingredient}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Steps - Modern numbered cards */}
          <Card className="p-6 bg-white border-0 shadow-unified rounded-xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#DCF9EA] flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-[#1DBF73]" strokeWidth={2} />
              </div>
              <h3 className="text-h3 text-[#1A1A1A]">Préparation</h3>
            </div>
            <div className="space-y-4">
              {recipe.steps.map((step, index) => (
                <div key={index} className="flex gap-4 p-4 bg-[#F8F8F8] rounded-xl hover:bg-[#DCF9EA]/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#1DBF73] flex items-center justify-center flex-shrink-0 text-white font-bold text-body-1 shadow-unified">
                    {index + 1}
                  </div>
                  <p className="text-body-1 text-[#1A1A1A] flex-1 pt-2 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Action Button - Modern */}
          <Button className="w-full h-14 rounded-xl bg-[#1DBF73] hover:bg-[#0F8F55] shadow-unified text-body-1 font-semibold transition-all hover:shadow-lg" onClick={() => setShowTimer(true)}>
            <ChefHat className="w-5 h-5 mr-2" strokeWidth={2} />
            Commencer la recette
          </Button>

          {/* Bottom padding */}
          <div className="h-4" />
        </div>
      </div>
    </div>
  );
}