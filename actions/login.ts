"use server";

import * as zod from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas/authSchema";

export const login = async (values: zod.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email, password } = validatedFields.data;

  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return response;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credential!" };

        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
