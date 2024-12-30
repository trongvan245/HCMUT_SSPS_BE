-- CreateTable
CREATE TABLE "AllowedFileType" (
    "id" SERIAL NOT NULL,
    "types" JSONB NOT NULL,

    CONSTRAINT "AllowedFileType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AllowType" (
    "id" SERIAL NOT NULL,
    "typeName" TEXT NOT NULL,

    CONSTRAINT "AllowType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AllowType_typeName_key" ON "AllowType"("typeName");
