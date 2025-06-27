import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface ISubmitButtonProps {
  label: string;
  disabled?: boolean;
  classNames?: string;
}

const SubmitButton = ({ label, disabled, classNames }: ISubmitButtonProps) => {
  return (
    <Button type="submit" disabled={disabled} className={cn("w-full font-semibold bg-accent-foreground", classNames)}>
      {label}
    </Button>
  );
};

export default SubmitButton;
