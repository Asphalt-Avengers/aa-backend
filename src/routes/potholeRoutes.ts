import express from "express";
import { createPotholeHandler } from "../controller/potholeController";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { createPotholeSchema } from "../schema/potholeSchema";

const potholeRouter = express.Router();

potholeRouter.post(
  "/pothole",
  requireUser,
  validateResource(createPotholeSchema),
  createPotholeHandler,
);

export default potholeRouter;