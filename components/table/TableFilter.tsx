import { Dispatch, SetStateAction, useState } from "react";
import { Table, VisibilityState } from "@tanstack/react-table";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import FiltersForm from "@/components/forms/FiltersForm";

interface ITableFilterProps<TableData> {
  table: Table<TableData>;
  columnVisibility: VisibilityState;
  setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>;
}

const TableFilter = <TableData,>({
  table,
  columnVisibility,
  setColumnVisibility,
}: ITableFilterProps<TableData>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger className="max-w-[100px] xs:max-w-[150px] w-full" asChild>
        <Button variant="outline" className="w-full">
          Filters
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-xl lg:text-2xl">
            Table Filters
          </DrawerTitle>

          <DrawerDescription className="text-base lg:text-lg">
            Manage your table filters here
          </DrawerDescription>
        </DrawerHeader>

        <FiltersForm
          table={table}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
          onCloseDrawer={() => setIsOpen(false)}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default TableFilter;
