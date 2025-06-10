import { create } from "zustand";

import {
  getAllTransactions,
  getTransactionById,
  getCreateTransaction,
} from "@/actions/transaction";

import {
  ITransactionData,
  TransactionsFormFields,
} from "@/types/transactionTypes";

type TransactionsState = {
  isLoading: boolean;
  transactions: ITransactionData[];
  error: string | null;

  // ASYNC ACTIONS
  createTransaction: (data: TransactionsFormFields) => Promise<void>;
  fetchTransactions: () => Promise<void>;
  fetchTransactionById: (id: string) => Promise<ITransactionData | null>;
};

export const useTransactionStore = create<TransactionsState>()((set) => ({
  isLoading: false,
  transactions: [],
  error: null,

  createTransaction: async (transactionData) => {
    set({ isLoading: true, error: null });

    try {
      const createdTransaction = await getCreateTransaction(transactionData);

      if (createdTransaction) {
        set((state) => ({
          transactions: [...state.transactions, createdTransaction],
          isLoading: false,
        }));
      } else {
        set({ isLoading: false });
      }
    } catch (error: unknown) {
      let message = "Something went wrong";
      if (error instanceof Error) message = error.message;

      set({
        error: message,
        isLoading: false,
      });
    }
  },

  fetchTransactions: async () => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const transactions = await getAllTransactions();

      return transactions
        ? set({
            transactions,
            isLoading: false,
          })
        : set({ isLoading: false });
    } catch (error: unknown) {
      let message = "Something went wrong";
      if (error instanceof Error) message = error.message;

      set({
        error: message,
        isLoading: false,
      });
    }
  },

  fetchTransactionById: async (id: string) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const transaction = await getTransactionById(id);
      set({ isLoading: false });

      return transaction ?? null;
    } catch (error: unknown) {
      let message = "Something went wrong";
      if (error instanceof Error) message = error.message;

      set({
        error: message,
        isLoading: false,
      });

      return null;
    }
  },
}));
