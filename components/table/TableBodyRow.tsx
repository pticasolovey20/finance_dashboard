import { Row } from "@tanstack/react-table";
import { VirtualItem, Virtualizer } from "@tanstack/react-virtual";

import { TableCell, TableRow } from "@/components/ui/table";
import TableBodyCell from "@/components/table/TableBodyCell";

interface ITableBodyRowProps<TableData> {
  columnVirtualizer: Virtualizer<HTMLDivElement, HTMLTableCellElement>;
  row: Row<TableData>;
  virtualRow: VirtualItem;
  rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
  handleSelectRow: (data: TableData) => void;
  virtualPaddingLeft: number | undefined;
  virtualPaddingRight: number | undefined;
}

const TableBodyRow = <TableData,>({
  columnVirtualizer,
  row,
  virtualRow,
  rowVirtualizer,
  handleSelectRow,
  virtualPaddingLeft,
  virtualPaddingRight,
}: ITableBodyRowProps<TableData>) => {
  const visibleCells = row.getVisibleCells();
  const virtualColumns = columnVirtualizer.getVirtualItems();

  return (
    <TableRow
      data-index={virtualRow.index}
      onClick={() => handleSelectRow(row.original)}
      ref={(node) => rowVirtualizer.measureElement(node)}
      className="absolute flex w-full"
      style={{ transform: `translateY(${virtualRow.start}px)` }}
    >
      {virtualPaddingLeft ? (
        <TableCell className="flex" style={{ width: virtualPaddingLeft }} />
      ) : null}

      {virtualColumns.map((virtualColumn) => {
        const cell = visibleCells[virtualColumn.index];

        return <TableBodyCell key={cell.id} cell={cell} />;
      })}

      {virtualPaddingRight ? (
        <TableCell className="flex" style={{ width: virtualPaddingRight }} />
      ) : null}
    </TableRow>
  );
};

export default TableBodyRow;
