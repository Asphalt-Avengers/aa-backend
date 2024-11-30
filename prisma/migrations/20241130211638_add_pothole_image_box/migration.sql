-- CreateTable
CREATE TABLE "PotholeImageBox" (
    "id" SERIAL NOT NULL,
    "potholeImageId" INTEGER NOT NULL,
    "xCenter" DOUBLE PRECISION NOT NULL,
    "yCenter" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PotholeImageBox_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PotholeImageBox" ADD CONSTRAINT "PotholeImageBox_potholeImageId_fkey" FOREIGN KEY ("potholeImageId") REFERENCES "PotholeImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
