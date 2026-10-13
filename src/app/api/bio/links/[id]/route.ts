import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/database/client";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().max(60).optional(),
  url: z.string().url().optional(),
  icon: z.string().optional(),
  platform: z.string().optional(),
  active: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
  kind: z.enum(["link", "payment", "tip"]).optional(),
  amount: z.number().positive().nullable().optional(),
  currency: z.string().nullable().optional(),
  paymentMethod: z.string().nullable().optional(),
});

// PATCH - Modifier un lien bio
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = updateSchema.parse(body);

    const bioLink = await db.bioLink.findUnique({
      where: { id: params.id },
      include: { bioPage: { select: { userId: true } } },
    });

    if (!bioLink || bioLink.bioPage.userId !== session.user.id) {
      return NextResponse.json({ message: "Lien non trouvé" }, { status: 404 });
    }

    const updated = await db.bioLink.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json({ link: updated });
  } catch {
    return NextResponse.json({ message: "Erreur" }, { status: 400 });
  }
}

// DELETE - Supprimer un lien bio
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  const bioLink = await db.bioLink.findUnique({
    where: { id: params.id },
    include: { bioPage: { select: { userId: true } } },
  });

  if (!bioLink || bioLink.bioPage.userId !== session.user.id) {
    return NextResponse.json({ message: "Lien non trouvé" }, { status: 404 });
  }

  await db.bioLink.delete({ where: { id: params.id } });

  return NextResponse.json({ message: "Lien supprimé" });
}
