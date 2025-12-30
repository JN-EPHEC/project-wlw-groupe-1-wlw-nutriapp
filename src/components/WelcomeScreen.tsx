import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import Logo from './Logo';
import ForgotPasswordScreen from './ForgotPasswordScreen';

interface User {
  id: string;
  email: string;
}

interface WelcomeScreenProps {
  onLogin: (user: User, isNewUser: boolean) => void;
}

// Social Login Icons
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M19.9895 10.1871C19.9895 9.36767 19.9214 8.76973 19.7742 8.14966H10.1992V11.848H15.8195C15.7062 12.7671 15.0943 14.1512 13.7346 15.0813L13.7155 15.2051L16.7429 17.4969L16.9527 17.5174C18.879 15.7789 19.9895 13.221 19.9895 10.1871Z" fill="#4285F4"/>
      <path d="M10.1993 19.9313C12.9527 19.9313 15.2643 19.0454 16.9527 17.5174L13.7346 15.0813C12.8734 15.6682 11.7176 16.0779 10.1993 16.0779C7.50243 16.0779 5.21352 14.3395 4.39759 11.9366L4.27799 11.9466L1.13003 14.3273L1.08887 14.4391C2.76588 17.6945 6.21061 19.9313 10.1993 19.9313Z" fill="#34A853"/>
      <path d="M4.39748 11.9366C4.18219 11.3166 4.05759 10.6521 4.05759 9.96565C4.05759 9.27909 4.18219 8.61473 4.38615 7.99466L4.38045 7.8626L1.19304 5.44366L1.08875 5.49214C0.397576 6.84305 0.000976562 8.36008 0.000976562 9.96565C0.000976562 11.5712 0.397576 13.0882 1.08875 14.4391L4.39748 11.9366Z" fill="#FBBC05"/>
      <path d="M10.1993 3.85336C12.1142 3.85336 13.406 4.66168 14.1425 5.33717L17.0207 2.59107C15.253 0.985496 12.9527 0 10.1993 0C6.2106 0 2.76588 2.23672 1.08887 5.49214L4.38626 7.99466C5.21352 5.59183 7.50242 3.85336 10.1993 3.85336Z" fill="#EB4335"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M16.2071 17.5C15.1821 18.7917 14.0571 20 12.4446 20C10.8321 20 10.3696 19.0417 8.51963 19.0417C6.61963 19.0417 5.95713 20 4.49463 20C2.98213 20 1.75713 18.5417 0.782134 17C-0.842866 14.2917 -1.50537 9.75 0.244634 6.70833C1.21963 5.16667 2.84463 4.20833 4.59463 4.20833C6.10713 4.20833 7.28213 5.16667 8.26963 5.16667C9.20713 5.16667 10.5821 4.125 12.3446 4.20833C13.1196 4.25 15.0696 4.5 16.3696 6.29167C16.2696 6.35417 14.1571 7.66667 14.1821 10.2917C14.2071 13.4583 17.0071 14.5417 17.0321 14.5417C17.0071 14.6042 16.5696 16.1667 15.5196 17.7917L16.2071 17.5ZM11.9071 2.75C12.6821 1.79167 13.2071 0.458333 13.0571 0C11.9571 0.0416667 10.6196 0.791667 9.79463 1.79167C9.06963 2.66667 8.44463 4.04167 8.61963 5.33333C9.84463 5.41667 11.1321 4.66667 11.9071 3.70833V2.75Z" fill="currentColor"/>
    </svg>
  );
}

export default function WelcomeScreen({ onLogin }: WelcomeScreenProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rgpdConsent, setRgpdConsent] = useState(false);
  const [error, setError] = useState('');

  // Show Forgot Password Screen
  if (showForgotPassword) {
    return <ForgotPasswordScreen onBack={() => setShowForgotPassword(false)} />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (isSignup && !rgpdConsent) {
      setError('Veuillez accepter les conditions RGPD');
      return;
    }

    if (isSignup && password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    // Mock authentication
    onLogin({
      id: Math.random().toString(36).substr(2, 9),
      email,
    }, isSignup);
  };

  if (!isSignup) {
    // Login Screen
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8">
          {/* Logo */}
          <div className="flex flex-col items-center gap-4">
            <Logo size="lg" />
            <div className="text-center">
              <h1 className="text-h1 text-[#1A1A1A] mb-2">Bienvenue</h1>
              <p className="text-body-1 text-[#6C6C6C]">
                Connectez-vous pour accéder à vos recettes santé
              </p>
            </div>
          </div>

          {/* Login Form */}
          <Card className="p-6 shadow-unified border-0 bg-white rounded-xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#1A1A1A] text-body-2">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C6C6C]" strokeWidth={2} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    className="pl-12 h-12 rounded-xl border-[#E5E5E5] bg-white text-body-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#1A1A1A] text-body-2">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C6C6C]" strokeWidth={2} />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-12 pr-12 h-12 rounded-xl border-[#E5E5E5] bg-white text-body-1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6C6C6C] hover:text-[#1A1A1A]"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" strokeWidth={2} />
                    ) : (
                      <Eye className="w-5 h-5" strokeWidth={2} />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-500 bg-red-50 p-4 rounded-xl">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full h-12 rounded-xl bg-[#1DBF73] hover:bg-[#0F8F55] text-white shadow-unified">
                Se connecter
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E5E5E5]"></div>
                </div>
                <div className="relative flex justify-center text-body-2 uppercase">
                  <span className="bg-white px-4 text-[#6C6C6C]">Ou continuer avec</span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="flex justify-center">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 rounded-xl border-[#E5E5E5] hover:bg-[#F8F8F8] shadow-unified"
                  onClick={() => {
                    // Mock Google login
                    onLogin({
                      id: 'google-' + Math.random().toString(36).substr(2, 9),
                      email: 'user@gmail.com',
                    }, false);
                  }}
                >
                  <GoogleIcon />
                  <span className="ml-2 text-body-2">Google</span>
                </Button>
              </div>

              <button
                type="button"
                className="w-full text-body-2 text-[#1DBF73] hover:underline"
                onClick={() => {
                  // Navigate to Forgot Password Screen
                  setShowForgotPassword(true);
                }}
              >
                Mot de passe oublié ?
              </button>
            </form>
          </Card>

          {/* Switch to Signup */}
          <div className="text-center">
            <p className="text-body-2 text-[#6C6C6C]">
              Pas encore de compte ?{' '}
              <button
                onClick={() => setIsSignup(true)}
                className="text-[#1DBF73] hover:underline font-medium"
              >
                S'inscrire
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Signup Screen
  return (
    <div className="min-h-screen bg-[#F8F8F8] flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <Logo size="lg" />
          <div className="text-center">
            <h1 className="text-h1 text-[#1A1A1A] mb-2">Créer un compte</h1>
            <p className="text-body-1 text-[#6C6C6C]">
              Rejoignez NutriAdapt pour des recettes adaptées à votre santé
            </p>
          </div>
        </div>

        {/* Signup Form */}
        <Card className="p-6 shadow-unified border-0 bg-white rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#1A1A1A] text-body-2">Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C6C6C]" strokeWidth={2} />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  className="pl-12 h-12 rounded-xl border-[#E5E5E5] bg-white text-body-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#1A1A1A] text-body-2">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C6C6C]" strokeWidth={2} />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-12 pr-12 h-12 rounded-xl border-[#E5E5E5] bg-white text-body-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6C6C6C] hover:text-[#1A1A1A]"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" strokeWidth={2} />
                  ) : (
                    <Eye className="w-5 h-5" strokeWidth={2} />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[#1A1A1A] text-body-2">Confirmer le mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C6C6C]" strokeWidth={2} />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-12 pr-12 h-12 rounded-xl border-[#E5E5E5] bg-white text-body-1"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6C6C6C] hover:text-[#1A1A1A]"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" strokeWidth={2} />
                  ) : (
                    <Eye className="w-5 h-5" strokeWidth={2} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-[#F8F8F8] rounded-xl">
              <Checkbox
                id="rgpd"
                checked={rgpdConsent}
                onCheckedChange={(checked) => setRgpdConsent(checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="rgpd" className="text-body-2 text-[#1A1A1A] cursor-pointer leading-relaxed">
                J'accepte que mes données de santé soient traitées conformément au RGPD pour personnaliser mes recommandations nutritionnelles.
              </label>
            </div>

            {error && (
              <div className="text-sm text-red-500 bg-red-50 p-4 rounded-xl">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full h-12 rounded-xl bg-[#1DBF73] hover:bg-[#0F8F55] text-white shadow-unified">
              Créer mon compte
            </Button>
          </form>
        </Card>

        {/* Switch to Login */}
        <div className="text-center">
          <p className="text-body-2 text-[#6C6C6C]">
            Déjà un compte ?{' '}
            <button
              onClick={() => setIsSignup(false)}
              className="text-[#1DBF73] hover:underline font-medium"
            >
              Se connecter
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}