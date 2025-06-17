import {
  FieldValues,
  useFormContext,
  ControllerRenderProps,
} from "react-hook-form";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { IOptionsData } from "@/types/selectOptionsTypes";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import {
  FormItem,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import FloatingLabelWrapper from "@/components/forms/FloatingLabelWrapper";

interface FloatingLabelSelectFieldProps<TFieldValues extends FieldValues> {
  onBlur?: () => void;
  field: ControllerRenderProps<TFieldValues>;
  options: IOptionsData[];
  id: string;
  label: string;
  helperText?: string;
  disabled?: boolean;
  classNames?: string;
}

const FloatingLabelSelectField = <TFieldValues extends FieldValues>({
  onBlur,
  field,
  options,
  id,
  label,
  helperText,
  disabled,
  classNames,
}: FloatingLabelSelectFieldProps<TFieldValues>) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { formState } = useFormContext<TFieldValues>();
  const hasValue = !!field.value;
  const hasError = !!formState.errors[field.name];

  const handleBlur = () => {
    field.onBlur();
    if (onBlur) onBlur();
  };

  return (
    <FormItem className={cn("w-full", classNames)}>
      <FormControl>
        <FloatingLabelWrapper
          id={id}
          label={label}
          hasValue={hasValue}
          hasError={hasError}
          isFocused={isFocused}
        >
          <Select
            disabled={disabled}
            value={field.value ?? ""}
            onValueChange={field.onChange}
            onOpenChange={(open) => setIsFocused(open)}
          >
            <SelectTrigger
              tabIndex={-1}
              onBlur={handleBlur}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  event.currentTarget.blur();
                }
              }}
              className={cn(
                "h-10 peer text-base shadow-sm",
                isFocused ? "ring-1 ring-ring" : "!ring-0",
                hasError &&
                  "text-red-500 border-red-500 focus-visible:ring-red-500"
              )}
            >
              <SelectValue placeholder=" " />
            </SelectTrigger>

            <SelectContent>
              {options.map(({ value, label, disabled }) => (
                <SelectItem key={value} value={value} disabled={disabled}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FloatingLabelWrapper>
      </FormControl>

      <FormMessage className="ml-2 !mt-1" />

      {helperText && !hasError && (
        <FormDescription className="ml-2 !mt-1">{helperText}</FormDescription>
      )}
    </FormItem>
  );
};

export default FloatingLabelSelectField;
