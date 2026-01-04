import { useState } from 'react';
import { Activity, Heart, Droplet, Scale, TrendingUp, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface HealthData {
  imc: number;
  weight: number;
  bloodPressure: { systolic: number; diastolic: number };
  glucose?: number;
  lastUpdate: string;
}

const CURRENT_DATA: HealthData = {
  imc: 22.5,
  weight: 68,
  bloodPressure: { systolic: 120, diastolic: 80 },
  glucose: 95,
  lastUpdate: '15/11/2024'
};

const CHART_DATA_WEEK = [
  { date: 'Lun', imc: 22.8, weight: 68.5, systolic: 122 },
  { date: 'Mar', imc: 22.7, weight: 68.3, systolic: 120 },
  { date: 'Mer', imc: 22.6, weight: 68.2, systolic: 119 },
  { date: 'Jeu', imc: 22.6, weight: 68.1, systolic: 121 },
  { date: 'Ven', imc: 22.5, weight: 68.0, systolic: 120 },
  { date: 'Sam', imc: 22.5, weight: 68.0, systolic: 118 },
  { date: 'Dim', imc: 22.5, weight: 68.0, systolic: 120 }
];

const CHART_DATA_MONTH = [
  { date: 'S1', imc: 23.2, weight: 69.5, systolic: 125 },
  { date: 'S2', imc: 23.0, weight: 69.0, systolic: 123 },
  { date: 'S3', imc: 22.8, weight: 68.5, systolic: 121 },
  { date: 'S4', imc: 22.5, weight: 68.0, systolic: 120 }
];

const CHART_DATA_3MONTHS = [
  { date: 'Sep', imc: 24.0, weight: 71.0, systolic: 128 },
  { date: 'Oct', imc: 23.5, weight: 70.0, systolic: 125 },
  { date: 'Nov', imc: 22.5, weight: 68.0, systolic: 120 }
];

type Period = '1W' | '1M' | '3M';

const getImcStatus = (imc: number): { label: string; color: string; bgColor: string } => {
  if (imc < 18.5) return { label: 'Insuffisance pondérale', color: '#F59E0B', bgColor: '#FEF3C7' };
  if (imc < 25) return { label: 'Poids normal', color: '#1DBF73', bgColor: '#DCF9EA' };
  if (imc < 30) return { label: 'Surpoids', color: '#F59E0B', bgColor: '#FEF3C7' };
  return { label: 'Obésité', color: '#EF4444', bgColor: '#FEE2E2' };
};

export default function HealthTrackingScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('1W');

  const getChartData = () => {
    switch (selectedPeriod) {
      case '1W': return CHART_DATA_WEEK;
      case '1M': return CHART_DATA_MONTH;
      case '3M': return CHART_DATA_3MONTHS;
    }
  };

  const imcStatus = getImcStatus(CURRENT_DATA.imc);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-6">
        <h1 className="text-h2 text-[#1A1A1A] mb-2">Suivi de mes données</h1>
        <p className="text-body-2 text-gray-500">
          Consultez votre évolution et suivez vos progrès.
        </p>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Health Indicators */}
        <div>
          <h2 className="text-h3 text-[#1A1A1A] mb-4">Indicateurs de santé</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* IMC Card */}
            <div className="bg-white rounded-xl shadow-unified p-4 col-span-2">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#DCF9EA] flex items-center justify-center">
                    <Activity className="w-5 h-5 text-[#1DBF73]" />
                  </div>
                  <div>
                    <p className="text-body-2 text-gray-500">IMC</p>
                    <p className="text-h2 text-[#1A1A1A]">{CURRENT_DATA.imc}</p>
                  </div>
                </div>
                <Badge 
                  style={{ 
                    backgroundColor: imcStatus.bgColor, 
                    color: imcStatus.color 
                  }}
                  className="text-xs px-3 py-1 rounded-full"
                >
                  {imcStatus.label}
                </Badge>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all"
                  style={{ 
                    width: `${Math.min((CURRENT_DATA.imc / 40) * 100, 100)}%`,
                    backgroundColor: imcStatus.color
                  }}
                />
              </div>
            </div>

            {/* Weight Card */}
            <div className="bg-white rounded-xl shadow-unified p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#DCF9EA] flex items-center justify-center">
                  <Scale className="w-5 h-5 text-[#1DBF73]" />
                </div>
              </div>
              <p className="text-body-2 text-gray-500 mb-1">Poids</p>
              <p className="text-h2 text-[#1A1A1A]">{CURRENT_DATA.weight} <span className="text-body-1 text-gray-500">kg</span></p>
            </div>

            {/* Blood Pressure Card */}
            <div className="bg-white rounded-xl shadow-unified p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#DCF9EA] flex items-center justify-center">
                  <Heart className="w-5 h-5 text-[#1DBF73]" />
                </div>
              </div>
              <p className="text-body-2 text-gray-500 mb-1">Tension</p>
              <p className="text-h3 text-[#1A1A1A]">
                {CURRENT_DATA.bloodPressure.systolic}/{CURRENT_DATA.bloodPressure.diastolic}
              </p>
            </div>

            {/* Glucose Card (Optional) */}
            {CURRENT_DATA.glucose && (
              <div className="bg-white rounded-xl shadow-unified p-4 col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#DCF9EA] flex items-center justify-center">
                    <Droplet className="w-5 h-5 text-[#1DBF73]" />
                  </div>
                  <div>
                    <p className="text-body-2 text-gray-500">Glycémie</p>
                    <p className="text-h2 text-[#1A1A1A]">{CURRENT_DATA.glucose} <span className="text-body-1 text-gray-500">mg/dL</span></p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Evolution Chart */}
        <div className="bg-white rounded-xl shadow-unified p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#1DBF73]" />
              <h2 className="text-h3 text-[#1A1A1A]">Évolution de vos données</h2>
            </div>
          </div>

          {/* Period Selector */}
          <div className="flex gap-2 mb-6">
            {(['1W', '1M', '3M'] as Period[]).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`
                  flex-1 px-4 py-2 rounded-lg transition-all text-sm
                  ${selectedPeriod === period
                    ? 'bg-[#1DBF73] text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Chart */}
          <div className="h-64">
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
                  dataKey="imc" 
                  stroke="#1DBF73" 
                  strokeWidth={2}
                  dot={{ fill: '#1DBF73', r: 4 }}
                  name="IMC"
                />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#0F8F55" 
                  strokeWidth={2}
                  dot={{ fill: '#0F8F55', r: 4 }}
                  name="Poids (kg)"
                />
                <Line 
                  type="monotone" 
                  dataKey="systolic" 
                  stroke="#60A5FA" 
                  strokeWidth={2}
                  dot={{ fill: '#60A5FA', r: 4 }}
                  name="Tension systolique"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#1DBF73]" />
              <span className="text-body-2 text-gray-600">IMC</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#0F8F55]" />
              <span className="text-body-2 text-gray-600">Poids</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#60A5FA]" />
              <span className="text-body-2 text-gray-600">Tension</span>
            </div>
          </div>
        </div>

        {/* Last Update */}
        <div className="flex items-center justify-center gap-2 text-gray-500">
          <Calendar className="w-4 h-4" />
          <p className="text-body-2">
            Dernière mise à jour : {CURRENT_DATA.lastUpdate}
          </p>
        </div>

        {/* Update Button */}
        <Button 
          className="w-full bg-[#1DBF73] hover:bg-[#0F8F55] text-white h-12 rounded-xl"
        >
          Mettre à jour mes informations
        </Button>
      </div>
    </div>
  );
}
