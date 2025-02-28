import { Detection, Report } from "@prisma/client";

import prisma from "@prisma/index";
import {
  CreateDetectionBody,
  UpdateDetectionBody,
} from "@schema/detectionSchema";

import { createReport } from "./reportService";

export async function createDetection(detection: CreateDetectionBody) {
  // generate geom
  // Compute snapped grid geometry grid size of 20m x 20m
  const snappedGridResponse: { st_asbinary: Buffer; st_asgeojson: string }[] =
    await prisma.$queryRaw`
    SELECT 
      ST_AsBinary(
        ST_SnapToGrid(
          ST_SetSRID(ST_MakePoint(${detection.latitude}, ${detection.longitude}), 4326), 
          0.00018, 0.00018
        )
      ) AS st_asbinary,
      ST_AsGeoJSON(
        ST_SnapToGrid(
          ST_SetSRID(ST_MakePoint(${detection.latitude}, ${detection.longitude}), 4326), 
          0.00018, 0.00018
        )
      ) AS st_asgeojson
  `;

  const geom = snappedGridResponse[0].st_asbinary.toString("hex"); // Convert binary to hex
  const geomJson = JSON.parse(snappedGridResponse[0].st_asgeojson) as {
    type: string;
    coordinates: number[];
  }; // Convert GeoJSON to object

  // Upsert the report for the grid
  const report = await createReport({ geom: geom, geomJson: geomJson });

  return await prisma.detection.create({
    data: {
      ...detection,
      reportId: report.id,
    },
  });
}

export async function deleteDetection(id: number): Promise<Detection> {
  return await prisma.detection.delete({
    where: { id },
  });
}

export async function getDetectionById(
  id: number,
): Promise<(Detection & { report: Report | null }) | null> {
  return await prisma.detection.findUnique({
    where: { id },
    include: {
      report: true,
    },
  });
}

export async function getDetections(): Promise<
  (Detection & { report: Report | null })[]
> {
  return await prisma.detection.findMany({
    include: {
      report: true,
    },
  });
}

export async function updateDetection(
  id: number,
  detection: UpdateDetectionBody,
): Promise<Detection> {
  return await prisma.detection.update({
    where: { id },
    data: detection,
  });
}
