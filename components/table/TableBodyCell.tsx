import { Cell, flexRender } from "@tanstack/react-table";

import { TableCell } from "@/components/ui/table";

interface ITableBodyCellProps<TableData> {
  cell: Cell<TableData, unknown>;
}

const TableBodyCell = <TableData,>({
  cell,
}: ITableBodyCellProps<TableData>) => {
  return (
    <TableCell
      className="min-h-10 flex px-4 text-base border-r cursor-pointer"
      style={{ width: cell.column.getSize() }}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  );
};

export default TableBodyCell;
