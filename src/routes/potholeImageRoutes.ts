import express from "express";
import {
  createPotholeImageHandler,
  deletePotholeImageHandler,
  getPotholeImageByIdHandler,
  getPotholeImagesHandler,
} from "../controller/potholeImageController";
import requireUser from "@middleware/requireUser";
import validateResource from "@middleware/validateResource";
import {
  createPotholeImageSchema,
  idParamSchema,
} from "../schema/potholeImageSchema";

const potholeImageRouter = express.Router();

potholeImageRouter.get("/images", requireUser, getPotholeImagesHandler);

potholeImageRouter.get(
  "/images/:id",
  requireUser,
  validateResource(idParamSchema),
  getPotholeImageByIdHandler
);

potholeImageRouter.post(
  "/images",
  // requireUser,
  validateResource(createPotholeImageSchema),
  createPotholeImageHandler
);

potholeImageRouter.delete(
  "/images/:id",
  requireUser,
  validateResource(idParamSchema),
  deletePotholeImageHandler
);

export default potholeImageRouter;
