import { Sparkles, Bell } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface Advice {
  id: string;
  date: string;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
}

const mockAdvices: Advice[] = [
  {
    id: '1',
    date: "Aujourd'hui",
    title: 'Glycémie stable',
    message: "Excellente nouvelle ! Votre glycémie est stable cette semaine. Pour maintenir cet équilibre, privilégiez les aliments riches en fibres.",
    priority: 'low',
  },
  {
    id: '2',
    date: "Hier",
    title: 'Activité physique',
    message: "Vous êtes proche de votre objectif de 10 000 pas quotidiens ! Une marche de 15 minutes après le dîner vous aidera.",
    priority: 'medium',
  },
  {
    id: '3',
    date: 'Il y a 2 jours',
    title: 'Hydratation',
    message: "Assurez-vous de boire au moins 2 litres d'eau par jour. L'hydratation aide à réguler la glycémie.",
    priority: 'high',
  },
];

const priorityConfig = {
  low: { color: '#4CAF50', bg: '#E8F5E9', label: 'Info' },
  medium: { color: '#F59E0B', bg: '#FEF3C7', label: 'Important' },
  high: { color: '#EF4444', bg: '#FEE2E2', label: 'Urgent' }
};

export default function PatientAdvice() {
  return (
    <div className="min-h-full bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-6 py-5">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-[#222222] mb-1">Conseils IA</h1>
            <p className="text-sm text-[#6B7280]">Recommandations personnalisées</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center hover:bg-[#E5E7EB] transition-colors">
            <Bell className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>
      </div>

      <div className="p-6 pb-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Main Advice */}
          <Card className="p-6 bg-gradient-to-br from-[#4CAF50] to-[#45A049] text-white border-0 shadow-lg">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white/80 mb-1">Conseil du jour</p>
                <h3 className="text-xl mb-2">Félicitations !</h3>
              </div>
            </div>
            <p className="text-white/95 leading-relaxed">
              Votre glycémie est stable et votre poids diminue progressivement. 
              Continuez vos efforts ! Aujourd'hui, concentrez-vous sur l'hydratation.
            </p>
          </Card>

          {/* Advice List */}
          <div className="space-y-4">
            {mockAdvices.map((advice) => {
              const priority = priorityConfig[advice.priority];

              return (
                <Card key={advice.id} className="p-5 bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: priority.bg }}
                    >
                      <Sparkles className="w-5 h-5" style={{ color: priority.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-[#222222]">{advice.title}</h3>
                        <Badge
                          className="text-xs border-0"
                          style={{
                            backgroundColor: priority.bg,
                            color: priority.color
                          }}
                        >
                          {priority.label}
                        </Badge>
                      </div>
                      <p className="text-xs text-[#9CA3AF] mb-2">{advice.date}</p>
                      <p className="text-sm text-[#6B7280] leading-relaxed">
                        {advice.message}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
