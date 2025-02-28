import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

import {
  CreateReportBody,
  DeleteReportParams,
  GetReportByIdParams,
  UpdateReportBody,
  UpdateReportParams,
} from "@schema/reportSchema";
import {
  createReport,
  deleteReport,
  getReportById,
  getReports,
  updateReport,
} from "@service/reportService";

export const createReportHandler = async (
  req: Request<object, object, CreateReportBody>,
  res: Response,
) => {
  const body = req.body;

  try {
    const report = await createReport(body);
    res.status(201).json({
      message: "Report created successfully",
      report,
    });
  } catch (e) {
    res.status(500).json({
      error: "An unexpected error occurred.",
      details: (e as Error).message,
    });
  }
};

export const deleteReportHandler = async (
  req: Request<DeleteReportParams>,
  res: Response,
) => {
  const id = Number(req.params.id);

  try {
    const report = await deleteReport(id);
    res.status(200).json({
      message: "Report deleted successfully",
      report,
    });
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2025"
    ) {
      res.status(404).json({ error: `Report with ID ${id} not found` });
      return;
    }
    res.status(500).json({
      error: "An unexpected error occurred.",
      details: (e as Error).message,
    });
  }
};

export const getReportByIdHandler = async (
  req: Request<GetReportByIdParams>,
  res: Response,
) => {
  const id = Number(req.params.id);

  try {
    const report = await getReportById(id);
    if (!report) {
      res.status(404).json({ error: `Report with ID ${id} not found` });
      return;
    }
    res.status(200).json({
      message: "Retrieved report successfully",
      report,
    });
  } catch (e) {
    res.status(500).json({
      error: "An unexpected error occurred.",
      details: (e as Error).message,
    });
  }
};

export const getReportsHandler = async (req: Request, res: Response) => {
  try {
    const reports = await getReports();
    res.status(200).json({
      message: "Retrieved reports successfully",
      reports,
    });
  } catch (e) {
    res.status(500).json({
      error: "An unexpected error occurred.",
      details: (e as Error).message,
    });
  }
};

export const updateReportHandler = async (
  req: Request<UpdateReportParams, object, UpdateReportBody>,
  res: Response,
) => {
  const id = Number(req.params.id);
  const body = req.body;

  try {
    const report = await updateReport(id, body);
    res.status(200).json({
      message: "Report updated successfully",
      report,
    });
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2025"
    ) {
      res.status(404).json({ error: `Report with ID ${id} not found` });
      return;
    }
    res.status(500).json({
      error: "An unexpected error occurred.",
      details: (e as Error).message,
    });
  }
};
