# 📱 NutriAdapt — Documentation complète

## 1. Vue d'ensemble du projet

NutriAdapt est une application mobile de suivi santé pensée pour les patients diabétiques et, plus largement, pour toute personne souhaitant améliorer son alimentation. L'expérience utilisateur est entièrement francophone, s'appuie sur un design system professionnel inspiré des maquettes Figma, et s'articule autour d'un parcours simple allant de la découverte de l'application à un accompagnement quotidien personnalisé.

### Objectifs clés
- Proposer un suivi nutritionnel et santé adapté au profil de chaque patient.
- Permettre une authentification fluide (email/mot de passe + Google) et un onboarding guidé en quatre étapes.
- Offrir des fonctionnalités quotidiennes : recettes personnalisées, suivi des indicateurs vitaux, échanges avec un médecin et conseils IA.
- Garantir une cohérence visuelle forte sur l'ensemble de l'application grâce à un design system strict.

### Technologies principales
| Domaine | Outils / bibliothèques |
| --- | --- |
| Framework | Expo (React Native) avec TypeScript |
| Navigation | Expo Router (fichiers `app/`) |
| Styles globaux | Design tokens inspirés Tailwind CSS v4 (sans `tailwind.config.js`) appliqués en style React Native |
| Icônes | `@expo/vector-icons` (Ionicons) côté mobile, équivalent Lucide (spécification UI) |
| Graphiques | Recharts (spécification UI web) \* |
| Animations | `react-native-reanimated`, `react-native-animatable` ou `moti` (selon besoins), équivalent Motion/React |
| Authentification | Firebase Authentication (email & Google) |
| Données | Contexte `AuthContext` + services Firebase |

> \* Les maquettes fonctionnelles mentionnent Recharts (web). Pour l'application Expo, prévoir une alternative native (ex. `react-native-svg-charts`) ou un wrapper WebView si nécessaire.

## 2. Design system complet

Le design system définit les fondations visuelles et interactionnelles. Il est décrit via des tokens à respecter strictement.

### 2.1 Palette de couleurs

```css
/* Couleurs principales */
--primary-green: #1DBF73;          /* Vert principal */
--primary-green-dark: #0F8F55;     /* Hover / actif */
--primary-green-pastel: #DCF9EA;   /* Fonds pastel */

/* Couleurs secondaires */
--accent-lavender: #8F9BFF;        /* Accents secondaires */
--orange-pastel: #FFE8CC;          /* Allergies (fond) */
--orange-text: #F59E0B;            /* Allergies (texte) */

/* Nuances de gris */
--gray-900: #1A1A1A;               /* Texte principal */
--gray-600: #6C6C6C;               /* Texte secondaire */
--gray-300: #E5E5E5;               /* Bordures */
--gray-100: #F8F8F8;               /* Fonds clairs */
--white: #FFFFFF;                  /* Blanc pur */

/* États */
--error-red: #EF4444;
--info-blue: #5B8DEF;
--info-blue-dark: #4A7FDB;
```

### 2.2 Typographie (Inter)

> **Règle essentielle** : ne jamais utiliser de classes Tailwind pour `font-size`, `font-weight` ou `line-height` (ex. `text-2xl`, `font-bold`, `leading-none`) sans demande explicite. Les valeurs ci-dessous constituent la seule référence.

| Usage | Taille | Poids | Line-height | Letter-spacing |
| --- | --- | --- | --- | --- |
| H1 | 28 px | 700 | 1.3 | -0.02 em |
| H2 | 24 px | 600 | 1.3 | -0.01 em |
| H3 | 20 px | 600 | 1.4 | 0 |
| H4 | 16 px | 600 | 1.5 | 0 |
| Body 1 | 16 px | 400 | 1.5 | 0 |
| Body 2 | 14 px | 400 | 1.5 | 0 |
| Labels | 14 px | 500 | 1.5 | 0 |
| Boutons | 16 px | 500 | 1.5 | 0 |

### 2.3 Tokens d'espacement, rayons et ombres

```css
--radius-unified: 12px;
--shadow-unified: 0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px 0 rgba(0, 0, 0, 0.04);
--padding-unified: 16px;

/* Échelles d'espacement */
--space-sm: 16px;
--space-md: 24px;
--space-lg: 32px;
```

### 2.4 Composants standards

| Composant | Spécifications |
| --- | --- |
| Boutons principaux | `height: 48px`, `border-radius: 12px`, `background: #1DBF73`, `hover: #0F8F55`, `shadow: shadow-unified` |
| Cartes | `border-radius: 12px`, `padding: 24px`, ombre `shadow-unified`, pas de bordure |
| Badges santé | `height: 28px`, `border-radius: 999px`, `background: #DCF9EA`, `color: #0F8F55` |
| Badges allergies | `height: 28px`, `border-radius: 999px`, `background: #FFE8CC`, `color: #F59E0B` |
| Inputs | `height: 48px`, `border-radius: 12px`, `border-color: #E5E5E5`, `background: #FFFFFF`

### 2.5 Icônes et illustrations

- Icônes : pack Lucide React (web) ou Ionicons / IconSymbol (Expo) selon plateforme.
- Images : toujours passer par `ImageWithFallback` (fichier protégé) pour les nouveaux visuels.
- Illustrations/avatars : conserver un style flat et cohérent.

## 3. Architecture de l'application

### 3.1 Vue haute

```
/
├── app/                     # Navigation Expo Router
│   ├── index.tsx            # Écran Welcome / redirection auth
│   ├── login.tsx, signup.tsx, oauth.tsx, modal.tsx
│   └── (tabs)/              # Tabs authentifiés
│       ├── index.tsx        # Accueil
│       ├── recipes/         # Stack recettes
│       ├── health.tsx       # Suivi santé
│       └── profile.tsx      # Profil patient
├── components/              # UI réutilisable Expo
├── contexts/AuthContext.tsx # Contexte d'authentification
├── services/                # Firebase, Google Auth, utilisateurs
├── hooks/useAuth.ts         # Hook d'accès au contexte
├── constants/               # Thème et tokens Expo
├── docs/                    # Documentation projet (présent fichier)
└── ...
```

### 3.2 Référentiel design (spécification web)

Le cahier des charges initial prévoyait une structure de type web (React + Tailwind), reprise ici pour mémoire. Certaines composantes (ex. `styles/globals.css` ou `components/ui/`) servent de référence en matière de design et peuvent inspirer les implémentations Expo.

## 4. Flux utilisateur complet

1. **Splash Screen (`SplashScreen.tsx`)**
   - Durée : 2,5 s
   - Fond dégradé vert `from-[#1DBF73] to-[#0F8F55]`
   - Logo animé (rebond) + tagline « Votre santé, adaptée à votre rythme. »

2. **Authentification (`WelcomeScreen.tsx`, `AuthScreen.tsx`, `ForgotPasswordScreen.tsx`)**
   - Modes Connexion / Inscription avec validations strictes
   - Connexion : email + mot de passe + bouton Google + lien mot de passe oublié
   - Inscription : email + mot de passe + confirmation + RGPD obligatoire

3. **Onboarding en 4 étapes (`OnboardingFlow.tsx`)**
   - Étape 1 : informations de base (âge, sexe, taille, poids, activité)
   - Étape 2 : santé (pathologies, allergies)
   - Étape 3 : objectifs (5 objectifs standard)
   - Étape 4 : préférences (consentements, notification, note légale)
   - Header commun : logo, indicateur de progression dynamique, navigation retour dès l'étape 2

4. **Application principale (`PatientApp.tsx`)**
   - Navigation à onglets : Accueil, Assistant, Recettes, Santé, Profil
   - Barre d'onglets fixe (64px) avec icônes (24px), labels `text-xs font-medium`

## 5. Écrans détaillés

### 5.1 Accueil (`HomeScreen.tsx`)
- **Header** : dégradé vert, logo à gauche, avatar bouton profil à droite, salutation « Bonjour ! 👋 »
- **Statistiques santé** : 3 cartes (Calories, Eau, Activité) avec icônes et valeurs
- **Graphique hebdo** : barres (Lun→Dim) + moyenne + barre de progression
- **Recette du jour** : grande carte avec image, badge « ⭐ Recette du jour », CTA « Voir la recette »
- **Actions rapides** : bouton « Conseils IA » (dégradé bleu) + grille 2 colonnes (Mes recettes, Mes objectifs)
- **Recommandations santé** : carte fond vert pastel, rappel RGPD nutritionnel

### 5.2 Assistant IA (`AIAssistantPage.tsx`)
- Header dégradé bleu, titre « Assistant IA »
- Messages IA vs utilisateur différenciés (avatar, bulles, couleurs)
- Suggestions initiales + message IA de bienvenue
- Traitement des mots-clés (« glycémie », « petit-déjeuner », « eau », « recette »…)
- Input fixe en bas, bouton Send bleu (désactivé pendant `typing`)

### 5.3 Recettes (`RecipesList.tsx`)
- Header titre + compteur + bouton Favoris
- Recherche + bouton filtres (`FilterPanel.tsx`)
- Onglets « Toutes / Catégories / Favoris »
- Pills catégories quand onglet « Catégories » actif
- Grille 2 colonnes (12 recettes complètes en données mock)
- Chaque carte : image 180px, overlay favoris, stats nutrition, notation, tags santé

### 5.4 Détail recette (`RecipeDetail.tsx`)
- Header image (288px) avec gradient noir et boutons retour/favori
- Informations générales, tags santé, tableau nutrition, liste ingrédients FR, étapes numérotées
- Bouton « Commencer la recette » ouvrant `RecipeTimer`

### 5.5 Santé (`HealthTracking.tsx`)
- Header dégradé vert + CTA (« Encoder mes données », « Chat avec mon médecin »)
- Alertes si valeurs anormales
- Statistiques rapides (Glycémie, Poids, Eau, Activité)
- Onglets métriques + graphiques Recharts (glycémie, poids, eau)
- Valeurs anormales listées sous le graphique
- `DataEntryForm` : modal de saisie adaptée par métrique
- `DoctorChat` : modal chat médecin

### 5.6 Profil (`ProfileScreen.tsx`)
- Header dégradé vert, avatar + email, bouton édition
- Section médecin (aucun / en attente / accepté) avec états visuels distincts
- Informations personnelles (âge, sexe, taille, poids) + carte IMC colorimétrique
- Pathologies et allergies (badges verts / orange)
- Objectifs (liste à puces fixes)
- Paramètres (Notifications, Confidentialité)
- Actions : « Se déconnecter », « Supprimer mon compte » (`DeleteAccountModal`)

## 6. Modals et composants secondaires

| Composant | Description |
| --- | --- |
| `FilterPanel.tsx` | Filtres multi-critères pour les recettes |
| `RecipeTimer.tsx` | Timer modal (start/stop/reset) pour la préparation |
| `AIChat.tsx` | Vue de conversation IA réutilisable |
| `DataEntryForm.tsx` | Formulaire multi-métriques (glycémie, poids, eau) |
| `DoctorChat.tsx` | Chat médecin (avatar stéthoscope) |
| `EditProfileModal.tsx` | Mise à jour des infos (photo, âge, taille, poids, activité) |
| `EditGoalsModal.tsx` | Sélection des 5 objectifs standard |
| `DeleteAccountModal.tsx` | Confirmation forte, input email obligatoire |
| `DoctorSelectionModal.tsx` | Sélection médecin (6 profils mock, filtres ville) |
| `NotificationsScreen.tsx` | Switches pour notifications push |
| `PrivacyScreen.tsx` | Contenu informatif RGPD |

## 7. Structures de données

```typescript
interface UserProfile {
  age?: number;
  gender?: 'male' | 'female' | 'other';
  height?: number;
  weight?: number;
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  conditions?: string[];          // 'diabetes', 'pre-diabetes', 'none', ...
  allergies?: string[];           // 'gluten', 'lactose', 'vegetarian', 'vegan', 'none'
  goals?: string[];               // 'stabilize-glucose', ...
  dataSharing?: boolean;
  healthNotifications?: boolean;
  profilePhoto?: string;
  doctor?: Doctor;
  doctorRequestStatus?: 'none' | 'pending' | 'accepted' | 'rejected';
}

interface Recipe {
  id: string;
  title: string;
  image: string;
  time: number;
  calories: number;
  tags: string[];
  favorite: boolean;
  protein: number;
  carbs: number;
  fat: number;
  sodium: number;
  ingredients: string[];
  steps: string[];
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  description?: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  city: string;
  rating: number;
  reviewCount: number;
  avatar?: string;
  distance?: string;
}
```

## 8. Ordre de création recommandé

1. **Configuration** : `styles/globals.css`, `App.tsx`, composants `ui/`, `Logo.tsx`, `ImageWithFallback.tsx`
2. **Auth** : `SplashScreen.tsx`, `WelcomeScreen.tsx`, `ForgotPasswordScreen.tsx`, `OnboardingFlow.tsx`
3. **Navigation** : `PatientApp.tsx`
4. **Écrans principaux** : Home, RecipesList, RecipeDetail, HealthTracking, Profile, AIAssistantPage
5. **Composants secondaires** : FilterPanel, RecipeTimer, AIChat, DataEntryForm, DoctorChat, EditProfileModal, EditGoalsModal, DeleteAccountModal, DoctorSelectionModal, NotificationsScreen, PrivacyScreen

## 9. Points critiques à respecter

### À ne jamais faire
- ❌ Utiliser des classes Tailwind pour gérer tailles/polices/line-height
- ❌ Créer un fichier `tailwind.config.js`
- ❌ Modifier `components/figma/ImageWithFallback.tsx`
- ❌ Employer des images sans passer par `ImageWithFallback`
- ❌ Traduire ou modifier les 5 objectifs standards
- ❌ Laisser des ingrédients en anglais

### À toujours faire
- ✅ `border-radius: 12px (rounded-xl)`
- ✅ Appliquer `shadow-unified` sur boutons/cartes
- ✅ Respecter la palette et la typo officielles
- ✅ Utiliser les icônes Lucide / Ionicons cohérentes
- ✅ Rester en français
- ✅ Utiliser des espacements de 16px/24px
- ✅ Boutons et inputs `height: 48px` minimum

## 10. Fonctionnalités spéciales & comportements

- **Animations Motion/React** : splash rebond, transitions de page, hover cards.
- **Responsive** : mobile-first, breakpoint `sm` à 640px, safe area devices.
- **Mock data** : 12 recettes complètes (ingrédients FR), 6 médecins, séries santé 7 jours, réponses IA intelligentes.
- **Images** : fallback gradient `from-[#9CA0B0] to-[#7B7F94]`.

## 11. Textes standardisés

### Objectifs (immuables)
- Stabiliser ma glycémie
- Perdre du poids
- Maintenir mon poids
- Prendre du poids
- Améliorer mon alimentation

### Messages d'erreur
- Veuillez remplir tous les champs
- Le mot de passe doit contenir au moins 6 caractères
- Les mots de passe ne correspondent pas
- Veuillez accepter les conditions RGPD

### Messages informatifs
- NutriAdapt respecte votre vie privée. Vos données de santé sont chiffrées et ne seront jamais vendues à des tiers.
- Toutes nos recettes sont adaptées à votre profil de santé pour vous accompagner au mieux dans votre parcours nutritionnel.
- Le médecin recevra votre demande et pourra l'accepter ou la refuser.

## 12. Carte des couleurs par usage

| Usage | Couleur | Code |
| --- | --- | --- |
| Boutons principaux | Vert | `#1DBF73` (hover `#0F8F55`) |
| Fonds verts | Vert pastel | `#DCF9EA` |
| Badges santé | Texte `#0F8F55` / fond `#DCF9EA` | — |
| Badges allergies | Texte `#F59E0B` / fond `#FFE8CC` | — |
| Assistant IA | Dégradé bleu | `from-[#5B8DEF] to-[#4A7FDB]` |
| Texte principal | Noir | `#1A1A1A` |
| Texte secondaire | Gris | `#6C6C6C` |
| Bordures | Gris clair | `#E5E5E5` |
| Fonds généraux | Gris très clair | `#F8F8F8` |
| États d'erreur | Rouge | `#EF4444` |

## 13. Mise en route & commandes utiles

### Installation des dépendances

```bash
npm install
```

### Lancement de l'application Expo

```bash
npm run start
```

### Vérification TypeScript

```bash
npx tsc --noEmit
```

## 14. Suivi de mise en œuvre (checklist)

- [ ] Splash écran fonctionnel avec animation
- [ ] Authentification email + Google + validations FR
- [ ] Onboarding 4 étapes avec indicateur dynamique
- [ ] Navigation à onglets et écrans principaux alignés sur les spécifications
- [ ] Données mock complètes (recettes, médecins, suivi santé)
- [ ] Modals et composants secondaires implémentés
- [ ] Respect strict du design system (couleurs, typography, rayons, ombres)
- [ ] Textes standards intégrés (objectifs, messages d'erreur/information)
- [ ] Accessibilité : textes lisibles, contrastes respectés, navigation fluide
- [ ] Tests d'assurance qualité (TypeScript, flows de navigation, scénarios critiques)

---

Cette documentation centralise les directives fonctionnelles et visuelles de NutriAdapt. Toute évolution doit conserver la cohérence du design system, maintenir la qualité des textes en français, et garantir un parcours utilisateur lisible, empathique et sécurisé pour les patients.
