import { HTMLInputTypeAttribute } from "react";

import { Button } from "@/components/ui/button";
import { PiEye, PiEyeClosed } from "react-icons/pi";

interface ITogglePasswordButtonProps {
  disabled?: boolean;
  inputType: HTMLInputTypeAttribute;
  togglePasswordVisibility: () => void;
}

const TogglePasswordButton = ({
  disabled,
  inputType,
  togglePasswordVisibility,
}: ITogglePasswordButtonProps) => {
  return (
    <Button
      size="icon"
      type="button"
      variant="ghost"
      onClick={togglePasswordVisibility}
      disabled={disabled}
      className="absolute top-1/2 right-0.5 transform -translate-y-1/2 text-muted-foreground peer-focus:text-primary hover:bg-transparent"
      tabIndex={-1}
      aria-label="toggle password button"
    >
      {inputType === "password" ? <PiEye /> : <PiEyeClosed />}
    </Button>
  );
};

export default TogglePasswordButton;
