import { AlertCircle, TrendingUp, Heart, Archive, MessageSquare, ChevronRight } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface Alert {
  id: string;
  patient: string;
  type: 'glucose' | 'weight' | 'pressure' | 'missed';
  message: string;
  value?: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    patient: 'Sophie Bernard',
    type: 'glucose',
    message: 'Glycémie élevée détectée',
    value: '185 mg/dL',
    time: 'Il y a 2h',
    priority: 'high'
  },
  {
    id: '2',
    patient: 'Camille Dubois',
    type: 'glucose',
    message: 'Glycémie au-dessus de la cible',
    value: '142 mg/dL',
    time: 'Il y a 5h',
    priority: 'medium'
  },
  {
    id: '3',
    patient: 'Thomas Roux',
    type: 'weight',
    message: 'Prise de poids significative',
    value: '+1.5 kg en 3 jours',
    time: 'Il y a 8h',
    priority: 'medium'
  },
  {
    id: '4',
    patient: 'Lucas Martin',
    type: 'missed',
    message: 'Aucune mesure depuis 3 jours',
    time: 'Hier',
    priority: 'low'
  },
  {
    id: '5',
    patient: 'Julie Lefevre',
    type: 'pressure',
    message: 'Tension artérielle élevée',
    value: '145/92 mmHg',
    time: 'Il y a 1 jour',
    priority: 'high'
  }
];

const alertConfig = {
  glucose: { icon: AlertCircle, color: '#EF4444', bgColor: '#FEE2E2' },
  weight: { icon: TrendingUp, color: '#F59E0B', bgColor: '#FEF3C7' },
  pressure: { icon: Heart, color: '#DC2626', bgColor: '#FEE2E2' },
  missed: { icon: AlertCircle, color: '#6B7280', bgColor: '#F3F4F6' }
};

const priorityConfig = {
  high: { label: 'Urgent', color: '#EF4444' },
  medium: { label: 'Important', color: '#F59E0B' },
  low: { label: 'Info', color: '#6B7280' }
};

export default function DoctorAlerts() {
  return (
    <div className="min-h-full bg-[#F8F9FA] p-4 pb-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="pt-4">
          <h1 className="text-2xl text-[#222222] mb-1">Alertes</h1>
          <p className="text-[#222222]/60">
            {mockAlerts.length} alerte{mockAlerts.length > 1 ? 's' : ''} active{mockAlerts.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 text-center border-red-200 bg-red-50">
            <p className="text-2xl text-red-600 mb-1">2</p>
            <p className="text-xs text-[#222222]/60">Urgentes</p>
          </Card>
          <Card className="p-4 text-center border-orange-200 bg-orange-50">
            <p className="text-2xl text-orange-600 mb-1">2</p>
            <p className="text-xs text-[#222222]/60">Importantes</p>
          </Card>
          <Card className="p-4 text-center border-gray-200 bg-gray-50">
            <p className="text-2xl text-gray-600 mb-1">1</p>
            <p className="text-xs text-[#222222]/60">Info</p>
          </Card>
        </div>

        {/* Alerts List */}
        <div className="space-y-3">
          {mockAlerts.map((alert) => {
            const config = alertConfig[alert.type];
            const priority = priorityConfig[alert.priority];
            const Icon = config.icon;

            return (
              <Card key={alert.id} className="p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className="rounded-full p-2 flex-shrink-0"
                    style={{ backgroundColor: config.bgColor }}
                  >
                    <Icon className="w-5 h-5" style={{ color: config.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-[#222222]">{alert.patient}</h3>
                      <Badge
                        className="text-xs"
                        style={{
                          backgroundColor: `${priority.color}15`,
                          color: priority.color,
                          borderColor: priority.color
                        }}
                        variant="outline"
                      >
                        {priority.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#222222]/80 mb-1">{alert.message}</p>
                    {alert.value && (
                      <p
                        className="text-sm mb-2"
                        style={{ color: config.color }}
                      >
                        {alert.value}
                      </p>
                    )}
                    <p className="text-xs text-[#222222]/40">{alert.time}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-[#4F8BC9] hover:bg-[#4F8BC9]/90">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contacter
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Archive className="w-4 h-4 mr-2" />
                    Archiver
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Info */}
        <Card className="p-5 bg-blue-50 border-blue-200">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-[#4F8BC9] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-[#222222] mb-1">Gestion des alertes</h3>
              <p className="text-sm text-[#222222]/70">
                Les alertes sont générées automatiquement lorsqu'un patient dépasse les valeurs 
                cibles ou manque des mesures importantes. Contactez vos patients pour assurer 
                un suivi optimal.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
