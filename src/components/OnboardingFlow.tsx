import { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Activity, Heart, AlertCircle, Target, User, Ruler, Weight, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import Logo from './Logo';

interface UserProfile {
  age?: number;
  gender?: 'male' | 'female' | 'other';
  height?: number;
  weight?: number;
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  conditions?: string[];
  allergies?: string[];
  goals?: string[];
  dataSharing?: boolean;
  healthNotifications?: boolean;
}

interface OnboardingFlowProps {
  onComplete: (profile: UserProfile) => void;
}

const activityLevels = [
  { value: 'sedentary', label: 'Sédentaire', description: 'Peu ou pas d\'exercice' },
  { value: 'light', label: 'Légère', description: '1-3 jours/semaine' },
  { value: 'moderate', label: 'Modérée', description: '3-5 jours/semaine' },
  { value: 'active', label: 'Active', description: '6-7 jours/semaine' },
  { value: 'very-active', label: 'Très active', description: 'Exercice intense quotidien' },
];

const conditions = [
  { id: 'diabetes', label: 'Diabète (Type 1 ou 2)' },
  { id: 'pre-diabetes', label: 'Pré-diabète' },
  { id: 'none', label: 'Aucune pathologie' },
];

const allergies = [
  { id: 'gluten', label: 'Gluten' },
  { id: 'lactose', label: 'Lactose' },
  { id: 'vegetarian', label: 'Végétarien' },
  { id: 'vegan', label: 'Végétalien' },
  { id: 'none', label: 'Aucune allergie' },
];

const goals = [
  { id: 'stabilize-glucose', label: 'Stabiliser ma glycémie' },
  { id: 'lose-weight', label: 'Perdre du poids' },
  { id: 'maintain-weight', label: 'Maintenir mon poids' },
  { id: 'gain-weight', label: 'Prendre du poids' },
  { id: 'improve-nutrition', label: 'Améliorer mon alimentation' },
];

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    conditions: [],
    allergies: [],
    goals: [],
  });

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile({ ...profile, ...updates });
  };

  const toggleArrayItem = (key: keyof UserProfile, value: string) => {
    const array = (profile[key] as string[]) || [];
    if (array.includes(value)) {
      updateProfile({ [key]: array.filter(v => v !== value) });
    } else {
      updateProfile({ [key]: [...array, value] });
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return profile.age && profile.gender && profile.height && profile.weight && profile.activityLevel;
      case 2:
        return (profile.conditions?.length || 0) > 0 && (profile.allergies?.length || 0) > 0;
      case 3:
        return (profile.goals?.length || 0) > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete(profile);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E5E5] px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          
          {/* Modern Progress Indicator */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ease-in-out ${
                  s === step
                    ? 'w-8 bg-[#1DBF73]'
                    : s < step
                    ? 'w-2 bg-[#1DBF73]'
                    : 'w-2 bg-[#E5E5E5]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-2xl mx-auto">
          {/* Step Header with Icon */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-[#DCF9EA] flex items-center justify-center shadow-unified">
                {step === 1 && <User className="w-6 h-6 text-[#1DBF73]" strokeWidth={2} />}
                {step === 2 && <Heart className="w-6 h-6 text-[#1DBF73]" strokeWidth={2} />}
                {step === 3 && <Target className="w-6 h-6 text-[#1DBF73]" strokeWidth={2} />}
                {step === 4 && <Shield className="w-6 h-6 text-[#1DBF73]" strokeWidth={2} />}
              </div>
              <div className="flex-1">
                <p className="text-body-2 text-[#1DBF73] font-medium mb-1">Étape {step} sur 4</p>
                <h1 className="text-h2 text-[#1A1A1A]">
                  {step === 1 && 'Parlez-nous de vous'}
                  {step === 2 && 'Votre santé'}
                  {step === 3 && 'Vos objectifs'}
                  {step === 4 && 'Dernières préférences'}
                </h1>
              </div>
            </div>
            <p className="text-body-1 text-[#6C6C6C] ml-15">
              {step === 1 && 'Ces informations nous aident à personnaliser vos recommandations'}
              {step === 2 && 'Nous adaptons les recettes à votre profil de santé'}
              {step === 3 && 'Définissez ce que vous souhaitez accomplir'}
              {step === 4 && 'Configurez vos préférences de confidentialité'}
            </p>
          </div>

          <Card className="p-6 bg-white border-0 shadow-unified rounded-xl mb-6">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-body-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-[#6C6C6C]" strokeWidth={2} />
                      Âge
                    </Label>
                    <Input
                      type="number"
                      placeholder="25"
                      value={profile.age || ''}
                      onChange={(e) => updateProfile({ age: parseInt(e.target.value) })}
                      className="h-12 rounded-xl border-[#E5E5E5]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-body-2">Sexe</Label>
                    <RadioGroup
                      value={profile.gender}
                      onValueChange={(value) => updateProfile({ gender: value as any })}
                    >
                      <div className="flex flex-col gap-2 mt-3">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male" className="cursor-pointer text-body-2">Homme</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female" className="cursor-pointer text-body-2">Femme</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-body-2 flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-[#6C6C6C]" strokeWidth={2} />
                      Taille (cm)
                    </Label>
                    <Input
                      type="number"
                      placeholder="170"
                      value={profile.height || ''}
                      onChange={(e) => updateProfile({ height: parseInt(e.target.value) })}
                      className="h-12 rounded-xl border-[#E5E5E5]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-body-2 flex items-center gap-2">
                      <Weight className="w-4 h-4 text-[#6C6C6C]" strokeWidth={2} />
                      Poids (kg)
                    </Label>
                    <Input
                      type="number"
                      placeholder="70"
                      value={profile.weight || ''}
                      onChange={(e) => updateProfile({ weight: parseInt(e.target.value) })}
                      className="h-12 rounded-xl border-[#E5E5E5]"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-body-2 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#6C6C6C]" strokeWidth={2} />
                    Niveau d'activité physique
                  </Label>
                  <RadioGroup
                    value={profile.activityLevel}
                    onValueChange={(value) => updateProfile({ activityLevel: value as any })}
                  >
                    <div className="space-y-2">
                      {activityLevels.map((level) => (
                        <div
                          key={level.value}
                          className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                            profile.activityLevel === level.value
                              ? 'border-[#1DBF73] bg-[#DCF9EA]/30'
                              : 'border-[#E5E5E5] hover:border-[#1DBF73]'
                          }`}
                          onClick={() => updateProfile({ activityLevel: level.value as any })}
                        >
                          <RadioGroupItem value={level.value} id={level.value} />
                          <Label htmlFor={level.value} className="flex-1 cursor-pointer">
                            <div className="flex flex-col">
                              <span className="text-[#1A1A1A] text-body-2 font-medium">{level.label}</span>
                              <span className="text-sm text-[#808080]">({level.description})</span>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Step 2: Health Conditions & Allergies */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-body-2 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#6C6C6C]" strokeWidth={2} />
                    Pathologies
                  </Label>
                  <div className="space-y-2">
                    {conditions.map((condition) => (
                      <div
                        key={condition.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                          profile.conditions?.includes(condition.id)
                            ? 'border-[#1DBF73] bg-[#DCF9EA]/30'
                            : 'border-[#E5E5E5] hover:border-[#1DBF73]'
                        }`}
                        onClick={() => toggleArrayItem('conditions', condition.id)}
                      >
                        <Checkbox
                          id={condition.id}
                          checked={profile.conditions?.includes(condition.id)}
                          onCheckedChange={() => toggleArrayItem('conditions', condition.id)}
                        />
                        <Label htmlFor={condition.id} className="flex-1 cursor-pointer text-[#1A1A1A] text-body-2">
                          {condition.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-body-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#6C6C6C]" strokeWidth={2} />
                    Allergies et intolérances
                  </Label>
                  <div className="space-y-2">
                    {allergies.map((allergy) => (
                      <div
                        key={allergy.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                          profile.allergies?.includes(allergy.id)
                            ? 'border-[#F59E0B] bg-[#FFE8CC]/30'
                            : 'border-[#E5E5E5] hover:border-[#F59E0B]'
                        }`}
                        onClick={() => toggleArrayItem('allergies', allergy.id)}
                      >
                        <Checkbox
                          id={allergy.id}
                          checked={profile.allergies?.includes(allergy.id)}
                          onCheckedChange={() => toggleArrayItem('allergies', allergy.id)}
                        />
                        <Label htmlFor={allergy.id} className="flex-1 cursor-pointer text-[#1A1A1A] text-body-2">
                          {allergy.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Goals */}
            {step === 3 && (
              <div className="space-y-3">
                <Label className="text-body-2 flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#6C6C6C]" strokeWidth={2} />
                  Sélectionnez vos objectifs santé
                </Label>
                <div className="space-y-2">
                  {goals.map((goal) => (
                    <div
                      key={goal.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                        profile.goals?.includes(goal.id)
                          ? 'border-[#1DBF73] bg-[#DCF9EA]/30'
                          : 'border-[#E5E5E5] hover:border-[#1DBF73]'
                      }`}
                      onClick={() => toggleArrayItem('goals', goal.id)}
                    >
                      <Checkbox
                        id={goal.id}
                        checked={profile.goals?.includes(goal.id)}
                        onCheckedChange={() => toggleArrayItem('goals', goal.id)}
                      />
                      <Label htmlFor={goal.id} className="flex-1 cursor-pointer text-[#1A1A1A] text-body-2">
                        {goal.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Consent */}
            {step === 4 && (
              <div className="space-y-5">
                <div className="p-4 bg-[#DCF9EA] rounded-xl">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#1DBF73] flex-shrink-0 mt-0.5" strokeWidth={2} />
                    <p className="text-body-1 text-[#1A1A1A] leading-relaxed">
                      NutriAdapt respecte votre vie privée. Vos données de santé sont chiffrées et ne seront jamais vendues à des tiers.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 border border-[#E5E5E5] rounded-xl hover:border-[#1DBF73] transition-all">
                    <Checkbox
                      id="dataSharing"
                      checked={profile.dataSharing}
                      onCheckedChange={(checked) => updateProfile({ dataSharing: checked as boolean })}
                      className="mt-1"
                    />
                    <Label htmlFor="dataSharing" className="flex-1 cursor-pointer">
                      <div className="text-[#1A1A1A] text-body-2 font-medium mb-1">Partage anonymisé des données</div>
                      <p className="text-body-2 text-[#6C6C6C]">
                        Aider la recherche en partageant vos données de manière anonyme (optionnel)
                      </p>
                    </Label>
                  </div>

                  <div className="flex items-start gap-3 p-4 border border-[#E5E5E5] rounded-xl hover:border-[#1DBF73] transition-all">
                    <Checkbox
                      id="healthNotifications"
                      checked={profile.healthNotifications}
                      onCheckedChange={(checked) => updateProfile({ healthNotifications: checked as boolean })}
                      className="mt-1"
                    />
                    <Label htmlFor="healthNotifications" className="flex-1 cursor-pointer">
                      <div className="text-[#1A1A1A] text-body-2 font-medium mb-1">Notifications santé</div>
                      <p className="text-body-2 text-[#6C6C6C]">
                        Recevoir des rappels et conseils personnalisés
                      </p>
                    </Label>
                  </div>
                </div>

                <div className="p-4 bg-[#F8F8F8] rounded-xl border border-[#E5E5E5]">
                  <p className="text-body-2 text-[#6C6C6C] leading-relaxed">
                    En continuant, vous acceptez nos{' '}
                    <span className="text-[#1DBF73] font-medium">Conditions d'utilisation</span> et notre{' '}
                    <span className="text-[#1DBF73] font-medium">Politique de confidentialité</span>.
                  </p>
                </div>
              </div>
            )}
          </Card>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="h-12 rounded-xl border border-[#E5E5E5] flex-1 shadow-unified hover:bg-[#F8F8F8]"
              >
                <ArrowLeft className="w-5 h-5 mr-2" strokeWidth={2} />
                Retour
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="h-12 rounded-xl bg-[#1DBF73] hover:bg-[#0F8F55] flex-1 disabled:opacity-50 disabled:cursor-not-allowed shadow-unified transition-all"
            >
              {step === 4 ? (
                <>
                  Terminer
                  <Check className="w-5 h-5 ml-2" strokeWidth={2} />
                </>
              ) : (
                <>
                  Continuer
                  <ArrowRight className="w-5 h-5 ml-2" strokeWidth={2} />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}