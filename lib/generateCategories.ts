import { faker } from "@faker-js/faker";

import { TransactionType } from "@prisma/client";
import { ICategoryData } from "@/types/categoryTypes";
import { getCreateCategory } from "@/actions/category";
import { expenseCategories } from "@/constants/transactionCategory";

export const generateCategory = (categoryId: string): ICategoryData => {
  const categoryName = categoryId.charAt(0).toUpperCase() + categoryId.slice(1);

  const type = expenseCategories.includes(categoryId)
    ? TransactionType.expense
    : TransactionType.income;

  return {
    type,
    categoryId,
    categoryName,
    color: faker.color.rgb(),
  };
};

export const seedCategories = async (categories: string[]) => {
  const createdCategories = [];
  const count = categories.length;

  for (let index = 0; index < count; index++) {
    try {
      const generatedCategory = generateCategory(categories[index]);
      const createdCategory = await getCreateCategory(generatedCategory);

      createdCategories.push(createdCategory);
    } catch (error) {
      console.error(error);
    }
  }

  return createdCategories;
};
