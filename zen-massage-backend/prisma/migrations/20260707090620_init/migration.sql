-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT,
    "avatar" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categorie" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "icone" TEXT,
    "ordre" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Categorie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produit" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,
    "categorie_id" TEXT NOT NULL,
    "images" TEXT[],
    "sku" TEXT,
    "publie" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Produit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avis" (
    "id" TEXT NOT NULL,
    "note" INTEGER NOT NULL,
    "titre" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "produit_id" TEXT NOT NULL,
    "utilisateur_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Avis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "utilisateur_id" TEXT NOT NULL,
    "produit_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeSeance" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "durees" INTEGER[],
    "prix" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TypeSeance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RendezVous" (
    "id" TEXT NOT NULL,
    "utilisateur_id" TEXT NOT NULL,
    "date_heure" TIMESTAMP(3) NOT NULL,
    "duree" INTEGER NOT NULL,
    "type_seance_id" TEXT NOT NULL,
    "notes" TEXT,
    "statut" "AppointmentStatus" NOT NULL DEFAULT 'PENDING',
    "raison_refus" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RendezVous_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Configuration" (
    "id" TEXT NOT NULL,
    "cle" TEXT NOT NULL,
    "valeur" TEXT NOT NULL,
    "description" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Configuration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Categorie_nom_key" ON "Categorie"("nom");

-- CreateIndex
CREATE INDEX "Categorie_nom_idx" ON "Categorie"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "Produit_sku_key" ON "Produit"("sku");

-- CreateIndex
CREATE INDEX "Produit_categorie_id_idx" ON "Produit"("categorie_id");

-- CreateIndex
CREATE INDEX "Produit_publie_idx" ON "Produit"("publie");

-- CreateIndex
CREATE INDEX "Avis_produit_id_idx" ON "Avis"("produit_id");

-- CreateIndex
CREATE INDEX "Avis_utilisateur_id_idx" ON "Avis"("utilisateur_id");

-- CreateIndex
CREATE UNIQUE INDEX "Avis_utilisateur_id_produit_id_key" ON "Avis"("utilisateur_id", "produit_id");

-- CreateIndex
CREATE INDEX "Like_produit_id_idx" ON "Like"("produit_id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_utilisateur_id_produit_id_key" ON "Like"("utilisateur_id", "produit_id");

-- CreateIndex
CREATE UNIQUE INDEX "TypeSeance_nom_key" ON "TypeSeance"("nom");

-- CreateIndex
CREATE INDEX "RendezVous_utilisateur_id_idx" ON "RendezVous"("utilisateur_id");

-- CreateIndex
CREATE INDEX "RendezVous_date_heure_idx" ON "RendezVous"("date_heure");

-- CreateIndex
CREATE INDEX "RendezVous_statut_idx" ON "RendezVous"("statut");

-- CreateIndex
CREATE UNIQUE INDEX "Configuration_cle_key" ON "Configuration"("cle");

-- AddForeignKey
ALTER TABLE "Produit" ADD CONSTRAINT "Produit_categorie_id_fkey" FOREIGN KEY ("categorie_id") REFERENCES "Categorie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avis" ADD CONSTRAINT "Avis_produit_id_fkey" FOREIGN KEY ("produit_id") REFERENCES "Produit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avis" ADD CONSTRAINT "Avis_utilisateur_id_fkey" FOREIGN KEY ("utilisateur_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_utilisateur_id_fkey" FOREIGN KEY ("utilisateur_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_produit_id_fkey" FOREIGN KEY ("produit_id") REFERENCES "Produit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RendezVous" ADD CONSTRAINT "RendezVous_utilisateur_id_fkey" FOREIGN KEY ("utilisateur_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RendezVous" ADD CONSTRAINT "RendezVous_type_seance_id_fkey" FOREIGN KEY ("type_seance_id") REFERENCES "TypeSeance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
