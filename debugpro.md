# Debug Prod — `sku_number` Prisma (Render)

## Symptôme

Erreur en production lors de la création d’un produit :

`Unknown field sku_number for select statement on model Produit`

Elle apparaissait sur l’appel :

`prisma.produit.create({ ..., select: { id: true, sku: true, sku_number: true } })`

## Pourquoi ça ne marchait pas

Cette erreur ne venait pas de PostgreSQL directement, mais d’un décalage entre :

- Le schéma Prisma attendu par le code (qui contient `sku_number`)
- Le Prisma Client réellement utilisé **au runtime** en production

Dans le backend, le Prisma Client est généré dans le dossier :

- `src/generated/prisma` (config `output` du generator dans `prisma/schema.prisma`)

Mais le serveur en production démarre avec :

- `node dist/server.js`

Et le code runtime importe Prisma depuis :

- `dist/generated/prisma/client`

Donc en production :

- `prisma generate` régénérait bien un client à jour… mais dans `src/generated/prisma`
- Le serveur, lui, utilisait encore l’ancien client présent dans `dist/generated/prisma`

Résultat : au runtime, Prisma ne connaissait pas `sku_number`, même si le schéma et les migrations étaient corrects.

## Ce qui a été fait pour corriger

### 1) Assurer l’exécution des migrations et la génération Prisma pendant le build Render

Un script de build dédié Render a été ajouté :

- `render-build`: `npx prisma migrate deploy && npx prisma generate && tsc`

Cela garantit :

- `prisma migrate deploy` applique les migrations en prod (si nécessaire)
- `prisma generate` régénère le Prisma Client avec le schéma actuel
- `tsc` rebuild le backend

### 2) Synchroniser le Prisma Client généré vers `dist/`

Un script a été ajouté pour copier le client généré de `src/` vers `dist/` :

- Fichier : `zen-massage-backend/scripts/syncPrismaClient.cjs`
- Commande : `npm run sync-prisma-client`

Le build a été mis à jour pour exécuter cette copie après compilation :

- `build`: `prisma generate && tsc && npm run sync-prisma-client`
- `render-build`: `npx prisma migrate deploy && npx prisma generate && tsc && npm run sync-prisma-client`

Ainsi, au runtime :

- `dist/generated/prisma` contient bien le client Prisma à jour (avec `sku_number`)

### 3) Configuration Render

Sur Render, le Build Command a été configuré pour utiliser le script dédié :

- Build Command : `npm install && npm run render-build`
- Start Command : `npm start`

Un redeploy avec **Clear build cache** a permis d’éviter que Render réutilise un cache contenant un ancien client Prisma.

## Résultat final

Après ces changements :

- Le Prisma Client utilisé par le serveur en production correspond bien au schéma actuel
- `sku_number` est reconnu
- La création de produit fonctionne à nouveau en production

