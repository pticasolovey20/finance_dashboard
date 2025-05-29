"use server";

import { database } from "@/lib/database";
import { ITransactionData } from "@/types/transactions";

export const addTransactionToDB = async (transaction: ITransactionData) => {
  try {
    const createdTransaction = await database.transaction.create({
      data: {
        id: transaction.id,
        type: transaction.type,
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
