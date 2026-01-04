import { useState } from 'react';
import { Heart, Activity, Droplet, TrendingUp, Calendar, User, MessageCircle, ArrowUpRight } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface UserProfile {
  conditions?: string[];
  goals?: string[];
  weight?: number;
}

interface MyHealthScreenProps {
  profile: UserProfile;
}

interface HealthData {
  date: string;
  glycemie: number;
  poids: number;
  tension: number;
}

const HEALTH_DATA_24H: HealthData[] = [
  { date: '00h', glycemie: 92, poids: 68.2, tension: 118 },
  { date: '04h', glycemie: 88, poids: 68.1, tension: 115 },
  { date: '08h', glycemie: 95, poids: 68.3, tension: 122 },
  { date: '12h', glycemie: 118, poids: 68.5, tension: 128 },
  { date: '16h', glycemie: 102, poids: 68.4, tension: 124 },
  { date: '20h', glycemie: 110, poids: 68.2, tension: 120 }
];

const HEALTH_DATA_6H: HealthData[] = [
  { date: 'J-6', glycemie: 98, poids: 69.0, tension: 125 },
  { date: 'J-5', glycemie: 102, poids: 68.8, tension: 122 },
  { date: 'J-4', glycemie: 95, poids: 68.6, tension: 120 },
  { date: 'J-3', glycemie: 108, poids: 68.5, tension: 126 },
  { date: 'J-2', glycemie: 100, poids: 68.3, tension: 123 },
  { date: 'Hier', glycemie: 105, poids: 68.2, tension: 121 },
  { date: 'Auj', glycemie: 95, poids: 68.0, tension: 120 }
];

const HEALTH_DATA_1D: HealthData[] = [
  { date: 'S1', glycemie: 105, poids: 69.5, tension: 128 },
  { date: 'S2', glycemie: 102, poids: 69.2, tension: 126 },
  { date: 'S3', glycemie: 98, poids: 68.8, tension: 123 },
  { date: 'S4', glycemie: 95, poids: 68.0, tension: 120 }
];

const HEALTH_DATA_1W: HealthData[] = [
  { date: 'Sep', glycemie: 112, poids: 71.0, tension: 132 },
  { date: 'Oct', glycemie: 105, poids: 70.0, tension: 128 },
  { date: 'Nov', glycemie: 95, poids: 68.0, tension: 120 }
];

type Period = '24H' | '6H' | '1D' | '1W';

const PERIODS: { id: Period; label: string }[] = [
  { id: '24H', label: '24H' },
  { id: '6H', label: '6J' },
  { id: '1D', label: '1M' },
  { id: '1W', label: '3M' }
];

export default function MyHealthScreen({ profile }: MyHealthScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('6H');

  const getChartData = () => {
    switch (selectedPeriod) {
      case '24H': return HEALTH_DATA_24H;
      case '6H': return HEALTH_DATA_6H;
      case '1D': return HEALTH_DATA_1D;
      case '1W': return HEALTH_DATA_1W;
    }
  };

  const currentData = {
    tauxDuJour: 1.05,
    apport: 2800,
    tension: { systolic: 128, diastolic: 84 },
    pouls: 68
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-6 shadow-unified">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-h2 text-[#1A1A1A]">Suivi de mes données de santé</h1>
            <p className="text-body-2 text-gray-500 mt-1">
              Consultez l'évolution de vos indicateurs de santé en temps réel
            </p>
          </div>
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <User className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-4">
        {/* Update Button */}
        <Button className="w-full h-12 rounded-xl bg-white text-[#1A1A1A] border-2 border-gray-200 hover:bg-gray-50 shadow-unified">
          Mettre à jour mes informations
        </Button>

        {/* Doctor Card */}
        <Card className="overflow-hidden border-0 shadow-unified rounded-xl">
          <div 
            className="relative h-36 p-4"
            style={{
              background: 'linear-gradient(163.274deg, rgba(1, 57, 254, 0.9) 18.22%, rgba(16, 241, 255, 0.9) 102.67%)'
            }}
          >
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 rounded-full bg-amber-400 flex items-center justify-center text-2xl">
                👨‍⚕️
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg mb-0.5">Dr. Pat Guilpart</h3>
                <p className="text-white/75 text-xs">Mon médecin</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors">
                <MessageCircle className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-white" />
              <div>
                <p className="text-white font-semibold text-sm">Dimanche, 27 Juin 2021</p>
                <p className="text-white/75 text-xs">08:00am - 10:00am</p>
              </div>
            </div>

            {/* Decorative dots */}
            <div className="absolute top-4 right-4 flex gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
            </div>
          </div>
        </Card>

        {/* Health Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Taux du jour */}
          <Card className="p-4 bg-white border-0 shadow-unified rounded-xl">
            <div className="flex items-start justify-between mb-2">
              <p className="text-body-2 text-gray-500">Taux du jour</p>
              <ArrowUpRight className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-[#1A1A1A] mb-0.5">{currentData.tauxDuJour}</p>
            <p className="text-body-2 text-gray-400">g/L</p>
          </Card>

          {/* Apport */}
          <Card className="p-4 bg-white border-0 shadow-unified rounded-xl">
            <div className="flex items-start justify-between mb-2">
              <p className="text-body-2 text-gray-500">Apport</p>
              <ArrowUpRight className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-[#1A1A1A] mb-0.5">{currentData.apport.toLocaleString()}</p>
            <p className="text-body-2 text-gray-400">kcal/J</p>
          </Card>

          {/* Tension artérielle */}
          <Card className="p-4 bg-white border-0 shadow-unified rounded-xl">
            <div className="flex items-start justify-between mb-2">
              <p className="text-body-2 text-gray-500">Tension artérielle</p>
              <ArrowUpRight className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-[#1A1A1A] mb-0.5">
              {currentData.tension.systolic}/{currentData.tension.diastolic}
            </p>
            <p className="text-body-2 text-gray-400">mmHg</p>
          </Card>

          {/* Pouls */}
          <Card className="p-4 bg-white border-0 shadow-unified rounded-xl">
            <div className="flex items-start justify-between mb-2">
              <p className="text-body-2 text-gray-500">Pouls</p>
              <ArrowUpRight className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-[#1A1A1A] mb-0.5">{currentData.pouls}</p>
            <p className="text-body-2 text-gray-400">bpm</p>
          </Card>
        </div>

        {/* Chart Card */}
        <Card className="p-5 bg-white border-0 shadow-unified rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-body-1 font-semibold text-[#1A1A1A] mb-1">
                Évolution de vos données
              </h3>
              <p className="text-body-2 text-gray-500">
                Glycémie | Poids | Tension
              </p>
            </div>
            <button className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
              <TrendingUp className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Period Selector */}
          <div className="flex gap-2 mb-6">
            {PERIODS.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`
                  flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all
                  ${selectedPeriod === period.id
                    ? 'bg-[#1DBF73] text-white shadow-unified'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                {period.label}
              </button>
            ))}
          </div>

          {/* Chart */}
          <div className="h-72 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9CA3AF"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="glycemie" 
                  stroke="#00C7F2" 
                  strokeWidth={2}
                  dot={{ fill: '#00C7F2', r: 4 }}
                  name="Glycémie (mg/dL)"
                />
                <Line 
                  type="monotone" 
                  dataKey="poids" 
                  stroke="#0FCA7A" 
                  strokeWidth={2}
                  dot={{ fill: '#0FCA7A', r: 4 }}
                  name="Poids (kg)"
                />
                <Line 
                  type="monotone" 
                  dataKey="tension" 
                  stroke="#FBC62F" 
                  strokeWidth={2}
                  dot={{ fill: '#FBC62F', r: 4 }}
                  name="Tension (mmHg)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 justify-center pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#00C7F2]" />
              <span className="text-body-2 text-gray-600">Glycémie</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#0FCA7A]" />
              <span className="text-body-2 text-gray-600">Poids</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FBC62F]" />
              <span className="text-body-2 text-gray-600">Tension</span>
            </div>
          </div>
        </Card>

        {/* Last Update */}
        <div className="text-center py-2">
          <p className="text-body-2 text-gray-400">
            Dernière mise à jour : 02 novembre 2025
          </p>
        </div>
      </div>
    </div>
  );
}