import { Request, Response } from "express";
import {
  CreatePotholeImageBody,
  GetPotholeImageByIdParams,
} from "@schema/potholeImageSchema";
import {
  createPotholeImage,
  deletePotholeImage,
  getPotholeImageById,
  getPotholeImages,
} from "@service/potholeImageService";

export const getPotholeImagesHandler = async (req: Request, res: Response) => {
  try {
    const images = await getPotholeImages();
    res.status(200).json({ message: "Retrieved images successfully", images });
  } catch (e: any) {
    res
      .status(500)
      .json({ error: "An unexpected error occurred.", details: e.message });
  }
};

export const getPotholeImageByIdHandler = async (
  req: Request<GetPotholeImageByIdParams>,
  res: Response
) => {
  const id = Number(req.params.id);

  try {
    const image = await getPotholeImageById(id);
    if (!image) {
      res.status(404).json({ error: `Image with ID ${id} not found` });
      return;
    }
    res.status(200).json({ message: "Retrieved image successfully", image });
  } catch (e: any) {
    res
      .status(500)
      .json({ error: "An unexpected error occurred.", details: e.message });
  }
};

export const createPotholeImageHandler = async (
  req: Request<{}, {}, CreatePotholeImageBody>,
  res: Response
) => {
  const body = req.body;

  try {
    const image = await createPotholeImage(body);
    res.status(201).json({ message: "Image created successfully", image });
  } catch (e: any) {
    res
      .status(500)
      .json({ error: "An unexpected error occurred.", details: e.message });
  }
};

export const deletePotholeImageHandler = async (
  req: Request<GetPotholeImageByIdParams>,
  res: Response
) => {
  const id = Number(req.params.id);

  try {
    const image = await deletePotholeImage(id);
    res.status(200).json({ message: "Image deleted successfully", image });
  } catch (e: any) {
    res
      .status(500)
      .json({ error: "An unexpected error occurred.", details: e.message });
  }
};
