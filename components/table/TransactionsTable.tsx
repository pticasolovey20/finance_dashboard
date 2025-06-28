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

import { ITransactionData } from "@/types/transactionFormTypes";
import { useTransactionStore } from "@/store/useTransactionStore";
import { useTransactionColumns } from "@/hooks/useTransactionColumns";
import { useTransactionTableStore } from "@/store/useTransactionTableStore";

import TableColumnsModal from "@/components/modal/TableColumnsModal";
import TransactionsFormModal from "@/components/modal/TransactionsFormModal";

import EmptyTable from "@/components/table/EmptyTable";
import SkeletonTable from "@/components/skeleton/SkeletonTable";
import TablePagination from "@/components/table/TablePagination";
import VirtualizedTableWrapper from "@/components/table/VirtualizedTableWrapper";
import SkeletonTransctionTableTopbar from "@/components/skeleton/SkeletonTransctionTableTopbar";

const TransactionsTableTopbar = dynamic(() => import("@/components/table/TransactionsTableTopbar"), {
  ssr: false,
  loading: () => <SkeletonTransctionTableTopbar />,
});

const TransactionsTable = () => {
  const { fetchTransactions, isFetching, filteredTransactions } = useTransactionStore();

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

    openFormModal,
    openColumnsModal,
  } = useTransactionTableStore();

  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });

  const transactionTable = useReactTable({
    data: filteredTransactions,
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

  const handleSelectRow = useCallback((rowData: ITransactionData) => openFormModal("edit", rowData), [openFormModal]);

  return (
    <div className="mt-12">
      <TransactionsTableTopbar
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        openFormModal={openFormModal}
        openColumnsModal={openColumnsModal}
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

      <TransactionsFormModal />
      <TableColumnsModal table={transactionTable} />
    </div>
  );
};

export default TransactionsTable;
