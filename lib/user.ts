import { database } from "./database";

export const getUserByEmail = async (email: string) => {
  try {
    const existingUser = await database.user.findUnique({
      where: {
        email,
      },
    });

    return existingUser;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const existingUser = await database.user.findUnique({
      where: {
        id,
      },
    });

    return existingUser;
  } catch {
    return null;
  }
};
