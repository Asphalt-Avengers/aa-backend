/*
  Warnings:

  - The `severity` column on the `Detection` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "DetectionSeverity" AS ENUM ('MINOR', 'MODERATE', 'SIGNIFICANT', 'SEVERE', 'CRITICAL');

-- AlterTable
ALTER TABLE "Detection" DROP COLUMN "severity",
ADD COLUMN     "severity" "DetectionSeverity",
ALTER COLUMN "report_geom" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Report" ALTER COLUMN "report_geom" SET DATA TYPE TEXT;

-- DropEnum
DROP TYPE "PotholeSeverity";
