import { useState } from "react";
import { ITransactionData } from "@/types/transactions";
import { useTransactionColumns } from "@/hooks/useTransactionColumns";

import {
  flexRender,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import TablePagination from "@/components/table/TablePagination";

interface ITransactionsTableProps {
  transactions: ITransactionData[];
}

const TransactionsTable = ({ transactions }: ITransactionsTableProps) => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const transactionTable = useReactTable({
    data: transactions,
    columns: useTransactionColumns(),

    state: {
      sorting,
      pagination,
      globalFilter,
    },

    getCoreRowModel: getCoreRowModel(),

    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <Input
        className="mb-6"
        placeholder="Search..."
        value={globalFilter ?? ""}
        onChange={(event) => setGlobalFilter(event.target.value)}
      />

      <Table suppressHydrationWarning>
        <TableHeader>
          {transactionTable.getHeaderGroups().map((headerGroup) => (
            <TableRow key={`header-row-${headerGroup.id}`}>
              {headerGroup.headers.map((headerCell) => (
                <TableHead
                  key={`header-cell-${headerCell.id}`}
                  className="cursor-pointer select-none"
                  onClick={headerCell.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    headerCell.column.columnDef.header,
                    headerCell.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {transactionTable.getRowModel().rows.map((row) => (
            <TableRow key={`body-row-${row.id}`}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={`body-cell-${cell.id}`}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination table={transactionTable} />
    </div>
  );
};

export default TransactionsTable;
