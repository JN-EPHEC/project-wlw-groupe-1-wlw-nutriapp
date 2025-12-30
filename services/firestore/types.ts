import type { Timestamp } from 'firebase/firestore';

export type DayKey = `${number}-${number}-${number}`;

export type MeasurementType =
  | 'glucose'
  | 'weight'
  | 'bp'
  | 'activity'
  | 'water'
  | 'hba1c'
  | (string & {});

export type PatientRole = 'patient';
export type DoctorRole = 'doctor';

export type PatientSummaryStatus = 'ALERTE' | 'SURVEILLER' | 'STABLE' | (string & {});

export type PatientDoc = {
  role: PatientRole;
  createdAt: Timestamp;
  updatedAt: Timestamp;

  email?: string | null;
  displayName?: string | null;

  demographics?: {
    birthDate?: string | null;
    sex?: string | null;
    heightCm?: number | null;
  };

  medical?: {
    mainPathology?: string | null;
    pathologies?: string[];
    allergies?: string[];
    treatments?: { name: string; dose?: string | null }[];
    notes?: string | null;
  };

  goals?: {
    selected?: string[];
    updatedAt?: Timestamp;
  };

  summary?: {
    lastFollowUpAt?: Timestamp;
    status?: PatientSummaryStatus;
    lastHbA1c?: { value: number; ts: Timestamp };
    lastWeight?: { value: number; ts: Timestamp };
    lastGlucose?: { value: number; ts: Timestamp };
    bmi?: { value: number; ts: Timestamp };
  };

  legacy?: {
    schemaVersion?: number;
    migratedAt?: Timestamp;
  };

  // Legacy fields kept for compatibility
  profile?: unknown;
  health?: unknown;
  stats?: unknown;
};

export type DailyEntryValues = {
  glucose_mgdl?: number;
  weight_kg?: number;
  bp_systolic?: number;
  bp_diastolic?: number;
  activity_min?: number;
  water_l?: number;
  hba1c_percent?: number;
};

export type DailyEntryDoc = {
  schemaVersion: 1;
  date: DayKey;
  ts: Timestamp;
  values: DailyEntryValues;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type MeasurementDoc = {
  schemaVersion: 1;
  type: MeasurementType;
  ts: Timestamp;
  dayKey: DayKey;
  unit?: string;
  value?: number;
  systolic?: number;
  diastolic?: number;
  source?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type DoctorAccessDoc = {
  status: 'PENDING' | 'ACTIVE' | 'REVOKED';
  linkedAt: Timestamp;
  scopes: {
    canReadProfile: boolean;
    canReadMeasurements: boolean;
    allowedTypes: Record<string, boolean>;
  };
};

export type AffiliationRequestStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';

export type AffiliationRequestDoc = {
  patientUid: string;
  doctorUid: string;
  status: AffiliationRequestStatus;
  createdAt: Timestamp;
  decidedAt?: Timestamp;
  snapshot: {
    patientDisplayName?: string | null;
    birthDate?: string | null;
    sex?: string | null;
    contact?: { email?: string | null; phone?: string | null };
    medical?: { mainPathology?: string | null; pathologies?: string[]; allergies?: string[] };
    metrics?: { weight_kg?: number | null; height_cm?: number | null };
    patientNote?: string | null;
  };
};

export type ConversationDoc = {
  schemaVersion: 1;
  kind: 'ai';
  title?: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastMessageAt: Timestamp;
  context?: { goalIds?: string[] };
};

export type MessageDoc = {
  schemaVersion: 1;
  role: 'user' | 'assistant' | 'system';
  text: string;
  createdAt: Timestamp;
  status?: 'sending' | 'sent' | 'error';
  clientId?: string;
  model?: string;
};

export type RecipeDoc = {
  schemaVersion?: number;
  title: string;
  slug?: string;
  description?: string;
  imageUrl?: string;
  servings?: number;
  prepTimeMin?: number;
  cookTimeMin?: number;
  nutrition?: {
    kcal?: number;
    carbs_g?: number;
    protein_g?: number;
    fat_g?: number;
    fiber_g?: number;
    sodium_mg?: number;
    gi?: number;
  };
  allergens?: string[];
  safeAllergens?: string[];
  safeAllergenFlags?: Record<string, boolean>;
  health?: string[];
  isPublished: boolean;
  randomKey?: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};
