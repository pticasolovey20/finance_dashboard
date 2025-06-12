import * as zod from "zod";
import { TransactionSchema } from "@/schemas/transactionSchema";
import { TransactionType, TransactionStatus } from "@prisma/client";

export interface ITransactionData {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  categoryId: string;
  amount: number;
  date: Date;
  note: string;
}

export type TransactionsFormFields = zod.infer<typeof TransactionSchema>;

export type ModalMode = "create" | "edit";
