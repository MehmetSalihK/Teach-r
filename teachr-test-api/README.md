# 🎓 Teach'r Backend API

<div align="center">
  <img src="public/logo.png" alt="Teach'r Logo" width="200"/>
  
  [![PHP](https://img.shields.io/badge/PHP-8.1-777BB4.svg)](https://php.net)
  [![Symfony](https://img.shields.io/badge/Symfony-6.2-000000.svg)](https://symfony.com/)
  [![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1.svg)](https://www.mysql.com/)
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
- [Contact](#-contact)
- [Guide détaillé des fonctionnalités](#-guide-détaillé-des-fonctionnalités)
- [Erreurs connues et solutions](#-erreurs-connues-et-solutions)
- [Cycle de vie des requêtes](#-cycle-de-vie-des-requêtes)
- [Améliorations prévues](#-améliorations-prévues)
- [Dépannage courant](#-dépannage-courant)
- [Bonnes pratiques](#-bonnes-pratiques)
- [Monitoring et Logs](#-monitoring-et-logs)

## 🎯 À propos

L'API Teach'r est le backend robuste qui alimente notre plateforme éducative. Construite avec Symfony, elle fournit une API RESTful sécurisée et performante pour gérer l'authentification, les cours, les utilisateurs et plus encore.

## ✨ Fonctionnalités

- 🔐 **Authentification & Autorisation**
  - JWT Authentication avec refresh tokens
  - Gestion des rôles et permissions
  - Système de récupération de mot de passe
  - Protection contre les attaques par force brute
  - Validation d'email
  - Sessions sécurisées
- 👥 **Gestion des utilisateurs**
  - CRUD complet avec validation
  - Profils personnalisables
  - Upload d'avatar sécurisé
  - Historique des activités
  - Préférences utilisateur
- 📚 **Gestion des ressources**
  - CRUD pour les produits et catégories
  - Système de filtrage avancé
  - Pagination optimisée
  - Tri dynamique
  - Recherche full-text
- 🔒 **Sécurité**
  - Protection CSRF
  - Rate limiting
  - Validation des données
  - Sanitization des entrées
  - Logs de sécurité
- 🚀 **Performance**
  - Cache système
  - Optimisation des requêtes
  - Indexation intelligente
  - Compression des réponses
  - Lazy loading

## 🛠 Technologies

- **Framework:** Symfony 6.2
- **Language:** PHP 8.1
- **Base de données:** MySQL 8.0
- **Cache:** Redis
- **Documentation:** OpenAPI/Swagger
- **Tests:** PHPUnit
- **Sécurité:** 
  - JWT (LexikJWTAuthenticationBundle)
  - CORS Bundle
  - Rate Limiter
- **Validation:** Symfony Validator
- **ORM:** Doctrine

## 💻 Prérequis

- PHP 8.1 ou supérieur
- Composer
- MySQL 8.0
- Symfony CLI
- OpenSSL pour JWT
- Redis pour le cache

## 🚀 Installation

1. **Cloner le projet**
   ```bash
   # Via HTTPS
   git clone https://github.com/MehmetSalihK/Teach-r.git

   # Via SSH
   git clone git@github.com:MehmetSalihK/Teach-r.git
   cd Teach-r
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

### Variables d'Environnement

```env
# Base de données
DATABASE_URL="mysql://user:password@127.0.0.1:3306/teachr?serverVersion=8.0"

# JWT
JWT_SECRET_KEY=%kernel.project_dir%/config/jwt/private.pem
JWT_PUBLIC_KEY=%kernel.project_dir%/config/jwt/public.pem
JWT_PASSPHRASE=your-passphrase
JWT_TTL=3600

# Mail
MAILER_DSN=smtp://localhost:1025
MAILER_FROM=noreply@teachr.com

# Redis
REDIS_URL=redis://localhost:6379
```

### Commandes Utiles

```bash
# Base de données
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
php bin/console doctrine:fixtures:load

# Cache
php bin/console cache:clear
php bin/console cache:warmup

# JWT
php bin/console lexik:jwt:generate-keypair

# Tests
php bin/phpunit
```

## 📚 API Documentation

L'API est documentée avec OpenAPI/Swagger. Accédez à la documentation interactive à :
```
/api/doc
```

### Points d'entrée principaux

#### Authentication
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/refresh` - Rafraîchir le token
- `POST /api/auth/forgot-password` - Mot de passe oublié
- `POST /api/auth/reset-password` - Réinitialisation du mot de passe

#### Utilisateurs
- `GET /api/users` - Liste des utilisateurs
- `GET /api/users/{id}` - Détails d'un utilisateur
- `PUT /api/users/{id}` - Mise à jour d'un utilisateur
- `DELETE /api/users/{id}` - Suppression d'un utilisateur

#### Produits
- `GET /api/products` - Liste des produits
- `POST /api/products` - Création d'un produit
- `GET /api/products/{id}` - Détails d'un produit
- `PUT /api/products/{id}` - Mise à jour d'un produit
- `DELETE /api/products/{id}` - Suppression d'un produit

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
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

### Standards de Code
- PSR-12 pour le style de code
- Tests PHPUnit requis
- Documentation des endpoints
- Messages de commit conventionnels

## 📊 État du Projet

### Fonctionnalités Complétées ✅
- Système d'authentification JWT
- CRUD Utilisateurs
- CRUD Produits et Catégories
- Validation des données
- Documentation API
- Tests unitaires de base
- Sécurité de base

### En Cours 🚧
- Tests d'intégration
- Cache système avancé
- Système de notifications
- Optimisation des performances
- Monitoring et logging avancé

### Prochaines Étapes 📋
- Mise en place de webhooks
- API versioning
- Système de files d'attente
- Amélioration de la couverture de tests
- Documentation technique approfondie

## 📧 Contact

Mehmet Salih Kuscu - salihketur60@gmail.com

Lien du projet: [https://github.com/MehmetSalihK/Teach-r](https://github.com/MehmetSalihK/Teach-r)

## 🔍 Guide détaillé des fonctionnalités

### 🔐 Système d'authentification
- JWT avec rotation des tokens
- Gestion des sessions
- Protection contre les attaques par force brute
- Validation des emails
- Réinitialisation sécurisée des mots de passe

### 📦 Gestion des données
- Validation stricte des entrées
- Transactions atomiques
- Soft delete
- Pagination optimisée
- Filtrage dynamique

### 🚦 Contrôle d'accès
- RBAC (Role-Based Access Control)
- Permissions granulaires
- Middleware de sécurité
- Logging des accès
- Rate limiting

### 🔄 Cache et Performance
- Cache Redis
- Query optimization
- Eager loading
- Index database
- Response compression

## ⚠️ Erreurs connues et solutions

### Base de données
1. **Deadlocks sur transactions longues**
   - Symptôme : Timeout des requêtes
   - Cause : Verrous concurrents
   - Solution : Optimisation des transactions

2. **Performance des requêtes**
   - Problème : Requêtes N+1
   - Impact : Temps de réponse élevé
   - Fix : Utilisation de joins et eager loading

### Authentification
1. **Expiration des tokens**
   ```php
   // Problème : Token expiré mais refresh token valide
   // Solution : Middleware de refresh automatique
   public function refreshToken(Request $request)
   {
       try {
           // Vérification du refresh token
           // Génération d'un nouveau token
           // Mise à jour en base
       } catch (TokenExpiredException $e) {
           // Gérer l'expiration
       }
   }
   ```

2. **Sessions zombies**
   - Cause : Nettoyage incomplet des sessions
   - Solution : Cron job de nettoyage

### API
1. **Rate Limiting**
   - Problème : Limite trop restrictive
   - Solution : Configuration adaptative

2. **Validation des données**
   - Bug : Messages d'erreur peu précis
   - Amélioration : Validation personnalisée

## 🔄 Cycle de vie des requêtes

### Pipeline de requête
```php
1. Entrée de la requête
   - Parsing des headers
   - Vérification du token
   - Rate limiting

2. Middleware
   - Authentification
   - Autorisation
   - Validation

3. Controller
   - Logique métier
   - Gestion des erreurs
   - Response formatting

4. Events
   - Logging
   - Notifications
   - Cache invalidation
```

## 🛠 Améliorations prévues

### Performance
- [ ] Cache distribué avec Redis Cluster
- [ ] Optimisation des requêtes SQL
- [ ] Implementation de GraphQL
- [ ] Mise en cache des réponses API
- [ ] Queue system pour les tâches lourdes

### Sécurité
- [ ] 2FA (Two-Factor Authentication)
- [ ] Audit logs détaillés
- [ ] Scanner de vulnérabilités
- [ ] Encryption des données sensibles
- [ ] Protection contre les attaques DDoS

### Architecture
- [ ] Microservices pour certaines fonctionnalités
- [ ] Event sourcing
- [ ] CQRS pattern
- [ ] API versioning
- [ ] Service mesh

### Monitoring
- [ ] Metrics collection
- [ ] APM (Application Performance Monitoring)
- [ ] Log aggregation
- [ ] Alerting system
- [ ] Health checks

## 🔧 Dépannage courant

### Problèmes d'installation
```bash
# Erreur : Composer dependencies
composer clear-cache
rm -rf vendor/
composer install

# Erreur : Database migration
php bin/console doctrine:schema:drop --force
php bin/console doctrine:migrations:migrate
```

### Erreurs courantes
1. **500 Internal Server Error**
```php
// Vérifier les logs
tail -f var/log/dev.log

// Augmenter le niveau de debug
.env: APP_DEBUG=true
```

2. **401 Unauthorized**
```php
// Vérifier la configuration JWT
bin/console lexik:jwt:generate-keypair
```

### Problèmes de performance
1. **Requêtes lentes**
   - Analyser avec EXPLAIN
   - Optimiser les indexes
   - Utiliser le query cache

2. **Memory leaks**
   - Profiling avec Xdebug
   - Optimiser les collections
   - Gérer les références circulaires

## 📚 Bonnes pratiques

### Structure du code
```php
/src
  /Controller     // Controllers CRUD
  /Entity         // Entités Doctrine
  /Repository     // Requêtes personnalisées
  /Service        // Logique métier
  /EventListener  // Listeners d'événements
```

### Patterns recommandés
- Repository pattern
- Service layer
- Event driven
- DTO pattern
- Builder pattern

### Conventions de code
- PSR-12 coding standard
- Type hinting strict
- PHPDoc complet
- Tests unitaires
- Code reviews

## 📊 Monitoring et Logs

### Logs système
```php
// Niveaux de log
emergency: système inutilisable
alert: action immédiate nécessaire
critical: conditions critiques
error: conditions d'erreur
warning: conditions de warning
notice: conditions normales mais significatives
info: messages d'information
debug: messages de debug
```

### Métriques importantes
- Temps de réponse API
- Utilisation mémoire
- Charge CPU
- Requêtes par seconde
- Taux d'erreur

<div align="center">
  <p>Développé avec ❤️ par Mehmet Salih Kuscu</p>
</div>
