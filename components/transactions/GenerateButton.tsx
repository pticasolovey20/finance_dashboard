import { useTransition } from "react";
import { seedTransactions } from "@/lib/generateFakeTransaction";

import { Button } from "@/components/ui/button";

const GenerateButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      seedTransactions(200)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    });
  };

  return (
    <Button onClick={handleClick} disabled={isPending} className="w-fit mb-4">
      GENERATE
    </Button>
  );
};

export default GenerateButton;
