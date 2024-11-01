import express from "express";
import { createPotholeHandler } from "../controller/potholeController";
import deserializeUser from "../middleware/deserializeUser";
import requireUser from "../middleware/requireUser";
import logResponse from "../middleware/logResponse";
import validateResource from "../middleware/validateResource";
import { createPotholeSchema } from "../schema/potholeSchema";

const potholeRouter = express.Router();

potholeRouter.post(
  "/pothole",
  deserializeUser,
  logResponse,
  validateResource(createPotholeSchema),
  createPotholeHandler
);

// potholeRouter.post(
//   "/pothole",
//   deserializeUser,
//   requireUser,
//   logResponse,
//   validateResource(createPotholeSchema),
//   createPotholeHandler
// );

export default potholeRouter;
