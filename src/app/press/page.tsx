import { MarketingLayout } from "@/components/landing/marketing-layout";

export default function PressPage() {
  return (
    <MarketingLayout
      category="Presse"
      title="Espace presse"
      description="Retrouvez les éléments clés pour parler de BeassistLink: positionnement, branding et contacts médias."
      updatedAt="13 avril 2026"
    >
      <div className="rounded-2xl border border-gray-200 p-6">
        <h2 className="font-bold text-gray-900">À propos de BeassistLink</h2>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          BeassistLink est une plateforme SaaS qui aide créateurs et entrepreneurs à centraliser leur présence digitale (bio page, short links, QR codes, analytics).
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900">Kit média</h3>
          <p className="text-sm text-gray-600 mt-2">Logo, couleurs et visuels sur demande.</p>
        </div>
        <div className="rounded-2xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900">Contact presse</h3>
          <p className="text-sm text-gray-600 mt-2">press@beassist-link.com</p>
        </div>
      </div>
    </MarketingLayout>
  );
}
