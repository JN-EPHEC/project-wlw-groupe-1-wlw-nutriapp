import { ArrowRight, Clock, Flame, ChefHat, Heart, UtensilsCrossed, TrendingUp, Activity, Droplet, Target, Sparkles, User } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import Logo from '../Logo';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import AIChat from './AIChat';

interface UserProfile {
  conditions?: string[];
  goals?: string[];
  weight?: number;
  profilePhoto?: string;
}

interface HomeScreenProps {
  profile: UserProfile;
  onNavigateToRecipes: () => void;
  onNavigateToProfile?: () => void;
}

const recipeOfTheDay = {
  id: '1',
  title: 'Salade de quinoa aux légumes grillés',
  image: 'https://images.unsplash.com/photo-1640798629665-cb874ae363d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMG1lYWx8ZW58MXx8fHwxNzYyNTI1MjUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  time: 25,
  calories: 380,
  tags: ['Compatible diabète', 'Riche en fibres', 'Végétarien'],
};

// Mock data for health charts
const weeklyCaloriesData = [
  { day: 'L', value: 1850 },
  { day: 'M', value: 1920 },
  { day: 'M', value: 1780 },
  { day: 'J', value: 2050 },
  { day: 'V', value: 1890 },
  { day: 'S', value: 1950 },
  { day: 'D', value: 1820 },
];

const glucoseData = [
  { time: '08h', value: 95 },
  { time: '12h', value: 118 },
  { time: '16h', value: 102 },
  { time: '20h', value: 110 },
];

export default function HomeScreen({ profile, onNavigateToRecipes, onNavigateToProfile }: HomeScreenProps) {
  const [showAIChat, setShowAIChat] = useState(false);
  const hasConditions = profile.conditions && profile.conditions.length > 0;
  const todayCalories = 1820;
  const caloriesGoal = 2000;
  const caloriesProgress = (todayCalories / caloriesGoal) * 100;

  return (
    <div className="min-h-full bg-[#F8F8F8]">
      {/* AI Chat Modal */}
      {showAIChat && <AIChat onClose={() => setShowAIChat(false)} />}

      {/* Header - Improved with Logo */}
      <div className="bg-gradient-to-br from-[#1DBF73] via-[#1DBF73] to-[#0F8F55] px-4 sm:px-6 py-6 sm:py-8 pb-16 sm:pb-20">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <Logo size="sm" showText={true} />
            <button
              onClick={onNavigateToProfile}
              className="flex items-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border-2 border-white/30 hover:bg-white/30 hover:border-white/60 transition-all shadow-unified group"
            >
              {profile.profilePhoto ? (
                <img
                  src={profile.profilePhoto}
                  alt="Photo de profil"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2} />
                </div>
              )}
              <span className="text-white text-sm sm:text-body-2 font-medium pr-1">Mon profil</span>
            </button>
          </div>
          <div className="text-white">
            <h1 className="text-h1 mb-2">Bonjour ! 👋</h1>
            <p className="text-body-1 text-white/90">
              Voici votre tableau de bord santé personnalisé
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 -mt-12 sm:-mt-16">
        <div className="max-w-2xl mx-auto space-y-4 sm:space-y-5">
          {/* Health Stats Cards - New */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {/* Calories Today */}
            <Card className="p-3 sm:p-4 bg-white border-0 shadow-unified rounded-xl">
              <div className="flex flex-col items-center text-center">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#DCF9EA] flex items-center justify-center mb-1.5 sm:mb-2">
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-[#1DBF73]" strokeWidth={2} />
                </div>
                <p className="text-xl sm:text-2xl font-bold text-[#1DBF73] mb-0.5">{todayCalories}</p>
                <p className="text-xs sm:text-body-2 text-[#6C6C6C]">Calories</p>
              </div>
            </Card>

            {/* Water Intake */}
            <Card className="p-3 sm:p-4 bg-white border-0 shadow-unified rounded-xl">
              <div className="flex flex-col items-center text-center">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#DBEAFE] flex items-center justify-center mb-1.5 sm:mb-2">
                  <Droplet className="w-4 h-4 sm:w-5 sm:h-5 text-[#3B82F6]" strokeWidth={2} />
                </div>
                <p className="text-xl sm:text-2xl font-bold text-[#3B82F6] mb-0.5">1.8L</p>
                <p className="text-xs sm:text-body-2 text-[#6C6C6C]">Eau</p>
              </div>
            </Card>

            {/* Activity */}
            <Card className="p-3 sm:p-4 bg-white border-0 shadow-unified rounded-xl">
              <div className="flex flex-col items-center text-center">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FFE8CC] flex items-center justify-center mb-1.5 sm:mb-2">
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-[#F59E0B]" strokeWidth={2} />
                </div>
                <p className="text-xl sm:text-2xl font-bold text-[#F59E0B] mb-0.5">45m</p>
                <p className="text-xs sm:text-body-2 text-[#6C6C6C]">Activité</p>
              </div>
            </Card>
          </div>

          {/* Calories Chart - New */}
          <Card className="p-4 sm:p-5 bg-white border-0 shadow-unified rounded-xl">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#DCF9EA] flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#1DBF73]" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-sm sm:text-body-1 font-semibold text-[#1A1A1A]">Calories cette semaine</h3>
                  <p className="text-xs sm:text-body-2 text-[#6C6C6C]">Moyenne: 1895 kcal/jour</p>
                </div>
              </div>
            </div>

            {/* Mini Bar Chart */}
            <div className="flex items-end justify-between h-20 sm:h-24 gap-1.5 sm:gap-2 mb-3">
              {weeklyCaloriesData.map((item, idx) => {
                const height = (item.value / 2200) * 100;
                const isToday = idx === weeklyCaloriesData.length - 1;
                return (
                  <div key={`day-${idx}`} className="flex-1 flex flex-col items-center gap-1.5 sm:gap-2">
                    <div 
                      className={`w-full rounded-t-lg transition-all ${
                        isToday ? 'bg-[#1DBF73] shadow-unified' : 'bg-[#DCF9EA]'
                      }`}
                      style={{ height: `${height}%` }}
                    />
                    <span className={`text-xs sm:text-body-2 ${isToday ? 'text-[#1DBF73] font-semibold' : 'text-[#6C6C6C]'}`}>
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Progress bar */}
            <div className="pt-3 sm:pt-4 border-t border-[#E5E5E5]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-body-2 text-[#6C6C6C]">Objectif quotidien</span>
                <span className="text-xs sm:text-body-2 font-semibold text-[#1A1A1A]">{todayCalories} / {caloriesGoal} kcal</span>
              </div>
              <div className="h-2 bg-[#F8F8F8] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#1DBF73] to-[#0F8F55] rounded-full transition-all"
                  style={{ width: `${Math.min(caloriesProgress, 100)}%` }}
                />
              </div>
            </div>
          </Card>

          {/* Recipe of the Day Section */}
          <div className="pt-2">
            <h2 className="text-h3 text-[#1A1A1A] mb-4 px-1">✨ Recette du jour</h2>
            <Card className="overflow-hidden bg-white border-0 shadow-unified rounded-xl">
              <div className="relative h-52">
                <ImageWithFallback
                  src={recipeOfTheDay.image}
                  alt={recipeOfTheDay.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <div className="w-11 h-11 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-unified hover:scale-110 transition-transform">
                    <Heart className="w-5 h-5 text-[#6C6C6C]" strokeWidth={2} />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-5">
                  <Badge className="bg-[#1DBF73] text-white border-0 backdrop-blur-sm mb-2 shadow-unified">
                    ⭐ Recette du jour
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-h3 text-[#1A1A1A] mb-3">{recipeOfTheDay.title}</h3>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-[#6C6C6C]">
                    <Clock className="w-4 h-4" strokeWidth={2} />
                    <span className="text-body-2 font-medium">{recipeOfTheDay.time} min</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#6C6C6C]">
                    <Flame className="w-4 h-4" strokeWidth={2} />
                    <span className="text-body-2 font-medium">{recipeOfTheDay.calories} kcal</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {recipeOfTheDay.tags.map((tag) => (
                    <Badge key={tag} className="bg-[#DCF9EA] text-[#0F8F55] border-0 h-6 rounded-full px-3 text-body-2 font-medium">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button 
                  className="w-full h-12 rounded-xl bg-[#1DBF73] hover:bg-[#0F8F55] shadow-unified"
                  onClick={onNavigateToRecipes}
                >
                  Voir la recette
                  <ArrowRight className="w-5 h-5 ml-2" strokeWidth={2} />
                </Button>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3 sm:space-y-4">
            {/* AI Chat Button - Featured */}
            <Button
              onClick={() => setShowAIChat(true)}
              className="w-full h-12 sm:h-14 rounded-xl bg-gradient-to-r from-[#5B8DEF] to-[#4A7FDB] hover:from-[#4A7FDB] hover:to-[#3B6DCB] shadow-unified text-white"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" strokeWidth={2} />
              <span className="text-sm sm:text-body-1 font-semibold">Conseils IA</span>
            </Button>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Card 
                className="p-4 sm:p-5 bg-white border-0 shadow-unified rounded-xl cursor-pointer hover:shadow-lg transition-all"
                onClick={onNavigateToRecipes}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#DCF9EA] flex items-center justify-center mb-2 sm:mb-3 shadow-unified">
                  <UtensilsCrossed className="w-5 h-5 sm:w-6 sm:h-6 text-[#1DBF73]" strokeWidth={2} />
                </div>
                <h4 className="text-sm sm:text-body-1 font-semibold text-[#1A1A1A] mb-1">Mes recettes</h4>
                <p className="text-xs sm:text-body-2 text-[#6C6C6C]">
                  125 recettes adaptées
                </p>
              </Card>

              <Card className="p-4 sm:p-5 bg-white border-0 shadow-unified rounded-xl cursor-pointer hover:shadow-lg transition-all">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#FFE8CC] flex items-center justify-center mb-2 sm:mb-3 shadow-unified">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[#F59E0B]" strokeWidth={2} />
                </div>
                <h4 className="text-sm sm:text-body-1 font-semibold text-[#1A1A1A] mb-1">Mes objectifs</h4>
                <p className="text-xs sm:text-body-2 text-[#6C6C6C]">
                  Suivi personnalisé
                </p>
              </Card>
            </div>
          </div>

          {/* Health Info */}
          {hasConditions && (
            <Card className="p-5 bg-gradient-to-br from-[#DCF9EA] to-[#DCF9EA]/50 border-0 rounded-xl shadow-unified">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#1DBF73] flex items-center justify-center flex-shrink-0 shadow-unified">
                  <Heart className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h4 className="text-body-1 font-semibold text-[#1A1A1A] mb-1">
                    Vos recommandations santé
                  </h4>
                  <p className="text-body-2 text-[#0F8F55]">
                    Toutes nos recettes sont adaptées à votre profil de santé pour vous accompagner au mieux dans votre parcours nutritionnel.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Bottom padding */}
          <div className="h-4" />
        </div>
      </div>
    </div>
  );
}