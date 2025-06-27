import { MouseEvent, TouchEvent, useRef, useCallback, useEffect } from "react";

import { cn } from "@/lib/utils";
import { Header, flexRender } from "@tanstack/react-table";

import { TableHead } from "@/components/ui/table";

type EventHandlerType = MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>;

interface ITableHeadCellProps<TableData> {
  header: Header<TableData, unknown>;
  isLast: boolean;
}

const TableHeadCell = <TableData,>({ header, isLast }: ITableHeadCellProps<TableData>) => {
  const isResizingRef = useRef(false);

  const { column } = header;

  const isCanSort = column.getCanSort();
  const isResizing = column.getIsResizing();
  const isCanResize = column.getCanResize();

  useEffect(() => {
    const handleMouseUp = () => {
      requestAnimationFrame(() => {
        isResizingRef.current = false;
      });
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  const handleClick = useCallback(() => {
    if (!isResizingRef.current && isCanSort) {
      column.toggleSorting();
    }
  }, [column, isCanSort]);

  const handleResizeStart = useCallback(
    (event: EventHandlerType) => {
      isResizingRef.current = true;
      header.getResizeHandler()(event);
    },

    [header]
  );

  const handleResizeReset = useCallback(
    (event: EventHandlerType) => {
      event.stopPropagation();
      column.resetSize();
    },

    [column]
  );

  return (
    <TableHead
      className={cn(
        "flex items-center",
        isLast && (!isResizingRef.current || !isResizing) ? "" : "border-r border-input"
      )}
      style={{ width: header.getSize() }}
      onClick={handleClick}
    >
      <div className={cn("relative w-full text-base", isCanSort ? "cursor-pointer select-none" : "")}>
        {flexRender(header.column.columnDef.header, header.getContext())}

        {isCanResize && (
          <div
            role="button"
            title="Reesize column width"
            onMouseDown={handleResizeStart}
            onTouchStart={handleResizeStart}
            onDoubleClick={handleResizeReset}
            className={cn(
              "hidden md:block w-1 h-full bg-muted",
              "absolute inset-y-0 right-0",
              "cursor-col-resize select-none"
            )}
          />
        )}
      </div>
    </TableHead>
  );
};

export default TableHeadCell;
