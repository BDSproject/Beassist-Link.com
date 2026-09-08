import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/client";
import { getBrowserName, getDeviceType } from "@/lib/utils";

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

  const userAgent = req.headers.get("user-agent") || "";
  const referer = req.headers.get("referer") || "";
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0] || req.ip || "unknown";

  // Incrémenter les clics + tracer l'événement analytique daté
  Promise.all([
    db.bioLink.update({
      where: { id: bioLink.id },
      data: { clicks: { increment: 1 } },
    }),
    db.analytics.create({
      data: {
        userId: bioLink.bioPage.userId,
        bioPageId: bioLink.bioPageId,
        type: "bio_click",
        // marqueur pour pouvoir regrouper par bioLink dans l'API analytics
        os: `bioLink:${bioLink.id}`,
        device: getDeviceType(userAgent),
        browser: getBrowserName(userAgent),
        referrer: referer || undefined,
        ip,
      },
    }),
  ]).catch(console.error);

  return NextResponse.redirect(bioLink.url, { status: 302 });
}
