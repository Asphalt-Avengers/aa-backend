import { TypeOf, object, string } from "zod";

export type CreateSessionInput = TypeOf<typeof createSessionSchema>["body"];

export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Invalid email or password"),
    password: string({
      required_error: "Password is required",
    }).min(6, "Invalid email or password"),
  }),
});
