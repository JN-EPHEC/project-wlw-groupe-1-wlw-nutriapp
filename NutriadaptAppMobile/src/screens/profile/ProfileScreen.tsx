import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ProfileStackParamList } from '../../navigation/ProfileStack';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}> 
          <View style={styles.avatar}>
            <Image source={{ uri: 'https://i.pravatar.cc/100?u=nutri' }} style={{ width: 56, height: 56, borderRadius: 28 }} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Mon profil</Text>
            <Text style={styles.subtitle}>Utilisateur NutriAdapt</Text>
          </View>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('EditProfile')}>
            <Ionicons name="create-outline" size={18} color="#1DBF73" />
          </TouchableOpacity>
        </View>

        {/* Sections */}
        <View style={styles.card}>
          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Favorites')}> 
            <Ionicons name="heart-outline" size={18} color="#6C6C6C" />
            <Text style={styles.rowText}>Mes favoris</Text>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.row}
            onPress={() => (navigation as any).navigate('Home', { screen: 'Notifications' })}
          >
            <Ionicons name="notifications-outline" size={18} color="#6C6C6C" />
            <Text style={styles.rowText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('PatientSettings')}>
            <Ionicons name="settings-outline" size={18} color="#6C6C6C" />
            <Text style={styles.rowText}>Paramètres</Text>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { flex: 1, padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#E5E7EB', overflow: 'hidden' },
  title: { fontSize: 20, fontWeight: '700', color: '#1A1A1A' },
  subtitle: { fontSize: 13, color: '#6C6C6C' },
  iconBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#DCF9EA', alignItems: 'center', justifyContent: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 1 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14 },
  rowText: { flex: 1, marginLeft: 12, color: '#1A1A1A', fontWeight: '600' },
  separator: { height: 1, backgroundColor: '#F1F5F9' },
});
