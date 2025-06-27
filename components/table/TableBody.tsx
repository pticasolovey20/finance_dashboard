import { RefObject } from "react";

import { Row, Table } from "@tanstack/react-table";
import { Virtualizer, useVirtualizer } from "@tanstack/react-virtual";

import TableBodyRow from "@/components/table/TableBodyRow";
import { TableBody as HeadlessTableBody } from "@/components/ui/table";

interface ITableBodyProps<TableData> {
  table: Table<TableData>;
  handleSelectRow: (data: TableData) => void;

  columnVirtualizer: Virtualizer<HTMLDivElement, HTMLTableCellElement>;
  tableContainerRef: RefObject<HTMLDivElement>;

  virtualPaddingLeft: number | undefined;
  virtualPaddingRight: number | undefined;
}

const TableBody = <TableData,>({
  table,
  handleSelectRow,
  columnVirtualizer,
  tableContainerRef,
  virtualPaddingLeft,
  virtualPaddingRight,
}: ITableBodyProps<TableData>) => {
  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    count: rows.length,
    estimateSize: () => 32,
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== "undefined" && navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 10,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  return (
    <HeadlessTableBody className="relative grid" style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
      {virtualRows.map((virtualRow) => {
        const row = rows[virtualRow.index] as Row<TableData>;

        return (
          <TableBodyRow
            key={row.id}
            table={table}
            columnVirtualizer={columnVirtualizer}
            row={row}
            virtualRow={virtualRow}
            rowVirtualizer={rowVirtualizer}
            handleSelectRow={handleSelectRow}
            virtualPaddingLeft={virtualPaddingLeft}
            virtualPaddingRight={virtualPaddingRight}
          />
        );
      })}
    </HeadlessTableBody>
  );
};

export default TableBody;
