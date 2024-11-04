-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED');

-- CreateEnum
CREATE TYPE "PotholeSeverity" AS ENUM ('MINOR', 'MODERATE', 'SIGNIFICANT', 'SEVERE', 'CRITICAL');

-- CreateTable
CREATE TABLE "Pothole" (
    "id" SERIAL NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "severity" "PotholeSeverity",
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pothole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PotholeImage" (
    "id" SERIAL NOT NULL,
    "potholeId" INTEGER NOT NULL,
    "s3Url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PotholeImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "location" TEXT,
    "description" TEXT,
    "potholeId" INTEGER NOT NULL,
    "comments" TEXT,
    "status" "ReportStatus",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "details" TEXT,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Report_potholeId_key" ON "Report"("potholeId");

-- AddForeignKey
ALTER TABLE "PotholeImage" ADD CONSTRAINT "PotholeImage_potholeId_fkey" FOREIGN KEY ("potholeId") REFERENCES "Pothole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_potholeId_fkey" FOREIGN KEY ("potholeId") REFERENCES "Pothole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
