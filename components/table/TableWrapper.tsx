import { useEffect, useRef, useState } from "react";
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
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const visibleColumns = table.getVisibleLeafColumns();

  useEffect(() => {
    const element = tableContainerRef.current;
    if (!element) return;

    const updateHeight = () => setContainerHeight(element.offsetHeight);
    updateHeight();
    const resizeObserver = new ResizeObserver(() => updateHeight());

    resizeObserver.observe(element);
    window.addEventListener("resize", updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

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
      <div
        className="absolute inset-0 h-full border border-muted rounded-md pointer-events-none z-10"
        style={{ height: containerHeight }}
      />
    </div>
  );
};

export default TableWrapper;
