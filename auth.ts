import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "@/auth.config";
import { getUserById } from "@/lib/user";
import { UserRole } from "@prisma/client";
import { database } from "@/lib/database";
import { AuthRoutesEnum } from "./types/route";
import { getAccountByUserId } from "./lib/account";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: AuthRoutesEnum.LOGIN,
    error: AuthRoutesEnum.ERROR,
  },

  events: {
    async linkAccount({ user }) {
      await database.user.update({
        where: {
          id: user.id,
        },

        data: {
          emailVerified: new Date(),
        },
      });
    },
  },

  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.isOAuth = !!token.isOAuth;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as UserRole;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.firstName = existingUser.firstName;
      token.lastName = existingUser.lastName;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;

      return token;
    },
  },

  adapter: PrismaAdapter(database),

  session: {
    strategy: "jwt",
  },

  ...authConfig,
});
