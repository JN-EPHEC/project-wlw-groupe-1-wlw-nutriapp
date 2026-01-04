import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AlertItem {
  id: string;
  patient: string;
  type: 'glucose' | 'weight' | 'pressure' | 'missed';
  message: string;
  value?: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
}

const mockAlerts: AlertItem[] = [
  {
    id: '1',
    patient: 'Sophie Bernard',
    type: 'glucose',
    message: 'Glycémie élevée détectée',
    value: '185 mg/dL',
    time: 'Il y a 2h',
    priority: 'high',
  },
  {
    id: '2',
    patient: 'Camille Dubois',
    type: 'glucose',
    message: 'Glycémie au-dessus de la cible',
    value: '142 mg/dL',
    time: 'Il y a 5h',
    priority: 'medium',
  },
  {
    id: '3',
    patient: 'Thomas Roux',
    type: 'weight',
    message: 'Prise de poids significative',
    value: '+1.5 kg en 3 jours',
    time: 'Il y a 8h',
    priority: 'medium',
  },
  {
    id: '4',
    patient: 'Lucas Martin',
    type: 'missed',
    message: 'Aucune mesure depuis 3 jours',
    time: 'Hier',
    priority: 'low',
  },
  {
    id: '5',
    patient: 'Julie Lefevre',
    type: 'pressure',
    message: 'Tension artérielle élevée',
    value: '145/92 mmHg',
    time: 'Il y a 1 jour',
    priority: 'high',
  },
];

const alertConfig: Record<AlertItem['type'], { icon: keyof typeof Ionicons.glyphMap; color: string; bgColor: string }> = {
  glucose: { icon: 'alert-circle-outline', color: '#EF4444', bgColor: '#FEE2E2' },
  weight: { icon: 'trending-up-outline', color: '#F59E0B', bgColor: '#FEF3C7' },
  pressure: { icon: 'heart-outline', color: '#DC2626', bgColor: '#FEE2E2' },
  missed: { icon: 'time-outline', color: '#6B7280', bgColor: '#F3F4F6' },
};

const priorityConfig: Record<AlertItem['priority'], { label: string; color: string }> = {
  high: { label: 'Urgent', color: '#EF4444' },
  medium: { label: 'Important', color: '#F59E0B' },
  low: { label: 'Info', color: '#6B7280' },
};

export default function DoctorAlertsScreen() {
  const urgentCount = mockAlerts.filter((a) => a.priority === 'high').length;
  const importantCount = mockAlerts.filter((a) => a.priority === 'medium').length;
  const infoCount = mockAlerts.filter((a) => a.priority === 'low').length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}> 
          <Text style={styles.headerTitle}>Alertes</Text>
          <Text style={styles.headerSubtitle}>
            {mockAlerts.length} alerte{mockAlerts.length > 1 ? 's' : ''} active{mockAlerts.length > 1 ? 's' : ''}
          </Text>
        </View>

        <View style={styles.summaryRow}> 
          <View style={[styles.summaryCard, { borderColor: '#FECACA', backgroundColor: '#FEF2F2' }]}> 
            <Text style={[styles.summaryNumber, { color: '#DC2626' }]}>{urgentCount}</Text>
            <Text style={styles.summaryLabel}>Urgentes</Text>
          </View>
          <View style={[styles.summaryCard, { borderColor: '#FED7AA', backgroundColor: '#FFFBEB' }]}> 
            <Text style={[styles.summaryNumber, { color: '#F97316' }]}>{importantCount}</Text>
            <Text style={styles.summaryLabel}>Importantes</Text>
          </View>
          <View style={[styles.summaryCard, { borderColor: '#E5E7EB', backgroundColor: '#F9FAFB' }]}> 
            <Text style={[styles.summaryNumber, { color: '#4B5563' }]}>{infoCount}</Text>
            <Text style={styles.summaryLabel}>Info</Text>
          </View>
        </View>

        <View style={styles.listContainer}> 
          {mockAlerts.map((alert) => {
            const config = alertConfig[alert.type];
            const priority = priorityConfig[alert.priority];
            return (
              <View key={alert.id} style={styles.alertCard}> 
                <View style={styles.alertTopRow}> 
                  <View style={[styles.alertIconCircle, { backgroundColor: config.bgColor }]}> 
                    <Ionicons name={config.icon} size={18} color={config.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.alertHeaderRow}> 
                      <Text style={styles.patientName}>{alert.patient}</Text>
                      <View style={[styles.priorityBadge, { borderColor: priority.color }]}> 
                        <Text style={[styles.priorityText, { color: priority.color }]}>{priority.label}</Text>
                      </View>
                    </View>
                    <Text style={styles.alertMessage}>{alert.message}</Text>
                    {alert.value ? (
                      <Text style={[styles.alertValue, { color: config.color }]}>{alert.value}</Text>
                    ) : null}
                    <Text style={styles.alertTime}>{alert.time}</Text>
                  </View>
                </View>

                <View style={styles.actionsRow}> 
                  <TouchableOpacity style={[styles.actionBtn, styles.primaryBtn]} activeOpacity={0.7}>
                    <Ionicons name="chatbubbles-outline" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                    <Text style={styles.primaryBtnText}>Contacter</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
                    <Ionicons name="archive-outline" size={16} color="#374151" style={{ marginRight: 6 }} />
                    <Text style={styles.secondaryBtnText}>Archiver</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.infoCard}> 
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
            <Ionicons name="information-circle-outline" size={18} color="#4F8BC9" style={{ marginTop: 2 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.infoTitle}>Gestion des alertes</Text>
              <Text style={styles.infoText}>
                Les alertes sont générées automatiquement lorsqu'un patient dépasse les valeurs cibles ou manque des mesures importantes.
                Contactez vos patients pour assurer un suivi optimal.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: 16, paddingBottom: 24 },
  header: { paddingTop: 8, marginBottom: 12 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#222222', marginBottom: 4 },
  headerSubtitle: { fontSize: 13, color: '#4B5563' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  summaryCard: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  summaryNumber: { fontSize: 20, fontWeight: '700', marginBottom: 2 },
  summaryLabel: { fontSize: 11, color: '#4B5563' },
  listContainer: { gap: 10 },
  alertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  alertTopRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  alertIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  alertHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  patientName: { fontSize: 15, fontWeight: '600', color: '#222222', flexShrink: 1, marginRight: 8 },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    borderWidth: 1,
  },
  priorityText: { fontSize: 11, fontWeight: '600' },
  alertMessage: { fontSize: 13, color: '#111827', marginBottom: 2 },
  alertValue: { fontSize: 13, marginBottom: 2 },
  alertTime: { fontSize: 11, color: '#9CA3AF' },
  actionsRow: { flexDirection: 'row', marginTop: 4, gap: 8 },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  primaryBtn: {
    backgroundColor: '#4F8BC9',
    borderColor: '#4F8BC9',
  },
  primaryBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '600' },
  secondaryBtnText: { color: '#374151', fontSize: 13, fontWeight: '500' },
  infoCard: {
    marginTop: 8,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  infoTitle: { fontSize: 14, fontWeight: '600', color: '#111827', marginBottom: 4 },
  infoText: { fontSize: 13, color: '#4B5563', lineHeight: 18 },
});
