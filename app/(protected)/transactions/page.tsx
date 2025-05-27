"use client";

import { useEffect } from "react";
import { useCategoriesStore } from "@/store/categoriesStore";
import { useTransactionsStore } from "@/store/transactionStore";

const TransactionsPage = () => {
  const { categories, fetchCategories } = useCategoriesStore();
  const { transactions, fetchTransactions } = useTransactionsStore();

  useEffect(() => {
    fetchCategories();
    fetchTransactions();
  }, [fetchCategories, fetchTransactions]);

  return (
    <div className="flex flex-col gap-4 mt-16">
      <div className="flex gap-2">
        <h1>Транзакции:</h1>
        <pre>{JSON.stringify(transactions, null, 2)}</pre>
      </div>

      <div className="flex gap-2">
        <h2>Категории:</h2>
        <pre>{JSON.stringify(categories, null, 2)}</pre>
      </div>
    </div>
  );
};

export default TransactionsPage;
