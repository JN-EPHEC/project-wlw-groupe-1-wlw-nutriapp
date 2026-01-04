import {
  DocumentSnapshot,
  QueryConstraint,
  Timestamp,
  endAt,
  orderBy,
  startAfter,
  startAt,
  where,
} from 'firebase/firestore';

import type { DayKey } from './types';

export const toDayKey = (date: Date): DayKey => {
  const yyyy = date.getFullYear();
  const mm = `${date.getMonth() + 1}`.padStart(2, '0');
  const dd = `${date.getDate()}`.padStart(2, '0');
  return `${yyyy}-${mm}-${dd}` as DayKey;
};

export const dayKeyToDate = (dayKey: DayKey): Date => {
  const [y, m, d] = dayKey.split('-').map((v) => Number(v));
  return new Date(y, (m ?? 1) - 1, d ?? 1);
};

export const nowTs = () => Timestamp.now();

export type Cursor<T = unknown> = DocumentSnapshot<T> | null;

export type PageResult<T> = {
  items: Array<{ id: string; data: T }>;
  nextCursor: DocumentSnapshot<T> | null;
};

export type RangeOptions = {
  from?: Timestamp;
  to?: Timestamp;
};

export const buildTsRangeConstraints = (range: RangeOptions): QueryConstraint[] => {
  const constraints: QueryConstraint[] = [];
  if (range.from) constraints.push(where('ts', '>=', range.from));
  if (range.to) constraints.push(where('ts', '<=', range.to));
  return constraints;
};

export const buildCursorConstraints = <T>(cursor?: Cursor<T>): QueryConstraint[] => {
  if (!cursor) return [];
  return [startAfter(cursor)];
};

export const orderByTsDesc = () => orderBy('ts', 'desc');

export const startAtNumber = (n: number) => startAt(n);
export const endAtNumber = (n: number) => endAt(n);
