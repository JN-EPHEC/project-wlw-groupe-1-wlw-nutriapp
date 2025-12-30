import React, { useMemo, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DoctorStackParamList } from '../../navigation/DoctorStack';

type Nav = NativeStackNavigationProp<DoctorStackParamList>;

type Patient = {
  id: string;
  name: string;
  age: number;
  condition: string;
  lastUpdate: string;
  status: 'good' | 'warning' | 'alert';
  lastGlucose?: number;
};

const mockPatients: Patient[] = [
  { id: '1', name: 'Marie Martin', age: 35, condition: 'Diabète Type 2', lastUpdate: 'Il y a 15 min', status: 'good', lastGlucose: 115 },
  { id: '2', name: 'Jean Dupuis', age: 52, condition: 'Diabète Type 2', lastUpdate: 'Il y a 1h', status: 'good', lastGlucose: 108 },
  { id: '3', name: 'Sophie Bernard', age: 44, condition: 'Obésité', lastUpdate: 'Il y a 2h', status: 'alert', lastGlucose: 185 },
  { id: '4', name: 'Pierre Leroy', age: 61, condition: 'Hypertension', lastUpdate: 'Il y a 3h', status: 'good' },
];

export default function DoctorPatientsScreen() {
  const navigation = useNavigation<Nav>();
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () =>
      mockPatients.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.condition.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Mes patients</Text>
        <Text style={styles.subtitle}>
          {filtered.length} patient{filtered.length > 1 ? 's' : ''} suivi{filtered.length > 1 ? 's' : ''}
        </Text>

        <View style={styles.searchRow}> 
          <Ionicons name="search" size={18} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un patient..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 12, gap: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('PatientDetail', { id: item.id })}
            >
              <View style={styles.avatar}> 
                <Text style={styles.avatarText}>
                  {item.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.patientName}>{item.name}</Text>
                <Text style={styles.patientMeta}>
                  {item.age} ans • {item.condition}
                </Text>
                <Text style={styles.patientMeta}>{item.lastUpdate}</Text>
              </View>
              <View style={styles.rightCol}> 
                {item.lastGlucose != null && (
                  <Text style={styles.glucose}>{item.lastGlucose} mg/dL</Text>
                )}
                <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.empty}> 
              <Ionicons name="search" size={32} color="#9CA3AF" />
              <Text style={styles.emptyText}>Aucun patient trouvé</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  content: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '700', color: '#111827' },
  subtitle: { fontSize: 13, color: '#6B7280', marginBottom: 12 },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#111827' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: { color: '#FFFFFF', fontWeight: '700' },
  patientName: { fontSize: 15, fontWeight: '600', color: '#111827' },
  patientMeta: { fontSize: 12, color: '#6B7280' },
  rightCol: { alignItems: 'flex-end', justifyContent: 'center', gap: 4 },
  glucose: { fontSize: 12, color: '#16A34A', fontWeight: '600' },
  empty: { marginTop: 40, alignItems: 'center', justifyContent: 'center' },
  emptyText: { marginTop: 8, fontSize: 14, color: '#9CA3AF' },
});
