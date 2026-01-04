import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { useAuth } from '@/contexts/AuthContext';
import { nowTs, subscribeDailyEntries, toDayKey, upsertMeasurementsFromDaily } from '@/services/firestore';

const DAY_LABELS = ['D', 'L', 'M', 'M', 'J', 'V', 'S'] as const;
const DAY_NAMES = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'] as const;

const chartHeight = 160;

type Metric = 'glucose' | 'weight' | 'water';

const METRIC_OPTIONS: Array<{ id: Metric; label: string; icon: keyof typeof Ionicons.glyphMap }> = [
  { id: 'glucose', label: 'Glycémie', icon: 'water' },
  { id: 'weight', label: 'Poids', icon: 'scale' },
  { id: 'water', label: 'Eau', icon: 'water-outline' },
];

function parseNumberInput(value: string): number | null {
  const normalized = value.replace(',', '.').trim();
  if (!normalized) return null;
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

function EncodeDailyDataModal({
  visible,
  onClose,
  onSave,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: (payload: {
    glucose?: string;
    weight?: string;
    activity?: string;
    water?: string;
    calories?: string;
  }) => void;
}) {
  const [glucose, setGlucose] = useState('');
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('');
  const [water, setWater] = useState('');
  const [calories, setCalories] = useState('');

  const handleClose = () => {
    setGlucose('');
    setWeight('');
    setActivity('');
    setWater('');
    setCalories('');
    onClose();
  };

  const handleSave = () => {
    onSave({
      glucose,
      weight,
      activity,
      water,
      calories,
    });
    setGlucose('');
    setWeight('');
    setActivity('');
    setWater('');
    setCalories('');
  };

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={handleClose}>
      <Pressable style={styles.modalOverlay} onPress={handleClose}>
        <Pressable style={styles.modalCardWrapper} onPress={() => undefined}>
          <Card style={styles.encoderCard}>
            <View style={styles.encoderHeader}>
              <View>
                <Text style={styles.encoderTitle}>Encoder mes données</Text>
                <Text style={styles.encoderSubtitle}>Ajoutez vos mesures du jour</Text>
              </View>
              <TouchableOpacity style={styles.encoderClose} onPress={handleClose} hitSlop={8}>
                <Ionicons name="close" size={18} color={Colors.neutral.white} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.encoderBody} showsVerticalScrollIndicator={false}>
              <View style={styles.fieldRow}>
                <View style={[styles.fieldIcon, { backgroundColor: Colors.primary.greenPastel }]}>
                  <Ionicons name="water" size={18} color={Colors.primary.green} />
                </View>
                <View style={styles.fieldContent}>
                  <Text style={styles.fieldLabel}>Glycémie (mg/dL)</Text>
                  <TextInput
                    value={glucose}
                    onChangeText={setGlucose}
                    placeholder="Ex: 110"
                    keyboardType="numeric"
                    style={styles.fieldInput}
                  />
                </View>
              </View>

              <View style={styles.fieldRow}>
                <View style={[styles.fieldIcon, { backgroundColor: Colors.secondary.orangePastel }]}>
                  <Ionicons name="scale" size={18} color={Colors.secondary.orangeText} />
                </View>
                <View style={styles.fieldContent}>
                  <Text style={styles.fieldLabel}>Poids (kg)</Text>
                  <TextInput
                    value={weight}
                    onChangeText={setWeight}
                    placeholder="Ex: 72.5"
                    keyboardType="numeric"
                    style={styles.fieldInput}
                  />
                </View>
              </View>

              <View style={styles.fieldRow}>
                <View style={[styles.fieldIcon, { backgroundColor: Colors.neutral.gray100 }]}>
                  <Ionicons name="walk" size={18} color={Colors.secondary.lavender} />
                </View>
                <View style={styles.fieldContent}>
                  <Text style={styles.fieldLabel}>Activité physique (minutes)</Text>
                  <TextInput
                    value={activity}
                    onChangeText={setActivity}
                    placeholder="Ex: 30"
                    keyboardType="numeric"
                    style={styles.fieldInput}
                  />
                </View>
              </View>

              <View style={styles.fieldRow}>
                <View style={[styles.fieldIcon, { backgroundColor: Colors.neutral.gray100 }]}>
                  <Ionicons name="water-outline" size={18} color={Colors.chart.blue} />
                </View>
                <View style={styles.fieldContent}>
                  <Text style={styles.fieldLabel}>Eau consommée (litres)</Text>
                  <TextInput
                    value={water}
                    onChangeText={setWater}
                    placeholder="Ex: 2.0"
                    keyboardType="numeric"
                    style={styles.fieldInput}
                  />
                </View>
              </View>

              <View style={styles.fieldRow}>
                <View style={[styles.fieldIcon, { backgroundColor: Colors.neutral.gray100 }]}>
                  <Ionicons name="flame" size={18} color={Colors.secondary.orangeText} />
                </View>
                <View style={styles.fieldContent}>
                  <Text style={styles.fieldLabel}>Calories (kcal)</Text>
                  <TextInput
                    value={calories}
                    onChangeText={setCalories}
                    placeholder="Ex: 1800"
                    keyboardType="numeric"
                    style={styles.fieldInput}
                  />
                </View>
              </View>

              <View style={styles.tipBox}>
                <Text style={styles.tipText}>
                  Astuce : Vous n'êtes pas obligé de remplir tous les champs. Ajoutez uniquement les données que vous
                  avez mesurées.
                </Text>
              </View>
            </ScrollView>

            <View style={styles.encoderActionsRow}>
              <Button title="Annuler" variant="outline" onPress={handleClose} style={styles.encoderAction} />
              <Button
                title="Enregistrer"
                onPress={handleSave}
                icon={<Ionicons name="add" size={18} color={Colors.neutral.white} />}
                style={styles.encoderAction}
              />
            </View>
          </Card>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function HealthScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ openEncode?: string }>();
  const { user } = useAuth();
  const { width } = useWindowDimensions();

  const weekDays = useMemo(() => {
    const today = new Date();
    const jsDay = today.getDay();
    const mondayOffset = (jsDay + 6) % 7;
    const monday = new Date(today);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(today.getDate() - mondayOffset);

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      const dayLabel = DAY_LABELS[date.getDay()] ?? '·';
      const dayName = DAY_NAMES[date.getDay()] ?? '·';
      return {
        date,
        dayKey: toDayKey(date),
        label: dayLabel,
        name: dayName,
      };
    });
  }, []);

  const todayDayKey = useMemo(() => toDayKey(new Date()), []);

  const [selectedMetric, setSelectedMetric] = useState<Metric>('glucose');
  const [weekEntries, setWeekEntries] = useState<
    Array<{ dayKey: string; label: string; name: string; entry: any | null }>
  >(() => weekDays.map((d) => ({ dayKey: d.dayKey, label: d.label, name: d.name, entry: null })));

  const [todayEntry, setTodayEntry] = useState<any | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleOpenAdd = () => setIsAddModalOpen(true);
  const handleCloseAdd = () => setIsAddModalOpen(false);

  useEffect(() => {
    if (params?.openEncode === '1') {
      setIsAddModalOpen(true);
      router.setParams({ openEncode: undefined });
    }
  }, [params?.openEncode, router]);

  useEffect(() => {
    if (!user?.uid) {
      return;
    }

    const from = new Date(weekDays[0]?.date ?? new Date());
    from.setHours(0, 0, 0, 0);
    const to = new Date(weekDays[6]?.date ?? new Date());
    to.setHours(23, 59, 59, 999);

    const unsubscribe = subscribeDailyEntries(
      user.uid,
      {
        from: Timestamp.fromDate(from),
        to: Timestamp.fromDate(to),
      },
      (items) => {
        const byKey = new Map<string, any>();
        for (const item of items) {
          const key = item.data?.date;
          if (typeof key === 'string') {
            byKey.set(key, item.data);
          }
        }

        const next = weekDays.map((d) => ({
          dayKey: d.dayKey,
          label: d.label,
          name: d.name,
          entry: byKey.get(d.dayKey) ?? null,
        }));
        setWeekEntries(next);
        setTodayEntry(byKey.get(todayDayKey) ?? null);
      }
    );

    return () => unsubscribe();
  }, [todayDayKey, user?.uid, weekDays]);

  const glucoseSeries = useMemo(() => {
    return weekEntries.map((d) => {
      const v = d.entry?.values?.glucose_mgdl;
      const value = typeof v === 'number' ? v : null;
      const abnormal = value !== null && (value > 140 || value < 70);
      return {
        label: d.label,
        name: d.name,
        value,
        abnormal,
      };
    });
  }, [weekEntries]);

  const weightSeries = useMemo(() => {
    return weekEntries.map((d) => {
      const v = d.entry?.values?.weight_kg;
      return {
        label: d.label,
        name: d.name,
        value: typeof v === 'number' ? v : null,
      };
    });
  }, [weekEntries]);

  const waterSeries = useMemo(() => {
    return weekEntries.map((d) => {
      const v = d.entry?.values?.water_l;
      return {
        label: d.label,
        name: d.name,
        value: typeof v === 'number' ? v : null,
      };
    });
  }, [weekEntries]);

  const abnormalThisWeek = useMemo(() => {
    return glucoseSeries
      .filter((d) => d.abnormal && typeof d.value === 'number')
      .map((d) => ({ day: d.name, value: d.value as number }));
  }, [glucoseSeries]);

  const todayGlucose = useMemo(() => {
    const v = todayEntry?.values?.glucose_mgdl;
    return typeof v === 'number' ? v : null;
  }, [todayEntry]);

  const todayTime = useMemo(() => {
    const ts = todayEntry?.ts;
    const date = ts?.toDate?.();
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
      return "Aujourd'hui";
    }
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    return `Aujourd'hui, ${hh}:${mm}`;
  }, [todayEntry]);

  const todayGlucoseStatus = useMemo(() => {
    if (typeof todayGlucose !== 'number') return null;
    if (todayGlucose > 140) return 'Élevé';
    if (todayGlucose < 70) return 'Bas';
    return 'Dans la normale';
  }, [todayGlucose]);

  const metricButtonWidth = useMemo(() => {
    // 2 columns on small screens, 3 in a row on wide screens.
    const isWide = width >= 520;
    return isWide ? '32%' : '48%';
  }, [width]);

  const chartConfig = useMemo(() => {
    switch (selectedMetric) {
      case 'glucose':
        return {
          title: 'Évolution de la glycémie',
          unit: 'mg/dL',
        };
      case 'weight':
        return {
          title: 'Évolution du poids',
          unit: 'kg',
        };
      case 'water':
        return {
          title: "Évolution de l'eau",
          unit: 'L',
        };
    }
  }, [selectedMetric]);

  const chartSeries = useMemo(() => {
    if (selectedMetric === 'glucose') {
      const values = glucoseSeries.map((d) => (typeof d.value === 'number' ? d.value : 0));
      const max = Math.max(...values, 1);
      return {
        max,
        bars: glucoseSeries.map((d) => ({
          label: d.label,
          value: typeof d.value === 'number' ? d.value : 0,
          display: typeof d.value === 'number' ? String(d.value) : '--',
          color: d.abnormal ? Colors.status.error : Colors.primary.green,
        })),
      };
    }

    if (selectedMetric === 'weight') {
      const values = weightSeries.map((d) => (typeof d.value === 'number' ? d.value : 0));
      const max = Math.max(...values, 1);
      return {
        max,
        bars: weightSeries.map((d) => ({
          label: d.label,
          value: typeof d.value === 'number' ? d.value : 0,
          display: typeof d.value === 'number' ? d.value.toFixed(1) : '--',
          color: Colors.primary.green,
        })),
      };
    }

    // water
    const values = waterSeries.map((d) => (typeof d.value === 'number' ? d.value : 0));
    const max = Math.max(...values, 1);
    return {
      max,
      bars: waterSeries.map((d) => ({
        label: d.label,
        value: typeof d.value === 'number' ? d.value : 0,
        display: typeof d.value === 'number' ? d.value.toFixed(1) : '--',
        color: Colors.primary.green,
      })),
    };
  }, [glucoseSeries, selectedMetric, waterSeries, weightSeries]);

  const handleSaveMeasurement = async (payload: {
    glucose?: string;
    weight?: string;
    activity?: string;
    water?: string;
    calories?: string;
  }) => {
    if (!user?.uid) {
      Alert.alert('Connexion requise', 'Veuillez vous connecter pour enregistrer vos mesures.');
      return;
    }

    const dayKey = toDayKey(new Date());
    const ts = nowTs();

    try {
      const values: Record<string, number> = {};

      const glucose = parseNumberInput(payload.glucose ?? '');
      if (glucose !== null) values.glucose_mgdl = glucose;

      const weight = parseNumberInput(payload.weight ?? '');
      if (weight !== null) values.weight_kg = weight;

      const activity = parseNumberInput(payload.activity ?? '');
      if (activity !== null) values.activity_min = activity;

      const water = parseNumberInput(payload.water ?? '');
      if (water !== null) values.water_l = water;

      const calories = parseNumberInput(payload.calories ?? '');
      if (calories !== null) values.calories_kcal = calories;

      if (Object.keys(values).length === 0) {
        Alert.alert('Aucune donnée', 'Ajoutez au moins une mesure avant d’enregistrer.');
        return;
      }

      await upsertMeasurementsFromDaily(user.uid, dayKey, values, ts);
      Alert.alert('Enregistré', 'Votre mesure a été enregistrée.');
      setIsAddModalOpen(false);
    } catch (e: any) {
      Alert.alert('Erreur', e?.message ?? "Impossible d'enregistrer la mesure.");
    }
  };

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
            <TouchableOpacity style={styles.addButton} onPress={handleOpenAdd}>
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
                <Text style={styles.glucoseTime}>{todayTime}</Text>
              </View>
            </View>
            <View style={styles.glucoseValueContainer}>
              <Text style={styles.glucoseValue}>{typeof todayGlucose === 'number' ? todayGlucose : '--'}</Text>
              <Text style={styles.glucoseUnit}>mg/dL</Text>
            </View>
            <View style={styles.glucoseStatus}>
              <View
                style={[
                  styles.statusDot,
                  typeof todayGlucose === 'number' && (todayGlucose > 140 || todayGlucose < 70)
                    ? { backgroundColor: Colors.status.error }
                    : null,
                ]}
              />
              <Text style={styles.statusText}>{todayGlucoseStatus ?? '--'}</Text>
            </View>
          </Card>

          <View style={styles.metricSelector}>
            {METRIC_OPTIONS.map((opt) => {
              const active = opt.id === selectedMetric;
              return (
                <TouchableOpacity
                  key={opt.id}
                  style={[
                    styles.metricButton,
                    { width: metricButtonWidth },
                    active && styles.metricButtonActive,
                  ]}
                  onPress={() => setSelectedMetric(opt.id)}
                  activeOpacity={0.85}
                >
                  <Ionicons
                    name={opt.icon}
                    size={18}
                    color={active ? Colors.primary.green : Colors.neutral.gray600}
                  />
                  <Text style={[styles.metricText, active && styles.metricTextActive]}>{opt.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Card>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>{chartConfig.title}</Text>
              {selectedMetric === 'glucose' ? (
                <View style={styles.chartLegend}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: Colors.primary.green }]} />
                    <Text style={styles.legendText}>Normal</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: Colors.status.error }]} />
                    <Text style={styles.legendText}>Anormal</Text>
                  </View>
                </View>
              ) : null}
            </View>

            <View style={styles.chart}>
              {selectedMetric === 'glucose' ? (
                <>
                  <View style={styles.referenceLine}>
                    <Text style={styles.referenceText}>140</Text>
                    <View style={styles.referenceLineDashed} />
                  </View>
                  <View style={[styles.referenceLine, { top: chartHeight / 2 }]}>
                    <Text style={styles.referenceText}>100</Text>
                    <View style={styles.referenceLineDashed} />
                  </View>
                </>
              ) : null}

              <View style={styles.chartData}>
                {chartSeries.bars.map((b) => {
                  const barHeight = (b.value / chartSeries.max) * chartHeight;
                  return (
                    <View key={b.label} style={styles.dataPoint}>
                      <Text style={styles.dataValue}>{b.display}</Text>
                      <View style={[styles.dataBar, { height: barHeight, backgroundColor: b.color }]} />
                      <Text style={styles.dataLabel}>{b.label}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </Card>

          <Card>
            <Text style={styles.abnormalTitle}>Valeurs anormales cette semaine</Text>
            {abnormalThisWeek.length === 0 ? (
              <Text style={styles.abnormalEmpty}>Aucune valeur anormale détectée.</Text>
            ) : (
              <View style={styles.abnormalList}>
                {abnormalThisWeek.map((row) => (
                  <View key={`${row.day}-${row.value}`} style={styles.abnormalRow}>
                    <View style={styles.abnormalLeft}>
                      <Ionicons name="warning" size={16} color={Colors.status.error} />
                      <Text style={styles.abnormalDay}>{row.day}</Text>
                    </View>
                    <View style={styles.abnormalPill}>
                      <Text style={styles.abnormalPillText}>{row.value} mg/dL</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </Card>

          <Card style={styles.tipsCard}>
            <View style={styles.tipsHeader}>
              <View style={styles.tipsIcon}>
                <Ionicons name="bulb" size={20} color={Colors.secondary.orangeText} />
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
              onPress={handleOpenAdd}
            />
            <Button
              title="Exporter les données"
              variant="outline"
              icon={<Ionicons name="download-outline" size={20} color={Colors.neutral.gray900} />}
              style={styles.exportButton}
              onPress={() => Alert.alert('Bientôt disponible', "L'export des données sera disponible prochainement.")}
            />
          </View>
        </View>
      </ScrollView>

      <EncodeDailyDataModal
        visible={isAddModalOpen}
        onClose={handleCloseAdd}
        onSave={handleSaveMeasurement}
      />
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
    color: `${Colors.neutral.white}E6`,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    backgroundColor: `${Colors.neutral.white}33`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: `${Colors.neutral.gray900}66`,
  },
  modalCardWrapper: {
    width: '100%',
    maxWidth: 520,
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

  metricSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    backgroundColor: Colors.neutral.white,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    justifyContent: 'space-between',
  },
  metricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    backgroundColor: Colors.neutral.white,
    minHeight: 42,
  },
  metricButtonActive: {
    backgroundColor: Colors.primary.greenPastel,
    borderColor: Colors.primary.green,
  },
  metricText: {
    ...Typography.body2,
    fontWeight: '500',
    color: Colors.neutral.gray600,
  },
  metricTextActive: {
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
  dataValue: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
    fontSize: 11,
    fontWeight: '500',
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

  abnormalTitle: {
    ...Typography.h3,
    color: Colors.neutral.gray900,
    marginBottom: Spacing.md,
  },
  abnormalEmpty: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },
  abnormalList: {
    gap: Spacing.sm,
  },
  abnormalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.neutral.gray100,
  },
  abnormalLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  abnormalDay: {
    ...Typography.body1,
    fontWeight: '500',
    color: Colors.neutral.gray900,
  },
  abnormalPill: {
    paddingVertical: 6,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.status.error,
  },
  abnormalPillText: {
    ...Typography.body2,
    color: Colors.neutral.white,
    fontWeight: '600',
  },

  encoderCard: {
    padding: 0,
    overflow: 'hidden',
  },
  encoderHeader: {
    backgroundColor: Colors.primary.green,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  encoderTitle: {
    ...Typography.h2,
    color: Colors.neutral.white,
  },
  encoderSubtitle: {
    ...Typography.body2,
    color: Colors.neutral.white,
    opacity: 0.9,
    marginTop: 4,
  },
  encoderClose: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    backgroundColor: `${Colors.neutral.gray900}33`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  encoderBody: {
    padding: Spacing.lg,
    maxHeight: 520,
  },
  fieldRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  fieldIcon: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  fieldContent: {
    flex: 1,
    gap: Spacing.sm,
  },
  fieldLabel: {
    ...Typography.body1,
    fontWeight: '500',
    color: Colors.neutral.gray900,
  },
  fieldInput: {
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.neutral.white,
    ...Typography.body2,
    color: Colors.neutral.gray900,
  },
  tipBox: {
    padding: Spacing.md,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    marginTop: Spacing.sm,
  },
  tipText: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },
  encoderActionsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    padding: Spacing.lg,
    paddingTop: 0,
  },
  encoderAction: {
    flex: 1,
  },
});

