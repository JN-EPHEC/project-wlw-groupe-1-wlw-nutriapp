import { User, Bell, LogOut, ChevronRight } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

interface User {
  name: string;
  email: string;
}

interface PatientSettingsProps {
  user: User;
  onLogout: () => void;
}

export default function PatientSettings({ user, onLogout }: PatientSettingsProps) {
  return (
    <div className="min-h-full bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-6 py-5">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-[#222222] mb-1">Profil</h1>
            <p className="text-sm text-[#6B7280]">Gérez vos informations</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center hover:bg-[#E5E7EB] transition-colors">
            <Bell className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>
      </div>

      <div className="p-6 pb-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Profile Card */}
          <Card className="p-6 bg-white border-0 shadow-sm">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4CAF50] to-[#45A049] flex items-center justify-center text-white text-xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-[#222222] mb-1">{user.name}</h3>
                <p className="text-sm text-[#6B7280]">{user.email}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full h-11 rounded-xl border-2 border-[#E5E7EB]">
              Modifier le profil
            </Button>
          </Card>

          {/* Notifications */}
          <Card className="p-6 bg-white border-0 shadow-sm">
            <h3 className="text-lg text-[#222222] mb-5">Notifications</h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="reminder-measure" className="text-[#222222]">Rappels de mesure</Label>
                  <p className="text-sm text-[#6B7280] mt-0.5">Glycémie, poids, tension</p>
                </div>
                <Switch id="reminder-measure" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="ai-advice" className="text-[#222222]">Conseils IA</Label>
                  <p className="text-sm text-[#6B7280] mt-0.5">Recommandations quotidiennes</p>
                </div>
                <Switch id="ai-advice" defaultChecked />
              </div>
            </div>
          </Card>

          {/* Settings Links */}
          <Card className="p-3 bg-white border-0 shadow-sm">
            <button className="w-full flex items-center justify-between p-3 hover:bg-[#F9FAFB] rounded-lg transition-colors">
              <span className="text-[#222222]">Politique de confidentialité</span>
              <ChevronRight className="w-5 h-5 text-[#9CA3AF]" />
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-[#F9FAFB] rounded-lg transition-colors">
              <span className="text-[#222222]">Conditions d'utilisation</span>
              <ChevronRight className="w-5 h-5 text-[#9CA3AF]" />
            </button>
          </Card>

          {/* App Version */}
          <div className="text-center">
            <p className="text-sm text-[#9CA3AF]">NutriAdapt v1.0.0</p>
          </div>

          {/* Logout */}
          <Button
            variant="outline"
            className="w-full h-11 rounded-xl text-red-600 border-2 border-red-200 hover:bg-red-50"
            onClick={onLogout}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Se déconnecter
          </Button>
        </div>
      </div>
    </div>
  );
}