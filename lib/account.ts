import { database } from "@/lib/database";
import { ExtendedUser } from "@/next-auth";

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

export const getFullName = (user?: ExtendedUser, placeholder = "John Doe") => {
  if (!user) return placeholder;

  if (user.isOAuth && user.name) {
    return user.name;
  }

  const firstName = user.firstName ?? "";
  const lastName = user.lastName ?? "";

  const fullName = `${firstName} ${lastName}`.trim();

  return fullName || placeholder;
};
