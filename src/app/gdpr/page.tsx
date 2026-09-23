"use client";

import { useLanguage } from "@/contexts/language-context";
import { MarketingLayout } from "@/components/landing/marketing-layout";

export default function GdprPage() {
  const { lang } = useLanguage();
  const en = lang === "en";

  return (
    <MarketingLayout
      category={en ? "GDPR" : "RGPD"}
      title={en ? "GDPR Compliance" : "Conformité RGPD"}
      description={
        en
          ? "BeassistLink applies GDPR principles to guarantee your rights over personal data."
          : "BeassistLink applique les principes du RGPD pour garantir tes droits sur les données personnelles."
      }
      updatedAt={en ? "April 13, 2026" : "13 avril 2026"}
    >
      <div className="rounded-2xl border border-gray-200 p-6 text-sm text-gray-700 leading-relaxed space-y-3">
        {(en
          ? [
              "Right of access, rectification and deletion: you can exercise these rights at any time.",
              "We minimize the data collected and only retain what is necessary for the service.",
              "For any GDPR request: privacy@beassist-link.com",
            ]
          : [
              "Droit d'accès, de rectification et de suppression: tu peux exercer ces droits à tout moment.",
              "Nous minimisons les données collectées et conservons uniquement ce qui est nécessaire au service.",
              "Pour toute demande RGPD: privacy@beassist-link.com",
            ]
        ).map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>
    </MarketingLayout>
  );
}
