import {
  DocumentSnapshot,
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

import { db } from '../firebase';
import type { DailyEntryDoc, DailyEntryValues, DayKey, MeasurementDoc, MeasurementType, PatientDoc } from './types';
import { buildCursorConstraints, buildTsRangeConstraints, nowTs, orderByTsDesc } from './utils';

export type ListMeasurementsOptions = {
  from?: Timestamp;
  to?: Timestamp;
  limit?: number;
  cursor?: DocumentSnapshot<MeasurementDoc> | null;
  order?: 'asc' | 'desc';
};

export const addDailyEntry = async (
  uid: string,
  dayKey: DayKey,
  values: DailyEntryValues
): Promise<void> => {
  const ref = doc(db, 'users', uid, 'dailyEntries', dayKey);
  const ts = nowTs();
  const payload: Partial<DailyEntryDoc> = {
    schemaVersion: 1,
    date: dayKey,
    ts,
    values,
    updatedAt: ts,
  };

  await setDoc(
    ref,
    {
      ...payload,
      createdAt: ts,
    } as DailyEntryDoc,
    { merge: true }
  );
};

const measurementIdFor = (type: MeasurementType, dayKey: DayKey) => `${type}_${dayKey}`;

const upsertMeasurementDoc = async (
  uid: string,
  type: MeasurementType,
  dayKey: DayKey,
  ts: Timestamp,
  data: Omit<MeasurementDoc, 'schemaVersion' | 'type' | 'dayKey' | 'ts' | 'createdAt' | 'updatedAt'>
) => {
  const id = measurementIdFor(type, dayKey);
  const ref = doc(db, 'users', uid, 'measurements', id);
  const now = nowTs();
  const docData: MeasurementDoc = {
    schemaVersion: 1,
    type,
    dayKey,
    ts,
    createdAt: now,
    updatedAt: now,
    ...data,
  };
  await setDoc(ref, docData, { merge: true });
};

export const upsertMeasurementsFromDaily = async (
  uid: string,
  dayKey: DayKey,
  values: DailyEntryValues,
  ts: Timestamp
): Promise<void> => {
  const userRef = doc(db, 'users', uid);
  const dailyRef = doc(db, 'users', uid, 'dailyEntries', dayKey);

  await runTransaction(db, async (tx) => {
    const now = nowTs();

    const userSnap = await tx.get(userRef);
    const user = (userSnap.data() ?? {}) as Partial<PatientDoc>;

    // dailyEntries merge
    tx.set(
      dailyRef,
      {
        schemaVersion: 1,
        date: dayKey,
        ts,
        values,
        updatedAt: now,
        createdAt: now,
      } satisfies DailyEntryDoc,
      { merge: true }
    );

    const summaryUpdates: Record<string, unknown> = {
      updatedAt: now,
      'summary.lastFollowUpAt': now,
    };

    const heightCm = user?.demographics?.heightCm ?? null;

    if (typeof values.glucose_mgdl === 'number') {
      const mRef = doc(db, 'users', uid, 'measurements', measurementIdFor('glucose', dayKey));
      tx.set(
        mRef,
        {
          schemaVersion: 1,
          type: 'glucose',
          ts,
          dayKey,
          unit: 'mg/dL',
          value: values.glucose_mgdl,
          source: 'dailyEntry',
          createdAt: now,
          updatedAt: now,
        } satisfies MeasurementDoc,
        { merge: true }
      );
      summaryUpdates['summary.lastGlucose'] = { value: values.glucose_mgdl, ts };
    }

    if (typeof values.weight_kg === 'number') {
      const mRef = doc(db, 'users', uid, 'measurements', measurementIdFor('weight', dayKey));
      tx.set(
        mRef,
        {
          schemaVersion: 1,
          type: 'weight',
          ts,
          dayKey,
          unit: 'kg',
          value: values.weight_kg,
          source: 'dailyEntry',
          createdAt: now,
          updatedAt: now,
        } satisfies MeasurementDoc,
        { merge: true }
      );
      summaryUpdates['summary.lastWeight'] = { value: values.weight_kg, ts };

      if (typeof heightCm === 'number' && heightCm > 0) {
        const heightM = heightCm / 100;
        const bmi = values.weight_kg / (heightM * heightM);
        summaryUpdates['summary.bmi'] = { value: Math.round(bmi * 10) / 10, ts };
      }
    }

    const hasBp = typeof values.bp_systolic === 'number' && typeof values.bp_diastolic === 'number';
    if (hasBp) {
      const mRef = doc(db, 'users', uid, 'measurements', measurementIdFor('bp', dayKey));
      tx.set(
        mRef,
        {
          schemaVersion: 1,
          type: 'bp',
          ts,
          dayKey,
          unit: 'mmHg',
          systolic: values.bp_systolic,
          diastolic: values.bp_diastolic,
          source: 'dailyEntry',
          createdAt: now,
          updatedAt: now,
        } satisfies MeasurementDoc,
        { merge: true }
      );
    }

    if (typeof values.activity_min === 'number') {
      const mRef = doc(db, 'users', uid, 'measurements', measurementIdFor('activity', dayKey));
      tx.set(
        mRef,
        {
          schemaVersion: 1,
          type: 'activity',
          ts,
          dayKey,
          unit: 'min',
          value: values.activity_min,
          source: 'dailyEntry',
          createdAt: now,
          updatedAt: now,
        } satisfies MeasurementDoc,
        { merge: true }
      );
    }

    if (typeof values.water_l === 'number') {
      const mRef = doc(db, 'users', uid, 'measurements', measurementIdFor('water', dayKey));
      tx.set(
        mRef,
        {
          schemaVersion: 1,
          type: 'water',
          ts,
          dayKey,
          unit: 'L',
          value: values.water_l,
          source: 'dailyEntry',
          createdAt: now,
          updatedAt: now,
        } satisfies MeasurementDoc,
        { merge: true }
      );
    }

    if (typeof values.hba1c_percent === 'number') {
      const mRef = doc(db, 'users', uid, 'measurements', measurementIdFor('hba1c', dayKey));
      tx.set(
        mRef,
        {
          schemaVersion: 1,
          type: 'hba1c',
          ts,
          dayKey,
          unit: '%',
          value: values.hba1c_percent,
          source: 'dailyEntry',
          createdAt: now,
          updatedAt: now,
        } satisfies MeasurementDoc,
        { merge: true }
      );
      summaryUpdates['summary.lastHbA1c'] = { value: values.hba1c_percent, ts };
    }

    // basic status field can be set by patient app logic; default stays as-is.
    tx.set(userRef, summaryUpdates, { merge: true });
  });
};

export const listMeasurements = async (
  uid: string,
  type: MeasurementType,
  options: ListMeasurementsOptions = {}
): Promise<{ items: Array<{ id: string; data: MeasurementDoc }>; nextCursor: DocumentSnapshot<MeasurementDoc> | null }> => {
  const baseRef = collection(db, 'users', uid, 'measurements');

  const constraints = [
    where('type', '==', type),
    ...buildTsRangeConstraints({ from: options.from, to: options.to }),
    orderBy('ts', options.order === 'asc' ? 'asc' : 'desc'),
    ...buildCursorConstraints(options.cursor ?? null),
    limit(options.limit ?? 50),
  ];

  const q = query(baseRef, ...constraints);
  const snap = await getDocs(q);
  const docs = snap.docs as Array<DocumentSnapshot<MeasurementDoc>>;

  const items = docs.map((d) => ({ id: d.id, data: d.data() as MeasurementDoc }));
  const nextCursor = docs.length > 0 ? docs[docs.length - 1] : null;
  return { items, nextCursor };
};

export const subscribeLatestMeasurements = (
  uid: string,
  type: MeasurementType,
  limitCount: number,
  onData: (items: Array<{ id: string; data: MeasurementDoc }>) => void,
  onError?: (e: Error) => void
) => {
  const ref = collection(db, 'users', uid, 'measurements');
  const q = query(ref, where('type', '==', type), orderByTsDesc(), limit(limitCount));
  return onSnapshot(
    q,
    (snap) => {
      onData(snap.docs.map((d) => ({ id: d.id, data: d.data() as MeasurementDoc })));
    },
    (err) => {
      onError?.(err as unknown as Error);
    }
  );
};

export const setPatientSummaryStatus = async (
  uid: string,
  status: 'ALERTE' | 'SURVEILLER' | 'STABLE' | string
): Promise<void> => {
  const ref = doc(db, 'users', uid);
  const now = nowTs();
  await updateDoc(ref, {
    updatedAt: now,
    'summary.status': status,
  });
};
