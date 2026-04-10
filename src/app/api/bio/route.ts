import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { PLANS } from "@/lib/plans";

const updateSchema = z.object({
  title: z.string().max(60).optional(),
  description: z.string().max(160).optional(),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  bgColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  theme: z.string().optional(),
});

// GET - Récupérer la page bio
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  const bioPage = await db.bioPage.findUnique({
    where: { userId: session.user.id },
    include: {
      links: { orderBy: { order: "asc" } },
    },
  });

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

    // Vérifier les droits de personnalisation des couleurs
    const plan = session.user.plan as keyof typeof PLANS;
    const planLimits = PLANS[plan]?.limits;

    const bioPage = await db.bioPage.update({
      where: { userId: session.user.id },
      data,
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
