"use client";

import { useEffect } from "react";
import { useCategoryStore } from "@/store/useCategoryStore";

import ChartExample from "@/components/chart/ChartExample";

const DashboardPage = () => {
  const { fetchCategories, isFetching, categories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="mt-12">
      <ChartExample categories={categories} isLoading={isFetching} />
    </div>
  );
};

export default DashboardPage;
