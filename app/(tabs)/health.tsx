import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants';

const chartHeight = 160;

type GlucosePoint = {
  time: string;
  value: number;
  status: 'normal' | 'high';
};

const glucoseData: GlucosePoint[] = [
  { time: '8h', value: 95, status: 'normal' },
  { time: '10h', value: 110, status: 'normal' },
  { time: '12h', value: 145, status: 'high' },
  { time: '14h', value: 120, status: 'normal' },
  { time: '16h', value: 100, status: 'normal' },
  { time: '18h', value: 135, status: 'normal' },
  { time: '20h', value: 105, status: 'normal' },
];

type WeeklyAverage = {
  day: string;
  avg: number;
};

const weeklyAverage: WeeklyAverage[] = [
  { day: 'L', avg: 112 },
  { day: 'M', avg: 118 },
  { day: 'M', avg: 108 },
  { day: 'J', avg: 125 },
  { day: 'V', avg: 115 },
  { day: 'S', avg: 110 },
  { day: 'D', avg: 107 },
];

type Period = 'day' | 'week' | 'month';

export function HealthScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('day');
  const maxGlucose = Math.max(...glucoseData.map((point) => point.value));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[Colors.primary.green, Colors.primary.greenDark]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.headerTitle}>Suivi Santé</Text>
              <Text style={styles.headerSubtitle}>Glycémie et indicateurs</Text>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add" size={24} color={Colors.neutral.white} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <Card style={styles.glucoseCard}>
            <View style={styles.glucoseHeader}>
              <View style={styles.glucoseIcon}>
                <Ionicons name="water" size={24} color={Colors.primary.green} />
              </View>
              <View style={styles.glucoseInfo}>
                <Text style={styles.glucoseLabel}>Glycémie actuelle</Text>
                <Text style={styles.glucoseTime}>Aujourd'hui, 20:15</Text>
              </View>
            </View>
            <View style={styles.glucoseValueContainer}>
              <Text style={styles.glucoseValue}>105</Text>
              <Text style={styles.glucoseUnit}>mg/dL</Text>
            </View>
            <View style={styles.glucoseStatus}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Dans la normale</Text>
            </View>
          </Card>

          <View style={styles.periodSelector}>
            {(['day', 'week', 'month'] as Period[]).map((period) => (
              <TouchableOpacity
                key={period}
                style={[styles.periodButton, selectedPeriod === period && styles.periodButtonActive]}
                onPress={() => setSelectedPeriod(period)}
              >
                <Text
                  style={[styles.periodText, selectedPeriod === period && styles.periodTextActive]}
                >
                  {period === 'day' ? 'Jour' : period === 'week' ? 'Semaine' : 'Mois'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Card>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Évolution de la glycémie</Text>
              <View style={styles.chartLegend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: Colors.primary.green }]} />
                  <Text style={styles.legendText}>Normal</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
                  <Text style={styles.legendText}>Élevé</Text>
                </View>
              </View>
            </View>

            <View style={styles.chart}>
              <View style={styles.referenceLine}>
                <Text style={styles.referenceText}>140</Text>
                <View style={styles.referenceLineDashed} />
              </View>
              <View style={[styles.referenceLine, { top: chartHeight / 2 }]}>
                <Text style={styles.referenceText}>100</Text>
                <View style={styles.referenceLineDashed} />
              </View>

              <View style={styles.chartData}>
                {glucoseData.map((point) => {
                  const barHeight = (point.value / maxGlucose) * chartHeight;
                  return (
                    <View key={point.time} style={styles.dataPoint}>
                      <View
                        style={[
                          styles.dataBar,
                          {
                            height: barHeight,
                            backgroundColor:
                              point.status === 'high' ? '#EF4444' : Colors.primary.green,
                          },
                        ]}
                      />
                      <Text style={styles.dataLabel}>{point.time}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </Card>

          <Card>
            <View style={styles.statsHeader}>
              <Ionicons name="bar-chart" size={20} color={Colors.primary.green} />
              <Text style={styles.statsTitle}>Moyenne hebdomadaire</Text>
            </View>

            <View style={styles.weeklyChart}>
              {weeklyAverage.map((day) => {
                const height = (day.avg / 140) * 80;
                return (
                  <View key={`${day.day}-${day.avg}`} style={styles.weeklyBar}>
                    <Text style={styles.weeklyValue}>{day.avg}</Text>
                    <View
                      style={[styles.weeklyBarFill, { height: `${height}%`, backgroundColor: Colors.primary.greenPastel }]}
                    />
                    <Text style={styles.weeklyDay}>{day.day}</Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.statsFooter}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Moyenne</Text>
                <Text style={styles.statValue}>113 mg/dL</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Écart-type</Text>
                <Text style={styles.statValue}>± 6.2</Text>
              </View>
            </View>
          </Card>

          <Card style={styles.tipsCard}>
            <View style={styles.tipsHeader}>
              <View style={styles.tipsIcon}>
                <Ionicons name="bulb" size={20} color="#F59E0B" />
              </View>
              <Text style={styles.tipsTitle}>Conseil du jour</Text>
            </View>
            <Text style={styles.tipsText}>
              Votre glycémie est bien contrôlée cette semaine ! Continuez à privilégier les aliments à index
              glycémique bas et à maintenir votre activité physique régulière.
            </Text>
          </Card>

          <View style={styles.actions}>
            <Button
              title="Ajouter une mesure"
              icon={<Ionicons name="add" size={20} color={Colors.neutral.white} />}
              onPress={() => {}}
            />
            <Button
              title="Exporter les données"
              variant="outline"
              icon={<Ionicons name="download-outline" size={20} color={Colors.neutral.gray900} />}
              style={styles.exportButton}
              onPress={() => {}}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HealthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray100,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    ...Typography.h2,
    color: Colors.neutral.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    ...Typography.body2,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  glucoseCard: {
    backgroundColor: Colors.primary.greenPastel,
    borderWidth: 1,
    borderColor: `${Colors.primary.green}30`,
  },
  glucoseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  glucoseIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.neutral.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glucoseInfo: {
    flex: 1,
  },
  glucoseLabel: {
    ...Typography.body1,
    fontWeight: '600',
    color: Colors.neutral.gray900,
  },
  glucoseTime: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },
  glucoseValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: Spacing.md,
  },
  glucoseValue: {
    fontSize: 48,
    fontWeight: '700',
    color: Colors.primary.green,
  },
  glucoseUnit: {
    ...Typography.h3,
    color: Colors.primary.greenDark,
    marginLeft: Spacing.sm,
  },
  glucoseStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary.green,
  },
  statusText: {
    ...Typography.body2,
    fontWeight: '500',
    color: Colors.primary.greenDark,
  },
  periodSelector: {
    flexDirection: 'row',
    gap: Spacing.sm,
    backgroundColor: Colors.neutral.white,
    padding: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  periodButton: {
    flex: 1,
    height: 40,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: Colors.primary.greenPastel,
  },
  periodText: {
    ...Typography.body2,
    fontWeight: '500',
    color: Colors.neutral.gray600,
  },
  periodTextActive: {
    color: Colors.primary.green,
  },
  chartHeader: {
    marginBottom: Spacing.lg,
  },
  chartTitle: {
    ...Typography.h3,
    color: Colors.neutral.gray900,
    marginBottom: Spacing.md,
  },
  chartLegend: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: BorderRadius.full,
  },
  legendText: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },
  chart: {
    height: 180,
    position: 'relative',
  },
  referenceLine: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  referenceText: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
    width: 32,
  },
  referenceLineDashed: {
    flex: 1,
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
  },
  chartData: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: chartHeight,
    paddingTop: 20,
  },
  dataPoint: {
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
  },
  dataBar: {
    width: '80%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  dataLabel: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
    fontSize: 11,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  statsTitle: {
    ...Typography.h3,
    color: Colors.neutral.gray900,
  },
  weeklyChart: {
    flexDirection: 'row',
    height: 120,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  weeklyBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  weeklyValue: {
    ...Typography.body2,
    fontSize: 11,
    color: Colors.neutral.gray600,
    fontWeight: '500',
  },
  weeklyBarFill: {
    width: '100%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  weeklyDay: {
    ...Typography.body2,
    fontSize: 11,
    color: Colors.neutral.gray600,
    fontWeight: '600',
  },
  statsFooter: {
    flexDirection: 'row',
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray300,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.neutral.gray300,
  },
  statLabel: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
    marginBottom: 4,
  },
  statValue: {
    ...Typography.h3,
    color: Colors.primary.green,
  },
  tipsCard: {
    backgroundColor: Colors.secondary.orangePastel,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  tipsIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.neutral.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipsTitle: {
    ...Typography.body1,
    fontWeight: '600',
    color: Colors.neutral.gray900,
  },
  tipsText: {
    ...Typography.body1,
    color: Colors.neutral.gray900,
    lineHeight: 24,
  },
  actions: {
    gap: Spacing.md,
  },
  exportButton: {
    marginTop: 0,
  },
});

