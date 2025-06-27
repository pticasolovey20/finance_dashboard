import { Dispatch, SetStateAction } from "react";
import { ITransactionData, ModalMode } from "@/types/transactionTypes";

import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// import GerateCategoriesButton from "@/components/categories/GerateCategoriesButton";
// import GenerateTransactionsButton from "@/components/transactions/GenerateTransactionsButton";

interface TransactionsTableTopbarProps {
  globalFilter: string;
  setGlobalFilter: Dispatch<SetStateAction<string>>;
  handleOpenModal: (mode: ModalMode, data?: ITransactionData) => void;
  handleOpenFilter: () => void;
}

const TransactionsTableTopbar = ({
  globalFilter,
  setGlobalFilter,
  handleOpenModal,
  handleOpenFilter,
}: TransactionsTableTopbarProps) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <Button
        size="icon"
        variant="outline"
        className="h-10 w-10 aspect-square"
        onClick={() => handleOpenModal("create")}
        aria-label="Create transaction button"
      >
        <Plus className="!h-5 !w-5" />
      </Button>

      {/* <GerateCategoriesButton /> */}
      {/* <GenerateTransactionsButton /> */}

      <Input
        placeholder="Search..."
        value={globalFilter ?? ""}
        className="h-10 placeholder:text-base"
        onChange={(event) => setGlobalFilter(event.target.value)}
      />

      <Button
        variant="outline"
        onClick={handleOpenFilter}
        className="h-10 max-w-[100px] xs:max-w-[150px] w-full md:text-base"
      >
        Filters
      </Button>
    </div>
  );
};

export default TransactionsTableTopbar;
