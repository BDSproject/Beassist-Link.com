import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { DashboardHomeContent } from "@/components/dashboard/dashboard-home-content";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const [totalLinksCount, totalClicksAgg, bioPage, recentLinks] =
    await Promise.all([
      db.link.count({ where: { userId: session.user.id } }),
      db.link.aggregate({
        where: { userId: session.user.id },
        _sum: { clicks: true },
      }),
      db.bioPage.findUnique({
        where: { userId: session.user.id },
        include: { links: { take: 3, orderBy: { order: "asc" } } },
      }),
      db.link.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  const activeLinksCount = recentLinks.filter((l) => l.active).length;

  return (
    <DashboardHomeContent
      userName={session.user.name ?? null}
      username={session.user.username ?? null}
      plan={session.user.plan || "FREE"}
      totalLinks={totalLinksCount}
      totalClicks={totalClicksAgg._sum.clicks || 0}
      bioViews={bioPage?.views || 0}
      activeLinksCount={activeLinksCount}
      recentLinks={recentLinks.map((l) => ({
        id: l.id,
        slug: l.slug,
        url: l.url,
        title: l.title ?? null,
        clicks: l.clicks,
        active: l.active,
      }))}
      bioPage={
        bioPage
          ? {
              title: bioPage.title ?? null,
              username: bioPage.username,
              views: bioPage.views,
              links: bioPage.links.map((bl) => ({
                id: bl.id,
                title: bl.title,
                icon: bl.icon ?? null,
                clicks: bl.clicks,
              })),
            }
          : null
      }
    />
  );
}