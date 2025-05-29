import { Dispatch, SetStateAction } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ITransactionsTableModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  description?: string;
}

const TransactionsTableModal = ({
  isOpen,
  setIsOpen,
  title,
  description,
}: ITransactionsTableModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div></div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionsTableModal;
