import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { Card, Input } from '@/components/ui';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants';

import { OnboardingProfile, UpdateOnboardingProfile } from './types';

const activityLevels = [
  { value: 'sedentary', label: 'Sédentaire', description: "Peu ou pas d'exercice" },
  { value: 'light', label: 'Légère', description: '1-3 jours/semaine' },
  { value: 'moderate', label: 'Modérée', description: '3-5 jours/semaine' },
  { value: 'active', label: 'Active', description: '6-7 jours/semaine' },
  { value: 'very-active', label: 'Très active', description: 'Exercice intense quotidien' },
];

type OnboardingStep1Props = {
  data: OnboardingProfile;
  updateData: UpdateOnboardingProfile;
};

export const OnboardingStep1 = ({ data, updateData }: OnboardingStep1Props) => {
  return (
    <Card>
      <View style={styles.section}>
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Input
              label="Âge"
              placeholder="25"
              value={data.age}
              onChangeText={(value) => updateData({ age: value })}
              keyboardType="numeric"
              icon={<Ionicons name="person-outline" size={16} color={Colors.neutral.gray600} />}
            />
          </View>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>Sexe</Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[styles.genderButton, data.gender === 'male' && styles.genderButtonActive]}
                onPress={() => updateData({ gender: 'male' })}
                activeOpacity={0.85}
              >
                <Text style={[styles.genderText, data.gender === 'male' && styles.genderTextActive]}>Homme</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.genderButton, data.gender === 'female' && styles.genderButtonActive]}
                onPress={() => updateData({ gender: 'female' })}
                activeOpacity={0.85}
              >
                <Text style={[styles.genderText, data.gender === 'female' && styles.genderTextActive]}>Femme</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Input
              label="Taille (cm)"
              placeholder="170"
              value={data.height}
              onChangeText={(value) => updateData({ height: value })}
              keyboardType="numeric"
              icon={<Ionicons name="resize-outline" size={16} color={Colors.neutral.gray600} />}
            />
          </View>
          <View style={styles.halfWidth}>
            <Input
              label="Poids (kg)"
              placeholder="70"
              value={data.weight}
              onChangeText={(value) => updateData({ weight: value })}
              keyboardType="numeric"
              icon={<Ionicons name="fitness-outline" size={16} color={Colors.neutral.gray600} />}
            />
          </View>
        </View>

        <Text style={styles.sectionLabel}>Niveau d'activité physique</Text>
        {activityLevels.map((level) => {
          const isSelected = data.activityLevel === level.value;
          return (
            <TouchableOpacity
              key={level.value}
              style={[styles.activityCard, isSelected && styles.activityCardActive]}
              onPress={() => updateData({ activityLevel: level.value })}
              activeOpacity={0.9}
            >
              <View style={styles.activityContent}>
                <View style={[styles.radio, isSelected && styles.radioActive]}>
                  {isSelected ? <View style={styles.radioInner} /> : null}
                </View>
                <View style={styles.activityText}>
                  <Text style={styles.activityLabel}>{level.label}</Text>
                  <Text style={styles.activityDescription}>({level.description})</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </Card>
  );
};

export default OnboardingStep1;

const styles = StyleSheet.create({
  section: {
    gap: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  halfWidth: {
    flex: 1,
  },
  label: {
    ...Typography.label,
    color: Colors.neutral.gray900,
    marginBottom: Spacing.sm,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  genderButton: {
    flex: 1,
    height: 48,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.neutral.white,
  },
  genderButtonActive: {
    borderColor: Colors.primary.green,
    backgroundColor: `${Colors.primary.greenPastel}30`,
  },
  genderText: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },
  genderTextActive: {
    color: Colors.primary.green,
    fontWeight: '500',
  },
  sectionLabel: {
    ...Typography.label,
    color: Colors.neutral.gray900,
    marginTop: Spacing.sm,
  },
  activityCard: {
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    padding: Spacing.md,
    backgroundColor: Colors.neutral.white,
  },
  activityCardActive: {
    borderColor: Colors.primary.green,
    backgroundColor: `${Colors.primary.greenPastel}30`,
  },
  activityContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.neutral.gray300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: {
    borderColor: Colors.primary.green,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary.green,
  },
  activityText: {
    flex: 1,
  },
  activityLabel: {
    ...Typography.body2,
    color: Colors.neutral.gray900,
    fontWeight: '500',
  },
  activityDescription: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },
});
