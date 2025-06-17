import { useRef } from "react";
import { Table } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

import TableBody from "@/components/table/TableBody";
import TableHead from "@/components/table/TableHead";

import "@/app/styles/scrollbar.scss";

interface ITableWrapperProps<TableData> {
  table: Table<TableData>;
  handleSelectRow: (data: TableData) => void;
}

const TableWrapper = <TableData,>({
  table,
  handleSelectRow,
}: ITableWrapperProps<TableData>) => {
  const visibleColumns = table.getVisibleLeafColumns();

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const columnVirtualizer = useVirtualizer<
    HTMLDivElement,
    HTMLTableCellElement
  >({
    count: visibleColumns.length,
    estimateSize: (index) => visibleColumns[index].getSize(),
    getScrollElement: () => tableContainerRef.current,
    horizontal: true,
    overscan: 3,
  });

  const virtualColumns = columnVirtualizer.getVirtualItems();

  let virtualPaddingLeft: number | undefined;
  let virtualPaddingRight: number | undefined;

  if (columnVirtualizer && virtualColumns?.length) {
    virtualPaddingLeft = virtualColumns[0]?.start ?? 0;
    virtualPaddingRight =
      columnVirtualizer.getTotalSize() -
      (virtualColumns[virtualColumns.length - 1]?.end ?? 0);
  }

  return (
    <div className="reltive">
      <div
        ref={tableContainerRef}
        className="relative max-h-[calc(100dvh-220px)] border border-muted rounded-md overflow-auto scrollable"
      >
        <table className="grid">
          <TableHead
            table={table}
            columnVirtualizer={columnVirtualizer}
            virtualPaddingLeft={virtualPaddingLeft}
            virtualPaddingRight={virtualPaddingRight}
          />

          <TableBody
            table={table}
            handleSelectRow={handleSelectRow}
            columnVirtualizer={columnVirtualizer}
            tableContainerRef={tableContainerRef}
            virtualPaddingLeft={virtualPaddingLeft}
            virtualPaddingRight={virtualPaddingRight}
          />
        </table>
      </div>

      {/* overlay border */}
      <div className="absolute inset-0 max-h-[calc(100dvh-220px)] border border-muted rounded-md pointer-events-none z-10" />
    </div>
  );
};

export default TableWrapper;
