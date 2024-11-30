import { PotholeImage } from "@prisma/client";
import { CreatePotholeImageBody } from "@schema/potholeImageSchema";
import prisma from "@prisma/index";

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

export const createPotholeImage = async (potholeImage: CreatePotholeImageBody): Promise<PotholeImage> => {
  return prisma.potholeImage.create({
    data: potholeImage,
  });
};

export const deletePotholeImage = async (
  id: number
): Promise<PotholeImage | null> => {
  return prisma.potholeImage.delete({
    where: { id },
  });
};
