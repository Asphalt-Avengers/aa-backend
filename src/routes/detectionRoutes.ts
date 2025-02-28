import { Router } from "express";

import {
  createDetectionHandler,
  deleteDetectionHandler,
  getDetectionByIdHandler,
  getDetectionsHandler,
  updateDetectionHandler,
} from "@controller/detectionController";
import requireUser from "@middleware/requireUser";
import validateResource from "@middleware/validateResource";
import {
  createDetectionSchema,
  idParamSchema,
  updateDetectionSchema,
} from "@schema/detectionSchema";

const detectionRouter = Router();

detectionRouter.get("/detections", requireUser, getDetectionsHandler);

detectionRouter.get(
  "/detections/:id",
  requireUser,
  validateResource(idParamSchema),
  getDetectionByIdHandler,
);

detectionRouter.post(
  "/detections",
  requireUser,
  validateResource(createDetectionSchema),
  createDetectionHandler,
);

detectionRouter.put(
  "/detections/:id",
  requireUser,
  validateResource(updateDetectionSchema),
  updateDetectionHandler,
);

detectionRouter.delete(
  "/detections/:id",
  requireUser,
  validateResource(idParamSchema),
  deleteDetectionHandler,
);

export default detectionRouter;
