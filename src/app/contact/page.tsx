import { MarketingLayout } from "@/components/landing/marketing-layout";

export default function ContactPage() {
  return (
    <MarketingLayout
      category="Contact"
      title="Parlons de votre projet"
      description="Une question commerciale, technique ou partenariat ? Notre équipe vous répond rapidement."
      updatedAt="13 avril 2026"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900">Support général</h3>
          <p className="text-sm text-gray-600 mt-2">support@beassist-link.com</p>
        </div>
        <div className="rounded-2xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900">Partenariats</h3>
          <p className="text-sm text-gray-600 mt-2">contact@beassist-link.com</p>
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900">Temps de réponse</h3>
        <p className="text-sm text-gray-600 mt-2">
          Nous répondons généralement sous 24 heures ouvrées. Les clients Pro bénéficient d'un traitement prioritaire.
        </p>
      </div>
    </MarketingLayout>
  );
}
