import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRole } from '../../context/RoleContext';

export default function RoleChoiceScreen() {
  const navigation = useNavigation();
  const { setRole } = useRole();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Choisissez votre rôle</Text>
        <Text style={styles.subtitle}>Personnalisez l'expérience selon votre profil.</Text>
        <View style={styles.grid}> 
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              setRole('patient');
              (navigation as any).navigate('Auth');
            }}
          >
            <Ionicons name="person-outline" size={28} color="#1DBF73" />
            <Text style={styles.cardTitle}>Patient</Text>
            <Text style={styles.cardText}>Suivi santé, recettes adaptées.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              setRole('doctor');
              (navigation as any).navigate('Auth');
            }}
          >
            <Ionicons name="medkit-outline" size={28} color="#1DBF73" />
            <Text style={styles.cardTitle}>Médecin</Text>
            <Text style={styles.cardText}>Accès aux patients, conseils.</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => (navigation as any).navigate('Auth')} style={styles.skipLink}>
          <Text style={styles.skipText}>Ignorer pour l'instant</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: '700', color: '#111827', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#6B7280', marginBottom: 20 },
  grid: { flexDirection: 'row', gap: 16 },
  card: { width: 150, backgroundColor: '#fff', padding: 16, borderRadius: 16, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginTop: 8 },
  cardText: { fontSize: 12, color: '#6B7280', textAlign: 'center', marginTop: 4 },
  skipLink: { marginTop: 24 },
  skipText: { color: '#1DBF73', fontWeight: '600' },
});
