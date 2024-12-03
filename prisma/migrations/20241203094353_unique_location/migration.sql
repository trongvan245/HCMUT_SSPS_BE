/*
  Warnings:

  - A unique constraint covering the columns `[location]` on the table `printers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "printers_location_key" ON "printers"("location");
