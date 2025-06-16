import {
  OnChangeFn,
  SortingState,
  VisibilityState,
  ColumnSizingState,
} from "@tanstack/react-table";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  DEFAULT_COLUMNS_SIZING,
  DEFAULT_COLUMNS_VISIBILITY,
} from "@/constants/transactionTableFilter";
import { ITransactionData, ModalMode } from "@/types/transactionTypes";

interface TransactionTableState {
  mode: ModalMode;
  transactionData: ITransactionData | null;

  isTransactionModalOpen: boolean;
  isTransactionFilterOpen: boolean;

  columnSizing: ColumnSizingState;
  setColumnSizing: OnChangeFn<ColumnSizingState>;
  resetColumnSizing: () => void;

  columnVisibility: VisibilityState;
  setColumnVisibility: OnChangeFn<VisibilityState>;
  resetColumnVisibility: () => void;

  columnSorting: SortingState;
  setColumnSorting: OnChangeFn<SortingState>;

  openTransactionModal: (mode: ModalMode, data?: ITransactionData) => void;
  closeTransactionModal: () => void;
  resetTransactionModal: () => void;

  openTransactionFilter: () => void;
  closeTransactionFilter: () => void;
}

export const useTransactionTableStore = create<TransactionTableState>()(
  persist(
    (set) => ({
      mode: "create",
      transactionData: null,

      columnSizing: DEFAULT_COLUMNS_SIZING,
      columnVisibility: DEFAULT_COLUMNS_VISIBILITY,
      columnSorting: [],

      isTransactionModalOpen: false,
      isTransactionFilterOpen: false,

      // COLUMNS ACTIONS

      setColumnSizing: (updater) =>
        set((state) => ({
          columnSizing:
            typeof updater === "function"
              ? updater(state.columnSizing)
              : updater,
        })),

      resetColumnSizing: () => set({ columnSizing: {} }),

      setColumnVisibility: (updater) =>
        set((state) => ({
          columnVisibility:
            typeof updater === "function"
              ? updater(state.columnVisibility)
              : updater,
        })),

      resetColumnVisibility: () =>
        set({ columnVisibility: DEFAULT_COLUMNS_VISIBILITY }),

      setColumnSorting: (updater) =>
        set((state) => ({
          columnSorting:
            typeof updater === "function"
              ? updater(state.columnSorting)
              : updater,
        })),

      // MODALS ACTIONS

      openTransactionModal: (mode, data) =>
        set({
          isTransactionModalOpen: true,
          mode,
          transactionData: data ?? null,
        }),

      closeTransactionModal: () => set({ isTransactionModalOpen: false }),

      resetTransactionModal: () =>
        set({
          isTransactionModalOpen: false,
          mode: "create",
          transactionData: null,
        }),

      openTransactionFilter: () => set({ isTransactionFilterOpen: true }),
      closeTransactionFilter: () => set({ isTransactionFilterOpen: false }),
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
