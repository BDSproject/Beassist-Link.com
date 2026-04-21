"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

// Mockup de la page bio
function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[280px]">
      {/* Halo lumineux */}
      <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-[#8F00FF]/20 to-[#6200CC]/20 blur-3xl scale-110" />

      {/* Téléphone */}
      <div className="relative bg-white rounded-[36px] border-[6px] border-gray-900 shadow-2xl overflow-hidden h-[560px]">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-10" />

        {/* Contenu bio page */}
        <div className="h-full overflow-y-auto bg-gradient-to-b from-[#F5EBFF] to-white pt-10 pb-4 px-5">
          {/* Avatar */}
          <div className="flex flex-col items-center mt-6 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8F00FF] to-[#6200CC] flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              J
            </div>
            <h3 className="mt-3 text-sm font-bold text-gray-900">
              @Matthieu
            </h3>
            <p className="text-xs text-gray-500 mt-1 text-center leading-relaxed">
              Créatrice de contenu ✨
              <br />
              Mode & Lifestyle
            </p>
          </div>

          {/* Liens */}
          <div className="space-y-2.5">
            {[
              { label: "🎥 Ma dernière vidéo YouTube", bg: "#FF0000" },
              { label: "📸 Mon Instagram", bg: "#E1306C" },
              { label: "🎵 Mon TikTok", bg: "#000000" },
              { label: "🛒 Ma boutique en ligne", bg: "#8F00FF" },
              { label: "📧 Me contacter", bg: "#6200CC" },
            ].map((item, i) => (
              <div
                key={i}
                className="w-full px-3 py-2.5 rounded-xl text-white text-xs font-semibold text-center shadow-sm cursor-pointer hover:scale-105 transition-transform duration-150"
                style={{ backgroundColor: item.bg }}
              >
                {item.label}
              </div>
            ))}
          </div>

          {/* Branding */}
          <div className="mt-4 text-center">
            <span className="text-[9px] text-gray-400">
              Créé avec{" "}
              <span className="font-bold text-black">Beassist</span>
              <span className="font-bold" style={{ color: "#8F00FF" }}>
                Link
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center hero-safe-pt overflow-hidden">
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#8F00FF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#8F00FF]/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Texte */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5EBFF] border border-[#EAD6FF] text-sm font-medium text-[#8F00FF] mb-8">
              <Sparkles size={14} className="fill-current" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.15] mb-6">
              <span className="block whitespace-nowrap">{t.hero.heading1}</span>
              <span
                className="block whitespace-nowrap pb-3"
                style={{
                  background: "linear-gradient(135deg, #8F00FF 0%, #6200CC 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t.hero.heading2}
              </span>
              <span
                className="block whitespace-nowrap pb-3"
                style={{
                  background: "linear-gradient(135deg, #8F00FF 0%, #6200CC 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t.hero.heading3}
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-gray-500 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              {t.hero.subheading}
              <br />
              <span className="font-medium text-gray-700">{t.hero.subheadingStrong}</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/register">
                <Button size="xl" variant="primary">
                  {t.hero.cta1}
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button size="xl" variant="ghost">
                  {t.hero.cta2}
                </Button>
              </a>
            </div>
          </div>

          {/* Mockup téléphone */}
          <div className="hidden sm:flex justify-center lg:justify-end">
            <div className="animate-float">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
