import Link from "next/link";
import { MarketingLayout } from "@/components/landing/marketing-layout";

export default function PricingPage() {
  return (
    <MarketingLayout
      category="Tarifs"
      title="Des plans simples et transparents"
      description="Commencez gratuitement, puis passez à l'étape supérieure quand votre activité grandit."
      updatedAt="13 avril 2026"
    >
      <div className="grid md:grid-cols-3 gap-4">
        {[
          ["Free", "0€", ["1 page bio", "5 liens bio", "3 liens courts", "Branding BeassistLink"]],
          ["Starter", "6€/mois", ["3 pages bio", "20 liens bio", "QR Codes", "Analytics basiques"]],
          ["Pro", "12€/mois", ["Illimité", "Domaine custom", "API access", "Support prioritaire"]],
        ].map(([name, price, features]) => (
          <div key={name as string} className="rounded-2xl border border-gray-200 p-5 bg-white">
            <h3 className="text-lg font-bold text-gray-900">{name as string}</h3>
            <p className="text-2xl font-extrabold text-[#8F00FF] mt-1">{price as string}</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              {(features as string[]).map((f) => <li key={f}>• {f}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Link href="/#pricing" className="text-[#8F00FF] font-semibold hover:underline">
          Voir la comparaison détaillée sur la landing
        </Link>
      </div>
    </MarketingLayout>
  );
}
