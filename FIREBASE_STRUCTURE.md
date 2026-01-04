# Structure Firebase - NutriApp

## Architecture des données patient

Toutes les données sont structurées pour être facilement exploitables dans un futur dashboard web pour les professionnels de santé.

### Structure Firestore

> Note (2025) : une structure V2 scalable est ajoutée (sous-collections) tout en conservant le modèle legacy pour compatibilité. Voir aussi `docs/firestore/schema-v2.md`.

```
users/
  {userId}/
    role: "patient"
    createdAt, updatedAt
    demographics: { birthDate?, sex?, heightCm? }
    medical: { mainPathology?, pathologies[], allergies[], treatments[], notes? }
    goals: { selected[], updatedAt }
    summary: { lastFollowUpAt, status, lastWeight?, lastGlucose?, bmi? }

    dailyEntries/
      {YYYY-MM-DD}/
        values: { glucose_mgdl?, weight_kg?, bp_systolic?, bp_diastolic?, activity_min?, water_l? }

    measurements/
      {type}_{YYYY-MM-DD}/
        type, ts, dayKey, unit, value/systolic/diastolic

    conversations/
      {conversationId}/
        messages/{messageId}

    doctorAccess/
      {doctorUid}/
        status, scopes

  (legacy - compat)
    profile: {...}
    health: {...}
    stats: {...}

doctors/
  {doctorUid}/
    patients/{patientUid}

affiliationRequests/{requestId}

recipes/{recipeId}
catalog/allergens/{key}
catalog/healthFilters/{key}
```

## Services disponibles

### `services/userService.ts` (legacy + initialisation V2)

- `createPatientProfile(userId, profileData)` - Crée le profil initial
- `getPatientProfile(userId)` - Récupère le profil complet
- `updatePatientProfile(userId, profileData)` - Met à jour le profil
- `addHealthMeasurement(userId, type, value, additionalData)` - Ajoute une mesure
- `getHealthMeasurements(userId, type)` - Récupère les mesures d'un type

### `services/firestore/*` (V2)

Exemples :
- `addDailyEntry(uid, dayKey, values)`
- `upsertMeasurementsFromDaily(uid, dayKey, values, ts)`
- `listMeasurements(uid, type, { from, to, limit, cursor })`
- `createAffiliationRequest(patientUid, doctorUid, snapshot)`
- `acceptAffiliationRequest(requestId)` / `rejectAffiliationRequest(requestId)`
- `createConversation` / `addMessage` / `listMessages`
- `listRecipesByFilters` / `getRecipeOfTheDay`

## Compatibilité Dashboard Web

La structure V2 est optimisée pour :
- Pagination (`limit` + curseur `startAfter`)
- Graphiques par type (`measurements`)
- Snapshot patient lors des demandes d'affiliation
- Accès médecin sécurisé via `doctorAccess` + scopes

