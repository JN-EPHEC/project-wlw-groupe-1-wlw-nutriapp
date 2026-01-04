import {
  DocumentSnapshot,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from 'firebase/firestore';

import { db } from '../firebase';
import type { RecipeDoc } from './types';

const hashToUnit = (input: string): number => {
  // Simple deterministic hash -> [0, 1)
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  // unsigned
  const u = hash >>> 0;
  return (u % 1_000_000) / 1_000_000;
};

export type ListRecipesFilters = {
  safeAllergens?: string[]; // exclusions selected in UI ("sans gluten" etc.)
  healthTags?: string[]; // "convient à" tags
  limit?: number;
  cursor?: DocumentSnapshot<RecipeDoc> | null;
};

export const listRecipesByFilters = async (
  filters: ListRecipesFilters
): Promise<{ items: Array<{ id: string; data: RecipeDoc }>; nextCursor: DocumentSnapshot<RecipeDoc> | null }> => {
  const ref = collection(db, 'recipes');

  const pageSize = filters.limit ?? 30;
  const safeAllergens = (filters.safeAllergens ?? []).filter(Boolean);
  const healthTags = (filters.healthTags ?? []).filter(Boolean);

  // Firestore limitation: you cannot require "array contains ALL" for multiple values.
  // Strategy:
  // - If 0 or 1 allergen exclusion => query via array-contains.
  // - If >1 => query broader then filter client-side.
  const constraints: any[] = [where('isPublished', '==', true)];

  const hasHealth = healthTags.length > 0;
  const hasSingleAllergen = safeAllergens.length === 1;

  // Firestore constraint: cannot combine 2 array filters in one query.
  // If both are present, we query on health and filter allergens client-side.
  if (hasHealth) {
    constraints.push(where('health', 'array-contains-any', healthTags.slice(0, 10)));
  }

  constraints.push(orderBy('randomKey', 'asc'));

  if (filters.cursor) constraints.push(startAfter(filters.cursor));

  // Narrow if possible (only when we are NOT already using an array filter for health)
  if (!hasHealth && hasSingleAllergen) {
    constraints.splice(1, 0, where('safeAllergens', 'array-contains', safeAllergens[0]));
  }

  constraints.push(limit(pageSize));

  const q = query(ref, ...constraints);
  const snap = await getDocs(q);

  let docs = snap.docs as Array<DocumentSnapshot<RecipeDoc>>;
  let items = docs.map((d) => ({ id: d.id, data: d.data() as RecipeDoc }));

  if (safeAllergens.length > 1 || (hasHealth && hasSingleAllergen)) {
    const required = new Set(safeAllergens);
    items = items.filter(({ data }) => {
      const set = new Set(data.safeAllergens ?? []);
      for (const a of required) if (!set.has(a)) return false;
      return true;
    });
  }

  const nextCursor = docs.length > 0 ? docs[docs.length - 1] : null;
  return { items, nextCursor };
};

export const getRecipeOfTheDay = async (
  dayKey: string
): Promise<{ id: string; data: RecipeDoc } | null> => {
  const seed = hashToUnit(dayKey);
  const ref = collection(db, 'recipes');

  const base = [where('isPublished', '==', true), orderBy('randomKey', 'asc')];

  const q1 = query(ref, ...base, startAt(seed), limit(1));
  const s1 = await getDocs(q1);
  const d1 = s1.docs[0];
  if (d1) return { id: d1.id, data: d1.data() as RecipeDoc };

  const q2 = query(ref, ...base, startAt(0), limit(1));
  const s2 = await getDocs(q2);
  const d2 = s2.docs[0];
  return d2 ? { id: d2.id, data: d2.data() as RecipeDoc } : null;
};
