"use client";

import { useEffect } from "react";
import { useCategoriesStore } from "@/store/categoriesStore";
import { useTransactionsStore } from "@/store/transactionStore";

import CircleLoader from "@/components/CircleLoader";
import TransactionsTable from "@/components/transactions/TransactionsTable";

const TransactionsPage = () => {
  const { fetchCategories } = useCategoriesStore();
  const { fetchTransactions, isLoading, transactions } = useTransactionsStore();

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
