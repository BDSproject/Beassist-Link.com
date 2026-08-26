"use client";

import Link from "next/link";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

// Style réutilisable pour le dégradé
const gradientStyle = {
  background: "linear-gradient(135deg, #8F00FF 0%, #6200CC 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

function PhoneMockup() {
  return (
    <div
      className="relative mx-auto w-[280px] h-[560px] bg-white rounded-[36px] border-[6px] border-gray-900 shadow-2xl overflow-hidden
                 before:absolute before:inset-0 before:rounded-[36px] before:bg-gradient-to-br before:from-[#8F00FF]/20 before:to-[#6200CC]/20 before:blur-3xl before:scale-110 before:-z-10
                 after:absolute after:top-0 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-6 after:bg-gray-900 after:rounded-b-2xl after:z-10"
      aria-hidden="true"
    >
      <div className="h-full overflow-y-auto bg-gradient-to-b from-[#F5EBFF] to-white pt-10 pb-4 px-5">
        <div className="flex flex-col items-center mt-6 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8F00FF] to-[#6200CC] flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            J
          </div>
          <h3 className="mt-3 text-sm font-bold text-gray-900">@Matthieu</h3>
          <p className="text-xs text-gray-500 mt-1 text-center leading-relaxed">
            Créatrice de contenu ✨
            <br />
            Mode & Lifestyle
          </p>
        </div>

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
              className="w-full px-3 py-2.5 rounded-xl text-white text-xs font-semibold text-center shadow-sm"
              style={{ backgroundColor: item.bg }}
            >
              {item.label}
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <span className="text-[9px] text-gray-400">
            Créé avec <span className="font-bold text-black">Beassist</span>
            <span className="font-bold" style={{ color: "#8F00FF" }}>
              Link
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const { t } = useLanguage();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BeassistLink",
    url: "https://www.votre-domaine.com",
    description: t.hero.subheading,
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.votre-domaine.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <section
        aria-label="Présentation de BeassistLink"
        className="relative min-h-[100svh] flex items-center justify-center hero-safe-pt overflow-hidden
                   before:absolute before:top-1/4 before:left-1/4 before:w-[500px] before:h-[500px] before:bg-[#8F00FF]/5 before:rounded-full before:blur-3xl before:-z-10
                   after:absolute after:bottom-1/4 after:right-1/4 after:w-[400px] after:h-[400px] after:bg-[#8F00FF]/8 after:rounded-full after:blur-3xl after:-z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <header className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5EBFF] border border-[#EAD6FF] text-sm font-medium text-[#8F00FF] mb-8">
                <Sparkles size={14} className="fill-current" />
                <span>{t.hero.badge}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.15] mb-6">
                <span className="block">{t.hero.heading1}</span>
                <span className="block" style={gradientStyle}>
                  {t.hero.heading2}
                </span>
                <span className="block" style={gradientStyle}>
                  {t.hero.heading3}
                </span>
              </h1>

              <p className="text-xl text-gray-500 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                {t.hero.subheading} {t.hero.subheadingStrong}
              </p>

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
            </header>

            <div className="hidden sm:flex justify-center lg:justify-end">
              <div className="animate-float">
                <PhoneMockup />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}