/*
  Warnings:

  - A unique constraint covering the columns `[sku_number]` on the table `Produit` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Produit" ADD COLUMN     "sku_number" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Produit_sku_number_key" ON "Produit"("sku_number");
