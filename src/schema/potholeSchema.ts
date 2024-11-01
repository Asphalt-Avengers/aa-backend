import { PotholeSeverity } from "@prisma/client";
import { TypeOf, z } from "zod";

export const createPotholeSchema = z.object({
  body: z.object({
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    severity: z.nativeEnum(PotholeSeverity).optional(),
    description: z.string().optional(),
  }),
});

export type CreatePotholeInput = TypeOf<typeof createPotholeSchema>["body"];