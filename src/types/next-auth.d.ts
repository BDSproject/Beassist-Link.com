import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      plan: string;
      onboardingCompleted: boolean;
      company?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    username?: string;
    plan?: string;
    onboardingCompleted?: boolean;
    company?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    plan: string;
    onboardingCompleted: boolean;
  }
}
