import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { Card } from '@/components/ui';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants';

import { OnboardingProfile, UpdateOnboardingProfile } from './types';

type OnboardingStep2Props = {
  data: OnboardingProfile;
  updateData: UpdateOnboardingProfile;
};

const conditions = [
  { id: 'diabetes', label: 'Diabète (Type 1 ou 2)' },
  { id: 'pre-diabetes', label: 'Pré-diabète' },
  { id: 'none', label: 'Aucune pathologie' },
];

const allergies = [
  { id: 'gluten', label: 'Gluten' },
  { id: 'lactose', label: 'Lactose' },
  { id: 'vegetarian', label: 'Végétarien' },
  { id: 'vegan', label: 'Végétalien' },
  { id: 'none', label: 'Aucune allergie' },
];

export const OnboardingStep2 = ({ data, updateData }: OnboardingStep2Props) => {
  const toggleCondition = (id: string) => {
    const current = data.conditions || [];
    if (id === 'none') {
      updateData({ conditions: current.includes('none') ? [] : ['none'] });
      return;
    }

    const filtered = current.filter((condition) => condition !== 'none');
    if (filtered.includes(id)) {
      updateData({ conditions: filtered.filter((condition) => condition !== id) });
    } else {
      updateData({ conditions: [...filtered, id] });
    }
  };

  const toggleAllergy = (id: string) => {
    const current = data.allergies || [];
    if (id === 'none') {
      updateData({ allergies: current.includes('none') ? [] : ['none'] });
      return;
    }

    const filtered = current.filter((allergy) => allergy !== 'none');
    if (filtered.includes(id)) {
      updateData({ allergies: filtered.filter((allergy) => allergy !== id) });
    } else {
      updateData({ allergies: [...filtered, id] });
    }
  };

  return (
    <Card>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="heart-outline" size={16} color={Colors.neutral.gray600} />
          <Text style={styles.sectionLabel}>Pathologies</Text>
        </View>
        {conditions.map((condition) => {
          const isSelected = data.conditions?.includes(condition.id) ?? false;
          return (
            <TouchableOpacity
              key={condition.id}
              style={[styles.optionCard, isSelected && styles.optionCardActive]}
              onPress={() => toggleCondition(condition.id)}
              activeOpacity={0.85}
            >
              <View style={[styles.checkbox, isSelected && styles.checkboxActive]}>
                {isSelected ? <Ionicons name="checkmark" size={16} color={Colors.neutral.white} /> : null}
              </View>
              <Text style={styles.optionLabel}>{condition.label}</Text>
            </TouchableOpacity>
          );
        })}

        <View style={[styles.sectionHeader, styles.sectionSpacing]}>
          <Ionicons name="alert-circle-outline" size={16} color={Colors.neutral.gray600} />
          <Text style={styles.sectionLabel}>Allergies et intolérances</Text>
        </View>
        <Text style={styles.helperText}>
          Facultatif — sélectionnez tout ce qui s’applique ou laissez vide si aucune allergie.
        </Text>
        {allergies.map((allergy) => {
          const isSelected = data.allergies?.includes(allergy.id) ?? false;
          return (
            <TouchableOpacity
              key={allergy.id}
              style={[styles.optionCard, isSelected && styles.optionCardActiveOrange]}
              onPress={() => toggleAllergy(allergy.id)}
              activeOpacity={0.85}
            >
              <View style={[styles.checkbox, isSelected && styles.checkboxActiveOrange]}>
                {isSelected ? <Ionicons name="checkmark" size={16} color={Colors.neutral.white} /> : null}
              </View>
              <Text style={styles.optionLabel}>{allergy.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Card>
  );
};

export default OnboardingStep2;

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
  sectionSpacing: {
    marginTop: Spacing.lg,
  },
  sectionLabel: {
    ...Typography.label,
    color: Colors.neutral.gray900,
  },
  helperText: {
    ...Typography.caption,
    color: Colors.neutral.gray600,
    marginBottom: Spacing.xs,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    backgroundColor: Colors.neutral.white,
  },
  optionCardActive: {
    borderColor: Colors.primary.green,
    backgroundColor: `${Colors.primary.greenPastel}30`,
  },
  optionCardActiveOrange: {
    borderColor: Colors.secondary.orangeText,
    backgroundColor: `${Colors.secondary.orangePastel}30`,
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
  checkboxActiveOrange: {
    borderColor: Colors.secondary.orangeText,
    backgroundColor: Colors.secondary.orangeText,
  },
  optionLabel: {
    ...Typography.body2,
    color: Colors.neutral.gray900,
    flex: 1,
  },
});
