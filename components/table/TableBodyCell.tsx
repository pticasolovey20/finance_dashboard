import { Table, Cell, flexRender } from "@tanstack/react-table";

import { TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface ITableBodyCellProps<TableData> {
  table: Table<TableData>;
  cell: Cell<TableData, unknown>;
  isLast: boolean;
}

const TableBodyCell = <TableData,>({
  table,
  cell,
  isLast,
}: ITableBodyCellProps<TableData>) => {
  const isResizing = table.getState().columnSizingInfo.isResizingColumn;

  return (
    <TableCell
      className={cn(
        "min-h-10 flex px-4 text-base cursor-pointer",
        isLast && !isResizing ? "" : "border-r"
      )}
      style={{ width: cell.column.getSize() }}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  );
};

export default TableBodyCell;
