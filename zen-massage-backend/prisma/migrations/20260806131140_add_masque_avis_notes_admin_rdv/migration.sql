-- AlterTable
ALTER TABLE "Avis" ADD COLUMN     "masque" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "RendezVous" ADD COLUMN     "notes_admin" TEXT;
