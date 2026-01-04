import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { sanitizeGoals } from '@/constants/goalRules';
import { useAuth } from '@/contexts/AuthContext';

import { OnboardingStep1 } from './OnboardingStep1';
import { OnboardingStep2 } from './OnboardingStep2';
import { OnboardingStep3 } from './OnboardingStep3';
import { OnboardingStep4 } from './OnboardingStep4';
import { OnboardingProfile, UpdateOnboardingProfile } from './types';

const INITIAL_PROFILE: OnboardingProfile = {
  age: '',
  gender: '',
  height: '',
  weight: '',
  activityLevel: '',
  conditions: [],
  allergies: [],
  goals: [],
  dataSharing: false,
  healthNotifications: true,
};

type StepComponentProps = {
  data: OnboardingProfile;
  updateData: UpdateOnboardingProfile;
};

export const OnboardingFlow = () => {
  const router = useRouter();
  const { updateUserProfile, userProfile } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<OnboardingProfile>(INITIAL_PROFILE);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const storedProfile = (userProfile as { profile?: Record<string, unknown> } | null)?.profile;
    if (!storedProfile) {
      return;
    }

    const getString = (key: string): string | undefined => {
      const value = storedProfile[key];
      if (value === undefined || value === null) return undefined;
      return String(value);
    };

    const getStringArray = (key: string): string[] | undefined => {
      const value = storedProfile[key];
      if (!Array.isArray(value)) return undefined;
      return value.filter((item): item is string => typeof item === 'string');
    };

    const getBoolean = (key: string): boolean | undefined => {
      const value = storedProfile[key];
      return typeof value === 'boolean' ? value : undefined;
    };

    setProfileData((prev) => {
      const next: OnboardingProfile = {
        age: getString('age') ?? prev.age,
        gender: getString('gender') ?? getString('sex') ?? prev.gender,
        height: getString('height') ?? prev.height,
        weight: getString('weight') ?? prev.weight,
        activityLevel: getString('activityLevel') ?? prev.activityLevel,
        conditions: getStringArray('conditions') ?? prev.conditions,
        allergies: getStringArray('allergies') ?? prev.allergies,
        goals: getStringArray('goals') ?? getStringArray('objectives') ?? prev.goals,
        dataSharing: getBoolean('dataSharing') ?? prev.dataSharing,
        healthNotifications: getBoolean('healthNotifications') ?? prev.healthNotifications,
      };

      const hasChanged = Object.keys(next).some((key) => {
        const typedKey = key as keyof OnboardingProfile;
        const prevValue = prev[typedKey];
        const nextValue = next[typedKey];
        if (Array.isArray(prevValue) && Array.isArray(nextValue)) {
          if (prevValue.length !== nextValue.length) return true;
          return prevValue.some((value, index) => value !== nextValue[index]);
        }
        return prevValue !== nextValue;
      });

      return hasChanged ? next : prev;
    });
  }, [userProfile]);

  const updateProfile = (partial: Partial<OnboardingProfile>) => {
    setProfileData((prev) => ({ ...prev, ...partial }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          Boolean(profileData.age) &&
          Boolean(profileData.gender) &&
          Boolean(profileData.height) &&
          Boolean(profileData.weight) &&
          Boolean(profileData.activityLevel)
        );
      case 2:
        return profileData.conditions.length > 0;
      case 3:
        return profileData.goals.length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNext = async () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    setSubmitting(true);
    const ageNumber = Number(profileData.age);
    const heightNumber = Number(profileData.height);
    const weightNumber = Number(profileData.weight);

    const sanitizedConditions = profileData.conditions.includes('none')
      ? []
      : profileData.conditions;
    const sanitizedAllergies = profileData.allergies.includes('none')
      ? []
      : profileData.allergies;

    const response = await updateUserProfile({
      age: Number.isFinite(ageNumber) ? ageNumber : profileData.age,
      gender: profileData.gender,
      height: Number.isFinite(heightNumber) ? heightNumber : profileData.height,
      weight: Number.isFinite(weightNumber) ? weightNumber : profileData.weight,
      activityLevel: profileData.activityLevel,
      conditions: sanitizedConditions,
      allergies: sanitizedAllergies,
      goals: sanitizeGoals(profileData.goals),
      dataSharing: profileData.dataSharing,
      healthNotifications: profileData.healthNotifications,
      hasCompletedOnboarding: true,
      completedAt: new Date().toISOString(),
    });
    setSubmitting(false);

    if (!response.success) {
      Alert.alert('Erreur', response.error ?? "Impossible d'enregistrer votre profil");
      return;
    }

    // Expo Router: go to the authenticated area. Index will also redirect correctly.
    router.replace('/(tabs)');
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const getStepIcon = () => {
    switch (currentStep) {
      case 1:
        return 'person-outline';
      case 2:
        return 'heart-outline';
      case 3:
        return 'flag-outline';
      case 4:
        return 'shield-checkmark-outline';
      default:
        return 'person-outline';
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Parlez-nous de vous';
      case 2:
        return 'Votre santé';
      case 3:
        return 'Vos objectifs';
      case 4:
        return 'Dernières préférences';
      default:
        return '';
    }
  };

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 1:
        return 'Ces informations nous aident à personnaliser vos recommandations';
      case 2:
        return 'Nous adaptons les recettes à votre profil de santé';
      case 3:
        return 'Définissez ce que vous souhaitez accomplir';
      case 4:
        return 'Configurez vos préférences de confidentialité';
      default:
        return '';
    }
  };

  const renderStep = () => {
    const commonProps: StepComponentProps = {
      data: profileData,
      updateData: updateProfile,
    };

    switch (currentStep) {
      case 1:
        return <OnboardingStep1 {...commonProps} />;
      case 2:
        return <OnboardingStep2 {...commonProps} />;
      case 3:
        return <OnboardingStep3 {...commonProps} />;
      case 4:
        return <OnboardingStep4 {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Logo size="small" />
        <View style={styles.progressContainer}>
          {[1, 2, 3, 4].map((step) => (
            <View
              key={step}
              style={[
                styles.progressDot,
                step === currentStep && styles.progressDotActive,
                step < currentStep && styles.progressDotComplete,
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.stepHeader}>
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={[Colors.primary.greenPastel, Colors.primary.greenPastel]}
            style={styles.iconGradient}
          >
            <Ionicons name={getStepIcon()} size={24} color={Colors.primary.green} />
          </LinearGradient>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.stepNumber}>Étape {currentStep} sur 4</Text>
          <Text style={styles.stepTitle}>{getStepTitle()}</Text>
        </View>
      </View>

      <Text style={styles.stepSubtitle}>{getStepSubtitle()}</Text>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderStep()}
      </ScrollView>

      <View style={styles.navigationContainer}>
        {currentStep > 1 && (
          <Button
            title="Retour"
            onPress={handleBack}
            variant="outline"
            style={styles.backButton}
            icon={<Ionicons name="arrow-back" size={20} color={Colors.neutral.gray900} />}
          />
        )}
        <Button
          title={currentStep === 4 ? 'Terminer' : 'Continuer'}
          onPress={handleNext}
          disabled={!canProceed() || submitting}
          loading={submitting}
          style={styles.nextButton}
          icon={
            <Ionicons
              name={currentStep === 4 ? 'checkmark' : 'arrow-forward'}
              size={20}
              color={Colors.neutral.white}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray300,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.neutral.gray300,
  },
  progressDotActive: {
    width: 32,
    backgroundColor: Colors.primary.green,
  },
  progressDotComplete: {
    backgroundColor: Colors.primary.green,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    gap: Spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  iconGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  stepNumber: {
    ...Typography.body2,
    color: Colors.primary.green,
    fontWeight: '500',
    marginBottom: 4,
  },
  stepTitle: {
    ...Typography.h2,
    color: Colors.neutral.gray900,
  },
  stepSubtitle: {
    ...Typography.body1,
    color: Colors.neutral.gray600,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  navigationContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    padding: Spacing.lg,
    backgroundColor: Colors.neutral.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray300,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
  },
});

export default OnboardingFlow;
