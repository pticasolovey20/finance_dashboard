"use client";

import { useEffect } from "react";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useTransactionStore } from "@/store/useTransactionStore";

import CircleLoader from "@/components/CircleLoader";
import TransactionsTable from "@/components/table/TransactionsTable";

const TransactionsPage = () => {
  const { fetchCategories } = useCategoryStore();
  const { fetchTransactions, isLoading, transactions } = useTransactionStore();

  useEffect(() => {
    fetchCategories();
    fetchTransactions();
  }, [fetchCategories, fetchTransactions]);

  if (isLoading) return <CircleLoader />;

  return (
    <div className="flex flex-col mt-16">
      <TransactionsTable transactions={transactions} />
    </div>
  );
};

export default TransactionsPage;
