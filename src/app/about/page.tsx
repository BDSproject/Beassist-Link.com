import { MarketingLayout } from "@/components/landing/marketing-layout";

export default function AboutPage() {
  return (
    <MarketingLayout
      category="Entreprise"
      title="À propos de BeassistLink"
      description="Notre mission: aider les créateurs et entrepreneurs à mieux convertir leur audience avec un produit simple, rapide et élégant."
      updatedAt="13 avril 2026"
    >
      <div className="rounded-2xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900">Pourquoi BeassistLink ?</h3>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          Trop d'outils séparés, trop de complexité, trop de friction. BeassistLink regroupe l'essentiel dans un seul espace: page bio, liens courts, QR et analytics.
        </p>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          ["Simplicité", "Une interface claire, pensée pour aller vite."],
          ["Performance", "Des pages rapides qui chargent instantanément."],
          ["Conversion", "Des fonctionnalités orientées business, pas gadget."],
        ].map(([title, text]) => (
          <div key={title} className="rounded-2xl border border-gray-200 p-5">
            <h4 className="font-semibold text-gray-900">{title}</h4>
            <p className="text-sm text-gray-600 mt-2">{text}</p>
          </div>
        ))}
      </div>
    </MarketingLayout>
  );
}
