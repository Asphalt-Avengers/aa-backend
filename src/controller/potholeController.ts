import { CreatePotholeInput } from "@schema/potholeSchema";
import { createPothole } from "@service/potholeService";
import { Request, Response } from "express";

export const createPotholeHandler = async (req: Request<{}, {}, CreatePotholeInput>, res: Response) => {
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
