import { Table } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface IColumnVisibilityProps<TableData> {
  table: Table<TableData>;
}

const ColumnVisibility = <TableData,>({
  table,
}: IColumnVisibilityProps<TableData>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Columns</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="absolute -right-12 top-2">
        {table.getAllLeafColumns().map((column) => {
          const isVisible = column.getIsVisible();
          const canHide = column.getCanHide();

          const toggleHandler = (value: boolean) => {
            return column.toggleVisibility(value);
          };

          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={isVisible}
              disabled={!canHide}
              onCheckedChange={toggleHandler}
              className="capitalize"
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColumnVisibility;
