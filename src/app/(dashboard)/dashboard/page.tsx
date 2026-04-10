import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Link2,
  FileText,
  BarChart3,
  MousePointerClick,
  Eye,
  TrendingUp,
  ArrowRight,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNumber, formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  // Statistiques
  const [totalLinks, totalClicks, bioPage, recentLinks] = await Promise.all([
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

  const stats = [
    {
      label: "Liens raccourcis",
      value: formatNumber(totalLinks),
      icon: Link2,
      color: "#8F00FF",
      bg: "#F5EBFF",
      href: "/dashboard/links",
    },
    {
      label: "Clics totaux",
      value: formatNumber(totalClicks._sum.clicks || 0),
      icon: MousePointerClick,
      color: "#10B981",
      bg: "#ECFDF5",
      href: "/dashboard/analytics",
    },
    {
      label: "Vues bio page",
      value: formatNumber(bioPage?.views || 0),
      icon: Eye,
      color: "#3B82F6",
      bg: "#EFF6FF",
      href: "/dashboard/bio",
    },
    {
      label: "Liens actifs",
      value: formatNumber(recentLinks.filter((l) => l.active).length),
      icon: TrendingUp,
      color: "#F59E0B",
      bg: "#FFFBEB",
      href: "/dashboard/links",
    },
  ];

  const plan = session.user.plan;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            Bonjour, {session.user.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-gray-500 mt-1">
            {new Date().toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/links">
            <Button variant="outline" size="md">
              <Plus size={16} />
              Nouveau lien
            </Button>
          </Link>
          <Link href={`/${session.user.username}`} target="_blank">
            <Button variant="primary" size="md">
              Ma page bio
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>

      {/* Bannière plan FREE */}
      {plan === "FREE" && (
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#F5EBFF] to-[#EAD6FF] border border-[#D4ADFF] flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-[#8F00FF]">
              ✨ Passez au plan Starter
            </p>
            <p className="text-sm text-gray-600 mt-0.5">
              Débloquez les analytiques, QR codes, thèmes premium et plus encore
              pour seulement 5€/mois.
            </p>
          </div>
          <Link href="/dashboard/billing" className="flex-shrink-0">
            <Button variant="primary" size="sm">
              Upgrader
            </Button>
          </Link>
        </div>
      )}

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href}>
              <Card hover padding="md" className="group">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-2">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-black text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: stat.bg }}
                  >
                    <Icon size={18} style={{ color: stat.color }} />
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Liens récents */}
        <Card padding="none">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Liens récents</h2>
            <Link href="/dashboard/links">
              <Button variant="ghost" size="sm">
                Voir tout <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
          <div>
            {recentLinks.length === 0 ? (
              <div className="p-8 text-center">
                <Link2 size={32} className="mx-auto text-gray-300 mb-3" />
                <p className="text-sm text-gray-500">
                  Aucun lien créé pour l&apos;instant
                </p>
                <Link href="/dashboard/links">
                  <Button variant="primary" size="sm" className="mt-3">
                    Créer mon premier lien
                  </Button>
                </Link>
              </div>
            ) : (
              recentLinks.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between px-6 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {link.title || link.slug}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">
                      {link.url}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                    <span className="text-sm font-bold text-gray-700">
                      {formatNumber(link.clicks)}
                    </span>
                    <Badge variant={link.active ? "success" : "gray"} size="sm">
                      {link.active ? "Actif" : "Inactif"}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Page bio */}
        <Card padding="none">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Page bio</h2>
            <Link href="/dashboard/bio">
              <Button variant="ghost" size="sm">
                Modifier <ArrowRight size={14} />
              </Button>
            </Link>
          </div>

          {bioPage ? (
            <div className="p-6">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#8F00FF] to-[#6200CC] flex items-center justify-center text-white text-xl font-black">
                  {(bioPage.title || session.user.name || "U")[0].toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">
                    {bioPage.title || session.user.name}
                  </h3>
                  <Link
                    href={`/${bioPage.username}`}
                    target="_blank"
                    className="text-sm text-[#8F00FF] hover:underline"
                  >
                    beassistlink.com/{bioPage.username}
                  </Link>
                </div>
              </div>

              <div className="space-y-2">
                {bioPage.links.map((link) => (
                  <div
                    key={link.id}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-gray-100 bg-gray-50"
                  >
                    <span className="text-sm">{link.icon || "🔗"}</span>
                    <span className="text-sm font-medium text-gray-700 flex-1 truncate">
                      {link.title}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatNumber(link.clicks)} clics
                    </span>
                  </div>
                ))}
              </div>

              {bioPage.links.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-sm text-gray-500">
                    Aucun lien sur votre page bio
                  </p>
                  <Link href="/dashboard/bio">
                    <Button variant="primary" size="sm" className="mt-3">
                      Ajouter des liens
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center">
              <FileText size={32} className="mx-auto text-gray-300 mb-3" />
              <p className="text-sm text-gray-500">
                Votre page bio n&apos;est pas encore configurée
              </p>
              <Link href="/dashboard/bio">
                <Button variant="primary" size="sm" className="mt-3">
                  Créer ma page bio
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
