import { PotholeImageBox } from "@prisma/client";
import { CreatePotholeImageBoxBody, UpdatePotholeImageBoxBody } from "@schema/potholeImageBoxSchema";
import prisma from "@prisma/index";

export const getPotholeImageBoxes = async (): Promise<PotholeImageBox[]> => {
  return prisma.potholeImageBox.findMany();
};

export const getPotholeImageBoxById = async (
  id: number
): Promise<PotholeImageBox | null> => {
  return prisma.potholeImageBox.findUnique({
    where: { id },
  });
};

export const createPotholeImageBox = async (potholeImageBox: CreatePotholeImageBoxBody): Promise<PotholeImageBox> => {
  return prisma.potholeImageBox.create({
    data: potholeImageBox,
  });
};

export const updatePotholeImageBox = async (id: number, potholeImageBox: UpdatePotholeImageBoxBody): Promise<PotholeImageBox | null> => {
  return prisma.potholeImageBox.update({
    where: { id },
    data: potholeImageBox,
  });
};

export const deletePotholeImageBox = async (
  id: number
): Promise<PotholeImageBox | null> => {
  return prisma.potholeImageBox.delete({
    where: { id },
  });
};
