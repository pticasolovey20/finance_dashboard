import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTransactionTableStore } from "@/store/useTransactionTableStore";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import TransactionForm from "@/components/forms/TransactionForm";

const TransactionsTableModal = () => {
  const isMobile = useIsMobile();
  const { isTransactionModalOpen, closeTransactionModal, mode } =
    useTransactionTableStore();

  if (!isTransactionModalOpen) return null;

  if (isMobile) {
    return (
      <Drawer
        open={isTransactionModalOpen}
        onOpenChange={closeTransactionModal}
      >
        <DrawerContent className="max-h-[calc(100dvh-50px)] !h-auto">
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-center">
              {mode === "create" ? "Create" : "Edit"} your transaction
            </DrawerTitle>
          </DrawerHeader>

          <TransactionForm />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isTransactionModalOpen} onOpenChange={closeTransactionModal}>
      <DialogContent
        className={cn("min-w-[600px] max-h-[calc(100dvh-50px)] flex flex-col")}
      >
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create" : "Edit"} your transaction
          </DialogTitle>
        </DialogHeader>

        <TransactionForm />
      </DialogContent>
    </Dialog>
  );
};

export default TransactionsTableModal;
