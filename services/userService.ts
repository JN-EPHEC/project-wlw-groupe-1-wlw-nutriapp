import { Timestamp, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import { sanitizeGoals } from '@/constants/goalRules';

import { db } from './firebase';

type FirestoreValue = Record<string, unknown>;

export const createPatientProfile = async (userId: string, profileData: Record<string, unknown>) => {
  try {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return { success: true, alreadyExists: true };
    }

    const onboardingCompleted = Boolean((profileData as any).hasCompletedOnboarding);
    const now = Timestamp.now();
    const sanitizedGoals = sanitizeGoals((profileData as any).goals ?? (profileData as any).objectives ?? []);

    const initialData: FirestoreValue = {
      // V2 schema (non-breaking addition)
      role: 'patient',
      createdAt: now,
      updatedAt: now,
      demographics: {
        birthDate: (profileData as any).birthDate ?? null,
        sex: (profileData as any).sex ?? null,
        heightCm: (profileData as any).heightCm ?? null,
      },
      medical: {
        mainPathology: (profileData as any).mainPathology ?? null,
        pathologies: (profileData as any).pathologies ?? [],
        allergies: (profileData as any).allergies ?? [],
        treatments: (profileData as any).treatments ?? [],
        notes: (profileData as any).patientNote ?? null,
      },
      goals: {
        selected: sanitizedGoals,
        updatedAt: now,
      },
      summary: {
        lastFollowUpAt: now,
        status: 'STABLE',
      },
      legacy: {
        schemaVersion: 1,
      },

      email: (profileData as any).email ?? null,
      displayName: (profileData as any).displayName ?? null,
      hasCompletedOnboarding: onboardingCompleted,
      profile: {
        age: (profileData as any).age ?? null,
        weight: (profileData as any).weight ?? null,
        sex: (profileData as any).sex ?? null,
        allergies: (profileData as any).allergies ?? [],
        goals: sanitizedGoals,
        objectives: sanitizedGoals,
        hasCompletedOnboarding: onboardingCompleted,
      },
      health: {
        glycemia: [],
        tension: [],
        weightHistory: [],
        calories: [],
      },
      stats: {
        createdAt: new Date(),
        lastUpdate: new Date(),
      },
    };

    await setDoc(userRef, initialData);
    return { success: true, created: true };
  } catch (error: any) {
    console.error('Error creating patient profile:', error);
    return { success: false, error: error?.message ?? 'Unknown error' };
  }
};

export const getPatientProfile = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    }

    return { success: false, error: 'Profile not found' };
  } catch (error: any) {
    console.error('Error getting patient profile:', error);
    return { success: false, error: error?.message ?? 'Unknown error' };
  }
};

export const updatePatientProfile = async (userId: string, profileData: Record<string, unknown>) => {
  try {
    const userRef = doc(db, 'users', userId);
    const now = Timestamp.now();

    const normalizedProfileData: Record<string, unknown> = { ...profileData };

    if (
      Object.prototype.hasOwnProperty.call(profileData, 'goals') ||
      Object.prototype.hasOwnProperty.call(profileData, 'objectives')
    ) {
      const sanitizedGoals = sanitizeGoals(
        (profileData as any).goals ?? (profileData as any).objectives ?? []
      );
      normalizedProfileData.goals = sanitizedGoals;
      normalizedProfileData.objectives = sanitizedGoals;
    }

    const updates: FirestoreValue = {
      updatedAt: now,
      'stats.lastUpdate': new Date(),
    };

    // Partial update: do NOT overwrite the whole `profile` object.
    for (const [key, value] of Object.entries(normalizedProfileData)) {
      updates[`profile.${key}`] = value;
    }

    // Keep V2 `goals` projection in sync when goals are updated.
    if (Object.prototype.hasOwnProperty.call(normalizedProfileData, 'goals')) {
      updates['goals.selected'] = (normalizedProfileData as any).goals ?? [];
      updates['goals.updatedAt'] = now;
    }

    if (Object.prototype.hasOwnProperty.call(profileData, 'hasCompletedOnboarding')) {
      updates.hasCompletedOnboarding = Boolean((profileData as any).hasCompletedOnboarding);
    }

    if (Object.prototype.hasOwnProperty.call(profileData, 'completedAt')) {
      updates.completedAt = (profileData as any).completedAt;
    }

    await updateDoc(userRef, updates);
    return { success: true };
  } catch (error: any) {
    console.error('Error updating patient profile:', error);
    return { success: false, error: error?.message ?? 'Unknown error' };
  }
};

export const addHealthMeasurement = async (
  userId: string,
  type: string,
  value: Record<string, unknown>,
  additionalData: Record<string, unknown> = {}
) => {
  try {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      return { success: false, error: 'Profile not found' };
    }

    const currentData: any = docSnap.data();
    const measurements = currentData?.health?.[type] ?? [];

    const newMeasurement = {
      ...value,
      date: new Date(),
      ...additionalData,
    };

    measurements.push(newMeasurement);

    await updateDoc(userRef, {
      [`health.${type}`]: measurements,
      'stats.lastUpdate': new Date(),
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error adding health measurement:', error);
    return { success: false, error: error?.message ?? 'Unknown error' };
  }
};

export const getHealthMeasurements = async (userId: string, type: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const healthData: any = docSnap.data()?.health ?? {};
      return { success: true, data: healthData?.[type] ?? [] };
    }

    return { success: false, error: 'Profile not found' };
  } catch (error: any) {
    console.error('Error getting health measurements:', error);
    return { success: false, error: error?.message ?? 'Unknown error' };
  }
};
