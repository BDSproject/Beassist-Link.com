"use client";

import { useLanguage } from "@/contexts/language-context";

const STEP_COLORS = ["#8F00FF", "#6200CC", "#4A0099"];

export function HowItWorks() {
  const { t } = useLanguage();
  return (
    <section id="how-it-works" className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* En-tête */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5EBFF] border border-[#EAD6FF] text-sm font-medium text-[#8F00FF] mb-6">
            {t.howItWorks.badge}
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 mb-4">
            {t.howItWorks.heading1}
            <br />
            {t.howItWorks.heading2}
          </h2>
          <p className="text-lg text-gray-500">{t.howItWorks.subheading}</p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-3 gap-8 relative">
          {/* Ligne connectrice (desktop) */}
          <div className="hidden sm:block absolute top-8 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-[#8F00FF] to-[#4A0099] z-0" />

          {t.howItWorks.steps.map((step, index) => (
            <div
              key={index}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: STEP_COLORS[index] }}
              >
                {index + 1}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
