/*
  Warnings:

  - A unique constraint covering the columns `[geomJson]` on the table `Report` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `geomJson` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "geomJson" JSONB NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Report_geomJson_key" ON "Report"("geomJson");
