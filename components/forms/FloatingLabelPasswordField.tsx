import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";

import {
  FormItem,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FloatingLabelWrapper from "@/components/forms/FloatingLabelWrapper";
import TogglePasswordButton from "@/components/forms/TogglePasswordButton";

interface FloatingLabelPasswordFieldProps<TFieldValues extends FieldValues> {
  field: ControllerRenderProps<TFieldValues>;
  onBlur?: () => void;
  id: string;
  label: string;
  helperText?: string;
  disabled?: boolean;
}

const FloatingLabelPasswordField = <TFieldValues extends FieldValues>({
  field,
  onBlur,
  id,
  label,
  helperText,
  disabled,
}: FloatingLabelPasswordFieldProps<TFieldValues>) => {
  const [isVisible, setIsVisible] = useState(false);
  const { formState } = useFormContext<TFieldValues>();

  const hasValue = !!field.value;
  const hasError = !!formState.errors[field.name];
  const inputType = isVisible ? "text" : "password";

  const handleBlur = () => {
    field.onBlur();
    if (onBlur) onBlur();
  };

  return (
    <FormItem className="w-full">
      <FormControl>
        <div className="relative">
          <FloatingLabelWrapper
            id={id}
            label={label}
            hasValue={hasValue}
            hasError={hasError}
          >
            <Input
              id={id}
              {...field}
              placeholder=" "
              type={inputType}
              disabled={disabled}
              onBlur={handleBlur}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  event.currentTarget.blur();
                }
              }}
              className={cn(
                "peer h-10 pr-10 shadow-sm",
                hasError && "border-red-500 focus-visible:ring-red-500"
              )}
            />
          </FloatingLabelWrapper>

          <TogglePasswordButton
            disabled={disabled}
            inputType={inputType}
            togglePasswordVisibility={() => setIsVisible((prev) => !prev)}
          />
        </div>
      </FormControl>

      <FormMessage className="ml-2 !mt-1" />
      {helperText && !hasError && (
        <FormDescription className="ml-2 !mt-1">{helperText}</FormDescription>
      )}
    </FormItem>
  );
};

export default FloatingLabelPasswordField;
