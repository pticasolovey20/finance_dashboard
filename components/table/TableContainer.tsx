import { cn } from "@/lib/utils";
import { ReactNode, forwardRef, useState, useRef, useEffect } from "react";

interface TableContainerProps {
  classNames?: string;
  children: ReactNode;
}

const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(({ classNames, children }, ref) => {
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const internalRef = useRef<HTMLDivElement>(null);

  const tableContainerRef = ref || internalRef;

  useEffect(() => {
    const element = (tableContainerRef as React.RefObject<HTMLDivElement>).current;
    if (!element) return;

    const updateHeight = () => setContainerHeight(element.offsetHeight);
    updateHeight();
    const resizeObserver = new ResizeObserver(() => updateHeight());

    resizeObserver.observe(element);
    window.addEventListener("resize", updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [tableContainerRef]);

  return (
    <div className="relative">
      <div
        ref={tableContainerRef}
        className={cn(
          "relative max-h-[calc(100dvh-270px)] sm:max-h-[calc(100dvh-220px)]",
          "border border-input rounded-md",
          "overflow-auto scrollable",
          classNames
        )}
      >
        {children}
      </div>

      {/* BORDER OVERLAY */}
      <div
        className="absolute inset-0 h-full border border-input rounded-md pointer-events-none z-50"
        style={{ height: containerHeight }}
      />
    </div>
  );
});

TableContainer.displayName = "TableContainer";

export default TableContainer;
