import { Table } from "@tanstack/react-table";
import { useIsMobile } from "@/hooks/use-mobile";

import { useTransactionTableStore } from "@/store/useTransactionTableStore";

import { Drawer, DrawerTitle, DrawerHeader, DrawerContent } from "@/components/ui/drawer";
import { Dialog, DialogTitle, DialogHeader, DialogContent } from "@/components/ui/dialog";
import TransactionFiltersForm from "@/components/forms/TransactionFiltersForm";

interface ITableFilterModalProps<TableData> {
  table: Table<TableData>;
}

const TableFilterModal = <TableData,>({ table }: ITableFilterModalProps<TableData>) => {
  const isMobile = useIsMobile();

  const { isTransactionFilterOpen: isOpen, closeTransactionFilter: closeFilter } = useTransactionTableStore();

  if (!isOpen) return null;

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={closeFilter}>
        <DrawerContent className="max-h-[calc(100dvh-50px)]" aria-describedby={undefined}>
          <DrawerHeader>
            <DrawerTitle className="text-xl lg:text-2xl text-center">Manage your table filters here</DrawerTitle>
          </DrawerHeader>

          <TransactionFiltersForm table={table} onCloseDrawer={closeFilter} />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeFilter}>
      <DialogContent className="min-w-[600px] max-h-[calc(100dvh-50px)] flex flex-col" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-xl lg:text-2xl pl-1">Manage your table filters here</DialogTitle>
        </DialogHeader>

        <TransactionFiltersForm table={table} onCloseDrawer={closeFilter} />
      </DialogContent>
    </Dialog>
  );
};

export default TableFilterModal;
