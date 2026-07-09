# ZEN MASSAGE & WELLNESS

## CAHIER DES CHARGES COMPLET

**Plateforme Web Responsive de Services de Massage et Vente de Produits de Santé**

**Localisation:** Gabon  
**Date:** Juin 2026  
**Version:** 1.0

---

## TABLE DES MATIÈRES

1. [EXECUTIVE SUMMARY](#executive-summary)
2. [SYSTÈME DE RÔLES](#système-de-rôles)
3. [FONCTIONNALITÉS DÉTAILLÉES](#fonctionnalités-détaillées)
4. [ARCHITECTURE TECHNIQUE](#architecture-technique)
5. [STRUCTURE FRONTEND](#structure-frontend)
6. [STRUCTURE BACKEND](#structure-backend)
7. [SCHÉMA BASE DE DONNÉES](#schéma-base-de-données)
8. [PLAN DE DÉVELOPPEMENT](#plan-de-développement)
9. [DÉPLOIEMENT](#déploiement)
10. [SÉCURITÉ](#sécurité)

---

## EXECUTIVE SUMMARY

### Vision du Projet

Créer une plateforme numérique complète et responsive permettant à un prestataire de services de massage au Gabon de :
- Enregistrer et gérer les clients en ligne
- Gérer les rendez-vous et séances de massage
- Vendre des produits de santé
- Collecter des avis clients
- Automatiser les notifications

### Objectifs Principaux

1. **Augmenter la visibilité** des services en ligne
2. **Automatiser** la gestion des rendez-vous (80% de réduction du temps administratif)
3. **Générer des revenus supplémentaires** via la vente de produits
4. **Améliorer la satisfaction client** via les avis et évaluations
5. **Offrir une UX professionnelle** et intuitive

### Stack Technologique Recommandé

| Composant | Technologie | Justification |
|-----------|-------------|---------------|
| **Frontend** | React 18 + TypeScript 5 | Performance, Type-safety, Composants réutilisables |
| **Styling** | Tailwind CSS | Utility-first, Responsive, Production-ready |
| **Routage** | React Router v6 | Navigation SPA fluide |
| **State Management** | Context API + useReducer | Léger, Suffisant pour l'app |
| **HTTP Client** | Axios | Interceptors, Gestion d'erreurs |
| **Backend** | Node.js 20 + Express 4 | Asynchrone, Léger, Populaire |
| **Langage Backend** | TypeScript | Type-safety, Maintenabilité |
| **Base de Données** | PostgreSQL 15 | Fiable, Gratuit sur Render, ACID compliant |
| **ORM** | Prisma | Schema-driven, Type-safe, Migrations |
| **Authentification** | JWT + bcryptjs | Sécurisé, Stateless, Scalable |
| **Validation** | Zod / Yup | Runtime validation |
| **Frontend Hosting** | Netlify | CI/CD automatique, Gratuit, CDN global |
| **Backend Hosting** | Render | PostgreSQL gratuite, Auto-deploys, Simple |
| **Upload Fichiers** | Cloudinary (gratuit) | Optimisation images, CDN |

---

## SYSTÈME DE RÔLES

### 1️⃣ SUPER ADMIN

**Responsabilité:** Gestionnaire global du système

**Permissions:**
- ✅ Créer, modifier, supprimer tous les comptes utilisateurs
- ✅ Assigner et modifier les rôles (USER → ADMIN, ADMIN → SUPER_ADMIN, etc.)
- ✅ Accès complet à tous les produits, rendez-vous, avis
- ✅ Consulter les statistiques globales et rapports
- ✅ Gérer les paramètres système et configurations
- ✅ Afficher l'historique d'activité de tous les utilisateurs
- ✅ Activer/Désactiver des comptes
- ✅ Exporter les données

**Panel:** `/dashboard/super-admin`

---

### 2️⃣ ADMIN / MEMBRE (Praticien)

**Responsabilité:** Gestionnaire des services et produits

**Permissions:**
- ✅ Créer, modifier, publier les produits
- ✅ Organiser les produits en catégories
- ✅ Gérer les images et descriptions
- ✅ Consulter et gérer les rendez-vous
- ✅ Accepter, refuser ou reporter les demandes
- ✅ Voir et modérer les commentaires/avis
- ✅ Configurer les horaires de travail et disponibilités
- ✅ Consulter ses statistiques
- ❌ Accès limité aux autres utilisateurs

**Panel:** `/dashboard/admin`

---

### 3️⃣ UTILISATEUR SIMPLE (Client)

**Responsabilité:** Consommateur de services et produits

**Permissions:**
- ✅ Consulter les produits disponibles
- ✅ Aimer/Liker les produits
- ✅ Commenter et donner des avis (1-5 étoiles)
- ✅ Consulter les avis des autres clients
- ✅ Prendre rendez-vous pour une séance
- ✅ Visualiser et gérer ses rendez-vous
- ✅ Modifier/Annuler ses rendez-vous
- ✅ Gérer son profil
- ❌ Pas d'accès administrateur

**Zone:** `/account`, `/products`, `/appointments/my`

---

## FONCTIONNALITÉS DÉTAILLÉES

### SECTION 1: GESTION DES COMPTES

#### 1.1 Inscription
- Formulaire simple: Email, Mot de passe, Prénom, Nom, Téléphone
- Validation des emails (pas de doublons)
- Confirmation par email avec lien de vérification
- Politique de mot de passe robuste (min 8 caractères, majuscule, chiffre, caractère spécial)
- Conditions d'utilisation et politique de confidentialité

#### 1.2 Connexion
- Authentification JWT sécurisée
- Access Token: 24 heures
- Refresh Token: 7 jours
- Option "Se souvenir de moi" pour 30 jours
- Récupération de mot de passe par email

#### 1.3 Profil Utilisateur
- Modification: Prénom, Nom, Téléphone, Email
- Upload de photo de profil (max 5MB, formats: JPG, PNG)
- Changement de mot de passe avec confirmation
- Suppression de compte avec avertissement
- Historique de connexions récentes

---

### SECTION 2: GESTION DES PRODUITS

#### 2.1 Création de Produits (Admin)
```
Champs obligatoires:
- Nom du produit (max 100 caractères)
- Description détaillée (max 1000 caractères)
- Prix (€)
- Catégorie (liste déroulante)
- Stock (nombre de produits disponibles)
- Images (5 maximum, optimisées)

Champs optionnels:
- SKU (référence interne)
- Poids/Dimensions
- Instructions d'utilisation
- Ingrédients
```

**Workflow:**
1. Remplir le formulaire
2. Uploader les images
3. Sauvegarder en brouillon
4. Prévisualiser
5. Publier (rend visible aux clients)

#### 2.2 Affichage des Produits (Public)

**Grid Responsive:**
- Desktop (1280px+): 4 colonnes
- Tablette (768-1279px): 2 colonnes
- Mobile (< 768px): 1 colonne

**Fonctionnalités:**
- Filtrage par catégorie
- Recherche en temps réel (titre, description)
- Tri: Prix ↑/↓, Popularité, Récent, Avis ↑/↓
- Pagination ou Infinite Scroll
- Affichage: Image, Nom, Prix, Note moyenne, Nombre de likes

#### 2.3 Détail Produit
```
Affichage:
- Galerie d'images avec zoom (lightbox)
- Miniatures pour sélectionner l'image
- Description complète
- Prix et statut (En stock / Stock faible / Rupture)
- Étoiles de note et nombre d'avis
- Bouton Like/Unlike
- Partager sur les réseaux

Section Avis:
- Formulaire pour ajouter un avis (si connecté)
- Liste des avis (récents en premier)
- Filtrer par note (5★, 4★, etc.)
```

---

### SECTION 3: SYSTÈME D'AVIS ET COMMENTAIRES

#### 3.1 Création d'Avis
```
Formulaire:
- Note: 1-5 étoiles (obligatoire)
- Titre: Résumé court (max 100 caractères)
- Contenu: Avis détaillé (max 500 caractères)
- Vérifiée: Badge si l'utilisateur a acheté le produit
```

#### 3.2 Affichage des Avis
```
Pour chaque avis:
- Avatar et nom du client
- Date et heure (ex: "Il y a 2 jours")
- Note en étoiles
- Titre et contenu
- "Utile?" (like/dislike)
- Badge "Achat vérifié" si applicable
```

#### 3.3 Modération (Admin)
- Supprimer les avis inappropriés
- Répondre aux avis des clients
- Masquer les avis sans supprimer
- Voir les avis en attente de modération

#### 3.4 Note Moyenne
- Calculée automatiquement à chaque nouvel avis
- Affichée avec étoiles visuelles et pourcentage
- Exemple: ⭐⭐⭐⭐⭐ 4.7/5 (124 avis)

---

### SECTION 4: SYSTÈME DE LIKES

#### 4.1 Fonctionnement
- Un like par produit par utilisateur
- Compteur de likes visible publiquement
- Une action/click pour liker ou retirer le like
- Sauvegarde en base de données
- Synchronisation en temps réel

#### 4.2 Affichage
```
Sur la carte produit:
- Icône cœur: ❤️ (rempli si likée) ou 🤍 (vide)
- Nombre de likes dynamique
- Animation au clic

Sur la page détail:
- Bouton prominent "❤️ Liker ce produit"
- Affichage: "Vous et 45 autres personnes aimez ce produit"
```

---

### SECTION 5: GESTION DES RENDEZ-VOUS

#### 5.1 Prise de Rendez-vous (Client)

**Formulaire:**
```
1. Sélection de la date
   - Calendrier interactif
   - Voir les jours disponibles
   - Affichage date en format: "Samedi 15 Juin 2026"

2. Sélection de l'heure
   - Liste des créneaux libres (ex: 09h00, 10h00, 14h30)
   - Créneaux non disponibles grisés

3. Type de massage
   - Liste déroulante (Ex: Suédois, Thaï, Relaxant, etc.)
   - Description brève avec prix

4. Durée
   - 30 minutes: Prix X
   - 60 minutes: Prix Y
   - 90 minutes: Prix Z

5. Notes spéciales (optionnel)
   - Préférences de pression
   - Zones à privilégier
   - Allergies/Problèmes à signaler

6. Confirmation
   - Récapitulatif complet
   - Bouton "Confirmer le rendez-vous"
   - Reçu par email immédiatement
```

#### 5.2 Gestion des Rendez-vous (Admin)

**Calendrier Admin:**
```
Vue mensuelle (défaut):
- Affichage de tous les rendez-vous
- Code couleur par statut:
  - Jaune: En attente
  - Vert: Confirmé
  - Gris: Complété
  - Rouge: Annulé

Vue hebdomadaire:
- Voir les détails des séances
- Heures précises
- Noms des clients

Vue journalière:
- Pour la journée en cours
- Heures de la journée
- Planning détaillé
```

**Actions sur rendez-vous:**
- ✅ **Accepter:** Le rendre confirmé et envoyer email au client
- ❌ **Refuser:** Avec raison (occupé, raison personnelle, etc.)
- 🔄 **Reporter:** Proposer une autre date/heure
- 🗑️ **Annuler:** Avec raison et notification au client
- 📝 **Ajouter notes:** Notes privées

#### 5.3 Configuration des Disponibilités (Admin)

**Horaires de travail:**
```
Pour chaque jour de la semaine:
- Heure de début (ex: 09h00)
- Heure de fin (ex: 18h00)
- Pause déjeuner (ex: 12h00-13h00)
- Jours fermés (cochable)

Exceptions:
- Congés (période complète)
- Jours fériés
- Fermetures exceptionnelles
```

**Durées des séances:**
- Bloc de temps par séance (ex: 1h ou 1h30)
- Buffer entre les séances (ex: 15 min pour le nettoyage)

---

## ARCHITECTURE TECHNIQUE

### Stack Global

```
Frontend                Backend              Base de Données
├─ React 18            ├─ Node.js 20        └─ PostgreSQL 15
├─ TypeScript 5        ├─ Express 4            (Render free)
├─ Tailwind CSS        ├─ TypeScript
├─ React Router 6      ├─ Prisma ORM
├─ Axios               ├─ JWT/bcryptjs
├─ Zustand/Context     └─ Validation (Zod)
└─ (Netlify)           └─ (Render)
```

### Architecture Générale

```
                    UTILISATEUR
                        ↓
        ┌──────────────────────────────┐
        │      FRONTEND (React)        │
        │   (Netlify CDN Global)       │
        │                              │
        │  ┌────────────────────────┐  │
        │  │   Pages & Components   │  │
        │  │   (TypeScript)         │  │
        │  └────────────────────────┘  │
        │  ┌────────────────────────┐  │
        │  │   Context/State        │  │
        │  │   (useAuth, etc)       │  │
        │  └────────────────────────┘  │
        └──────────────┬───────────────┘
                       │ (HTTPS)
                       ↓
        ┌──────────────────────────────┐
        │   BACKEND (Node/Express)     │
        │   (Render Container)         │
        │                              │
        │  ┌────────────────────────┐  │
        │  │   API Routes           │  │
        │  │   (/api/...)           │  │
        │  └────────────────────────┘  │
        │  ┌────────────────────────┐  │
        │  │   Controllers          │  │
        │  │   (Business Logic)     │  │
        │  └────────────────────────┘  │
        │  ┌────────────────────────┐  │
        │  │   Services             │  │
        │  │   (Data Processing)    │  │
        │  └────────────────────────┘  │
        │  ┌────────────────────────┐  │
        │  │   Middlewares          │  │
        │  │   (Auth, Validation)   │  │
        │  └────────────────────────┘  │
        └──────────────┬───────────────┘
                       │ (SQL)
                       ↓
        ┌──────────────────────────────┐
        │   BASE DE DONNÉES            │
        │   PostgreSQL (Render)        │
        │                              │
        │  ├─ Users                    │
        │  ├─ Products                 │
        │  ├─ Reviews                  │
        │  ├─ Appointments             │
        │  ├─ Likes                    │
        │  └─ Categories               │
        └──────────────────────────────┘
```

---

## STRUCTURE FRONTEND

### Organisation des Répertoires
```
ZEN-MASSAGE-PROJECT/
│
├── zen-massage-frontend/                    # Application React
│   │
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── favicon-192.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   ├── ui/
            │   ├── Button.tsx
            │   ├── Modal.tsx
            │   ├── Loading.tsx
            │   ├── Toast.tsx
            │   ├── Badge.tsx
            │   ├── Input.tsx
            │   ├── Card.tsx
            │   └── Spinner.tsx
            │
            └── layout/
                ├── Header.tsx
                ├── Footer.tsx
                ├── Navbar.tsx
                ├── Sidebar.tsx
                └── MainLayout.tsx
│   │   │   │
│   │   │   ├── Products/
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   ├── ProductGrid.tsx
│   │   │   │   ├── ProductDetail.tsx
│   │   │   │   ├── ProductForm.tsx
│   │   │   │   ├── ProductFilters.tsx
│   │   │   │   ├── ProductSearch.tsx
│   │   │   │   ├── CategorySelect.tsx
│   │   │   │   └── ImageUpload.tsx
│   │   │   │
│   │   │   ├── Appointments/
│   │   │   │   ├── AppointmentForm.tsx
│   │   │   │   ├── Calendar.tsx
│   │   │   │   ├── AppointmentList.tsx
│   │   │   │   ├── AppointmentCard.tsx
│   │   │   │   ├── TimeSlots.tsx
│   │   │   │   ├── CalendarView.tsx
│   │   │   │   └── AppointmentStatus.tsx
│   │   │   │
│   │   │   ├── Reviews/
│   │   │   │   ├── ReviewForm.tsx
│   │   │   │   ├── ReviewList.tsx
│   │   │   │   ├── ReviewCard.tsx
│   │   │   │   ├── RatingStars.tsx
│   │   │   │   ├── ReviewFilters.tsx
│   │   │   │   └── AverageRating.tsx
│   │   │   │
│   │   │   ├── Auth/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   ├── ProtectedRoute.tsx
│   │   │   │   ├── ForgotPassword.tsx
│   │   │   │   └── ResetPassword.tsx
│   │   │   │
│   │   │   └── Dashboard/
│   │   │       ├── DashboardLayout.tsx
            ├── Admin/
            │   ├── Dashboard.tsx
            │   ├── Statistics.tsx
            │   ├── UserManagement.tsx
            │   └── ActivityLog.tsx 
                ├── AppointmentManagement.tsx
│   │   │       ├── AdminPanel.tsx
│   │   │       ├── SuperAdminPanel.tsx
│   │   │      
│   │   │   └── User/
                ├── Dashboard.tsx
                ├── Profile.tsx
                ├── MyAppointments.tsx
                ├── Favorites.tsx
                └── Settings.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Products.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   ├── Appointments.tsx
│   │   │   ├── MyAppointments.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── ForgotPassword.tsx
│   │   │   └── NotFound.tsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useProducts.ts
│   │   │   ├── useAppointments.ts
│   │   │   ├── useDebounce.ts
│   │   │   ├── usePagination.ts
│   │   │   ├── useReviews.ts
│   │   │   ├── useFetch.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   ├── useForm.ts
│   │   │   └── useAsync.ts
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.tsx
│   │   │   ├── UserContext.tsx
│   │   │   ├── NotificationContext.tsx
│   │   │   └── AppContext.tsx
│   │   │
│   │   ├── store/
│   │   │   ├── authStore.ts
│   │   │   ├── aauthStore.ts
│   │   │   ├── productService.ts
│   │   │   ├── appointmentStore.ts
│   │   │   ├── reviewService.ts
            ├── index.ts
│   │   │   └── userService.ts
│   │   │
│   │   ├── types/
│   │   │   ├── user.ts
│   │   │   ├── product.ts
│   │   │   ├── appointment.ts
│   │   │   ├── review.ts
│   │   │   ├── api.ts
│   │   │   └── global.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── validators.ts
│   │   │   ├── formatters.ts
│   │   │   ├── constants.ts
│   │   │   ├── helpers.ts
│   │   │   ├── dateUtils.ts
            ├──storage.ts
│   │   │   └── errorMessages.ts
│   │   │
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   │   ├── logo.svg
│   │   │   │   ├── hero.jpg
│   │   │   │   └── ...
│   │   │   ├── icons/
│   │   │   │   ├── check.svg
│   │   │   │   ├── close.svg
│   │   │   │   └── ...
│   │   │   └── fonts/
│   │   │       └── ...
│   │   │
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   │
│   ├── .env.example
│   ├── .env.local (À IGNORER)
│   ├── .gitignore
│   ├── .eslintrc.cjs
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── README.md
│   └── .github/
│       └── workflows/
│           └── deploy.yml (CI/CD Netlify)
│
│
├── zen-massage-backend/                     # API Express
│   │
│   ├── src/
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── productController.ts
│   │   │   ├── appointmentController.ts
│   │   │   ├── reviewController.ts
│   │   │   ├── userController.ts
│   │   │   └── healthController.ts
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   ├── productRoutes.ts
│   │   │   ├── appointmentRoutes.ts
│   │   │   ├── reviewRoutes.ts
│   │   │   ├── userRoutes.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── middlewares/
│   │   │   ├── auth.ts
│   │   │   ├── roleCheck.ts
│   │   │   ├── errorHandler.ts
│   │   │   ├── validation.ts
│   │   │   ├── logging.ts
│   │   │   ├── cors.ts
│   │   │   └── rateLimit.ts
│   │   │
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   ├── productService.ts
│   │   │   ├── appointmentService.ts
│   │   │   ├── reviewService.ts
│   │   │   ├── userService.ts
│   │   │   ├── emailService.ts
│   │   │   └── fileUploadService.ts 
│   │   │
│   │   ├── utils/
│   │   │   ├── jwt.ts
│   │   │   ├── validators.ts
│   │   │   ├── errorMessages.ts
│   │   │   ├── constants.ts
│   │   │   ├── helpers.ts
│   │   │   ├── bcrypt.ts
│   │   │   └── logger.ts
│   │   │
│   │   ├── types/
│   │   │   ├── user.ts
│   │   │   ├── product.ts
│   │   │   ├── appointment.ts
│   │   │   ├── review.ts
│   │   │   ├── requests.ts
│   │   │   ├── responses.ts
│   │   │   └── common.ts
│   │   │
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   ├── seed.ts
│   │   │   └── migrations/
│   │   │       └── ... (fichiers de migration générés)
│   │   │
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── dist/                           (Build output - À IGNORER)
│   │   └── ...
│   │
│   ├── .env.example
│   ├── .env.local (À IGNORER)
│   ├── .env.production (À IGNORER)
│   ├── .gitignore
│   ├── package.json
│   ├── tsconfig.json
│   ├── README.md
│   ├── docker-compose.yml (Optionnel pour dev local)
│   │
│   └── .github/
│       └── workflows/
│           └── deploy.yml (CI/CD Render)
│
│
├── .gitignore (RACINE DU PROJET)
├── README.md (RACINE - Aperçu complet du projet)
└── STRUCTURE.md (Ce fichier)


# ============================================================================
# DESCRIPTION DES DOSSIERS CLÉS
# ============================================================================

## FRONTEND (src/)

### components/
- **Common:** Composants réutilisables (Header, Footer, Modal, etc.)
- **Products:** Tout ce qui concerne l'affichage des produits
- **Appointments:** Gestion des rendez-vous et calendrier
- **Reviews:** Avis, commentaires, évaluations
- **Auth:** Formulaires de connexion/inscription
- **Dashboard:** Panneaux d'administration

### hooks/
- Logique réutilisable
- Gestion de l'état local
- Appels API

### context/
- État global (authentification, notifications)
- Accessible de partout dans l'app

### services/
- Appels API
- Logique métier côté client

### utils/
- Fonctions utilitaires
- Validateurs
- Formatters (dates, nombres, etc.)

### styles/
- CSS global
- Variables et thème
- Responsive design


## BACKEND (src/)

### controllers/
- Logique métier
- Gestion des requêtes/réponses
- Validation des inputs

### routes/
- Définition des endpoints
- Association avec les contrôleurs

### middlewares/
- Authentification JWT
- Vérification des rôles
- Gestion des erreurs
- Logging

### services/
- Logique métier compliquée
- Intéraction avec la BD
- Services externes (email, upload)

### utils/
- Fonctions utilitaires
- JWT
- Hashing de mots de passe

### prisma/
- Schema de la base de données
- Migrations
- Seed (données initiales)
```
### Fichiers de Configuration Clés

**package.json (Dependencies):**
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.0",
    "tailwindcss": "^3.4.0",
    "react-icons": "^4.12.0",
    "zustand": "^4.4.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/react": "^18.2.0",
    "vite": "^5.0.0"
  }
}
```

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"]
    }
  }
}
```

---

## STRUCTURE BACKEND

### Organisation des Répertoires


### Endpoints API Complète

#### 🔐 AUTHENTIFICATION

```
POST   /api/auth/register
       Body: { email, password, firstName, lastName, phone }
       Response: { token, user }

POST   /api/auth/login
       Body: { email, password }
       Response: { accessToken, refreshToken, user }

POST   /api/auth/refresh
       Body: { refreshToken }
       Response: { accessToken }

POST   /api/auth/logout
       (Invalider tokens)

POST   /api/auth/forgot-password
       Body: { email }
       Response: { message }

POST   /api/auth/reset-password
       Body: { token, newPassword }
       Response: { message }
```

#### 📦 PRODUITS

```
GET    /api/produits
       Query: ?categorie=xxx&tri=prix&recherche=xxx&page=1
       Response: { produits: [], total, pages }

GET    /api/produits/:id
       Response: { produit, avisRelatifs: [] }

POST   /api/produits (ADMIN)
       Body: { nom, description, prix, categorie, images, stock }
       Response: { produit }

PUT    /api/produits/:id (ADMIN)
       Body: { nom, description, prix, ... }
       Response: { produit }

DELETE /api/produits/:id (ADMIN)
       Response: { message }

POST   /api/produits/:id/like
       Response: { likes: number }

DELETE /api/produits/:id/like
       Response: { likes: number }

GET    /api/produits/:id/likes/count
       Response: { count }
```

#### ⭐ AVIS ET COMMENTAIRES

```
POST   /api/avis
       Body: { productId, note, titre, contenu }
       Response: { avis }

GET    /api/avis/produit/:productId
       Query: ?tri=recent&page=1
       Response: { avis: [], total }

PUT    /api/avis/:id
       Body: { note, titre, contenu }
       Response: { avis }

DELETE /api/avis/:id
       Response: { message }

GET    /api/avis/:productId/moyenne
       Response: { moyenne: 4.5, total: 120 }
```

#### 📅 RENDEZ-VOUS

```
POST   /api/rendez-vous
       Body: { date, heure, typeSeance, duree, notes }
       Response: { rendezVous }

GET    /api/rendez-vous/mes
       Response: { rendezVous: [] }

GET    /api/rendez-vous/tous (ADMIN)
       Query: ?statut=pending&date=2026-06-15
       Response: { rendezVous: [] }

PUT    /api/rendez-vous/:id/statut (ADMIN)
       Body: { statut: "confirmé|refusé|reporté", raison? }
       Response: { rendezVous }

DELETE /api/rendez-vous/:id
       Response: { message }

GET    /api/rendez-vous/disponibilites
       Query: ?date=2026-06-15&duree=60
       Response: { horaires: ["09:00", "10:00", ...] }

GET    /api/rendez-vous/configuration (ADMIN)
       Response: { horaires, jours_fermes, exceptions }

PUT    /api/rendez-vous/configuration (ADMIN)
       Body: { horaires, jours_fermes, exceptions }
       Response: { configuration }
```

#### 👤 UTILISATEURS (SUPER ADMIN)

```
GET    /api/utilisateurs
       Query: ?role=admin&page=1
       Response: { utilisateurs: [], total }

GET    /api/utilisateurs/:id
       Response: { utilisateur }

PUT    /api/utilisateurs/:id/role
       Body: { role: "user|admin|super_admin" }
       Response: { utilisateur }

DELETE /api/utilisateurs/:id
       Response: { message }

GET    /api/utilisateurs/:id/activites
       Response: { activites: [] }
```

#### 👤 MON PROFIL

```
GET    /api/profil
       Response: { utilisateur }

PUT    /api/profil
       Body: { firstName, lastName, phone, avatar }
       Response: { utilisateur }

PUT    /api/profil/password
       Body: { ancienMotDePasse, nouveauMotDePasse }
       Response: { message }

DELETE /api/profil
       Response: { message }
```

---

## SCHÉMA BASE DE DONNÉES

### Modèle Prisma Complet

```prisma
// ============================================
// ÉNUMÉRATIONS
// ============================================

enum UserRole {
  SUPER_ADMIN
  ADMIN
  USER
}

enum AppointmentStatus {
  PENDING
  CONFIRMED
  COMPLETED
  CANCELLED
}

// ============================================
// UTILISATEURS
// ============================================

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String    // Hash bcrypt
  firstName     String
  lastName      String
  phone         String?
  avatar        String?   // URL vers image Cloudinary
  role          UserRole  @default(USER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  deletedAt     DateTime? // Soft delete
  
  // Relations
  appointments  Appointment[]
  reviews       Review[]
  likes         Like[]
  
  @@index([email])
  @@index([role])
}

// ============================================
// PRODUITS ET CATÉGORIES
// ============================================

model Categorie {
  id            String    @id @default(cuid())
  nom           String    @unique
  description   String?
  icone         String?
  ordre         Int       @default(0)
  createdAt     DateTime  @default(now())
  
  produits      Produit[]
  
  @@index([nom])
}

model Produit {
  id            String    @id @default(cuid())
  nom           String
  description   String
  prix          Float
  stock         Int
  categorie_id  String
  images        String[]  // URLs Cloudinary
  sku           String?   @unique
  publie        Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  categorie     Categorie @relation(fields: [categorie_id], references: [id])
  avis          Avis[]
  likes         Like[]
  
  @@index([categorie_id])
  @@index([publie])
  @@fulltext([nom, description]) // Pour recherche full-text
}

// ============================================
// AVIS ET ÉVALUATIONS
// ============================================

model Avis {
  id            String    @id @default(cuid())
  note          Int       // 1-5
  titre         String
  contenu       String
  produit_id    String
  utilisateur_id String
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  produit       Produit   @relation(fields: [produit_id], references: [id], onDelete: Cascade)
  utilisateur   User      @relation(fields: [utilisateur_id], references: [id], onDelete: Cascade)
  
  // Contraintes
  @@unique([utilisateur_id, produit_id]) // Un avis par utilisateur par produit
  @@index([produit_id])
  @@index([utilisateur_id])
}

// ============================================
// LIKES
// ============================================

model Like {
  id            String    @id @default(cuid())
  utilisateur_id String
  produit_id    String
  createdAt     DateTime  @default(now())
  
  // Relations
  utilisateur   User      @relation(fields: [utilisateur_id], references: [id], onDelete: Cascade)
  produit       Produit   @relation(fields: [produit_id], references: [id], onDelete: Cascade)
  
  // Contraintes
  @@unique([utilisateur_id, produit_id])
  @@index([produit_id])
}

// ============================================
// RENDEZ-VOUS
// ============================================

model TypeSeance {
  id            String    @id @default(cuid())
  nom           String    @unique
  description   String
  durees        Int[]     // [30, 60, 90]
  prix          Float
  createdAt     DateTime  @default(now())
  
  rendezVous    RendezVous[]
}

model RendezVous {
  id            String    @id @default(cuid())
  utilisateur_id String
  date_heure    DateTime
  duree         Int       // minutes
  type_seance_id String
  notes         String?
  statut        AppointmentStatus @default(PENDING)
  raison_refus  String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  utilisateur   User      @relation(fields: [utilisateur_id], references: [id], onDelete: Cascade)
  type_seance   TypeSeance @relation(fields: [type_seance_id], references: [id])
  
  @@index([utilisateur_id])
  @@index([date_heure])
  @@index([statut])
}

// ============================================
// CONFIGURATION
// ============================================

model Configuration {
  id            String    @id @default(cuid())
  cle           String    @unique
  valeur        String    // JSON stringifié
  description   String?
  updatedAt     DateTime  @updatedAt
}
```

### Schéma Visuel

```
                    USER
                     |
        ├────────────┼────────────┐
        |            |            |
    APPOINTMENTS  REVIEWS      LIKES
        |            |            |
        |            |            |
     PRODUCT ←───────┴────────────┘
        |
      CATEGORIE
        |
    TYPE_SEANCE
```

### Migrations Prisma

```bash
# Créer la migration
npx prisma migrate dev --name init

# Appliquer en production
npx prisma migrate deploy

# Seed (données initiales)
npx prisma db seed
```

---

## PLAN DE DÉVELOPPEMENT

### Timeline Estimée: 10-12 semaines

### PHASE 1: PRÉPARATION & SETUP (Semaine 1)

#### Frontend
- [ ] Créer le projet Vite + React + TypeScript
- [ ] Configurer Tailwind CSS
- [ ] Configurer React Router
- [ ] Créer la structure des répertoires
- [ ] Setup Axios avec intercepteurs
- [ ] Créer les composants de base (Header, Footer, etc.)

#### Backend
- [ ] Créer le projet Node.js/Express
- [ ] Configurer TypeScript
- [ ] Créer la structure des répertoires
- [ ] Configurer Prisma avec PostgreSQL local
- [ ] Configurer variables d'environnement

**Livrables:** Structure de base, environnements configurés

---

### PHASE 2: AUTHENTIFICATION (Semaine 2)

#### Backend
- [ ] Modèles Prisma (User)
- [ ] API Register: POST /api/auth/register
- [ ] API Login: POST /api/auth/login
- [ ] API Refresh: POST /api/auth/refresh
- [ ] Middleware d'authentification JWT
- [ ] Middleware de vérification des rôles
- [ ] Service d'email (confirmation, reset)

#### Frontend
- [ ] Page de connexion
- [ ] Page d'inscription
- [ ] Context d'authentification
- [ ] Hook useAuth
- [ ] Protected Routes
- [ ] Gestion des tokens (localStorage + localStorage)

**Tests:**
- [ ] Test inscription nouveau utilisateur
- [ ] Test connexion et tokens
- [ ] Test refresh token
- [ ] Test accès refusé sans token

**Livrables:** Système d'authentification complet et sécurisé

---

### PHASE 3: GESTION DES PRODUITS (Semaines 3-4)

#### Backend
- [ ] Modèles Prisma (Produit, Categorie)
- [ ] Service d'upload d'images (Cloudinary ou local)
- [ ] CRUD Produits (Create, Read, Update, Delete)
- [ ] CRUD Catégories
- [ ] Filtrage, recherche, tri
- [ ] Validation des données

#### Frontend
- [ ] Page liste des produits avec grille responsive
- [ ] Formulaire de création/édition (Admin)
- [ ] Page détail produit
- [ ] Composant de filtrage
- [ ] Composant de recherche
- [ ] Upload d'images avec prévisualisation

**Tests:**
- [ ] Créer un produit (Admin)
- [ ] Modifier un produit
- [ ] Supprimer un produit
- [ ] Filtrer par catégorie
- [ ] Recherche en temps réel

**Livrables:** Catalogue produits fonctionnel

---

### PHASE 4: SYSTÈME D'AVIS & LIKES (Semaine 5)

#### Backend
- [ ] Modèles Prisma (Avis, Like)
- [ ] API CRUD Avis
- [ ] API CRUD Likes
- [ ] Calcul automatique de la note moyenne
- [ ] Validation (un avis par utilisateur, une note 1-5)
- [ ] Modération des avis

#### Frontend
- [ ] Composant formulaire d'avis (note, titre, contenu)
- [ ] Liste des avis avec affichage
- [ ] Composant RatingStars
- [ ] Bouton Like/Unlike
- [ ] Affichage du nombre de likes
- [ ] Filtre des avis par note

**Tests:**
- [ ] Ajouter un avis
- [ ] Supprimer son avis
- [ ] Liker/Unliker un produit
- [ ] Voir note moyenne

**Livrables:** Système d'avis et likes complet

---

### PHASE 5: GESTION DES RENDEZ-VOUS (Semaines 6-7)

#### Backend
- [ ] Modèles Prisma (RendezVous, TypeSeance)
- [ ] Configuration des horaires (CRUD)
- [ ] API prise de rendez-vous
- [ ] API lister rendez-vous (client et admin)
- [ ] API changer statut RDV (admin)
- [ ] Calcul des créneaux disponibles
- [ ] Service d'email pour confirmations

#### Frontend
- [ ] Composant Calendrier (React Calendar ou FullCalendar)
- [ ] Formulaire de prise de RDV (date, heure, type, durée)
- [ ] Page "Mes Rendez-Vous"
- [ ] Dashboard Admin avec calendrier des RDV
- [ ] Affichage des créneaux disponibles
- [ ] Configuration des disponibilités (Admin)

**Tests:**
- [ ] Prendre un rendez-vous
- [ ] Voir les créneaux disponibles
- [ ] Voir ses RDV
- [ ] Annuler un RDV
- [ ] Admin: Accepter/Refuser RDV

**Livrables:** Système de gestion des rendez-vous complet

---

### PHASE 6: DASHBOARDS & PROFILS (Semaines 8-9)

#### Backend
- [ ] API Profil utilisateur (GET, PUT, DELETE)
- [ ] API Statistiques (produits populaires, RDV, etc.)
- [ ] Gestion des utilisateurs pour Super Admin
- [ ] Historique d'activités

#### Frontend
- [ ] Dashboard Client (profil, mes RDV, mes avis)
- [ ] Dashboard Admin (produits, RDV, modération)
- [ ] Dashboard Super Admin (gestion utilisateurs)
- [ ] Page Profil avec édition
- [ ] Statistiques et graphiques

**Tests:**
- [ ] Modifier son profil
- [ ] Changer mot de passe
- [ ] Voir ses statistiques
- [ ] Super Admin: Ajouter/Modifier rôles

**Livrables:** Dashboards et gestion des utilisateurs

---

### PHASE 7: INTÉGRATION & OPTIMISATION (Semaine 10)

#### Backend
- [ ] Tester tous les endpoints
- [ ] Gérer les erreurs et exceptions
- [ ] Logging et monitoring
- [ ] Optimisation des requêtes DB
- [ ] Validation des inputs
- [ ] Sécurité: CORS, Rate limiting, etc.

#### Frontend
- [ ] Tester tous les flux utilisateur
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Performance (lazy loading, code splitting)
- [ ] Accessibilité (a11y)
- [ ] Messages d'erreur clairs
- [ ] Loading states et skeletons

**Tests:**
- [ ] Tests manuels complets
- [ ] Cross-browser testing
- [ ] Test responsive

**Livrables:** Plateforme stable et optimisée

---

### PHASE 8: DÉPLOIEMENT (Semaine 11)

#### Frontend (Netlify)
- [ ] Connecter le repo GitHub
- [ ] Configurer les variables d'environnement
- [ ] Tester le déploiement
- [ ] Custom domain (optionnel)
- [ ] Setup HTTPS

#### Backend (Render)
- [ ] Créer une PostgreSQL database
- [ ] Créer une Web Service
- [ ] Configurer les variables d'environnement
- [ ] Exécuter les migrations
- [ ] Tester les endpoints en production

**Livrables:** Plateforme en ligne et accessible

---

### PHASE 9: TESTS & AJUSTEMENTS (Semaine 12)

- [ ] Tests utilisateurs réels
- [ ] Corrections de bugs
- [ ] Optimisations basées sur les retours
- [ ] Documentation
- [ ] Formation utilisateur

**Livrables:** Plateforme prête pour la production

---

## DÉPLOIEMENT

### Configuration Netlify (Frontend)

#### Étapes

1. **Pousser le code sur GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connecter à Netlify**
   - Aller sur netlify.com
   - "Add new site" → "Connect to Git"
   - Sélectionner GitHub et le repo
   - Configuration:
     ```
     Build command: npm run build
     Publish directory: dist/
     ```

3. **Variables d'environnement**
   - Aller dans Site settings → Build & deploy → Environment
   - Ajouter:
     ```
     VITE_API_URL=https://zen-massage-api.onrender.com
     ```

4. **Custom domain (optionnel)**
   - Acheter un domaine (.com, .ga, etc.)
   - Configurer les DNS
   - Ajouter dans Netlify

#### Avantages Netlify
- ✅ Gratuit avec limites généreuses
- ✅ CI/CD automatique (push → déploiement)
- ✅ CDN global
- ✅ HTTPS automatique
- ✅ Analytics intégré
- ✅ Forms support

---

### Configuration Render (Backend)

#### Étapes

1. **Pousser le code sur GitHub**
   ```bash
   git push origin main
   ```

2. **Créer une PostgreSQL Database**
   - Aller sur render.com → Databases
   - "New Database" → PostgreSQL
   - Nom: `zen-massage-db`
   - Région: Proche de vos utilisateurs (EU)
   - Copier la CONNECTION_STRING

3. **Créer une Web Service**
   - "New" → "Web Service"
   - Connecter GitHub
   - Configuration:
     ```
     Name: zen-massage-api
     Environment: Node
     Build command: npm install && npx prisma migrate deploy
     Start command: npm start
     Région: Singapour ou Francfort
     ```

4. **Variables d'environnement**
   - Ajouter dans Render:
     ```
     DATABASE_URL=postgres://...
     NODE_ENV=production
     JWT_SECRET=votre_secret_très_long_et_sécurisé
     JWT_REFRESH_SECRET=secret_refresh
     PORT=10000
     FRONTEND_URL=https://zen-massage.netlify.app
     ```

5. **Déployer**
   - Le déploiement se fera automatiquement à chaque push

#### Avantages Render
- ✅ PostgreSQL gratuit (500MB)
- ✅ Web Service gratuit avec 750 heures/mois
- ✅ CI/CD automatique
- ✅ Scaling facile
- ✅ Monitoring inclus
- ✅ Logs en temps réel

---

### Checklist Pré-Déploiement

```
BACKEND
☐ Variables d'environnement correctes
☐ Base de données en production
☐ Tests des endpoints (Postman)
☐ CORS configuré pour le domaine frontend
☐ Erreurs gérées correctement
☐ Logs configurés
☐ Rate limiting activé
☐ Validation des inputs
☐ JWT secrets sécurisés (min 32 caractères)
☐ Passwords hashés
☐ Emails fonctionnels

FRONTEND
☐ Variables d'environnement correctes
☐ API_URL pointe vers le backend
☐ Build sans erreurs: npm run build
☐ Pas de console.log de debug
☐ Images optimisées
☐ Code splitting implementé
☐ HTTPS en place
☐ Meta tags pour SEO
☐ Service Worker (optionnel, PWA)
☐ Tests de performance
```

---

## SÉCURITÉ

### Mesures Essentielles

#### Frontend
```typescript
// 1. Valider les inputs
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

// 2. Stocker les tokens de manière sécurisée
const token = localStorage.getItem('accessToken');
// Mieux: useSessionStorage ou crypto-js

// 3. HTTPS obligatoire en production
if (process.env.NODE_ENV === 'production') {
  // Vérifier HTTPS
}

// 4. CORS depuis le frontend
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// 5. Échapper les affichages dynamiques
<div>{DOMPurify.sanitize(userInput)}</div>

// 6. Éviter le XSS
// ❌ dangerouslySetInnerHTML
// ✅ Renderer normal du React
```

#### Backend
```typescript
// 1. Hasher les mots de passe
import bcrypt from 'bcryptjs';
const hashedPassword = await bcrypt.hash(password, 10);

// 2. JWT avec expiration
const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);

// 3. Valider côté serveur
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});
schema.parse(req.body);

// 4. CORS strict
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// 5. Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

// 6. SQL Injection prévention (Prisma ORM)
// Prisma utilise des parameterized queries automatiquement

// 7. Middleware d'authentification
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Non autorisé' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Token invalide' });
  }
};

// 8. Middleware de vérification des rôles
const roleCheck = (roles: string[]) => {
  return async (req, res, next) => {
    const user = await prisma.user.findUnique({
      where: { id: req.userId }
    });
    if (!roles.includes(user.role)) {
      return res.status(403).json({ error: 'Accès refusé' });
    }
    next();
  };
};

// 9. HTTPS obligatoire
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  }
  next();
});

// 10. Headers de sécurité
const helmet = require('helmet');
app.use(helmet());
```

### Gestion des Secrets

```bash
# Exemple .env.local (JAMAIS commiter)
DATABASE_URL="postgresql://user:password@localhost:5432/zen_massage"
JWT_SECRET="votre_secret_très_long_généré_aléatoirement_32_caractères_minimum"
JWT_REFRESH_SECRET="autre_secret_très_long_32_caractères"
FRONTEND_URL="http://localhost:5173"
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
EMAIL_SERVICE="gmail"
EMAIL_USER="votre@email.com"
EMAIL_PASSWORD="app_specific_password"
```

### Checklist Sécurité

- ✅ Toutes les données utilisateur hashées
- ✅ Tokens JWT avec expiration courte
- ✅ CORS restrictif (seulement frontend)
- ✅ Rate limiting activé
- ✅ Validation côté client ET serveur
- ✅ HTTPS en production
- ✅ Secrets en variables d'environnement
- ✅ Logs sensibles non exposés
- ✅ SQL injection impossible (Prisma)
- ✅ XSS prevention (React par défaut)
- ✅ CSRF tokens sur formulaires
- ✅ Passwords forts requis

---

## PROCHAINES ÉTAPES

### Pour commencer:

1. **Créer les repos GitHub:**
   ```bash
   # Frontend
   gh repo create zen-massage-frontend --public
   
   # Backend
   gh repo create zen-massage-backend --public
   ```

2. **Initialiser les projets:**
   ```bash
   # Frontend
   npm create vite@latest zen-massage-frontend -- --template react-ts
   cd zen-massage-frontend
   npm install -D tailwindcss postcss autoprefixer
   npm install axios react-router-dom zustand
   
   # Backend
   mkdir zen-massage-backend
   cd zen-massage-backend
   npm init -y
   npm install express prisma @prisma/client dotenv cors bcryptjs jsonwebtoken
   npm install -D typescript @types/express @types/node
   ```

3. **Configurer Prisma:**
   ```bash
   npx prisma init
   # Éditer .env avec DATABASE_URL
   # Éditer prisma/schema.prisma
   npx prisma migrate dev --name init
   ```

4. **Déployer progressivement:**
   - Phase 1: Authentification en local
   - Phase 2: Produits en local
   - Phase 3: Rendez-vous en local
   - Phase 4: Tests complets
   - Phase 5: Déployer sur Render + Netlify

---

## RESSOURCES UTILES

- **React Documentation:** https://react.dev
- **TypeScript Handbook:** https://www.typescriptlang.org/docs/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Express.js:** https://expressjs.com/
- **Prisma:** https://www.prisma.io/docs/
- **JWT:** https://jwt.io/
- **Render Docs:** https://render.com/docs
- **Netlify Docs:** https://docs.netlify.com

---

## CONCLUSION

Ce cahier des charges fournit une feuille de route claire et complète pour développer **ZEN MASSAGE & WELLNESS**. 

La stack proposée (React + TypeScript + Node.js + PostgreSQL) est :
- ✅ Moderne et maintenable
- ✅ Sécurisée
- ✅ Gratuite à déployer (Render + Netlify)
- ✅ Scalable pour une croissance future

