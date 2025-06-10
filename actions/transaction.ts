"use server";

import { database } from "@/lib/database";
import { TransactionType } from "@prisma/client";
import { TransactionsFormFields } from "@/types/transactionTypes";

export const getCreateTransaction = async (
  transaction: TransactionsFormFields
) => {
  try {
    const createdTransaction = await database.transaction.create({
      data: {
        type: transaction.type as TransactionType,
        amount: transaction.amount,
        date: transaction.date,
        note: transaction.note,
        categoryId: transaction.categoryId,
      },
    });

    return createdTransaction;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTransactionById = async (id: string) => {
  try {
    const existingTransaction = await database.transaction.findUnique({
      where: {
        id,
      },
    });

    return existingTransaction;
  } catch {
    return null;
  }
};

export const getAllTransactions = async () => {
  try {
    const existingTransactions = await database.transaction.findMany();
    return existingTransactions;
  } catch {
    return null;
  }
};
