import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

import { getUserByEmail } from "@/lib/user";
import { LoginSchema } from "@/schemas/authSchema";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const existingUser = await getUserByEmail(email);
          if (!existingUser || !existingUser.password) return null;

          const isPasswordMatch = await bcrypt.compare(
            password,
            existingUser.password
          );

          if (isPasswordMatch) return existingUser;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

export default authConfig;
