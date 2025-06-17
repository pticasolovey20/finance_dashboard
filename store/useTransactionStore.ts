import { create } from "zustand";

import {
  getAllTransactions,
  getTransactionById,
  getCreateTransaction,
  getUpdateTransactionById,
  getDeleteTransactionById,
} from "@/actions/transaction";

import {
  ITransactionData,
  TransactionsFormFields,
} from "@/types/transactionTypes";

type TransactionsState = {
  isFetching: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;

  transactions: ITransactionData[];

  // SYNC ACTIONS
  addTransaction: (data: ITransactionData) => void;

  // ASYNC ACTIONS
  createTransaction: (data: TransactionsFormFields) => Promise<void>;
  editTransaction: (id: string, data: TransactionsFormFields) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;

  fetchTransactions: () => Promise<void>;
  fetchTransactionById: (id: string) => Promise<ITransactionData | null>;
};

export const useTransactionStore = create<TransactionsState>()((set, get) => ({
  isFetching: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,

  transactions: [],

  addTransaction: (transaction) => {
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    }));
  },

  createTransaction: async (transactionData) => {
    set({ isCreating: true });

    try {
      const createdTransaction = await getCreateTransaction(transactionData);

      get().addTransaction(createdTransaction);
      set({ isCreating: false });
    } catch (error: unknown) {
      set({ isCreating: false });
      console.error("Store: Error creating transaction:", error);
      throw error;
    }
  },

  editTransaction: async (transactionId, transactionData) => {
    set({ isUpdating: true });

    try {
      const updatedTransaction = await getUpdateTransactionById(
        transactionId,
        transactionData
      );

      set((state) => ({
        transactions: state.transactions.map((transaction) =>
          transaction.id === transactionId ? updatedTransaction : transaction
        ),
        isUpdating: false,
      }));
    } catch (error: unknown) {
      set({ isUpdating: false });
      console.error("Store: Error creating transaction:", error);
      throw error;
    }
  },

  deleteTransaction: async (id) => {
    set({ isDeleting: true });

    try {
      await getDeleteTransactionById(id);

      set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id),
        isDeleting: false,
      }));
    } catch (error: unknown) {
      set({ isDeleting: false });
      console.error("Store: Error deleting transaction:", error);
      throw error;
    }
  },

  fetchTransactions: async () => {
    set({ isFetching: true });

    try {
      const transactions = await getAllTransactions();

      set({ transactions, isFetching: false });
    } catch (error: unknown) {
      set({ isFetching: false });
      console.error("Store: Error fetching transactions:", error);
      throw error;
    }
  },

  fetchTransactionById: async (id: string) => {
    set({ isFetching: true });

    try {
      const transaction = await getTransactionById(id);

      set({ isFetching: false });
      return transaction;
    } catch (error: unknown) {
      set({ isFetching: false });
      console.error(`Store: Error fetching transaction by id ${id}:`, error);
      throw error;
    }
  },
}));
