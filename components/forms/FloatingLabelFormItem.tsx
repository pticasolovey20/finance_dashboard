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
import { Button } from "@/components/ui/button";
import { PiEye, PiEyeClosed } from "react-icons/pi";

interface IFloatingLabelFormItemProps<TFieldValues extends FieldValues> {
  field: ControllerRenderProps<TFieldValues>;
  id: string;
  type?: HTMLInputTypeAttribute;
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
        <div className="relative">
          <Input
            id={id}
            {...field}
            onBlur={() => setInputType("password")}
            type={inputType}
            placeholder=" "
            className={cn(
              "peer h-10 shadow-sm",
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

          {isPasswordField && (
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
          )}
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
