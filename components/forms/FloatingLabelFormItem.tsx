import { cn } from "@/lib/utils";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  FormItem,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

interface IFloatingLabelFormItemProps<TFieldValues extends FieldValues> {
  field: ControllerRenderProps<TFieldValues>;
  id: string;
  type?: string;
  label: string;
  helperText?: string;
}

const FloatingLabelFormItem = <TFieldValues extends FieldValues>({
  field,
  id,
  type = "text",
  label,
  helperText,
}: IFloatingLabelFormItemProps<TFieldValues>) => {
  const { formState } = useFormContext<TFieldValues>();

  const hasValue = !!field.value;
  const hasError = !!formState.errors[field.name];

  return (
    <FormItem>
      <FormControl>
        <div className="relative">
          <Input
            id={id}
            {...field}
            type={type}
            placeholder=" "
            className={cn(
              "peer h-10",
              hasError && "border-red-500 focus-visible:ring-red-500"
            )}
          />

          <label
            htmlFor={id}
            className={cn(
              "px-1 rounded-sm peer-focus:bg-[#f7f7f7]",
              "text-sm text-muted-foreground peer-focus:text-sm",
              "absolute left-3 peer-focus:top-[-10px] peer-focus:left-2",
              "transition-all duration-200 ease-in-out pointer-events-none",

              "peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400",
              hasValue && "top-[-10px] left-2 text-sm bg-[#f7f7f7]",
              hasError
                ? "text-red-500 peer-focus:text-red-500 peer-placeholder-shown:text-red-500"
                : "text-muted-foreground peer-focus:text-primary peer-placeholder-shown:text-gray-400"
            )}
          >
            {label}
          </label>
        </div>
      </FormControl>

      <FormMessage className="ml-2 !mt-1" />

      {helperText && !hasError && (
        <FormDescription className="ml-2 !mt-1">{helperText}</FormDescription>
      )}
    </FormItem>
  );
};

export default FloatingLabelFormItem;
