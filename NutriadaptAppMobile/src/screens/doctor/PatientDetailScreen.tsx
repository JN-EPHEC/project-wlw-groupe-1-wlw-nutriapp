import React, { useMemo } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DoctorStackParamList } from '../../navigation/DoctorStack';

type PatientDetailRoute = RouteProp<DoctorStackParamList, 'PatientDetail'>;
type DoctorStackNav = NativeStackNavigationProp<DoctorStackParamList>;

const mockDetails: Record<
  string,
  { name: string; age: number; condition: string; lastGlucose?: number; lastWeight?: number }
> = {
  '1': { name: 'Marie Martin', age: 35, condition: 'Diabète Type 2', lastGlucose: 115, lastWeight: 74.0 },
  '2': { name: 'Jean Dupuis', age: 52, condition: 'Diabète Type 2', lastGlucose: 108, lastWeight: 82.5 },
  '3': { name: 'Sophie Bernard', age: 44, condition: 'Obésité', lastGlucose: 185, lastWeight: 95.3 },
  '4': { name: 'Pierre Leroy', age: 61, condition: 'Hypertension', lastWeight: 78.2 },
} as const;

export default function PatientDetailScreen() {
  const route = useRoute<PatientDetailRoute>();
  const navigation = useNavigation<DoctorStackNav>();
  const data = useMemo(() => mockDetails[route.params.id], [route.params.id]);

  if (!data) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}> 
          <Text>Patient introuvable</Text>
        </View>
      </SafeAreaView>
    );
  }

  const initials = data.name
    .split(' ')
    .map((n: string) => n[0])
    .join('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}> 
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={20} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Dossier patient</Text>
        </View>

        <View style={styles.patientRow}> 
          <View style={styles.avatar}> 
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.meta}>{data.age} ans • {data.condition}</Text>
          </View>
        </View>

        <View style={styles.statsRow}> 
          <View style={styles.statCard}> 
            <Text style={styles.statLabel}>Dernière glycémie</Text>
            <Text style={styles.statValue}>{data.lastGlucose ?? 'N/A'}</Text>
            <Text style={styles.statUnit}>mg/dL</Text>
          </View>
          <View style={styles.statCard}> 
            <Text style={styles.statLabel}>Poids actuel</Text>
            <Text style={styles.statValue}>{data.lastWeight ?? 'N/A'}</Text>
            <Text style={styles.statUnit}>kg</Text>
          </View>
        </View>

        <View style={styles.section}> 
          <Text style={styles.sectionTitle}>Résumé IA</Text>
          <Text style={styles.sectionText}>
            La glycémie semble {data.lastGlucose && data.lastGlucose > 130 ? 'élevée' : 'globalement stable'}. Le poids
            montre une évolution progressive. Poursuivre la surveillance régulière et adapter les conseils
            nutritionnels si nécessaire.
          </Text>
        </View>

        <View style={styles.section}> 
          <Text style={styles.sectionTitle}>Actions</Text>
          <TouchableOpacity
            style={styles.actionBtn}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate('DoctorChat', {
                patientName: data.name,
              })
            }
          >
            <Ionicons name="chatbubbles-outline" size={18} color="#22C55E" />
            <Text style={styles.actionText}>Ouvrir le chat médecin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
            <Ionicons name="calendar-outline" size={18} color="#3B82F6" />
            <Text style={styles.actionText}>Planifier un rendez-vous</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  content: { padding: 16, paddingBottom: 32 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 8 },
  iconBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  patientRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#4F46E5', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarText: { color: '#FFFFFF', fontWeight: '700', fontSize: 18 },
  name: { fontSize: 18, fontWeight: '700', color: '#111827' },
  meta: { fontSize: 13, color: '#6B7280' },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  statCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12 },
  statLabel: { fontSize: 12, color: '#6B7280' },
  statValue: { fontSize: 20, fontWeight: '700', color: '#111827', marginTop: 4 },
  statUnit: { fontSize: 12, color: '#9CA3AF' },
  section: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12, marginBottom: 16 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 6 },
  sectionText: { fontSize: 13, color: '#4B5563', lineHeight: 18 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, gap: 8 },
  actionText: { fontSize: 14, color: '#111827' },
});
