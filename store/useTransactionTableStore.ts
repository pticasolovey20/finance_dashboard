import { create } from "zustand";
import { ITransactionData, ModalMode } from "@/types/transactionTypes";

interface TransactionTableState {
  isTransactionModalOpen: boolean;
  isTransactionFilterOpen: boolean;

  mode: ModalMode;
  transactionData: ITransactionData | null;

  openTransactionModal: (mode: ModalMode, data?: ITransactionData) => void;
  closeTransactionModal: () => void;
  resetTransactionModal: () => void;

  openTransactionFilter: () => void;
  closeTransactionFilter: () => void;
}

export const useTransactionTableStore = create<TransactionTableState>(
  (set) => ({
    isTransactionModalOpen: false,
    isTransactionFilterOpen: false,

    mode: "create",
    transactionData: null,

    // CREATE/EDIT MODAL ACTIONS

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

    // FILTER ACTIONS

    openTransactionFilter: () =>
      set({
        isTransactionFilterOpen: true,
      }),

    closeTransactionFilter: () => set({ isTransactionFilterOpen: false }),
  })
);
