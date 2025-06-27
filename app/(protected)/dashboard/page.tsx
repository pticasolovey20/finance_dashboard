"use client";

import { useEffect } from "react";
import { useCategoryStore } from "@/store/useCategoryStore";

import PieCategoryChart from "@/components/chart/PieCategoryChart";

const DashboardPage = () => {
  const { fetchCategories, isFetching, categories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="mt-12">
      <PieCategoryChart categories={categories} isLoading={isFetching} />
    </div>
  );
};

export default DashboardPage;
