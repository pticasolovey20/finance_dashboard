import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ITransactionData } from "@/types/transactions";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import CircleLoader from "@/components/CircleLoader";
import TransactionForm from "@/components/forms/TransactionForm";

interface ITransactionsTableModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedTransactionRow: ITransactionData | undefined;
}

const TransactionsTableModal = ({
  isOpen,
  setIsOpen,
  selectedTransactionRow,
}: ITransactionsTableModalProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="max-h-[calc(100dvh-100px)]">
          <DrawerHeader className="text-left">
            <DrawerTitle>Form</DrawerTitle>
            <DrawerDescription>Manage your transaction</DrawerDescription>
          </DrawerHeader>

          {selectedTransactionRow ? (
            <TransactionForm selectedTransactionRow={selectedTransactionRow} />
          ) : (
            <CircleLoader />
          )}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className={cn(
          "min-w-[600px] max-h-[calc(100dvh-100px)]",
          "flex flex-col"
        )}
      >
        <DialogHeader>
          <DialogTitle>Form</DialogTitle>
          <DialogDescription>Manage your transaction</DialogDescription>
        </DialogHeader>

        <div className="flex-1">
          {selectedTransactionRow ? (
            <TransactionForm selectedTransactionRow={selectedTransactionRow} />
          ) : (
            <CircleLoader />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionsTableModal;
