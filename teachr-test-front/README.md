# 🎓 Teach'r Frontend

<div align="center">
  <img src="public/logo.png" alt="Teach'r Logo" width="200"/>
  
  [![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC.svg)](https://tailwindcss.com/)
</div>

## 📋 Table des matières

- [À propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [Structure du projet](#-structure-du-projet)
- [Contribution](#-contribution)
- [État du projet](#-état-du-projet)
- [Contact](#-contact)
- [Guide détaillé des fonctionnalités](#-guide-détaillé-des-fonctionnalités)
- [Erreurs connues et solutions](#-erreurs-connues-et-solutions)
- [Cycle de vie des composants](#-cycle-de-vie-des-composants)
- [Améliorations prévues](#-améliorations-prévues)
- [Dépannage courant](#-dépannage-courant)
- [Bonnes pratiques](#-bonnes-pratiques)

## 🎯 À propos

Teach'r est une plateforme éducative moderne conçue pour faciliter l'apprentissage en ligne. Notre interface utilisateur intuitive offre une expérience d'apprentissage fluide et engageante pour les étudiants et les enseignants.

## ✨ Fonctionnalités

- 🔐 **Système d'authentification sécurisé**
  - Connexion / Inscription
  - Récupération de mot de passe
  - Sessions sécurisées
- 👤 **Gestion des profils**
  - Profils personnalisables
  - Tableaux de bord adaptés
- 📚 **Gestion des cours**
  - Création et édition de cours
  - Organisation du contenu
  - Suivi des progrès
- 🎨 **Interface moderne**
  - Design responsive
  - Thème sombre élégant
  - Animations fluides

## 🛠 Technologies

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **Animations:** Framer Motion
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Form Validation:** Custom validation
- **Icons:** React Icons

## 🎨 Interface Utilisateur

### Design System
- Thème sombre moderne
- Palette de couleurs cohérente
- Interface responsive
- Composants réutilisables

### Animations et Interactions
- Transitions fluides entre les pages
- Animations de chargement élégantes
- Micro-interactions sur les formulaires
- Retours visuels sur les actions
- Effets de hover et focus améliorés
- Messages d'erreur et de succès animés

### Composants Principaux
- **Authentication**
  - Login avec animations de transition
  - Register avec validation en temps réel
  - Récupération de mot de passe interactive
  - Messages de statut animés
- **Navigation**
  - Menu responsive
  - Transitions fluides
  - Indicateurs d'état actif
- **Formulaires**
  - Validation interactive
  - Retours visuels immédiats
  - Messages d'erreur contextuels
  - États de chargement animés

## 💻 Installation

1. Cloner le projet
```bash
# Via HTTPS
git clone https://github.com/MehmetSalihK/Teach-r.git

# Via SSH
git clone git@github.com:MehmetSalihK/Teach-r.git
cd Teach-r
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer les variables d'environnement
```bash
cp .env.example .env
```
Modifier les variables dans `.env` selon votre configuration

4. Lancer l'application en développement
```bash
npm run dev
```

## ⚙️ Configuration

### Variables d'Environnement

```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=Teach'r
```

### Scripts Disponibles

- `npm start` : Lance l'application en mode développement
- `npm build` : Compile l'application pour la production
- `npm test` : Lance les tests
- `npm run lint` : Vérifie le code avec ESLint
- `npm run format` : Formate le code avec Prettier

## 📁 Structure du projet

```
teachr-test-front/
├── public/
├── src/
│   ├── components/         # Composants React
│   │   ├── auth/          # Composants d'authentification
│   │   ├── common/        # Composants réutilisables
│   │   └── layout/        # Composants de mise en page
│   ├── contexts/          # Contextes React
│   ├── hooks/            # Hooks personnalisés
│   ├── services/         # Services API
│   ├── store/            # Configuration Redux
│   ├── styles/           # Styles globaux
│   ├── types/            # Types TypeScript
│   └── utils/            # Utilitaires
├── tests/
├── .env.example
├── package.json
└── README.md
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📊 État du projet

- ✅ Interface d'authentification complète
- ✅ Animations et transitions
- ✅ Gestion des états avec Redux
- ✅ Validation des formulaires
- ✅ Design responsive
- ✅ Thème sombre
- 🚧 Tests unitaires
- 🚧 Documentation des composants

## 📫 Contact

Mehmet Salih Kuscu - salihketur60@gmail.com

Lien du projet: [https://github.com/MehmetSalihK/Teach-r](https://github.com/MehmetSalihK/Teach-r)

## 🔍 Guide détaillé des fonctionnalités

### 🎨 Système de thème
- Thème sombre par défaut
- Détection automatique des préférences système
- Transition fluide entre les thèmes
- Variables CSS personnalisées pour une cohérence visuelle

### 🔐 Authentification
- Validation en temps réel des champs
- Gestion des erreurs avec retour visuel
- Protection contre la soumission multiple
- Persistance de la session
- Refresh token automatique

### 🎭 Animations
- Transitions de page fluides
- Animations de chargement
- Micro-interactions sur les formulaires
- Animations d'erreur et de succès
- Effets de hover personnalisés

### 📱 Responsive Design
- Mobile-first approach
- Breakpoints personnalisés
- Navigation adaptative
- Images optimisées
- Grilles flexibles

## ⚠️ Erreurs connues et solutions

### Authentification
1. **Problème de refresh token**
   - Symptôme : Déconnexion inattendue
   - Cause : Token expiré non rafraîchi
   - Solution : Vérifier la configuration du `refreshTokenTimeout`

2. **Formulaire de connexion**
   - Problème : Soumission multiple possible
   - Impact : Requêtes API en double
   - Fix temporaire : Désactivation du bouton pendant la soumission

### Performance
1. **Chargement initial**
   - Problème : Bundle size important
   - Solution en cours : Code splitting et lazy loading

2. **Animations**
   - Problème : Saccades sur mobile
   - Workaround : Désactivation des animations complexes sur mobile

### UI/UX
1. **Dark Mode**
   - Bug : Flash blanc au chargement
   - Solution temporaire : Balise meta theme-color

2. **Formulaires**
   - Problème : Validation asynchrone lente
   - Amélioration prévue : Debounce des requêtes

## 🔄 Cycle de vie des composants

### AuthProvider
```typescript
// Gestion du cycle de vie de l'authentification
1. Initialisation
   - Vérification du token stocké
   - Restauration de la session
   - Configuration des intercepteurs Axios

2. Authentification
   - Validation des credentials
   - Stockage sécurisé des tokens
   - Mise à jour du contexte

3. Rafraîchissement
   - Vérification périodique du token
   - Rotation automatique des refresh tokens
   - Gestion des erreurs de rafraîchissement
```

## 🛠 Améliorations prévues

### Performance
- [ ] Implémentation de React.lazy pour le code splitting
- [ ] Optimisation des images avec next/image
- [ ] Mise en cache des requêtes API avec React Query
- [ ] Réduction du bundle size avec tree shaking
- [ ] Service Worker pour le mode hors ligne

### Sécurité
- [ ] Protection CSRF renforcée
- [ ] Validation côté client plus stricte
- [ ] Gestion améliorée des sessions
- [ ] Audit de sécurité régulier
- [ ] Rate limiting côté client

### UX/UI
- [ ] Skeleton loading pour les composants
- [ ] Animations plus fluides
- [ ] Mode light/dark amélioré
- [ ] Composants plus accessibles (ARIA)
- [ ] Support des raccourcis clavier

### Tests
- [ ] Tests E2E avec Cypress
- [ ] Tests de performance
- [ ] Tests d'accessibilité
- [ ] Snapshots des composants
- [ ] Tests de régression visuelle

## 🔧 Dépannage courant

### Problèmes d'installation
```bash
# Erreur : Unable to resolve dependencies
npm cache clean --force
rm -rf node_modules
npm install

# Erreur : Build failing
rm -rf .next
npm run build
```

### Erreurs d'authentification
1. Token invalide
```typescript
// Vérifier le stockage local
localStorage.getItem('token')
// Nettoyer si nécessaire
localStorage.clear()
```

2. Problèmes de CORS
```typescript
// Vérifier la configuration Axios
axios.defaults.withCredentials = true
```

### Problèmes de performance
1. Composants qui re-render trop souvent
   - Utiliser React.memo
   - Optimiser les useCallback/useMemo
   - Vérifier les dépendances des effets

2. Animations lentes
   - Réduire les animations sur mobile
   - Utiliser transform au lieu de left/top
   - Activer hardware acceleration

## 📚 Bonnes pratiques

### Structure des composants
```typescript
// Utiliser une structure cohérente
/components
  /common          // Composants réutilisables
  /layout          // Composants de mise en page
  /features        // Composants spécifiques aux fonctionnalités
  /hooks           // Hooks personnalisés
  /utils           // Fonctions utilitaires
```

### Gestion d'état
- Utiliser Redux pour l'état global
- useState pour l'état local
- useContext pour le partage de données
- useReducer pour la logique complexe

### Styling
- Utiliser Tailwind pour la cohérence
- CSS Modules pour les styles spécifiques
- Variables CSS pour les thèmes
- Mobile-first approach

<div align="center">
  <p>Développé avec ❤️ par Mehmet Salih Kuscu</p>
</div>
