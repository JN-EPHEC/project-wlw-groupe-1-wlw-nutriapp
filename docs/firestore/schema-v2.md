# Firestore — Schéma V2 (production-ready)

Objectif : remplacer progressivement le modèle legacy `users/{uid}.health.*[]` par des sous-collections scalables (`dailyEntries`, `measurements`, `conversations/messages`) + une stratégie `summary` pour l'espace médecin.

## Principes

- Pas de tableaux de mesures dans `users/{uid}` (limite 1 MiB).
- Écritures idempotentes : `dailyEntries/{YYYY-MM-DD}` et `measurements/{type}_{YYYY-MM-DD}`.
- Lecture tolérante : tous champs optionnels, ajout de champs sans breaking change.
- `schemaVersion` sur documents sensibles.

## Collections

### Patients

`users/{uid}`

```ts
{
  role: 'patient',
  createdAt: Timestamp,
  updatedAt: Timestamp,

  displayName?: string,
  email?: string,

  demographics?: { birthDate?: string, sex?: 'M'|'F'|'A'|string, heightCm?: number },
  medical?: {
    mainPathology?: string,
    pathologies?: string[],
    allergies?: string[],
    treatments?: { name: string, dose?: string }[],
    notes?: string,
  },
  goals?: { selected?: string[], updatedAt?: Timestamp },

  summary?: {
    lastFollowUpAt?: Timestamp,
    status?: 'ALERTE'|'SURVEILLER'|'STABLE'|string,
    lastWeight?: { value: number, ts: Timestamp },
    lastGlucose?: { value: number, ts: Timestamp },
    bmi?: { value: number, ts: Timestamp },
  },

  // Compat legacy (à ne pas enrichir à terme)
  profile?: unknown,
  health?: unknown,
  stats?: unknown,
  legacy?: { schemaVersion?: number, migratedAt?: Timestamp }
}
```

#### Saisie journalière

`users/{uid}/dailyEntries/{yyyy-mm-dd}`

```ts
{
  schemaVersion: 1,
  date: 'YYYY-MM-DD',
  ts: Timestamp,
  values: {
    glucose_mgdl?: number,
    weight_kg?: number,
    bp_systolic?: number,
    bp_diastolic?: number,
    activity_min?: number,
    water_l?: number,
  },
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### Mesures scalables (graph/pagination)

`users/{uid}/measurements/{measurementId}` (id recommandé : `${type}_${dayKey}`)

```ts
{
  schemaVersion: 1,
  type: 'glucose'|'weight'|'bp'|'activity'|'water'|string,
  ts: Timestamp,
  dayKey: 'YYYY-MM-DD',
  unit?: string,

  value?: number,
  systolic?: number,
  diastolic?: number,

  source?: 'dailyEntry'|'manual'|string,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Médecins

`doctors/{doctorUid}`

```ts
{
  role: 'doctor',
  displayName?: string,
  speciality?: string,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

`doctors/{doctorUid}/patients/{patientUid}`

```ts
{
  status: 'ACTIVE'|'REVOKED',
  linkedAt: Timestamp,
  updatedAt: Timestamp,
  patientSummary: {
    displayName?: string,
    birthDate?: string,
    sex?: string,
    mainPathology?: string,
    lastFollowUpAt?: Timestamp,
    status?: string
  }
}
```

### Contrôle d'accès (patient → médecin)

`users/{patientUid}/doctorAccess/{doctorUid}`

```ts
{
  // MVP sans Cloud Functions : le patient crée en PENDING, le médecin passe à ACTIVE/REVOKED.
  status: 'PENDING'|'ACTIVE'|'REVOKED',
  linkedAt: Timestamp,
  scopes: {
    canReadProfile: boolean,
    canReadMeasurements: boolean,
    allowedTypes: {
      glucose?: boolean,
      weight?: boolean,
      bp?: boolean,
      activity?: boolean,
      water?: boolean,
      [k: string]: boolean
    }
  }
}
```

### Demandes d'affiliation

`affiliationRequests/{requestId}`

```ts
{
  patientUid: string,
  doctorUid: string,
  status: 'PENDING'|'ACCEPTED'|'REJECTED'|'CANCELLED',
  createdAt: Timestamp,
  decidedAt?: Timestamp,
  snapshot: {
    patientDisplayName?: string,
    birthDate?: string,
    sex?: string,
    contact?: { email?: string, phone?: string },
    medical?: { mainPathology?: string, pathologies?: string[], allergies?: string[] },
    metrics?: { weight_kg?: number, height_cm?: number },
    patientNote?: string
  }
}
```

### Chat IA

`users/{uid}/conversations/{conversationId}`

```ts
{
  schemaVersion: 1,
  kind: 'ai',
  title?: string,
  createdAt: Timestamp,
  updatedAt: Timestamp,
  lastMessageAt: Timestamp,
  context?: { goalIds?: string[] }
}
```

`users/{uid}/conversations/{conversationId}/messages/{messageId}`

```ts
{
  schemaVersion: 1,
  role: 'user'|'assistant'|'system',
  text: string,
  createdAt: Timestamp,
  status?: 'sending'|'sent'|'error',
  clientId?: string,
  model?: string
}
```

### Recettes + Catalog

`recipes/{recipeId}`

- `safeAllergens: string[]` (simple)
- + champ recommandé (facultatif, sans casser) : `safeAllergenFlags: { gluten?: true, lactose?: true, ... }` pour pouvoir requêter plusieurs exclusions via des `where(...,'==',true)`.

`catalog/allergens/{key}` et `catalog/healthFilters/{key}`

Optionnel : `daily/recipeOfTheDay/{yyyy-mm-dd}`.

## Index à prévoir (Firebase Console)

- `measurements` (collectionGroup): `type ASC, ts DESC` (supporte `where(type==)` + `orderBy(ts desc)` + range sur `ts`)
- `recipes`: `isPublished ASC, randomKey ASC` (recipeOfTheDay)
- `recipes` (filtre santé): `isPublished ASC, health ARRAY_CONTAINS, randomKey ASC`
- `recipes` (filtre allergènes): `isPublished ASC, safeAllergens ARRAY_CONTAINS, randomKey ASC`

Note Firestore : on ne peut pas combiner 2 filtres de type `array-contains/array-contains-any` dans une seule requête. Si l'utilisateur filtre à la fois `healthTags` et plusieurs exclusions allergènes, il faut filtrer l'un des deux côté client (MVP), ou passer à une stratégie de flags map (`safeAllergenFlags.gluten == true`, etc.) pour un filtrage 100% serveur.

## Migration progressive (legacy → V2)

- Conserver `users/{uid}.health.*[]` en lecture (pas d'écriture nouvelle).
- Sur première ouverture « Santé », migrer dans le background :
  - Lire `health.glycemia[]`, `health.weightHistory[]`…
  - Écrire dans `measurements` (idempotent par `${type}_${dayKey}`) + `dailyEntries/{dayKey}`.
  - Marquer `users/{uid}.legacy.migratedAt`.

Voir aussi le service `migrateLegacyHealthArraysToV2()`.
