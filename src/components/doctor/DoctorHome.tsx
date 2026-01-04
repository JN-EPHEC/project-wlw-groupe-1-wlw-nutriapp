import { Users, TrendingUp, AlertCircle, Clock, ChevronRight, Activity } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface User {
  name: string;
}

interface DoctorHomeProps {
  user: User;
  onNavigateToPatients: () => void;
}

const recentActivities = [
  {
    id: '1',
    patient: 'Marie Martin',
    action: 'Nouvelle mesure de glycémie',
    value: '115 mg/dL',
    time: 'Il y a 15 min',
    status: 'normal'
  },
  {
    id: '2',
    patient: 'Jean Dupuis',
    action: 'Poids enregistré',
    value: '-0.8 kg',
    time: 'Il y a 1h',
    status: 'good'
  },
  {
    id: '3',
    patient: 'Sophie Bernard',
    action: 'Glycémie élevée',
    value: '185 mg/dL',
    time: 'Il y a 2h',
    status: 'alert'
  },
  {
    id: '4',
    patient: 'Pierre Leroy',
    action: 'Tension artérielle',
    value: '128/82 mmHg',
    time: 'Il y a 3h',
    status: 'normal'
  }
];

export default function DoctorHome({ user, onNavigateToPatients }: DoctorHomeProps) {
  const doctorName = user.name.replace('Dr. ', '');

  return (
    <div className="min-h-full bg-gradient-to-br from-[#5CC58C]/5 to-[#4F8BC9]/5 p-4 pb-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="pt-4">
          <h1 className="text-2xl text-[#222222] mb-1">
            Bienvenue Dr. {doctorName} 👋
          </h1>
          <p className="text-[#222222]/60">
            {new Date().toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-5 border-l-4 border-l-[#5CC58C]">
            <div className="flex items-start justify-between mb-2">
              <div className="bg-[#5CC58C]/10 rounded-full p-2">
                <Users className="w-6 h-6 text-[#5CC58C]" />
              </div>
            </div>
            <p className="text-3xl text-[#222222] mb-1">42</p>
            <p className="text-sm text-[#222222]/60">Patients suivis</p>
          </Card>

          <Card className="p-5 border-l-4 border-l-orange-500">
            <div className="flex items-start justify-between mb-2">
              <div className="bg-orange-500/10 rounded-full p-2">
                <AlertCircle className="w-6 h-6 text-orange-500" />
              </div>
            </div>
            <p className="text-3xl text-[#222222] mb-1">3</p>
            <p className="text-sm text-[#222222]/60">Alertes actives</p>
          </Card>

          <Card className="p-5 border-l-4 border-l-[#4F8BC9]">
            <div className="flex items-start justify-between mb-2">
              <div className="bg-[#4F8BC9]/10 rounded-full p-2">
                <Activity className="w-6 h-6 text-[#4F8BC9]" />
              </div>
            </div>
            <p className="text-3xl text-[#222222] mb-1">38</p>
            <p className="text-sm text-[#222222]/60">Patients actifs (7j)</p>
          </Card>

          <Card className="p-5 border-l-4 border-l-green-500">
            <div className="flex items-start justify-between mb-2">
              <div className="bg-green-500/10 rounded-full p-2">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <p className="text-3xl text-[#222222] mb-1">85%</p>
            <p className="text-sm text-[#222222]/60">Taux de suivi</p>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={onNavigateToPatients}
            className="bg-[#5CC58C] hover:bg-[#5CC58C]/90 h-auto py-4"
          >
            <div className="flex flex-col items-center gap-1">
              <Users className="w-6 h-6" />
              <span className="text-sm">Voir mes patients</span>
            </div>
          </Button>
          <Button
            variant="outline"
            className="border-[#4F8BC9] text-[#4F8BC9] hover:bg-[#4F8BC9]/5 h-auto py-4"
          >
            <div className="flex flex-col items-center gap-1">
              <AlertCircle className="w-6 h-6" />
              <span className="text-sm">Gérer les alertes</span>
            </div>
          </Button>
        </div>

        {/* Recent Activity */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#222222]">Activité récente</h3>
            <Button variant="ghost" size="sm" className="text-[#4F8BC9]">
              Tout voir
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#F8F9FA] transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[#222222]">{activity.patient}</p>
                    {activity.status === 'alert' && (
                      <Badge variant="destructive" className="text-xs">Alerte</Badge>
                    )}
                    {activity.status === 'good' && (
                      <Badge className="text-xs bg-[#5CC58C]">Progrès</Badge>
                    )}
                  </div>
                  <p className="text-sm text-[#222222]/60 mb-1">{activity.action}</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${
                      activity.status === 'alert' ? 'text-red-600' :
                      activity.status === 'good' ? 'text-[#5CC58C]' :
                      'text-[#222222]'
                    }`}>
                      {activity.value}
                    </span>
                    <span className="text-xs text-[#222222]/40">•</span>
                    <span className="text-xs text-[#222222]/40">{activity.time}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#222222]/20 flex-shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </Card>

        {/* Today's Schedule */}
        <Card className="p-5 bg-gradient-to-r from-[#4F8BC9]/5 to-[#5CC58C]/5 border-[#4F8BC9]/20">
          <div className="flex gap-3">
            <div className="bg-[#4F8BC9] rounded-full p-2 h-fit">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-[#222222] mb-1">Consultations du jour</h3>
              <p className="text-sm text-[#222222]/70 mb-3">
                3 consultations prévues aujourd'hui
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#222222]/80">10:00 - Marie Martin</span>
                  <Badge variant="outline" className="text-xs">Suivi</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#222222]/80">14:30 - Jean Dupuis</span>
                  <Badge variant="outline" className="text-xs">Contrôle</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#222222]/80">16:00 - Sophie Bernard</span>
                  <Badge variant="outline" className="text-xs">Urgence</Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
