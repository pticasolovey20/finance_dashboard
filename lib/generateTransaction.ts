import { faker } from "@faker-js/faker";

import {
  incomeCategories,
  expenseCategories,
} from "@/constants/transactionCategory";
import { ITransactionData } from "@/types/transactionTypes";
import { getCreateTransaction } from "@/actions/transaction";
import { useTransactionStore } from "@/store/useTransactionStore";
import { TransactionType, TransactionStatus } from "@prisma/client";

export const generateTransaction = (): ITransactionData => {
  const type = faker.helpers.arrayElement([
    TransactionType.expense,
    TransactionType.income,
  ]);

  const categoryId =
    type === TransactionType.expense
      ? faker.helpers.arrayElement(expenseCategories)
      : faker.helpers.arrayElement(incomeCategories);

  return {
    type,
    categoryId,

    id: faker.string.uuid(),
    status: faker.helpers.arrayElement([
      TransactionStatus.cancelled,
      TransactionStatus.completed,
      TransactionStatus.failed,
      TransactionStatus.pending,
    ]),

    amount: parseFloat(faker.finance.amount({ min: 5, max: 500, dec: 2 })),
    date: faker.date.past(),
    note: faker.lorem.sentence(),
  };
};

export const seedTransactions = async (count: number = 10) => {
  const createdTransactions = [];

  for (let index = 0; index < count; index++) {
    try {
      const generatedTransaction: ITransactionData = generateTransaction();
      const createdTransaction = await getCreateTransaction(
        generatedTransaction
      );

      useTransactionStore.getState().addTransaction(createdTransaction);
      createdTransactions.push(createdTransaction);
    } catch (error) {
      console.error(error);
    }
  }

  return createdTransactions;
};
