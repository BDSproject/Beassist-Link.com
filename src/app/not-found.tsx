"use client";

import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { useLanguage } from "@/contexts/language-context";

const TEXT = {
  fr: {
    badge: "Erreur 404",
    title: "Cette page n’existe pas",
    description:
      "Le lien est peut-être rompu, ou la page a été déplacée. Vérifie l’adresse, ou repars de l’accueil.",
    home: "Retour à l’accueil",
    help: "Centre d’aide",
  },
  en: {
    badge: "Error 404",
    title: "This page doesn’t exist",
    description:
      "The link may be broken, or the page has been moved. Check the address, or start again from the home page.",
    home: "Back to home",
    help: "Help center",
  },
};

export default function NotFound() {
  const { lang } = useLanguage();
  const t = TEXT[lang];

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6 py-16">
      {/* Halos décoratifs aux couleurs de la marque */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-32 h-72 w-72 rounded-full bg-[#8F00FF]/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[#6200CC]/20 blur-3xl"
      />

      <div className="relative w-full max-w-lg text-center">
        {/* Logo cliquable vers l'accueil */}
        <Link href="/" className="mb-10 inline-block transition-opacity hover:opacity-80">
          <Logo size="lg" />
        </Link>

        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#8F00FF]">
          {t.badge}
        </p>

        {/* Numéro 404 en dégradé */}
        <div className="bg-gradient-to-br from-[#8F00FF] to-[#6200CC] bg-clip-text text-[88px] font-black leading-none tracking-tight text-transparent sm:text-[120px]">
          404
        </div>

        <h1 className="mt-4 text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
          {t.title}
        </h1>

        <p className="mt-4 text-base leading-relaxed text-gray-500">{t.description}</p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#8F00FF] px-6 text-base font-semibold text-white shadow-[0_4px_20px_rgba(143,0,255,0.3)] transition-all duration-200 hover:bg-[#7200CC] hover:shadow-[0_8px_30px_rgba(143,0,255,0.4)] active:bg-[#560099] sm:w-auto"
          >
            {t.home}
          </Link>
          <Link
            href="/help"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-[#8F00FF] px-6 text-base font-semibold text-[#8F00FF] transition-all duration-200 hover:bg-[#F5EBFF] active:bg-[#EAD6FF] sm:w-auto"
          >
            {t.help}
          </Link>
        </div>
      </div>
    </main>
  );
}
