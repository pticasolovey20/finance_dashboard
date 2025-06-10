import { useTransactionTableStore } from "@/store/useTransactionTableStore";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const CreateButton = () => {
  const { openTransactionModal } = useTransactionTableStore();

  return (
    <Button
      size="icon"
      variant="outline"
      className="aspect-square"
      onClick={() => openTransactionModal("create")}
      aria-label="Create transaction button"
    >
      <Plus />
    </Button>
  );
};

export default CreateButton;
