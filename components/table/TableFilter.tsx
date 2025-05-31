import { Table } from "@tanstack/react-table";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface ITableFilterProps<TableData> {
  table: Table<TableData>;
}

const TableFilter = <TableData,>({ table }: ITableFilterProps<TableData>) => {
  console.log(table);

  return (
    <Drawer>
      <DrawerTrigger className="max-w-[100px] xs:max-w-[150px] w-full">
        <Button variant="outline" className="w-full">
          Filters
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Table Filters</DrawerTitle>
          <DrawerDescription>Manage your table filters here</DrawerDescription>
        </DrawerHeader>

        <div className="h-[300px] p-4">{/* FILTERS */}</div>

        <DrawerFooter>
          <div className="flex gap-4">
            <Button>Submit</Button>

            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default TableFilter;
