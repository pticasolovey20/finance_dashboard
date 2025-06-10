import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dispatch, SetStateAction } from "react";
import { Table, VisibilityState } from "@tanstack/react-table";
import { useTransactionTableStore } from "@/store/useTransactionTableStore";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import FiltersForm from "@/components/forms/FiltersForm";

interface ITableFilterModalProps<TableData> {
  table: Table<TableData>;
  columnVisibility: VisibilityState;
  setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>;
}

const TableFilterModal = <TableData,>({
  table,
  columnVisibility,
  setColumnVisibility,
}: ITableFilterModalProps<TableData>) => {
  const { isTransactionFilterOpen, closeTransactionFilter } =
    useTransactionTableStore();

  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer
        open={isTransactionFilterOpen}
        onOpenChange={closeTransactionFilter}
      >
        <DrawerContent className="max-h-[calc(100dvh-50px)]">
          <DrawerHeader>
            <DrawerTitle className="text-xl lg:text-2xl">
              Manage your table filters here
            </DrawerTitle>
          </DrawerHeader>

          <FiltersForm
            table={table}
            columnVisibility={columnVisibility}
            setColumnVisibility={setColumnVisibility}
            onCloseDrawer={closeTransactionFilter}
          />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog
      open={isTransactionFilterOpen}
      onOpenChange={closeTransactionFilter}
    >
      <DialogContent
        className={cn("min-w-[600px] max-h-[calc(100dvh-50px)] flex flex-col")}
      >
        <DialogHeader>
          <DialogTitle>Manage your table filters here</DialogTitle>
        </DialogHeader>

        <FiltersForm
          table={table}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
          onCloseDrawer={closeTransactionFilter}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TableFilterModal;
