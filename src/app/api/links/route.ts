import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { PLANS } from "@/lib/plans";
import { generateSlug, isValidUrl } from "@/lib/utils";
import { z } from "zod";

const createSchema = z.object({
  url: z.string().url(),
  title: z.string().max(100).optional(),
  slug: z
    .string()
    .regex(/^[a-zA-Z0-9_-]*$/)
    .min(2)
    .max(50)
    .optional(),
});

// GET - Récupérer tous les liens de l'utilisateur
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  const links = await db.link.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ links });
}

// POST - Créer un nouveau lien
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = createSchema.parse(body);

    // Vérifier les limites du plan
    const plan = session.user.plan as keyof typeof PLANS;
    const planLimits = PLANS[plan]?.limits;
    const linkCount = await db.link.count({
      where: { userId: session.user.id },
    });

    if (
      planLimits?.maxShortLinks !== -1 &&
      linkCount >= (planLimits?.maxShortLinks || 3)
    ) {
      return NextResponse.json(
        {
          message: `Limite de liens atteinte pour votre plan ${plan}. Passez au plan supérieur.`,
        },
        { status: 403 }
      );
    }

    // Vérifier si l'alias personnalisé est autorisé
    if (data.slug && !planLimits?.hasCustomAlias) {
      return NextResponse.json(
        {
          message:
            "Les alias personnalisés nécessitent un plan Starter ou Pro.",
        },
        { status: 403 }
      );
    }

    // Générer ou valider le slug
    let slug = data.slug || generateSlug(7);

    // Vérifier l'unicité du slug
    let attempts = 0;
    while (attempts < 10) {
      const existing = await db.link.findUnique({ where: { slug } });
      if (!existing) break;
      if (data.slug) {
        return NextResponse.json(
          { message: "Cet alias est déjà utilisé" },
          { status: 400 }
        );
      }
      slug = generateSlug(7);
      attempts++;
    }

    const link = await db.link.create({
      data: {
        userId: session.user.id,
        slug,
        url: data.url,
        title: data.title,
      },
    });

    return NextResponse.json({ link }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Données invalides", errors: error.errors },
        { status: 400 }
      );
    }
    console.error("Link creation error:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
