import { Dispatch, SetStateAction } from "react";

import { ITransactionData, ModalMode } from "@/types/transactionFormTypes";

import { Columns2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DateRangeForm from "@/components/forms/DateRangeForm";

interface TransactionsTableTopbarProps {
  globalFilter: string;
  setGlobalFilter: Dispatch<SetStateAction<string>>;
  openFormModal: (mode: ModalMode, data?: ITransactionData) => void;
  openColumnsModal: () => void;
}

const TransactionsTableTopbar = ({
  globalFilter,
  setGlobalFilter,
  openFormModal,
  openColumnsModal,
}: TransactionsTableTopbarProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
      <div className="w-full sm:flex-1 flex items-center gap-4">
        <Button
          size="icon"
          variant="outline"
          className="h-10 w-10 aspect-square"
          onClick={() => openFormModal("create")}
          aria-label="Create transaction button"
        >
          <Plus className="!h-5 !w-5" />
        </Button>

        <Input
          placeholder="Search..."
          value={globalFilter ?? ""}
          className="h-10 placeholder:text-base"
          onChange={(event) => setGlobalFilter(event.target.value)}
        />
      </div>

      <div className="w-full sm:w-auto flex items-center gap-4">
        <DateRangeForm onSubmit={(data) => console.log(data)} />

        <Button
          variant="outline"
          onClick={openColumnsModal}
          className="h-10 sm:max-w-[200px] w-full flex items-center gap-3"
        >
          <span className="md:text-base">Columns</span>
          <Columns2 />
        </Button>
      </div>
    </div>
  );
};

export default TransactionsTableTopbar;
