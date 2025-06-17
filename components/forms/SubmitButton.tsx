import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface ISubmitButtonProps {
  label: string;
  isLoading?: boolean;
  classNames?: string;
}

const SubmitButton = ({
  label,
  isLoading = false,
  classNames,
}: ISubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={cn(
        "w-full h-10 font-semibold bg-accent-foreground",
        classNames
      )}
    >
      {label}
    </Button>
  );
};

export default SubmitButton;
