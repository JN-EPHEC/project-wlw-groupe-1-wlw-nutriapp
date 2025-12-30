import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';

import { AuthProvider, useAuth } from './contexts/AuthContext';

import { AppNavigator } from './app/_navigation/AppNavigator';
import ForgotPasswordScreen from './screens/auth/ForgotPasswordScreen';
import { SplashScreen } from './screens/auth/SplashScreen';
import { WelcomeScreen } from './screens/auth/WelcomeScreen';
import { RecipeDetailScreen } from './screens/main/RecipeDetailScreen';
import OnboardingFlow from './screens/onboarding/OnboardingFlow';
const Stack = createNativeStackNavigator();

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const { user, userProfile, loading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (loading) {
    return null;
  }

  const hasCompletedOnboarding = Boolean(
    userProfile &&
      (userProfile.hasCompletedOnboarding || userProfile.profile?.hasCompletedOnboarding)
  );

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {!user ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </Stack.Navigator>
      ) : !hasCompletedOnboarding ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboarding" component={OnboardingFlow} />
          <Stack.Screen name="Main" component={AppNavigator} />
          <Stack.Screen
            name="RecipeDetail"
            component={RecipeDetailScreen}
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={AppNavigator} />
          <Stack.Screen
            name="RecipeDetail"
            component={RecipeDetailScreen}
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
