import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { PLANS } from "@/lib/plans";

const linkSchema = z.object({
  title: z.string().min(1).max(60),
  url: z.string().url(),
  icon: z.string().max(4).optional(),
  platform: z.string().optional(),
  order: z.number().int().min(0).optional(),
});

// POST - Ajouter un lien bio
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = linkSchema.parse(body);

    // Vérifier les limites du plan
    const plan = session.user.plan as keyof typeof PLANS;
    const planLimits = PLANS[plan]?.limits;

    const bioPage = await db.bioPage.findUnique({
      where: { userId: session.user.id },
      include: { _count: { select: { links: true } } },
    });

    if (!bioPage) {
      return NextResponse.json({ message: "Page bio non trouvée" }, { status: 404 });
    }

    if (
      planLimits?.maxBioLinks !== -1 &&
      bioPage._count.links >= (planLimits?.maxBioLinks || 5)
    ) {
      return NextResponse.json(
        { message: `Limite de liens bio atteinte (${planLimits?.maxBioLinks}). Passez au plan supérieur.` },
        { status: 403 }
      );
    }

    const link = await db.bioLink.create({
      data: {
        bioPageId: bioPage.id,
        title: data.title,
        url: data.url,
        icon: data.icon,
        platform: data.platform,
        order: data.order ?? bioPage._count.links,
      },
    });

    return NextResponse.json({ link }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Données invalides" }, { status: 400 });
    }
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

// GET - Récupérer les liens bio
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

  return NextResponse.json({ links: bioPage?.links || [] });
}
