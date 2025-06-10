"use server";

import { signIn } from "@/auth";
import { ProviderType } from "@/types/authTypes";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const loginWithProvider = async (provider: ProviderType) => {
  try {
    await signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    throw error;
  }
};
