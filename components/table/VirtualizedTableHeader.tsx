import { cn } from "@/lib/utils";
import { useRef, useEffect, MouseEvent, TouchEvent } from "react";
import { Virtualizer } from "@tanstack/react-virtual";
import { Table, flexRender } from "@tanstack/react-table";

import { TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { Scaling } from "lucide-react";

type HandlerEvent = MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>;

interface IVirtualizedTableHeaderProps<TableData> {
  table: Table<TableData>;
  columnVirtualizer: Virtualizer<HTMLDivElement, HTMLTableCellElement>;
}

const VirtualizedTableHeader = <TableData,>({
  table,
  columnVirtualizer,
}: IVirtualizedTableHeaderProps<TableData>) => {
  const virtualColumns = columnVirtualizer.getVirtualItems();
  const isResizing = useRef(false);

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

  const handleMouseDown = (
    event: HandlerEvent,
    handler: (event: HandlerEvent) => void
  ) => {
    isResizing.current = true;
    handler(event);
  };

  const handleTouchStart = (
    event: HandlerEvent,
    handler: (event: HandlerEvent) => void
  ) => {
    isResizing.current = true;
    handler(event);
  };

  const handleDoubleClick = (
    event: HandlerEvent,
    handler: (event: HandlerEvent) => void
  ) => {
    event.stopPropagation();
    handler(event);
  };

  return (
    <TableHeader className="z-30 bg-background">
      {table.getHeaderGroups().map((headerGroup, rowIndex) => (
        <TableRow
          key={`headerRow-${headerGroup.id}-${rowIndex}`}
          className="flex w-full bg-background"
        >
          {virtualColumns.map((virtualHeaderCell, cellIndex) => {
            const headerCell = headerGroup.headers[virtualHeaderCell.index];

            return (
              <TableHead
                scope="col"
                colSpan={headerCell.colSpan}
                key={`headerCell-${headerCell.id}-${cellIndex}`}
                className="flex items-center select-none border-r border-muted"
                onClick={() => {
                  if (!isResizing.current && headerCell.column.getCanSort()) {
                    headerCell.column.toggleSorting?.();
                  }
                }}
                style={{
                  width:
                    headerCell.getSize() !== 0
                      ? headerCell.getSize()
                      : undefined,
                }}
              >
                <div className="relative w-full">
                  {headerCell.isPlaceholder
                    ? null
                    : flexRender(
                        headerCell.column.columnDef.header,
                        headerCell.getContext()
                      )}

                  {/* RESIZER */}
                  {headerCell.column.getCanResize() && (
                    <div
                      onMouseDown={(event) => {
                        handleMouseDown(event, headerCell.getResizeHandler());
                      }}
                      onTouchStart={(event) => {
                        handleTouchStart(event, headerCell.getResizeHandler());
                      }}
                      onDoubleClick={(event) =>
                        handleDoubleClick(event, () => {
                          headerCell.column.resetSize();
                        })
                      }
                      className={cn(
                        "cursor-col-resize select-none",
                        "w-5 h-5 absolute inset-y-0 right-0"
                      )}
                    >
                      <Scaling size={20} />
                    </div>
                  )}
                </div>
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export default VirtualizedTableHeader;
