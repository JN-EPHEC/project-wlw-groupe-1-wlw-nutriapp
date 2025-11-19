# Configuration de l'authentification Google

## ⚠️ IMPORTANT : Résoudre l'erreur 401: invalid_client

Cette erreur signifie que le Client ID Google n'est pas correctement configuré.

## Étapes pour configurer Google Sign-In

### 1. Dans Firebase Console

1. Allez dans **Authentication** > **Sign-in method**
2. Activez **Google** comme méthode de connexion
3. Configurez le **Support email** et **Project support email**
4. **Sauvegardez** les modifications

### 2. Obtenir le Client ID Web (OAuth 2.0 Client ID)

**Méthode 1 : Depuis Firebase Console**
1. Allez dans **Project Settings** > **General**
2. Faites défiler jusqu'à **Your apps**
3. Si vous avez une app web, cliquez dessus
4. Sinon, créez une nouvelle app web (icône **</>**)
5. Dans la section **SDK setup and configuration**, cherchez **OAuth 2.0 Client ID**
6. Copiez le Client ID (format: `XXXX-XXXX.apps.googleusercontent.com`)

**Méthode 2 : Depuis Google Cloud Console**
1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Sélectionnez votre projet Firebase (`nutriadapt-c55e1`)
3. Allez dans **APIs & Services** > **Credentials**
4. Cherchez **OAuth 2.0 Client IDs**
5. Cliquez sur le Client ID de type **Web application**
6. Copiez le **Client ID** (format: `XXXX-XXXX.apps.googleusercontent.com`)

### 3. Configurer le Client ID

**Option A : Utiliser un fichier .env (recommandé)**

1. Créez un fichier `.env` à la racine du projet
2. Ajoutez :
```
EXPO_PUBLIC_GOOGLE_CLIENT_ID=VOTRE-CLIENT-ID.apps.googleusercontent.com
```
3. Redémarrez le serveur Expo

**Option B : Modifier directement le code**

Ouvrez `src/services/googleAuth.js` et remplacez :
```javascript
const clientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '733851079907-XXXX.apps.googleusercontent.com';
```

Par :
```javascript
const clientId = 'VOTRE-CLIENT-ID.apps.googleusercontent.com';
```

### 4. Configuration des redirect URIs (Google Cloud Console)

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Sélectionnez votre projet Firebase
3. Allez dans **APIs & Services** > **Credentials**
4. Cliquez sur votre **OAuth 2.0 Client ID** (type Web)
5. Dans **Authorized redirect URIs**, ajoutez :
   - `https://auth.expo.io/@votre-username/project-ba` (pour Expo Go)
   - `exp://localhost:8081` (pour développement local)
   - `nutriadapt://oauth` (votre scheme personnalisé)

### 5. Vérifier la configuration

- Le Client ID doit être celui de type **Web application**
- Le Client ID ne doit **PAS** contenir "XXXX"
- Le format doit être : `XXXX-XXXX.apps.googleusercontent.com`

### 6. Tester

Une fois configuré, redémarrez le serveur Expo et testez l'authentification Google.

**Note** : Pour le développement local, Expo utilise un proxy qui gère automatiquement les redirections OAuth.

