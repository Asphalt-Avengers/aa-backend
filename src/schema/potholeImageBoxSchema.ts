import { z, TypeOf } from "zod";

// Schema for creating a pothole image box
export const createPotholeImageBoxSchema = z.object({
  body: z.object({
    potholeImageId: z
      .number()
      .positive({ message: "Pothole image ID must be a positive number" }),
    xCenter: z.number(),
    yCenter: z.number(),
    width: z.number().positive(),
    height: z.number().positive(),
  }),
});

export type CreatePotholeImageBoxBody = TypeOf<typeof createPotholeImageBoxSchema>["body"];

// Schema for updating a pothole image box
export const updatePotholeImageBoxSchema = z.object({
  body: z.object({
    xCenter: z.number().optional(),
    yCenter: z.number().optional(),
    width: z.number().positive().optional(),
    height: z.number().positive().optional(),
  }),
});

export type UpdatePotholeImageBoxBody = TypeOf<typeof updatePotholeImageBoxSchema>["body"];

// Schema for validating pothole image box ID in the params
export const idParamSchema = z.object({
  params: z.object({
    id: z.string().refine((value) => !isNaN(Number(value)), {
      message: "ID must be a valid number",
    }),
  }),
});

export type GetPotholeImageBoxByIdParams = TypeOf<typeof idParamSchema>["params"];
