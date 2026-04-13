"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  BarChart2,
  MousePointerClick,
  Globe,
  TrendingUp,
  Lock,
  ArrowUpRight,
  Link2,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";
import { usePlan } from "@/hooks/use-plan";

interface LinkStat {
  id: string;
  title: string;
  slug: string;
  clicks: number;
  url: string;
}

interface BioStat {
  title: string;
  views: number;
  links: { title: string; clicks: number }[];
}

export default function AnalyticsPage() {
  const { data: session } = useSession();
  const { t } = useLanguage();
  const d = t.dashboard.analytics;
  const [links, setLinks] = useState<LinkStat[]>([]);
  const [bio, setBio] = useState<BioStat | null>(null);
  const [loading, setLoading] = useState(true);

  const { plan: dbPlan } = usePlan();
  const isPro = dbPlan === "STARTER" || dbPlan === "PRO";

  const fetchData = useCallback(async () => {
    try {
      const [linksRes, bioRes, bioLinksRes] = await Promise.all([
        fetch("/api/links"),
        fetch("/api/bio"),
        fetch("/api/bio/links"),
      ]);
      const linksData = await linksRes.json();
      const bioData = await bioRes.json();
      const bioLinksData = await bioLinksRes.json();

      setLinks(linksData.links || []);
      if (bioData.bioPage) {
        setBio({
          title: bioData.bioPage.title,
          views: bioData.bioPage.views || 0,
          links: bioLinksData.links || [],
        });
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalClicks = links.reduce((acc, l) => acc + l.clicks, 0);
  const totalBioClicks =
    bio?.links.reduce((acc, l) => acc + l.clicks, 0) ?? 0;
  const topLink = [...links].sort((a, b) => b.clicks - a.clicks)[0];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-[#8F00FF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Free plan - show upgrade wall
  if (!isPro) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{d.title}</h1>
          <p className="text-gray-500 mt-1">
            {d.subtitle}
          </p>
        </div>

        {/* Blurred preview */}
        <div className="relative">
          {/* Fake stats blurred */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 blur-sm pointer-events-none select-none">
            {[
              { label: d.totalClicks, value: "1,247", icon: MousePointerClick },
              { label: d.bioViews, value: "3,891", icon: Eye },
              { label: d.totalLinks, value: "Instagram", icon: TrendingUp },
            ].map((stat) => (
              <Card key={stat.label} className="p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#8F00FF]/10 rounded-xl flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-[#8F00FF]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Upgrade overlay */}
          <div className="absolute inset-0 flex items-start justify-center pt-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center max-w-sm mx-4">
              <div className="w-14 h-14 bg-[#8F00FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-7 h-7 text-[#8F00FF]" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {d.upgradeTitle}
              </h2>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                {d.upgradeDesc}
              </p>
              <a href="/dashboard/billing">
                <Button
                  fullWidth
                  style={{ backgroundColor: "#8F00FF" }}
                  className="text-white hover:opacity-90"
                >
                  {d.upgradeBtn}
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </a>
              <p className="text-xs text-gray-400 mt-3">
                {d.upgradePrice}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{d.title}</h1>
          <p className="text-gray-500 mt-1">
            {d.subtitlePro}
          </p>
        </div>
        <Badge
          variant={session?.user?.plan === "PRO" ? "primary" : "outline"}
        >
          Plan {session?.user?.plan}
        </Badge>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: d.totalClicks,
            value: formatNumber(totalClicks),
            icon: MousePointerClick,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: d.bioViews,
            value: formatNumber(bio?.views ?? 0),
            icon: Eye,
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
          {
            label: d.bioClicks,
            value: formatNumber(totalBioClicks),
            icon: Globe,
            color: "text-green-600",
            bg: "bg-green-50",
          },
          {
            label: d.totalLinks,
            value: formatNumber(links.length),
            icon: Link2,
            color: "text-orange-600",
            bg: "bg-orange-50",
          },
        ].map((stat) => (
          <Card key={stat.label} className="p-5">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}
              >
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 leading-tight">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top short links */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="w-5 h-5 text-[#8F00FF]" />
            <h3 className="font-semibold text-gray-900">{d.linkPerf}</h3>
          </div>
          {links.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Link2 className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">{d.noData}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {[...links]
                .sort((a, b) => b.clicks - a.clicks)
                .slice(0, 6)
                .map((link, i) => (
                  <div key={link.id} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-400 w-4">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-700 truncate">
                          {link.title || link.slug}
                        </p>
                        <span className="text-sm font-bold text-gray-900 ml-2">
                          {formatNumber(link.clicks)}
                        </span>
                      </div>
                      {/* Bar */}
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full bg-[#8F00FF]"
                          style={{
                            width:
                              topLink && topLink.clicks > 0
                                ? `${(link.clicks / topLink.clicks) * 100}%`
                                : "0%",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </Card>

        {/* Top bio links */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#8F00FF]" />
            <h3 className="font-semibold text-gray-900">{d.bioPerf}</h3>
          </div>
          {!bio || bio.links.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Globe className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">{d.noData}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {[...bio.links]
                .sort((a, b) => b.clicks - a.clicks)
                .slice(0, 6)
                .map((link, i) => {
                  const maxClicks = Math.max(...bio.links.map((l) => l.clicks));
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-400 w-4">
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-gray-700 truncate">
                            {link.title}
                          </p>
                          <span className="text-sm font-bold text-gray-900 ml-2">
                            {formatNumber(link.clicks)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full bg-purple-400"
                            style={{
                              width:
                                maxClicks > 0
                                  ? `${(link.clicks / maxClicks) * 100}%`
                                  : "0%",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </Card>

        {/* Quick insights */}
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-[#8F00FF]" />
            <h3 className="font-semibold text-gray-900">{d.quickInsights}</h3>
            {session?.user?.plan !== "PRO" && (
              <Badge variant="outline" size="sm">
                {d.advancedProBadge}
              </Badge>
            )}
          </div>

          {session?.user?.plan === "PRO" ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: d.insightCountry, value: "France 🇫🇷", sub: "68% du trafic" },
                { label: d.insightDevice, value: "Mobile 📱", sub: "82% mobile" },
                { label: d.insightBrowser, value: "Chrome", sub: "54% d'utilisation" },
                { label: d.insightCTR, value: "12.4%", sub: "vs 8.1% avg" },
              ].map((insight) => (
                <div
                  key={insight.label}
                  className="bg-gray-50 rounded-xl p-3 text-center"
                >
                  <p className="text-lg font-bold text-gray-900">{insight.value}</p>
                  <p className="text-xs font-medium text-gray-700">{insight.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{insight.sub}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#8F00FF]/5 to-purple-50 rounded-xl border border-[#8F00FF]/10">
              <div className="w-10 h-10 bg-[#8F00FF]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5 text-[#8F00FF]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {d.advancedProBadge}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {d.advancedProDesc}
                </p>
              </div>
              <a href="/dashboard/billing">
                <Button
                  size="sm"
                  style={{ backgroundColor: "#8F00FF" }}
                  className="text-white hover:opacity-90 flex-shrink-0"
                >
                  {d.upgradeProBtn}
                </Button>
              </a>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
