"use client";

import { Mail, Lightbulb, Clock, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { Card } from "@/components/ui/card";

export default function ContactPage() {
  const { t } = useLanguage();
  const d = t.dashboard.contact;

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-[#8F00FF]/10 rounded-xl flex items-center justify-center">
            <Mail className="w-5 h-5 text-[#8F00FF]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{d.title}</h1>
        </div>
        <p className="text-gray-500">{d.subtitle}</p>
      </div>

      {/* Response time badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full mb-8">
        <Clock size={15} className="text-green-600" />
        <span className="text-sm font-semibold text-green-700">{d.responseTime}</span>
      </div>

      <div className="space-y-5">
        {/* Support card */}
        <Card className="p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#8F00FF]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Mail size={22} className="text-[#8F00FF]" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-gray-900 text-lg mb-1">{d.supportTitle}</h2>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">{d.supportDesc}</p>
              <a
                href={`mailto:${d.supportEmail}?subject=Support BeassistLink`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#8F00FF" }}
              >
                <Mail size={15} />
                {d.supportCta}
                <ArrowUpRight size={14} />
              </a>
              <p className="mt-3 text-xs text-gray-400 font-mono">{d.supportEmail}</p>
            </div>
          </div>
        </Card>

        {/* Suggestions card */}
        <Card className="p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Lightbulb size={22} className="text-amber-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-gray-900 text-lg mb-1">{d.suggestTitle}</h2>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">{d.suggestDesc}</p>
              <a
                href={`mailto:${d.suggestEmail}?subject=Suggestion BeassistLink`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white bg-amber-500 hover:bg-amber-600 transition-colors"
              >
                <Lightbulb size={15} />
                {d.suggestCta}
                <ArrowUpRight size={14} />
              </a>
              <p className="mt-3 text-xs text-gray-400 font-mono">{d.suggestEmail}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer note */}
      <div className="mt-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
        <div className="flex items-start gap-2.5">
          <Clock size={15} className="text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-500 leading-relaxed">{d.responseNote}</p>
        </div>
      </div>
    </div>
  );
}
