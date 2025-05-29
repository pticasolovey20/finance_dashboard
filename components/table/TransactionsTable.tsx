import { useState } from "react";
import { cn } from "@/lib/utils";
import { ITransactionData } from "@/types/transactions";
import { useColumnSizing } from "@/hooks/useColumnSizing";
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
  const columns = useTransactionColumns();
  const { containerRef, columnSizing, setColumnSizing, totalTableWidth } =
    useColumnSizing(columns);

  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const transactionTable = useReactTable({
    data: transactions,
    columns,

    state: {
      sorting,
      pagination,
      globalFilter,
      columnSizing,
    },

    enableColumnResizing: true,
    columnResizeMode: "onChange",
    onColumnSizingChange: setColumnSizing,

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

      <div className="overflow-auto" ref={containerRef}>
        <div
          className="min-w-fit border border-muted rounded-md overflow-hidden"
          style={{ minWidth: totalTableWidth }}
        >
          <Table className="table-auto w-full">
            <TableHeader>
              {transactionTable
                .getHeaderGroups()
                .map((headerGroup, rowIndex) => (
                  <TableRow key={`headerRow-${headerGroup.id}-${rowIndex}`}>
                    {headerGroup.headers.map((headerCell, cellIndex) => (
                      <TableHead
                        key={`headerCell-${headerCell.id}-${cellIndex}`}
                        className="relative select-none border-r border-muted"
                        onClick={headerCell.column.getToggleSortingHandler()}
                        style={{
                          width:
                            headerCell.getSize() !== 0
                              ? headerCell.getSize()
                              : undefined,
                        }}
                      >
                        <div className="cursor-pointer">
                          {headerCell.isPlaceholder
                            ? null
                            : flexRender(
                                headerCell.column.columnDef.header,
                                headerCell.getContext()
                              )}
                        </div>

                        {headerCell.column.getCanResize() && (
                          <div
                            onMouseDown={headerCell.getResizeHandler()}
                            onTouchStart={headerCell.getResizeHandler()}
                            className={cn(
                              "cursor-col-resize select-none",
                              "h-full w-1 bg-muted-foreground",
                              "opacity-30 hover:opacity-70 transition",
                              "absolute inset-y-0 right-0"
                            )}
                          />
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
            </TableHeader>

            <TableBody>
              {transactionTable.getRowModel().rows.map((row, rowIndex) => (
                <TableRow key={`bodyRow-${row.id}-${rowIndex}`}>
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <TableCell
                      key={`bodyCell-${cell.id}-${cellIndex}`}
                      className="px-4 border-r border-muted"
                      style={{
                        width:
                          cell.column.getSize() !== 0
                            ? cell.column.getSize()
                            : undefined,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <TablePagination table={transactionTable} />
    </div>
  );
};

export default TransactionsTable;
