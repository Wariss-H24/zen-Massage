-- AlterTable
ALTER TABLE "Avis" ADD COLUMN     "reponse_admin" TEXT,
ADD COLUMN     "reponse_admin_at" TIMESTAMP(3),
ADD COLUMN     "reponse_admin_id" TEXT;

-- CreateTable
CREATE TABLE "AvisUtile" (
    "id" TEXT NOT NULL,
    "avis_id" TEXT NOT NULL,
    "utilisateur_id" TEXT NOT NULL,
    "utile" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AvisUtile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AvisUtile_avis_id_idx" ON "AvisUtile"("avis_id");

-- CreateIndex
CREATE INDEX "AvisUtile_utilisateur_id_idx" ON "AvisUtile"("utilisateur_id");

-- CreateIndex
CREATE UNIQUE INDEX "AvisUtile_avis_id_utilisateur_id_key" ON "AvisUtile"("avis_id", "utilisateur_id");

-- CreateIndex
CREATE INDEX "Avis_reponse_admin_id_idx" ON "Avis"("reponse_admin_id");

-- CreateIndex
CREATE INDEX "Like_utilisateur_id_idx" ON "Like"("utilisateur_id");

-- AddForeignKey
ALTER TABLE "Avis" ADD CONSTRAINT "Avis_reponse_admin_id_fkey" FOREIGN KEY ("reponse_admin_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvisUtile" ADD CONSTRAINT "AvisUtile_avis_id_fkey" FOREIGN KEY ("avis_id") REFERENCES "Avis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvisUtile" ADD CONSTRAINT "AvisUtile_utilisateur_id_fkey" FOREIGN KEY ("utilisateur_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
