import { Router } from "express";

import {
  createReportHandler,
  deleteReportHandler,
  getReportByIdHandler,
  getReportsHandler,
  updateReportHandler,
} from "@controller/reportController";
import requireUser from "@middleware/requireUser";
import validateResource from "@middleware/validateResource";
import {
  createReportSchema,
  idParamSchema,
  updateReportSchema,
} from "@schema/reportSchema";

const reportRouter = Router();

reportRouter.get("/reports", requireUser, getReportsHandler);

reportRouter.get(
  "/reports/:id",
  requireUser,
  validateResource(idParamSchema),
  getReportByIdHandler,
);

reportRouter.post(
  "/reports",
  requireUser,
  validateResource(createReportSchema),
  createReportHandler,
);

reportRouter.put(
  "/reports/:id",
  requireUser,
  validateResource(updateReportSchema),
  updateReportHandler,
);

reportRouter.delete(
  "/reports/:id",
  requireUser,
  validateResource(idParamSchema),
  deleteReportHandler,
);

export default reportRouter;
