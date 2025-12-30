import { Timestamp, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

type FirestoreValue = Record<string, unknown>;

export const createPatientProfile = async (userId: string, profileData: Record<string, unknown>) => {
  try {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return { success: true, alreadyExists: true };
    }

    const onboardingCompleted = Boolean(profileData.hasCompletedOnboarding);
    const now = Timestamp.now();
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
        selected: (profileData as any).objectives ?? (profileData as any).goals ?? [],
        updatedAt: now,
      },
      summary: {
        lastFollowUpAt: now,
        status: 'STABLE',
      },
      legacy: {
        schemaVersion: 1,
      },

      email: profileData.email ?? null,
      displayName: profileData.displayName ?? null,
      hasCompletedOnboarding: onboardingCompleted,
      profile: {
        age: profileData.age ?? null,
        weight: profileData.weight ?? null,
        sex: profileData.sex ?? null,
        allergies: profileData.allergies ?? [],
        objectives: profileData.objectives ?? [],
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
    const updates: FirestoreValue = {
      profile: profileData,
      'stats.lastUpdate': new Date(),
    };

    if (Object.prototype.hasOwnProperty.call(profileData, 'hasCompletedOnboarding')) {
      updates.hasCompletedOnboarding = Boolean(profileData.hasCompletedOnboarding);
    }

    if (Object.prototype.hasOwnProperty.call(profileData, 'completedAt')) {
      updates.completedAt = profileData.completedAt;
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
