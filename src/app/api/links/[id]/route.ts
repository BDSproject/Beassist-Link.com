import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/database/client";
import { PLANS } from "@/lib/plans";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().max(100).optional(),
  active: z.boolean().optional(),
  url: z.string().url().optional(),
  slug: z
    .string()
    .regex(/^[a-zA-Z0-9_-]+$/, "Uniquement lettres, chiffres, - et _")
    .min(2)
    .max(50)
    .optional(),
});

// PATCH - Modifier un lien
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  const link = await db.link.findUnique({
    where: { id: params.id },
  });

  if (!link || link.userId !== session.user.id) {
    return NextResponse.json({ message: "Lien non trouvé" }, { status: 404 });
  }

  try {
    const body = await req.json();
    const data = updateSchema.parse(body);

    // Vérifier les droits alias si le slug change
    if (data.slug && data.slug !== link.slug) {
      const plan = session.user.plan as keyof typeof PLANS;
      const planLimits = PLANS[plan]?.limits;
      if (!planLimits?.hasCustomAlias) {
        return NextResponse.json(
          { message: "Les alias personnalisés nécessitent un plan Starter ou Pro." },
          { status: 403 }
        );
      }
      const existing = await db.link.findUnique({ where: { slug: data.slug } });
      if (existing) {
        return NextResponse.json(
          { message: "Cet alias est déjà utilisé" },
          { status: 400 }
        );
      }
    }

    const updated = await db.link.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json({ link: updated });
  } catch (error) {
    return NextResponse.json({ message: "Données invalides" }, { status: 400 });
  }
}

// DELETE - Supprimer un lien
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  const link = await db.link.findUnique({
    where: { id: params.id },
  });

  if (!link || link.userId !== session.user.id) {
    return NextResponse.json({ message: "Lien non trouvé" }, { status: 404 });
  }

  await db.link.delete({ where: { id: params.id } });

  return NextResponse.json({ message: "Lien supprimé" });
}
