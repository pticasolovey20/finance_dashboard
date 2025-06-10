import { TransactionType } from "@prisma/client";

export interface ICategoryData {
  id: string;
  name: string;
  type: TransactionType;
  color?: string | null;
}
