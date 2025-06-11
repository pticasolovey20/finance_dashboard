"use client";

import { useEffect } from "react";
// import { useCategoryStore } from "@/store/useCategoryStore";
import { useTransactionStore } from "@/store/useTransactionStore";

import CircleLoader from "@/components/CircleLoader";
import TransactionsTable from "@/components/table/TransactionsTable";

const TransactionsPage = () => {
  const { fetchTransactions, isLoading, transactions } = useTransactionStore();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <div className="flex flex-col mt-12">
      <TransactionsTable transactions={transactions} />
      {isLoading && <CircleLoader />}
    </div>
  );
};

export default TransactionsPage;
