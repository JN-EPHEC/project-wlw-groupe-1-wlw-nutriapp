import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HealthStackParamList } from '../../navigation/HealthStack';

type Nav = NativeStackNavigationProp<HealthStackParamList>;

export default function HealthTracking() {
  const navigation = useNavigation<Nav>();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Santé</Text>
        <Text style={styles.body}>Suivez vos indicateurs et échangez avec l\'IA ou votre médecin.</Text>
        <TouchableOpacity style={styles.cta} onPress={() => navigation.navigate('PatientGraphs')}>
          <Text style={styles.ctaText}>Voir graphiques</Text>
        </TouchableOpacity>
        <View style={styles.row}> 
          <TouchableOpacity style={[styles.cta, styles.secondary]} onPress={() => navigation.navigate('AIChat')}>
            <Text style={styles.ctaSecondaryText}>Ouvrir chat IA</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cta, styles.secondary]} onPress={() => navigation.navigate('DoctorChat')}>
            <Text style={styles.ctaSecondaryText}>Chat médecin</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.cta, styles.adviceBtn]}
          onPress={() => navigation.navigate('PatientAdvice')}
        >
          <Text style={styles.adviceText}>Voir mes conseils IA</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: '700', color: '#1A1A1A', marginBottom: 8 },
  body: { fontSize: 16, color: '#6C6C6C' },
  cta: { marginTop: 16, backgroundColor: '#1DBF73', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, alignSelf: 'flex-start' },
  ctaText: { color: '#fff', fontWeight: '600' },
  row: { flexDirection: 'row', gap: 12, marginTop: 16 },
  secondary: { backgroundColor: '#E5E7EB' },
  ctaSecondaryText: { color: '#111827', fontWeight: '600' },
  adviceBtn: { backgroundColor: '#4CAF50', alignSelf: 'stretch' },
  adviceText: { color: '#FFFFFF', fontWeight: '600', textAlign: 'center' },
});
