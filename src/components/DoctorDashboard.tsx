import { useState } from 'react';
import { Home, Users, Bell, User } from 'lucide-react';
import DoctorHome from './doctor/DoctorHome';
import DoctorPatients from './doctor/DoctorPatients';
import DoctorAlerts from './doctor/DoctorAlerts';
import DoctorSettings from './doctor/DoctorSettings';

interface User {
  id: string;
  email: string;
  name: string;
}

interface DoctorDashboardProps {
  user: User;
  onLogout: () => void;
}

type Tab = 'home' | 'patients' | 'alerts' | 'settings';

export default function DoctorDashboard({ user, onLogout }: DoctorDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <DoctorHome user={user} onNavigateToPatients={() => setActiveTab('patients')} />;
      case 'patients':
        return <DoctorPatients />;
      case 'alerts':
        return <DoctorAlerts />;
      case 'settings':
        return <DoctorSettings user={user} onLogout={onLogout} />;
      default:
        return <DoctorHome user={user} onNavigateToPatients={() => setActiveTab('patients')} />;
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
            icon={<Users className="w-6 h-6" strokeWidth={2} />}
            label="Patients"
            active={activeTab === 'patients'}
            onClick={() => setActiveTab('patients')}
          />
          <TabButton
            icon={<Bell className="w-6 h-6" strokeWidth={2} />}
            label="Alertes"
            active={activeTab === 'alerts'}
            onClick={() => setActiveTab('alerts')}
            badge={3}
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
  badge?: number;
}

function TabButton({ icon, label, active, onClick, badge }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
        active ? 'text-[#5B8DEF]' : 'text-[#9CA3AF]'
      }`}
    >
      <div className="relative">
        {icon}
        {badge && badge > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {badge}
          </span>
        )}
      </div>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}