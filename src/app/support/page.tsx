import Link from "next/link";
import { MarketingLayout } from "@/components/landing/marketing-layout";

export default function SupportPage() {
  return (
    <MarketingLayout
      category="Support"
      title="Comment pouvons-nous vous aider ?"
      description="Accédez rapidement aux ressources et à l'assistance selon votre besoin."
      updatedAt="13 avril 2026"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          ["Documentation", "/docs", "Guides d'installation, configuration et bonnes pratiques."],
          ["Centre d'aide", "/help", "FAQ et réponses aux questions les plus fréquentes."],
          ["Statut", "/status", "Disponibilité en temps réel des services BeassistLink."],
          ["Contact", "/contact", "Ouvrez une demande ou contactez directement l'équipe."],
        ].map(([title, href, text]) => (
          <Link key={title} href={href as string} className="rounded-2xl border border-gray-200 p-5 hover:border-[#8F00FF]/40 hover:bg-[#8F00FF]/5 transition-colors">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 mt-2">{text}</p>
          </Link>
        ))}
      </div>
    </MarketingLayout>
  );
}
