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
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { Card } from "@/components/ui/card";

interface Section {
  icon: React.ElementType;
  titleKey: string;
  descKey: string;
  color: string;
}

function AccordionItem({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-gray-100 rounded-2xl overflow-hidden transition-shadow hover:shadow-sm"
      onClick={() => setOpen((v) => !v)}
    >
      <div className="flex items-center gap-4 p-4 cursor-pointer select-none">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: color + "18" }}
        >
          <Icon size={20} style={{ color }} />
        </div>
        <span className="flex-1 font-semibold text-gray-800 text-sm">
          {title}
        </span>
        {open ? (
          <ChevronUp size={16} className="text-gray-400" />
        ) : (
          <ChevronDown size={16} className="text-gray-400" />
        )}
      </div>
      {open && (
        <div className="px-4 pb-4 pt-0 text-sm text-gray-600 leading-relaxed border-t border-gray-50">
          <div className="pt-3">{description}</div>
        </div>
      )}
    </div>
  );
}

export default function HelpPage() {
  const { t } = useLanguage();
  const d = t.dashboard.help;

  const sections: Section[] = [
    {
      icon: BookOpen,
      titleKey: "gettingStarted",
      descKey: "gettingStartedDesc",
      color: "#8F00FF",
    },
    {
      icon: FileText,
      titleKey: "bioTitle",
      descKey: "bioDesc",
      color: "#06b6d4",
    },
    {
      icon: Link2,
      titleKey: "linksTitle",
      descKey: "linksDesc",
      color: "#10b981",
    },
    {
      icon: QrCode,
      titleKey: "qrTitle",
      descKey: "qrDesc",
      color: "#f59e0b",
    },
    {
      icon: BarChart3,
      titleKey: "analyticsTitle",
      descKey: "analyticsDesc",
      color: "#3b82f6",
    },
    {
      icon: CreditCard,
      titleKey: "billingTitle",
      descKey: "billingDesc",
      color: "#ec4899",
    },
    {
      icon: Globe,
      titleKey: "domainTitle",
      descKey: "domainDesc",
      color: "#8F00FF",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-[#8F00FF]/10 rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-[#8F00FF]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{d.title}</h1>
        </div>
        <p className="text-gray-500">{d.subtitle}</p>
      </div>

      {/* Accordion sections */}
      <div className="space-y-3 mb-8">
        {sections.map((section) => (
          <AccordionItem
            key={section.titleKey}
            icon={section.icon}
            title={d[section.titleKey as keyof typeof d] as string}
            description={d[section.descKey as keyof typeof d] as string}
            color={section.color}
          />
        ))}
      </div>

      {/* Support CTA */}
      <Card className="p-5 bg-gradient-to-br from-[#8F00FF]/5 to-[#6200CC]/5 border-[#8F00FF]/20">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-[#8F00FF]/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Headphones size={20} className="text-[#8F00FF]" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{d.supportTitle}</h3>
            <p className="text-sm text-gray-600 mb-3">{d.supportDesc}</p>
            <Link href="/dashboard/contact">
              <button className="inline-flex items-center gap-2 text-sm font-semibold text-[#8F00FF] hover:underline">
                {d.goToContact}
                <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
