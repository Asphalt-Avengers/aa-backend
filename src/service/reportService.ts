import { Detection, Report } from "@prisma/client";

import prisma from "@prisma/index";
import { CreateReportBody, UpdateReportBody } from "@schema/reportSchema";

// Create a new report
export async function createReport(report: CreateReportBody): Promise<Report> {
  return await prisma.report.upsert({
    where: { geom: report.geom }, // Find by unique geom
    create: report, // Insert if not exists
    update: {}, // If it exists, do nothing
  });
}

// Delete a report by ID
export async function deleteReport(id: number): Promise<Report> {
  return await prisma.report.delete({
    where: { id },
  });
}

// Fetch a single report by ID, including the associated detection
export async function getReportById(
  id: number,
): Promise<(Report & { detections: Detection[] }) | null> {
  return await prisma.report.findUnique({
    where: { id },
    include: {
      detections: true,
    },
  });
}

// Fetch all reports, including the associated detection, ordered by createdAt
export async function getReports(orderBy: {
  createdAt: "asc" | "desc";
}): Promise<(Report & { detections: Detection[] })[]> {
  return await prisma.report.findMany({
    include: {
      detections: true,
    },
    orderBy,
  });
}

// Update an existing report
export async function updateReport(
  id: number,
  report: UpdateReportBody,
): Promise<Report> {
  return await prisma.report.update({
    where: { id },
    data: report,
  });
}
