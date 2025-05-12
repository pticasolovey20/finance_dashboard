import * as zod from "zod";

export const RegisterSchema = zod
  .object({
    firstName: zod
      .string({ required_error: "Required field" })
      .min(2, { message: "Minimum length is 2" })
      .max(30, { message: "Maximum length is 30" }),

    lastName: zod
      .string({ required_error: "Required field" })
      .min(2, { message: "Minimum length is 2" }),

    email: zod.string({ required_error: "Required field" }).email({
      message: "Not a valid email address",
    }),

    password: zod
      .string({ required_error: "Required field" })
      .min(8, {
        message:
          "Password must be at least 8 english characters, and contain 1 uppercase, 1 lowercase and 1 digit",
      })
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/, {
        message:
          "Password must be at least 8 english characters, and contain 1 uppercase, 1 lowercase and 1 digit",
      }),

    confirmPassword: zod.string({ required_error: "Required field" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

export const LoginSchema = zod.object({
  email: zod.string({ required_error: "Required field" }).email({
    message: "Not a valid email address",
  }),

  password: zod
    .string({ required_error: "Required field" })
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/, {
      message:
        "Password must be at least 8 english characters, and contain 1 uppercase, 1 lowercase and 1 digit",
    }),
});
