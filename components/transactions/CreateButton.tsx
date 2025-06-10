import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTransactionModalStore } from "@/store/useTransactionModalStore";

const CreateButton = () => {
  const { openModal } = useTransactionModalStore();

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => openModal("create")}
      className="aspect-square"
    >
      <Plus />
    </Button>
  );
};

export default CreateButton;
