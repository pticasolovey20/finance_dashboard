import { Button } from "@/components/ui/button";

interface ISubmitButtonProps {
  label: string;
  isLoading: boolean;
}

const SubmitButton = ({ label, isLoading }: ISubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className="w-full h-10 flex gap-2 bg-accent-foreground"
    >
      {label}
    </Button>
  );
};

export default SubmitButton;
