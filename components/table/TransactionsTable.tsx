import { Fragment, useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  useReactTable,
  getCoreRowModel,
  PaginationState,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";

import { ITransactionData } from "@/types/transactionTypes";
import { useTransactionColumns } from "@/hooks/useTransactionColumns";
import { useTransactionTableStore } from "@/store/useTransactionTableStore";

import { Input } from "@/components/ui/input";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import CircleLoader from "@/components/CircleLoader";
import TablePagination from "@/components/table/TablePagination";
import CreateButton from "@/components/transactions/CreateButton";
import TableFilterModal from "@/components/table/TableFilterModal";
// import GenerateButton from "@/components/transactions/GenerateButton";
import VirtualizedTableBody from "@/components/table/VirtualizedTableBody";
import TransactionsTableModal from "@/components/table/TransactionsTableModal";
import VirtualizedTableHeader from "@/components/table/VirtualizedTableHeader";

interface ITransactionsTableProps {
  transactions: ITransactionData[];
  isLoading: boolean;
}

const TransactionsTable = ({
  transactions,
  isLoading,
}: ITransactionsTableProps) => {
  const {
    columnSizing,
    setColumnSizing,
    columnVisibility,
    setColumnVisibility,
    columnSorting,
    setColumnSorting,
  } = useTransactionTableStore();

  const [globalFilter, setGlobalFilter] = useState<string>("");
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

    state: {
      pagination,
      globalFilter,
      columnSizing,
      columnVisibility,
      sorting: columnSorting,
    },

    enableColumnResizing: true,
    columnResizeMode: "onChange",
    onColumnSizingChange: setColumnSizing,
    onColumnVisibilityChange: setColumnVisibility,

    getCoreRowModel: getCoreRowModel(),

    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: setColumnSorting,
    getSortedRowModel: getSortedRowModel(),

    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
  });

  const visibleColumns = transactionTable.getVisibleLeafColumns();
  const isEmptyTable = transactionTable.getRowModel().rows.length === 0;

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
    <Fragment>
      <div className="flex items-center gap-4 mb-4">
        <CreateButton />

        {/* <GenerateButton /> */}

        <Input
          placeholder="Search..."
          value={globalFilter ?? ""}
          className="h-10 placeholder:text-base"
          onChange={(event) => setGlobalFilter(event.target.value)}
        />

        <Button
          variant="outline"
          onClick={openTransactionFilter}
          className="h-10 max-w-[100px] xs:max-w-[150px] w-full md:text-base"
        >
          Filters
        </Button>
      </div>

      <div className="relative flex-1">
        {isLoading ? (
          <CircleLoader />
        ) : isEmptyTable ? (
          <div
            className={cn(
              "min-h-[200px] overflow-hidden",
              "flex items-center justify-center",
              "border border-muted rounded-md"
            )}
          >
            <span className="font-medium text-lg">Nothing found!</span>
          </div>
        ) : (
          <Fragment>
            <div className="border border-muted rounded-md overflow-hidden">
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

            <TablePagination table={transactionTable} />
          </Fragment>
        )}
      </div>

      <TransactionsTableModal />
      <TableFilterModal table={transactionTable} />
    </Fragment>
  );
};

export default TransactionsTable;
