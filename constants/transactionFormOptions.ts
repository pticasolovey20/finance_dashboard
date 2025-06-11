import { TransactionType } from "@prisma/client";
import { IOptionsData } from "@/types/selectOptionsTypes";

export const transactionsTypeOptions: IOptionsData[] = [
  { label: "Income", value: TransactionType.income },
  { label: "Expense", value: TransactionType.expense },
];
