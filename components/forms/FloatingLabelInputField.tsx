import { HTMLInputTypeAttribute, useState } from "react";
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

interface IFloatingLabelFormItemProps<TFieldValues extends FieldValues> {
  field: ControllerRenderProps<TFieldValues>;
  id: string;
  type?: HTMLInputTypeAttribute;
  label: string;
  helperText?: string;
}

const FloatingLabelInputField = <TFieldValues extends FieldValues>({
  field,
  id,
  type = "text",
  label,
  helperText,
}: IFloatingLabelFormItemProps<TFieldValues>) => {
  const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(type);
  const { formState } = useFormContext<TFieldValues>();

  const isPasswordField = type === "password";
  const hasValue = !!field.value;
  const hasError = !!formState.errors[field.name];

  const togglePasswordVisibility = () => {
    setInputType((prev) => {
      return prev === "password" ? "text" : "password";
    });
  };

  return (
    <FormItem>
      <FormControl>
        <FloatingLabelWrapper
          id={id}
          label={label}
          hasValue={hasValue}
          hasError={hasError}
          inputAdornment={
            isPasswordField ? (
              <TogglePasswordButton
                inputType={inputType}
                togglePasswordVisibility={togglePasswordVisibility}
              />
            ) : null
          }
        >
          <Input
            id={id}
            {...field}
            type={inputType}
            placeholder=" "
            className={cn(
              "peer h-10 shadow-sm",
              hasError && "border-red-500 focus-visible:ring-red-500"
            )}
          />
        </FloatingLabelWrapper>
      </FormControl>

      <FormMessage className="ml-2 !mt-1" />

      {helperText && !hasError && (
        <FormDescription className="ml-2 !mt-1">{helperText}</FormDescription>
      )}
    </FormItem>
  );
};

export default FloatingLabelInputField;
