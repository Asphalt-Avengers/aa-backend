import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createPotholeHandler = async (req: Request, res: Response) => {
  const { latitude, longitude, severity, description } = req.body;

  try {
    const newPothole = await prisma.pothole.create({
      data: {
        latitude,
        longitude,
        severity,
        description,
      },
    });
    res.status(201).json(newPothole);
  } catch (error) {
    console.error("Error creating pothole:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
