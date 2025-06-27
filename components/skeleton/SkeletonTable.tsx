import { cn } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";
import TableContainer from "@/components/table/TableContainer";

const SkeletonTable = () => {
  const rowsLength = 50;
  const columnsLength = 10;
  const columnTemplate = `repeat(${columnsLength}, minmax(200px, 250px))`;

  const isLastItem = (index: number, length: number) => index === length - 1;

  const generateRow = (columnsLength: number, keyPrefix: string) => {
    return Array.from({ length: columnsLength }).map((_, columnIndex) => {
      const isLastColumn = isLastItem(columnIndex, columnsLength);

      return (
        <div
          key={`${keyPrefix}-${columnIndex}`}
          className={cn("flex items-center", "h-10 px-4 py-2 bg-background", !isLastColumn && "border-r border-input")}
        >
          <Skeleton className="h-full w-full" />
        </div>
      );
    });
  };

  return (
    <TableContainer>
      <div className="min-w-max">
        {/* FIXED TABLE HEADER */}
        <div
          className={cn("grid sticky top-0 z-10", "border-b border-input bg-background")}
          style={{ gridTemplateColumns: columnTemplate }}
        >
          {generateRow(columnsLength, "header-row")}
        </div>

        {/* TABLE BODY */}
        <div className="overflow-y-auto">
          {Array.from({ length: rowsLength }).map((_, rowIndex) => {
            const isLastRow = isLastItem(rowIndex, rowsLength);
            const keyPrefix = `row`;

            return (
              <div
                key={`${keyPrefix}-${rowIndex}`}
                className={cn("grid", isLastRow ? "" : "border-b border-input")}
                style={{ gridTemplateColumns: columnTemplate }}
              >
                {generateRow(columnsLength, keyPrefix)}
              </div>
            );
          })}
        </div>
      </div>
    </TableContainer>
  );
};

export default SkeletonTable;
