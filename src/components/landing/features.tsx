"use client";

import { Link2, BarChart3, Palette, QrCode, Zap, Shuffle } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const FEATURE_ICONS = [Link2, Palette, Shuffle, BarChart3, QrCode, Zap];
const FEATURE_STYLES = [
  { color: "#8F00FF", bg: "#F5EBFF" },
  { color: "#F59E0B", bg: "#FFFBEB" },
  { color: "#10B981", bg: "#ECFDF5" },
  { color: "#3B82F6", bg: "#EFF6FF" },
  { color: "#EC4899", bg: "#FDF2F8" },
  { color: "#6366F1", bg: "#EEF2FF" },
];

export function Features() {
  const { t } = useLanguage();
  return (
    <section id="features" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* En-tête */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5EBFF] border border-[#EAD6FF] text-sm font-medium text-[#8F00FF] mb-6">
            {t.features.badge}
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 mb-4">
            {t.features.heading1}
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #8F00FF, #6200CC)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t.features.heading2}
            </span>
          </h2>
          <p className="text-lg text-gray-500">{t.features.subheading}</p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.features.items.map((feature, i) => {
            const Icon = FEATURE_ICONS[i];
            const style = FEATURE_STYLES[i];
            return (
              <div
                key={i}
                className="group p-8 rounded-2xl border border-gray-100 bg-white hover:border-[#EAD6FF] hover:shadow-lg transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: style.bg }}
                >
                  <Icon size={22} style={{ color: style.color }} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
