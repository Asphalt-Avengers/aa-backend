import { Pothole } from "@prisma/client";
import prisma from "@prisma/index";
import { CreatePotholeBody, UpdatePotholeBody } from "@schema/potholeSchema";

export async function createPothole(pothole: CreatePotholeBody): Promise<Pothole> {
  return await prisma.pothole.create({
    data: pothole,
  });
}

export async function updatePothole(id: number, pothole: UpdatePotholeBody): Promise<Pothole> {
  return await prisma.pothole.update({
    where: { id },
    data: pothole
  });
}

export async function deletePothole(id: number): Promise<Pothole> {
  return await prisma.pothole.delete({
    where: { id },
  });
}