import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/client";

// Enregistre un clic sur un lien bio et redirige
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const bioLink = await db.bioLink.findUnique({
    where: { id: params.id },
    include: { bioPage: { select: { userId: true } } },
  });

  if (!bioLink) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Incrémenter les clics
  db.bioLink
    .update({
      where: { id: bioLink.id },
      data: { clicks: { increment: 1 } },
    })
    .catch(console.error);

  return NextResponse.redirect(bioLink.url, { status: 302 });
}
