# Refactor routing (expo-router) — suppression des routes parasites

## Objectif
- Corriger la navigation de fin d’onboarding (bouton **Terminer**) qui tentait un `RESET` vers une route React Navigation (`Main`) non gérée par expo-router.
- Supprimer les warnings/erreurs expo-router du type “missing default export” causés par des *écrans composants* placés sous `app/` et donc interprétés comme des routes.

## Changements principaux

### 1) Fix onboarding: “Terminer”
- L’écran d’onboarding utilisait une navigation React Navigation (`navigation.reset({ routes: [{ name: 'Main' }] })`).
- Avec expo-router, la navigation doit se faire via `router.replace('/(tabs)')`.

Résultat: la fin d’onboarding redirige maintenant correctement vers les tabs.

### 2) Déplacement des écrans “composants” hors de `app/`
Avec expo-router, tout fichier `.tsx` sous `app/` peut être traité comme une route. Les écrans UI qui ne sont pas des routes **doivent vivre hors `app/`**, sinon expo-router exige un `export default` et affiche des warnings.

- Les écrans précédemment dans `app/screens/**` ont été déplacés dans `screens/**`.
- Les routes expo-router (dans `app/`) continuent d’exister mais importent maintenant les composants depuis `screens/**`.

Structure cible:
- `app/` : routes expo-router uniquement (`index.tsx`, `login.tsx`, `onboarding.tsx`, `/(tabs)/*`, etc.)
- `screens/` : composants d’écrans (auth, onboarding, main)

### 3) Navigation legacy ignorée par expo-router
Le dossier `app/navigation` contenait du code React Navigation (non-route). Pour éviter qu’expo-router le scanne comme route parasite, il a été renommé:
- `app/navigation` → `app/_navigation`

> Convention expo-router: les dossiers commençant par `_` sont ignorés.

## Fichiers impactés (principaux)

### Routes expo-router mises à jour
- `app/index.tsx` : imports `SplashScreen`/`WelcomeScreen` depuis `screens/auth/*`
- `app/login.tsx`, `app/signup.tsx`, `app/forgot-password.tsx` : imports auth depuis `screens/auth/*`
- `app/onboarding.tsx` : import `OnboardingFlow` depuis `screens/onboarding/OnboardingFlow`
- `app/(tabs)/*.tsx` : re-exports depuis `screens/main/*`

### Composants déplacés
- `screens/auth/*`
- `screens/onboarding/*`
- `screens/main/*`

### Nettoyage
- Suppression de `app/screens/**` (source principale des warnings de routes parasites)

## Notes
- `App.js` (React Navigation legacy) a aussi été mis à jour pour pointer vers les nouveaux chemins (`screens/*` et `app/_navigation/*`).
- Si vous n’utilisez plus du tout `App.js` (car expo-router démarre via `app/_layout.tsx`), il peut rester comme legacy sans impacter expo-router.
