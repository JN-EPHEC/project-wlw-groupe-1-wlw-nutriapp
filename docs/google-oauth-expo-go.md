# Google OAuth sur Expo Go (Android) — mémo

## Symptôme
- Sur Expo Go, Google affiche **Erreur 400** (invalid_request / redirect_uri_mismatch).
- La cause initiale était un `redirect_uri` en `exp://...` (Google n’accepte pas `exp://` pour un client OAuth de type Web).

## Changements faits dans le code

### 1) Forcer un redirect URI proxy HTTPS (Expo Go)
- Fichier: [services/googleAuth.ts](../services/googleAuth.ts)
- Objectif: en Expo Go, utiliser `https://auth.expo.io/@owner/slug` (jamais `exp://...`).
- Comportement:
  - Si `@owner/slug` est inconnu, la fonction retourne une erreur explicite (au lieu de partir sur un redirect `exp://`).
  - Si Expo renvoie quand même `exp://...`, on force `https://auth.expo.io/@owner/slug`.

### 2) Définir l’owner Expo pour calculer `auth.expo.io`
- Fichier: [app.json](../app.json)
- Ajout: `"owner": "kazmiaf"`

## État vérifié (logs Metro)
- `projectNameForProxy: @kazmiaf/Project-BA`
- `redirectUri: https://auth.expo.io/@kazmiaf/Project-BA`
- `client_id: 733851079907-bjh187gghn3emjddgsvjo935c3c5f3cl.apps.googleusercontent.com`

## Config Google Cloud à faire (ou revérifier)
Dans Google Cloud Console → **API et services → Identifiants** → OAuth 2.0 Client ID (type **Application Web**) correspondant au `client_id` ci-dessus:
- **Authorized redirect URIs** doit contenir EXACTEMENT:
  - `https://auth.expo.io/@kazmiaf/Project-BA`

Notes:
- Ça peut prendre quelques minutes à se propager.
- Vérifier qu’on est sur le bon projet Google Cloud.

## Test demain
1. Redémarrer Expo: `npx expo start --clear`
2. Ouvrir Expo Go et retester Google Sign-In.
3. Si erreur:
   - faire une capture de l’erreur (elle affiche `redirect_uri=...` et `client_id=...`)
   - copier aussi les logs Metro `[GoogleAuth] ... redirectUri: ...`

