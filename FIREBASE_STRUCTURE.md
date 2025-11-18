# Structure Firebase - NutriApp

## Architecture des données patient

Toutes les données sont structurées pour être facilement exploitables dans un futur dashboard web pour les professionnels de santé.

### Structure Firestore

```
users/
  {userId}/
    profile/
      age: number
      weight: number
      sex: string ('M' | 'F' | 'A')
      allergies: string[]
      objectives: string[]
    health/
      glycemia: [
        {
          value: number,
          date: timestamp
        },
        ...
      ]
      tension: [
        {
          systolic: number,
          diastolic: number,
          date: timestamp
        },
        ...
      ]
      weightHistory: [
        {
          value: number,
          date: timestamp
        },
        ...
      ]
      calories: [
        {
          value: number,
          date: timestamp
        },
        ...
      ]
    stats/
      lastUpdate: timestamp
```

## Services disponibles

### `src/services/userService.js`

- `createPatientProfile(userId, profileData)` - Crée le profil initial
- `getPatientProfile(userId)` - Récupère le profil complet
- `updatePatientProfile(userId, profileData)` - Met à jour le profil
- `addHealthMeasurement(userId, type, value, additionalData)` - Ajoute une mesure
- `getHealthMeasurements(userId, type)` - Récupère les mesures d'un type

## Compatibilité Dashboard Web

La structure est optimisée pour :
- Requêtes par date (timestamps)
- Agrégations (moyennes, tendances)
- Export de données
- Visualisations graphiques

Les données sont normalisées et indexées pour des performances optimales dans un tableau de bord web.

