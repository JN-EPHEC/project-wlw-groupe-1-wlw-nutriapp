import { useState } from 'react';
import { Plus, MessageCircle, TrendingUp, TrendingDown, Droplet, Weight, Heart, Activity, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import DataEntryForm, { HealthData } from './DataEntryForm';
import DoctorChat from './DoctorChat';

// Mock data avec valeurs normales et anormales
const glucoseData = [
  { date: 'Lun', value: 110, normal: true },
  { date: 'Mar', value: 105, normal: true },
  { date: 'Mer', value: 85, normal: false }, // Trop bas
  { date: 'Jeu', value: 108, normal: true },
  { date: 'Ven', value: 112, normal: true },
  { date: 'Sam', value: 145, normal: false }, // Trop haut
  { date: 'Dim', value: 107, normal: true },
];

const weightData = [
  { date: 'Lun', value: 72.5 },
  { date: 'Mar', value: 72.3 },
  { date: 'Mer', value: 72.0 },
  { date: 'Jeu', value: 71.8 },
  { date: 'Ven', value: 71.9 },
  { date: 'Sam', value: 71.7 },
  { date: 'Dim', value: 71.5 },
];

const bloodPressureData = [
  { date: 'Lun', systolic: 120, diastolic: 80 },
  { date: 'Mar', systolic: 118, diastolic: 78 },
  { date: 'Mer', systolic: 122, diastolic: 82 },
  { date: 'Jeu', systolic: 119, diastolic: 79 },
  { date: 'Ven', systolic: 121, diastolic: 81 },
  { date: 'Sam', systolic: 145, diastolic: 95 }, // Trop haut
  { date: 'Dim', systolic: 120, diastolic: 80 },
];

interface HealthTrackingProps {
  profile?: {
    age?: number;
    gender?: 'male' | 'female' | 'other';
    height?: number;
    weight?: number;
    activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
    conditions?: string[];
    allergies?: string[];
    goals?: string[];
  };
}

export default function HealthTracking({ profile }: HealthTrackingProps) {
  const [showDataEntry, setShowDataEntry] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<'glucose' | 'weight' | 'pressure'>('glucose');

  const handleDataSubmit = (data: HealthData) => {
    console.log('New health data:', data);
    // Ici vous pouvez ajouter la logique pour sauvegarder les données
  };

  // Détection des valeurs anormales récentes
  const latestGlucose = glucoseData[glucoseData.length - 1];
  const latestBP = bloodPressureData[bloodPressureData.length - 1];
  
  const hasAbnormalGlucose = latestGlucose.value < 90 || latestGlucose.value > 140;
  const hasAbnormalBP = latestBP.systolic > 140 || latestBP.diastolic > 90;

  const abnormalGlucoseValues = glucoseData.filter(d => !d.normal);

  return (
    <div className="min-h-full bg-[#F8F8F8]">
      {/* Modals */}
      {showDataEntry && (
        <DataEntryForm
          onClose={() => setShowDataEntry(false)}
          onSubmit={handleDataSubmit}
        />
      )}
      {showChat && <DoctorChat onClose={() => setShowChat(false)} />}

      {/* Header */}
      <div className="bg-gradient-to-br from-[#1DBF73] to-[#0F8F55] px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-h1 text-white mb-2">Suivi santé</h1>
          <p className="text-body-1 text-white/90">
            Suivez l'évolution de vos indicateurs de santé
          </p>
        </div>
      </div>

      <div className="px-6 py-6 -mt-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => setShowDataEntry(true)}
              className="flex-1 h-14 rounded-xl bg-[#1DBF73] hover:bg-[#0F8F55] shadow-unified"
            >
              <Plus className="w-5 h-5 mr-2" strokeWidth={2} />
              <span className="font-semibold whitespace-nowrap">Encoder mes données</span>
            </Button>
            <Button
              onClick={() => setShowChat(true)}
              variant="outline"
              className="flex-1 h-14 rounded-xl border-2 border-[#E5E5E5] hover:border-[#1DBF73] hover:bg-[#DCF9EA]/30 shadow-unified"
            >
              <MessageCircle className="w-5 h-5 mr-2 text-[#1DBF73]" strokeWidth={2} />
              <span className="font-semibold text-[#1A1A1A] whitespace-nowrap">Chat avec mon médecin</span>
            </Button>
          </div>

          {/* Alerts Section */}
          {(hasAbnormalGlucose || hasAbnormalBP) && (
            <Card className="p-5 bg-gradient-to-r from-red-50 to-red-50/50 border-red-200 border shadow-unified rounded-xl">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h3 className="text-body-1 text-red-900 font-semibold mb-2">Valeurs anormales détectées</h3>
                  <div className="space-y-1">
                    {hasAbnormalGlucose && (
                      <p className="text-body-2 text-red-700">
                        • Glycémie : <span className="font-semibold">{latestGlucose.value} mg/dL</span> (plage normale : 90-140)
                      </p>
                    )}
                    {hasAbnormalBP && (
                      <p className="text-body-2 text-red-700">
                        • Tension : <span className="font-semibold">{latestBP.systolic}/{latestBP.diastolic} mmHg</span> (plage normale : &lt;140/90)
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-3">
            <Card className="p-4 bg-white border-0 shadow-unified rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-[#DCF9EA] flex items-center justify-center mb-2">
                  <Droplet className="w-5 h-5 text-[#1DBF73]" strokeWidth={2} />
                </div>
                <p className={`text-2xl font-bold mb-0.5 ${!latestGlucose.normal ? 'text-red-500' : 'text-[#1DBF73]'}`}>
                  {latestGlucose.value}
                  {!latestGlucose.normal && <span className="ml-1 text-sm">⚠️</span>}
                </p>
                <p className="text-body-2 text-[#6C6C6C]">Glycémie</p>
              </div>
            </Card>

            <Card className="p-4 bg-white border-0 shadow-unified rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-[#FFE8CC] flex items-center justify-center mb-2">
                  <Weight className="w-5 h-5 text-[#F59E0B]" strokeWidth={2} />
                </div>
                <p className="text-2xl font-bold text-[#F59E0B] mb-0.5">{weightData[weightData.length - 1].value}</p>
                <p className="text-body-2 text-[#6C6C6C]">Poids (kg)</p>
              </div>
            </Card>

            <Card className="p-4 bg-white border-0 shadow-unified rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-[#FFE8E8] flex items-center justify-center mb-2">
                  <Heart className="w-5 h-5 text-[#EF4444]" strokeWidth={2} />
                </div>
                <p className={`text-2xl font-bold mb-0.5 ${hasAbnormalBP ? 'text-red-500' : 'text-[#EF4444]'}`}>
                  {latestBP.systolic}/{latestBP.diastolic}
                  {hasAbnormalBP && <span className="ml-1 text-sm">⚠️</span>}
                </p>
                <p className="text-body-2 text-[#6C6C6C]">Tension</p>
              </div>
            </Card>

            <Card className="p-4 bg-white border-0 shadow-unified rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] flex items-center justify-center mb-2">
                  <Activity className="w-5 h-5 text-[#5B8DEF]" strokeWidth={2} />
                </div>
                <p className="text-2xl font-bold text-[#5B8DEF] mb-0.5">45</p>
                <p className="text-body-2 text-[#6C6C6C]">Activité (min)</p>
              </div>
            </Card>
          </div>

          {/* Metric Selector */}
          <div className="flex gap-2 p-1 bg-white rounded-xl shadow-unified">
            <button
              onClick={() => setSelectedMetric('glucose')}
              className={`flex-1 px-4 py-3 rounded-lg transition-all text-body-2 font-medium ${
                selectedMetric === 'glucose'
                  ? 'bg-[#1DBF73] text-white shadow-unified'
                  : 'text-[#6C6C6C] hover:text-[#1A1A1A]'
              }`}
            >
              Glycémie
            </button>
            <button
              onClick={() => setSelectedMetric('weight')}
              className={`flex-1 px-4 py-3 rounded-lg transition-all text-body-2 font-medium ${
                selectedMetric === 'weight'
                  ? 'bg-[#1DBF73] text-white shadow-unified'
                  : 'text-[#6C6C6C] hover:text-[#1A1A1A]'
              }`}
            >
              Poids
            </button>
            <button
              onClick={() => setSelectedMetric('pressure')}
              className={`flex-1 px-4 py-3 rounded-lg transition-all text-body-2 font-medium ${
                selectedMetric === 'pressure'
                  ? 'bg-[#1DBF73] text-white shadow-unified'
                  : 'text-[#6C6C6C] hover:text-[#1A1A1A]'
              }`}
            >
              Tension
            </button>
          </div>

          {/* Charts */}
          <Card className="p-6 bg-white border-0 shadow-unified rounded-xl">
            <div className="mb-5">
              <h3 className="text-h3 text-[#1A1A1A] mb-1">
                {selectedMetric === 'glucose' && 'Évolution de la glycémie'}
                {selectedMetric === 'weight' && 'Évolution du poids'}
                {selectedMetric === 'pressure' && 'Évolution de la tension'}
              </h3>
              <p className="text-body-2 text-[#6C6C6C]">Cette semaine</p>
            </div>

            {/* Glycémie Chart */}
            {selectedMetric === 'glucose' && (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={glucoseData}>
                  <XAxis dataKey="date" stroke="#6C6C6C" strokeWidth={1} />
                  <YAxis stroke="#6C6C6C" strokeWidth={1} domain={[70, 160]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E5E5',
                      borderRadius: '12px',
                      padding: '8px 12px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#1DBF73"
                    strokeWidth={3}
                    dot={(props) => {
                      const { cx, cy, payload } = props;
                      return (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={6}
                          fill={payload.normal ? '#1DBF73' : '#EF4444'}
                          stroke="white"
                          strokeWidth={2}
                        />
                      );
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}

            {/* Weight Chart */}
            {selectedMetric === 'weight' && (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weightData}>
                  <XAxis dataKey="date" stroke="#6C6C6C" strokeWidth={1} />
                  <YAxis stroke="#6C6C6C" strokeWidth={1} domain={[70, 74]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E5E5',
                      borderRadius: '12px',
                      padding: '8px 12px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#F59E0B"
                    strokeWidth={3}
                    dot={{ fill: '#F59E0B', r: 6, strokeWidth: 2, stroke: 'white' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}

            {/* Blood Pressure Chart */}
            {selectedMetric === 'pressure' && (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={bloodPressureData}>
                  <XAxis dataKey="date" stroke="#6C6C6C" strokeWidth={1} />
                  <YAxis stroke="#6C6C6C" strokeWidth={1} domain={[60, 160]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E5E5',
                      borderRadius: '12px',
                      padding: '8px 12px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="systolic"
                    stroke="#EF4444"
                    strokeWidth={3}
                    name="Systolique"
                    dot={{ fill: '#EF4444', r: 6, strokeWidth: 2, stroke: 'white' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="diastolic"
                    stroke="#F59E0B"
                    strokeWidth={3}
                    name="Diastolique"
                    dot={{ fill: '#F59E0B', r: 6, strokeWidth: 2, stroke: 'white' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}

            {/* Abnormal values list */}
            {selectedMetric === 'glucose' && abnormalGlucoseValues.length > 0 && (
              <div className="mt-5 pt-5 border-t border-[#E5E5E5]">
                <h4 className="text-body-1 text-[#1A1A1A] font-semibold mb-3">
                  Valeurs anormales cette semaine
                </h4>
                <div className="space-y-2">
                  {abnormalGlucoseValues.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500" strokeWidth={2} />
                        <span className="text-body-2 text-[#1A1A1A]">{item.date}</span>
                      </div>
                      <Badge className="bg-red-500 text-white border-0">
                        {item.value} mg/dL
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}