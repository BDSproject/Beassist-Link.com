"use client";

import { useLanguage } from "@/contexts/language-context";
import { MarketingLayout } from "@/components/landing/marketing-layout";

export default function PrivacyPage() {
  const { lang } = useLanguage();
  const en = lang === "en";

  return (
    <MarketingLayout
      category={en ? "Privacy" : "Confidentialité"}
      title={en ? "Privacy policy" : "Politique de confidentialité"}
      description={
        en
          ? "We protect your data and apply high standards of security and transparency."
          : "Nous protégeons vos données et appliquons des standards élevés de sécurité et de transparence."
      }
      updatedAt={en ? "April 13, 2026" : "13 avril 2026"}
    >
      <div className="rounded-2xl border border-gray-200 p-6 text-sm text-gray-700 leading-relaxed space-y-3">
        {(en
          ? [
              "We only collect data necessary for the service to function (account, usage, billing).",
              "Your data is never sold. It is hosted on secure infrastructure.",
              "You can request modification or deletion of your data via the Contact page.",
            ]
          : [
              "Nous collectons uniquement les données nécessaires au fonctionnement du service (compte, usage, facturation).",
              "Vos données ne sont jamais revendues. Elles sont hébergées sur des infrastructures sécurisées.",
              "Vous pouvez demander la modification ou suppression de vos données via la page Contact.",
            ]
        ).map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>
    </MarketingLayout>
  );
}

  return (
    <MarketingLayout
      category="Confidentialité"
      title="Politique de confidentialité"
      description="Nous protégeons vos données et appliquons des standards élevés de sécurité et de transparence."
      updatedAt="13 avril 2026"
    >
      <div className="rounded-2xl border border-gray-200 p-6 text-sm text-gray-700 leading-relaxed space-y-3">
        <p>Nous collectons uniquement les données nécessaires au fonctionnement du service (compte, usage, facturation).</p>
        <p>Vos données ne sont jamais revendues. Elles sont hébergées sur des infrastructures sécurisées.</p>
        <p>Vous pouvez demander la modification ou suppression de vos données via la page Contact.</p>
      </div>
    </MarketingLayout>
  );
}
