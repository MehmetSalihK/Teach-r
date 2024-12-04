# 🎓 Projet Teach'r - Plateforme d'apprentissage en ligne

<div align="center">
  <img src="teachr-test-front/public/logo.png" alt="Teach'r Logo" width="200"/>
  
  [![Frontend](https://img.shields.io/badge/Frontend-React_18-blue.svg)](teachr-test-front)
  [![Backend](https://img.shields.io/badge/Backend-Symfony_6.2-black.svg)](teachr-test-api)
  [![Status](https://img.shields.io/badge/Status-En_développement-yellow.svg)]()
</div>

## 📋 Vue d'ensemble

Teach'r est une plateforme éducative moderne visant à faciliter l'apprentissage en ligne. Le projet est divisé en deux parties principales :

### 1. Frontend (teachr-test-front)
- Interface utilisateur moderne avec React et TypeScript
- Design responsive avec Tailwind CSS
- Thème sombre élégant
- Animations fluides avec Framer Motion
- Gestion d'état avec Redux Toolkit

### 2. Backend (teachr-test-api)
- API RESTful avec Symfony 6.2
- Authentification JWT
- Base de données MySQL
- Documentation API avec Swagger/OpenAPI
- Tests unitaires avec PHPUnit

## 🎯 Objectif du projet

Ce projet a été développé comme une démonstration technique d'une plateforme d'apprentissage en ligne moderne. Il met l'accent sur :

- Une expérience utilisateur fluide et intuitive
- Une architecture moderne et scalable
- Des pratiques de développement professionnelles
- Une sécurité robuste
- Une documentation claire et complète

## 🛠 Architecture technique

### Frontend
- **Framework:** React 18 avec TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **Routing:** React Router 6
- **Animations:** Framer Motion
- **HTTP Client:** Axios

### Backend
- **Framework:** Symfony 6.2
- **Database:** MySQL 8.0
- **Authentication:** JWT
- **ORM:** Doctrine
- **API Documentation:** OpenAPI/Swagger

## 🔐 Système d'authentification

Le système d'authentification comprend :

- Inscription utilisateur
- Connexion sécurisée
- Récupération de mot de passe
- Gestion des tokens JWT
- Validation des formulaires
- Messages d'erreur personnalisés

## 🚀 Installation

1. **Cloner les repositories**
   ```bash
   git clone https://github.com/MehmetSalihK/Teach-r.git
   git clone git@github.com:MehmetSalihK/Teach-r.git
   ```

2. **Installer le frontend**
   ```bash
   cd teachr-test-front
   npm install
   cp .env.example .env
   ```

3. **Installer le backend**
   ```bash
   cd teachr-test-api
   composer install
   cp .env .env.local
   ```

4. **Configuration de la base de données**
   ```bash
   php bin/console doctrine:database:create
   php bin/console doctrine:migrations:migrate
   ```

5. **Lancer les serveurs**
   ```bash
   # Terminal 1 (Frontend)
   cd teachr-test-front
   npm run dev

   # Terminal 2 (Backend)
   cd teachr-test-api
   symfony server:start
   ```

## ⚠️ État actuel du projet

Le projet est actuellement en phase de développement avec plusieurs fonctionnalités en cours d'implémentation.

### Fonctionnalités implémentées
- ✅ Système d'authentification de base
- ✅ Interface utilisateur moderne
- ✅ API RESTful
- ✅ Documentation de base

### En cours de développement
- 🔄 Tests automatisés
- 🔄 Gestion avancée des erreurs
- 🔄 Optimisation des performances
- 🔄 Documentation complète

### Prévus pour le futur
- 📅 Système de cours
- 📅 Profils utilisateurs
- 📅 Tableau de bord
- 📅 Système de notifications

## 🐛 Bugs connus

- Interface utilisateur :
  - Certains messages d'erreur manquent de précision
  - Problèmes de rafraîchissement des tokens
  - Quelques problèmes d'affichage sur certains navigateurs

- Backend :
  - Validations incomplètes
  - Gestion des refresh tokens à optimiser
  - Documentation API à compléter

## 📚 Documentation

- [Documentation Frontend](teachr-test-front/README.md)
- [Documentation Backend](teachr-test-api/README.md)
- [API Documentation](http://localhost:8000/api/docs)

## 👥 Contribution

Les contributions sont les bienvenues ! Voir les fichiers README.md respectifs des repositories frontend et backend pour les guides de contribution détaillés.

## 📧 Contact

- **Développeur:** Mehmet Salih Kuscu
- **Email:** salihketur60@gmail.com
- **GitHub:** [MehmetSalihK](https://github.com/MehmetSalihK)
- **LinkedIn:** [mehmetsalihk](https://www.linkedin.com/in/mehmetsalihk)

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

<div align="center">
  Développé par Mehmet Salih Kuscu
</div>
