import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DoctorHomeScreen from '../screens/doctor/DoctorHomeScreen';
import DoctorPatientsScreen from '../screens/doctor/DoctorPatientsScreen';
import PatientDetailScreen from '../screens/doctor/PatientDetailScreen';
import DoctorChatScreen from '../screens/health/DoctorChatScreen';
import DoctorAlertsScreen from '../screens/doctor/DoctorAlertsScreen';
import DoctorSettingsScreen from '../screens/doctor/DoctorSettingsScreen';

export type DoctorStackParamList = {
  DoctorHome: undefined;
  DoctorPatients: undefined;
  PatientDetail: { id: string };
  DoctorChat: { patientName: string };
   DoctorAlerts: undefined;
   DoctorSettings: undefined;
};

const Stack = createNativeStackNavigator<DoctorStackParamList>();

export default function DoctorStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DoctorHome" component={DoctorHomeScreen} options={{ title: 'Tableau de bord' }} />
      <Stack.Screen name="DoctorPatients" component={DoctorPatientsScreen} options={{ title: 'Mes patients' }} />
      <Stack.Screen name="PatientDetail" component={PatientDetailScreen} options={{ title: 'Détail patient' }} />
      <Stack.Screen name="DoctorChat" component={DoctorChatScreen} options={{ title: 'Chat médecin' }} />
      <Stack.Screen name="DoctorAlerts" component={DoctorAlertsScreen} options={{ title: 'Alertes' }} />
      <Stack.Screen name="DoctorSettings" component={DoctorSettingsScreen} options={{ title: 'Mon profil' }} />
    </Stack.Navigator>
  );
}
