# 🚀 Configuration rapide Google Sign-In

## ⚡ Solution rapide (2 minutes)

### Étape 1 : Activer Google Sign-In dans Firebase

1. **Ouvrez** : https://console.firebase.google.com/project/nutriadapt-c55e1/authentication/providers
2. Cliquez sur **"Google"**
3. Activez le toggle **"Enable"**
4. Configurez le **Support email** (votre email)
5. Cliquez sur **"Save"**

### Étape 2 : Obtenir le Client ID (Méthode Google Cloud Console - RECOMMANDÉE)

**Cette méthode est plus fiable :**

1. **Ouvrez directement** : https://console.cloud.google.com/apis/credentials?project=nutriadapt-c55e1
2. Vous verrez la liste des **"OAuth 2.0 Client IDs"**
3. Cherchez celui de type **"Web application"** (ou **"Web client"**)
4. Si vous n'en voyez pas, cliquez sur **"+ CREATE CREDENTIALS"** > **"OAuth client ID"**
5. Sélectionnez **"Web application"** comme type
6. Donnez-lui un nom (ex: "NutriAdapt Web Client")
7. Cliquez sur **"CREATE"**
8. **Copiez** le **Client ID** qui s'affiche (format: `733851079907-XXXXXXXXXX.apps.googleusercontent.com`)

### Étape 3 : Alternative - Depuis Firebase Console

Si vous préférez utiliser Firebase Console :

1. **Ouvrez** : https://console.firebase.google.com/project/nutriadapt-c55e1/settings/general
2. Faites défiler jusqu'à **"Your apps"**
3. Si vous avez une app web, cliquez dessus
   - Sinon, cliquez sur l'icône **</>** pour créer une app web
4. Faites défiler jusqu'à la section **"SDK setup and configuration"**
5. Cherchez **"OAuth 2.0 Client ID"** ou **"Web client ID"**
6. Si vous ne le voyez pas, utilisez la méthode Google Cloud Console ci-dessus

### Étape 4 : Configurer le Client ID

**Option A : Fichier .env (recommandé)**

1. Créez un fichier `.env` à la racine du projet (même niveau que `package.json`)
2. Ajoutez cette ligne (remplacez `VOTRE-CLIENT-ID` par celui que vous avez copié) :
   ```
   EXPO_PUBLIC_GOOGLE_CLIENT_ID=VOTRE-CLIENT-ID.apps.googleusercontent.com
   ```
3. **Redémarrez** le serveur Expo (`Ctrl+C` puis `npx expo start --clear`)

**Option B : Modifier directement le code**

1. Ouvrez `src/services/googleAuth.js`
2. Trouvez la ligne 18 :
   ```javascript
   const clientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '733851079907-XXXX.apps.googleusercontent.com';
   ```
3. Remplacez `733851079907-XXXX.apps.googleusercontent.com` par votre vrai Client ID :
   ```javascript
   const clientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '733851079907-VOTRE-VRAI-CLIENT-ID.apps.googleusercontent.com';
   ```
4. **Redémarrez** le serveur Expo

### Étape 5 : Tester

1. Cliquez sur "S'inscrire avec Google" ou "Continuer avec Google"
2. Une fenêtre de connexion Google devrait s'ouvrir

---

## 🔍 Créer un nouveau Client ID OAuth 2.0 (si aucun n'existe)

Si vous ne trouvez aucun Client ID OAuth 2.0 :

1. **Ouvrez** : https://console.cloud.google.com/apis/credentials?project=nutriadapt-c55e1
2. Cliquez sur **"+ CREATE CREDENTIALS"** (en haut)
3. Sélectionnez **"OAuth client ID"**
4. Si c'est la première fois, configurez l'écran de consentement OAuth :
   - Cliquez sur **"CONFIGURE CONSENT SCREEN"**
   - Sélectionnez **"External"** (pour le développement)
   - Remplissez les champs obligatoires (App name, Support email, etc.)
   - Cliquez sur **"SAVE AND CONTINUE"** jusqu'à la fin
5. Retournez dans **"Credentials"** > **"+ CREATE CREDENTIALS"** > **"OAuth client ID"**
6. Sélectionnez **"Web application"**
7. Donnez un nom (ex: "NutriAdapt Web")
8. Cliquez sur **"CREATE"**
9. **Copiez** le Client ID affiché

---

## ⚠️ Important

- Le Client ID doit commencer par `733851079907-` (votre messagingSenderId)
- Le format complet est : `733851079907-XXXXXXXXXX.apps.googleusercontent.com`
- Ne partagez jamais votre Client ID publiquement

---

## 📚 Documentation complète

Pour plus de détails, consultez `GOOGLE_AUTH_SETUP.md`

