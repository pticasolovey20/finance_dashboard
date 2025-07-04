import {
  FieldValues,
  useFormContext,
  ControllerRenderProps,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { HTMLInputTypeAttribute } from "react";

import {
  FormItem,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FloatingLabelWrapper from "@/components/forms/FloatingLabelWrapper";

interface FloatingLabelInputFieldProps<TFieldValues extends FieldValues> {
  field: ControllerRenderProps<TFieldValues>;
  onBlur?: () => void;
  id: string;
  type?: HTMLInputTypeAttribute;
  label: string;
  helperText?: string;
  disabled?: boolean;
  classNames?: string;
}

const FloatingLabelInputField = <TFieldValues extends FieldValues>({
  field,
  onBlur,
  id,
  type = "text",
  label,
  helperText,
  disabled,
  classNames,
}: FloatingLabelInputFieldProps<TFieldValues>) => {
  const { formState } = useFormContext<TFieldValues>();
  const hasValue = !!field.value;
  const hasError = !!formState.errors[field.name];

  const handleBlur = () => {
    field.onBlur();
    if (onBlur) onBlur();
  };

  return (
    <FormItem className="w-full">
      <FormControl>
        <FloatingLabelWrapper
          id={id}
          label={label}
          hasValue={hasValue}
          hasError={hasError}
        >
          <Input
            id={id}
            {...field}
            type={type}
            tabIndex={-1}
            placeholder=" "
            disabled={disabled}
            onBlur={handleBlur}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                event.currentTarget.blur();
              }
            }}
            className={cn(
              "peer h-10 shadow-sm",
              hasError &&
                "text-red-500 border-red-500 focus-visible:ring-red-500",
              classNames
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
