import { Timestamp, doc, getDoc, runTransaction } from 'firebase/firestore';

import { db } from '../firebase';
import type { DayKey, DailyEntryValues, MeasurementDoc } from './types';
import { toDayKey, nowTs } from './utils';

type LegacyGlycemia = { value?: number; date?: any };
type LegacyWeight = { value?: number; date?: any };
type LegacyTension = { systolic?: number; diastolic?: number; date?: any };

const asDate = (d: any): Date | null => {
  if (!d) return null;
  if (d instanceof Date) return d;
  if (typeof d?.toDate === 'function') return d.toDate();
  const parsed = new Date(d);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export const migrateLegacyHealthArraysToV2 = async (uid: string): Promise<{ migrated: boolean }> => {
  const userRef = doc(db, 'users', uid);

  return runTransaction(db, async (tx) => {
    const userSnap = await tx.get(userRef);
    if (!userSnap.exists()) throw new Error('User not found');

    const user = userSnap.data() as any;
    if (user?.legacy?.migratedAt) return { migrated: false };

    const health = user?.health ?? {};
    const glycemia: LegacyGlycemia[] = Array.isArray(health.glycemia) ? health.glycemia : [];
    const weightHistory: LegacyWeight[] = Array.isArray(health.weightHistory) ? health.weightHistory : [];
    const tension: LegacyTension[] = Array.isArray(health.tension) ? health.tension : [];

    const now = nowTs();

    const writeSimple = (
      type: 'glucose' | 'weight',
      unit: string,
      value: number,
      ts: Timestamp,
      dayKey: DayKey
    ) => {
      const id = `${type}_${dayKey}`;
      const mRef = doc(db, 'users', uid, 'measurements', id);
      tx.set(
        mRef,
        {
          schemaVersion: 1,
          type,
          ts,
          dayKey,
          unit,
          value,
          source: 'legacy',
          createdAt: now,
          updatedAt: now,
        } satisfies MeasurementDoc,
        { merge: true }
      );
    };

    const writeBp = (systolic: number, diastolic: number, ts: Timestamp, dayKey: DayKey) => {
      const id = `bp_${dayKey}`;
      const mRef = doc(db, 'users', uid, 'measurements', id);
      tx.set(
        mRef,
        {
          schemaVersion: 1,
          type: 'bp',
          ts,
          dayKey,
          unit: 'mmHg',
          systolic,
          diastolic,
          source: 'legacy',
          createdAt: now,
          updatedAt: now,
        } satisfies MeasurementDoc,
        { merge: true }
      );
    };

    const dailyMerge: Record<string, DailyEntryValues> = {};

    for (const g of glycemia) {
      if (typeof g?.value !== 'number') continue;
      const dt = asDate(g.date);
      if (!dt) continue;
      const dayKey = toDayKey(dt);
      dailyMerge[dayKey] = { ...(dailyMerge[dayKey] ?? {}), glucose_mgdl: g.value };
      writeSimple('glucose', 'mg/dL', g.value, Timestamp.fromDate(dt), dayKey);
    }

    for (const w of weightHistory) {
      if (typeof w?.value !== 'number') continue;
      const dt = asDate(w.date);
      if (!dt) continue;
      const dayKey = toDayKey(dt);
      dailyMerge[dayKey] = { ...(dailyMerge[dayKey] ?? {}), weight_kg: w.value };
      writeSimple('weight', 'kg', w.value, Timestamp.fromDate(dt), dayKey);
    }

    for (const t of tension) {
      if (typeof t?.systolic !== 'number' || typeof t?.diastolic !== 'number') continue;
      const dt = asDate(t.date);
      if (!dt) continue;
      const dayKey = toDayKey(dt);
      dailyMerge[dayKey] = {
        ...(dailyMerge[dayKey] ?? {}),
        bp_systolic: t.systolic,
        bp_diastolic: t.diastolic,
      };
      writeBp(t.systolic, t.diastolic, Timestamp.fromDate(dt), dayKey);
    }

    // dailyEntries
    for (const [dayKey, values] of Object.entries(dailyMerge)) {
      const ref = doc(db, 'users', uid, 'dailyEntries', dayKey);
      tx.set(
        ref,
        {
          schemaVersion: 1,
          date: dayKey,
          ts: now,
          values,
          createdAt: now,
          updatedAt: now,
        },
        { merge: true }
      );
    }

    tx.set(
      userRef,
      {
        updatedAt: now,
        legacy: {
          schemaVersion: 1,
          migratedAt: now,
        },
      },
      { merge: true }
    );

    return { migrated: true };
  });
};

export const hasV2Migration = async (uid: string): Promise<boolean> => {
  const userRef = doc(db, 'users', uid);
  const snap = await getDoc(userRef);
  return Boolean((snap.data() as any)?.legacy?.migratedAt);
};
