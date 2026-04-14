"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { MarketingLayout } from "@/components/landing/marketing-layout";

export default function SupportPage() {
  const { lang } = useLanguage();
  const en = lang === "en";

  const links = en
    ? [
        ["Documentation", "/docs", "Installation guides, configuration and best practices."],
        ["Help center", "/help", "FAQ and answers to the most common questions."],
        ["Status", "/status", "Real-time availability of BeassistLink services."],
        ["Contact", "/contact", "Open a request or contact the team directly."],
      ]
    : [
        ["Documentation", "/docs", "Guides d'installation, configuration et bonnes pratiques."],
        ["Centre d'aide", "/help", "FAQ et réponses aux questions les plus fréquentes."],
        ["Statut", "/status", "Disponibilité en temps réel des services BeassistLink."],
        ["Contact", "/contact", "Ouvrez une demande ou contactez directement l'équipe."],
      ];

  return (
    <MarketingLayout
      category="Support"
      title={en ? "How can we help you?" : "Comment pouvons-nous vous aider ?"}
      description={
        en
          ? "Quickly access resources and assistance based on your needs."
          : "Accédez rapidement aux ressources et à l'assistance selon votre besoin."
      }
      updatedAt={en ? "April 13, 2026" : "13 avril 2026"}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {links.map(([title, href, text]) => (
          <Link
            key={title}
            href={href as string}
            className="rounded-2xl border border-gray-200 p-5 hover:border-[#8F00FF]/40 hover:bg-[#8F00FF]/5 transition-colors"
          >
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 mt-2">{text}</p>
          </Link>
        ))}
      </div>
    </MarketingLayout>
  );
}
