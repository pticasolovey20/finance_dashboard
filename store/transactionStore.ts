import { create } from "zustand";
import { ITransactionData } from "@/types/transactions";
import { getAllTransactions, getTransactionById } from "@/lib/transactions";

type TransactionsState = {
  isLoading: boolean;
  transactions: ITransactionData[];
  error: string | null;

  // ASYNC ACTIONS
  fetchTransactions: () => Promise<void>;
  fetchTransactionById: (id: string) => Promise<ITransactionData | null>;

  // SYNC ACTIONS

  addTransaction: (transaction: ITransactionData) => void;
  editTransaction: (transaction: ITransactionData) => void;
  deleteTransaction: (id: string) => void;
};

export const useTransactionsStore = create<TransactionsState>()((set) => ({
  isLoading: false,
  transactions: [],
  error: null,

  fetchTransactions: async () => {
    set({ isLoading: true, error: null });
    try {
      const transactions = await getAllTransactions();

      return transactions
        ? set({ transactions, isLoading: false })
        : set({ isLoading: false });
    } catch (error: unknown) {
      let message = "Something went wrong";
      if (error instanceof Error) message = error.message;

      set({ error: message, isLoading: false });
    }
  },

  fetchTransactionById: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      const transaction = await getTransactionById(id);
      set({ isLoading: false });

      return transaction ?? null;
    } catch (error: unknown) {
      let message = "Something went wrong";
      if (error instanceof Error) message = error.message;

      set({ error: message, isLoading: false });

      return null;
    }
  },

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [...state.transactions, transaction],
    })),

  editTransaction: (updated) =>
    set((state) => ({
      transactions: state.transactions.map((transaction) =>
        transaction.id === updated.id ? updated : transaction
      ),
    })),

  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter(
        (transaction) => transaction.id !== id
      ),
    })),
}));
