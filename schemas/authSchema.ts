import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(2, { message: "message" })
    .max(30, { message: "message" }),

  password: z
    .string()
    .min(2, { message: "message" })
    .max(30, { message: "message" }),
});
