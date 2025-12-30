import { User, Stethoscope } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import Logo from './Logo';

interface RoleChoiceProps {
  onSelectRole: (role: 'patient' | 'doctor') => void;
}

export default function RoleChoice({ onSelectRole }: RoleChoiceProps) {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <Logo size="lg" />
          <div className="text-center">
            <h1 className="text-3xl text-[#222222] mb-2">Bienvenue !</h1>
            <p className="text-[#6B7280]">
              Choisissez votre espace pour continuer
            </p>
          </div>
        </div>

        {/* Role Cards */}
        <div className="space-y-4">
          <Card 
            className="p-6 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all border-2 hover:border-[#4CAF50] bg-white"
            onClick={() => onSelectRole('patient')}
          >
            <div className="flex items-center gap-5">
              <div className="bg-[#E8F5E9] rounded-2xl p-4">
                <User className="w-8 h-8 text-[#4CAF50]" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <h3 className="text-[#222222] text-lg mb-1">Espace Patient</h3>
                <p className="text-sm text-[#6B7280]">
                  Suivez votre santé au quotidien
                </p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all border-2 hover:border-[#5B8DEF] bg-white"
            onClick={() => onSelectRole('doctor')}
          >
            <div className="flex items-center gap-5">
              <div className="bg-[#EEF2FF] rounded-2xl p-4">
                <Stethoscope className="w-8 h-8 text-[#5B8DEF]" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <h3 className="text-[#222222] text-lg mb-1">Espace Médecin</h3>
                <p className="text-sm text-[#6B7280]">
                  Suivez vos patients à distance
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}