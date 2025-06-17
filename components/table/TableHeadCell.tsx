import { cn } from "@/lib/utils";
import { Header, flexRender } from "@tanstack/react-table";
import { useRef, useEffect, MouseEvent, TouchEvent } from "react";

import { TableHead } from "@/components/ui/table";

type EventHandlerType = MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>;

interface ITableHeadCellProps<TableData> {
  header: Header<TableData, unknown>;
}

const TableHeadCell = <TableData,>({
  header,
}: ITableHeadCellProps<TableData>) => {
  const isResizing = useRef(false);

  const isCanSort = header.column.getCanSort();
  const isCanResize = header.column.getCanResize();

  const toggleSortingHandler = () => header.column.getToggleSortingHandler();

  useEffect(() => {
    const handleMouseUp = () => {
      requestAnimationFrame(() => {
        isResizing.current = false;
      });
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  const handleResizeStart = (
    event: EventHandlerType,
    handler: (event: EventHandlerType) => void
  ) => {
    isResizing.current = true;
    handler(event);
  };

  const handleResizeReset = (event: EventHandlerType) => {
    event.stopPropagation();
    header.column.resetSize();
  };

  return (
    <TableHead
      className="flex items-center border-r border-muted"
      style={{ width: header.getSize() }}
      onClick={() => {
        if (!isResizing.current && isCanSort) {
          header.column.toggleSorting?.();
        }
      }}
    >
      <div
        onClick={toggleSortingHandler}
        className={cn(
          "relative w-full text-base",
          isCanSort ? "cursor-pointer select-none" : ""
        )}
      >
        {flexRender(header.column.columnDef.header, header.getContext())}

        {isCanResize && (
          <div
            role="button"
            title="Reesize column width"
            onMouseDown={(event) =>
              handleResizeStart(event, header.getResizeHandler())
            }
            onTouchStart={(event) =>
              handleResizeStart(event, header.getResizeHandler())
            }
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
