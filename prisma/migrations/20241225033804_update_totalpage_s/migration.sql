/*
  Warnings:

  - You are about to drop the column `totalPage` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "printers" ADD COLUMN     "totalPages" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "totalPage",
ADD COLUMN     "totalPages" INTEGER NOT NULL DEFAULT 0;
