import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "@/auth.config";
import { database } from "@/lib/database";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(database),

  session: {
    strategy: "jwt",
  },

  ...authConfig,
});
