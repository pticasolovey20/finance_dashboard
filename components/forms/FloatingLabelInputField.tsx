import { HTMLInputTypeAttribute } from "react";
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

interface FloatingLabelInputFieldProps<TFieldValues extends FieldValues> {
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
}: FloatingLabelInputFieldProps<TFieldValues>) => {
  const { formState } = useFormContext<TFieldValues>();
  const hasValue = !!field.value;
  const hasError = !!formState.errors[field.name];

  return (
    <FormItem>
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
