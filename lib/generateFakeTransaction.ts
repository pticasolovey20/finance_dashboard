import { faker } from "@faker-js/faker";
import { TransactionType } from "@prisma/client";
import { ITransactionData } from "@/types/transactionTypes";
import { addTransactionToDB } from "@/actions/transactions";

export const generateFakeTransaction = (): ITransactionData => {
  return {
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement([
      TransactionType.expense,
      TransactionType.income,
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
      const generatedTransaction = generateFakeTransaction();
      const createdTransaction = await addTransactionToDB(generatedTransaction);
      createdTransactions.push(createdTransaction);
    } catch (error) {
      console.error(error);
    }
  }

  return createdTransactions;
};
