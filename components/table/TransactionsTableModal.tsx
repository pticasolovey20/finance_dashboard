import { useIsMobile } from "@/hooks/use-mobile";

import { useTransactionTableStore } from "@/store/useTransactionTableStore";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerTitle,
  DrawerHeader,
  DrawerContent,
} from "@/components/ui/drawer";
import TransactionForm from "@/components/forms/TransactionForm";

const TransactionsTableModal = () => {
  const isMobile = useIsMobile();

  const {
    isTransactionModalOpen: isOpen,
    closeTransactionModal: closeModal,
    mode,
  } = useTransactionTableStore();

  const actionLabel = mode === "create" ? "Create" : "Edit";

  if (!isOpen) return null;

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={closeModal}>
        <DrawerContent
          className="max-h-[calc(100dvh-50px)] !h-auto"
          aria-describedby={undefined}
        >
          <DrawerHeader>
            <DrawerTitle className="text-xl lg:text-2xl text-center">
              {actionLabel} your transaction
            </DrawerTitle>
          </DrawerHeader>

          <TransactionForm />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent
        className="min-w-[600px] max-h-[calc(100dvh-50px)] flex flex-col"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle className="text-xl lg:text-2xl pl-1">
            {actionLabel} your transaction
          </DialogTitle>
        </DialogHeader>

        <TransactionForm />
      </DialogContent>
    </Dialog>
  );
};

export default TransactionsTableModal;
