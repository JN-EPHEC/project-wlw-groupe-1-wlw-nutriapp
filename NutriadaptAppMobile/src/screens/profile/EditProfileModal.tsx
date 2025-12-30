import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function EditProfileModal() {
  const navigation = useNavigation();
  const [name, setName] = useState('Utilisateur NutriAdapt');
  const [email, setEmail] = useState('user@example.com');

  const onSave = () => {
    // Ici on pourrait persister dans un store/serveur
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}> 
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Modifier le profil</Text>
        <TouchableOpacity style={[styles.iconBtn, styles.saveBtn]} onPress={onSave}>
          <Ionicons name="checkmark" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.form}> 
        <Text style={styles.label}>Nom</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Votre nom"
          placeholderTextColor="#9CA3AF"
        />

        <Text style={[styles.label, { marginTop: 14 }]}>E-mail</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          placeholder="email@exemple.com"
          placeholderTextColor="#9CA3AF"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#fff', borderBottomColor: '#F3F4F6', borderBottomWidth: 1 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
  iconBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F3F4F6' },
  saveBtn: { backgroundColor: '#10B981' },
  form: { padding: 16 },
  label: { fontSize: 13, color: '#6B7280', fontWeight: '700', marginBottom: 6 },
  input: { height: 48, borderRadius: 12, backgroundColor: '#fff', paddingHorizontal: 12, borderWidth: 1, borderColor: '#E5E7EB', color: '#111827' },
});
