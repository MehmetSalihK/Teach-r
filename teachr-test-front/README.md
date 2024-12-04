# 🎓 Teach'r Frontend

<div align="center">
  <img src="public/logo.png" alt="Teach'r Logo" width="200"/>
  
  [![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC.svg)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
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
- [Licence](#-licence)
- [État du projet](#-état-du-projet)
- [Contact](#-contact)

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
- **Routing:** React Router 6
- **Animations:** Framer Motion
- **Icons:** React Icons
- **HTTP Client:** Axios

## 💻 Installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/votre-username/teachr-test-front.git
   cd teachr-test-front
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   ```bash
   cp .env.example .env
   ```
   Modifier les variables dans `.env` selon votre configuration

4. **Lancer l'application en développement**
   ```bash
   npm run dev
   ```

## ⚙️ Configuration

1. **Variables d'environnement**
   ```env
   VITE_API_URL=http://localhost:8000/api
   VITE_APP_NAME=Teach'r
   ```

2. **Configuration du proxy (optionnel)**
   Dans `vite.config.ts`:
   ```typescript
   export default defineConfig({
     server: {
       proxy: {
         '/api': 'http://localhost:8000'
       }
     }
   })
   ```

## 🚀 Utilisation

1. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   ```

2. **Construire pour la production**
   ```bash
   npm run build
   ```

3. **Lancer les tests**
   ```bash
   npm run test
   ```

## 📁 Structure du projet

```
teachr-test-front/
├── public/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── common/
│   │   └── layout/
│   ├── pages/
│   ├── services/
│   ├── store/
│   ├── styles/
│   └── utils/
├── tests/
├── .env.example
├── package.json
└── README.md
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit vos changements
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push sur la branche
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## ⚠️ État du projet

Ce projet est actuellement en développement actif et n'est pas encore finalisé. Plusieurs fonctionnalités sont en cours de développement et des améliorations sont prévues :

### Points à améliorer
- Gestion plus robuste des erreurs
- Validation plus complète des formulaires
- Optimisation des performances
- Tests unitaires et d'intégration
- Documentation des composants
- Accessibilité (WCAG)
- Support multilingue

### Bugs connus
- Certains messages d'erreur peuvent ne pas être assez descriptifs
- Problèmes potentiels de rafraîchissement du token
- Quelques problèmes d'affichage sur certains navigateurs

### Prochaines étapes
- Implémentation de tests automatisés
- Amélioration de la gestion des états de chargement
- Optimisation du bundle size
- Ajout de fonctionnalités de profil utilisateur
- Mise en place d'un système de notifications

## 📧 Contact

- **Email:** salihketur60@gmail.com
- **GitHub:** [MehmetSalihK](https://github.com/MehmetSalihK)
- **LinkedIn:** [mehmetsalihk](https://www.linkedin.com/in/mehmetsalihk)

---

<div align="center">
  Développé par Mehmet Salih Kuscu
</div>
