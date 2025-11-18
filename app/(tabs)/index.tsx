import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Bienvenue !</Text>
          <Text style={styles.subtitle}>Gérez votre santé au quotidien</Text>
        </View>

        {/* Section IA pour repas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🍽️ Repas adaptés par IA</Text>
          <Text style={styles.sectionDescription}>
            Obtenez des suggestions de repas personnalisées selon vos besoins nutritionnels
          </Text>
          
          <TouchableOpacity 
            style={styles.aiButton}
            onPress={() => {
              // TODO: Implémenter la navigation vers la page de génération IA
              alert('Fonctionnalité IA à venir');
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.aiButtonText}>Générer mes repas</Text>
          </TouchableOpacity>
        </View>

        {/* Section actions rapides */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/(tabs)/health')}
            activeOpacity={0.8}
          >
            <Text style={styles.actionCardTitle}>📊 Mes données de santé</Text>
            <Text style={styles.actionCardDescription}>
              Consultez l'évolution de vos indicateurs
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/(tabs)/profile')}
            activeOpacity={0.8}
          >
            <Text style={styles.actionCardTitle}>👤 Mon profil</Text>
            <Text style={styles.actionCardDescription}>
              Mettre à jour mes informations personnelles
            </Text>
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
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6A6A6A',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6A6A6A',
    marginBottom: 16,
    lineHeight: 20,
  },
  aiButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  aiButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  actionCard: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  actionCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  actionCardDescription: {
    fontSize: 14,
    color: '#6A6A6A',
  },
});
