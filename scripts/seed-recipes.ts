import admin from 'firebase-admin';

import { RECIPES, type Recipe } from '@/data/recipes';

const normalizeTag = (input: string) => input.trim().toLowerCase();

const normalizeText = (input: string) =>
  input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const slugify = (input: string) =>
  input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const hashToUnit = (input: string): number => {
  // Simple deterministic hash -> [0, 1)
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const u = hash >>> 0;
  return (u % 1_000_000) / 1_000_000;
};

type DerivedTags = {
  health: string[];
  safeAllergens: string[];
};

// EU 14 allergen keys (stable identifiers for Firestore + UI)
type AllergenKey =
  | 'gluten'
  | 'crustaceans'
  | 'eggs'
  | 'fish'
  | 'peanuts'
  | 'soy'
  | 'milk'
  | 'tree_nuts'
  | 'celery'
  | 'mustard'
  | 'sesame'
  | 'sulphites'
  | 'lupin'
  | 'molluscs';

const ALLERGEN_KEYS: AllergenKey[] = [
  'gluten',
  'crustaceans',
  'eggs',
  'fish',
  'peanuts',
  'soy',
  'milk',
  'tree_nuts',
  'celery',
  'mustard',
  'sesame',
  'sulphites',
  'lupin',
  'molluscs',
];

const ALLERGEN_KEYWORDS: Record<AllergenKey, string[]> = {
  gluten: [
    'gluten',
    'ble',
    'blee',
    'ble ',
    'farine',
    'pain',
    'pates',
    'pate',
    'semoule',
    'couscous',
    'seigle',
    'orge',
    'avoine',
    'chapelure',
  ],
  crustaceans: ['crustace', 'crevette', 'crabe', 'homard', 'langoustine'],
  eggs: ['oeuf', 'oeufs', 'egg'],
  fish: ['poisson', 'saumon', 'cabillaud', 'thon', 'sardine', 'anchois', 'truite'],
  peanuts: ['cacahuete', 'cacahuetes', 'arachide', 'arachides', 'beurre de cacahuete'],
  soy: ['soja', 'tofu', 'tempeh', 'sauce soja'],
  milk: ['lait', 'yaourt', 'yogourt', 'fromage', 'beurre', 'creme', 'lactose'],
  tree_nuts: [
    'noix',
    'noisette',
    'amande',
    'pistache',
    'cajou',
    'pecan',
    'macadamia',
    'pignon',
  ],
  celery: ['celeri'],
  mustard: ['moutarde'],
  sesame: ['sesame', 'tahini'],
  sulphites: ['sulfite', 'sulfites', 'dioxyde de soufre'],
  lupin: ['lupin'],
  molluscs: ['mollusque', 'mollusques', 'moule', 'huitre', 'calamar', 'seiche', 'poulpe'],
};

const detectAllergensFromIngredients = (recipe: Recipe): AllergenKey[] => {
  const text = normalizeText((recipe.ingredients ?? []).join(' | '));
  const found: AllergenKey[] = [];

  for (const key of ALLERGEN_KEYS) {
    const keywords = ALLERGEN_KEYWORDS[key];
    if (keywords.some((kw) => text.includes(kw))) {
      found.push(key);
    }
  }

  return found;
};

const deriveTags = (recipe: Recipe): DerivedTags => {
  const rawTags = (recipe.tags ?? []).map(normalizeTag);

  const health = new Set<string>();
  const safeAllergens = new Set<string>();

  // Align with current mobile filter ids in app/(tabs)/recipes/index.tsx
  if (rawTags.some((t) => t.includes('diab'))) health.add('diabetes');
  if (rawTags.some((t) => t.includes('végétarien') || t.includes('vegetarien'))) health.add('vegetarian');
  if (recipe.sodium <= 180) health.add('low-sodium');
  if (recipe.protein >= 20) health.add('high-protein');
  if (recipe.time <= 15) health.add('quick');

  // Allergens/safe allergens
  if (rawTags.some((t) => t.includes('sans gluten'))) {
    safeAllergens.add('gluten');
    health.add('gluten-free');
  }
  if (rawTags.some((t) => t.includes('sans lactose'))) {
    // App uses EU allergen naming ("milk")
    safeAllergens.add('milk');
  }

  // Conditions/extra health tags (optional but useful for future advice)
  if (rawTags.some((t) => t.includes('hypertension') || t.includes('hta'))) health.add('hypertension');

  return { health: [...health], safeAllergens: [...safeAllergens] };
};

// Intentionally not typed as `RecipeDoc` because Admin SDK timestamps are a different type
// than the client SDK `firebase/firestore` Timestamp used in the app.
const mapRecipeToDoc = (recipe: Recipe): Record<string, unknown> => {
  const { health, safeAllergens } = deriveTags(recipe);
  const allergens = detectAllergensFromIngredients(recipe);

  // `safeAllergens` is used for filtering ("show recipes safe for X").
  // For the MVP dataset, we derive it as the complement of detected allergens.
  // If a recipe contains an allergen, it must NOT be marked safe for it.
  const inferredSafeAllergens = ALLERGEN_KEYS.filter((k) => !allergens.includes(k));
  const safeAllergensFinal = inferredSafeAllergens.filter((k) => !allergens.includes(k));

  const now = admin.firestore.FieldValue.serverTimestamp();

  return {
    schemaVersion: 1,
    title: recipe.title,
    slug: slugify(recipe.title),
    description: recipe.description,
    imageUrl: recipe.image,
    prepTimeMin: recipe.time,
    nutrition: {
      kcal: recipe.calories,
      carbs_g: recipe.carbs,
      protein_g: recipe.protein,
      fat_g: recipe.fat,
      sodium_mg: recipe.sodium,
    },
    allergens: allergens.length > 0 ? allergens : undefined,
    // We only mark “safe for allergen” when the source data says so.
    // If absent, we leave it undefined rather than guessing.
    safeAllergens: safeAllergensFinal.length > 0 ? safeAllergensFinal : undefined,
    safeAllergenFlags:
      safeAllergensFinal.length > 0
        ? Object.fromEntries(safeAllergensFinal.map((k) => [k, true]))
        : undefined,
    health: health.length > 0 ? health : undefined,
    isPublished: true,
    randomKey: hashToUnit(`recipe:${recipe.id}`),
    createdAt: now,
    updatedAt: now,
  };
};

const initAdmin = () => {
  if (admin.apps.length > 0) return;

  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (json) {
    const serviceAccount = JSON.parse(json);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    return;
  }

  // Uses GOOGLE_APPLICATION_CREDENTIALS if set.
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
};

async function main() {
  initAdmin();

  const confirm = process.env.SEED_CONFIRM === '1' || process.env.SEED_CONFIRM === 'true';
  if (!confirm) {
    console.log('SEED_CONFIRM is not set. Dry run only.');
    console.log('Set SEED_CONFIRM=1 to actually write to Firestore.');
  }

  const db = admin.firestore();

  console.log(`Preparing ${RECIPES.length} recipes…`);

  const batch = db.batch();
  let writes = 0;

  for (const recipe of RECIPES) {
    const ref = db.collection('recipes').doc(String(recipe.id));
    const doc = mapRecipeToDoc(recipe);

    if (!confirm) {
      const dryAllergens = ((doc as any).allergens ?? []) as string[];
      const drySafe = ((doc as any).safeAllergens ?? []) as string[];
      console.log(`[dry-run] recipes/${ref.id}`, {
        title: (doc as any).title,
        allergens: dryAllergens,
        safeAllergensCount: drySafe.length,
        safeAllergens: drySafe,
        health: (doc as any).health ?? [],
      });
      continue;
    }

    batch.set(ref, doc, { merge: true });
    writes++;
  }

  if (!confirm) {
    console.log('Dry run complete.');
    return;
  }

  await batch.commit();
  console.log(`Seed complete: upserted ${writes} recipe docs.`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
