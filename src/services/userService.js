// Service pour gérer les données utilisateur (patient uniquement)
import { doc, setDoc, getDoc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Crée le profil initial d'un patient
 */
export const createPatientProfile = async (userId, profileData) => {
  try {
    const userRef = doc(db, 'users', userId);
    
    const initialData = {
      profile: {
        age: profileData.age || null,
        weight: profileData.weight || null,
        sex: profileData.sex || null,
        allergies: profileData.allergies || [],
        objectives: profileData.objectives || [],
      },
      health: {
        glycemia: [],
        tension: [],
        weightHistory: [],
        calories: [],
      },
      stats: {
        lastUpdate: new Date(),
      },
    };

    await setDoc(userRef, initialData);
    return { success: true };
  } catch (error) {
    console.error('Error creating patient profile:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Récupère le profil complet d'un patient
 */
export const getPatientProfile = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);
    
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false, error: 'Profile not found' };
    }
  } catch (error) {
    console.error('Error getting patient profile:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Met à jour le profil patient
 */
export const updatePatientProfile = async (userId, profileData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      'profile': profileData,
      'stats.lastUpdate': new Date(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating patient profile:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Ajoute une mesure de santé (glycémie, tension, poids, calories)
 */
export const addHealthMeasurement = async (userId, type, value, additionalData = {}) => {
  try {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);
    
    if (!docSnap.exists()) {
      return { success: false, error: 'Profile not found' };
    }

    const currentData = docSnap.data();
    const healthData = currentData.health || {};
    const measurements = healthData[type] || [];

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
  } catch (error) {
    console.error('Error adding health measurement:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Récupère les mesures de santé d'un type spécifique
 */
export const getHealthMeasurements = async (userId, type) => {
  try {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);
    
    if (docSnap.exists()) {
      const healthData = docSnap.data().health || {};
      return { success: true, data: healthData[type] || [] };
    } else {
      return { success: false, error: 'Profile not found' };
    }
  } catch (error) {
    console.error('Error getting health measurements:', error);
    return { success: false, error: error.message };
  }
};

