import { faker } from "@faker-js/faker";
import { ITransactionData } from "@/types/transactionTypes";
import { getCreateTransaction } from "@/actions/transaction";
import { TransactionType, TransactionStatus } from "@prisma/client";
import { useTransactionStore } from "@/store/useTransactionStore";

export const generateFakeTransaction = (): ITransactionData => {
  return {
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement([
      TransactionType.expense,
      TransactionType.income,
    ]),
    status: faker.helpers.arrayElement([
      TransactionStatus.cancelled,
      TransactionStatus.completed,
      TransactionStatus.failed,
      TransactionStatus.pending,
    ]),
    amount: parseFloat(faker.finance.amount({ min: 5, max: 500, dec: 2 })),
    date: faker.date.past(),
    categoryId: "food",
    note: faker.lorem.sentence(),
  };
};

export const seedTransactions = async (count: number = 10) => {
  const createdTransactions = [];

  for (let index = 0; index < count; index++) {
    try {
      const generatedTransaction: ITransactionData = generateFakeTransaction();
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
