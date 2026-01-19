# 🔧 Résoudre l'erreur redirect_uri_mismatch

## ❌ Erreur actuelle
**Erreur 400 : redirect_uri_mismatch**

Cela signifie que l'URI de redirection utilisée par votre app ne correspond à aucune URI autorisée dans Google Cloud Console.

## ✅ Solution : Ajouter les Redirect URIs autorisées

### Étape 1 : Voir quelle URI est générée

1. Ouvrez la console du navigateur (F12)
2. Cliquez sur "S'inscrire avec Google"
3. Regardez dans la console, vous devriez voir : `🔵 Redirect URI: ...`
4. **Copiez cette URI** (elle ressemblera à quelque chose comme `https://auth.expo.io/@...` ou `http://localhost:8081`)

### Étape 2 : Ajouter l'URI dans Google Cloud Console

1. **Ouvrez** : https://console.cloud.google.com/apis/credentials?project=nutriadapt-c55e1

2. **Trouvez votre Client ID OAuth 2.0** (celui que vous avez créé : `733851079907-bjh187gghn3emjddgsvjo935c3c5f3cl`)

3. **Cliquez dessus** pour l'éditer

4. **Dans la section "Authorized redirect URIs"**, ajoutez les URIs suivantes :

   **Pour le développement web :**
   ```
   http://localhost:8081/oauth
   http://localhost:8081
   http://localhost:19006
   ```

   **Pour Expo (si vous utilisez Expo Go) :**
   ```
   https://auth.expo.io/@votre-username/Project-BA
   ```
   *(Remplacez `votre-username` par votre nom d'utilisateur Expo)*

  **Pour Expo Go (proxy Expo)**
  Ajoutez l'URI `https://auth.expo.io/@votre-username/Project-BA`.

  **Note**: `nutriadapt://oauth` n'est pas accepté comme redirect URI pour un client OAuth **Web application**.
  Pour du natif *standalone*, utilisez des client IDs Android/iOS.

   **Important :** Ajoutez aussi l'URI exacte que vous avez vue dans la console (celle qui commence par `https://auth.expo.io/...`)

5. **Cliquez sur "SAVE"** en bas de la page

### Étape 3 : Redémarrer et tester

1. Redémarrez le serveur Expo (`Ctrl+C` puis `npx expo start --clear`)
2. Testez à nouveau l'authentification Google

---

## 🔍 Comment trouver votre URI exacte

### Méthode 1 : Console du navigateur

1. Ouvrez la console (F12)
2. Cliquez sur "S'inscrire avec Google"
3. Cherchez le message : `🔵 Redirect URI: ...`
4. Copiez l'URI complète

### Méthode 2 : Vérifier dans le code

L'URI est générée par cette ligne dans `src/services/googleAuth.js` :
```javascript
const redirectUri = AuthSession.makeRedirectUri({
  scheme: 'nutriadapt',
  path: 'oauth',
});
```

Pour le web, Expo génère généralement :
- `http://localhost:8081` (développement local)
- `https://auth.expo.io/@username/project-slug` (Expo Go)

---

## 📝 Liste complète des URIs à ajouter

Ajoutez **TOUTES** ces URIs dans Google Cloud Console pour être sûr :

```
https://auth.expo.io/@votre-username/Project-BA
```

*(Remplacez `votre-username` par votre vrai nom d'utilisateur Expo)*

---

## ⚠️ Important

- Les URIs doivent correspondre **exactement** (pas d'espaces, pas de slash final inutile)
- Après avoir ajouté les URIs, attendez quelques secondes avant de tester
- Si vous testez sur mobile, vous aurez besoin d'autres URIs (voir documentation Expo)

---

## 🆘 Si ça ne fonctionne toujours pas

1. Vérifiez que vous avez bien sauvegardé dans Google Cloud Console
2. Vérifiez que vous utilisez le bon Client ID (celui de type "Web application")
3. Attendez 1-2 minutes pour que les changements se propagent
4. Redémarrez complètement le serveur Expo

