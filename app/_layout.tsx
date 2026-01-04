import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, usePathname, useRouter, type Href } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useEffect, useMemo, useRef } from 'react';

import { AuthProvider } from '@/contexts/AuthContext';
import useAuth from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/use-color-scheme';

function getHasCompletedOnboarding(userProfile: unknown): boolean {
  const typedProfile = userProfile as { profile?: Record<string, unknown>; hasCompletedOnboarding?: unknown } | null;
  const profileRecord = typedProfile?.profile;
  return Boolean(profileRecord?.['hasCompletedOnboarding'] ?? typedProfile?.['hasCompletedOnboarding']);
}

function AuthNavigationGate() {
  const { isLoggedIn, loading, userProfile } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const lastReplaceRef = useRef<string | null>(null);

  const hasCompletedOnboarding = useMemo(
    () => getHasCompletedOnboarding(userProfile),
    [userProfile]
  );

  useEffect(() => {
    if (loading) {
      return;
    }

    // Allow auth modals when logged out.
    const allowedWhenLoggedOut =
      pathname === '/login' ||
      pathname === '/signup' ||
      pathname === '/forgot-password' ||
      pathname === '/oauth';

    let target: Href | null = null;

    if (!isLoggedIn) {
      if (!allowedWhenLoggedOut) {
        target = '/login';
      }
    } else if (!hasCompletedOnboarding) {
      if (pathname !== '/onboarding') {
        target = '/onboarding';
      }
    } else {
      // If logged in and onboarded, keep user inside tabs group.
      if (pathname === '/' || pathname === '/onboarding' || pathname === '/login' || pathname === '/signup') {
        target = '/(tabs)';
      }
    }

    if (!target) {
      lastReplaceRef.current = null;
      return;
    }

    if (lastReplaceRef.current === String(target)) {
      return;
    }

    lastReplaceRef.current = String(target);
    router.replace(target);
  }, [hasCompletedOnboarding, isLoggedIn, loading, pathname, router]);

  return null;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthNavigationGate />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false, presentation: 'modal' }} />
          <Stack.Screen name="oauth" options={{ headerShown: false }} />
          <Stack.Screen name="forgot-password" options={{ headerShown: false, presentation: 'modal' }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
