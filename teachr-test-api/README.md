# 🎓 Teach'r Backend API

<div align="center">
  <img src="public/logo.png" alt="Teach'r Logo" width="200"/>
  
  [![PHP](https://img.shields.io/badge/PHP-8.1-777BB4.svg)](https://php.net)
  [![Symfony](https://img.shields.io/badge/Symfony-6.2-000000.svg)](https://symfony.com/)
  [![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1.svg)](https://www.mysql.com/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
</div>

## 📋 Table des matières

- [À propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [API Documentation](#-api-documentation)
- [Tests](#-tests)
- [Déploiement](#-déploiement)
- [Contribution](#-contribution)
- [État du projet](#-état-du-projet)
- [Licence](#-licence)
- [Contact](#-contact)

## 🎯 À propos

L'API Teach'r est le backend robuste qui alimente notre plateforme éducative. Construite avec Symfony, elle fournit une API RESTful sécurisée et performante pour gérer l'authentification, les cours, les utilisateurs et plus encore.

## ✨ Fonctionnalités

- 🔐 **Authentification & Autorisation**
  - JWT Authentication
  - Gestion des rôles
  - Refresh tokens
  - Mot de passe oublié
- 👥 **Gestion des utilisateurs**
  - CRUD complet
  - Validation des données
  - Gestion des profils
- 📚 **Gestion des cours**
  - Organisation hiérarchique
  - Métadonnées riches
  - Système de tags
- 📊 **Analytiques**
  - Suivi des progrès
  - Statistiques d'utilisation
  - Rapports personnalisés

## 🛠 Technologies

- **Framework:** Symfony 6.2
- **Language:** PHP 8.1
- **Base de données:** MySQL 8.0
- **ORM:** Doctrine
- **API:** API Platform
- **Auth:** LexikJWTAuthenticationBundle
- **Tests:** PHPUnit
- **Documentation:** OpenAPI/Swagger

## 💻 Prérequis

- PHP 8.1 ou supérieur
- Composer
- MySQL 8.0
- Symfony CLI
- OpenSSL pour JWT

## 🚀 Installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/votre-username/teachr-test-api.git
   cd teachr-test-api
   ```

2. **Installer les dépendances**
   ```bash
   composer install
   ```

3. **Configurer l'environnement**
   ```bash
   cp .env .env.local
   ```
   Modifier les variables dans `.env.local`

4. **Créer la base de données**
   ```bash
   php bin/console doctrine:database:create
   php bin/console doctrine:migrations:migrate
   ```

5. **Générer les clés JWT**
   ```bash
   php bin/console lexik:jwt:generate-keypair
   ```

6. **Lancer le serveur de développement**
   ```bash
   symfony server:start
   ```

## ⚙️ Configuration

1. **Configuration de la base de données**
   ```env
   DATABASE_URL="mysql://user:password@127.0.0.1:3306/teachr?serverVersion=8.0"
   ```

2. **Configuration JWT**
   ```env
   JWT_SECRET_KEY=%kernel.project_dir%/config/jwt/private.pem
   JWT_PUBLIC_KEY=%kernel.project_dir%/config/jwt/public.pem
   JWT_PASSPHRASE=votre-passphrase
   ```

3. **Configuration du mailer**
   ```env
   MAILER_DSN=smtp://localhost:1025
   ```

## 📚 API Documentation

La documentation de l'API est disponible aux endpoints suivants :

- **Swagger UI:** `/api/docs`
- **OpenAPI JSON:** `/api/docs.json`
- **OpenAPI YAML:** `/api/docs.yaml`

### Endpoints principaux

- **Authentication**
  - POST `/api/login_check`
  - POST `/api/token/refresh`
  - POST `/api/forgot-password`
  - POST `/api/reset-password`

- **Users**
  - GET `/api/users`
  - POST `/api/users`
  - GET `/api/users/{id}`
  - PUT `/api/users/{id}`
  - DELETE `/api/users/{id}`

- **Courses**
  - GET `/api/courses`
  - POST `/api/courses`
  - GET `/api/courses/{id}`
  - PUT `/api/courses/{id}`
  - DELETE `/api/courses/{id}`

## 🧪 Tests

1. **Configurer la base de données de test**
   ```bash
   php bin/console doctrine:database:create --env=test
   php bin/console doctrine:schema:create --env=test
   ```

2. **Lancer les tests**
   ```bash
   php bin/phpunit
   ```

3. **Lancer les tests avec couverture**
   ```bash
   php bin/phpunit --coverage-html coverage
   ```

## 📦 Déploiement

1. **Préparer l'environnement de production**
   ```bash
   composer install --no-dev --optimize-autoloader
   ```

2. **Compiler les assets**
   ```bash
   php bin/console assets:install
   ```

3. **Vider le cache**
   ```bash
   php bin/console cache:clear --env=prod
   ```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit les changements
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push la branche
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Ouvrir une Pull Request

## ⚠️ État du projet

Ce projet est actuellement en développement actif et plusieurs aspects nécessitent encore du travail :

### Points à améliorer
- Validation plus stricte des données
- Gestion plus détaillée des erreurs
- Optimisation des requêtes de base de données
- Cache système
- Rate limiting
- Logging plus complet
- Documentation API plus détaillée

### Bugs connus
- Certaines validations côté serveur peuvent être incomplètes
- La gestion des refresh tokens n'est pas optimale
- Possibles problèmes de performance avec les requêtes imbriquées
- Documentation Swagger/OpenAPI incomplète

### Prochaines étapes
- Mise en place de tests automatisés
- Amélioration de la sécurité
- Optimisation des performances
- Mise en place d'un système de cache
- Documentation complète de l'API
- Implémentation de webhooks

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📧 Contact

- **Email:** salihketur60@gmail.com
- **GitHub:** [MehmetSalihK](https://github.com/MehmetSalihK)
- **LinkedIn:** [mehmetsalihk](https://www.linkedin.com/in/mehmetsalihk)

---

<div align="center">
  Développé par Mehmet Salih Kuscu
</div>
