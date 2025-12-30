import { useCallback, useMemo, useState } from 'react';

import { Redirect } from 'expo-router';

import useAuth from '@/hooks/useAuth';
import SplashScreen from '@/screens/auth/SplashScreen';
import WelcomeScreen from '@/screens/auth/WelcomeScreen';

export default function Index() {
  const { isLoggedIn, loading, userProfile } = useAuth();
  const [splashFinished, setSplashFinished] = useState(false);

  const handleSplashFinish = useCallback(() => {
    setSplashFinished(true);
  }, []);

  const shouldShowSplash = useMemo(() => !splashFinished || loading, [loading, splashFinished]);

  if (shouldShowSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  const typedProfile = userProfile as { profile?: Record<string, unknown>; hasCompletedOnboarding?: unknown } | null;
  const profileRecord = typedProfile?.profile;
  const hasCompletedOnboarding = Boolean(
    profileRecord?.['hasCompletedOnboarding'] ?? typedProfile?.['hasCompletedOnboarding']
  );

  if (isLoggedIn && !hasCompletedOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return <WelcomeScreen />;
}

