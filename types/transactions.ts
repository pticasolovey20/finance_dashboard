import { TransactionType } from "@prisma/client";

export interface ITransactionData {
  id: string;
  type: TransactionType;
  categoryId: string;
  amount: number;
  date: Date;
  note?: string | null;
}
