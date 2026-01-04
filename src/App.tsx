import { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import WelcomeScreen from './components/WelcomeScreen';
import AuthScreen from './components/AuthScreen';
import OnboardingFlow from './components/OnboardingFlow';
import PatientApp from './components/PatientApp';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface UserProfile {
  // Étape 1: Informations de base
  age?: number;
  gender?: 'male' | 'female' | 'other';
  height?: number;
  weight?: number;
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  
  // Étape 2: Pathologies et allergies
  conditions?: string[];
  allergies?: string[];
  
  // Étape 3: Objectifs
  goals?: string[];
  
  // Étape 4: Consentements
  dataSharing?: boolean;
  healthNotifications?: boolean;
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Simulate splash screen
  if (showSplash) {
    setTimeout(() => setShowSplash(false), 2500);
    return <SplashScreen />;
  }

  // Welcome screen (login/signup)
  if (!currentUser) {
    return (
      <WelcomeScreen
        onLogin={(user, isNewUser) => {
          setCurrentUser(user);
          if (isNewUser) {
            // Nouvel utilisateur (inscription) : passer par l'onboarding
            setShowOnboarding(true);
          } else {
            // Utilisateur existant (connexion) : profil déjà existant
            setUserProfile({
              age: 28,
              gender: 'male',
              height: 175,
              weight: 72,
              activityLevel: 'moderate',
              conditions: ['diabetes'],
              allergies: ['none'],
              goals: ['stabilize-glucose', 'maintain-weight'],
              dataSharing: false,
              healthNotifications: true,
            });
          }
        }}
      />
    );
  }

  // Onboarding flow for new users
  if (showOnboarding && !userProfile) {
    return (
      <OnboardingFlow
        onComplete={(profile) => {
          setUserProfile(profile);
          setShowOnboarding(false);
        }}
      />
    );
  }

  // Main patient app
  if (currentUser && userProfile) {
    return (
      <PatientApp
        user={currentUser}
        profile={userProfile}
        onLogout={() => {
          setCurrentUser(null);
          setUserProfile(null);
        }}
        onUpdateProfile={(profile) => setUserProfile(profile)}
      />
    );
  }

  return null;
}