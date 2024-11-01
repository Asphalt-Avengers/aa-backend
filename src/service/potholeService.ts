import { Pothole } from "@prisma/client";
import prisma from "@prisma/index";
import { CreatePotholeInput } from "@schema/potholeSchema";

export async function createPothole(pothole: CreatePotholeInput): Promise<Pothole> {
  return await prisma.pothole.create({
    data: {
      latitude: pothole.latitude,
      longitude: pothole.longitude,
      severity: pothole.severity,
      description: pothole.description
    },
  });
}