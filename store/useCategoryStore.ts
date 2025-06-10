import { create } from "zustand";
import { ICategoryData } from "@/types/categoryTypes";
import { getAllCategories, getCategoryById } from "@/lib/category";

type CategoriesSate = {
  isLoading: boolean;
  categories: ICategoryData[];
  error: string | null;

  // ASYNC ACTIONS
  fetchCategories: () => Promise<void>;
  fetchCategoryById: (id: string) => Promise<ICategoryData | null>;

  // SYNC ACTIONS

  addCategory: (category: ICategoryData) => void;
  editCategory: (category: ICategoryData) => void;
  deleteCategory: (id: string) => void;
};

export const useCategoryStore = create<CategoriesSate>()((set) => ({
  isLoading: false,
  categories: [],
  error: null,

  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const categories = await getAllCategories();

      return categories
        ? set({ categories, isLoading: false })
        : set({ isLoading: false });
    } catch (error: unknown) {
      let message = "Something went wrong";
      if (error instanceof Error) message = error.message;

      set({ error: message, isLoading: false });
    }
  },

  fetchCategoryById: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      const transaction = await getCategoryById(id);
      set({ isLoading: false });

      return transaction ?? null;
    } catch (error: unknown) {
      let message = "Something went wrong";
      if (error instanceof Error) message = error.message;

      set({ error: message, isLoading: false });

      return null;
    }
  },

  addCategory: (category) =>
    set((state) => ({
      categories: [...state.categories, category],
    })),

  editCategory: (updated) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === updated.id ? updated : category
      ),
    })),

  deleteCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    })),
}));
