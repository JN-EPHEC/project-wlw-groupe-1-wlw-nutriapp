import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { RootTabParamList } from './types';
import HomeStack from './HomeStack';
import RecipesStack from './RecipesStack';
import HealthStack from './HealthStack';
import ProfileStack from './ProfileStack';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#1DBF73',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: { backgroundColor: '#fff' },
        tabBarIcon: ({ color, size }) => {
          const map: Record<keyof RootTabParamList, string> = {
            Home: 'home-outline',
            Recipes: 'restaurant-outline',
            Health: 'fitness-outline',
            Profile: 'person-outline',
          } as const;
          const name = map[route.name as keyof RootTabParamList];
          return <Ionicons name={name as any} size={size} color={color} />;
        },
      })}
    >
  <Tab.Screen name="Home" component={HomeStack} options={{ title: 'Accueil', headerShown: false }} />
  <Tab.Screen name="Recipes" component={RecipesStack} options={{ title: 'Recettes', headerShown: false }} />
  <Tab.Screen name="Health" component={HealthStack} options={{ title: 'Santé', headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileStack} options={{ title: 'Profil', headerShown: false }} />
    </Tab.Navigator>
  );
}
