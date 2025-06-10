import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTransactionModalStore } from "@/store/useTransactionModalStore";

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
  const { isOpen, closeModal, mode } = useTransactionModalStore();

  if (!isOpen) return null;

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={closeModal}>
        <DrawerContent className="max-h-[calc(100dvh-100px)]">
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
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent
        className={cn(
          "min-w-[600px] max-h-[calc(100dvh-100px)]",
          "flex flex-col"
        )}
      >
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create" : "Edit"} your transaction
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1">
          <TransactionForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionsTableModal;
