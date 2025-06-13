import {
  OnChangeFn,
  VisibilityState,
  ColumnSizingState,
} from "@tanstack/react-table";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Dispatch, SetStateAction } from "react";
import { ITransactionData, ModalMode } from "@/types/transactionTypes";
import { DEFAULT_COLUMNS_VISIBILITY } from "@/constants/transactionTableFilter";

interface TransactionTableState {
  mode: ModalMode;
  transactionData: ITransactionData | null;

  isTransactionModalOpen: boolean;
  isTransactionFilterOpen: boolean;

  columnSizing: ColumnSizingState;
  columnVisibility: VisibilityState;

  setColumnSizing: OnChangeFn<ColumnSizingState>;
  setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>;
  resetColumnSizing: () => void;
  resetColumnVisibility: () => void;

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

      columnSizing: {},
      columnVisibility: DEFAULT_COLUMNS_VISIBILITY,

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

      setColumnVisibility: (updater) =>
        set((state) => ({
          columnVisibility:
            typeof updater === "function"
              ? updater(state.columnVisibility)
              : updater,
        })),

      resetColumnSizing: () => set({ columnSizing: {} }),

      resetColumnVisibility: () =>
        set({ columnVisibility: DEFAULT_COLUMNS_VISIBILITY }),

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
      }),
    }
  )
);
