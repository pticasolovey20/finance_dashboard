import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RowData, Table } from "@tanstack/react-table";

interface ITablePaginationProps<TableData extends RowData> {
  table: Table<TableData>;
}

const TablePagination = <TableData extends RowData>({
  table,
}: ITablePaginationProps<TableData>) => {
  const maxExistingPage = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;

  const hasNextPage = table.getCanNextPage();
  const hasPrevPage = table.getCanPreviousPage();

  const handlePrevPage = () => table.previousPage();
  const handleNextPage = () => table.nextPage();

  return (
    <div className="flex items-center justify-center gap-6 mt-16">
      <Button
        variant="outline"
        onClick={handlePrevPage}
        className={cn(hasPrevPage ? "visible" : "invisible")}
      >
        PREV
      </Button>

      {maxExistingPage ? (
        <span>{`${currentPage} of ${maxExistingPage}`}</span>
      ) : null}

      <Button
        variant="outline"
        onClick={handleNextPage}
        className={cn(hasNextPage ? "visible" : "invisible")}
      >
        NEXT
      </Button>
    </div>
  );
};

export default TablePagination;
