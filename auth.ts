import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "@/auth.config";
import { getUserById } from "@/lib/user";
import { UserRole } from "@prisma/client";
import { database } from "@/lib/database";

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.firstName && session.user) {
        session.user.firstName = token.firstName as string;
      }

      if (token.lastName && session.user) {
        session.user.lastName = token.lastName as string;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.firstName = existingUser.firstName;
      token.lastName = existingUser.lastName;
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
