import { useState } from 'react';
import { User, Heart, Bell, ChevronRight, LogOut, Edit2, AlertCircle, Target, Settings, Activity, TrendingUp } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import EditProfileModal from './EditProfileModal';

interface User {
  email: string;
}

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

interface ProfileScreenProps {
  user: User;
  profile: UserProfile;
  onLogout: () => void;
  onUpdateProfile: (profile: UserProfile) => void;
}

const conditionLabels: Record<string, string> = {
  'diabetes': 'Diabète',
  'cholesterol': 'Cholestérol',
  'hypertension': 'HTA',
};

const allergyLabels: Record<string, string> = {
  'gluten': 'Gluten',
  'lactose': 'Lactose',
  'nuts': 'Fruits à coque',
  'shellfish': 'Fruits de mer',
  'eggs': 'Œufs',
};

const goalLabels: Record<string, string> = {
  'stabilize-glucose': 'Stabiliser ma glycémie',
  'lose-weight': 'Perdre du poids',
  'maintain-weight': 'Maintenir mon poids',
  'gain-weight': 'Prendre du poids',
  'improve-nutrition': 'Améliorer mon alimentation',
};

export default function ProfileScreen({ user, profile, onLogout, onUpdateProfile }: ProfileScreenProps) {
  const [showEditModal, setShowEditModal] = useState(false);

  const bmi = profile.height && profile.weight 
    ? (profile.weight / ((profile.height / 100) ** 2)).toFixed(1)
    : null;

  return (
    <div className="min-h-full bg-[#F8F8F8]">
      {/* Header - Simplified */}
      <div className="bg-gradient-to-br from-[#1DBF73] to-[#0F8F55] px-6 pt-8 pb-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-h2 text-white">Mon profil</h1>
        </div>
      </div>

      <div className="px-6 -mt-12">
        <div className="max-w-2xl mx-auto space-y-5">
          {/* Profile Card - Modern Header */}
          <Card className="p-6 bg-white border-0 shadow-unified rounded-xl">
            <div className="flex items-center gap-4">
              {profile.profilePhoto ? (
                <img
                  src={profile.profilePhoto}
                  alt="Photo de profil"
                  className="w-16 h-16 rounded-full object-cover shadow-unified border-2 border-[#DCF9EA]"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1DBF73] to-[#0F8F55] flex items-center justify-center shadow-unified">
                  <User className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-body-1 font-semibold text-[#1A1A1A] mb-1">Compte utilisateur</h3>
                <p className="text-body-2 text-[#6C6C6C]">{user.email}</p>
              </div>
              <button
                onClick={() => setShowEditModal(true)}
                className="w-11 h-11 rounded-xl bg-[#DCF9EA] flex items-center justify-center hover:bg-[#1DBF73] hover:text-white transition-all shadow-unified group"
              >
                <Edit2 className="w-5 h-5 text-[#1DBF73] group-hover:text-white" strokeWidth={2} />
              </button>
            </div>
          </Card>

          {/* Health Stats */}
          <Card className="p-6 bg-white border-0 shadow-unified rounded-xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#DCF9EA] flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#1DBF73]" strokeWidth={2} />
              </div>
              <h3 className="text-h3 text-[#1A1A1A]">Mes informations</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#F8F8F8] rounded-xl">
                <p className="text-body-2 text-[#6C6C6C] mb-1">Âge</p>
                <p className="text-body-1 font-semibold text-[#1A1A1A]">{profile.age} ans</p>
              </div>
              <div className="p-4 bg-[#F8F8F8] rounded-xl">
                <p className="text-body-2 text-[#6C6C6C] mb-1">Sexe</p>
                <p className="text-body-1 font-semibold text-[#1A1A1A]">
                  {profile.gender === 'male' ? 'Homme' : profile.gender === 'female' ? 'Femme' : 'Autre'}
                </p>
              </div>
              <div className="p-4 bg-[#F8F8F8] rounded-xl">
                <p className="text-body-2 text-[#6C6C6C] mb-1">Taille</p>
                <p className="text-body-1 font-semibold text-[#1A1A1A]">{profile.height} cm</p>
              </div>
              <div className="p-4 bg-[#F8F8F8] rounded-xl">
                <p className="text-body-2 text-[#6C6C6C] mb-1">Poids</p>
                <p className="text-body-1 font-semibold text-[#1A1A1A]">{profile.weight} kg</p>
              </div>
            </div>

            {/* IMC Card with gradient and icon */}
            {bmi && (
              <div className="mt-4 p-5 bg-gradient-to-br from-[#1DBF73] to-[#0F8F55] rounded-xl shadow-unified">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <p className="text-body-2 text-white/90 mb-0.5">Indice de masse corporelle (IMC)</p>
                    <p className="text-h2 text-white font-bold">{bmi}</p>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Health Conditions */}
          {profile.conditions && profile.conditions.length > 0 && profile.conditions[0] !== 'none' && (
            <Card className="p-6 bg-white border-0 shadow-unified rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#DCF9EA] flex items-center justify-center">
                  <Heart className="w-5 h-5 text-[#1DBF73]" strokeWidth={2} />
                </div>
                <h3 className="text-h3 text-[#1A1A1A]">Pathologies</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.conditions.map((condition) => (
                  <Badge key={condition} className="bg-[#DCF9EA] text-[#0F8F55] border-0 h-7 rounded-full px-4 text-body-2 font-medium shadow-unified">
                    {conditionLabels[condition] || condition}
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {/* Allergies */}
          {profile.allergies && profile.allergies.length > 0 && profile.allergies[0] !== 'none' && (
            <Card className="p-6 bg-white border-0 shadow-unified rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#FFE8CC] flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-[#F59E0B]" strokeWidth={2} />
                </div>
                <h3 className="text-h3 text-[#1A1A1A]">Allergies & Intolérances</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.allergies.map((allergy) => (
                  <Badge key={allergy} className="bg-[#FFE8CC] text-[#F59E0B] border-0 h-7 rounded-full px-4 text-body-2 font-medium shadow-unified">
                    {allergyLabels[allergy] || allergy}
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {/* Goals */}
          {profile.goals && profile.goals.length > 0 && (
            <Card className="p-6 bg-white border-0 shadow-unified rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#DCF9EA] flex items-center justify-center">
                  <Target className="w-5 h-5 text-[#1DBF73]" strokeWidth={2} />
                </div>
                <h3 className="text-h3 text-[#1A1A1A]">Mes objectifs</h3>
              </div>
              <div className="space-y-2">
                {profile.goals.map((goal) => (
                  <div key={goal} className="flex items-center gap-3 p-4 bg-[#F8F8F8] rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-[#DCF9EA] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#1DBF73]" />
                    </div>
                    <p className="text-body-1 text-[#1A1A1A]">{goalLabels[goal] || goal}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Settings */}
          <Card className="p-6 bg-white border-0 shadow-unified rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#F8F8F8] flex items-center justify-center">
                <Settings className="w-5 h-5 text-[#6C6C6C]" strokeWidth={2} />
              </div>
              <h3 className="text-h3 text-[#1A1A1A]">Paramètres</h3>
            </div>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#F8F8F8] transition-colors">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-[#6C6C6C]" strokeWidth={2} />
                  <span className="text-body-1 text-[#1A1A1A]">Notifications</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#6C6C6C]" strokeWidth={2} />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#F8F8F8] transition-colors">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-[#6C6C6C]" strokeWidth={2} />
                  <span className="text-body-1 text-[#1A1A1A]">Confidentialité</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#6C6C6C]" strokeWidth={2} />
              </button>
            </div>
          </Card>

          {/* Logout */}
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full h-12 rounded-xl border border-[#E5E5E5] hover:bg-red-50 hover:border-red-200 hover:text-red-600 shadow-unified transition-all"
          >
            <LogOut className="w-5 h-5 mr-2" strokeWidth={2} />
            Se déconnecter
          </Button>

          {/* Bottom padding */}
          <div className="h-4" />
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfileModal
          profile={profile}
          onClose={() => setShowEditModal(false)}
          onSave={(updatedProfile) => {
            onUpdateProfile(updatedProfile);
            setShowEditModal(false);
          }}
        />
      )}
    </div>
  );
}