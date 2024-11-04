import express from "express";
import { createPotholeHandler, deletePotholeHandler, updatePotholeHandler } from "../controller/potholeController";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { createPotholeSchema, deletePotholeSchema, updatePotholeSchema } from "../schema/potholeSchema";

const potholeRouter = express.Router();

potholeRouter.post(
  "/pothole",
  requireUser,
  validateResource(createPotholeSchema),
  createPotholeHandler,
);

potholeRouter.put(
  "/pothole/:id",
  requireUser,
  validateResource(updatePotholeSchema),
  updatePotholeHandler,
);

potholeRouter.delete(
  "/pothole/:id",
  requireUser,
  validateResource(deletePotholeSchema),
  deletePotholeHandler,
);

export default potholeRouter;