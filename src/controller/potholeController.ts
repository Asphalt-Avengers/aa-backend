import { Prisma } from "@prisma/client";
import { CreatePotholeBody, DeletePotholeParams, GetPotholeByIdParams, UpdatePotholeBody, UpdatePotholeParams } from "@schema/potholeSchema";
import { createPothole, deletePothole, getPotholeById, getPotholes, updatePothole } from "@service/potholeService";
import { Request, Response } from "express";

export const getPotholeHandler = async (req: Request<{}, {}, {}>, res: Response) => {
  try {
    const potholes = await getPotholes();
    res.status(200).json({
      message: "Retrieved potholes successfully",
      potholes
    });
  } catch (e: any) {
    res.status(500).json({
      error: "An unexpected error occurred.",
      details: e.message,
    });
  }
};

export const getPotholeByIdHandler = async (req: Request<GetPotholeByIdParams, {}, {}>, res: Response) => {
  const id = Number(req.params.id)

  try {
    const pothole = await getPotholeById(id);
    if (pothole === null) {
      res.status(404).json({
        error: `Pothole with ID ${id} not found`,
      });
      return;
    }
    res.status(200).json({
      message: "Retrieved pothole successfully",
      pothole
    });
  } catch (e: any) {
    res.status(500).json({
      error: "An unexpected error occurred.",
      details: e.message,
    });
  }
};

export const createPotholeHandler = async (req: Request<{}, {}, CreatePotholeBody>, res: Response) => {
  const body = req.body;

  try {
    const pothole = await createPothole(body);
    res.status(201).json({
      message: "Pothole created successfully",
      pothole
    });
  } catch (e: any) {
    res.status(500).json({
      error: "An unexpected error occurred.",
      details: e.message,
    });
  }
};

export const updatePotholeHandler = async (req: Request<UpdatePotholeParams, {}, UpdatePotholeBody>, res: Response) => {
  const id = Number(req.params.id)
  const body = req.body;

  try {
    const pothole = await updatePothole(id, body);
    res.status(200).json({
      message: "Pothole updated successfully",
      pothole
    });
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        res.status(404).json({
          error: `Pothole with ID ${id} not found`,
        });
        return;
      }
    }
    res.status(500).json({
      error: "An unexpected error occurred.",
      details: e.message,
    });
  }
};

export const deletePotholeHandler = async (req: Request<DeletePotholeParams, {}, {}>, res: Response) => {
  const id = Number(req.params.id)

  try {
    const pothole = await deletePothole(id);
    res.status(200).json({
      message: "Pothole deleted successfully",
      pothole
    });
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        res.status(404).json({
          error: `Pothole with ID ${id} not found`,
        });
        return;
      }
    }
    res.status(500).json({
      error: "An unexpected error occurred.",
      details: e.message,
    });
  }
};
