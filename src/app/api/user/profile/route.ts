import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/database/client";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(100),
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_-]+$/),
  email: z.string().email(),
  image: z.string().nullable().optional(),
});

const RESERVED_USERNAMES = [
  "admin", "api", "www", "mail", "support", "help", "billing",
  "dashboard", "login", "register", "signup", "settings", "profile",
  "beassistlink", "app", "dev", "r", "u",
];

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, username, email, image } = schema.parse(body);

    if (RESERVED_USERNAMES.includes(username.toLowerCase())) {
      return NextResponse.json(
        { message: "Ce nom d'utilisateur est réservé" },
        { status: 400 }
      );
    }

    // Check username uniqueness
    if (username !== session.user.username) {
      const existing = await db.user.findUnique({ where: { username } });
      if (existing) {
        return NextResponse.json(
          { message: "Ce nom d'utilisateur est déjà pris" },
          { status: 409 }
        );
      }
    }

    // Check email uniqueness
    if (email !== session.user.email) {
      const existing = await db.user.findUnique({ where: { email } });
      if (existing) {
        return NextResponse.json(
          { message: "Cet email est déjà utilisé" },
          { status: 409 }
        );
      }
    }

    const updated = await db.user.update({
      where: { id: session.user.id },
      data: {
        name,
        username,
        email,
        ...(image !== undefined ? { image } : {}),
      },
    });

    // Update bioPage username if username changed
    if (username !== session.user.username) {
      await db.bioPage.updateMany({
        where: { userId: session.user.id },
        data: { username },
      });
    }

    return NextResponse.json({
      user: { id: updated.id, name: updated.name, username: updated.username, email: updated.email, image: updated.image },
    });
  } catch {
    return NextResponse.json({ message: "Erreur" }, { status: 400 });
  }
}
