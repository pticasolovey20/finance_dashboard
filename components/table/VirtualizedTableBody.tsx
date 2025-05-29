import { RefObject } from "react";
import { Table, ColumnDef, flexRender } from "@tanstack/react-table";
import { useVirtualizer, Virtualizer } from "@tanstack/react-virtual";

import { TableBody, TableRow, TableCell } from "@/components/ui/table";

interface IVirtualizedTableBodyProps<TableData> {
  table: Table<TableData>;
  tableContainerRef: RefObject<HTMLDivElement>;
  columns: ColumnDef<TableData>[];
  columnVirtualizer: Virtualizer<HTMLDivElement, HTMLTableCellElement>;
}

const VirtualizedTableBody = <TableData,>({
  table,
  tableContainerRef,
  columns,
  columnVirtualizer,
}: IVirtualizedTableBodyProps<TableData>) => {
  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 32,
    overscan: 10,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  const paddingBottom =
    virtualRows.length > 0
      ? rowVirtualizer.getTotalSize() - virtualRows[virtualRows.length - 1].end
      : 0;

  return (
    <TableBody className="relative grid">
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
          >
            {virtualColumns.map((virtualCell, cellIndex) => {
              const cell = visibleCells[virtualCell.index];

              return (
                <TableCell
                  key={`bodyCell-${cell.id}-${cellIndex}`}
                  className="flex px-4"
                  style={{ width: cell.column.getSize() }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}

      {paddingBottom > 0 && (
        <TableRow>
          <TableCell
            colSpan={columns.length}
            style={{ height: `${paddingBottom}px` }}
          />
        </TableRow>
      )}
    </TableBody>
  );
};

export default VirtualizedTableBody;
