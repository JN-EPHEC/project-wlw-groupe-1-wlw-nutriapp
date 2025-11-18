// Firebase configuration and services
// Structure pour les données patient compatible avec un futur dashboard web

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase_env';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Structure des données patient dans Firestore:
// users/{userId}/
//   profile/
//     age: number
//     weight: number
//     sex: string
//     allergies: string[]
//     objectives: string[]
//   health/
//     glycemia: [{value: number, date: timestamp}, ...]
//     tension: [{systolic: number, diastolic: number, date: timestamp}, ...]
//     weightHistory: [{value: number, date: timestamp}, ...]
//     calories: [{value: number, date: timestamp}, ...]
//   stats/
//     lastUpdate: timestamp

export default app;

