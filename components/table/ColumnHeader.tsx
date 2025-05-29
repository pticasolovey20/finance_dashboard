import { Column } from "@tanstack/react-table";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

interface IColumnHeaderProps<TableData> {
  title: string;
  column: Column<TableData>;
}

const ColumnHeader = <TableData,>({
  title,
  column,
}: IColumnHeaderProps<TableData>) => {
  const isSorted = column.getIsSorted();

  return (
    <div className="flex items-center gap-2 px-2">
      <span>{title}</span>

      <button
        onClick={() => column.toggleSorting()}
        className="p-1 rounded hover:bg-muted"
      >
        {isSorted === "asc" ? (
          <ArrowUp className="w-4 h-4 text-muted-foreground" />
        ) : isSorted === "desc" ? (
          <ArrowDown className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
    </div>
  );
};

export default ColumnHeader;
