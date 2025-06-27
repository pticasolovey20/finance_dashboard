import * as zod from "zod";

import { TransactionType, TransactionStatus } from "@prisma/client";
import { TransactionFormSchema } from "@/schemas/transactionFormSchema";

export interface ITransactionData {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  categoryId: string;
  amount: number;
  date: Date;
  note: string;
}

export type TransactionsFormFields = zod.infer<typeof TransactionFormSchema>;

export type ModalMode = "create" | "edit";
