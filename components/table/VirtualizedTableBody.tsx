import { cn } from "@/lib/utils";
import { RefObject } from "react";
import { Table, flexRender } from "@tanstack/react-table";
import { useVirtualizer, Virtualizer } from "@tanstack/react-virtual";

import { TableBody, TableRow, TableCell } from "@/components/ui/table";

interface IVirtualizedTableBodyProps<TableData> {
  table: Table<TableData>;
  setSelectedRow: (rowData: TableData) => void;
  tableContainerRef: RefObject<HTMLDivElement>;
  columnVirtualizer: Virtualizer<HTMLDivElement, HTMLTableCellElement>;
}

const VirtualizedTableBody = <TableData,>({
  table,
  setSelectedRow,
  tableContainerRef,
  columnVirtualizer,
}: IVirtualizedTableBodyProps<TableData>) => {
  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 32,
    overscan: 10,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  return (
    <TableBody
      className="relative grid"
      style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
    >
      {virtualRows.map((virtualRow) => {
        const row = table.getRowModel().rows[virtualRow.index];
        const visibleCells = row.getVisibleCells();
        const virtualColumns = columnVirtualizer.getVirtualItems();

        return (
          <TableRow
            key={row.id}
            data-index={virtualRow.index}
            className="absolute flex w-full"
            ref={(node) => rowVirtualizer.measureElement(node)}
            style={{ transform: `translateY(${virtualRow.start}px)` }}
            onClick={() => setSelectedRow(row.original)}
          >
            {virtualColumns.map((virtualCell, cellIndex) => {
              const cell = visibleCells[virtualCell.index];
              const isIdCell = cell.column.id === "id";

              return (
                <TableCell
                  key={`bodyCell-${cell.id}-${cellIndex}`}
                  className={cn(
                    "min-h-10 flex px-4 text-base border-r",
                    !isIdCell ? "capitalize" : ""
                  )}
                  style={{ width: cell.column.getSize() }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default VirtualizedTableBody;
