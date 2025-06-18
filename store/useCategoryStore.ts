import { create } from "zustand";

import {
  getCategoryById,
  getAllCategories,
  getCreateCategory,
} from "@/actions/category";
import { capitalize } from "@/lib/capitalize";
import { CategoriesFormFields, ICategoryData } from "@/types/categoryTypes";

type CategoriesSate = {
  isFetching: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;

  categories: ICategoryData[];

  // ASYNC ACTIONS
  createCategory: (data: CategoriesFormFields) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchCategoryById: (id: string) => Promise<ICategoryData | null>;

  // SYNC ACTIONS
  addCategory: (category: ICategoryData) => void;
};

export const useCategoryStore = create<CategoriesSate>()((set) => ({
  isFetching: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,

  categories: [],

  addCategory: (category) =>
    set((state) => ({
      categories: [...state.categories, category],
    })),

  createCategory: async (categoryData) => {
    set({ isCreating: true });

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
      set({ isCreating: false });
      console.error("Store: Error creating transaction:", error);
      throw error;
    }
  },

  fetchCategories: async () => {
    set({ isFetching: true });

    try {
      const categories = await getAllCategories();

      set({ categories, isFetching: false });
    } catch (error: unknown) {
      set({ isFetching: false });
      console.error("Store: Error fetching categories:", error);
      throw error;
    }
  },

  fetchCategoryById: async (id: string) => {
    set({ isFetching: true });

    try {
      const category = await getCategoryById(id);

      set({ isFetching: false });
      return category;
    } catch (error: unknown) {
      set({ isFetching: false });
      console.error(`Store: Error fetching category by id ${id}:`, error);
      throw error;
    }
  },
}));
