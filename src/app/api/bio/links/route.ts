import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/database/client";
import { z } from "zod";
import { PLANS } from "@/lib/plans";

const linkSchema = z.object({
  title: z.string().min(1).max(60),
  url: z.string().url(),
  icon: z.string().optional(),
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

    let bioPage = await db.bioPage.findUnique({
      where: { userId: session.user.id },
      include: { _count: { select: { links: true } } },
    });

    // Auto-create bioPage if missing (OAuth users)
    if (!bioPage) {
      const user = await db.user.findUnique({ where: { id: session.user.id } });
      if (!user) {
        return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 });
      }
      bioPage = await db.bioPage.create({
        data: {
          userId: session.user.id,
          username: user.username,
          title: user.name || user.username,
          primaryColor: "#8F00FF",
          bgColor: "#FFFFFF",
          theme: "default",
        },
        include: { _count: { select: { links: true } } },
      });
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

// PATCH - Réordonner les liens bio
export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const items = z.array(z.object({ id: z.string(), order: z.number().int().min(0) })).parse(body);

    // Vérifier que tous les liens appartiennent bien à l'utilisateur
    const bioPage = await db.bioPage.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });
    if (!bioPage) return NextResponse.json({ message: "Page introuvable" }, { status: 404 });

    await Promise.all(
      items.map((item) =>
        db.bioLink.updateMany({
          where: { id: item.id, bioPageId: bioPage.id },
          data: { order: item.order },
        })
      )
    );

    return NextResponse.json({ ok: true });
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
