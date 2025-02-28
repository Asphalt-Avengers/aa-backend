import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

import {
  CreateDetectionBody,
  DeleteDetectionParams,
  GetDetectionByIdParams,
  UpdateDetectionBody,
  UpdateDetectionParams,
} from "@schema/detectionSchema";
import {
  createDetection,
  deleteDetection,
  getDetectionById,
  getDetections,
  updateDetection,
} from "@service/detectionService";

export const createDetectionHandler = async (
  req: Request<object, object, CreateDetectionBody>,
  res: Response,
) => {
  const body = req.body;

  try {
    const detection = await createDetection(body);
    res.status(201).json({
      message: "Detection created successfully",
      detection,
    });
  } catch (e) {
    res.status(500).json({
      error: "An unexpected error occurred.",
      details: (e as Error).message,
    });
  }
};

export const deleteDetectionHandler = async (
  req: Request<DeleteDetectionParams, object, object>,
  res: Response,
) => {
  const id = Number(req.params.id);

  try {
    const detection = await deleteDetection(id);
    res.status(200).json({
      message: "Detection deleted successfully",
      detection,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        res.status(404).json({
          error: `Detection with ID ${id} not found`,
        });
        return;
      }
    }
    res.status(500).json({
      error: "An unexpected error occurred.",
      details: (e as Error).message,
    });
  }
};

export const getDetectionByIdHandler = async (
  req: Request<GetDetectionByIdParams, object, object>,
  res: Response,
) => {
  const id = Number(req.params.id);

  try {
    const detection = await getDetectionById(id);
    if (detection === null) {
      res.status(404).json({
        error: `Detection with ID ${id} not found`,
      });
      return;
    }
    res.status(200).json({
      message: "Retrieved detection successfully",
      detection,
    });
  } catch (e) {
    res.status(500).json({
      error: "An unexpected error occurred.",
      details: (e as Error).message,
    });
  }
};

export const getDetectionsHandler = async (req: Request, res: Response) => {
  try {
    const detections = await getDetections();
    res.status(200).json({
      message: "Retrieved detections successfully",
      detections,
    });
  } catch (e) {
    res.status(500).json({
      error: "An unexpected error occurred.",
      details: (e as Error).message,
    });
  }
};

export const updateDetectionHandler = async (
  req: Request<UpdateDetectionParams, object, UpdateDetectionBody>,
  res: Response,
) => {
  const id = Number(req.params.id);
  const body = req.body;

  try {
    const detection = await updateDetection(id, body);
    res.status(200).json({
      message: "Detection updated successfully",
      detection,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        res.status(404).json({
          error: `Detection with ID ${id} not found`,
        });
        return;
      }
    }
    res.status(500).json({
      error: "An unexpected error occurred.",
      details: (e as Error).message,
    });
  }
};
