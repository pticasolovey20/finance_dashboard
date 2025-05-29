import { Table } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ITableFilterProps<TableData> {
  table: Table<TableData>;
}

const TableFilter = <TableData,>({ table }: ITableFilterProps<TableData>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[100px] sm:w-[200px]">
          Columns
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="absolute left-3 sm:left-0 top-1 -translate-x-1/2 w-[100px] sm:w-[200px]">
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

export default TableFilter;
