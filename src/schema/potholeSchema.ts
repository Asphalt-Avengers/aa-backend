import { z } from "zod";

export const createPotholeSchema = z.object({
  body: z.object({
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    severity: z.number().int().min(1).max(5).optional(),
    description: z.string().optional(),
  }),
});
