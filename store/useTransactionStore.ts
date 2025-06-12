import { create } from "zustand";

import {
  getAllTransactions,
  getTransactionById,
  getCreateTransaction,
  getDeleteTransactionById,
} from "@/actions/transaction";

import {
  ITransactionData,
  TransactionsFormFields,
} from "@/types/transactionTypes";

type TransactionsState = {
  isLoading: boolean;
  transactions: ITransactionData[];

  // ASYNC ACTIONS
  createTransaction: (data: TransactionsFormFields) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;

  fetchTransactions: () => Promise<void>;
  fetchTransactionById: (id: string) => Promise<ITransactionData | null>;
};

export const useTransactionStore = create<TransactionsState>()((set) => ({
  isLoading: false,
  transactions: [],

  createTransaction: async (transactionData) => {
    set({ isLoading: true });

    try {
      const createdTransaction = await getCreateTransaction(transactionData);

      set((state) => ({
        transactions: [...state.transactions, createdTransaction],
        isLoading: false,
      }));
    } catch (error: unknown) {
      set({ isLoading: false });
      console.error("Store: Error creating transaction:", error);
      throw error;
    }
  },

  deleteTransaction: async (id) => {
    set({ isLoading: true });

    try {
      await getDeleteTransactionById(id);

      set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id),
        isLoading: false,
      }));
    } catch (error: unknown) {
      set({ isLoading: false });
      console.error("Store: Error deleting transaction:", error);
      throw error;
    }
  },

  fetchTransactions: async () => {
    set({ isLoading: true });

    try {
      const transactions = await getAllTransactions();

      set({ transactions, isLoading: false });
    } catch (error: unknown) {
      set({ isLoading: false });
      console.error("Store: Error fetching transactions:", error);
      throw error;
    }
  },

  fetchTransactionById: async (id: string) => {
    set({ isLoading: true });

    try {
      const transaction = await getTransactionById(id);

      set({ isLoading: false });
      return transaction;
    } catch (error: unknown) {
      set({ isLoading: false });
      console.error(`Store: Error fetching transaction by id ${id}:`, error);
      throw error;
    }
  },
}));
