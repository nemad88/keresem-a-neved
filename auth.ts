import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { prisma } from "./lib/prisma";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // pages: {
  //   signIn: "/auth/login",
  //   error: "/auth/error",
  // },
  callbacks: {
    async signIn({}) {
      return true;
    },
    async session({ session, token }) {
      // console.log("session", session);
      // console.log("token", token);

      return {
        ...session,
        user: { ...session.user, userId: token.sub, role: token.role },
      };
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
