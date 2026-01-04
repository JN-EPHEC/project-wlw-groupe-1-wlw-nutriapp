import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

import { db } from '../firebase';
import type { MeasurementDoc, MeasurementType, PatientDoc } from './types';

export type DoctorPatientRow = {
  patientUid: string;
  status: 'ACTIVE' | 'REVOKED' | string;
  linkedAt?: Timestamp;
  patientSummary?: Record<string, unknown>;
};

export const listDoctorPatients = async (doctorUid: string, pageSize = 100): Promise<DoctorPatientRow[]> => {
  const ref = collection(db, 'doctors', doctorUid, 'patients');
  const q = query(ref, orderBy('linkedAt', 'desc'), limit(pageSize));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    patientUid: d.id,
    ...(d.data() as any),
  }));
};

export type PatientDossier = {
  patientUid: string;
  profile: PatientDoc | null;
  summary: PatientDoc['summary'] | null;
  latest: Partial<Record<MeasurementType, MeasurementDoc>>;
};

export const getPatientDossierForDoctor = async (
  doctorUid: string,
  patientUid: string
): Promise<PatientDossier> => {
  // Security is handled by Firestore Rules via users/{patient}/doctorAccess/{doctor}
  // and measurement type allow-list.
  const userRef = doc(db, 'users', patientUid);
  const userSnap = await getDoc(userRef);

  const profile = userSnap.exists() ? (userSnap.data() as PatientDoc) : null;

  const latest: Partial<Record<MeasurementType, MeasurementDoc>> = {};

  const types: MeasurementType[] = ['glucose', 'weight', 'bp', 'activity', 'water'];
  for (const type of types) {
    const mRef = collection(db, 'users', patientUid, 'measurements');
    const q = query(mRef, where('type', '==', type), orderBy('ts', 'desc'), limit(1));
    const mSnap = await getDocs(q);
    const first = mSnap.docs[0];
    if (first) latest[type] = first.data() as MeasurementDoc;
  }

  return {
    patientUid,
    profile,
    summary: profile?.summary ?? null,
    latest,
  };
};
