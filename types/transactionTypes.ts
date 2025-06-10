import * as zod from "zod";
import { TransactionType } from "@prisma/client";
import { TransactionSchema } from "@/schemas/transactionSchema";

export interface ITransactionData {
  id: string;
  type: TransactionType;
  categoryId: string;
  amount: number;
  date: Date;
  note: string;
}

export type TransactionsFormFields = zod.infer<typeof TransactionSchema>;

export type ModalMode = "create" | "edit";
