import { TransactionType } from "@prisma/client";
import { IOptionsData } from "@/types/selectOptionsTypes";

export const transactionsTypeOptions: IOptionsData[] = [
  { label: "Income", value: TransactionType.income },
  { label: "Expense", value: TransactionType.expense },
];

export const expenseCategoryOptions: IOptionsData[] = [
  { label: "Food", value: "food" },
  { label: "Transportation", value: "transportation" },
  { label: "Housing", value: "housing" },
  { label: "Utilities", value: "utilities" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Education", value: "education" },
  { label: "Shopping", value: "shopping" },
  { label: "Taxes", value: "taxes" },
];

export const incomeCategoryOptions: IOptionsData[] = [
  { label: "Salary", value: "salary" },
  { label: "Freelance", value: "freelance" },
  { label: "Investments", value: "investments" },
  { label: "Gifts", value: "gifts" },
  { label: "Refunds", value: "refunds" },
];
