import { cn } from "@/lib/utils";
import { RowData, Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ITablePaginationProps<TableData extends RowData> {
  table: Table<TableData>;
}

const TablePagination = <TableData extends RowData>({ table }: ITablePaginationProps<TableData>) => {
  const maxExistingPage = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;

  const hasNextPage = table.getCanNextPage();
  const hasPrevPage = table.getCanPreviousPage();

  const handlePrevPage = () => table.previousPage();
  const handleNextPage = () => table.nextPage();

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        size="icon"
        variant="ghost"
        onClick={handlePrevPage}
        aria-label="prev button"
        className={cn(hasPrevPage ? "visible" : "invisible")}
      >
        <ChevronLeft />
      </Button>

      {maxExistingPage ? <span>{`${currentPage} of ${maxExistingPage}`}</span> : null}

      <Button
        size="icon"
        variant="ghost"
        aria-label="next button"
        onClick={handleNextPage}
        className={cn(hasNextPage ? "visible" : "invisible")}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default TablePagination;
