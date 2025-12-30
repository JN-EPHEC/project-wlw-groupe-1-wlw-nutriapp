import { useState } from 'react';
import { Bell, ArrowLeft } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';

type Period = 'week' | 'month';

const glucoseDataWeek = [
  { date: 'Lun', value: 110 },
  { date: 'Mar', value: 105 },
  { date: 'Mer', value: 115 },
  { date: 'Jeu', value: 108 },
  { date: 'Ven', value: 112 },
  { date: 'Sam', value: 109 },
  { date: 'Dim', value: 107 },
];

const weightDataWeek = [
  { date: 'Lun', value: 75.0 },
  { date: 'Mar', value: 74.8 },
  { date: 'Mer', value: 74.5 },
  { date: 'Jeu', value: 74.6 },
  { date: 'Ven', value: 74.3 },
  { date: 'Sam', value: 74.2 },
  { date: 'Dim', value: 74.0 },
];

export default function PatientGraphs() {
  const [period, setPeriod] = useState<Period>('week');

  return (
    <div className="min-h-full bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-6 py-5">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-[#222222] mb-1">Mes graphiques</h1>
            <p className="text-sm text-[#6B7280]">Évolution de vos indicateurs</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center hover:bg-[#E5E7EB] transition-colors">
            <Bell className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>
      </div>

      <div className="p-6 pb-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Period Selector */}
          <Tabs value={period} onValueChange={(v) => setPeriod(v as Period)} className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-12 bg-white rounded-xl p-1 shadow-sm">
              <TabsTrigger value="week" className="rounded-lg data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white">
                Semaine
              </TabsTrigger>
              <TabsTrigger value="month" className="rounded-lg data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white">
                Mois
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Glycémie Chart */}
          <Card className="p-6 bg-white border-0 shadow-sm">
            <div className="mb-5">
              <h3 className="text-lg text-[#222222] mb-1">Glycémie</h3>
              <p className="text-sm text-[#6B7280]">Moyenne: 109 mg/dL</p>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={glucoseDataWeek}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" domain={[80, 130]} />
                <ReferenceLine y={100} stroke="#4CAF50" strokeDasharray="3 3" strokeWidth={2} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#4CAF50"
                  strokeWidth={3}
                  dot={{ fill: '#4CAF50', r: 5, strokeWidth: 0 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-[#F3F4F6]">
              <div className="text-center">
                <p className="text-sm text-[#6B7280] mb-1">Min</p>
                <p className="text-lg text-[#222222]">105</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-[#6B7280] mb-1">Moyenne</p>
                <p className="text-lg text-[#4CAF50]">109</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-[#6B7280] mb-1">Max</p>
                <p className="text-lg text-[#222222]">115</p>
              </div>
            </div>
          </Card>

          {/* Poids Chart */}
          <Card className="p-6 bg-white border-0 shadow-sm">
            <div className="mb-5">
              <h3 className="text-lg text-[#222222] mb-1">Poids</h3>
              <p className="text-sm text-[#6B7280]">Objectif: 72 kg</p>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={weightDataWeek}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" domain={[72, 76]} />
                <ReferenceLine y={72} stroke="#4CAF50" strokeDasharray="3 3" strokeWidth={2} label="Cible" />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#5B8DEF"
                  strokeWidth={3}
                  dot={{ fill: '#5B8DEF', r: 5, strokeWidth: 0 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-[#F3F4F6]">
              <div className="text-center">
                <p className="text-sm text-[#6B7280] mb-1">Actuel</p>
                <p className="text-lg text-[#5B8DEF]">74.0</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-[#6B7280] mb-1">Évolution</p>
                <p className="text-lg text-[#4CAF50]">-1.0 kg</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-[#6B7280] mb-1">Objectif</p>
                <p className="text-lg text-[#222222]">72 kg</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
