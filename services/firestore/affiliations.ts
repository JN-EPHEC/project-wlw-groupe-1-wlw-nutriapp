import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
  setDoc,
  where,
} from 'firebase/firestore';

import { db } from '../firebase';
import type { AffiliationRequestDoc, AffiliationRequestStatus, DoctorAccessDoc } from './types';
import { nowTs } from './utils';

export const createAffiliationRequest = async (
  patientUid: string,
  doctorUid: string,
  snapshot: AffiliationRequestDoc['snapshot']
): Promise<{ requestId: string }> => {
  const ref = collection(db, 'affiliationRequests');
  const createdAt = nowTs();

  const payload: Omit<AffiliationRequestDoc, 'decidedAt'> = {
    patientUid,
    doctorUid,
    status: 'PENDING',
    createdAt,
    snapshot,
  };

  // MVP flow without Cloud Functions:
  // Patient creates doctorAccess as PENDING so the doctor can validate it on accept.
  const accessRef = doc(db, 'users', patientUid, 'doctorAccess', doctorUid);
  const accessDoc: DoctorAccessDoc = {
    status: 'PENDING',
    linkedAt: createdAt,
    scopes: {
      canReadProfile: true,
      canReadMeasurements: true,
      allowedTypes: {
        glucose: true,
        weight: true,
        bp: true,
        activity: true,
        water: true,
        hba1c: true,
      },
    },
  };

  await setDoc(accessRef, accessDoc, { merge: true });

  const docRef = await addDoc(ref, payload);
  return { requestId: docRef.id };
};

export const listAffiliationRequestsForDoctor = async (
  doctorUid: string,
  status?: AffiliationRequestStatus,
  pageSize = 50
): Promise<Array<{ id: string; data: AffiliationRequestDoc }>> => {
  const ref = collection(db, 'affiliationRequests');
  const constraints = [where('doctorUid', '==', doctorUid), orderBy('createdAt', 'desc'), limit(pageSize)];
  if (status) constraints.unshift(where('status', '==', status));

  const q = query(ref, ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, data: d.data() as AffiliationRequestDoc }));
};

export const acceptAffiliationRequest = async (requestId: string): Promise<void> => {
  const reqRef = doc(db, 'affiliationRequests', requestId);

  await runTransaction(db, async (tx) => {
    const reqSnap = await tx.get(reqRef);
    if (!reqSnap.exists()) throw new Error('Affiliation request not found');

    const req = reqSnap.data() as AffiliationRequestDoc;
    if (req.status !== 'PENDING') throw new Error('Request is not PENDING');

    const now = nowTs();

    // Activate patient-created doctorAccess (PENDING -> ACTIVE)
    const accessRef = doc(db, 'users', req.patientUid, 'doctorAccess', req.doctorUid);
    tx.set(
      accessRef,
      {
        status: 'ACTIVE',
        linkedAt: now,
      } satisfies Partial<DoctorAccessDoc>,
      { merge: true }
    );

    // doctors/{doctor}/patients/{patient}
    const patientRef = doc(db, 'doctors', req.doctorUid, 'patients', req.patientUid);
    tx.set(
      patientRef,
      {
        status: 'ACTIVE',
        linkedAt: now,
        updatedAt: now,
        patientSummary: {
          displayName: req.snapshot.patientDisplayName ?? null,
          birthDate: req.snapshot.birthDate ?? null,
          sex: req.snapshot.sex ?? null,
          mainPathology: req.snapshot.medical?.mainPathology ?? null,
          lastHbA1c: undefined,
          lastFollowUpAt: undefined,
          status: undefined,
        },
      },
      { merge: true }
    );

    tx.update(reqRef, {
      status: 'ACCEPTED',
      decidedAt: now,
    });
  });
};

export const rejectAffiliationRequest = async (requestId: string): Promise<void> => {
  const reqRef = doc(db, 'affiliationRequests', requestId);

  await runTransaction(db, async (tx) => {
    const reqSnap = await tx.get(reqRef);
    if (!reqSnap.exists()) throw new Error('Affiliation request not found');
    const req = reqSnap.data() as AffiliationRequestDoc;
    if (req.status !== 'PENDING') throw new Error('Request is not PENDING');

    const now = nowTs();

    // Optional: revoke access if it existed as PENDING.
    const accessRef = doc(db, 'users', req.patientUid, 'doctorAccess', req.doctorUid);
    tx.set(accessRef, { status: 'REVOKED' }, { merge: true });

    tx.update(reqRef, {
      status: 'REJECTED',
      decidedAt: now,
    });
  });
};

export const cancelAffiliationRequest = async (requestId: string): Promise<void> => {
  const reqRef = doc(db, 'affiliationRequests', requestId);

  await runTransaction(db, async (tx) => {
    const reqSnap = await tx.get(reqRef);
    if (!reqSnap.exists()) throw new Error('Affiliation request not found');
    const req = reqSnap.data() as AffiliationRequestDoc;
    if (req.status !== 'PENDING') throw new Error('Request is not PENDING');

    tx.update(reqRef, {
      status: 'CANCELLED',
    });
  });
};
