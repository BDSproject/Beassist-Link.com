"use client";

import Link from "next/link";
import {
  Link2,
  FileText,
  MousePointerClick,
  Eye,
  TrendingUp,
  ArrowRight,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";
import { SocialIcon } from "@/components/ui/social-icon";

interface BioLink {
  id: string;
  title: string;
  icon: string | null;
  platform: string | null;
  clicks: number;
}

interface BioPageData {
  title: string | null;
  username: string;
  views: number;
  links: BioLink[];
}

interface RecentLink {
  id: string;
  slug: string;
  url: string;
  title: string | null;
  clicks: number;
  active: boolean;
}

interface Props {
  userName: string | null;
  username: string | null;
  plan: string;
  totalLinks: number;
  totalClicks: number;
  bioViews: number;
  activeLinksCount: number;
  recentLinks: RecentLink[];
  bioPage: BioPageData | null;
}

export function DashboardHomeContent({
  userName,
  username,
  plan,
  totalLinks,
  totalClicks,
  bioViews,
  activeLinksCount,
  recentLinks,
  bioPage,
}: Props) {
  const { t, lang } = useLanguage();
  const d = t.dashboard.home;

  const greeting = d.greeting.replace("{name}", username || userName?.split(" ")[0] || "");

  const dateStr = new Date().toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const stats = [
    {
      label: t.dashboard.home.stats.links,
      value: formatNumber(totalLinks),
      icon: Link2,
      color: "#8F00FF",
      bg: "#F5EBFF",
      href: "/dashboard/links",
    },
    {
      label: t.dashboard.home.stats.clicks,
      value: formatNumber(totalClicks),
      icon: MousePointerClick,
      color: "#10B981",
      bg: "#ECFDF5",
      href: "/dashboard/analytics",
    },
    {
      label: t.dashboard.home.stats.bioViews,
      value: formatNumber(bioViews),
      icon: Eye,
      color: "#3B82F6",
      bg: "#EFF6FF",
      href: "/dashboard/bio",
    },
    {
      label: t.dashboard.home.stats.activeLinks,
      value: formatNumber(activeLinksCount),
      icon: TrendingUp,
      color: "#F59E0B",
      bg: "#FFFBEB",
      href: "/dashboard/links",
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900">{greeting}</h1>
          <p className="text-gray-500 mt-1 capitalize">{dateStr}</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/links">
            <Button variant="outline" size="md">
              <Plus size={16} />
              {t.dashboard.links.newLink}
            </Button>
          </Link>
          {username && (
            <Link href={`/${username}`} target="_blank">
              <Button variant="primary" size="md">
                {d.bioPage}
                <ArrowRight size={16} />
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* FREE plan upgrade banner */}
      {plan === "FREE" && (
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#F5EBFF] to-[#EAD6FF] border border-[#D4ADFF] flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-[#8F00FF]">{d.upgradeTitle}</p>
            <p className="text-sm text-gray-600 mt-0.5">{d.upgradeDesc}</p>
          </div>
          <Link href="/dashboard/billing" className="flex-shrink-0">
            <Button variant="primary" size="sm">
              {d.upgradeBtn}
            </Button>
          </Link>
        </div>
      )}

      {/* Stats grid */}
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
        {/* Recent links */}
        <Card padding="none">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">{d.recentLinks}</h2>
            <Link href="/dashboard/links">
              <Button variant="ghost" size="sm">
                {d.viewAll} <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
          <div>
            {recentLinks.length === 0 ? (
              <div className="p-8 text-center">
                <Link2 size={32} className="mx-auto text-gray-300 mb-3" />
                <p className="text-sm text-gray-500">{d.noLinks}</p>
                <Link href="/dashboard/links">
                  <Button variant="primary" size="sm" className="mt-3">
                    {d.createFirstLink}
                  </Button>
                </Link>
              </div>
            ) : (
              recentLinks.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between px-6 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 w-0 min-w-0">
                    <div className="overflow-x-auto scrollbar-none">
                      <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                        {link.title || link.slug}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 whitespace-nowrap">
                        {link.url}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                    <span className="text-sm font-bold text-gray-700">
                      {formatNumber(link.clicks)}
                    </span>
                    <Badge variant={link.active ? "success" : "gray"} size="sm">
                      {link.active ? d.active : d.inactive}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Bio page */}
        <Card padding="none">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">{d.bioPage}</h2>
            <Link href="/dashboard/bio">
              <Button variant="ghost" size="sm">
                {d.edit} <ArrowRight size={14} />
              </Button>
            </Link>
          </div>

          {bioPage ? (
            <div className="p-6">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#8F00FF] to-[#6200CC] flex items-center justify-center text-white text-xl font-black">
                  {(bioPage.title || userName || "U")[0].toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">
                    {bioPage.title || userName}
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
                    <SocialIcon platform={link.platform || "other"} size={16} />
                    <span className="text-sm font-medium text-gray-700 flex-1 truncate">
                      {link.title}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatNumber(link.clicks)} {d.clicks}
                    </span>
                  </div>
                ))}
              </div>

              {bioPage.links.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-sm text-gray-500">{d.noBioLinks}</p>
                  <Link href="/dashboard/bio">
                    <Button variant="primary" size="sm" className="mt-3">
                      {d.addLinks}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center">
              <FileText size={32} className="mx-auto text-gray-300 mb-3" />
              <p className="text-sm text-gray-500">{d.bioNotSetup}</p>
              <Link href="/dashboard/bio">
                <Button variant="primary" size="sm" className="mt-3">
                  {d.createBio}
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
