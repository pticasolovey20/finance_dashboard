import { cn } from "@/lib/utils";
import { Virtualizer } from "@tanstack/react-virtual";
import { Table, flexRender } from "@tanstack/react-table";

import { TableHeader, TableHead, TableRow } from "@/components/ui/table";

interface IVirtualizedTableHeaderProps<TableData> {
  table: Table<TableData>;
  columnVirtualizer: Virtualizer<HTMLDivElement, HTMLTableCellElement>;
}

const VirtualizedTableHeader = <TableData,>({
  table,
  columnVirtualizer,
}: IVirtualizedTableHeaderProps<TableData>) => {
  const virtualColumns = columnVirtualizer.getVirtualItems();

  return (
    <TableHeader className="sticky top-0 grid z-30 bg-background">
      {table.getHeaderGroups().map((headerGroup, rowIndex) => (
        <TableRow
          key={`headerRow-${headerGroup.id}-${rowIndex}`}
          className="flex w-full bg-background"
        >
          {virtualColumns.map((virtualHeaderCell, cellIndex) => {
            const headerCell = headerGroup.headers[virtualHeaderCell.index];

            return (
              <TableHead
                key={`headerCell-${headerCell.id}-${cellIndex}`}
                className="relative flex items-center select-none border-r border-muted"
                onClick={headerCell.column.getToggleSortingHandler()}
                style={{
                  width:
                    headerCell.getSize() !== 0
                      ? headerCell.getSize()
                      : undefined,
                }}
              >
                {headerCell.isPlaceholder
                  ? null
                  : flexRender(
                      headerCell.column.columnDef.header,
                      headerCell.getContext()
                    )}

                {/* RESIZER */}
                {headerCell.column.getCanResize() && (
                  <div
                    onMouseDown={headerCell.getResizeHandler()}
                    onTouchStart={headerCell.getResizeHandler()}
                    onDoubleClick={() => headerCell.column.resetSize()}
                    className={cn(
                      "cursor-col-resize select-none",
                      "h-full w-1 bg-muted-foreground",
                      "opacity-30 hover:opacity-70 transition",
                      "absolute inset-y-0 right-0"
                    )}
                  />
                )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export default VirtualizedTableHeader;
