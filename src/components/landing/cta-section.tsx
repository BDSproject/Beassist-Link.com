"use client";

import Link from "next/link";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export function CtaSection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 sm:py-36 bg-white overflow-hidden">
      {/* Halo ambiant derrière la bulle */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #8F00FF, transparent 70%)" }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* La bulle principale */}
        <div
          className="relative rounded-[2.5rem] overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #9B0FFF 0%, #6500CC 50%, #3A007F 100%)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 32px 80px rgba(143,0,255,0.45), 0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          {/* ── Orbes animées ── */}
          <div
            className="absolute -top-32 -right-24 w-[480px] h-[480px] opacity-25 animate-blob"
            style={{ background: "radial-gradient(circle at 40% 40%, #C47FFF, #6500CC, transparent 70%)" }}
          />
          <div
            className="absolute -bottom-32 -left-24 w-[420px] h-[420px] opacity-20 animate-blob"
            style={{
              background: "radial-gradient(circle at 60% 60%, #BF85FF, #4A0099, transparent 70%)",
              animationDelay: "4s",
            }}
          />
          <div
            className="absolute top-[15%] left-[30%] w-52 h-52 opacity-10 animate-float"
            style={{ background: "radial-gradient(circle, white, transparent 70%)", animationDelay: "1s" }}
          />

          {/* Grille de points subtile */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          {/* ── Contenu centré ── */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 sm:px-12 py-16 sm:py-24">

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-semibold text-white mb-8 backdrop-blur-sm animate-fade-up"
              style={{ opacity: 0, animationDelay: "0ms", animationFillMode: "forwards" }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
              {t.cta.badge}
            </div>

            {/* Titre */}
            <h2
              className="text-4xl sm:text-5xl lg:text-[3.75rem] font-black text-white tracking-tight leading-[1.08] mb-6 animate-fade-up"
              style={{ opacity: 0, animationDelay: "120ms", animationFillMode: "forwards" }}
            >
              {t.cta.heading1}
              <br />
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg, #E0B4FF, #fff, #C47FFF)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "shimmer 3s linear infinite",
                }}
              >
                {t.cta.heading2}
              </span>
            </h2>

            {/* Sous-titre */}
            <p
              className="text-lg sm:text-xl text-purple-200/90 mb-12 max-w-2xl leading-relaxed animate-fade-up"
              style={{ opacity: 0, animationDelay: "240ms", animationFillMode: "forwards" }}
            >
              {t.cta.subheading}
            </p>

            {/* Boutons */}
            <div
              className="flex flex-col sm:flex-row gap-4 items-center justify-center animate-fade-up"
              style={{ opacity: 0, animationDelay: "360ms", animationFillMode: "forwards" }}
            >
              <Link href="/register" className="w-fit">
                <button className="group relative inline-flex items-center gap-2 bg-white text-[#8F00FF] font-bold text-base px-8 py-4 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-white/25 hover:bg-purple-50 active:scale-100">
                  {t.cta.cta1}
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  {/* shimmer interne */}
                  <span className="absolute inset-0 rounded-2xl overflow-hidden">
                    <span
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: "linear-gradient(90deg, transparent 0%, rgba(143,0,255,0.08) 50%, transparent 100%)",
                        backgroundSize: "200% auto",
                        animation: "shimmer 1.5s linear infinite",
                      }}
                    />
                  </span>
                </button>
              </Link>
            </div>

            {/* Social proof */}
            <div
              className="flex flex-wrap gap-x-8 gap-y-2 justify-center mt-12 text-white/50 text-sm animate-fade-up"
              style={{ opacity: 0, animationDelay: "480ms", animationFillMode: "forwards" }}
            >
              <span className="inline-flex items-center gap-1.5"><Check className="w-4 h-4" /> {t.cta.proof1}</span>
              <span className="inline-flex items-center gap-1.5"><Check className="w-4 h-4" /> {t.cta.proof2}</span>
              <span className="inline-flex items-center gap-1.5"><Check className="w-4 h-4" /> {t.cta.proof3}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
