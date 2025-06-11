import {
  FieldValues,
  useFormContext,
  ControllerRenderProps,
} from "react-hook-form";
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
// import FloatingLabelWrapper from "@/components/forms/FloatingLabelWrapper";

interface FloatingLabelSelectFieldProps<TFieldValues extends FieldValues> {
  onBlur?: () => void;
  field: ControllerRenderProps<TFieldValues>;
  options: IOptionsData[];
  // id: string;
  // label: string;
  helperText?: string;
  disabled?: boolean;
}

const FloatingLabelSelectField = <TFieldValues extends FieldValues>({
  onBlur,
  field,
  options,
  // id,
  // label,
  helperText,
  disabled,
}: FloatingLabelSelectFieldProps<TFieldValues>) => {
  const { formState } = useFormContext<TFieldValues>();
  // const hasValue = !!field.value;
  const hasError = !!formState.errors[field.name];

  const handleBlur = () => {
    field.onBlur();
    if (onBlur) onBlur();
  };

  return (
    <FormItem className="w-full">
      <FormControl>
        <Select
          value={field.value}
          disabled={disabled}
          onValueChange={field.onChange}
        >
          <SelectTrigger
            onBlur={handleBlur}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                event.currentTarget.blur();
              }
            }}
            className={cn(
              "h-10 shadow-sm",
              "text-base text-gray-400",
              hasError && "border-red-500 focus-visible:ring-red-500"
            )}
          >
            <SelectValue placeholder="Type" />
          </SelectTrigger>

          <SelectContent>
            {options.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>

      <FormMessage className="ml-2 !mt-1" />

      {helperText && !hasError && (
        <FormDescription className="ml-2 !mt-1">{helperText}</FormDescription>
      )}
    </FormItem>
  );
};

export default FloatingLabelSelectField;
