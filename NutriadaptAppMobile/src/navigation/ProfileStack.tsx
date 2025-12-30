import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/profile/ProfileScreen';
import PatientSettings from '../screens/profile/PatientSettings';
import EditProfileModal from '../screens/profile/EditProfileModal';

export type ProfileStackParamList = {
  Profile: undefined;
  PatientSettings: undefined;
  EditProfile: undefined;
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
      <Stack.Screen name="PatientSettings" component={PatientSettings} options={{ title: 'Paramètres' }} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileModal}
        options={{ title: 'Éditer le profil', presentation: 'modal' }}
      />
      <Stack.Screen name="Favorites" component={require('../screens/profile/FavoritesScreen').default} options={{ title: 'Mes favoris' }} />
    </Stack.Navigator>
  );
}
