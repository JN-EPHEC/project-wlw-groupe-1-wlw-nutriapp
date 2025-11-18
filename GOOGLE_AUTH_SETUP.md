# Configuration de l'authentification Google

## Étapes pour configurer Google Sign-In

### 1. Dans Firebase Console

1. Allez dans **Authentication** > **Sign-in method**
2. Activez **Google** comme méthode de connexion
3. Configurez le **Support email** et **Project support email**

### 2. Obtenir le Client ID Web

1. Dans Firebase Console, allez dans **Project Settings** > **General**
2. Faites défiler jusqu'à **Your apps**
3. Cliquez sur l'icône **</>** (Web app) si vous avez déjà une app web, sinon créez-en une
4. Copiez le **Client ID** (format: `XXXX-XXXX.apps.googleusercontent.com`)

### 3. Mettre à jour le code

Ouvrez `src/services/googleAuth.js` et remplacez :

```javascript
const clientId = '733851079907-XXXX.apps.googleusercontent.com'; // À remplacer
```

Par votre vrai Client ID :

```javascript
const clientId = 'VOTRE-CLIENT-ID.apps.googleusercontent.com';
```

### 4. Configuration dans Google Cloud Console (optionnel mais recommandé)

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Sélectionnez votre projet Firebase
3. Allez dans **APIs & Services** > **Credentials**
4. Vérifiez que votre Client ID OAuth 2.0 est configuré
5. Ajoutez les **Authorized redirect URIs** :
   - Pour développement: `exp://localhost:8081`
   - Pour production: votre URI de redirection Expo

### 5. Tester

Une fois configuré, l'authentification Google devrait fonctionner dans les pages de connexion et d'inscription.

**Note** : Pour le développement local, Expo utilise un proxy qui gère automatiquement les redirections OAuth.

