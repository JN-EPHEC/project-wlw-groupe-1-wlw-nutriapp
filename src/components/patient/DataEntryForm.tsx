import { useState } from 'react';
import { X, Droplet, Weight, Heart, Activity, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';

interface DataEntryFormProps {
  onClose: () => void;
  onSubmit: (data: HealthData) => void;
}

export interface HealthData {
  glucose?: number;
  weight?: number;
  systolic?: number;
  diastolic?: number;
  activity?: number;
  water?: number;
  date: Date;
}

export default function DataEntryForm({ onClose, onSubmit }: DataEntryFormProps) {
  const [glucose, setGlucose] = useState('');
  const [weight, setWeight] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [activity, setActivity] = useState('');
  const [water, setWater] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data: HealthData = {
      date: new Date(),
      ...(glucose && { glucose: parseFloat(glucose) }),
      ...(weight && { weight: parseFloat(weight) }),
      ...(systolic && { systolic: parseFloat(systolic) }),
      ...(diastolic && { diastolic: parseFloat(diastolic) }),
      ...(activity && { activity: parseFloat(activity) }),
      ...(water && { water: parseFloat(water) }),
    };

    onSubmit(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-lg bg-white border-0 shadow-2xl rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#1DBF73] to-[#0F8F55] p-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-h2 text-white mb-1">Encoder mes données</h3>
              <p className="text-body-2 text-white/90">Ajoutez vos mesures du jour</p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5 text-white" strokeWidth={2} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Glycémie */}
          <div className="space-y-2">
            <Label className="text-body-1 text-[#1A1A1A] font-medium flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#DCF9EA] flex items-center justify-center">
                <Droplet className="w-4 h-4 text-[#1DBF73]" strokeWidth={2} />
              </div>
              Glycémie (mg/dL)
            </Label>
            <Input
              type="number"
              step="0.1"
              placeholder="Ex: 110"
              value={glucose}
              onChange={(e) => setGlucose(e.target.value)}
              className="h-12 rounded-xl border-[#E5E5E5] bg-white"
            />
          </div>

          {/* Poids */}
          <div className="space-y-2">
            <Label className="text-body-1 text-[#1A1A1A] font-medium flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FFE8CC] flex items-center justify-center">
                <Weight className="w-4 h-4 text-[#F59E0B]" strokeWidth={2} />
              </div>
              Poids (kg)
            </Label>
            <Input
              type="number"
              step="0.1"
              placeholder="Ex: 72.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="h-12 rounded-xl border-[#E5E5E5] bg-white"
            />
          </div>

          {/* Tension artérielle */}
          <div className="space-y-2">
            <Label className="text-body-1 text-[#1A1A1A] font-medium flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FFE8E8] flex items-center justify-center">
                <Heart className="w-4 h-4 text-[#EF4444]" strokeWidth={2} />
              </div>
              Tension artérielle (mmHg)
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                placeholder="Systolique (ex: 120)"
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
                className="h-12 rounded-xl border-[#E5E5E5] bg-white"
              />
              <Input
                type="number"
                placeholder="Diastolique (ex: 80)"
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
                className="h-12 rounded-xl border-[#E5E5E5] bg-white"
              />
            </div>
          </div>

          {/* Activité physique */}
          <div className="space-y-2">
            <Label className="text-body-1 text-[#1A1A1A] font-medium flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] flex items-center justify-center">
                <Activity className="w-4 h-4 text-[#5B8DEF]" strokeWidth={2} />
              </div>
              Activité physique (minutes)
            </Label>
            <Input
              type="number"
              placeholder="Ex: 30"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="h-12 rounded-xl border-[#E5E5E5] bg-white"
            />
          </div>

          {/* Eau consommée */}
          <div className="space-y-2">
            <Label className="text-body-1 text-[#1A1A1A] font-medium flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#DBEAFE] flex items-center justify-center">
                <Droplet className="w-4 h-4 text-[#3B82F6]" strokeWidth={2} fill="#3B82F6" />
              </div>
              Eau consommée (litres)
            </Label>
            <Input
              type="number"
              step="0.1"
              placeholder="Ex: 2.0"
              value={water}
              onChange={(e) => setWater(e.target.value)}
              className="h-12 rounded-xl border-[#E5E5E5] bg-white"
            />
          </div>

          {/* Info box */}
          <div className="bg-[#F8F8F8] p-4 rounded-xl border border-[#E5E5E5]">
            <p className="text-body-2 text-[#6C6C6C] leading-relaxed">
              💡 <span className="font-medium text-[#1A1A1A]">Astuce :</span> Vous n'êtes pas obligé de remplir tous les champs. Ajoutez uniquement les données que vous avez mesurées.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 rounded-xl border-[#E5E5E5] hover:bg-[#F8F8F8] shadow-unified"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 rounded-xl bg-[#1DBF73] hover:bg-[#0F8F55] shadow-unified"
            >
              <Plus className="w-5 h-5 mr-2" strokeWidth={2} />
              Enregistrer
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
