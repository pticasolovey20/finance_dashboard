import * as zod from "zod";

export const TransactionSchema = zod.object({
  type: zod.string({ required_error: "Required field" }),
  status: zod.optional(zod.string()),
  categoryId: zod.string({ required_error: "Required field" }),

  amount: zod
    .custom<number>()
    .refine((value) => value ?? false, "Required field")
    .refine((value) => Number.isFinite(Number(value)), "Invalid number")
    .transform((value) => Number(value)),

  date: zod.date({ required_error: "Required field" }),
  note: zod.string({ required_error: "Required field" }),
});
