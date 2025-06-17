"use server";

import { database } from "@/lib/database";
import { TransactionType, TransactionStatus } from "@prisma/client";
import { TransactionsFormFields } from "@/types/transactionTypes";

export const getCreateTransaction = async (
  transaction: TransactionsFormFields
) => {
  try {
    const createdTransaction = await database.transaction.create({
      data: {
        type: transaction.type as TransactionType,
        status: transaction.status as TransactionStatus,
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

export const getUpdateTransactionById = async (
  id: string,
  transaction: TransactionsFormFields
) => {
  try {
    const updatedTransaction = await database.transaction.update({
      where: { id },

      data: {
        type: transaction.type as TransactionType,
        amount: transaction.amount,
        date: transaction.date,
        note: transaction.note,
        categoryId: transaction.categoryId,
      },
    });

    return updatedTransaction;
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
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllTransactions = async () => {
  try {
    const existingTransactions = await database.transaction.findMany();
    return existingTransactions;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDeleteTransactionById = async (id: string) => {
  try {
    const deletedTransaction = await database.transaction.delete({
      where: {
        id,
      },
    });

    return deletedTransaction;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
