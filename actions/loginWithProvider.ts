"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

type ProviderType = "google" | "github";

export const loginWithProvider = async (provider: ProviderType) => {
  try {
    await signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    throw error;
  }
};
