import { create } from "zustand";
import { ITransactionData, ModalMode } from "@/types/transactionTypes";

interface TransactionModalState {
  isOpen: boolean;
  mode: ModalMode;
  transactionData: ITransactionData | null;

  openModal: (mode: ModalMode, data?: ITransactionData) => void;
  closeModal: () => void;
  reset: () => void;
}

export const useTransactionModalStore = create<TransactionModalState>(
  (set) => ({
    isOpen: false,
    mode: "create",
    transactionData: null,

    openModal: (mode, data) =>
      set({
        isOpen: true,
        mode,
        transactionData: data ?? null,
      }),

    closeModal: () => set({ isOpen: false }),

    reset: () =>
      set({
        isOpen: false,
        mode: "create",
        transactionData: null,
      }),
  })
);
