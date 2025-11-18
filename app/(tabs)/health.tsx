import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '@/src/components/BackButton';

export default function HealthDataScreen() {
  const [selectedMetric, setSelectedMetric] = useState('glycemia');

  // Données mockées - à remplacer par les vraies données Firebase
  const mockData = {
    glycemia: [
      { value: 95, date: '2024-01-15' },
      { value: 98, date: '2024-01-16' },
      { value: 92, date: '2024-01-17' },
    ],
    tension: [
      { systolic: 120, diastolic: 80, date: '2024-01-15' },
      { systolic: 118, diastolic: 78, date: '2024-01-16' },
    ],
    weight: [
      { value: 70, date: '2024-01-15' },
      { value: 69.5, date: '2024-01-16' },
    ],
    calories: [
      { value: 2000, date: '2024-01-15' },
      { value: 1850, date: '2024-01-16' },
    ],
  };

  const metrics = [
    { key: 'glycemia', label: 'Glycémie', unit: 'mg/dL', icon: '🩸' },
    { key: 'tension', label: 'Tension', unit: 'mmHg', icon: '❤️' },
    { key: 'weight', label: 'Poids', unit: 'kg', icon: '⚖️' },
    { key: 'calories', label: 'Calories', unit: 'kcal', icon: '🔥' },
  ];

  const renderMetricCard = (metric) => {
    const data = mockData[metric.key] || [];
    const latest = data[data.length - 1];

    return (
      <TouchableOpacity
        key={metric.key}
        style={[
          styles.metricCard,
          selectedMetric === metric.key && styles.metricCardSelected,
        ]}
        onPress={() => setSelectedMetric(metric.key)}
        activeOpacity={0.7}
      >
        <Text style={styles.metricIcon}>{metric.icon}</Text>
        <Text style={styles.metricLabel}>{metric.label}</Text>
        {latest && (
          <Text style={styles.metricValue}>
            {metric.key === 'tension'
              ? `${latest.systolic}/${latest.diastolic}`
              : latest.value}{' '}
            {metric.unit}
          </Text>
        )}
        <Text style={styles.metricDate}>
          {latest ? `Dernière mesure: ${latest.date}` : 'Aucune donnée'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <BackButton />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Suivi de mes données de santé</Text>
          <Text style={styles.subtitle}>
            Consultez l'évolution de vos indicateurs hebdomadaires
          </Text>
        </View>

        {/* Cartes d'indicateurs */}
        <View style={styles.metricsGrid}>
          {metrics.map(renderMetricCard)}
        </View>

        {/* Graphique placeholder */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>
            Évolution - {metrics.find((m) => m.key === selectedMetric)?.label}
          </Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartPlaceholderText}>
              Graphique à implémenter{'\n'}
              (Données: {mockData[selectedMetric]?.length || 0} mesures)
            </Text>
          </View>
        </View>

        {/* Bouton pour ajouter une mesure */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            // TODO: Implémenter le formulaire d'ajout de mesure
            alert('Formulaire d\'ajout de mesure à implémenter');
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>+ Ajouter une mesure</Text>
        </TouchableOpacity>
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
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  metricCardSelected: {
    borderColor: '#000000',
    backgroundColor: '#FAFAFA',
  },
  metricIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  metricDate: {
    fontSize: 12,
    color: '#6A6A6A',
  },
  chartContainer: {
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartPlaceholderText: {
    fontSize: 14,
    color: '#6A6A6A',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

