/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `printers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "printers_building_key";

-- AlterTable
ALTER TABLE "printers" ADD COLUMN     "campsite" TEXT NOT NULL DEFAULT 'Campsite 1',
ALTER COLUMN "building" SET DEFAULT 'B1',
ALTER COLUMN "name" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "printers_name_key" ON "printers"("name");
