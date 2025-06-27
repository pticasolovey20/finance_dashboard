import { useTransition } from "react";

import { incomeCategories, expenseCategories } from "@/constants/transactionCategory";
import { seedCategories } from "@/lib/generateCategories";

import { Button } from "@/components/ui/button";

const GerateCategoriesButton = () => {
  const [isPending, startTransition] = useTransition();

  const categories = expenseCategories.concat(incomeCategories);

  const handleClick = () => {
    startTransition(() => {
      seedCategories(categories)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    });
  };

  return (
    <Button onClick={handleClick} disabled={isPending} variant="destructive" className="w-fit h-10">
      GENERATE C
    </Button>
  );
};

export default GerateCategoriesButton;
