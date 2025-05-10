import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

const authConfig = {
  providers: [Google],
} satisfies NextAuthConfig;

export default authConfig;
