import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/database/client";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().max(100).optional(),
  active: z.boolean().optional(),
  url: z.string().url().optional(),
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
