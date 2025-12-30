import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

export default function PatientSettings() {
  const { signOut } = useAuth();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.row}> 
          <View style={styles.rowLeft}>
            <Ionicons name="notifications-outline" size={18} color="#6C6C6C" />
            <Text style={styles.rowText}>Push</Text>
          </View>
          <Switch value={pushEnabled} onValueChange={setPushEnabled} />
        </View>
        <View style={styles.row}> 
          <View style={styles.rowLeft}>
            <Ionicons name="mail-outline" size={18} color="#6C6C6C" />
            <Text style={styles.rowText}>E-mail</Text>
          </View>
          <Switch value={emailEnabled} onValueChange={setEmailEnabled} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Confidentialité</Text>
        <View style={styles.row}> 
          <View style={styles.rowLeft}>
            <Ionicons name="stats-chart-outline" size={18} color="#6C6C6C" />
            <Text style={styles.rowText}>Partage analytics</Text>
          </View>
          <Switch value={analyticsEnabled} onValueChange={setAnalyticsEnabled} />
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.dangerBtn} onPress={signOut}>
          <Ionicons name="log-out-outline" size={18} color="#fff" />
          <Text style={styles.dangerText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 16 },
  section: { backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 1 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#6C6C6C', marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  rowText: { marginLeft: 10, fontSize: 15, color: '#1A1A1A', fontWeight: '600' },
  dangerBtn: { height: 48, backgroundColor: '#EF4444', borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  dangerText: { color: '#fff', fontWeight: '700', marginLeft: 8 },
});
