import { Report, Pothole } from "@prisma/client";
import prisma from "@prisma/index";
import { CreateReportBody, UpdateReportBody } from "@schema/reportSchema";

// Fetch all reports, including the associated pothole
export async function getReports(): Promise<(Report & { pothole: Pothole })[]> {
  return await prisma.report.findMany({
    include: {
      pothole: true,
    },
  });
}

// Fetch a single report by ID, including the associated pothole
export async function getReportById(
  id: number
): Promise<(Report & { pothole: Pothole }) | null> {
  return await prisma.report.findUnique({
    where: { id },
    include: {
      pothole: true,
    },
  });
}

// Create a new report
export async function createReport(report: CreateReportBody): Promise<Report> {
  return await prisma.report.create({
    data: report,
  });
}

// Update an existing report
export async function updateReport(
  id: number,
  report: UpdateReportBody
): Promise<Report> {
  return await prisma.report.update({
    where: { id },
    data: report,
  });
}

// Delete a report by ID
export async function deleteReport(id: number): Promise<Report> {
  return await prisma.report.delete({
    where: { id },
  });
}
