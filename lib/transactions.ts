"use server";

import { database } from "@/lib/database";

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
