import { cn } from "@/lib/utils";
import { ITransactionData } from "@/types/transactions";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTransactionColumns } from "@/hooks/useTransactionColumns";

import {
  flexRender,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnSizingState,
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const initialSizing = useMemo(() => {
    if (!containerWidth) return {};

    const sizing: ColumnSizingState = {};
    const initialColumnWidth = Math.floor(containerWidth / columns.length);

    columns.forEach((column) => {
      if (column.id) sizing[column.id] = initialColumnWidth;
    });

    return sizing;
  }, [columns, containerWidth]);

  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  useEffect(() => {
    if (Object.keys(initialSizing).length > 0) setColumnSizing(initialSizing);
  }, [initialSizing]);

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

  const totalTableWidth = useMemo(() => {
    return Object.values(columnSizing).reduce((a, b) => a + b, 0);
  }, [columnSizing]);

  return (
    <div>
      <Input
        className="mb-6"
        placeholder="Search..."
        value={globalFilter ?? ""}
        onChange={(event) => setGlobalFilter(event.target.value)}
      />

      <div className="overflow-auto" ref={containerRef}>
        <div className="min-w-fit" style={{ minWidth: totalTableWidth }}>
          <Table className="table-auto w-full">
            <TableHeader>
              {transactionTable
                .getHeaderGroups()
                .map((headerGroup, rowIndex) => (
                  <TableRow key={`headerRow-${headerGroup.id}-${rowIndex}`}>
                    {headerGroup.headers.map((headerCell, cellIndex) => (
                      <TableHead
                        key={`headerCell-${headerCell.id}-${cellIndex}`}
                        className="relative select-none"
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
