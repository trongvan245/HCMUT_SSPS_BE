-- CreateEnum
CREATE TYPE "PrinterStatus" AS ENUM ('AVAILABLE', 'NOT_AVAILABLE');

-- AlterTable
ALTER TABLE "printers" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Printer',
ADD COLUMN     "status" "PrinterStatus" NOT NULL DEFAULT 'AVAILABLE';
