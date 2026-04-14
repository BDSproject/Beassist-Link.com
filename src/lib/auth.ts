import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { db } from "@/database/client";

// Génère un username unique à partir d'un nom ou email
async function generateUsername(base: string): Promise<string> {
  const slug = base
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 20) || "user";

  const exists = await db.user.findUnique({ where: { username: slug } });
  if (!exists) return slug;

  let attempt: string;
  do {
    attempt = slug + Math.floor(1000 + Math.random() * 9000);
  } while (await db.user.findUnique({ where: { username: attempt } }));
  return attempt;
}

// Adapter custom : injecte un username auto lors de la création OAuth
const baseAdapter = PrismaAdapter(db) as any;
const customAdapter = {
  ...baseAdapter,
  createUser: async (data: any) => {
    const base =
      data.name?.split(" ")[0] ||
      data.email?.split("@")[0] ||
      "user";
    const username = await generateUsername(base);
    const user = await (baseAdapter.createUser as any)({ ...data, username, onboardingCompleted: false });
    // Create bioPage and subscription for OAuth users (credentials users get these at register)
    await Promise.all([
      db.bioPage.upsert({
        where: { userId: user.id },
        update: {},
        create: {
          userId: user.id,
          username,
          title: data.name || username,
          primaryColor: "#8F00FF",
          bgColor: "#FFFFFF",
          theme: "default",
        },
      }),
      db.subscription.upsert({
        where: { userId: user.id },
        update: {},
        create: {
          userId: user.id,
          plan: "FREE",
          status: "ACTIVE",
        },
      }),
    ]).catch(console.error);
    return user;
  },
};

export const authOptions: NextAuthOptions = {
  adapter: customAdapter,
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
        ]
      : []),
    ...(process.env.GITHUB_CLIENT_ID
      ? [
          GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
          }),
        ]
      : []),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) return null;

        if (!user.emailVerified) {
          throw new Error("EmailNotVerified");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          username: user.username,
          plan: user.plan,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.username = (user as any).username;
        token.plan = (user as any).plan;
        token.onboardingCompleted = (user as any).onboardingCompleted ?? true;
      }
      // Toujours rafraîchir le plan depuis la DB pour refléter tout changement
      // (upgrade, downgrade, reset admin) sans exiger une reconnexion
      if (token.id && !user) {
        const dbUser = await db.user.findUnique({
          where: { id: token.id as string },
          select: { username: true, plan: true, onboardingCompleted: true },
        });
        if (dbUser) {
          if (!token.username) token.username = dbUser.username;
          token.plan = dbUser.plan;
          token.onboardingCompleted = (dbUser as any).onboardingCompleted ?? true;
        }
      }
      if (trigger === "update" && session) {
        if (session.plan !== undefined) token.plan = session.plan;
        if (session.username !== undefined) token.username = session.username;
        if (session.name !== undefined) token.name = session.name;
        if (session.onboardingCompleted !== undefined) token.onboardingCompleted = session.onboardingCompleted;
        if (session.image !== undefined) token.picture = session.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.plan = token.plan;
        session.user.onboardingCompleted = token.onboardingCompleted ?? true;
        session.user.image = token.picture as string | null | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },
  secret: process.env.NEXTAUTH_SECRET,
};
