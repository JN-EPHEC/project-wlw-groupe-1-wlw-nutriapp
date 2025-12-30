# Audit du dépôt « NutriAdapt »

> Objectif : **analyser le code existant** (sans modifier le projet) et produire des constats actionnables.
>
> Périmètre : contenu du dossier `project-wlw-groupe-1-wlw-nutriapp-1/` (application Expo Router principale, application Web Vite sous `src/`, sous-projet `NutriadaptAppMobile/`, et documents).

## 1) Résumé exécutif

Le dépôt regroupe **plusieurs applications** et couches techniques :

- **App mobile principale** basée sur **Expo + expo-router** (entrée déclarée dans `package.json`: `"main": "expo-router/entry"`) avec routes dans `app/`.
- **Une autre app/entrée “legacy”** `App.js` qui utilise React Navigation directement (flux différent, splash différent, écrans dupliqués).
- **Une application Web Vite** sous `src/` (présence de `vite.config.ts`, `index.html`, `src/main.tsx`), très probablement un prototype/POC.
- **Un sous-projet mobile séparé** `NutriadaptAppMobile/` avec sa propre arborescence, navigation, contextes.

Conséquence : la lisibilité, le build, le typage, la sécurité et la maintenance sont plus complexes car des fonctionnalités similaires existent en double (voire triple).

## 2) Cartographie rapide (multi-app)

### 2.1 App Expo Router (principale)

- Routes : `app/_layout.tsx`, `app/index.tsx`, `app/(tabs)/_layout.tsx`, etc.
- Auth et profil : `contexts/AuthContext.tsx`, `services/authService.ts`, `services/userService.ts`, `services/firebase.ts`, `services/googleAuth.ts`.

### 2.2 Entrée alternative `App.js` (legacy)

- Navigation React Navigation “classique” (Stack + Tab), splash timer, flux onboarding et écrans auth.
- Coexistence avec expo-router : risque de confusion sur “la vraie app” et de code mort.

### 2.3 App Web Vite (`src/`)

- `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`.
- Plusieurs composants UI (ex: `src/components/ui/chart.tsx`) suggèrent un portage web/POC.

### 2.4 Sous-projet `NutriadaptAppMobile/`

- Projet Expo distinct avec `NutriadaptAppMobile/package.json` et code sous `NutriadaptAppMobile/src`.

## 3) Sécurité & données (principaux risques)

### 3.1 Secret/config Firebase versionnée (risque élevé)

**Constat**
- Le fichier `firebase_env.js` contient une configuration Firebase complète avec notamment `apiKey`.

**Preuve**
- `firebase_env.js` :
  - `apiKey: 'AIzaSy...'
  - `authDomain`, `projectId`, etc.
- `services/firebase.ts` charge ce fichier (`require('@/firebase_env')`).

**Risque**
- Une `apiKey` Firebase n’est pas un “secret” au sens cryptographique, mais elle facilite :
  - l’énumération du projet,
  - le ciblage d’abus si les règles Firestore/Storage sont trop permissives,
  - la réutilisation involontaire de la conf prod en dev.

**Recommandations (sans modifier le code)**
- Ne pas versionner la config d’environnement active.
- Utiliser un fichier d’exemple (déjà présent : `firebase_env.example.js`) + un mécanisme de variables d’environnement.
- Vérifier/resserrer **Firestore Rules** et **Storage Rules** côté Firebase Console.

### 3.1 bis Règles Firebase non présentes dans le dépôt (risque élevé)

**Constat**
- Aucun fichier de règles Firestore/Storage n’est présent dans le dépôt (ex: `firestore.rules`, `storage.rules`).

**Impact**
- L’audit ne peut pas confirmer si les règles sont strictes (principe du moindre privilège) ou trop permissives.
- Combiné à la présence d’une config Firebase versionnée (`firebase_env.js`), cela augmente le risque opérationnel : si les règles sont faibles, un tiers peut lire/écrire des données.

**Recommandations**
- Ajouter les règles au dépôt (et/ou les synchroniser via la CLI Firebase) afin de pouvoir les auditer/reviewer.
- Documenter explicitement le modèle d’autorisation : qui peut lire/écrire quoi, et sous quelles conditions.

### 3.2 OAuth / Redirect URI : complexité + risque de mauvaise config

**Constat**
- `services/googleAuth.ts` utilise `AuthSession.makeRedirectUri({ scheme: 'nutriadapt', path: 'oauth' })`.
- Le prompt utilise `{ useProxy: true }`.
- Le projet contient un guide `FIX_REDIRECT_URI.md` listant plusieurs URIs (localhost, expo proxy, scheme custom).

**Risque**
- Erreurs fréquentes `redirect_uri_mismatch`.
- Les URIs multiples peuvent amener à accepter des redirections trop larges côté Google Cloud Console.

**Recommandations**
- Maintenir une liste stricte d’URIs autorisées par environnement (dev/staging/prod).
- Documenter clairement le mode Expo Go vs build standalone.

### 3.3 Données Firestore : modèle + concurrence (risque moyen)

**Constat**
- `services/userService.ts` stocke des séries de mesures santé dans des **tableaux** dans `users/{uid}.health.{type}`.
- `addHealthMeasurement` fait : `getDoc` → `measurements.push(...)` → `updateDoc` (write d’un tableau complet).

**Risques**
- Concurrence : deux écritures proches peuvent se marcher dessus (lost update).
- Taille doc : risque de dépasser la limite Firestore (document trop gros) si l’historique grandit.

**Recommandations**
- Modéliser les mesures en **sous-collection** (ex: `/users/{uid}/measurements/{measurementId}`), ou utiliser une stratégie de rollup.
- Si conservé en tableau : utiliser des primitives Firestore adaptées (ex: `arrayUnion`) et des garde-fous.

### 3.4 Stockage local : effacement global (risque faible à moyen)

**Constat**
- `contexts/AuthContext.tsx` utilise `AsyncStorage.clear()` lors du logout.

**Risque**
- Efface des données non liées à l’auth (préférences, cache, onboarding, flags), ce qui peut dégrader l’expérience utilisateur et compliquer un futur multi-compte.

**Recommandations**
- Supprimer uniquement les clés appartenant à l’app (namespace) ou celles liées à la session.

### 3.5 Logging d’erreurs (risque faible)

**Constat**
- Plusieurs `console.error(...)` avec l’objet d’erreur complet (ex: `services/userService.ts`, `services/authService.ts`).
- Au moins un `console.log` de données potentiellement sensibles apparaît dans le code web/prototype (`src/components/patient/HealthTracking.tsx` logge `New health data`).

**Risque**
- En prod, des erreurs peuvent contenir des messages internes, IDs, ou détails non souhaités.

**Recommandations**
- Normaliser le logging et éviter les dumps complets en prod (niveau debug vs prod).

### 3.6 Ressources externes (dépendances runtime à Internet)

**Constat**
- Plusieurs écrans utilisent des images distantes (principalement `images.unsplash.com`) dans :
  - `app/screens/WelcomeScreen.tsx`, `app/screens/main/HomeScreen.tsx`, `app/data/recipes.ts`
  - `src/components/patient/*` et `NutriadaptAppMobile/src/data/recipes.ts`

**Risques**
- Confidentialité : fuite potentielle de métadonnées (IP, user-agent) vers un tiers lors du chargement d’images externes.
- Disponibilité : UI dégradée si hors-ligne, rate-limit, ou changement d’URL.

**Recommandations**
- Héberger les images dans les assets de l’app ou via un CDN maîtrisé.
- Prévoir un fallback/offline-first (placeholder local).

## 4) Qualité, maintenabilité, dette technique

### 4.1 Deux systèmes de navigation + duplication d’écrans

**Constat**
- expo-router (`app/`) et React Navigation via `App.js` coexistent.

**Impacts**
- Les nouveaux développeurs ne savent pas quelle entrée est “source of truth”.
- Risque d’incohérences fonctionnelles (onboarding/auth/splash en double).

**Recommandations**
- Clarifier dans le README “l’app active” (entrypoint) et archiver/supprimer le legacy après validation.

### 4.2 TypeScript : périmètre de typecheck incomplet

**Constat**
- `tsconfig.json` exclut `src/` et `NutriadaptAppMobile/`.

**Impact**
- Une partie du code n’est potentiellement jamais vérifiée par le typecheck principal.

**Recommandations**
- Soit isoler proprement ces apps en workspaces/monorepo,
- soit ajouter des tsconfigs dédiés par sous-projet.

### 4.3 Données mockées / divergence entre UI et backend (risque moyen)

**Constat**
- Plusieurs écrans utilisent des datasets locaux/mockés (ex: `app/(tabs)/health.tsx` avec `glucoseData` et `weeklyAverage` hardcodés ; de nombreux composants sous `src/components/*` utilisent des données statiques).
- En parallèle, le backend Firestore expose des APIs de mesures (`services/userService.ts`: `addHealthMeasurement`, `getHealthMeasurements`).

**Impact**
- Risque de “fausse complétude” : l’UI semble fonctionnelle mais n’est pas branchée sur les vraies données.
- Risque de duplication de modèle (types/structures) entre écrans et services.

**Recommandations**
- Définir un contrat unique de données (types TS partagés) et brancher les écrans sur les services.
- Prévoir des écrans/états de chargement/erreur, pas uniquement des mocks.

### 4.4 Anti-patterns/perf potentiels dans certains écrans

**Constats (exemples)**
- `app/(tabs)/health.tsx` calcule `Math.max(...glucoseData.map(...))` directement au rendu. Si `glucoseData` devient dynamique et vide, `Math.max(...[])` retourne `-Infinity` (edge case).
- Plusieurs écrans font des rendus de listes/graphes en `map()` dans un `ScrollView` (ex: graphiques en barres). Si les datasets grandissent, cela peut impacter les performances.

**Recommandations**
- Ajouter des garde-fous pour les listes vides + calculs dérivés (ex: valeur par défaut, `useMemo`).
- Utiliser `FlatList`/virtualisation lorsque les listes peuvent devenir longues.

### 4.3 Composant web avec `dangerouslySetInnerHTML`

**Constat**
- `src/components/ui/chart.tsx` utilise `dangerouslySetInnerHTML` pour injecter du CSS.

**Risque**
- Si l’entrée `config` devient user-controlled, possibilité d’injection CSS/HTML (sur web).

**Notes**
- Tel que codé, la source est du code applicatif, pas de l’input utilisateur (risque faible), mais le pattern mérite une attention.

### 4.4 Typage permissif (`any`, `@ts-ignore`) (risque faible à moyen)

**Constat**
- Plusieurs fichiers utilisent `any` (ex: `services/*`, `contexts/AuthContext.tsx`, et du code dans `NutriadaptAppMobile/*`).
- Présence de `@ts-ignore` (ex: `NutriadaptAppMobile/src/screens/auth/ForgotPasswordScreen.tsx`).

**Impact**
- Masque des erreurs de contrat (notamment sur les structures Firestore et navigation).
- Rend plus difficile la refactorisation et la maintenance.

**Recommandations**
- Remplacer progressivement `any` par des types explicites (types Firestore, types navigation, types de profil).
- Remplacer `@ts-ignore` par des solutions typées (wrappers, composants adaptés, ou casts documentés).

## 5) Recommandations prioritaires (triées)

### Priorité A (à traiter en premier)
- Sortir `firebase_env.js` du contrôle de version, basculer vers un mécanisme de config par environnement.
- Vérifier et durcir les règles Firestore/Storage (sinon la `apiKey` rend le projet plus facilement attaquable).
- Clarifier l’architecture multi-app : Expo Router vs `App.js` vs Vite vs `NutriadaptAppMobile/`.

### Priorité B
- Revoir le modèle Firestore des mesures (sous-collections / pagination / rollups) pour éviter “doc trop gros” + concurrence.
- Normaliser logging et gestion d’erreur en prod.

### Priorité C
- Réduire les duplications d’écrans et rationaliser la navigation.
- Mettre en place une stratégie de typecheck/lint par sous-projet.

## 6) Annexes (références de fichiers)

- Secrets/config : `firebase_env.js`, `firebase_env.example.js`, `services/firebase.ts`
- OAuth : `services/googleAuth.ts`, `FIX_REDIRECT_URI.md`, `GOOGLE_AUTH_SETUP.md`
- Données utilisateur : `services/userService.ts`, `contexts/AuthContext.tsx`
- Expo Router : `app/_layout.tsx`, `app/index.tsx`, `app/(tabs)/_layout.tsx`
- Legacy navigation : `App.js`, `app/navigation/AppNavigator.tsx`
- Web Vite : `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`

