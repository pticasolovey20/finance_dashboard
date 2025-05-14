import { HTMLInputTypeAttribute } from "react";

import { Button } from "@/components/ui/button";
import { PiEye, PiEyeClosed } from "react-icons/pi";

interface ITogglePasswordButtonProps {
  inputType: HTMLInputTypeAttribute;
  togglePasswordVisibility: () => void;
}

const TogglePasswordButton = ({
  inputType,
  togglePasswordVisibility,
}: ITogglePasswordButtonProps) => {
  return (
    <Button
      size="icon"
      type="button"
      variant="ghost"
      onClick={togglePasswordVisibility}
      className="absolute top-1/2 right-0.5 transform -translate-y-1/2 text-muted-foreground peer-focus:text-primary hover:bg-transparent"
      tabIndex={-1}
    >
      {inputType === "password" ? <PiEye /> : <PiEyeClosed />}
    </Button>
  );
};

export default TogglePasswordButton;
