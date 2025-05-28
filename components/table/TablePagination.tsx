import { RowData, Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

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
  const handleNextPage = () => table.previousPage();

  return (
    <div className="flex items-center justify-center gap-6 mt-16">
      {hasPrevPage && (
        <Button variant="outline" onClick={handlePrevPage}>
          PREV
        </Button>
      )}

      {maxExistingPage ? (
        <span>{`${currentPage} of ${maxExistingPage}`}</span>
      ) : null}

      {hasNextPage && (
        <Button variant="outline" onClick={handleNextPage}>
          NEXT
        </Button>
      )}
    </div>
  );
};

export default TablePagination;
