import { ArrowLeft, Download, MessageSquare, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Textarea } from '../ui/textarea';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';

interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  status: 'good' | 'warning' | 'alert';
  lastGlucose?: number;
  lastWeight?: number;
}

interface PatientDetailViewProps {
  patient: Patient;
  onBack: () => void;
}

const glucoseData = [
  { date: '01/12', value: 110 },
  { date: '02/12', value: 105 },
  { date: '03/12', value: 115 },
  { date: '04/12', value: 108 },
  { date: '05/12', value: 112 },
  { date: '06/12', value: 109 },
  { date: '07/12', value: 115 },
];

const weightData = [
  { date: '01/12', value: 75.0 },
  { date: '02/12', value: 74.8 },
  { date: '03/12', value: 74.5 },
  { date: '04/12', value: 74.6 },
  { date: '05/12', value: 74.3 },
  { date: '06/12', value: 74.2 },
  { date: '07/12', value: 74.0 },
];

const measurements = [
  { date: '07/12/2024 - 10:30', type: 'Glycémie', value: '115 mg/dL', status: 'normal' },
  { date: '07/12/2024 - 08:00', type: 'Poids', value: '74.0 kg', status: 'good' },
  { date: '06/12/2024 - 18:45', type: 'Glycémie', value: '109 mg/dL', status: 'normal' },
  { date: '06/12/2024 - 08:00', type: 'Poids', value: '74.2 kg', status: 'good' },
  { date: '05/12/2024 - 12:30', type: 'Glycémie', value: '112 mg/dL', status: 'normal' },
];

const aiNotes = [
  {
    date: "Aujourd'hui",
    note: "La glycémie du patient reste stable avec une moyenne de 110 mg/dL. Les mesures de poids montrent une tendance positive avec une perte progressive. Le patient suit bien ses recommandations nutritionnelles."
  },
  {
    date: 'Hier',
    note: "Excellente adhérence au traitement. Le patient a enregistré régulièrement ses mesures. Activité physique quotidienne conforme aux objectifs fixés."
  }
];

export default function PatientDetailView({ patient, onBack }: PatientDetailViewProps) {
  return (
    <div className="min-h-full bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white border-b border-[#E9ECEF] sticky top-0 z-10">
        <div className="max-w-2xl mx-auto p-4">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl text-[#222222]">Dossier patient</h1>
          </div>

          {/* Patient Info */}
          <div className="flex items-center gap-4 pb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4F8BC9] to-[#5CC58C] flex items-center justify-center text-white text-xl">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg text-[#222222]">{patient.name}</h2>
                {patient.status === 'alert' && (
                  <Badge variant="destructive" className="text-xs">Alerte</Badge>
                )}
                {patient.status === 'warning' && (
                  <Badge className="text-xs bg-orange-500">Attention</Badge>
                )}
              </div>
              <p className="text-sm text-[#222222]/60">
                {patient.age} ans • {patient.condition}
              </p>
            </div>
            <Button size="sm" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <p className="text-sm text-[#222222]/60 mb-1">Dernière glycémie</p>
              <p className="text-2xl text-[#222222] mb-1">{patient.lastGlucose || 'N/A'}</p>
              <p className="text-xs text-[#222222]/60">mg/dL</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-[#222222]/60 mb-1">Poids actuel</p>
              <p className="text-2xl text-[#222222] mb-1">{patient.lastWeight || 'N/A'}</p>
              <p className="text-xs text-[#222222]/60">kg</p>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="measures" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="measures">Mesures</TabsTrigger>
              <TabsTrigger value="graphs">Graphiques</TabsTrigger>
              <TabsTrigger value="notes">Notes IA</TabsTrigger>
            </TabsList>

            {/* Measures Tab */}
            <TabsContent value="measures" className="space-y-3 mt-4">
              {measurements.map((measurement, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[#222222] mb-1">{measurement.type}</p>
                      <p className="text-sm text-[#222222]/60 mb-2">{measurement.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg ${
                        measurement.status === 'good' ? 'text-[#5CC58C]' : 'text-[#222222]'
                      }`}>
                        {measurement.value}
                      </p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {measurement.status === 'good' ? 'Bon' : 'Normal'}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            {/* Graphs Tab */}
            <TabsContent value="graphs" className="space-y-4 mt-4">
              <Card className="p-5">
                <h3 className="text-[#222222] mb-4">Glycémie (7 jours)</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={glucoseData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" stroke="#222222" opacity={0.6} />
                    <YAxis stroke="#222222" opacity={0.6} domain={[90, 130]} />
                    <ReferenceLine y={100} stroke="#5CC58C" strokeDasharray="3 3" label="Cible" />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#4F8BC9"
                      strokeWidth={2}
                      dot={{ fill: '#4F8BC9', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-5">
                <h3 className="text-[#222222] mb-4">Poids (7 jours)</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" stroke="#222222" opacity={0.6} />
                    <YAxis stroke="#222222" opacity={0.6} domain={[73, 76]} />
                    <ReferenceLine y={72} stroke="#5CC58C" strokeDasharray="3 3" label="Objectif" />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#5CC58C"
                      strokeWidth={2}
                      dot={{ fill: '#5CC58C', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </TabsContent>

            {/* AI Notes Tab */}
            <TabsContent value="notes" className="space-y-4 mt-4">
              {aiNotes.map((note, index) => (
                <Card key={index} className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-[#4F8BC9]/10 rounded-full p-2">
                      <TrendingUp className="w-5 h-5 text-[#4F8BC9]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-[#222222]/60">{note.date}</p>
                    </div>
                  </div>
                  <p className="text-[#222222]/80 text-sm leading-relaxed">
                    {note.note}
                  </p>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          {/* Doctor's Comments */}
          <Card className="p-5">
            <h3 className="text-[#222222] mb-3">Commentaires du médecin</h3>
            <Textarea
              placeholder="Ajoutez vos observations et recommandations..."
              className="min-h-32 mb-3"
            />
            <Button className="bg-[#5CC58C] hover:bg-[#5CC58C]/90">
              Enregistrer les commentaires
            </Button>
          </Card>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="border-[#4F8BC9] text-[#4F8BC9]">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contacter le patient
            </Button>
            <Button variant="outline" className="border-[#5CC58C] text-[#5CC58C]">
              <Calendar className="w-4 h-4 mr-2" />
              Planifier RDV
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
