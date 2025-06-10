"use server";

import { database } from "@/lib/database";

export const getCategoryById = async (id: string) => {
  try {
    const existingCategory = await database.category.findUnique({
      where: {
        id,
      },
    });

    return existingCategory;
  } catch {
    return null;
  }
};

export const getAllCategories = async () => {
  try {
    const existingCategories = await database.category.findMany();
    return existingCategories;
  } catch {
    return null;
  }
};
