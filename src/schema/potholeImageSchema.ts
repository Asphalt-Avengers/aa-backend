import { z, TypeOf } from "zod";

export const createPotholeImageSchema = z.object({
  body: z.object({
    potholeId: z
      .number()
      .positive({ message: "Pothole ID must be a positive number" }),
    s3Url: z.string().url({ message: "Invalid URL format for image" }),
  }),
});

export type CreatePotholeImageBody = TypeOf<
  typeof createPotholeImageSchema
>["body"];

export const idParamSchema = z.object({
  params: z.object({
    id: z.string().refine((value) => !isNaN(Number(value)), {
      message: "ID must be a valid number",
    }),
  }),
});

export type GetPotholeImageByIdParams = TypeOf<typeof idParamSchema>["params"];
