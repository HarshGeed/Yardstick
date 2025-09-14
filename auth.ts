// app/api/auth/[...nextauth]/auth.ts
import NextAuth from "next-auth";
// import type { NextAuthOptions } from "next-auth/core/types";
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "@/lib/dbConn";
import { User } from "@/models/User";


export const authOptions: any = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };
        if (!email || !password) {
          throw new Error("Email and password are required");
        }
        await connect();
        const user = await User.findOne({ email }).select("+password");
        if (!user) throw new Error("Invalid email or password");
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) throw new Error("Invalid email or password");
        return { id: user._id?.toString?.() ?? "", email: user.email, role: user.role, tenantId: user.tenantId };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/login" },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth } = NextAuth(authOptions);
export const { GET, POST } = handlers;
