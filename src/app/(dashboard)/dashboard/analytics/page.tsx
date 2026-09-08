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
  SlidersHorizontal,
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

type FilterPreset = "7d" | "30d" | "90d" | "12m" | "thisMonth";

export default function AnalyticsPage() {
  const { data: session } = useSession();
  const { t, lang } = useLanguage();
  const d = t.dashboard.analytics;
  const [links, setLinks] = useState<LinkStat[]>([]);
  const [bio, setBio] = useState<BioStat | null>(null);
  const [granularity, setGranularity] = useState<"day" | "month" | "year">("month");
  const [selectedDate, setSelectedDate] = useState<string>(() =>
    new Date().toISOString().slice(0, 7)
  );
  const [preset, setPreset] = useState<FilterPreset | null>(null);
  const [loading, setLoading] = useState(true);
  const [periodTotals, setPeriodTotals] = useState({
    totalClicks: 0,
    bioViews: 0,
    bioClicks: 0,
  });
  const [allTimeTotals, setAllTimeTotals] = useState({
    totalClicks: 0,
    bioViews: 0,
    bioClicks: 0,
    totalLinks: 0,
  });

  // adjust default selectedDate when granularity changes
  useEffect(() => {
    if (granularity === "day") {
      setSelectedDate(new Date().toISOString().slice(0, 10));
    } else if (granularity === "month") {
      setSelectedDate(new Date().toISOString().slice(0, 7));
    } else {
      setSelectedDate(String(new Date().getFullYear()));
    }
  }, [granularity]);

  const { plan: dbPlan, loading: planLoading } = usePlan();
  const hasPaidAnalytics = dbPlan === "STARTER" || dbPlan === "PRO";

  const buildRange = (g: string, value: string) => {
    if (g === "day") {
      const start = new Date(value);
      const end = new Date(start);
      end.setDate(start.getDate() + 1);
      return { start, end };
    }
    if (g === "month") {
      const [y, m] = value.split("-");
      const start = new Date(Number(y), Number(m) - 1, 1);
      const end = new Date(Number(y), Number(m), 1);
      return { start, end };
    }
    // year
    const year = Number(value);
    const start = new Date(year, 0, 1);
    const end = new Date(year + 1, 0, 1);
    return { start, end };
  };

  const buildPresetRange = (p: FilterPreset) => {
    const end = new Date();
    const start = new Date(end);

    if (p === "7d") {
      start.setDate(end.getDate() - 7);
      return { start, end, groupBy: "day" as const };
    }

    if (p === "30d") {
      start.setDate(end.getDate() - 30);
      return { start, end, groupBy: "day" as const };
    }

    if (p === "90d") {
      start.setDate(end.getDate() - 90);
      return { start, end, groupBy: "month" as const };
    }

    if (p === "12m") {
      start.setMonth(end.getMonth() - 12);
      return { start, end, groupBy: "month" as const };
    }

    // thisMonth
    const monthStart = new Date(end.getFullYear(), end.getMonth(), 1);
    return { start: monthStart, end, groupBy: "day" as const };
  };

  const fetchData = useCallback(async () => {
    if (!hasPaidAnalytics) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const range = preset
        ? buildPresetRange(preset)
        : { ...buildRange(granularity, selectedDate), groupBy: granularity };

      const { start, end, groupBy } = range;

      const res = await fetch(
        `/api/analytics?start=${encodeURIComponent(start.toISOString())}&end=${encodeURIComponent(
          end.toISOString()
        )}&groupBy=${groupBy}`
      );

      if (!res.ok) {
        setLinks([]);
        setBio(null);
        return;
      }

      const data = await res.json();

      // map topLinks to LinkStat-like objects
      const mappedLinks: LinkStat[] = (data.topLinks || []).map((t: any) => ({
        id: t.linkId || "",
        title: t.link?.title || "",
        slug: t.link?.slug || "",
        clicks: t.count || 0,
        url: t.link?.url || "",
      }));

      setLinks(mappedLinks);
      setBio((prev) => ({
        title: prev?.title || "",
        views: data.bioViews ?? 0,
        links: data.topBioLinks ?? [],
      }));

      setPeriodTotals({
        totalClicks: data.totalClicks ?? 0,
        bioViews: data.bioViews ?? 0,
        bioClicks: data.bioClicks ?? 0,
      });

      setAllTimeTotals({
        totalClicks: data.allTime?.totalClicks ?? 0,
        bioViews: data.allTime?.bioViews ?? 0,
        bioClicks: data.allTime?.bioClicks ?? 0,
        totalLinks: data.allTime?.totalLinks ?? 0,
      });
    } catch (err) {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [granularity, selectedDate, preset, hasPaidAnalytics]);

  useEffect(() => {
    if (planLoading) return;
    if (!hasPaidAnalytics) {
      setLoading(false);
      return;
    }
    fetchData();
  }, [fetchData, hasPaidAnalytics, planLoading]);

  const totalClicks = periodTotals.totalClicks;
  const topLink = [...links].sort((a, b) => b.clicks - a.clicks)[0];
  const historyLabel = lang === "fr" ? "Cumul historique" : "All-time total";

  if (planLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-[#8F00FF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Free plan - show upgrade wall
  if (!hasPaidAnalytics) {
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

  const presets = [
    { key: "7d" as FilterPreset, label: "7j" },
    { key: "30d" as FilterPreset, label: "30j" },
    { key: "90d" as FilterPreset, label: "90j" },
    { key: "12m" as FilterPreset, label: "12m" },
    { key: "thisMonth" as FilterPreset, label: "Ce mois" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-9">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{d.title}</h1>
              <p className="text-gray-500 mt-1">{d.subtitlePro}</p>
              <p className="text-xs text-[#8F00FF] mt-2 font-medium">{historyLabel}</p>
            </div>
            <Badge
              variant={session?.user?.plan === "PRO" ? "primary" : "outline"}
            >
              Plan {session?.user?.plan}
            </Badge>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: d.totalClicks,
            value: formatNumber(totalClicks),
            periodValue: formatNumber(allTimeTotals.totalClicks),
            icon: MousePointerClick,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: d.bioViews,
            value: formatNumber(periodTotals.bioViews),
            periodValue: formatNumber(allTimeTotals.bioViews),
            icon: Eye,
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
          {
            label: d.bioClicks,
            value: formatNumber(periodTotals.bioClicks),
            periodValue: formatNumber(allTimeTotals.bioClicks),
            icon: Globe,
            color: "text-green-600",
            bg: "bg-green-50",
          },
          {
            label: d.totalLinks,
            value: formatNumber(allTimeTotals.totalLinks),
            periodValue: lang === "fr" ? "Liens créés" : "Created links",
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
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {historyLabel}: {stat.periodValue}
                  </p>
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

        {/* Lateral filter panel */}
        <aside className="lg:col-span-3 lg:sticky lg:top-24">
          <Card className="relative overflow-hidden p-5 border border-[#8F00FF]/20 shadow-[0_20px_45px_-25px_rgba(143,0,255,0.45)] bg-gradient-to-b from-white via-[#FCF8FF] to-[#F5EBFF]">
            <div className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#8F00FF]/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-14 -left-10 w-36 h-36 rounded-full bg-[#6200CC]/10 blur-2xl" />
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#8F00FF]/10 flex items-center justify-center">
                <SlidersHorizontal className="w-4 h-4 text-[#8F00FF]" />
              </div>
              <h3 className="font-semibold text-gray-900">Filtres</h3>
            </div>

            <p className="text-xs text-gray-500 mb-3">Périodes rapides</p>
            <div className="grid grid-cols-2 gap-2 mb-5">
              {presets.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => setPreset(p.key)}
                  className={`px-2.5 py-2 text-xs rounded-lg border font-medium transition-colors ${
                    preset === p.key
                      ? "bg-[#8F00FF] text-white border-[#8F00FF]"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#8F00FF]/40"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Granularité</label>
                <select
                  value={granularity}
                  onChange={(e) => {
                    setPreset(null);
                    setGranularity(e.target.value as "day" | "month" | "year");
                  }}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="day">Jour</option>
                  <option value="month">Mois</option>
                  <option value="year">Année</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Date</label>
                {granularity === "day" ? (
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                      setPreset(null);
                      setSelectedDate(e.target.value);
                    }}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                ) : granularity === "month" ? (
                  <input
                    type="month"
                    value={selectedDate}
                    onChange={(e) => {
                      setPreset(null);
                      setSelectedDate(e.target.value);
                    }}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                ) : (
                  <input
                    type="number"
                    value={selectedDate}
                    onChange={(e) => {
                      setPreset(null);
                      setSelectedDate(e.target.value);
                    }}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                )}
              </div>

              <div className="flex gap-2 pt-1">
                <Button
                  size="sm"
                  onClick={() => fetchData()}
                  className="flex-1"
                  style={{ backgroundColor: "#8F00FF", color: "white" }}
                >
                  Appliquer
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setPreset(null);
                    setGranularity("month");
                    setSelectedDate(new Date().toISOString().slice(0, 7));
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
