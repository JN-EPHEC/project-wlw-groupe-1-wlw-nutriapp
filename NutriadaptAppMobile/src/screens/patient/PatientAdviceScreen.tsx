import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Advice {
  id: string;
  date: string;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
}

const mockAdvices: Advice[] = [
  {
    id: '1',
    date: "Aujourd'hui",
    title: 'Glycémie stable',
    message:
      "Excellente nouvelle ! Votre glycémie est stable cette semaine. Pour maintenir cet équilibre, privilégiez les aliments riches en fibres.",
    priority: 'low',
  },
  {
    id: '2',
    date: 'Hier',
    title: 'Activité physique',
    message:
      "Vous êtes proche de votre objectif de 10 000 pas quotidiens ! Une marche de 15 minutes après le dîner vous aidera.",
    priority: 'medium',
  },
  {
    id: '3',
    date: 'Il y a 2 jours',
    title: 'Hydratation',
    message:
      "Assurez-vous de boire au moins 2 litres d'eau par jour. L'hydratation aide à réguler la glycémie.",
    priority: 'high',
  },
];

const priorityConfig: Record<Advice['priority'], { color: string; bg: string; label: string }> = {
  low: { color: '#4CAF50', bg: '#E8F5E9', label: 'Info' },
  medium: { color: '#F59E0B', bg: '#FEF3C7', label: 'Important' },
  high: { color: '#EF4444', bg: '#FEE2E2', label: 'Urgent' },
};

export default function PatientAdviceScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Conseils IA</Text>
          <Text style={styles.headerSubtitle}>Recommandations personnalisées</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
          <Ionicons name="notifications-outline" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.mainCard}>
          <View style={styles.mainCardHeader}>
            <View style={styles.mainIconCircle}>
              <Ionicons name="sparkles-outline" size={24} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.mainLabel}>Conseil du jour</Text>
              <Text style={styles.mainTitle}>Félicitations !</Text>
            </View>
          </View>
          <Text style={styles.mainText}>
            Votre glycémie est stable et votre poids diminue progressivement. Continuez vos efforts ! Aujourd'hui, concentrez-vous sur l'hydratation.
          </Text>
        </View>

        <View style={styles.listContainer}>
          {mockAdvices.map((advice) => {
            const priority = priorityConfig[advice.priority];
            return (
              <View key={advice.id} style={styles.adviceCard}>
                <View style={[styles.adviceIconCircle, { backgroundColor: priority.bg }]}>
                  <Ionicons name="sparkles-outline" size={20} color={priority.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.adviceHeaderRow}>
                    <Text style={styles.adviceTitle}>{advice.title}</Text>
                    <View style={[styles.badge, { backgroundColor: priority.bg }]}> 
                      <Text style={[styles.badgeText, { color: priority.color }]}>{priority.label}</Text>
                    </View>
                  </View>
                  <Text style={styles.adviceDate}>{advice.date}</Text>
                  <Text style={styles.adviceText}>{advice.message}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#222222', marginBottom: 2 },
  headerSubtitle: { fontSize: 13, color: '#6B7280' },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { padding: 16, paddingBottom: 24 },
  mainCard: {
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  mainCardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  mainIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainLabel: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 2 },
  mainTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  mainText: { fontSize: 14, color: 'rgba(255,255,255,0.95)', lineHeight: 20 },
  listContainer: { gap: 12 },
  adviceCard: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  adviceIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  adviceHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  adviceTitle: { fontSize: 15, fontWeight: '600', color: '#222222', flexShrink: 1, marginRight: 8 },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  badgeText: { fontSize: 11, fontWeight: '600' },
  adviceDate: { fontSize: 11, color: '#9CA3AF', marginBottom: 4 },
  adviceText: { fontSize: 13, color: '#6B7280', lineHeight: 18 },
});
