import { MarketingLayout } from "@/components/landing/marketing-layout";

export default function GdprPage() {
  return (
    <MarketingLayout
      category="RGPD"
      title="Conformité RGPD"
      description="BeassistLink applique les principes du RGPD pour garantir vos droits sur les données personnelles."
      updatedAt="13 avril 2026"
    >
      <div className="rounded-2xl border border-gray-200 p-6 text-sm text-gray-700 leading-relaxed space-y-3">
        <p>Droit d'accès, de rectification et de suppression: vous pouvez exercer ces droits à tout moment.</p>
        <p>Nous minimisons les données collectées et conservons uniquement ce qui est nécessaire au service.</p>
        <p>Pour toute demande RGPD: privacy@beassist-link.com</p>
      </div>
    </MarketingLayout>
  );
}
