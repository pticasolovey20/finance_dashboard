import { create } from "zustand";
import { persist } from "zustand/middleware";
import { OnChangeFn, SortingState, VisibilityState, ColumnSizingState } from "@tanstack/react-table";

import {
  DEFAULT_COLUMNS_SIZING,
  DEFAULT_COLUMNS_SORTING,
  DEFAULT_COLUMNS_VISIBILITY,
} from "@/constants/transactionTable";
import { ITransactionData, ModalMode } from "@/types/transactionFormTypes";

interface TransactionTableState {
  mode: ModalMode;
  transactionData: ITransactionData | null;

  transactionModals: {
    isFormOpen: boolean;
    isColumnsOpen: boolean;
  };

  columnSizing: ColumnSizingState;
  setColumnSizing: OnChangeFn<ColumnSizingState>;
  resetColumnSizing: () => void;

  columnVisibility: VisibilityState;
  setColumnVisibility: OnChangeFn<VisibilityState>;
  resetColumnVisibility: () => void;

  columnSorting: SortingState;
  setColumnSorting: OnChangeFn<SortingState>;

  openFormModal: (mode: ModalMode, data?: ITransactionData) => void;
  closeFormModal: () => void;
  resetFormModal: () => void;

  openColumnsModal: () => void;
  closeColumnsModal: () => void;
}

export const useTransactionTableStore = create<TransactionTableState>()(
  persist(
    (set) => ({
      mode: "create",
      transactionData: null,

      columnSizing: DEFAULT_COLUMNS_SIZING,
      columnVisibility: DEFAULT_COLUMNS_VISIBILITY,
      columnSorting: DEFAULT_COLUMNS_SORTING,

      transactionModals: {
        isFormOpen: false,
        isDateRangeOpen: false,
        isColumnsOpen: false,
      },

      // COLUMNS ACTIONS

      setColumnSizing: (updater) =>
        set((state) => ({
          columnSizing: typeof updater === "function" ? updater(state.columnSizing) : updater,
        })),

      resetColumnSizing: () => set({ columnSizing: {} }),

      setColumnVisibility: (updater) =>
        set((state) => ({
          columnVisibility: typeof updater === "function" ? updater(state.columnVisibility) : updater,
        })),

      resetColumnVisibility: () => set({ columnVisibility: DEFAULT_COLUMNS_VISIBILITY }),

      setColumnSorting: (updater) =>
        set((state) => ({
          columnSorting: typeof updater === "function" ? updater(state.columnSorting) : updater,
        })),

      // MODAL ACTIONS
      // FORM MODAL

      openFormModal: (mode, data) => {
        set((state) => ({
          mode,
          transactionData: data ?? null,
          transactionModals: { ...state.transactionModals, isFormOpen: true },
        }));
      },

      closeFormModal: () => {
        set((state) => ({
          transactionModals: { ...state.transactionModals, isFormOpen: false },
        }));
      },

      resetFormModal: () => {
        set((state) => ({
          mode: "create",
          transactionData: null,
          transactionModals: { ...state.transactionModals, isFormOpen: false },
        }));
      },

      // COLUMNS MODAL

      openColumnsModal: () => {
        set((state) => ({
          transactionModals: { ...state.transactionModals, isColumnsOpen: true },
        }));
      },

      closeColumnsModal: () => {
        set((state) => ({
          transactionModals: { ...state.transactionModals, isColumnsOpen: false },
        }));
      },
    }),

    {
      name: "transaction-table-storage",
      partialize: (state) => ({
        columnSizing: state.columnSizing,
        columnVisibility: state.columnVisibility,
        columnSorting: state.columnSorting,
      }),
    }
  )
);
