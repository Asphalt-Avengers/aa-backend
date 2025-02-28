import { ReportStatus } from "@prisma/client";
import { TypeOf, z } from "zod";

export type CreateReportBody = TypeOf<typeof createReportSchema>["body"];

export type DeleteReportParams = TypeOf<typeof idParamSchema>["params"];

export type GetReportByIdParams = TypeOf<typeof idParamSchema>["params"];

export type UpdateReportBody = TypeOf<typeof updateReportSchema>["body"];

export type UpdateReportParams = TypeOf<typeof updateReportSchema>["params"];

// Schema for creating a new report
export const createReportSchema = z.object({
  body: z.object({
    geom: z.string(),
    geomJson: z.object({}),
    description: z.string().optional(),
    comments: z.string().optional(),
    status: z.nativeEnum(ReportStatus).optional(),
    details: z.string().optional(),
  }),
});

// Schema for validating the report ID in route parameters
export const idParamSchema = z.object({
  params: z.object({
    id: z.string().refine((value) => !isNaN(Number(value)), {
      message: "ID must be a valid number.",
    }),
  }),
});
// Schema for updating an existing report
export const updateReportSchema = z.object({
  body: z.object({
    location: z.string().optional(),
    description: z.string().optional(),
    comments: z.string().optional(),
    status: z.nativeEnum(ReportStatus).optional(),
    details: z.string().optional(),
  }),
  params: z.object({
    id: z.string().refine((value) => !isNaN(Number(value)), {
      message: "ID must be a valid number.",
    }),
  }),
});
