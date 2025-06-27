import { useRef } from "react";
import { Table } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

import TableBody from "@/components/table/TableBody";
import TableHead from "@/components/table/TableHead";
import TableContainer from "@/components/table/TableContainer";

import "@/app/styles/scrollbar.scss";

interface VirtualizedTableWrapperProps<TableData> {
  table: Table<TableData>;
  handleSelectRow: (data: TableData) => void;
}

const VirtualizedTableWrapper = <TableData,>({ table, handleSelectRow }: VirtualizedTableWrapperProps<TableData>) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const visibleColumns = table.getVisibleLeafColumns();

  const columnVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableCellElement>({
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
    virtualPaddingRight = columnVirtualizer.getTotalSize() - (virtualColumns[virtualColumns.length - 1]?.end ?? 0);
  }

  return (
    <TableContainer ref={tableContainerRef}>
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
    </TableContainer>
  );
};

export default VirtualizedTableWrapper;
