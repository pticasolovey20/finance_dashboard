import { database } from "@/lib/database";

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await database.account.findFirst({
      where: {
        userId,
      },
    });

    return account;
  } catch {
    return null;
  }
};
