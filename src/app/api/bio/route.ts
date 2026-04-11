import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/database/client";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().max(60).optional(),
  description: z.string().max(300).optional(),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  bgColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  theme: z.string().optional(),
  avatar: z.string().nullable().optional(),
  bgImage: z.string().nullable().optional(),
  buttonStyle: z.string().optional(),
  fontStyle: z.string().optional(),
  socialLinks: z.string().nullable().optional(),
});

// GET - Récupérer la page bio
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  let bioPage = await db.bioPage.findUnique({
    where: { userId: session.user.id },
    include: {
      links: { orderBy: { order: "asc" } },
    },
  });

  // Auto-create bioPage for users who don't have one (e.g., OAuth users)
  if (!bioPage) {
    const user = await db.user.findUnique({ where: { id: session.user.id } });
    if (user) {
      bioPage = await db.bioPage.create({
        data: {
          userId: session.user.id,
          username: user.username,
          title: user.name || user.username,
          primaryColor: "#8F00FF",
          bgColor: "#FFFFFF",
          theme: "default",
        },
        include: { links: { orderBy: { order: "asc" } } },
      });
    }
  }

  return NextResponse.json({ bioPage });
}

// PATCH - Modifier la page bio
export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = updateSchema.parse(body);

    const user = await db.user.findUnique({ where: { id: session.user.id } });
    if (!user) {
      return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 });
    }

    const bioPage = await db.bioPage.upsert({
      where: { userId: session.user.id },
      update: data as any,
      create: {
        userId: session.user.id,
        username: user.username,
        title: data.title || user.name || user.username,
        description: data.description,
        primaryColor: data.primaryColor || "#8F00FF",
        bgColor: data.bgColor || "#FFFFFF",
        theme: data.theme || "default",
        buttonStyle: data.buttonStyle || "rounded",
        fontStyle: data.fontStyle || "sans",
      },
      include: { links: { orderBy: { order: "asc" } } },
    });

    return NextResponse.json({ bioPage });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Données invalides" }, { status: 400 });
    }
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
