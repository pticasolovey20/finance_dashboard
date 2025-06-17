import { create } from "zustand";

import {
  getCategoryById,
  getAllCategories,
  getCreateCategory,
} from "@/actions/category";
import { capitalize } from "@/lib/capitalize";
import { CategoriesFormFields, ICategoryData } from "@/types/categoryTypes";

type CategoriesSate = {
  isLoading: boolean;
  categories: ICategoryData[];

  // ASYNC ACTIONS
  createCategory: (data: CategoriesFormFields) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchCategoryById: (id: string) => Promise<ICategoryData | null>;

  // SYNC ACTIONS
  addCategory: (category: ICategoryData) => void;
};

export const useCategoryStore = create<CategoriesSate>()((set) => ({
  isLoading: false,
  categories: [],

  addCategory: (category) =>
    set((state) => ({
      categories: [...state.categories, category],
    })),

  createCategory: async (categoryData) => {
    set({ isLoading: true });

    try {
      const categoryName = capitalize(categoryData.categoryId);
      const createdCategory = await getCreateCategory({
        ...categoryData,
        categoryName,
      });

      set((state) => ({
        categories: [...state.categories, createdCategory],
        isLoading: false,
      }));
    } catch (error: unknown) {
      set({ isLoading: false });
      console.error("Store: Error creating transaction:", error);
      throw error;
    }
  },

  fetchCategories: async () => {
    set({ isLoading: true });

    try {
      const categories = await getAllCategories();

      set({ categories, isLoading: false });
    } catch (error: unknown) {
      set({ isLoading: false });
      console.error("Store: Error fetching categories:", error);
      throw error;
    }
  },

  fetchCategoryById: async (id: string) => {
    set({ isLoading: true });

    try {
      const category = await getCategoryById(id);

      set({ isLoading: false });
      return category;
    } catch (error: unknown) {
      set({ isLoading: false });
      console.error(`Store: Error fetching category by id ${id}:`, error);
      throw error;
    }
  },
}));
