# Documentation Complète — ZEN MASSAGE & WELLNESS

> Explication détaillée de chaque dossier et fichier de l'application.

---

## STRUCTURE GLOBALE DU PROJET

```
zen-MASSAGE/
├── zen-massage-backend/     ← API Node.js/Express (serveur)
├── zen-massage-frontend/    ← Application React (interface)
├── zen.md                   ← Cahier des charges original
└── wariss.md                ← Ce fichier de documentation
```

---

## BACKEND — `zen-massage-backend/`

### Ce que c'est
Le backend est le **cerveau** de l'application. Il reçoit les requêtes du frontend, traite les données, communique avec la base de données PostgreSQL, et renvoie des réponses JSON.

**Stack :** Node.js + Express + TypeScript + Prisma ORM + PostgreSQL

---

### `prisma/`

```
prisma/
├── schema.prisma       ← Définition de TOUTE la base de données
├── migrations/         ← Historique des modifications de la BDD
│   ├── 20260722.../   ← Migration initiale (création des tables)
│   └── 20260728.../   ← Ajout du champ sku_number
└── migration_lock.toml ← Fichier de verrouillage (ne pas toucher)
```

**`schema.prisma`** — C'est le fichier le plus important du backend. Il décrit toutes les tables de la base de données :

| Modèle | Description |
|--------|-------------|
| `User` | Utilisateurs (clients, admins, super admin) |
| `Categorie` | Catégories de produits |
| `Produit` | Produits en vente |
| `Avis` | Avis/commentaires sur les produits |
| `Like` | Likes sur les produits |
| `TypeSeance` | Types de massage disponibles |
| `RendezVous` | Rendez-vous pris par les clients |
| `Commande` | Commandes de produits |
| `LigneCommande` | Détail des articles dans une commande |
| `Configuration` | Paramètres système (horaires, etc.) |

**Enums (statuts fixes) :**
- `UserRole` : `USER`, `ADMIN`, `SUPER_ADMIN`
- `AppointmentStatus` : `PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`
- `OrderStatus` : `PENDING`, `CONFIRMED`, `SHIPPED`, `DELIVERED`, `CANCELLED`

---

### `src/`

```
src/
├── server.ts           ← Point d'entrée — démarre le serveur
├── prisma.ts           ← Instance unique de Prisma (connexion BDD)
├── controllers/        ← Logique de chaque endpoint
├── routes/             ← Définition des URLs
├── services/           ← Logique métier (calculs, BDD)
├── middlewares/        ← Fonctions exécutées avant/après les requêtes
├── utils/              ← Fonctions utilitaires réutilisables
├── types/              ← Types TypeScript du backend
└── generated/prisma/   ← Code Prisma auto-généré (ne pas modifier)
```

---

#### `src/server.ts`
Le fichier qui **démarre** le serveur Express sur le port 4000. Configure :
- CORS (autorise le frontend à communiquer)
- JSON parser (lit les requêtes JSON)
- Cookie parser (lit les cookies d'auth)
- Serveur de fichiers statiques (`/uploads`)
- Toutes les routes sous `/api`

---

#### `src/controllers/`
Chaque fichier gère les **requêtes HTTP** d'une ressource. Reçoit la requête, appelle le service correspondant, renvoie la réponse JSON.

| Fichier | Gère |
|---------|------|
| `authController.ts` | Inscription, connexion, déconnexion, profil |
| `productController.ts` | CRUD produits, catégories, likes |
| `appointmentController.ts` | CRUD rendez-vous, types de séance, config horaires |
| `reviewController.ts` | CRUD avis/commentaires |
| `userController.ts` | Gestion des utilisateurs (admin) |
| `orderController.ts` | CRUD commandes, changement statut |
| `healthController.ts` | Endpoint `/health` pour vérifier que l'API tourne |

---

#### `src/routes/`
Définit les **URLs** de l'API et les associe aux controllers.

| Fichier | URLs |
|---------|------|
| `index.ts` | Regroupe toutes les routes sous `/api` |
| `authRoutes.ts` | `/api/auth/*` |
| `productRoutes.ts` | `/api/products/*` |
| `appointmentRoutes.ts` | `/api/appointments/*` |
| `reviewRoutes.ts` | `/api/reviews/*` |
| `userRoutes.ts` | `/api/users/*` |
| `orderRoutes.ts` | `/api/orders/*` |

---

#### `src/services/`
La **logique métier** — ce qui se passe vraiment (requêtes BDD, calculs, validations).

| Fichier | Responsabilité |
|---------|----------------|
| `authService.ts` | Hash mdp, vérification email, génération token JWT |
| `productService.ts` | CRUD produits, filtres, pagination, gestion likes |
| `appointmentService.ts` | Vérification créneaux, détection conflits, CRUD rdv, CRUD TypeSeance |
| `appointmentConfigService.ts` | Lecture/écriture config horaires en BDD |
| `reviewService.ts` | CRUD avis, calcul note moyenne |
| `userService.ts` | Gestion profils utilisateurs |
| `orderService.ts` | Création commande + transaction BDD (commande + lignes + décrémentation stock), génération numéro `BEN-CMD-001`, annulation avec réapprovisionnement |

---

#### `src/middlewares/`
Fonctions qui s'exécutent **entre** la requête et le controller.

| Fichier | Rôle |
|---------|------|
| `auth.ts` | Vérifie le token JWT dans le cookie — bloque si non connecté |
| `roleCheck.ts` | Vérifie le rôle (`requireRole('ADMIN')`) — bloque si pas le bon rôle |
| `errorHandler.ts` | Gère toutes les erreurs et renvoie un message JSON propre |
| `validation.ts` | Vérifie que les champs obligatoires sont présents dans le body |
| `cors.ts` | Configure CORS pour autoriser le frontend |

---

#### `src/utils/`
Fonctions utilitaires partagées.

| Fichier | Contenu |
|---------|---------|
| `jwt.ts` | Génère et vérifie les tokens JWT |
| `bcrypt.ts` | Hash et vérifie les mots de passe |
| `constants.ts` | Nom du cookie, options cookie |
| `logger.ts` | Logs console formatés |

---

### `seed.ts`
Script à exécuter **une seule fois** pour peupler la BDD avec les données initiales :
- Compte Super Admin (`superadmin@ben.com` / `SuperAdmin123!`)
- Compte Admin (`admin@ben.com` / `Admin123!`)
- 6 types de massage (Consultation, Détox, Plantaire, Semi, Complet, Cure)

Pour l'exécuter : `npm run seed`

---

### `.env`
Variables d'environnement sensibles (ne jamais committer sur Git) :
- `DATABASE_URL` — URL de connexion PostgreSQL
- `JWT_SECRET` — Clé secrète pour signer les tokens
- `PORT` — Port du serveur (4000)
- `FRONTEND_URL` — URL du frontend pour CORS

---

## FRONTEND — `zen-massage-frontend/`

### Ce que c'est
L'interface visuelle de l'application. Tout ce que l'utilisateur voit et avec quoi il interagit. Construit en **React 18 + TypeScript + Tailwind CSS**.

---

### `src/`

```
src/
├── main.tsx            ← Point d'entrée React
├── App.tsx             ← Toutes les routes de l'application
├── index.css           ← Styles globaux
├── components/         ← Composants réutilisables
├── pages/              ← Pages de l'application
├── context/            ← État global (auth, panier)
├── services/           ← Appels à l'API backend
├── hooks/              ← Logique réutilisable
├── types/              ← Types TypeScript frontend
├── utils/              ← Fonctions utilitaires
├── store/              ← Stores Zustand
├── config/             ← Configuration (env, rôles)
├── lib/                ← Librairies (axios config)
└── styles/             ← CSS global
```

---

### `src/main.tsx`
Point d'entrée de React. Initialise l'application avec les providers :
- `BrowserRouter` — gestion des URLs
- `AuthProvider` — état de connexion disponible partout
- `CartProvider` — panier disponible partout

---

### `src/App.tsx`
Définit **toutes les routes** de l'application et les protège selon le rôle :

| Composant de garde | Comportement |
|-------------------|--------------|
| `GuestOnly` | Redirige vers le dashboard si déjà connecté |
| `RequireUser` | Redirige vers `/login` si non connecté |
| `RequireAdmin` | Redirige si pas ADMIN/SUPER_ADMIN |
| `RequireSuperAdmin` | Redirige si pas SUPER_ADMIN |

**Routes publiques :** `/`, `/about`, `/products`, `/products/:id`, `/services`
**Routes user :** `/account`, `/appointments`, `/orders`, `/profile`, `/checkout`
**Routes admin :** `/admin`, `/admin/bookings`, `/admin/products`, `/admin/analytics`, etc.

---

### `src/context/`

#### `AuthContext.tsx`
Gère l'état de connexion dans toute l'application.
- **`user`** : l'utilisateur connecté (ou null)
- **`loading`** : true pendant la vérification initiale
- **`login()`** : connecte l'utilisateur, met à jour `user`
- **`logout()`** : déconnecte, vide `user`
- **`refreshUser()`** : recharge les infos utilisateur depuis l'API

Au démarrage, il appelle automatiquement `/api/auth/me` pour vérifier si l'utilisateur est déjà connecté (via le cookie).

#### `CartContext.tsx`
Gère le panier d'achat avec `useReducer`.
- **`items`** : liste des articles dans le panier
- **`totalItems`** : nombre total d'articles
- **`totalPrice`** : prix total
- **`addItem()`** : ajoute ou incrémente un article
- **`removeItem()`** : supprime un article
- **`updateQty()`** : modifie la quantité
- **`clearCart()`** : vide le panier

Le panier est **persisté en localStorage** (`zen_cart`) — il survit au rechargement de la page.

---

### `src/services/`
Chaque fichier correspond à une ressource de l'API. Tous utilisent `api.ts` comme base.

#### `api.ts`
Wrapper autour de `fetch` natif. Fait les requêtes HTTP avec :
- Credentials (cookies) automatiquement inclus
- Gestion des erreurs JSON
- Retourne directement le JSON parsé

#### `auth.service.ts`
- `register()` — inscription
- `login()` — connexion
- `logout()` — déconnexion
- `me()` — récupère l'utilisateur connecté
- `updateProfile()` — modifie le profil

#### `product.service.ts`
- `getCategories()` / `createCategorie()` / `updateCategorie()` / `deleteCategorie()`
- `listProduits()` — liste avec filtres (catégorie, recherche, tri, pagination)
- `listProduitsAdmin()` — même chose mais inclut les non-publiés
- `getProduit()` — détail d'un produit
- `createProduit()` / `updateProduit()` / `deleteProduit()`
- `toggleLike()` / `getLikesCount()` / `getLikeStatus()`
- `uploadProductImages()` — upload d'images

#### `appointment.service.ts`
- `getTypeSeances()` — types de massage (publics)
- `getAllTypeSeancesAdmin()` — tous les types (admin)
- `createTypeSeance()` / `updateTypeSeance()` / `deleteTypeSeance()`
- `createAppointment()` — prendre un rendez-vous
- `getMyAppointments()` — mes rendez-vous
- `getAllAppointments()` — tous les rendez-vous (admin)
- `updateAppointmentStatus()` — confirmer/refuser (admin)
- `cancelAppointment()` — annuler
- `getScheduleConfig()` / `updateScheduleConfig()` — horaires de travail

#### `review.service.ts`
- `listReviews()` — liste des avis avec filtres
- `listProductReviews()` — avis d'un produit
- `getProductStats()` — note moyenne + distribution
- `createReview()` / `updateReview()` / `deleteReview()`

#### `order.service.ts`
- `createCommande()` — passer une commande
- `getMyCommandes()` — mes commandes (client)
- `cancelCommande()` — annuler une commande
- `getAllCommandes()` — toutes les commandes (admin) avec filtres
- `updateStatut()` — changer le statut (admin)

---

### `src/pages/`

#### Pages publiques
| Page | URL | Description |
|------|-----|-------------|
| `Home.tsx` | `/` | Page d'accueil avec hero, services mis en avant |
| `About.tsx` | `/about` | Page à propos |
| `Services.tsx` | `/services` | Liste des types de massage (données réelles depuis l'API) |
| `Products.tsx` | `/products` | Catalogue produits avec filtres, recherche, tri |
| `ProductDetail.tsx` | `/products/:id` | Détail d'un produit, galerie, avis, bouton panier |

#### Pages authentifiées (USER)
| Page | URL | Description |
|------|-----|-------------|
| `Account.tsx` | `/account` | Dashboard utilisateur (mes rdv) |
| `Appointments.tsx` | `/appointments` | Prise de rendez-vous en 3 étapes |
| `MyAppointments.tsx` | `/appointments/my` | Mes rendez-vous |
| `Checkout.tsx` | `/checkout` | Tunnel de commande (panier réel + données utilisateur pré-remplies) |
| `Orders.tsx` | `/orders` | Mes commandes avec statuts, filtres, annulation |
| `Profile.tsx` | `/profile` | Modification du profil |

#### Pages admin (`src/pages/admin/`)
| Page | URL | Description |
|------|-----|-------------|
| `Dashboard.tsx` | `/admin` | Vue d'ensemble : rdv en attente, produits, avis récents, ventes récentes |
| `Bookings.tsx` | `/admin/bookings` | Gestion des rendez-vous |
| `ProductsManagement.tsx` | `/admin/products` | Liste et gestion des produits |
| `AddProduct.tsx` | `/admin/products/add` | Formulaire ajout produit avec preview live |
| `EditProduct.tsx` | `/admin/products/:id/edit` | Modifier un produit |
| `CategoriesManagement.tsx` | `/admin/categories` | CRUD catégories |
| `OrderHistory.tsx` | `/admin/orders` | Toutes les commandes + changement de statut (livraison) |
| `Statistics.tsx` | `/admin/analytics` | KPIs réels : CA, panier moyen, graphique 6 mois, top produits |
| `Settings.tsx` | `/admin/settings` | Profil, notifications, sécurité, types de massage (CRUD) |
| `SuperAdminPanel.tsx` | `/admin/super` | Gestion des utilisateurs et rôles |

---

### `src/components/`

#### `components/layout/`
| Composant | Rôle |
|-----------|------|
| `Navbar.tsx` | Navigation principale avec menu burger mobile, icône panier avec badge |
| `AdminLayout.tsx` | Layout admin avec sidebar (drawer mobile full-screen sur mobile) |
| `UserLayout.tsx` | Layout espace client avec sidebar + bottom nav mobile |
| `MainLayout.tsx` | Layout public (Navbar + Footer) |
| `Footer.tsx` | Pied de page |

#### `components/ui/`
Composants réutilisables partout :
| Composant | Description |
|-----------|-------------|
| `Select.tsx` | Dropdown custom stylisé (fond vert clair, actif vert sage) |
| `Toast.tsx` | Notification temporaire (succès/erreur/info) |
| `Spinner.tsx` | Indicateur de chargement |
| `Modal.tsx` | Fenêtre modale de base |
| `Badge.tsx` | Badge de statut |

#### `components/products/`
| Composant | Description |
|-----------|-------------|
| `ProductCard.tsx` | Carte produit avec bouton "Ajouter au panier" (feedback visuel ✓), badge quantité panier, overlay au hover |

#### `components/MiniCalendar.tsx`
Calendrier interactif utilisé dans la prise de rendez-vous et le dashboard admin pour reprogrammer.

---

### `src/hooks/`
| Hook | Description |
|------|-------------|
| `useAuth.ts` | Accès facile au contexte d'authentification |
| `useCart.ts` | *(dans CartContext)* |
| `useInView.ts` | Détecte si un élément est visible à l'écran (animations au scroll) |
| `useDebounce.ts` | Retarde une valeur (recherche en temps réel) |
| `usePagination.ts` | Logique de pagination |
| `useProducts.ts` | Chargement des produits |
| `useAppointments.ts` | Chargement des rendez-vous |
| `useReviews.ts` | Chargement des avis |

---

### `src/types/`
Définitions TypeScript pour que le code soit sûr et sans erreurs :
- `user.ts` — type `User`, `UserRole`
- `product.ts` — `Produit`, `Categorie`, `ProduitDetail`, filtres, etc.
- `appointment.ts` — `RendezVous`, `TypeSeance`
- `review.ts` — `Review`, `ReviewStats`
- `api.ts` — types de réponses API génériques

---

## COMMENT ÇA FONCTIONNE ENSEMBLE

```
UTILISATEUR
    ↓ (clique sur "Ajouter au panier")
FRONTEND (React)
    → CartContext.addItem() — mise à jour du state
    → Navbar affiche le badge mis à jour
    ↓ (clique sur "Passer la commande")
FRONTEND — Checkout.tsx
    → orderService.createCommande() — appel API
    ↓ (fetch POST /api/orders)
BACKEND — orderRoutes.ts
    → requireAuth middleware — vérifie le cookie JWT
    → orderController.createCommande()
    → orderService.createCommande()
        → Vérifie le stock de chaque produit
        → Crée la commande + lignes en transaction
        → Décrémente le stock de chaque produit
        → Génère le numéro BEN-CMD-001
    ← Retourne { success: true, data: commande }
FRONTEND
    → Affiche "BEN-CMD-001 confirmée !"
    → clearCart() — vide le panier
    → Côté client : /orders affiche le statut "En attente"
    
ADMIN (sur /admin/orders)
    → Voit la commande en statut "En attente"
    → Clique "Marquer livrée"
    → orderService.updateStatut() — appel API PATCH
    → Backend met à jour le statut en BDD
    → Client recharge /orders → voit "Livrée"
```

---

## SÉCURITÉ

- **Mots de passe** : hashés avec `bcryptjs` (jamais stockés en clair)
- **Authentification** : JWT stocké dans un cookie `httpOnly` (inaccessible au JavaScript)
- **Autorisation** : middleware `requireRole` bloque les routes admin
- **CORS** : seul le frontend autorisé à appeler l'API
- **Stock** : décrémenté dans une transaction atomique (impossible de commander si rupture)
- **Propriété** : un utilisateur ne peut voir/annuler que ses propres commandes

---

## COMMANDES UTILES

```bash
# Backend
cd zen-massage-backend
npm run dev          # Démarre le serveur en mode développement
npm run seed         # Peuple la BDD avec les données initiales
npm run build        # Compile TypeScript

# Base de données
npx prisma migrate dev --name nom_migration  # Crée une migration
npx prisma generate                           # Régénère le client Prisma
npx prisma studio                             # Interface visuelle de la BDD

# Frontend
cd zen-massage-frontend
npm run dev          # Démarre l'app React
npm run build        # Build production
```

---

## COMPTES DE TEST (après `npm run seed`)

| Email | Mot de passe | Rôle |
|-------|-------------|------|
| `superadmin@ben.com` | `SuperAdmin123!` | Super Admin |
| `admin@ben.com` | `Admin123!` | Admin |
| *(créer via /register)* | — | Utilisateur simple |
