import express from "express";
import {
  createPotholeHandler,
  deletePotholeHandler,
  getPotholeByIdHandler,
  getPotholesHandler,
  updatePotholeHandler,
} from "../controller/potholeController";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import {
  createPotholeSchema,
  idParamSchema,
  updatePotholeSchema,
} from "../schema/potholeSchema";

const potholeRouter = express.Router();

potholeRouter.get("/potholes", requireUser, getPotholesHandler);

potholeRouter.get(
  "/potholes/:id",
  requireUser,
  validateResource(idParamSchema),
  getPotholeByIdHandler
);

potholeRouter.post(
  "/potholes",
  requireUser,
  validateResource(createPotholeSchema),
  createPotholeHandler
);

potholeRouter.put(
  "/potholes/:id",
  requireUser,
  validateResource(updatePotholeSchema),
  updatePotholeHandler
);

potholeRouter.delete(
  "/potholes/:id",
  requireUser,
  validateResource(idParamSchema),
  deletePotholeHandler
);

export default potholeRouter;
