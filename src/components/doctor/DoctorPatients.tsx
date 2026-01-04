import { useState } from 'react';
import { Search, Filter, ChevronRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import PatientDetailView from './PatientDetailView';

interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  lastUpdate: string;
  status: 'good' | 'warning' | 'alert';
  trend: 'up' | 'down' | 'stable';
  lastGlucose?: number;
  lastWeight?: number;
}

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Marie Martin',
    age: 35,
    condition: 'Diabète Type 2',
    lastUpdate: 'Il y a 15 min',
    status: 'good',
    trend: 'stable',
    lastGlucose: 115,
    lastWeight: 74.0
  },
  {
    id: '2',
    name: 'Jean Dupuis',
    age: 52,
    condition: 'Diabète Type 2',
    lastUpdate: 'Il y a 1h',
    status: 'good',
    trend: 'down',
    lastGlucose: 108,
    lastWeight: 82.5
  },
  {
    id: '3',
    name: 'Sophie Bernard',
    age: 44,
    condition: 'Obésité',
    lastUpdate: 'Il y a 2h',
    status: 'alert',
    trend: 'up',
    lastGlucose: 185,
    lastWeight: 95.3
  },
  {
    id: '4',
    name: 'Pierre Leroy',
    age: 61,
    condition: 'Hypertension',
    lastUpdate: 'Il y a 3h',
    status: 'good',
    trend: 'stable',
    lastWeight: 78.2
  },
  {
    id: '5',
    name: 'Camille Dubois',
    age: 38,
    condition: 'Diabète Type 1',
    lastUpdate: 'Il y a 5h',
    status: 'warning',
    trend: 'up',
    lastGlucose: 142,
    lastWeight: 65.8
  },
  {
    id: '6',
    name: 'Luc Moreau',
    age: 49,
    condition: 'Diabète Type 2',
    lastUpdate: 'Hier',
    status: 'good',
    trend: 'down',
    lastGlucose: 102,
    lastWeight: 88.1
  },
  {
    id: '7',
    name: 'Emma Petit',
    age: 29,
    condition: 'Diabète Type 1',
    lastUpdate: 'Il y a 6h',
    status: 'good',
    trend: 'stable',
    lastGlucose: 118,
    lastWeight: 58.5
  },
  {
    id: '8',
    name: 'Thomas Roux',
    age: 55,
    condition: 'Obésité',
    lastUpdate: 'Il y a 8h',
    status: 'warning',
    trend: 'stable',
    lastWeight: 102.4
  }
];

export default function DoctorPatients() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const conditions = ['Tous', 'Diabète Type 1', 'Diabète Type 2', 'Obésité', 'Hypertension'];

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCondition = !selectedCondition || selectedCondition === 'Tous' || patient.condition === selectedCondition;
    return matchesSearch && matchesCondition;
  });

  if (selectedPatient) {
    return (
      <PatientDetailView
        patient={selectedPatient}
        onBack={() => setSelectedPatient(null)}
      />
    );
  }

  return (
    <div className="min-h-full bg-[#F8F9FA] p-4 pb-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="pt-4">
          <h1 className="text-2xl text-[#222222] mb-1">Mes patients</h1>
          <p className="text-[#222222]/60">
            {filteredPatients.length} patient{filteredPatients.length > 1 ? 's' : ''} suivi{filteredPatients.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#222222]/40" />
          <Input
            placeholder="Rechercher un patient..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {conditions.map((condition) => (
            <Button
              key={condition}
              variant={selectedCondition === condition ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCondition(condition === 'Tous' ? null : condition)}
              className={selectedCondition === condition ? 'bg-[#5CC58C]' : ''}
            >
              {condition}
            </Button>
          ))}
        </div>

        {/* Patient List */}
        <div className="space-y-3">
          {filteredPatients.map((patient) => (
            <Card
              key={patient.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedPatient(patient)}
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4F8BC9] to-[#5CC58C] flex items-center justify-center text-white flex-shrink-0">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[#222222]">{patient.name}</h3>
                    {patient.status === 'alert' && (
                      <Badge variant="destructive" className="text-xs">Alerte</Badge>
                    )}
                    {patient.status === 'warning' && (
                      <Badge className="text-xs bg-orange-500">Attention</Badge>
                    )}
                  </div>
                  <p className="text-sm text-[#222222]/60 mb-1">
                    {patient.age} ans • {patient.condition}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-[#222222]/50">
                    <span>{patient.lastUpdate}</span>
                    {patient.lastGlucose && (
                      <>
                        <span>•</span>
                        <span>Glycémie: {patient.lastGlucose} mg/dL</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Trend */}
                <div className="flex items-center gap-2">
                  {patient.trend === 'up' && (
                    <div className="bg-red-50 rounded-full p-2">
                      <TrendingUp className="w-5 h-5 text-red-500" />
                    </div>
                  )}
                  {patient.trend === 'down' && (
                    <div className="bg-green-50 rounded-full p-2">
                      <TrendingDown className="w-5 h-5 text-[#5CC58C]" />
                    </div>
                  )}
                  {patient.trend === 'stable' && (
                    <div className="bg-blue-50 rounded-full p-2">
                      <Minus className="w-5 h-5 text-[#4F8BC9]" />
                    </div>
                  )}
                  <ChevronRight className="w-5 h-5 text-[#222222]/20" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 mx-auto mb-3 text-[#222222]/20" />
            <p className="text-[#222222]/60">Aucun patient trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
}
