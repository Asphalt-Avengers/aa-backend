import express from "express";
import {
  createPotholeImageBoxHandler,
  deletePotholeImageBoxHandler,
  getPotholeImageBoxByIdHandler,
  getPotholeImageBoxesHandler,
  updatePotholeImageBoxHandler,
} from "../controller/potholeImageBoxController";
import requireUser from "@middleware/requireUser";
import validateResource from "@middleware/validateResource";
import {
  createPotholeImageBoxSchema,
  idParamSchema,
  updatePotholeImageBoxSchema,
} from "../schema/potholeImageBoxSchema";

const potholeImageBoxRouter = express.Router();

potholeImageBoxRouter.get("/boxes", requireUser, getPotholeImageBoxesHandler);

potholeImageBoxRouter.get(
  "/boxes/:id",
  requireUser,
  validateResource(idParamSchema),
  getPotholeImageBoxByIdHandler
);

potholeImageBoxRouter.post(
  "/boxes",
  // requireUser,
  validateResource(createPotholeImageBoxSchema),
  createPotholeImageBoxHandler
);

potholeImageBoxRouter.put(
  "/boxes/:id",
  requireUser,
  validateResource(idParamSchema),
  validateResource(updatePotholeImageBoxSchema),
  updatePotholeImageBoxHandler
);

potholeImageBoxRouter.delete(
  "/boxes/:id",
  requireUser,
  validateResource(idParamSchema),
  deletePotholeImageBoxHandler
);

export default potholeImageBoxRouter;
