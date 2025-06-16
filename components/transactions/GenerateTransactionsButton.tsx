import { useTransition } from "react";
import { seedTransactions } from "@/lib/generateTransaction";

import { Button } from "@/components/ui/button";

const GenerateTransactionsButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      seedTransactions(100)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    });
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isPending}
      variant="destructive"
      className="w-fit h-10"
    >
      GENERATE T
    </Button>
  );
};

export default GenerateTransactionsButton;
