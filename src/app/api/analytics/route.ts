import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/database/client";

// GET /api/analytics?start=ISO&end=ISO&groupBy=day|month|year
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const startParam = url.searchParams.get("start");
    const endParam = url.searchParams.get("end");
    const groupBy = url.searchParams.get("groupBy") || "day"; // day|month|year

    const userId = session.user.id;

    const user = await db.user.findUnique({
      where: { id: userId },
      select: { plan: true },
    });

    const hasPaidAnalytics = user?.plan === "STARTER" || user?.plan === "PRO";
    if (!hasPaidAnalytics) {
      return NextResponse.json(
        { message: "Fonctionnalité disponible à partir du plan Starter" },
        { status: 403 }
      );
    }

    const start = startParam ? new Date(startParam) : new Date(new Date().getFullYear(), 0, 1);
    const end = endParam ? new Date(endParam) : new Date();

    // totals (selected period)
    const totalClicks = await db.analytics.count({
      where: { userId, type: "link_click", createdAt: { gte: start, lt: end } },
    });

    // bio views (selected period)
    const bioViews = await db.analytics.count({
      where: { userId, type: "bio_view", createdAt: { gte: start, lt: end } },
    });

    // bio clicks (selected period)
    const bioClicks = await db.analytics.count({
      where: { userId, type: "bio_click", createdAt: { gte: start, lt: end } },
    });

    // totals (all-time history)
    const [allTimeClicks, allTimeBioViews, allTimeLinksCount, allTimeBioClicksAgg] = await Promise.all([
      db.analytics.count({ where: { userId, type: "link_click" } }),
      db.analytics.count({ where: { userId, type: "bio_view" } }),
      db.link.count({ where: { userId } }),
      db.analytics.count({ where: { userId, type: "bio_click" } }),
    ]);

    // top links (by analytics events)
    const topLinksRaw = await db.analytics.groupBy({
      by: ["linkId"],
      where: { userId, linkId: { not: null }, createdAt: { gte: start, lt: end } },
      _count: { linkId: true },
      orderBy: { _count: { linkId: "desc" } },
      take: 6,
    });

    const linkIds = topLinksRaw.map((r) => r.linkId).filter(Boolean) as string[];
    const links = linkIds.length
      ? await db.link.findMany({ where: { id: { in: linkIds } } })
      : [];

    const topLinks = topLinksRaw.map((r) => ({
      linkId: r.linkId,
      count: r._count.linkId,
      link: links.find((l) => l.id === r.linkId) || null,
    }));

    const topBioRaw = await db.analytics.groupBy({
      by: ["os"],
      where: {
        userId,
        type: "bio_click",
        os: { startsWith: "bioLink:" },
        createdAt: { gte: start, lt: end },
      },
      _count: { os: true },
      orderBy: { _count: { os: "desc" } },
      take: 6,
    });

    const bioLinkIds = topBioRaw
      .map((r) => (r.os || "").replace("bioLink:", ""))
      .filter(Boolean);

    const bioLinks = bioLinkIds.length
      ? await db.bioLink.findMany({ where: { id: { in: bioLinkIds } } })
      : [];

    const topBioLinks = topBioRaw.map((r) => {
      const id = (r.os || "").replace("bioLink:", "");
      const link = bioLinks.find((b) => b.id === id);
      return {
        title: link?.title || "Lien supprimé",
        clicks: r._count.os,
      };
    });

    // top countries
    const topCountries = await db.analytics.groupBy({
      by: ["country"],
      where: { userId, country: { not: null }, createdAt: { gte: start, lt: end } },
      _count: { country: true },
      orderBy: { _count: { country: "desc" } },
      take: 6,
    });

    // top devices
    const topDevices = await db.analytics.groupBy({
      by: ["device"],
      where: { userId, device: { not: null }, createdAt: { gte: start, lt: end } },
      _count: { device: true },
      orderBy: { _count: { device: "desc" } },
      take: 6,
    });

    // series by date_trunc using native query for Postgres
    const validGran = groupBy === "month" || groupBy === "year" ? groupBy : "day";
    const rows: Array<{ label: string; count: string }> = await db.$queryRaw`
      SELECT date_trunc(${validGran}, "createdAt") AS label, count(*)::text as count
      FROM "Analytics"
      WHERE "userId" = ${userId}
        AND "createdAt" >= ${start}
        AND "createdAt" < ${end}
      GROUP BY label
      ORDER BY label
    `;

    const series = rows.map((r) => ({ label: new Date(r.label).toISOString(), count: Number(r.count) }));

    return NextResponse.json({
      totalClicks,
      bioViews,
      bioClicks,
      topLinks,
      topBioLinks,
      topCountries,
      topDevices,
      series,
      allTime: {
        totalClicks: allTimeClicks,
        bioViews: allTimeBioViews,
        totalLinks: allTimeLinksCount,
        bioClicks: allTimeBioClicksAgg,
      },
    });
  } catch (error) {
    console.error("Analytics GET error:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
