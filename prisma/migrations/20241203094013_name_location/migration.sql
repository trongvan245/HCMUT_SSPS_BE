/*
  Warnings:

  - You are about to drop the column `name` on the `printers` table. All the data in the column will be lost.
  - Added the required column `location` to the `printers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "printers" DROP COLUMN "name",
ADD COLUMN     "location" TEXT NOT NULL;
