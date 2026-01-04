import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import type { RootStackParamList } from './types';
import AuthStack from './AuthStack';
import { useAuth } from '../context/AuthContext';
import DoctorStack from './DoctorStack';
import { useRole } from '../context/RoleContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { isAuthenticated } = useAuth();
  const { role } = useRole();

  if (!isAuthenticated) {
    return <AuthStack />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {role === 'patient' ? (
        <Stack.Screen name="MainTabs" component={MainTabs} />
      ) : (
        <Stack.Screen name="DoctorStack" component={DoctorStack} />
      )}
    </Stack.Navigator>
  );
}
