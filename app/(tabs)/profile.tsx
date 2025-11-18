import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '@/src/components/BackButton';

export default function ProfileScreen() {
  const [profile, setProfile] = useState({
    age: '',
    weight: '',
    sex: '',
    allergies: '',
    objectives: '',
  });

  const handleSave = () => {
    // TODO: Implémenter la sauvegarde Firebase
    Alert.alert('Succès', 'Vos informations ont été mises à jour.');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <BackButton />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Mon Profil</Text>
          <Text style={styles.subtitle}>Mettre à jour mes informations personnelles</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Âge</Text>
          <TextInput
            placeholder="Votre âge"
            value={profile.age}
            onChangeText={(text) => setProfile({ ...profile, age: text })}
            style={styles.input}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Poids (kg)</Text>
          <TextInput
            placeholder="Votre poids"
            value={profile.weight}
            onChangeText={(text) => setProfile({ ...profile, weight: text })}
            style={styles.input}
            keyboardType="decimal-pad"
          />

          <Text style={styles.label}>Sexe</Text>
          <View style={styles.sexButtons}>
            <TouchableOpacity
              style={[
                styles.sexButton,
                profile.sex === 'M' && styles.sexButtonSelected,
              ]}
              onPress={() => setProfile({ ...profile, sex: 'M' })}
            >
              <Text
                style={[
                  styles.sexButtonText,
                  profile.sex === 'M' && styles.sexButtonTextSelected,
                ]}
              >
                Homme
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sexButton,
                profile.sex === 'F' && styles.sexButtonSelected,
              ]}
              onPress={() => setProfile({ ...profile, sex: 'F' })}
            >
              <Text
                style={[
                  styles.sexButtonText,
                  profile.sex === 'F' && styles.sexButtonTextSelected,
                ]}
              >
                Femme
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sexButton,
                profile.sex === 'A' && styles.sexButtonSelected,
              ]}
              onPress={() => setProfile({ ...profile, sex: 'A' })}
            >
              <Text
                style={[
                  styles.sexButtonText,
                  profile.sex === 'A' && styles.sexButtonTextSelected,
                ]}
              >
                Autre
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Allergies</Text>
          <TextInput
            placeholder="Listez vos allergies (séparées par des virgules)"
            value={profile.allergies}
            onChangeText={(text) => setProfile({ ...profile, allergies: text })}
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={3}
          />

          <Text style={styles.label}>Objectifs</Text>
          <TextInput
            placeholder="Décrivez vos objectifs de santé"
            value={profile.objectives}
            onChangeText={(text) => setProfile({ ...profile, objectives: text })}
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.8}>
            <Text style={styles.saveButtonText}>Enregistrer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6A6A6A',
    lineHeight: 20,
  },
  form: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#ffffff',
    color: '#1A1A1A',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  sexButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  sexButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  sexButtonSelected: {
    borderColor: '#000000',
    backgroundColor: '#000000',
  },
  sexButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  sexButtonTextSelected: {
    color: '#ffffff',
  },
  saveButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

