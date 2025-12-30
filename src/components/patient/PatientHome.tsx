import { User as UserIcon, TrendingUp, TrendingDown, Activity, Droplet, Plus, Minus } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { useState } from 'react';

interface User {
  name: string;
}

interface PatientHomeProps {
  user: User;
  onProfileClick?: () => void;
}

export default function PatientHome({ user, onProfileClick }: PatientHomeProps) {
  const firstName = user.name.split(' ')[0];
  const [waterIntake, setWaterIntake] = useState(1.5); // en litres

  const addWater = (amount: number) => {
    setWaterIntake(Math.max(0, Math.min(5, waterIntake + amount)));
  };

  return (
    <div className="min-h-full bg-[#F8F8F8]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E5E5] px-6 py-5">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-h2 text-[#1A1A1A] mb-1">Bonjour {firstName} 👋</h1>
            <p className="text-body-2 text-[#6C6C6C]">
              {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
          <button 
            onClick={onProfileClick}
            className="w-10 h-10 rounded-full bg-[#DCF9EA] flex items-center justify-center hover:bg-[#1DBF73]/20 transition-colors"
          >
            <UserIcon className="w-5 h-5 text-[#1DBF73]" strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="p-6 pb-24">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-5 bg-white border-0 shadow-unified hover:shadow-lg transition-shadow rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#DCF9EA] flex items-center justify-center">
                  <Droplet className="w-5 h-5 text-[#1DBF73]" strokeWidth={2} />
                </div>
                <TrendingDown className="w-4 h-4 text-[#1DBF73]" strokeWidth={2} />
              </div>
              <p className="text-h2 text-[#1A1A1A] mb-1">107</p>
              <p className="text-body-2 text-[#6C6C6C]">Glycémie (mg/dL)</p>
            </Card>

            <Card className="p-5 bg-white border-0 shadow-unified hover:shadow-lg transition-shadow rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[#5B8DEF]" strokeWidth={2} />
                </div>
                <TrendingUp className="w-4 h-4 text-[#1DBF73]" strokeWidth={2} />
              </div>
              <p className="text-h2 text-[#1A1A1A] mb-1">8,245</p>
              <p className="text-body-2 text-[#6C6C6C]">Pas aujourd'hui</p>
            </Card>
          </div>

          {/* Water Intake Module */}
          <Card className="p-6 bg-white border-0 shadow-unified rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#EBF5FF] flex items-center justify-center">
                  <Droplet className="w-6 h-6 text-[#5B8DEF]" strokeWidth={2} fill="#5B8DEF" />
                </div>
                <div>
                  <h3 className="text-body-1 text-[#1A1A1A] font-medium mb-1">Hydratation</h3>
                  <p className="text-body-2 text-[#6C6C6C]">Objectif : 2L / jour</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-h2 text-[#5B8DEF]">{waterIntake.toFixed(1)}L</p>
                <p className="text-body-2 text-[#6C6C6C]">{Math.round((waterIntake / 2) * 100)}%</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-[#F8F8F8] rounded-full mb-4 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#5B8DEF] to-[#3B82F6] rounded-full transition-all duration-300"
                style={{ width: `${Math.min((waterIntake / 2) * 100, 100)}%` }}
              />
            </div>

            {/* Water Controls */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => addWater(-0.25)}
                disabled={waterIntake <= 0}
                className="flex-1 h-10 rounded-xl border-[#E5E5E5] hover:bg-[#F8F8F8] disabled:opacity-50"
              >
                <Minus className="w-4 h-4 mr-2" strokeWidth={2} />
                <span className="text-body-2">250ml</span>
              </Button>
              <Button
                onClick={() => addWater(0.25)}
                disabled={waterIntake >= 5}
                className="flex-1 h-10 rounded-xl bg-[#5B8DEF] hover:bg-[#4A7DD9] text-white shadow-unified disabled:opacity-50"
              >
                <Plus className="w-4 h-4 mr-2" strokeWidth={2} />
                <span className="text-body-2">250ml</span>
              </Button>
            </div>
          </Card>

          {/* Alert Card */}
          <Card className="p-5 bg-gradient-to-r from-[#DCF9EA] to-[#DCF9EA]/50 border-0 shadow-unified rounded-xl">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#1DBF73] flex items-center justify-center flex-shrink-0">
                <Activity className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <h3 className="text-body-1 text-[#1A1A1A] font-medium mb-2">Rappel du jour</h3>
                <p className="text-body-2 text-[#6C6C6C] leading-relaxed">
                  Pensez à prendre vos mesures après le déjeuner et à rester hydraté.
                </p>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Button className="h-auto py-5 rounded-xl bg-[#1DBF73] hover:bg-[#0F8F55] shadow-unified">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Droplet className="w-5 h-5" strokeWidth={2} />
                </div>
                <span className="text-body-2">Ajouter mesure</span>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-5 rounded-xl border-2 border-[#E5E5E5] hover:border-[#5B8DEF] hover:bg-[#EEF2FF]/50 shadow-unified">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#5B8DEF]" strokeWidth={2} />
                </div>
                <span className="text-body-2 text-[#1A1A1A]">Voir graphiques</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
