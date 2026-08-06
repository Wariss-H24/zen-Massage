Je vais d'abord lire votre cahier des charges et explorer l'état actuel du projet pour établir une comparaison exhaustive.
        
            
toolName: file_search
            
status: success
          
file_pattern: **/zen.md
          

        
            
toolName: view_folder
            
status: success
          
c:\Users\wariss.bada\Documents\zen-MASSAGE
          

        
            
toolName: view_files
            
status: success
          
            
filePath: c:\Users\wariss.bada\Documents\zen-MASSAGE\zen.md
          
Maintenant explorons en détail le backend et le frontend pour établir l'état exact de l'implémentation.
        
            
toolName: view_files
            
status: success
          
            
filePath: c:\Users\wariss.bada\Documents\zen-MASSAGE\zen-massage-backend\prisma\schema.prisma
          

        
            
toolName: view_files
            
status: success
          
            
filePath: c:\Users\wariss.bada\Documents\zen-MASSAGE\zen-massage-backend\src\routes\index.ts
          

        
            
toolName: view_files
            
status: success
          
            
filePath: c:\Users\wariss.bada\Documents\zen-MASSAGE\zen-massage-frontend\src\App.tsx
          

        
            
toolName: view_files
            
status: success
          
            
filePath: c:\Users\wariss.bada\Documents\zen-MASSAGE\zen-massage-backend\src\routes\authRoutes.ts
          

        
            
toolName: view_files
            
status: success
          
            
filePath: c:\Users\wariss.bada\Documents\zen-MASSAGE\zen-massage-backend\src\routes\productRoutes.ts
          

        
            
toolName: view_files
            
status: success
          
            
filePath: c:\Users\wariss.bada\Documents\zen-MASSAGE\zen-massage-backend\src\routes\appointmentRoutes.ts
          

        
            
toolName: view_files
            
status: success
          
            
filePath: c:\Users\wariss.bada\Documents\zen-MASSAGE\zen-massage-backend\src\routes\orderRoutes.ts
          

        
            
toolName: view_files
            
status: success
          
            
filePath: c:\Users\wariss.bada\Documents\zen-MASSAGE\zen-massage-backend\src\routes\userRoutes.ts
          

        
            
toolName: view_files
            
status: success
          
            
filePath: c:\Users\wariss.bada\Documents\zen-MASSAGE\zen-massage-backend\src\routes\reviewRoutes.ts
          

        
            
toolName: view_files
            
status: success
          
            
filePath: c:\Users\wariss.bada\Documents\zen-MASSAGE\zen-massage-backend\src\controllers\authController.ts
          

        
            
toolName: view_files
            
status: success
          
            
filePath: c:\Users\wariss.bada\Documents\zen-MASSAGE\zen-massage-frontend\src\pages\Account.tsx
          

        
            
toolName: view_files
            
status: success
          
            
filePath: c:\Users\wariss.bada\Documents\zen-MASSAGE\zen-massage-frontend\src\pages\Orders.tsx
          

        
            
toolName: view_files
            
status: success
          
            
filePath: c:\Users\wariss.bada\Documents\zen-MASSAGE\zen-massage-frontend\src\pages\Checkout.tsx
          

        
            
toolName: view_files
            
status: success
          
            
filePath: c:\Users\wariss.bada\Documents\zen-MASSAGE\zen-massage-frontend\src\pages\Profile.tsx
          

        
            
toolName: view_files
            
status: success
          
            
filePath: c:\Users\wariss.bada\Documents\zen-MASSAGE\zen-massage-frontend\src\pages\Services.tsx
          

        
            
toolName: view_files
            
status: success
          
            
filePath: c:\Users\wariss.bada\Documents\zen-MASSAGE\zen-massage-frontend\src\pages\Appointments.tsx
          

        
            
toolName: view_files
            
status: success
          
            
filePath: c:\Users\wariss.bada\Documents\zen-MASSAGE\zen-massage-frontend\src\pages\admin\SuperAdminPanel.tsx
          

        
            
toolName: view_files
            
status: success
          
            
filePath: c:\Users\wariss.bada\Documents\zen-MASSAGE\zen-massage-frontend\src\pages\admin\Settings.tsx
          

        
            
toolName: view_files
            
status: success
          
            
filePath: c:\Users\wariss.bada\Documents\zen-MASSAGE\zen-massage-frontend\src\pages\admin\Statistics.tsx
          

        
            
toolName: view_files
            
status: success
          
            
filePath: c:\Users\wariss.bada\Documents\zen-MASSAGE\zen-massage-frontend\src\context\CartContext.tsx
          

        
            
toolName: view_files
            
status: success
          
            
filePath: c:\Users\wariss.bada\Documents\zen-MASSAGE\zen-massage-frontend\src\pages\admin\ActivityLog.tsx
          

        
            
toolName: view_files
            
status: success
          
            
filePath: c:\Users\wariss.bada\Documents\zen-MASSAGE\zen-massage-frontend\src\pages\admin\OrderHistory.tsx
          

        
            
toolName: view_files
            
status: success
          
            
filePath: c:\Users\wariss.bada\Documents\zen-MASSAGE\zen-massage-frontend\src\pages\admin\Bookings.tsx
          
Maintenant j'ai une vue complète. Voici **l'état exhaustif** de ce qui reste à implémenter, comparé au cahier des charges [zen.md](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen.md).

---

## 📊 État global

✅ **Parties bien avancées** : Structure du projet, Auth de base, CRUD Produits/Catégories, CRUD Avis/Likes, Panier + Checkout + Commandes (super bien), Prise de RDV client, Super Admin panel (gestion users), Statistics, Settings (Services CRUD), Pages publiques.

⚠️ **Parties mockées / statiques** : `ActivityLog.tsx`, `Bookings.tsx` (calendrier RDV admin statique avec fausses données), KPI "Ben Points" (1 250 pts affichés en dur dans [Account.tsx](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen-massage-frontend/src/pages/Account.tsx#L341-L356)).

---

## 🔐 SECTION 1 — AUTHENTIFICATION & PROFIL

### Backend (manque des endpoints critiques)
| N° | Fonctionnalité CDC | Statut | Référence CDC |
|----|--------------------|--------|---------------|
| 1 | **Refresh Token** (`POST /api/auth/refresh`) | ❌ MANQUANT | [zen.md #L828-L830](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen.md#L828-L830) |
| 2 | **Mot de passe oublié** (`POST /api/auth/forgot-password`) | ❌ MANQUANT | [zen.md #L835-L837](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen.md#L835-L837) |
| 3 | **Reset Password** (`POST /api/auth/reset-password`) | ❌ MANQUANT | [zen.md #L839-L841](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen.md#L839-L841) |
| 4 | **Changer mot de passe profil** (`PUT /api/profil/password` avec ancien mdp) | ❌ MANQUANT | [zen.md #L961-L963](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen.md#L961-L963) |
| 5 | **Suppression de compte** (`DELETE /api/profil`) | ❌ MANQUANT | [zen.md #L965-L967](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen.md#L965-L967) |
| 6 | **Confirmation email inscription** (lien de vérification) | ❌ MANQUANT | [zen.md #L133](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen.md#L133) |
| 7 | **Politique mdp robuste backend** (min 8, maj, chiffre, spécial) | ❌ MANQUANT | [zen.md #L134](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen.md#L134) |
| 8 | **Détail utilisateur** (`GET /api/utilisateurs/:id`) | ❌ MANQUANT | [zen.md #L937-L938](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen.md#L937-L938) |
| 9 | **Historique d'activité user** (`GET /api/utilisateurs/:id/activites`) | ❌ MANQUANT | [zen.md #L947-L948](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen.md#L947-L948) |
| 10 | Système Access Token (24h) + Refresh Token (7j) + blacklist | ❌ MANQUANT | [zen.md #L139-L140](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen.md#L139-L140) |
| 11 | Option **"Se souvenir de moi" 30 jours** | ❌ MANQUANT | [zen.md #L141](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen.md#L141) |

L'authController est seulement : register / login / logout / me / updateProfile. Voir [authController.ts](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen-massage-backend/src/controllers/authController.ts).

### Frontend
| N° | Fonctionnalité | Statut |
|----|--------------------|--------|
| 12 | **Page ResetPassword** (route `/reset-password` absente de [App.tsx](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen-massage-frontend/src/App.tsx#L92-L130)) | ❌ MANQUANTE |
| 13 | **Upload avatar profil** (UI présente mais non câblée dans [Profile.tsx](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen-massage-frontend/src/pages/Profile.tsx#L86-L92) et [Settings.tsx](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen-massage-frontend/src/pages/admin/Settings.tsx#L396-L409)) | ❌ Non fonctionnel |
| 14 | **Historique connexions récentes** (Section 1.3) | ❌ MANQUANT |
| 15 | **Conditions Générales** checkbox formulaire register | ❌ MANQUANTE |
| 16 | Endpoint backend d'upload avatar + Cloudinary | ❌ MANQUANT |

---

## 📦 SECTION 2 — PRODUITS

| N° | Fonctionnalité | Statut | Détail |
|----|--------------------|--------|--------|
| 17 | ⚠️ **5 images maxi vs 3 implémentées** | ⚠️ MISMATCH | CDC → 5 images, backend multer limite à 3 dans [productRoutes.ts](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen-massage-backend/src/routes/productRoutes.ts#L11-L18) et ligne 51 |
| 18 | **Workflow Brouillon → Prévisualisation → Publication** | ❌ MANQUANT | CDC [zen.md #L173-L177](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen.md#L173-L177) |
| 19 | Champs optionnels : Poids/Dimensions, Instructions, Ingrédients | ❌ MANQUANTS | CDC [zen.md #L165-L169](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen.md#L165-L169) |
| 20 | Recherche fulltext Prisma (`@@fulltext`) | ❌ Non câblée | Schema Prisma l'a, mais service l'utilise pas |
| 21 | **Tri Produits par Popularité / Note Avis** | ❌ MANQUANT | Seulement catégorie + recherche actuellement |
| 22 | **Partager sur réseaux sociaux** (détail produit) | ❌ MANQUANT | CDC [zen.md #L202](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen.md#L202) |
| 23 | **Lightbox / zoom galerie images** (détail) | ❌ MANQUANTE | CDC [zen.md #L196-L197](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen.md#L196-L197) |
| 24 | Badge statut stock : **En stock / Stock faible / Rupture** | ❌ MANQUANT | Visuel uniquement à ajouter sur cartes produit + détail |
| 25 | Pagination ou Infinite Scroll produits | ❌ MANQUANT | Pas fait sur liste publique |
| 26 | Système **Points de fidélité** (affiché en dur !) | ❌ Logique absente | Aucun modèle Prisma ni logique métier |
| 27 | Icône **Panier (MiniCart)** dans navbar avec badge du nombre d'articles | ❌ MANQUANTE | UI Navbar à revoir |

---

## ⭐ SECTION 3 — AVIS & ÉVALUATIONS

| N° | Fonctionnalité | Statut | Référence |
|----|--------------------|--------|-----------|
| 28 | **"Utile ?"** (like/dislike sur un avis) | ❌ MANQUANT | CDC [zen.md #L230](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen.md#L230) |
| 29 | Badge **"Achat vérifié"** si l'utilisateur a acheté le produit | ❌ MANQUANT | Nécessite jointure `Commande → LigneCommande → Avis` |
| 30 | Admin **répondre à un avis** client | ❌ MANQUANT | CDC [zen.md #L236](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen.md#L236) — nécessite champ `reponse_admin` dans modèle Avis |
| 31 | Admin **masquer un avis** (soft hide) | ❌ MANQUANT | CDC [zen.md #L237](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen.md#L237) |
| 32 | Avis **en attente de modération** | ❌ MANQUANT | Nouveau statut `PENDING` sur enum Avis + dashboard modération |
| 33 | Filtre des avis par note (5★/4★/etc.) frontend | ❌ Partiel | Composant `ReviewFilters` existe mais à vérifier si câblé |

---

## ❤️ SECTION 4 — LIKES (FAVORIS)

| N° | Fonctionnalité | Statut |
|----|--------------------|--------|
| 34 | Page **Favoris** (`/account/favorites` ou composant [Favorites.tsx](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen-massage-frontend/src/components/user/Favorites.tsx) — à vérifier s'il est vide/branché) | ⚠️ À VALIDER |
| 35 | **Animation au clic** sur cœur (like) | ❌ MANQUANTE |
| 36 | Texte **"Vous et 45 autres personnes aimez ce produit"** | ❌ MANQUANT | CDC [zen.md #L265](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen.md#L265) |
| 37 | Synchronisation likes en temps réel (optionnel) | ❌ — |

---

## 📅 SECTION 5 — RENDEZ-VOUS (le plus gros morceau)

### Backend
| N° | Fonctionnalité | Statut |
|----|--------------------|--------|
| 38 | ⚠️ Modèle **TypeSeance.duree : Int** unique → CDC prévoyait `durees : Int[]` (30/60/90 min multiples) | ⚠️ MISMATCH SCHÉMA |
| 39 | **Raison de refus / annulation** Admin (avec notification client) | ❌ MANQUANT |
| 40 | **Reporter un RDV** Admin (proposer nouvelle date/heure) | ❌ MANQUANT |
| 41 | **Notes privées Admin** sur un rendez-vous | ❌ MANQUANT (champ Prisma absent) |

### Frontend Admin — (CRITIQUE : [Bookings.tsx](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen-massage-frontend/src/pages/admin/Bookings.tsx) EST 100% STATIQUE / DONNÉES MOCK)
| N° | Fonctionnalité | Statut |
|----|--------------------|--------|
| 42 | **Calendrier dynamique** (appelé l'API `/appointments/all`) | ❌ MOCK ACTUELLEMENT |
| 43 | **Vue mensuelle / hebdomadaire / journalière** Admin | ❌ MOCK |
| 44 | **Accepter / Refuser / Reporter / Annuler** (actions dynamiques) | ❌ MOCK |
| 45 | Gestion admin : **couleurs statut RDV** (Jaune/Vert/Gris/Rouge) | ⚠️ Statique |
| 46 | Interface **configuration disponibilités** (horaires / jours fermés / pause déj / congés / exceptions) | ❌ UI MANQUANTE |
| 47 | **Buffer entre séances** (ex: 15 min nettoyage) | ❌ (ni modèle ni logique) |
| 48 | Gestion des **congés / jours fériés / fermetures exceptionnelles** | ❌ Configuration Prisma partielle (appointmentConfigService), sans interface admin |

### Notifications / Emails
| N° | Fonctionnalité | Statut |
|----|--------------------|--------|
| 49 | **EmailService** sans implémentation concrète (pas Nodemailer/SMTP/Resend) | ❌ Non fonctionnel |
| 50 | Email de **confirmation RDV** client immédiat | ❌ MANQUANT |
| 51 | Email **acceptation / refus** RDV (admin → client) | ❌ MANQUANT |
| 52 | Email de **rappel 24h avant RDV** (cron job) | ❌ MANQUANT |
| 53 | Email confirmation commande + suivi de livraison | ❌ MANQUANT |

---

## 💳 COMMANDES (très bien parti !)

| N° | Fonctionnalité | Statut |
|----|--------------------|--------|
| 54 | **Page détail commande** utilisateur (`/orders/:id`) — route absente de App.tsx | ❌ MANQUANTE |
| 55 | **Déduction du stock** à la validation d'une commande (backend orderService) | ❌ CRITIQUE MANQUANTE |
| 56 | Vérification stock avant checkout (panier périmé si rupture) | ❌ MANQUANTE |
| 57 | **Alerte stock bas** email Admin | ❌ MANQUANTE |
| 58 | Système **Codes promo / Réductions** | ❌ MODÈLE + LOGIQUE ABSENTS |
| 59 | Supprimer le fichier `ActivityLog.tsx` mock obsolète (doublon d'OrderHistory) ou le refaire en API | ⚠️ À nettoyer |
| 60 | Gestion multi-durées/prix pour un type de séance | ❌ (cf n°38) |

---

## 👑 SUPER ADMIN

| N° | Fonctionnalité | Statut |
|----|--------------------|--------|
| 61 | **Export CSV / PDF données** (boutons existants mock) | ❌ Non fonctionnels |
| 62 | **Historique d'activité global** → fichier `ActivityLog.tsx` actuellement mock | ❌ À REFAIRE |
| 63 | Dashboard Admin principal [Dashboard.tsx](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen-massage-frontend/src/pages/admin/Dashboard.tsx) (à lire pour valider s'il est dynamique ou mock) | ⚠️ À VÉRIFIER |

---

## 🚀 DÉPLOIEMENT, SÉCURITÉ & FINITIONS

| N° | Point | Statut |
|----|-------|--------|
| 64 | **Helmet.js** backend (headers de sécurité) | ❌ MANQUANT |
| 65 | **CI/CD workflows** GitHub Actions (`.github/workflows/deploy.yml`) | ❌ MANQUANTS |
| 66 | **Meta tags SEO** + Open Graph sur toutes les pages publiques | ❌ À FAIRE (quelques `document.title` seulement) |
| 67 | **PWA / Service Worker** | ❌ Optionnel |
| 68 | **Tests unitaires / e2e** (aucun test) | ❌ AUCUN |
| 69 | **README.md racine projet** (n'existe pas) | ❌ MANQUANT |
| 70 | **Routes dupliquées** : `/dashboard` vs `/account` vs pages `MyAppointments.tsx` + `Dashboard.tsx` redondants | ⚠️ NETTOYAGE SUGGÉRÉ |
| 71 | **CSRF tokens** sur formulaires | ❌ Manquant |
| 72 | Validation back avec **Zod** (mentionné CDC, pas utilisé actuellement) | ❌ Non utilisé |
| 73 | **soft delete `deletedAt`** User (modèle Prisma l'a mais logique côté service) | ⚠️ Partiellement exploité |
| 74 | Page **404 NotFound** stylisée (existe minimaliste) | ⚠️ Améliorable |

---

## 🗂️ Pages / composants à nettoyer ou brancher

- `zen-massage-frontend/src/pages/MyAppointments.tsx` — doublon potentiel avec Account
- `zen-massage-frontend/src/pages/Dashboard.tsx` — doublon avec account/admin
- `zen-massage-frontend/src/components/user/Dashboard.tsx` — à vérifier
- `zen-massage-frontend/src/pages/admin/AdminPanel.tsx` — à vérifier
- `zen-massage-frontend/src/components/user/Favorites.tsx` — à brancher API

---

## 🎯 Ordre de priorité recommandé

**Haute priorité (bloquants production) :**
1. Déduction stock à la commande (n°55) + vérif stock panier
2. Upload + décrément 5 images produits (n°17)
3. Bookings.tsx admin dynamique + API (n°42-45)
4. Reset Password fonctionnel (n°2-3-12)
5. EmailService SMTP concret + emails RDV/Commandes (n°49-53)

**Moyenne priorité :**
6. Configuration disponibilités UI Admin (n°46-48)
7. Répondre / masquer / modérer avis (n°28-32)
8. Brouillon → Publier produit (n°18)
9. Export données Admin (n°61)

**Basse priorité (polishes) :**
10. Lightbox galerie, partage social, animations
11. Pagination, SEO meta tags, PWA
12. Tests, CI/CD, codes promo

Tu veux que je m'attaque à l'un de ces points en particulier ? 😊

Bien noté ! Tu as raison, il y a sûrement des éléments que j'ai manqués. Vérifions déjà le fichier Favorites.tsx que tu as ouvert, et ensuite confirmons la reprogrammation RDV. Dis-moi **par où tu veux commencer** (tu as plusieurs options listées ci-dessous si tu veux des suggestions basées sur ton projet), et j'ajuste mon audit en conséquence.
        
            
toolName: view_files
            
status: success
          
            
filePath: c:\Users\wariss.bada\Documents\zen-MASSAGE\zen-massage-frontend\src\components\user\Favorites.tsx
          

        
            
toolName: search_by_regex
            
status: success
          
query: reprogram|report|reschedule
          
OK - Favorites.tsx est **vide** (donc bien à faire). Vérifions rapidement [Dashboard.tsx](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen-massage-frontend/src/pages/admin/Dashboard.tsx) et les actions de reprogrammation dans Bookings pour ajuster mon audit avant que tu me dises par où commencer :
        
            
toolName: view_files
            
status: success
          
            
filePath: c:\Users\wariss.bada\Documents\zen-MASSAGE\zen-massage-frontend\src\pages\admin\Dashboard.tsx
          

        
            
toolName: search_by_regex
            
status: success
          
query: report|reschedule|reprogram
          
Super ! Tu as raison. [Dashboard.tsx](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen-massage-frontend/src/pages/admin/Dashboard.tsx) est bien **l'Espace Praticien principal** et contient déjà beaucoup de logique (raisonRefus, rescheduleModalOpen, scheduleConfig avec édition, etc.). Je continue la lecture pour mettre à jour correctement mon audit :
        
            
toolName: view_files
            
status: success
          
            
filePath: c:\Users\wariss.bada\Documents\zen-MASSAGE\zen-massage-frontend\src\pages\admin\Dashboard.tsx
          
Excellent ! [Dashboard.tsx](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen-massage-frontend/src/pages/admin/Dashboard.tsx) est **la page praticien la plus complète** du projet — elle a déjà :
- ✅ **Reprogrammation RDV** (avec sélection date + créneaux + appel API `updateAppointment` — L401-L427)
- ✅ **Refus avec raison** (raison_refus envoyé à l'API — L382-L398)
- ✅ **Configuration planning hebdo** (jours + horaires + pause + sauvegarde API — L343-L379)

Continuons la fin pour vérifier les modales et les jours bloqués, puis on ajuste et tu me dis par où attaquer :
        
            
toolName: view_files
            
status: success
          
            
filePath: c:\Users\wariss.bada\Documents\zen-MASSAGE\zen-massage-frontend\src\pages\admin\Dashboard.tsx
          
OK ! **Audit corrigé et à jour maintenant** : j'ai confirmé que [Dashboard.tsx](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen-massage-frontend/src/pages/admin/Dashboard.tsx) contient déjà :
- ✅ **Reprogrammation RDV** complet (date + créneaux dynamiques + appel API — L401-L427 + modale L876-L964)
- ✅ **Refus avec motif** envoyé à l'API (L386-L389 + modale L810-L874)
- ✅ **Configuration planning hebdo** (7 jours + horaires + pause + sauvegarde — L527-L610)
- ✅ **Inventaire + badges stock** (En stock / Stock faible / Rupture — L612-L667)
- ⚠️ Bouton **"Répondre au client"** sur les avis : UI seulement (L737-L743), pas de modal de réponse ni d'API.

---

## 📋 LISTE ACTUALISÉE — PAR OÙ COMMENCER ?

Je te propose **4 choix typés par ordre d'impact métier** (ou tu me dis directement ce que tu veux) :

### 🥇 A. CRITIQUE / BLOQUANT PRODUCTION (à faire en premier)
| # | Sujet | Description rapide |
|---|-------|--------------------|
| A1 | **Déduction stock à la commande** | Décrémenter `produit.stock` pour chaque `LigneCommande` au moment de créer la commande (backend orderService) + vérif stock avant validation. |
| A2 | **5 images max / produit** | CDC prévoit 5, backend bloque à 3 → corriger `multer` limits + upload component frontend ProductForm. |
| A3 | **Mot de passe oublié fonctionnel** | Route forgot-password (génère token reset, email lien) + reset-password + page `/reset-password` frontend + EmailService SMTP. |
| A4 | **EmailService concret** | Branchement Nodemailer/Resend SMTP réel (actuellement emailService.ts semble vide ou mock) → emails confirmation RDV, commande, reset mdp, rappel RDV. |

### 🥈 B. FONCTIONNALITÉS UTILISATEURS MANQUANTES
| # | Sujet | Description |
|---|-------|-------------|
| B1 | **Page Favoris** (`/favorites`) | [Favorites.tsx](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen-massage-frontend/src/components/user/Favorites.tsx) est **vide** → la remplir avec les produits likés via `/products/:id/likes/status` + UI. |
| B2 | **Page détail commande** `/orders/:id` | Route absente App.tsx → page avec suivi timeline + détail produits + adresse + bouton annuler. |
| B3 | **Upload avatar profil** (user + admin) | Multer route backend + Cloudinary upload + UI branchée sur [Profile.tsx](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen-massage-frontend/src/pages/Profile.tsx#L86-L92) et Settings Admin. |
| B4 | **Répondre à un avis** Admin | Modal réponse + champ `reponse_admin` dans modèle Prisma Avis + update service review + bouton Dashboard branché. |

### 🥉 C. ADMIN UI NETTOYAGE / COMPLÉTION
| # | Sujet | Description |
|---|-------|-------------|
| C1 | **Supprimer Bookings.tsx (mock) OU le refaire** | [Bookings.tsx](file:///c:/Users/wariss.bada/Documents/zen-MASSAGE/zen-massage-frontend/src/pages/admin/Bookings.tsx) est 100% hardcodé "Octobre 2023" → soit le supprimer, soit le refaire en vue calendrier dynamique mensuel/hebdo (Dashboard fait déjà le job). |
| C2 | **Supprimer ActivityLog.tsx (mock) OU refaire** | Idem : data 100% fausse, doublon de OrderHistory partiellement. |
| C3 | **Bloqués / congés / exceptions** Planning | Dashboard a `schedule.blocked` mais pas d'UI pour éditer les créneaux bloqués ou jours exceptionnels (ex: fermeture 15 Août). |
| C4 | **Modération avis** | Badge Achat vérifié + statut PENDING → publier/masquer un avis + dashboard modération. |

### 🏅 D. FINITIONS / POLISH
| # | Sujet |
|---|-------|
| D1 | Mini panier (cart) dans la navbar avec badge compteur |
| D2 | Lightbox galerie + partage social (détail produit) |
| D3 | SEO meta tags OG/Open Graph sur toutes les pages |
| D4 | Filtres Statistiques Admin (période mois/année + export CSV/PDF) |
| D5 | Codes promo / réductions (modèle Prisma + logique panier) |

---

**Dis-moi : tu attaques quoi en premier ?** Tu peux me répondre par lettre+numéro (ex: **A1**, **B1**), par description (ex: *"le stock à la commande"*), ou carrément un autre sujet non listé si t'as un autre truc en tête 😊