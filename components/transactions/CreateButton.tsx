import { useTransactionTableStore } from "@/store/useTransactionTableStore";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const CreateButton = () => {
  const { openTransactionModal } = useTransactionTableStore();

  return (
    <Button
      size="icon"
      variant="outline"
      className="h-10 w-10 aspect-square"
      onClick={() => openTransactionModal("create")}
      aria-label="Create transaction button"
    >
      <Plus className="!h-5 !w-5" />
    </Button>
  );
};

export default CreateButton;
