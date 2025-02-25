/*
  Warnings:

  - You are about to drop the column `report_geom` on the `Detection` table. All the data in the column will be lost.
  - You are about to drop the column `report_geom` on the `Report` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[geom]` on the table `Report` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `geom` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Report_report_geom_key";

-- AlterTable
ALTER TABLE "Detection" DROP COLUMN "report_geom";

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "report_geom",
ADD COLUMN     "geom" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Report_geom_key" ON "Report"("geom");
