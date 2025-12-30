import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const mockDoctor = {
  name: 'Dr. Martin Dupont',
  email: 'martin.dupont@example.com',
};

export default function DoctorSettingsScreen() {
  const initials = mockDoctor.name
    .replace('Dr. ', '')
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}> 
          <Text style={styles.headerTitle}>Mon profil</Text>
          <Text style={styles.headerSubtitle}>Gérez vos informations professionnelles</Text>
        </View>

        <View style={styles.card}> 
          <View style={styles.profileRow}> 
            <View style={styles.avatar}> 
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{mockDoctor.name}</Text>
              <Text style={styles.email}>{mockDoctor.email}</Text>
              <Text style={styles.role}>Médecin généraliste</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.outlineButton} activeOpacity={0.7}>
            <Text style={styles.outlineButtonText}>Modifier le profil</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}> 
          <Text style={styles.sectionTitle}>Informations professionnelles</Text>
          <View style={styles.settingRow}> 
            <View style={styles.settingIconCircle}> 
              <Ionicons name="briefcase-outline" size={18} color="#16A34A" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Spécialité</Text>
              <Text style={styles.settingValue}>Médecine générale, Diabétologie</Text>
            </View>
          </View>
          <View style={styles.settingRow}> 
            <View style={styles.settingIconCircle}> 
              <Ionicons name="call-outline" size={18} color="#16A34A" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Téléphone</Text>
              <Text style={styles.settingValue}>+33 1 23 45 67 89</Text>
            </View>
          </View>
          <View style={styles.settingRow}> 
            <View style={styles.settingIconCircle}> 
              <Ionicons name="mail-outline" size={18} color="#16A34A" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Email professionnel</Text>
              <Text style={styles.settingValue}>{mockDoctor.email}</Text>
            </View>
          </View>
          <View style={styles.settingRow}> 
            <View style={styles.settingIconCircle}> 
              <Ionicons name="person-outline" size={18} color="#16A34A" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Numéro RPPS</Text>
              <Text style={styles.settingValue}>10001234567</Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.outlineButton, { marginTop: 8 }]} activeOpacity={0.7}>
            <Text style={styles.outlineButtonText}>Modifier mes informations</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}> 
          <Text style={styles.sectionTitle}>Mes statistiques</Text>
          <View style={styles.statsRow}> 
            <View style={styles.statBox}> 
              <Text style={[styles.statNumber, { color: '#22C55E' }]}>42</Text>
              <Text style={styles.statLabel}>Patients suivis</Text>
            </View>
            <View style={styles.statBox}> 
              <Text style={[styles.statNumber, { color: '#4F46E5' }]}>156</Text>
              <Text style={styles.statLabel}>Consultations ce mois</Text>
            </View>
          </View>
          <View style={styles.statsRow}> 
            <View style={styles.statBox}> 
              <Text style={[styles.statNumber, { color: '#F97316' }]}>3</Text>
              <Text style={styles.statLabel}>Alertes actives</Text>
            </View>
            <View style={styles.statBox}> 
              <Text style={[styles.statNumber, { color: '#16A34A' }]}>85%</Text>
              <Text style={styles.statLabel}>Taux de suivi</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}> 
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.toggleRow}> 
            <View>
              <Text style={styles.settingLabel}>Alertes critiques</Text>
              <Text style={styles.toggleDescription}>Valeurs hors normes</Text>
            </View>
            <Switch value={true} />
          </View>
          <View style={styles.toggleRow}> 
            <View>
              <Text style={styles.settingLabel}>Nouvelles mesures</Text>
              <Text style={styles.toggleDescription}>Données patients</Text>
            </View>
            <Switch value={true} />
          </View>
          <View style={styles.toggleRow}> 
            <View>
              <Text style={styles.settingLabel}>Mesures manquantes</Text>
              <Text style={styles.toggleDescription}>Patients inactifs</Text>
            </View>
            <Switch value={false} />
          </View>
          <View style={styles.toggleRow}> 
            <View>
              <Text style={styles.settingLabel}>Rappels RDV</Text>
              <Text style={styles.toggleDescription}>Consultations à venir</Text>
            </View>
            <Switch value={true} />
          </View>
        </View>

        <View style={styles.card}> 
          <View style={styles.sectionHeaderRow}> 
            <Ionicons name="shield-checkmark-outline" size={18} color="#16A34A" />
            <Text style={styles.sectionTitle}>Confidentialité et sécurité</Text>
          </View>
          <TouchableOpacity style={styles.linkRow} activeOpacity={0.7}>
            <Text style={styles.linkLabel}>Politique de confidentialité</Text>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkRow} activeOpacity={0.7}>
            <Text style={styles.linkLabel}>Conditions d'utilisation</Text>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkRow} activeOpacity={0.7}>
            <Text style={styles.linkLabel}>Conformité RGPD</Text>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkRow} activeOpacity={0.7}>
            <Text style={styles.linkLabel}>Sécurité des données</Text>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View style={[styles.card, styles.infoCard]}> 
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
            <Ionicons name="shield-checkmark-outline" size={18} color="#4F8BC9" style={{ marginTop: 2 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.infoTitle}>Conformité RGPD</Text>
              <Text style={styles.infoText}>
                En tant que professionnel de santé, vous êtes responsable de la protection des données de vos patients.
                Cette application respecte les normes RGPD et assure la confidentialité des informations médicales.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}> 
          <Text style={styles.appInfoTitle}>NutriAdapt - Espace Médecin</Text>
          <Text style={styles.appInfoVersion}>Version 1.0.0</Text>
        </View>

        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.7}>
          <Ionicons name="log-out-outline" size={18} color="#DC2626" style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  profileRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 10 },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 24, fontWeight: '700', color: '#FFFFFF' },
  name: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 2 },
  email: { fontSize: 13, color: '#6B7280', marginBottom: 2 },
  role: { fontSize: 13, color: '#6B7280' },
  outlineButton: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 999,
    paddingVertical: 8,
    alignItems: 'center',
  },
  outlineButtonText: { fontSize: 14, color: '#111827', fontWeight: '500' },
  sectionTitle: { fontSize: 15, fontWeight: '600', color: '#111827', marginBottom: 8 },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  settingIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingLabel: { fontSize: 13, color: '#6B7280' },
  settingValue: { fontSize: 14, color: '#111827' },
  statsRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  statBox: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  statNumber: { fontSize: 18, fontWeight: '700', marginBottom: 2 },
  statLabel: { fontSize: 12, color: '#4B5563', textAlign: 'center' },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  toggleDescription: { fontSize: 12, color: '#6B7280' },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  linkLabel: { fontSize: 14, color: '#111827' },
  infoCard: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
  },
  infoTitle: { fontSize: 14, fontWeight: '600', color: '#111827', marginBottom: 4 },
  infoText: { fontSize: 13, color: '#4B5563', lineHeight: 18 },
  appInfoTitle: { fontSize: 13, color: '#6B7280', marginBottom: 2, textAlign: 'center' },
  appInfoVersion: { fontSize: 12, color: '#9CA3AF', textAlign: 'center' },
  logoutBtn: {
    marginTop: 4,
    marginBottom: 12,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#FECACA',
    backgroundColor: '#FEF2F2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: { fontSize: 14, fontWeight: '600', color: '#DC2626' },
});
