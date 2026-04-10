"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";

export function CtaSection() {
  const { t } = useLanguage();
  return (
    <section className="py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div
          className="rounded-3xl p-12 sm:p-16 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #8F00FF 0%, #4A0099 100%)",
          }}
        >
          {/* Déco */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          {/* Contenu */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-white mb-8">
              {t.cta.badge}
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-6">
              {t.cta.heading1}
              <br />
              {t.cta.heading2}
            </h2>

            <p className="text-lg text-purple-200 mb-10 max-w-xl mx-auto">
              {t.cta.subheading}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button
                  size="xl"
                  className="bg-white text-[#8F00FF] hover:bg-gray-100 border-0 font-bold shadow-lg"
                >
                  {t.cta.cta1}
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <a href="#pricing">
                <Button
                  size="xl"
                  className="bg-transparent text-white border-2 border-white/40 hover:bg-white/10 font-semibold"
                >
                  {t.cta.cta2}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
