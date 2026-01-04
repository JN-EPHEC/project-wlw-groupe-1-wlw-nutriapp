import { User, Mail, Phone, Briefcase, Shield, LogOut, ChevronRight } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';

interface User {
  name: string;
  email: string;
}

interface DoctorSettingsProps {
  user: User;
  onLogout: () => void;
}

export default function DoctorSettings({ user, onLogout }: DoctorSettingsProps) {
  return (
    <div className="min-h-full bg-[#F8F9FA] p-4 pb-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="pt-4">
          <h1 className="text-2xl text-[#222222] mb-1">Mon profil</h1>
          <p className="text-[#222222]/60">
            Gérez vos informations professionnelles
          </p>
        </div>

        {/* Profile Card */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#5CC58C] to-[#4F8BC9] flex items-center justify-center text-white text-2xl">
              {user.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h3 className="text-xl text-[#222222] mb-1">{user.name}</h3>
              <p className="text-[#222222]/60 text-sm">{user.email}</p>
              <p className="text-[#222222]/60 text-sm">Médecin généraliste</p>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            Modifier le profil
          </Button>
        </Card>

        {/* Professional Info */}
        <Card className="p-5">
          <h3 className="text-[#222222] mb-4">Informations professionnelles</h3>
          <div className="space-y-3">
            <SettingItem
              icon={<Briefcase className="w-5 h-5" />}
              label="Spécialité"
              value="Médecine générale, Diabétologie"
            />
            <SettingItem
              icon={<Phone className="w-5 h-5" />}
              label="Téléphone"
              value="+33 1 23 45 67 89"
            />
            <SettingItem
              icon={<Mail className="w-5 h-5" />}
              label="Email professionnel"
              value={user.email}
            />
            <SettingItem
              icon={<User className="w-5 h-5" />}
              label="Numéro RPPS"
              value="10001234567"
            />
          </div>
          <Button variant="outline" className="w-full mt-4">
            Modifier mes informations
          </Button>
        </Card>

        {/* Statistics */}
        <Card className="p-5">
          <h3 className="text-[#222222] mb-4">Mes statistiques</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-[#F8F9FA] rounded-lg">
              <p className="text-2xl text-[#5CC58C] mb-1">42</p>
              <p className="text-sm text-[#222222]/60">Patients suivis</p>
            </div>
            <div className="text-center p-4 bg-[#F8F9FA] rounded-lg">
              <p className="text-2xl text-[#4F8BC9] mb-1">156</p>
              <p className="text-sm text-[#222222]/60">Consultations ce mois</p>
            </div>
            <div className="text-center p-4 bg-[#F8F9FA] rounded-lg">
              <p className="text-2xl text-orange-500 mb-1">3</p>
              <p className="text-sm text-[#222222]/60">Alertes actives</p>
            </div>
            <div className="text-center p-4 bg-[#F8F9FA] rounded-lg">
              <p className="text-2xl text-green-600 mb-1">85%</p>
              <p className="text-sm text-[#222222]/60">Taux de suivi</p>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-5">
          <h3 className="text-[#222222] mb-4">Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="alert-critical">Alertes critiques</Label>
                <p className="text-sm text-[#222222]/60">Valeurs hors normes</p>
              </div>
              <Switch id="alert-critical" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="alert-new-measure">Nouvelles mesures</Label>
                <p className="text-sm text-[#222222]/60">Données patients</p>
              </div>
              <Switch id="alert-new-measure" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="alert-missing">Mesures manquantes</Label>
                <p className="text-sm text-[#222222]/60">Patients inactifs</p>
              </div>
              <Switch id="alert-missing" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="alert-appointments">Rappels RDV</Label>
                <p className="text-sm text-[#222222]/60">Consultations à venir</p>
              </div>
              <Switch id="alert-appointments" defaultChecked />
            </div>
          </div>
        </Card>

        {/* Privacy & Security */}
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-[#5CC58C]" />
            <h3 className="text-[#222222]">Confidentialité et sécurité</h3>
          </div>
          <div className="space-y-2">
            <SettingButton label="Politique de confidentialité" />
            <SettingButton label="Conditions d'utilisation" />
            <SettingButton label="Conformité RGPD" />
            <SettingButton label="Sécurité des données" />
          </div>
        </Card>

        {/* RGPD Notice */}
        <Card className="p-5 bg-blue-50 border-blue-200">
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-[#4F8BC9] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-[#222222] mb-1">Conformité RGPD</h3>
              <p className="text-sm text-[#222222]/70">
                En tant que professionnel de santé, vous êtes responsable de la protection 
                des données de vos patients. Cette application respecte les normes RGPD et 
                assure la confidentialité des informations médicales.
              </p>
            </div>
          </div>
        </Card>

        {/* App Info */}
        <Card className="p-5 text-center">
          <p className="text-sm text-[#222222]/60 mb-1">NutriAdapt - Espace Médecin</p>
          <p className="text-xs text-[#222222]/40">Version 1.0.0</p>
        </Card>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full text-red-600 border-red-200 hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Se déconnecter
        </Button>
      </div>
    </div>
  );
}

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function SettingItem({ icon, label, value }: SettingItemProps) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="text-[#5CC58C]">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-[#222222]/60">{label}</p>
        <p className="text-[#222222]">{value}</p>
      </div>
    </div>
  );
}

interface SettingButtonProps {
  label: string;
}

function SettingButton({ label }: SettingButtonProps) {
  return (
    <button className="w-full flex items-center justify-between p-3 hover:bg-[#F8F9FA] rounded-lg transition-colors">
      <span className="text-[#222222]">{label}</span>
      <ChevronRight className="w-5 h-5 text-[#222222]/40" />
    </button>
  );
}
