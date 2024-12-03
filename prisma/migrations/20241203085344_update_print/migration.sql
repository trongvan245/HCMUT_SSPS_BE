-- CreateTable
CREATE TABLE "printers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "printers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "printing_records" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "printerId" TEXT NOT NULL,

    CONSTRAINT "printing_records_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "printing_records" ADD CONSTRAINT "printing_records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "printing_records" ADD CONSTRAINT "printing_records_printerId_fkey" FOREIGN KEY ("printerId") REFERENCES "printers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
