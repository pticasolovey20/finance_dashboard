import { useIsMobile } from "@/hooks/use-mobile";
import { Dispatch, SetStateAction } from "react";
import { Table, VisibilityState } from "@tanstack/react-table";
import { useTransactionTableStore } from "@/store/useTransactionTableStore";

import {
  Drawer,
  DrawerTitle,
  DrawerHeader,
  DrawerContent,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
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
  const isMobile = useIsMobile();

  const {
    isTransactionFilterOpen: isOpen,
    closeTransactionFilter: closeFilter,
  } = useTransactionTableStore();

  if (!isOpen) return null;

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={closeFilter}>
        <DrawerContent
          className="max-h-[calc(100dvh-50px)]"
          aria-describedby={undefined}
        >
          <DrawerHeader>
            <DrawerTitle className="text-xl lg:text-2xl text-center">
              Manage your table filters here
            </DrawerTitle>
          </DrawerHeader>

          <FiltersForm
            table={table}
            columnVisibility={columnVisibility}
            setColumnVisibility={setColumnVisibility}
            onCloseDrawer={closeFilter}
          />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeFilter}>
      <DialogContent
        className="min-w-[600px] max-h-[calc(100dvh-50px)] flex flex-col"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle className="text-xl lg:text-2xl pl-1">
            Manage your table filters here
          </DialogTitle>
        </DialogHeader>

        <FiltersForm
          table={table}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
          onCloseDrawer={closeFilter}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TableFilterModal;
