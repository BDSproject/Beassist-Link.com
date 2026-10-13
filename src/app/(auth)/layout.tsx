"use client";

import { Logo } from "@/components/shared/logo";
import { LangSwitcher } from "@/components/shared/lang-switcher";
import { useLanguage } from "@/contexts/language-context";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t, lang } = useLanguage();

  return (
    <div className="min-h-[100svh] bg-gradient-to-br from-[#F5EBFF] via-white to-white flex flex-col">
      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between">
        <Link href="/">
          <Logo size="md" />
        </Link>
        <LangSwitcher />
      </header>

      {/* Contenu centré */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

      {/* Footer minimal */}
      <footer className="px-6 py-4 text-center text-xs text-gray-400" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 0px))' }}>
        © {new Date().getFullYear()} BeassistLink · 
        <Link href={lang === "en" ? "/en/privacy" : "/privacy"} className="hover:text-[#8F00FF] ml-1">{t.auth.privacy}</Link> · 
        <Link href={lang === "en" ? "/en/terms" : "/cgu"} className="hover:text-[#8F00FF] ml-1">{t.auth.terms}</Link>
      </footer>
    </div>
  );
}
