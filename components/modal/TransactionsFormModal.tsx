import { useTransactionTableStore } from "@/store/useTransactionTableStore";

import ResponsiveModal from "@/components/modal/ResponsiveModal";
import TransactionForm from "@/components/forms/TransactionForm";

const TransactionsFormModal = () => {
  const {
    transactionModals: { isFormOpen },
    closeFormModal,
    mode,
  } = useTransactionTableStore();

  const actionLabel = mode === "create" ? "Create" : "Edit";

  return (
    <ResponsiveModal open={isFormOpen} onOpenChange={closeFormModal} title={`${actionLabel} your transaction`}>
      <TransactionForm />
    </ResponsiveModal>
  );
};

export default TransactionsFormModal;
