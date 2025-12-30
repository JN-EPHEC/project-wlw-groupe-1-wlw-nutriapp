import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DoctorStackParamList } from '../../navigation/DoctorStack';

type Nav = NativeStackNavigationProp<DoctorStackParamList>;

export default function DoctorHomeScreen() {
  const navigation = useNavigation<Nav>();
  const doctorName = 'Martin';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Bienvenue Dr. {doctorName}</Text>
        <Text style={styles.subtitle}>Suivi de vos patients NutriAdapt.</Text>

        <View style={styles.cardsRow}> 
          <View style={[styles.card, { borderLeftColor: '#22C55E' }]}> 
            <View style={styles.cardIconWrap}>
              <Ionicons name="people-outline" size={22} color="#22C55E" />
            </View>
            <Text style={styles.cardNumber}>42</Text>
            <Text style={styles.cardLabel}>Patients suivis</Text>
          </View>
          <View style={[styles.card, { borderLeftColor: '#F97316' }]}> 
            <View style={styles.cardIconWrap}>
              <Ionicons name="warning-outline" size={22} color="#F97316" />
            </View>
            <Text style={styles.cardNumber}>3</Text>
            <Text style={styles.cardLabel}>Alertes actives</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('DoctorPatients')}>
          <Ionicons name="people" size={18} color="#FFFFFF" />
          <Text style={styles.primaryText}>Voir mes patients</Text>
        </TouchableOpacity>

        <View style={styles.quickRow}>
          <TouchableOpacity
            style={[styles.secondaryBtn, { flex: 1 }]}
            onPress={() => navigation.navigate('DoctorAlerts')}
          >
            <Ionicons name="warning-outline" size={18} color="#F97316" />
            <Text style={styles.secondaryText}>Voir les alertes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.secondaryBtn, { flex: 1 }]}
            onPress={() => navigation.navigate('DoctorSettings')}
          >
            <Ionicons name="person-circle-outline" size={18} color="#111827" />
            <Text style={styles.secondaryText}>Mon profil</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}> 
          <Text style={styles.sectionTitle}>Activité récente</Text>
          <View style={styles.activityItem}> 
            <Ionicons name="fitness-outline" size={18} color="#22C55E" />
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.activityTitle}>Glycémie stable pour Marie Martin</Text>
              <Text style={styles.activitySubtitle}>Il y a 15 min · 115 mg/dL</Text>
            </View>
          </View>
          <View style={styles.activityItem}> 
            <Ionicons name="trending-down-outline" size={18} color="#22C55E" />
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.activityTitle}>Poids en baisse pour Jean Dupuis</Text>
              <Text style={styles.activitySubtitle}>Il y a 1h · -0.8 kg</Text>
            </View>
          </View>
          <View style={styles.activityItem}> 
            <Ionicons name="alert-circle-outline" size={18} color="#EF4444" />
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.activityTitle}>Alerte glycémie pour Sophie Bernard</Text>
              <Text style={styles.activitySubtitle}>Il y a 2h · 185 mg/dL</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  content: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '700', color: '#111827', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#6B7280', marginBottom: 16 },
  cardsRow: { flexDirection: 'row', gap: 12 },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderLeftWidth: 3,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cardIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  cardNumber: { fontSize: 20, fontWeight: '700', color: '#111827' },
  cardLabel: { fontSize: 12, color: '#6B7280' },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#22C55E',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  primaryText: { color: '#FFFFFF', fontWeight: '600' },
  quickRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E7EB',
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
  },
  secondaryText: { color: '#111827', fontWeight: '600', fontSize: 13 },
  section: { marginTop: 24, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 8 },
  activityItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6 },
  activityTitle: { fontSize: 13, color: '#111827' },
  activitySubtitle: { fontSize: 12, color: '#6B7280' },
});
