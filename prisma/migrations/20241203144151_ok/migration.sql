/*
  Warnings:

  - You are about to drop the column `location` on the `printers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[diem]` on the table `printers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `diem` to the `printers` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "printers_location_key";

-- AlterTable
ALTER TABLE "printers" DROP COLUMN "location",
ADD COLUMN     "diem" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "printers_diem_key" ON "printers"("diem");
