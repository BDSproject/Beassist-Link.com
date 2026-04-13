import Link from "next/link";
import { MarketingLayout } from "@/components/landing/marketing-layout";

export default function CareersPage() {
  return (
    <MarketingLayout
      category="Carrières"
      title="Rejoignez l'aventure BeassistLink"
      description="Nous construisons un produit ambitieux et cherchons des profils motivés pour accélérer notre croissance."
      updatedAt="13 avril 2026"
    >
      <div className="rounded-2xl border border-[#8F00FF]/30 bg-[#8F00FF]/5 p-6">
        <p className="text-xs font-semibold uppercase text-[#8F00FF] tracking-wide">Offre prioritaire</p>
        <h2 className="text-2xl font-extrabold text-gray-900 mt-2">Ambassadeur de marque</h2>
        <p className="text-gray-700 mt-3 leading-relaxed">
          Nous recherchons un ambassadeur de marque pour promouvoir BeassistLink sur TikTok, Instagram, X ou YouTube.
          En échange, nous offrons un <span className="font-bold">abonnement gratuit à vie</span> (plan Pro) + un accompagnement direct.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-gray-700">
          <li>• Créer du contenu authentique autour du produit</li>
          <li>• Partager des cas d'usage réels et des tutoriels</li>
          <li>• Porter l'image de marque avec professionnalisme</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="mailto:contact@beassist-link.com?subject=Candidature%20Ambassadeur%20BeassistLink" className="px-5 py-2.5 rounded-xl bg-[#8F00FF] text-white font-semibold hover:bg-[#7200CC]">
            Postuler maintenant
          </Link>
          <Link href="/contact" className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50">
            Poser une question
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          ["Profil recherché", "Créateur régulier, crédible, orienté résultats."],
          ["Bonus", "Accès anticipé aux nouveautés produit."],
          ["Objectif", "Faire connaître BeassistLink à la bonne audience."],
        ].map(([title, text]) => (
          <div key={title} className="rounded-2xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 mt-2">{text}</p>
          </div>
        ))}
      </div>
    </MarketingLayout>
  );
}
