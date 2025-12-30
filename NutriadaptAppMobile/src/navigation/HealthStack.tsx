import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HealthTracking from '../screens/health/HealthTracking';
import PatientGraphs from '../screens/health/PatientGraphs';
import AIChatScreen from '../screens/health/AIChatScreen';
import DoctorChatScreen from '../screens/health/DoctorChatScreen';
import PatientAdviceScreen from '../screens/patient/PatientAdviceScreen';

export type HealthStackParamList = {
  HealthTracking: undefined;
  PatientGraphs: undefined;
  AIChat: undefined;
  DoctorChat: undefined;
  PatientAdvice: undefined;
};

const Stack = createNativeStackNavigator<HealthStackParamList>();

export default function HealthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HealthTracking" component={HealthTracking} options={{ title: 'Santé' }} />
      <Stack.Screen name="PatientGraphs" component={PatientGraphs} options={{ title: 'Graphiques' }} />
      <Stack.Screen name="AIChat" component={AIChatScreen} options={{ title: 'Assistant IA' }} />
      <Stack.Screen name="DoctorChat" component={DoctorChatScreen} options={{ title: 'Chat médecin' }} />
      <Stack.Screen name="PatientAdvice" component={PatientAdviceScreen} options={{ title: 'Conseils IA' }} />
    </Stack.Navigator>
  );
}
