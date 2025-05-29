import { useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnSizingState,
  PaginationState,
  VisibilityState,
} from "@tanstack/react-table";

import { ITransactionData } from "@/types/transactions";
import { useTransactionColumns } from "@/hooks/useTransactionColumns";

import { Input } from "@/components/ui/input";
import { Table } from "@/components/ui/table";
import TablePagination from "@/components/table/TablePagination";
import ColumnVisibility from "@/components/table/ColumnVisibility";
import VirtualizedTableBody from "@/components/table/VirtualizedTableBody";
import VirtualizedTableHeader from "@/components/table/VirtualizedTableHeader";

interface ITransactionsTableProps {
  transactions: ITransactionData[];
}

const TransactionsTable = ({ transactions }: ITransactionsTableProps) => {
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false,
  });

  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const totalTableWidth = useMemo(() => {
    return Object.values(columnSizing).reduce((acc, state) => acc + state, 0);
  }, [columnSizing]);

  const transactionTable = useReactTable({
    data: transactions,
    columns: useTransactionColumns(),

    // initialState: {
    //   sorting,
    //   pagination,
    //   globalFilter,
    //   columnSizing,
    //   columnVisibility,
    // },

    state: {
      sorting,
      pagination,
      globalFilter,
      columnSizing,
      columnVisibility,
    },

    enableColumnResizing: true,
    columnResizeMode: "onChange",
    onColumnSizingChange: setColumnSizing,
    onColumnVisibilityChange: setColumnVisibility,

    getCoreRowModel: getCoreRowModel(),

    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
  });

  const visibleColumns = transactionTable.getVisibleLeafColumns();

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

  return (
    <div>
      <div className="flex items-center gap-8 mb-6">
        <Input
          placeholder="Search..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
        />

        <ColumnVisibility table={transactionTable} />
      </div>

      <div className="border border-muted rounded-md overflow-hidden">
        <div
          ref={tableContainerRef}
          style={{ minWidth: totalTableWidth }}
          className="relative grid h-[calc(100dvh-300px)] overflow-auto"
        >
          <Table className="table-auto w-full">
            <VirtualizedTableHeader
              table={transactionTable}
              columnVirtualizer={columnVirtualizer}
            />

            <VirtualizedTableBody
              table={transactionTable}
              tableContainerRef={tableContainerRef}
              columnVirtualizer={columnVirtualizer}
            />
          </Table>
        </div>
      </div>

      <TablePagination table={transactionTable} />
    </div>
  );
};

export default TransactionsTable;
