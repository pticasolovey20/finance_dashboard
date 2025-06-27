import { Table } from "@tanstack/react-table";

import { useTransactionTableStore } from "@/store/useTransactionTableStore";

import ResponsiveModal from "@/components/modal/ResponsiveModal";
import TableColumnsForm from "@/components/forms/TableColumnsForm";

interface TableColumnsModalProps<TableData> {
  table: Table<TableData>;
}

const TableColumnsModal = <TableData,>({ table }: TableColumnsModalProps<TableData>) => {
  const {
    transactionModals: { isColumnsOpen },
    closeColumnsModal,
  } = useTransactionTableStore();

  return (
    <ResponsiveModal open={isColumnsOpen} onOpenChange={closeColumnsModal} title="Manage your table columns here">
      <TableColumnsForm table={table} onCloseDrawer={closeColumnsModal} />
    </ResponsiveModal>
  );
};

export default TableColumnsModal;
