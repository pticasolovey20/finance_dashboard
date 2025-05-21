"use server";

import { getUserById } from "@/lib/user";
import { database } from "@/lib/database";
import { getCurrentUser } from "@/lib/auth";
import { AccountSettingsFormFields } from "@/types/acountSettings";

export const updateAccountSettings = async (
  values: AccountSettingsFormFields
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return { message: "User unauthenticated" };

    const existingUser = await getUserById(currentUser.id as string);
    if (!existingUser) return { message: "User not found" };

    await database.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        ...values,
      },
    });

    return { message: "Settings updated successfully" };
  } catch (error) {
    console.error("Error updating account settings:", error);
    return { message: "Something went wrong!" };
  }
};
