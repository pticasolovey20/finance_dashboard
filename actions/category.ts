"use server";

import { database } from "@/lib/database";
import { TransactionType } from "@prisma/client";
import { CategoriesFormFields } from "@/types/categoryTypes";

export const getCreateCategory = async (
  category: CategoriesFormFields & { categoryName: string }
) => {
  try {
    const createdCategory = await database.category.create({
      data: {
        categoryId: category.categoryId,
        categoryName: category.categoryName,
        type: category.type as TransactionType,
        color: category.color,
      },
    });

    return createdCategory;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const existingCategory = await database.category.findUnique({
      where: {
        categoryId: id,
      },
    });

    return existingCategory;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllCategories = async () => {
  try {
    const existingCategories = await database.category.findMany();
    return existingCategories;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
