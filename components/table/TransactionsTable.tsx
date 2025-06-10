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

import { ITransactionData } from "@/types/transactionTypes";
import { useTransactionColumns } from "@/hooks/useTransactionColumns";
import { useTransactionTableStore } from "@/store/useTransactionTableStore";
import { DEFAULT_COLUMNS_VISIBILITY } from "@/constants/transactionTableFilter";

import { Input } from "@/components/ui/input";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import TablePagination from "@/components/table/TablePagination";
import CreateButton from "@/components/transactions/CreateButton";
import TableFilterModal from "@/components/table/TableFilterModal";
import VirtualizedTableBody from "@/components/table/VirtualizedTableBody";
import TransactionsTableModal from "@/components/table/TransactionsTableModal";
import VirtualizedTableHeader from "@/components/table/VirtualizedTableHeader";

interface ITransactionsTableProps {
  transactions: ITransactionData[];
}

const TransactionsTable = ({ transactions }: ITransactionsTableProps) => {
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    DEFAULT_COLUMNS_VISIBILITY
  );

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

  const { openTransactionModal, openTransactionFilter } =
    useTransactionTableStore();

  const handleSelectRow = (rowData: ITransactionData) => {
    openTransactionModal("edit", rowData);
  };

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <CreateButton />

        <Input
          placeholder="Search..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
        />

        <Button
          variant="outline"
          onClick={openTransactionFilter}
          className="max-w-[100px] xs:max-w-[150px] w-full"
        >
          Filters
        </Button>
      </div>
      {transactionTable.getRowModel().rows.length === 0 ? (
        <div>
          <span className="font-medium">Nothing found!</span>
        </div>
      ) : (
        <div className="md:border border-muted md:rounded-md overflow-hidden">
          <div
            ref={tableContainerRef}
            style={{ minWidth: totalTableWidth }}
            className="relative grid max-h-[calc(100dvh-220px)] overflow-auto"
          >
            <Table className="relative table-auto w-full overflow-auto">
              <VirtualizedTableHeader
                table={transactionTable}
                columnVirtualizer={columnVirtualizer}
              />

              <VirtualizedTableBody
                table={transactionTable}
                setSelectedRow={handleSelectRow}
                tableContainerRef={tableContainerRef}
                columnVirtualizer={columnVirtualizer}
              />
            </Table>
          </div>
        </div>
      )}

      <TablePagination table={transactionTable} />
      <TransactionsTableModal />
      <TableFilterModal
        table={transactionTable}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
      />
    </div>
  );
};

export default TransactionsTable;
