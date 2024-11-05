import { PrismaClient, PotholeImage } from "@prisma/client";

const prisma = new PrismaClient();

export const getPotholeImages = async (): Promise<PotholeImage[]> => {
  return prisma.potholeImage.findMany();
};

export const getPotholeImageById = async (
  id: number
): Promise<PotholeImage | null> => {
  return prisma.potholeImage.findUnique({
    where: { id },
  });
};

export const createPotholeImage = async (data: {
  potholeId: number;
  s3Url: string;
}): Promise<PotholeImage> => {
  return prisma.potholeImage.create({
    data,
  });
};

export const deletePotholeImage = async (
  id: number
): Promise<PotholeImage | null> => {
  return prisma.potholeImage.delete({
    where: { id },
  });
};
