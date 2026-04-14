"use client";

import { useLanguage } from "@/contexts/language-context";
import { MarketingLayout } from "@/components/landing/marketing-layout";

export default function FeaturesPage() {
  const { lang } = useLanguage();
  const en = lang === "en";

  const items = en
    ? [
        ["Bio page editor", "Themes, colors, avatar, social links and live preview."],
        ["Short link management", "Create, edit, delete and track clicks in real time."],
        ["QR Code generator", "Color/size customization, HD PNG export, professional use."],
        ["Scalable plans", "Move from FREE to STARTER/PRO as your needs grow."],
        ["Performance", "Fast, responsive Next.js app built with mobile in mind."],
      ]
    : [
        ["Éditeur de page bio", "Thèmes, couleurs, avatar, liens sociaux et aperçu en direct."],
        ["Gestion des liens courts", "Création, édition, suppression et suivi des clics en temps réel."],
        ["QR Code Generator", "Personnalisation couleur/taille, export PNG HD, usage pro."],
        ["Plans évolutifs", "Passez de FREE à STARTER/PRO selon vos besoins."],
        ["Performance", "Application Next.js rapide, responsive et pensée pour le mobile."],
      ];

  return (
    <MarketingLayout
      category={en ? "Features" : "Fonctionnalités"}
      title={en ? "Everything you need to convert your audience" : "Tout ce dont vous avez besoin pour convertir votre audience"}
      description={
        en
          ? "BeassistLink combines simplicity, design and performance to help you grow your online business."
          : "BeassistLink combine simplicité, design et performance pour vous aider à développer votre activité en ligne."
      }
      updatedAt={en ? "April 13, 2026" : "13 avril 2026"}
    >
      <div className="space-y-4">
        {items.map(([title, text]) => (
          <div key={title} className="rounded-2xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 mt-2">{text}</p>
          </div>
        ))}
      </div>
    </MarketingLayout>
  );
}
