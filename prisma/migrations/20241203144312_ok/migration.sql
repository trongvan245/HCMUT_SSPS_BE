/*
  Warnings:

  - You are about to drop the column `diem` on the `printers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[building]` on the table `printers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `building` to the `printers` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "printers_diem_key";

-- AlterTable
ALTER TABLE "printers" DROP COLUMN "diem",
ADD COLUMN     "building" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "printers_building_key" ON "printers"("building");
