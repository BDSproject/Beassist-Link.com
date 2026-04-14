"use client";

import { useLanguage } from "@/contexts/language-context";
import { MarketingLayout } from "@/components/landing/marketing-layout";

export default function ProductPage() {
  const { lang } = useLanguage();
  const en = lang === "en";

  const cards = en
    ? [
        ["Smart bio page", "Showcase your offers, social networks and key content."],
        ["Short links", "Create short, clean and easy-to-share URLs."],
        ["Pro QR Codes", "Generate custom QR codes ready for your print materials."],
        ["Conversion & analytics", "Understand what works and optimize your strategy."],
      ]
    : [
        ["Page bio intelligente", "Mettez en avant vos offres, réseaux sociaux et contenus clés."],
        ["Liens raccourcis", "Créez des URLs courtes, propres et simples à partager."],
        ["QR Codes pro", "Générez des QR codes personnalisés prêts pour vos supports imprimés."],
        ["Conversion & analytics", "Comprenez ce qui fonctionne et optimisez votre stratégie."],
      ];

  return (
    <MarketingLayout
      category={en ? "Product" : "Produit"}
      title={en ? "BeassistLink: the all-in-one platform for your online presence" : "BeassistLink: la plateforme tout-en-un pour votre présence en ligne"}
      description={
        en
          ? "Create a high-performing bio page, shorten your links, generate QR codes and track your results from a single dashboard."
          : "Créez une page bio performante, raccourcissez vos liens, générez des QR codes et suivez vos résultats depuis un seul tableau de bord."
      }
      updatedAt={en ? "April 13, 2026" : "13 avril 2026"}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {cards.map(([title, text]) => (
          <div key={title} className="rounded-2xl border border-gray-200 p-5 bg-white">
            <h3 className="font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </MarketingLayout>
  );
}

  return (
    <MarketingLayout
      category="Produit"
      title="BeassistLink: la plateforme tout-en-un pour votre présence en ligne"
      description="Créez une page bio performante, raccourcissez vos liens, générez des QR codes et suivez vos résultats depuis un seul tableau de bord."
      updatedAt="13 avril 2026"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          ["Page bio intelligente", "Mettez en avant vos offres, réseaux sociaux et contenus clés."],
          ["Liens raccourcis", "Créez des URLs courtes, propres et simples à partager."],
          ["QR Codes pro", "Générez des QR codes personnalisés prêts pour vos supports imprimés."],
          ["Conversion & analytics", "Comprenez ce qui fonctionne et optimisez votre stratégie."],
        ].map(([title, text]) => (
          <div key={title} className="rounded-2xl border border-gray-200 p-5 bg-white">
            <h3 className="font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </MarketingLayout>
  );
}
