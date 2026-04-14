"use client";

import { useState } from "react";
import {
  BookOpen,
  Link2,
  FileText,
  QrCode,
  BarChart3,
  CreditCard,
  Globe,
  Headphones,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SectionKey = "gettingStarted" | "bio" | "links" | "qr" | "analytics" | "billing" | "domain";

interface SectionData {
  title: string;
  intro: string;
  steps?: string[];
  items?: string[];
  tip?: string;
  note?: string;
}

const SECTION_META: Record<SectionKey, { icon: React.ElementType; color: string }> = {
  gettingStarted: { icon: BookOpen,  color: "#8F00FF" },
  bio:            { icon: FileText,  color: "#06b6d4" },
  links:          { icon: Link2,     color: "#10b981" },
  qr:             { icon: QrCode,    color: "#f59e0b" },
  analytics:      { icon: BarChart3, color: "#3b82f6" },
  billing:        { icon: CreditCard,color: "#ec4899" },
  domain:         { icon: Globe,     color: "#8F00FF" },
};

const SECTION_KEYS: SectionKey[] = [
  "gettingStarted", "bio", "links", "qr", "analytics", "billing", "domain",
];

export default function HelpPage() {
  const { t } = useLanguage();
  const d = t.dashboard.help;
  const [active, setActive] = useState<SectionKey>("gettingStarted");

  const sections = {
    gettingStarted: d.gettingStarted,
    bio:            d.bio,
    links:          d.links,
    qr:             d.qr,
    analytics:      d.analytics,
    billing:        d.billing,
    domain:         d.domain,
  } as Record<SectionKey, SectionData>;

  const section = sections[active];
  const { icon: Icon, color } = SECTION_META[active];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-[#8F00FF]/10 rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-[#8F00FF]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{d.title}</h1>
        </div>
        <p className="text-gray-500 pl-[52px]">{d.subtitle}</p>
      </div>

      {/* Mobile scrollable tabs */}
      <div className="lg:hidden mb-5 overflow-x-auto pb-1 -mx-4 px-4">
        <div className="flex gap-2">
          {SECTION_KEYS.map((key) => {
            const { icon: TabIcon } = SECTION_META[key];
            return (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0",
                  active === key
                    ? "bg-[#8F00FF] text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                <TabIcon size={13} />
                {sections[key].title}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex gap-6 items-start">
        {/* Desktop left nav */}
        <aside className="hidden lg:block w-52 flex-shrink-0 sticky top-6">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400 px-3 mb-2">
            Documentation
          </p>
          <nav className="space-y-0.5">
            {SECTION_KEYS.map((key) => {
              const { icon: NavIcon, color: navColor } = SECTION_META[key];
              const isActive = active === key;
              return (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all",
                    isActive
                      ? "bg-[#8F00FF]/10 text-[#8F00FF]"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <NavIcon
                    size={16}
                    style={{ color: isActive ? "#8F00FF" : navColor }}
                    className={cn(!isActive && "opacity-60")}
                  />
                  <span className="flex-1">{sections[key].title}</span>
                  {isActive && <ChevronRight size={12} className="text-[#8F00FF]" />}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-4">
          <Card className="p-6">
            {/* Section title */}
            <div className="flex items-center gap-3 pb-5 border-b border-gray-100 mb-5">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: color + "18" }}
              >
                <Icon size={22} style={{ color }} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                {section.note && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 mt-1">
                    <AlertCircle size={10} />
                    {section.note}
                  </span>
                )}
              </div>
            </div>

            {/* Intro */}
            <p className="text-gray-600 leading-relaxed mb-6">{section.intro}</p>

            {/* Steps */}
            {section.steps && section.steps.length > 0 && (
              <ol className="space-y-3 mb-6">
                {section.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: color }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-700 leading-relaxed pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            )}

            {/* Items (analytics) */}
            {section.items && section.items.length > 0 && (
              <ul className="space-y-2.5 mb-6">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Tip */}
            {section.tip && (
              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <Lightbulb size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 leading-relaxed">{section.tip}</p>
              </div>
            )}
          </Card>

          {/* Support CTA */}
          <Card className="p-5 bg-gradient-to-br from-[#8F00FF]/5 to-[#6200CC]/5 border-[#8F00FF]/20">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#8F00FF]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Headphones size={20} className="text-[#8F00FF]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-0.5">{d.supportTitle}</h3>
                <p className="text-sm text-gray-500">{d.supportDesc}</p>
              </div>
              <Link href="/dashboard/contact" className="flex-shrink-0">
                <button className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#8F00FF] hover:underline whitespace-nowrap">
                  {d.goToContact}
                  <ArrowRight size={14} />
                </button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
