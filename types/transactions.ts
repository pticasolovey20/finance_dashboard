import * as zod from "zod";
import { TransactionType } from "@prisma/client";
import { TransactionSchema } from "@/schemas/transactionSchema";

export interface ITransactionData {
  id: string;
  type: TransactionType;
  categoryId: string;
  amount: number;
  date: Date;
  note?: string | null;
}

export type TransactionsFormFields = zod.infer<typeof TransactionSchema>;
