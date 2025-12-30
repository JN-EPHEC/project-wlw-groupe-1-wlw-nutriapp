# Authentification Firebase dans NutriAdapt

Ce dossier résume les points d’intégration principaux pour l’authentification Firebase dans l’application React Native (Expo) NutriAdapt.

## 1. Initialisation Firebase

- **Fichier** : `services/firebase.ts`
- **Configuration** : `firebase_env.js` (non versionné en production, fournit `firebaseConfig`).
- **Exports** :
  - `auth` — instance Firebase Auth.
  - `db` — instance Firestore.

```ts
import { auth, db } from '@/services/firebase';
```

## 2. Services d’authentification (`services/authService.ts`)

Fonctions disponibles :

| Fonction | Description |
| --- | --- |
| `signUpWithEmail(email, password, userData?)` | Crée un utilisateur + document `users/{uid}`. |
| `signInWithEmail(email, password)` | Connexion classique email/mot de passe. |
| `signInWithGoogle(idToken)` | Connexion via jeton Google (expo-auth-session). |
| `signOut()` | Déconnexion de l’utilisateur courant. |
| `resetPassword(email)` | Envoi d’un email de réinitialisation. |
| `onAuthStateChange(callback)` | Écouteur temps réel de l’état d’authentification. |

Les erreurs Firebase sont normalisées via `AuthErrorCodes` pour fournir des messages prêts à afficher.

## 3. Authentification Google (`services/googleAuth.ts`)

- Utilise `expo-auth-session` pour lancer le flux Google.
- Le client par défaut est `733851079907-bjh187gghn3emjddgsvjo935c3c5f3cl.apps.googleusercontent.com` (remplaçable par `EXPO_PUBLIC_GOOGLE_CLIENT_ID`).
- Retourne `{ success, idToken?, error? }`.

Usage :

```ts
import { signInWithGoogleAsync } from '@/services/googleAuth';
import { signInWithGoogle } from '@/services/authService';

const googleResult = await signInWithGoogleAsync();
if (googleResult.success && googleResult.idToken) {
  await signInWithGoogle(googleResult.idToken);
}
```

## 4. Contexte d’authentification (`contexts/AuthContext.tsx`)

- Fournit `AuthProvider` pour l’arbre React Native.
- Méthodes exposées : `signup`, `login`, `logout`, `resetPassword`, `updateUserProfile`, `loadUserProfile`.
- Maintient `user`, `userProfile`, `loading`, `isLoggedIn`.

```tsx
import { AuthProvider } from '@/contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      {/* ... */}
    </AuthProvider>
  );
}
```

## 5. Hook utilitaire (`app/hooks/useFirebaseAuthListener.ts`)

Permet d’obtenir rapidement l’utilisateur courant et l’état d’initialisation sans passer par le contexte.

```ts
import useFirebaseAuthListener from '@/app/hooks/useFirebaseAuthListener';

const { user, initializing } = useFirebaseAuthListener();
```

## 6. Exemple de composant React Native

```tsx
import { useEffect } from 'react';
import { Alert, Button, Text, View } from 'react-native';

import useAuth from '@/app/hooks/useAuth';
import { signInWithEmail, signInWithGoogle, signUpWithEmail, signOut } from '@/services/authService';
import { signInWithGoogleAsync } from '@/services/googleAuth';

export function AuthDemo() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      console.log('Utilisateur courant', user?.uid ?? 'aucun');
    }
  }, [loading, user]);

  const handleEmailLogin = async () => {
    const result = await signInWithEmail('john.doe@example.com', 'password123');
    if (!result.success) {
      Alert.alert('Connexion', result.error ?? 'Erreur inconnue');
    }
  };

  const handleEmailSignup = async () => {
    const result = await signUpWithEmail('john.doe@example.com', 'password123', { firstName: 'John' });
    if (!result.success) {
      Alert.alert('Inscription', result.error ?? 'Erreur inconnue');
    }
  };

  const handleGoogle = async () => {
    const googleResult = await signInWithGoogleAsync();
    if (googleResult.success && googleResult.idToken) {
      const firebaseResult = await signInWithGoogle(googleResult.idToken);
      if (!firebaseResult.success) {
        Alert.alert('Google', firebaseResult.error ?? 'Erreur de connexion');
      }
    } else {
      Alert.alert('Google', googleResult.error ?? 'Connexion annulée');
    }
  };

  return (
    <View>
      <Text>{user ? `Connecté: ${user.email}` : 'Déconnecté'}</Text>
      <Button title="Connexion email" onPress={handleEmailLogin} />
      <Button title="Inscription email" onPress={handleEmailSignup} />
      <Button title="Connexion Google" onPress={handleGoogle} />
      <Button title="Déconnexion" onPress={() => signOut()} />
    </View>
  );
}
```

> ⚠️ Remplacez les identifiants en dur par des valeurs saisies via l’interface utilisateur avant intégration en production.

---

- Pour tester localement : `npm exec -- tsc --noEmit`
- Le routeur Expo (`app/index.tsx`) redirige vers `/(tabs)` si l’utilisateur est connecté et a complété l’onboarding, sinon vers `/onboarding`.
