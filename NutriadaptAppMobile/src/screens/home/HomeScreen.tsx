import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/types';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.h1}>Bonjour ! 👋</Text>
            <Text style={styles.subtitle}>Votre tableau de bord santé</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn} onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications-outline" size={18} color="#1DBF73" />
          </TouchableOpacity>
        </View>

        {/* KPIs */}
        <View style={styles.kpiRow}>
          <View style={styles.card}>
            <View style={styles.kpiIconBoxPrimary}>
              <Ionicons name="flame-outline" size={16} color="#1DBF73" />
            </View>
            <Text style={[styles.kpiValue, { color: '#1DBF73' }]}>1820</Text>
            <Text style={styles.kpiLabel}>Calories</Text>
          </View>
          <View style={styles.card}>
            <View style={[styles.kpiIconBox, { backgroundColor: '#DBEAFE' }]}>
              <Ionicons name="water-outline" size={16} color="#3B82F6" />
            </View>
            <Text style={[styles.kpiValue, { color: '#3B82F6' }]}>1.8L</Text>
            <Text style={styles.kpiLabel}>Eau</Text>
          </View>
          <View style={styles.card}>
            <View style={[styles.kpiIconBox, { backgroundColor: '#FFE8CC' }]}>
              <Feather name="activity" size={16} color="#F59E0B" />
            </View>
            <Text style={[styles.kpiValue, { color: '#F59E0B' }]}>45m</Text>
            <Text style={styles.kpiLabel}>Activité</Text>
          </View>
        </View>

        {/* Recette du jour (mock) */}
        <View style={styles.section}>
          <Text style={styles.h2}>✨ Recette du jour</Text>
          <View style={[styles.card, { padding: 0, overflow: 'hidden' }]}> 
            <View style={{ height: 200, backgroundColor: '#EEE' }}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1640798629665-cb874ae363d2?auto=format&fit=crop&w=1080&q=80' }}
                style={{ width: '100%', height: '100%' }}
              />
            </View>
            <View style={{ padding: 16 }}>
              <Text style={styles.title}>Salade de quinoa aux légumes grillés</Text>
              <View style={styles.rowGap}>
                <View style={styles.chip}>
                  <Ionicons name="time-outline" size={14} color="#6C6C6C" />
                  <Text style={styles.chipText}>25 min</Text>
                </View>
                <View style={styles.chip}>
                  <Ionicons name="flame-outline" size={14} color="#6C6C6C" />
                  <Text style={styles.chipText}>380 kcal</Text>
                </View>
              </View>
              <TouchableOpacity style={[styles.cta, { marginTop: 12 }]} onPress={() => navigation.navigate('Notifications')}>
                <Text style={styles.ctaText}>Voir la recette</Text>
                <Ionicons name="chevron-forward" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  scrollContent: { padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  h1: { fontSize: 24, fontWeight: '700', color: '#1A1A1A' },
  h2: { fontSize: 18, fontWeight: '700', color: '#1A1A1A', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#6C6C6C' },
  profileBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#DCF9EA', alignItems: 'center', justifyContent: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 1 },
  kpiRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  kpiIconBoxPrimary: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#DCF9EA', alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  kpiIconBox: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  kpiValue: { fontSize: 20, fontWeight: '700' },
  kpiLabel: { fontSize: 12, color: '#6C6C6C' },
  section: { marginTop: 8 },
  title: { fontSize: 16, fontWeight: '700', color: '#1A1A1A' },
  rowGap: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#F8F8F8', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  chipText: { fontSize: 12, color: '#6C6C6C' },
  cta: { marginTop: 8, flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#1DBF73', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, alignSelf: 'flex-start' },
  ctaText: { color: '#fff', fontWeight: '600' },
});
