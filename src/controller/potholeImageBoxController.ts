import { Request, Response } from "express";
import {
  CreatePotholeImageBoxBody,
  GetPotholeImageBoxByIdParams,
  UpdatePotholeImageBoxBody,
} from "@schema/potholeImageBoxSchema";
import {
  createPotholeImageBox,
  deletePotholeImageBox,
  getPotholeImageBoxById,
  getPotholeImageBoxes,
  updatePotholeImageBox,
} from "@service/potholeImageBoxService";

export const getPotholeImageBoxesHandler = async (req: Request, res: Response) => {
  try {
    const boxes = await getPotholeImageBoxes();
    res.status(200).json({ message: "Retrieved pothole image boxes successfully", boxes });
  } catch (e: any) {
    res.status(500).json({ error: "An unexpected error occurred.", details: e.message });
  }
};

export const getPotholeImageBoxByIdHandler = async (
  req: Request<GetPotholeImageBoxByIdParams>,
  res: Response
) => {
  const id = Number(req.params.id);

  try {
    const box = await getPotholeImageBoxById(id);
    if (!box) {
      res.status(404).json({ error: `Pothole Image Box with ID ${id} not found` });
    }
    res.status(200).json({ message: "Retrieved pothole image box successfully", box });
  } catch (e: any) {
    res.status(500).json({ error: "An unexpected error occurred.", details: e.message });
  }
};

export const createPotholeImageBoxHandler = async (
  req: Request<{}, {}, CreatePotholeImageBoxBody>,
  res: Response
) => {
  const body = req.body;

  try {
    const box = await createPotholeImageBox(body);
    res.status(201).json({ message: "Pothole image box created successfully", box });
  } catch (e: any) {
    res.status(500).json({ error: "An unexpected error occurred.", details: e.message });
  }
};

export const updatePotholeImageBoxHandler = async (
  req: Request<GetPotholeImageBoxByIdParams, {}, UpdatePotholeImageBoxBody>,
  res: Response
) => {
  const id = Number(req.params.id);
  const body = req.body;

  try {
    const box = await updatePotholeImageBox(id, body);
    if (!box) {
      res.status(404).json({ error: `Pothole Image Box with ID ${id} not found` });
    }
    res.status(200).json({ message: "Pothole image box updated successfully", box });
  } catch (e: any) {
    res.status(500).json({ error: "An unexpected error occurred.", details: e.message });
  }
};


export const deletePotholeImageBoxHandler = async (
  req: Request<GetPotholeImageBoxByIdParams>,
  res: Response
) => {
  const id = Number(req.params.id);

  try {
    const box = await deletePotholeImageBox(id);
    res.status(200).json({ message: "Pothole image box deleted successfully", box });
  } catch (e: any) {
    res.status(500).json({ error: "An unexpected error occurred.", details: e.message });
  }
};
