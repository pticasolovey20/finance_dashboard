import { ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface FloatingLabelWrapperProps {
  id: string;
  label: string;
  hasValue: boolean;
  hasError: boolean;
  children: ReactNode;
}

const FloatingLabelWrapper = forwardRef<
  HTMLDivElement,
  FloatingLabelWrapperProps
>(({ id, label, hasValue, hasError, children }, ref) => (
  <div ref={ref} className="relative">
    {children}

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
));

FloatingLabelWrapper.displayName = "FloatingLabelWrapper";

export default FloatingLabelWrapper;
