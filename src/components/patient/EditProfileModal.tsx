import { useState } from 'react';
import { X, Check, User, Heart, AlertCircle, Target, Camera, Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';

interface UserProfile {
  age?: number;
  gender?: 'male' | 'female' | 'other';
  height?: number;
  weight?: number;
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  conditions?: string[];
  allergies?: string[];
  goals?: string[];
  healthNotifications?: boolean;
  profilePhoto?: string;
}

interface EditProfileModalProps {
  profile: UserProfile;
  onClose: () => void;
  onSave: (profile: UserProfile) => void;
}

const conditions = [
  { id: 'diabetes', label: 'Diabète' },
  { id: 'cholesterol', label: 'Cholestérol' },
  { id: 'hypertension', label: 'HTA' },
];

const allergies = [
  { id: 'gluten', label: 'Gluten' },
  { id: 'lactose', label: 'Lactose' },
  { id: 'nuts', label: 'Fruits à coque' },
];

const goals = [
  { id: 'stabilize-glucose', label: 'Stabiliser ma glycémie' },
  { id: 'lose-weight', label: 'Perdre du poids' },
  { id: 'maintain-weight', label: 'Maintenir mon poids' },
];

export default function EditProfileModal({ profile, onClose, onSave }: EditProfileModalProps) {
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setEditedProfile({ ...editedProfile, ...updates });
  };

  const toggleArrayItem = (key: keyof UserProfile, value: string) => {
    const array = (editedProfile[key] as string[]) || [];
    if (array.includes(value)) {
      updateProfile({ [key]: array.filter(v => v !== value) });
    } else {
      updateProfile({ [key]: [...array, value] });
    }
  };

  // Handle file upload and convert to base64
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La taille de l\'image ne doit pas dépasser 5 MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner une image valide');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({ profilePhoto: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-2xl rounded-t-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header - Modern */}
        <div className="flex items-center justify-between p-6 border-b border-[#E5E5E5] bg-gradient-to-r from-[#1DBF73] to-[#0F8F55]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <User className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <h2 className="text-h3 text-white">Modifier mon profil</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5 text-white" strokeWidth={2} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 bg-[#F8F8F8]">
          <div className="space-y-6">
            {/* Profile Photo Selection */}
            <div className="bg-white p-5 rounded-xl shadow-unified">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#DCF9EA] flex items-center justify-center">
                  <Camera className="w-5 h-5 text-[#1DBF73]" strokeWidth={2} />
                </div>
                <h3 className="text-h3 text-[#1A1A1A]">Photo de profil</h3>
              </div>

              {/* Current Photo Display */}
              <div className="flex flex-col items-center mb-5">
                <div className="relative group">
                  {editedProfile.profilePhoto ? (
                    <img
                      src={editedProfile.profilePhoto}
                      alt="Photo de profil"
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover shadow-unified border-4 border-[#DCF9EA]"
                    />
                  ) : (
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#1DBF73] to-[#0F8F55] flex items-center justify-center shadow-unified border-4 border-[#DCF9EA]">
                      <User className="w-12 h-12 sm:w-14 sm:h-14 text-white" strokeWidth={2} />
                    </div>
                  )}
                  {editedProfile.profilePhoto && (
                    <button
                      onClick={() => updateProfile({ profilePhoto: undefined })}
                      className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-unified transition-all opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-4 h-4 text-white" strokeWidth={2} />
                    </button>
                  )}
                </div>
                <p className="text-body-2 text-[#6C6C6C] mt-3 text-center">
                  Ajoutez votre photo
                </p>
              </div>

              {/* Upload/Camera Buttons */}
              <div className="grid grid-cols-2 gap-3">
                {/* Upload from device */}
                <label
                  htmlFor="photo-upload"
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-[#E5E5E5] hover:border-[#1DBF73] hover:bg-[#DCF9EA]/20 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#DCF9EA] group-hover:bg-[#1DBF73] flex items-center justify-center transition-colors">
                    <Upload className="w-6 h-6 text-[#1DBF73] group-hover:text-white" strokeWidth={2} />
                  </div>
                  <span className="text-body-2 font-medium text-[#1A1A1A] group-hover:text-[#1DBF73]">
                    Charger une photo
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                </label>

                {/* Take photo with camera */}
                <label
                  htmlFor="photo-camera"
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-[#E5E5E5] hover:border-[#1DBF73] hover:bg-[#DCF9EA]/20 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#DCF9EA] group-hover:bg-[#1DBF73] flex items-center justify-center transition-colors">
                    <Camera className="w-6 h-6 text-[#1DBF73] group-hover:text-white" strokeWidth={2} />
                  </div>
                  <span className="text-body-2 font-medium text-[#1A1A1A] group-hover:text-[#1DBF73]">
                    Prendre une photo
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    capture="user"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="photo-camera"
                  />
                </label>
              </div>
              <p className="text-xs text-[#6C6C6C] mt-3 text-center">
                Taille max: 5 MB • Formats: JPG, PNG, WEBP
              </p>
            </div>

            {/* Basic Info - With icon */}
            <div className="bg-white p-5 rounded-xl shadow-unified">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#DCF9EA] flex items-center justify-center">
                  <User className="w-5 h-5 text-[#1DBF73]" strokeWidth={2} />
                </div>
                <h3 className="text-h3 text-[#1A1A1A]">Informations de base</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-body-2 text-[#6C6C6C]">Âge</Label>
                  <Input
                    type="number"
                    value={editedProfile.age || ''}
                    onChange={(e) => updateProfile({ age: parseInt(e.target.value) })}
                    className="h-12 rounded-xl border-[#E5E5E5] bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-body-2 text-[#6C6C6C]">Poids (kg)</Label>
                  <Input
                    type="number"
                    value={editedProfile.weight || ''}
                    onChange={(e) => updateProfile({ weight: parseInt(e.target.value) })}
                    className="h-12 rounded-xl border-[#E5E5E5] bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Conditions - With icon */}
            <div className="bg-white p-5 rounded-xl shadow-unified">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#DCF9EA] flex items-center justify-center">
                  <Heart className="w-5 h-5 text-[#1DBF73]" strokeWidth={2} />
                </div>
                <h3 className="text-h3 text-[#1A1A1A]">Pathologies</h3>
              </div>
              <div className="space-y-3">
                {conditions.map((condition) => (
                  <div
                    key={condition.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                      editedProfile.conditions?.includes(condition.id)
                        ? 'border-[#1DBF73] bg-[#DCF9EA]/30 shadow-unified'
                        : 'border-[#E5E5E5] hover:border-[#1DBF73] hover:shadow-unified'
                    }`}
                    onClick={() => toggleArrayItem('conditions', condition.id)}
                  >
                    <Checkbox
                      id={condition.id}
                      checked={editedProfile.conditions?.includes(condition.id)}
                      onCheckedChange={() => toggleArrayItem('conditions', condition.id)}
                    />
                    <Label htmlFor={condition.id} className="flex-1 cursor-pointer text-body-1 text-[#1A1A1A]">
                      {condition.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Allergies - With icon */}
            <div className="bg-white p-5 rounded-xl shadow-unified">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#FFE8CC] flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-[#F59E0B]" strokeWidth={2} />
                </div>
                <h3 className="text-h3 text-[#1A1A1A]">Allergies</h3>
              </div>
              <div className="space-y-3">
                {allergies.map((allergy) => (
                  <div
                    key={allergy.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                      editedProfile.allergies?.includes(allergy.id)
                        ? 'border-[#F59E0B] bg-[#FFE8CC]/30 shadow-unified'
                        : 'border-[#E5E5E5] hover:border-[#F59E0B] hover:shadow-unified'
                    }`}
                    onClick={() => toggleArrayItem('allergies', allergy.id)}
                  >
                    <Checkbox
                      id={allergy.id}
                      checked={editedProfile.allergies?.includes(allergy.id)}
                      onCheckedChange={() => toggleArrayItem('allergies', allergy.id)}
                    />
                    <Label htmlFor={allergy.id} className="flex-1 cursor-pointer text-body-1 text-[#1A1A1A]">
                      {allergy.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Goals - With icon */}
            <div className="bg-white p-5 rounded-xl shadow-unified">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#DCF9EA] flex items-center justify-center">
                  <Target className="w-5 h-5 text-[#1DBF73]" strokeWidth={2} />
                </div>
                <h3 className="text-h3 text-[#1A1A1A]">Objectifs</h3>
              </div>
              <div className="space-y-3">
                {goals.map((goal) => (
                  <div
                    key={goal.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                      editedProfile.goals?.includes(goal.id)
                        ? 'border-[#1DBF73] bg-[#DCF9EA]/30 shadow-unified'
                        : 'border-[#E5E5E5] hover:border-[#1DBF73] hover:shadow-unified'
                    }`}
                    onClick={() => toggleArrayItem('goals', goal.id)}
                  >
                    <Checkbox
                      id={goal.id}
                      checked={editedProfile.goals?.includes(goal.id)}
                      onCheckedChange={() => toggleArrayItem('goals', goal.id)}
                    />
                    <Label htmlFor={goal.id} className="flex-1 cursor-pointer text-body-1 text-[#1A1A1A]">
                      {goal.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Modern */}
        <div className="p-6 border-t border-[#E5E5E5] bg-white shadow-2xl">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 rounded-xl border border-[#E5E5E5] hover:bg-[#F8F8F8] shadow-unified"
            >
              Annuler
            </Button>
            <Button
              onClick={() => onSave(editedProfile)}
              className="flex-1 h-12 rounded-xl bg-[#1DBF73] hover:bg-[#0F8F55] shadow-unified"
            >
              <Check className="w-5 h-5 mr-2" strokeWidth={2} />
              Enregistrer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}