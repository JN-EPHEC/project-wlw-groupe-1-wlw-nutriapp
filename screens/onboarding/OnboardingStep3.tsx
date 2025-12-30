import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { Card } from '@/components/ui';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants';

import { OnboardingProfile, UpdateOnboardingProfile } from './types';

type OnboardingStep3Props = {
  data: OnboardingProfile;
  updateData: UpdateOnboardingProfile;
};

const goals = [
  { id: 'stabilize-glucose', label: 'Stabiliser ma glycémie' },
  { id: 'lose-weight', label: 'Perdre du poids' },
  { id: 'maintain-weight', label: 'Maintenir mon poids' },
  { id: 'gain-weight', label: 'Prendre du poids' },
  { id: 'improve-nutrition', label: 'Améliorer mon alimentation' },
];

export const OnboardingStep3 = ({ data, updateData }: OnboardingStep3Props) => {
  const toggleGoal = (id: string) => {
    const current = data.goals || [];
    if (current.includes(id)) {
      updateData({ goals: current.filter((goal) => goal !== id) });
    } else {
      updateData({ goals: [...current, id] });
    }
  };

  return (
    <Card>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="flag-outline" size={16} color={Colors.neutral.gray600} />
          <Text style={styles.sectionLabel}>Sélectionnez vos objectifs santé</Text>
        </View>
        {goals.map((goal) => {
          const isSelected = data.goals?.includes(goal.id) ?? false;
          return (
            <TouchableOpacity
              key={goal.id}
              style={[styles.goalCard, isSelected && styles.goalCardActive]}
              onPress={() => toggleGoal(goal.id)}
              activeOpacity={0.85}
            >
              <View style={[styles.checkbox, isSelected && styles.checkboxActive]}>
                {isSelected ? <Ionicons name="checkmark" size={16} color={Colors.neutral.white} /> : null}
              </View>
              <Text style={styles.goalLabel}>{goal.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Card>
  );
};

export default OnboardingStep3;

const styles = StyleSheet.create({
  section: {
    gap: Spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  sectionLabel: {
    ...Typography.label,
    color: Colors.neutral.gray900,
  },
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    backgroundColor: Colors.neutral.white,
  },
  goalCardActive: {
    borderColor: Colors.primary.green,
    backgroundColor: `${Colors.primary.greenPastel}30`,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.neutral.gray300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    borderColor: Colors.primary.green,
    backgroundColor: Colors.primary.green,
  },
  goalLabel: {
    ...Typography.body2,
    color: Colors.neutral.gray900,
    flex: 1,
  },
});
