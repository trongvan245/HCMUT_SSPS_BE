/*
  Warnings:

  - Added the required column `copies` to the `printing_records` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileName` to the `printing_records` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pages` to the `printing_records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "printing_records" ADD COLUMN     "copies" INTEGER NOT NULL,
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "pages" INTEGER NOT NULL;
