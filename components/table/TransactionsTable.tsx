"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useCallback } from "react";

import {
  useReactTable,
  getCoreRowModel,
  PaginationState,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { ITransactionData } from "@/types/transactionTypes";
import { useTransactionStore } from "@/store/useTransactionStore";
import { useTransactionColumns } from "@/hooks/useTransactionColumns";
import { useTransactionTableStore } from "@/store/useTransactionTableStore";

import { Skeleton } from "@/components/ui/skeleton";
import EmptyTable from "@/components/table/EmptyTable";
import SkeletonTable from "@/components/skeleton/SkeletonTable";
import TablePagination from "@/components/table/TablePagination";
import TableFilterModal from "@/components/modal/TableFilterModal";
import TransactionsTableModal from "@/components/modal/TransactionsTableModal";
import VirtualizedTableWrapper from "@/components/table/VirtualizedTableWrapper";

const TransactionsTableTopbar = dynamic(() => import("@/components/table/TransactionsTableTopbar"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center gap-4 mb-4">
      <Skeleton className="h-10 w-10 aspect-square" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 max-w-[100px] xs:max-w-[150px] w-full" />
    </div>
  ),
});

const TransactionsTable = () => {
  const { fetchTransactions, isFetching, transactions } = useTransactionStore();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const {
    columnSizing,
    setColumnSizing,
    columnVisibility,
    setColumnVisibility,
    columnSorting,
    setColumnSorting,
    openTransactionModal,
    openTransactionFilter,
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

  const handleSelectRow = useCallback(
    (rowData: ITransactionData) => {
      openTransactionModal("edit", rowData);
    },

    [openTransactionModal]
  );

  return (
    <div className="mt-12">
      <TransactionsTableTopbar
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        handleOpenModal={openTransactionModal}
        handleOpenFilter={openTransactionFilter}
      />

      <div className="relative flex-1">
        {isFetching ? (
          <SkeletonTable />
        ) : isEmptyTable ? (
          <EmptyTable />
        ) : (
          <VirtualizedTableWrapper table={transactionTable} handleSelectRow={handleSelectRow} />
        )}

        <TablePagination table={transactionTable} />
      </div>

      <TransactionsTableModal />
      <TableFilterModal table={transactionTable} />
    </div>
  );
};

export default TransactionsTable;
