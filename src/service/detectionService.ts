import { Detection, Report } from "@prisma/client";
import prisma from "@prisma/index";

import {
  CreateDetectionBody,
  UpdateDetectionBody,
} from "@schema/detectionSchema";

import { createReport } from "./reportService";

export async function getDetections(): Promise<
  (Detection & { report: Report | null })[]
> {
  return await prisma.detection.findMany({
    include: {
      report: true,
    },
  });
}

export async function getDetectionById(
  id: number
): Promise<(Detection & { report: Report | null }) | null> {
  return await prisma.detection.findUnique({
    where: { id },
    include: {
      report: true,
    },
  });
}

export async function createDetection(
  detection: CreateDetectionBody
): Promise<any> {
  // generate geom
  // Compute snapped grid geometry
  const snappedGridResponse: { st_asbinary: Buffer }[] = await prisma.$queryRaw`
      SELECT ST_AsBinary(
          ST_SnapToGrid(
              ST_SetSRID(ST_MakePoint(${detection.latitude}, ${detection.longitude}), 4326), 
              0.001
          )
      )
    `;

  const geom = snappedGridResponse[0].st_asbinary.toString("hex");

  // Upsert the report for the grid
  const report = await createReport({ geom });

  return await prisma.detection.create({
    data: {
      ...detection,
      reportId: report.id,
    },
  });
}

export async function updateDetection(
  id: number,
  detection: UpdateDetectionBody
): Promise<Detection> {
  return await prisma.detection.update({
    where: { id },
    data: detection,
  });
}

export async function deleteDetection(id: number): Promise<Detection> {
  return await prisma.detection.delete({
    where: { id },
  });
}
