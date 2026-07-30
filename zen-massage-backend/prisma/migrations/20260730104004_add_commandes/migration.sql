-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Commande" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "utilisateur_id" TEXT NOT NULL,
    "statut" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "total" DOUBLE PRECISION NOT NULL,
    "frais_livraison" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ville" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "mode_paiement" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Commande_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LigneCommande" (
    "id" TEXT NOT NULL,
    "commande_id" TEXT NOT NULL,
    "produit_id" TEXT NOT NULL,
    "nom_produit" TEXT NOT NULL,
    "image" TEXT,
    "prix_unitaire" DOUBLE PRECISION NOT NULL,
    "quantite" INTEGER NOT NULL,
    "sous_total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "LigneCommande_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Commande_numero_key" ON "Commande"("numero");

-- CreateIndex
CREATE INDEX "Commande_utilisateur_id_idx" ON "Commande"("utilisateur_id");

-- CreateIndex
CREATE INDEX "Commande_statut_idx" ON "Commande"("statut");

-- CreateIndex
CREATE INDEX "Commande_numero_idx" ON "Commande"("numero");

-- CreateIndex
CREATE INDEX "LigneCommande_commande_id_idx" ON "LigneCommande"("commande_id");

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_utilisateur_id_fkey" FOREIGN KEY ("utilisateur_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LigneCommande" ADD CONSTRAINT "LigneCommande_commande_id_fkey" FOREIGN KEY ("commande_id") REFERENCES "Commande"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LigneCommande" ADD CONSTRAINT "LigneCommande_produit_id_fkey" FOREIGN KEY ("produit_id") REFERENCES "Produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
