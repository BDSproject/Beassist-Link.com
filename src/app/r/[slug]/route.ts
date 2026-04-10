import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getBrowserName, getDeviceType } from "@/lib/utils";

// Route de redirection des liens courts
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const link = await db.link.findUnique({
    where: { slug: params.slug, active: true },
    include: { user: { select: { id: true } } },
  });

  if (!link) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Vérifier si le lien est expiré
  if (link.expiresAt && link.expiresAt < new Date()) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Mettre à jour le compteur de clics en arrière-plan
  const userAgent = req.headers.get("user-agent") || "";
  const referer = req.headers.get("referer") || "";
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0] || req.ip || "unknown";

  // Incrémenter les clics (fire-and-forget)
  Promise.all([
    db.link.update({
      where: { id: link.id },
      data: { clicks: { increment: 1 } },
    }),
    db.analytics.create({
      data: {
        userId: link.userId,
        linkId: link.id,
        type: "link_click",
        device: getDeviceType(userAgent),
        browser: getBrowserName(userAgent),
        referrer: referer || undefined,
        ip,
      },
    }),
  ]).catch(console.error);

  // Redirection 301 (permanente, mise en cache)
  return NextResponse.redirect(link.url, { status: 301 });
}
