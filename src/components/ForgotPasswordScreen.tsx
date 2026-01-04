import { useState } from 'react';
import { ArrowLeft, Mail, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import Logo from './Logo';

interface ForgotPasswordScreenProps {
  onBack: () => void;
}

export default function ForgotPasswordScreen({ onBack }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Veuillez entrer votre adresse email');
      return;
    }

    // Validation email simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Veuillez entrer une adresse email valide');
      return;
    }

    setIsLoading(true);

    // Simulation d'envoi d'email (2 secondes)
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8">
          {/* Logo */}
          <div className="flex flex-col items-center gap-4">
            <Logo size="lg" />
          </div>

          {/* Success Card */}
          <Card className="p-8 shadow-unified border-0 bg-white rounded-xl">
            <div className="text-center space-y-6">
              {/* Success Icon */}
              <div className="mx-auto w-16 h-16 rounded-full bg-[#DCF9EA] flex items-center justify-center">
                <Check className="w-8 h-8 text-[#1DBF73]" strokeWidth={2.5} />
              </div>

              {/* Success Message */}
              <div className="space-y-3">
                <h2 className="text-h2 text-[#1A1A1A]">Email envoyé !</h2>
                <p className="text-body-1 text-[#6C6C6C] leading-relaxed">
                  Un email de réinitialisation a été envoyé à{' '}
                  <span className="text-[#1A1A1A] font-medium">{email}</span>
                </p>
                <p className="text-body-2 text-[#6C6C6C]">
                  Veuillez vérifier votre boîte de réception et suivre les instructions pour réinitialiser votre mot de passe.
                </p>
              </div>

              {/* Info Box */}
              <div className="bg-[#F8F8F8] p-4 rounded-xl border border-[#E5E5E5]">
                <p className="text-body-2 text-[#6C6C6C] leading-relaxed">
                  💡 <span className="font-medium text-[#1A1A1A]">Astuce :</span> Si vous ne recevez pas l'email dans quelques minutes, vérifiez votre dossier spam.
                </p>
              </div>

              {/* Back to Login Button */}
              <Button
                onClick={onBack}
                className="w-full h-12 rounded-xl bg-[#1DBF73] hover:bg-[#0F8F55] text-white shadow-unified"
              >
                Retour à la connexion
              </Button>

              {/* Resend Email */}
              <button
                onClick={() => {
                  setSuccess(false);
                  setEmail('');
                }}
                className="text-body-2 text-[#1DBF73] hover:underline font-medium"
              >
                Renvoyer l'email
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex flex-col p-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-3 mb-8 pt-4 max-w-md mx-auto w-full">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-full hover:bg-[#E5E5E5]"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={2} />
        </Button>
        <Logo size="sm" />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-h1 text-[#1A1A1A]">Mot de passe oublié ?</h1>
            <p className="text-body-1 text-[#6C6C6C] leading-relaxed">
              Pas de problème ! Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>
          </div>

          {/* Form Card */}
          <Card className="p-6 shadow-unified border-0 bg-white rounded-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#1A1A1A] text-body-2">
                  Adresse email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C6C6C]" strokeWidth={2} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    className="pl-12 h-12 rounded-xl border-[#E5E5E5] bg-white text-body-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-500 bg-red-50 p-4 rounded-xl border border-red-200">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-[#1DBF73] hover:bg-[#0F8F55] text-white shadow-unified disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Envoi en cours...
                  </div>
                ) : (
                  'Envoyer le lien de réinitialisation'
                )}
              </Button>
            </form>
          </Card>

          {/* Additional Help */}
          <div className="text-center space-y-4">
            <div className="bg-white p-4 rounded-xl border border-[#E5E5E5] shadow-unified">
              <p className="text-body-2 text-[#6C6C6C] leading-relaxed">
                Vous vous souvenez de votre mot de passe ?{' '}
                <button
                  onClick={onBack}
                  className="text-[#1DBF73] hover:underline font-medium"
                >
                  Retourner à la connexion
                </button>
              </p>
            </div>

            {/* Contact Support */}
            <p className="text-body-2 text-[#6C6C6C]">
              Besoin d'aide ?{' '}
              <button className="text-[#1DBF73] hover:underline font-medium">
                Contactez le support
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
