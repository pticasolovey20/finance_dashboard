import { cn } from "@/lib/utils";
import { ReactNode, forwardRef } from "react";

interface FloatingLabelWrapperProps {
  id: string;
  label: string;
  hasValue: boolean;
  hasError: boolean;
  isFocused?: boolean;
  children: ReactNode;
}

const FloatingLabelWrapper = forwardRef<
  HTMLDivElement,
  FloatingLabelWrapperProps
>(({ id, label, hasValue, hasError, isFocused, children }, ref) => (
  <div ref={ref} className="relative">
    {children}

    <label
      htmlFor={id}
      className={cn(
        "transition-all duration-200 ease-in-out",
        "px-1 rounded-sm bg-primary-foreground pointer-events-none",
        "absolute top-2 left-3 peer-focus:top-[-10px] peer-focus:left-2",
        "text-base peer-focus:text-sm text-gray-400 peer-focus:text-primary",

        (hasValue || isFocused) && "top-[-10px] left-2 text-sm text-primary",
        hasError && "text-red-500 peer-focus:text-red-500"
      )}
    >
      {label}
    </label>
  </div>
));

FloatingLabelWrapper.displayName = "FloatingLabelWrapper";

export default FloatingLabelWrapper;
