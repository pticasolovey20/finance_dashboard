import {
  FieldValues,
  useFormContext,
  ControllerRenderProps,
} from "react-hook-form";
import { cn } from "@/lib/utils";

import {
  FormItem,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import FloatingLabelWrapper from "@/components/forms/FloatingLabelWrapper";

interface IFloatingLabelTextareaFieldProps<TFieldValues extends FieldValues> {
  field: ControllerRenderProps<TFieldValues>;
  onBlur?: () => void;
  id: string;
  label: string;
  helperText?: string;
  disabled?: boolean;
  classNames?: string;
}

const FloatingLabelTextareaField = <TFieldValues extends FieldValues>({
  field,
  onBlur,
  id,
  label,
  helperText,
  disabled,
  classNames,
}: IFloatingLabelTextareaFieldProps<TFieldValues>) => {
  const { formState } = useFormContext<TFieldValues>();
  const hasValue = !!field.value;
  const hasError = !!formState.errors[field.name];

  const handleBlur = () => {
    field.onBlur();
    if (onBlur) onBlur();
  };

  return (
    <FormItem>
      <FormControl>
        <FloatingLabelWrapper
          id={id}
          label={label}
          hasValue={hasValue}
          hasError={hasError}
        >
          <Textarea
            id={id}
            {...field}
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

export default FloatingLabelTextareaField;
