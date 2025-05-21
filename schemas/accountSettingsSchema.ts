import * as zod from "zod";

export const AccountSettingsSchema = zod
  .object({
    firstName: zod
      .string()
      .min(2, { message: "Minimum length is 2" })
      .max(30, { message: "Maximum length is 30" }),

    lastName: zod.string().min(2, { message: "Minimum length is 2" }),

    email: zod.string().email({
      message: "Not a valid email address",
    }),

    currentPassword: zod
      .string()
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/, {
        message:
          "Password must be at least 8 english characters, and contain 1 uppercase, 1 lowercase and 1 digit",
      }),

    newPassword: zod.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/, {
      message:
        "Password must be at least 8 english characters, and contain 1 uppercase, 1 lowercase and 1 digit",
    }),
  })
  .refine(
    (data) => {
      if (data.currentPassword === data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password must be different from current password",
      path: ["newPassword"],
    }
  );
