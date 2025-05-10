import * as zod from "zod";

export const RegisterSchema = zod.object({
  email: zod.string().email({ message: "message" }),

  password: zod
    .string()
    .min(2, { message: "message" })
    .max(30, { message: "message" }),
});

export const LoginSchema = zod.object({
  email: zod.string().email({ message: "message" }),

  password: zod
    .string()
    .min(2, { message: "message" })
    .max(30, { message: "message" }),
});
