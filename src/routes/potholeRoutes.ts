import express from "express";
import { createPotholeHandler, updatePotholeHandler } from "../controller/potholeController";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { createPotholeSchema, updatePotholeSchema } from "../schema/potholeSchema";

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

export default potholeRouter;