import { useState } from 'react';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import Logo from './Logo';

interface AuthScreenProps {
  role: 'patient' | 'doctor';
  onBack: () => void;
  onLogin: (user: { id: string; email: string; name: string }) => void;
}

export default function AuthScreen({ role, onBack, onLogin }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (!isLogin && !confirmPassword) {
      setError('Veuillez confirmer votre mot de passe');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    // Mock login/signup
    const userName = role === 'doctor' ? 'Dr. Dupont' : 'Marie Martin';
    onLogin({
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: userName
    });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 pt-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Logo size="sm" />
      </div>

      {/* Auth Form */}
      <div className="flex-1 flex items-center justify-center">
        <Card className="max-w-md w-full p-8 shadow-lg border-0">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl text-[#222222] mb-2">
                {isLogin ? 'Connexion' : 'Créer un compte'}
              </h2>
              <p className="text-[#6B7280]">
                {role === 'patient' ? 'Espace Patient' : 'Espace Médecin'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#222222]">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    className="pl-10 h-12 rounded-xl border-[#E5E7EB] bg-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#222222]">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10 h-12 rounded-xl border-[#E5E7EB] bg-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#222222]"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-[#222222]">Confirmer le mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 h-12 rounded-xl border-[#E5E7EB] bg-white"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full h-12 rounded-xl bg-[#4CAF50] hover:bg-[#45A049] shadow-sm">
                {isLogin ? 'Se connecter' : 'Créer un compte'}
              </Button>

              {isLogin && (
                <button
                  type="button"
                  className="w-full text-sm text-[#5B8DEF] hover:underline"
                >
                  Mot de passe oublié ?
                </button>
              )}
            </form>

            <div className="text-center pt-4 border-t border-[#E5E7EB]">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="text-sm text-[#6B7280]"
              >
                {isLogin ? (
                  <>
                    Pas encore de compte ?{' '}
                    <span className="text-[#4CAF50] font-medium">Inscrivez-vous</span>
                  </>
                ) : (
                  <>
                    Déjà inscrit ?{' '}
                    <span className="text-[#4CAF50] font-medium">Connectez-vous</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}