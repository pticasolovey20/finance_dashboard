import * as zod from "zod";

import { TransactionType } from "@prisma/client";
import { CategorySchema } from "@/schemas/categorySchema";

export interface ICategoryData {
  categoryId: string;
  categoryName: string;
  type: TransactionType;
  color: string;

  _count?: {
    transactions: number;
  };
}

export type CategoriesFormFields = zod.infer<typeof CategorySchema>;
