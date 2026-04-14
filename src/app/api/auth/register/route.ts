import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { z } from "zod";
import { db } from "@/database/client";
import { sendVerificationEmail } from "@/lib/email";

const schema = z.object({
  name: z.string().min(2),
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-z0-9_.-]+$/),
  email: z.string().email(),
  password: z.string().min(8),
});

// Noms d'utilisateur réservés
const RESERVED_USERNAMES = [
  "admin", "api", "app", "dashboard", "login", "register",
  "billing", "analytics", "settings", "bio", "links", "r",
  "about", "pricing", "help", "support", "blog", "terms",
  "privacy", "contact", "legal", "beassistlink",
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // Vérifier si le nom d'utilisateur est réservé
    if (RESERVED_USERNAMES.includes(data.username.toLowerCase())) {
      return NextResponse.json(
        { message: "Ce nom d'utilisateur est réservé" },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà
    const existingEmail = await db.user.findUnique({
      where: { email: data.email },
    });
    if (existingEmail) {
      return NextResponse.json(
        { message: "Cet email est déjà utilisé" },
        { status: 400 }
      );
    }

    // Vérifier si le nom d'utilisateur existe déjà
    const existingUsername = await db.user.findUnique({
      where: { username: data.username },
    });
    if (existingUsername) {
      return NextResponse.json(
        { message: "Ce nom d'utilisateur est déjà pris" },
        { status: 400 }
      );
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(data.password, 12);

    // Créer l'utilisateur
    const user = await db.user.create({
      data: {
        name: data.name,
        username: data.username.toLowerCase(),
        email: data.email,
        password: hashedPassword,
        plan: "FREE",
        // Créer la page bio par défaut
        bioPage: {
          create: {
            username: data.username.toLowerCase(),
            title: data.name,
            primaryColor: "#8F00FF",
            bgColor: "#FFFFFF",
            theme: "default",
          },
        },
        // Créer l'abonnement FREE par défaut
        subscription: {
          create: {
            plan: "FREE",
            status: "ACTIVE",
          },
        },
      },
      select: { id: true, email: true, username: true },
    });

    // Envoi email de vérification (fire-and-forget)
    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    await db.verificationToken.create({
      data: {
        identifier: user.email,
        token,
        expires,
      },
    });

    void sendVerificationEmail({ name: data.name, email: user.email, token });

    return NextResponse.json(
      { message: "Compte créé. Vérifiez votre email.", needsVerification: true },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Données invalides", errors: error.errors },
        { status: 400 }
      );
    }
    console.error("Register error:", error);
    return NextResponse.json(
      { message: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}
