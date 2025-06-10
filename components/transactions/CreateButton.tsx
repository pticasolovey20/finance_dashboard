import { useTransactionModalStore } from "@/store/useTransactionModalStore";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const CreateButton = () => {
  const { openModal } = useTransactionModalStore();

  return (
    <Button
      size="icon"
      variant="outline"
      className="aspect-square"
      onClick={() => openModal("create")}
      aria-label="Create transaction button"
    >
      <Plus />
    </Button>
  );
};

export default CreateButton;
