import { DetectionSeverity } from "@prisma/client";
import { TypeOf, z } from "zod";

export type CreateDetectionBody = TypeOf<typeof createDetectionSchema>["body"];
export type DeleteDetectionParams = TypeOf<typeof idParamSchema>["params"];
export type GetDetectionByIdParams = TypeOf<typeof idParamSchema>["params"];

export type UpdateDetectionBody = TypeOf<typeof updateDetectionSchema>["body"];
export type UpdateDetectionParams = TypeOf<
  typeof updateDetectionSchema
>["params"];

export const createDetectionSchema = z.object({
  body: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    severity: z.nativeEnum(DetectionSeverity).optional(),
    description: z.string().optional(),
    s3Url: z.string(),
  }),
});
export const idParamSchema = z.object({
  params: z.object({
    id: z.string().refine((value) => !isNaN(Number(value)), {
      message: "ID must be valid number.",
    }),
  }),
});
export const updateDetectionSchema = z.object({
  body: z.object({
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    severity: z.nativeEnum(DetectionSeverity).optional(),
    description: z.string().optional(),
  }),
  params: z.object({
    id: z.string().refine((value) => !isNaN(Number(value)), {
      message: "ID must be valid number.",
    }),
  }),
});
