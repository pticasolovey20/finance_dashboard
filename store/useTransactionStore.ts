import { create } from "zustand";

import {
  getAllTransactions,
  getTransactionById,
  getCreateTransaction,
  getUpdateTransactionById,
  getDeleteTransactionById,
} from "@/actions/transaction";

import { DateRangeData } from "@/types/dateRangeTypes";
import { ITransactionData, TransactionsFormFields } from "@/types/transactionFormTypes";

type TransactionsState = {
  isFetching: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;

  currentDateRange: DateRangeData;

  transactions: ITransactionData[];
  filteredTransactions: ITransactionData[];

  // SYNC ACTIONS
  addTransaction: (data: ITransactionData) => void;
  setDateRange: (dateRange: DateRangeData | null) => void;
  clearDateRange: () => void;

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

  currentDateRange: null,

  transactions: [],
  filteredTransactions: [],

  addTransaction: (transaction) => {
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    }));
  },

  setDateRange: (dateRange: DateRangeData | null) => {
    set((state) => {
      if (!dateRange || !dateRange.from) {
        return {
          currentDateRange: null,
          filteredTransactions: state.transactions,
        };
      }

      const from = new Date(dateRange.from);
      const to = dateRange.to ? new Date(dateRange.to) : new Date(dateRange.from);

      from.setHours(0, 0, 0, 0);
      to.setHours(23, 59, 59, 999);

      const filtered = state.transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);

        return transactionDate >= from && transactionDate <= to;
      });

      return {
        currentDateRange: { from, to },
        filteredTransactions: filtered,
      };
    });
  },

  clearDateRange: () => {
    set((state) => ({
      currentDateRange: null,
      filteredTransactions: state.transactions,
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
      const updatedTransaction = await getUpdateTransactionById(transactionId, transactionData);

      set((state) => {
        const updatedTransactions = state.transactions.map((t) => (t.id === transactionId ? updatedTransaction : t));
        let updatedFiltered = state.filteredTransactions;

        if (state.currentDateRange) {
          updatedFiltered = state.filteredTransactions.map((t) => (t.id === transactionId ? updatedTransaction : t));
        } else {
          updatedFiltered = updatedTransactions;
        }

        return {
          transactions: updatedTransactions,
          filteredTransactions: updatedFiltered,
          isUpdating: false,
        };
      });
    } catch (error: unknown) {
      set({ isUpdating: false });
      console.error("Store: Error updating transaction:", error);
      throw error;
    }
  },

  deleteTransaction: async (id) => {
    set({ isDeleting: true });

    try {
      await getDeleteTransactionById(id);

      set((state) => ({
        transactions: state.transactions.filter((transaction) => transaction.id !== id),
        filteredTransactions: state.filteredTransactions.filter((transaction) => transaction.id !== id),
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

      set((state) => ({
        transactions,
        filteredTransactions: state.currentDateRange ? state.filteredTransactions : transactions,
        isFetching: false,
      }));
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
