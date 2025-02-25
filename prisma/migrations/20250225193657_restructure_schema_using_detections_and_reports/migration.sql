/*
  Warnings:

  - You are about to drop the column `location` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `potholeId` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the `Pothole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PotholeImage` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[report_geom]` on the table `Report` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `report_geom` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PotholeImage" DROP CONSTRAINT "PotholeImage_potholeId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_potholeId_fkey";

-- DropIndex
DROP INDEX "Report_potholeId_key";

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "location",
DROP COLUMN "potholeId",
ADD COLUMN     "report_geom" BYTEA NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Pothole";

-- DropTable
DROP TABLE "PotholeImage";

-- CreateTable
CREATE TABLE "Detection" (
    "id" SERIAL NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "severity" "PotholeSeverity",
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "s3Url" TEXT NOT NULL,
    "reportId" INTEGER NOT NULL,
    "report_geom" BYTEA NOT NULL,

    CONSTRAINT "Detection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Report_report_geom_key" ON "Report"("report_geom");

-- AddForeignKey
ALTER TABLE "Detection" ADD CONSTRAINT "Detection_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
