import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type OnboardingProps = NativeStackScreenProps<any>;

export default function OnboardingScreen({ navigation }: OnboardingProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Bienvenue</Text>
        <Text style={styles.body}>Suivez vos habitudes et découvrez des recettes adaptées.</Text>
        <TouchableOpacity style={styles.cta} onPress={() => navigation.navigate('RoleChoice')}>
          <Text style={styles.ctaText}>Commencer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  title: { fontSize: 28, fontWeight: '700', color: '#1A1A1A', marginBottom: 8 },
  body: { fontSize: 16, color: '#6C6C6C' },
  cta: { marginTop: 16, backgroundColor: '#1DBF73', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 },
  ctaText: { color: '#fff', fontWeight: '600' },
});
