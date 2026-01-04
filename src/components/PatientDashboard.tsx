import { useState } from 'react';
import { Home, UtensilsCrossed, Sparkles, User } from 'lucide-react';
import PatientHome from './patient/PatientHome';
import PatientRecipes from './patient/PatientRecipes';
import PatientAdvice from './patient/PatientAdvice';
import PatientSettings from './patient/PatientSettings';

interface User {
  id: string;
  email: string;
  name: string;
}

interface PatientDashboardProps {
  user: User;
  onLogout: () => void;
}

type Tab = 'home' | 'recipes' | 'advice' | 'settings';

export default function PatientDashboard({ user, onLogout }: PatientDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <PatientHome user={user} />;
      case 'recipes':
        return <PatientRecipes />;
      case 'advice':
        return <PatientAdvice />;
      case 'settings':
        return <PatientSettings user={user} onLogout={onLogout} />;
      default:
        return <PatientHome user={user} />;
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
        <div className="flex justify-around items-center h-16 max-w-2xl mx-auto px-4">
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
            icon={<Sparkles className="w-6 h-6" strokeWidth={2} />}
            label="Conseils"
            active={activeTab === 'advice'}
            onClick={() => setActiveTab('advice')}
          />
          <TabButton
            icon={<User className="w-6 h-6" strokeWidth={2} />}
            label="Profil"
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
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
        active ? 'text-[#4CAF50]' : 'text-[#9CA3AF]'
      }`}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}