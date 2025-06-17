import {
  useReactTable,
  getCoreRowModel,
  PaginationState,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Fragment, useState } from "react";

import { ITransactionData } from "@/types/transactionTypes";
import { useTransactionColumns } from "@/hooks/useTransactionColumns";
import { useTransactionTableStore } from "@/store/useTransactionTableStore";

import CircleLoader from "@/components/CircleLoader";
import EmptyTable from "@/components/table/EmptyTable";
import TableTopbar from "@/components/table/TableTopbar";
import TableWrapper from "@/components/table/TableWrapper";
import TablePagination from "@/components/table/TablePagination";
import TableFilterModal from "@/components/table/TableFilterModal";
import TransactionsTableModal from "@/components/table/TransactionsTableModal";

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

  const isEmptyTable = transactionTable.getRowModel().rows.length === 0;

  const { openTransactionModal, openTransactionFilter } =
    useTransactionTableStore();

  const handleSelectRow = (rowData: ITransactionData) => {
    openTransactionModal("edit", rowData);
  };

  return (
    <Fragment>
      <TableTopbar
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        handleOpenModal={openTransactionModal}
        handleOpenFilter={openTransactionFilter}
      />

      <div className="relative flex-1">
        {isLoading ? (
          <CircleLoader />
        ) : isEmptyTable ? (
          <EmptyTable />
        ) : (
          <Fragment>
            <TableWrapper<ITransactionData>
              table={transactionTable}
              handleSelectRow={handleSelectRow}
            />

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
