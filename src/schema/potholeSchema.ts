import { PotholeSeverity } from "@prisma/client";
import { TypeOf, z } from "zod";

export const idParamSchema = z.object({
  params: z.object({
    id: z.string().refine((value) => !isNaN(Number(value)), {
      "message": "ID must be valid number."
    })
  })
});
export type GetPotholeByIdParams = TypeOf<typeof idParamSchema>["params"];
export type DeletePotholeParams = TypeOf<typeof idParamSchema>["params"];

export const createPotholeSchema = z.object({
  body: z.object({
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    severity: z.nativeEnum(PotholeSeverity).optional(),
    description: z.string().optional(),
  }),
});
export type CreatePotholeBody = TypeOf<typeof createPotholeSchema>["body"];

export const updatePotholeSchema = z.object({
  body: z.object({
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    severity: z.nativeEnum(PotholeSeverity).optional(),
    description: z.string().optional(),
  }),
  params: z.object({
    id: z.string().refine((value) => !isNaN(Number(value)), {
      "message": "ID must be valid number."
    })
  })
});
export type UpdatePotholeBody = TypeOf<typeof updatePotholeSchema>["body"];
export type UpdatePotholeParams = TypeOf<typeof updatePotholeSchema>["params"];