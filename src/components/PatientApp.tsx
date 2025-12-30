import { useState } from 'react';
import { Home, UtensilsCrossed, User, Activity } from 'lucide-react';
import HomeScreen from './patient/HomeScreen';
import RecipesList from './patient/RecipesList';
import ProfileScreen from './patient/ProfileScreen';
import HealthTracking from './patient/HealthTracking';

interface User {
  id: string;
  email: string;
}

interface UserProfile {
  age?: number;
  gender?: 'male' | 'female' | 'other';
  height?: number;
  weight?: number;
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  conditions?: string[];
  allergies?: string[];
  goals?: string[];
  dataSharing?: boolean;
  healthNotifications?: boolean;
}

interface PatientAppProps {
  user: User;
  profile: UserProfile;
  onLogout: () => void;
  onUpdateProfile: (profile: UserProfile) => void;
}

type Tab = 'home' | 'recipes' | 'health' | 'profile';

export default function PatientApp({ user, profile, onLogout, onUpdateProfile }: PatientAppProps) {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen profile={profile} onNavigateToRecipes={() => setActiveTab('recipes')} onNavigateToProfile={() => setActiveTab('profile')} />;
      case 'recipes':
        return <RecipesList profile={profile} />;
      case 'health':
        return <HealthTracking profile={profile} />;
      case 'profile':
        return <ProfileScreen user={user} profile={profile} onLogout={onLogout} onUpdateProfile={onUpdateProfile} />;
      default:
        return <HomeScreen profile={profile} onNavigateToRecipes={() => setActiveTab('recipes')} />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#F9FAFB]">
      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-20">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] safe-bottom shadow-sm">
        <div className="flex justify-around items-center h-16 max-w-2xl mx-auto px-6">
          <TabButton
            icon={<Home className="w-6 h-6" strokeWidth={2} />}
            label="Accueil"
            active={activeTab === 'home'}
            onClick={() => setActiveTab('home')}
          />
          <TabButton
            icon={<UtensilsCrossed className="w-6 h-6" strokeWidth={2} />}
            label="Recettes"
            active={activeTab === 'recipes'}
            onClick={() => setActiveTab('recipes')}
          />
          <TabButton
            icon={<Activity className="w-6 h-6" strokeWidth={2} />}
            label="Santé"
            active={activeTab === 'health'}
            onClick={() => setActiveTab('health')}
          />
          <TabButton
            icon={<User className="w-6 h-6" strokeWidth={2} />}
            label="Profil"
            active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
          />
        </div>
      </div>
    </div>
  );
}

interface TabButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

function TabButton({ icon, label, active, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
        active ? 'text-[#1DBF73]' : 'text-[#9CA3AF]'
      }`}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}