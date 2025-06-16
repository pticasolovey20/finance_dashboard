import * as zod from "zod";

import {
  incomeCategories,
  expenseCategories,
} from "@/constants/transactionCategory";
import { TransactionType } from "@prisma/client";

export const TransactionSchema = zod
  .object({
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
  })
  .refine(
    (data) => {
      if (data.type === TransactionType.income) {
        return incomeCategories.includes(data.categoryId);
      }

      if (data.type === TransactionType.expense) {
        return expenseCategories.includes(data.categoryId);
      }

      return false;
    },

    {
      message: "Category does not match the selected transaction type",
      path: ["categoryId"],
    }
  );
