import Link from "next/link";
import { MarketingLayout } from "@/components/landing/marketing-layout";

export default function BlogPage() {
  const posts = [
    {
      title: "Comment optimiser sa bio pour convertir en 2026",
      excerpt: "7 leviers simples pour transformer vos visiteurs en clients.",
      date: "10 avril 2026",
    },
    {
      title: "QR codes: les bonnes pratiques pour l'impression",
      excerpt: "Taille, contraste, correction d'erreurs: le guide pratique.",
      date: "6 avril 2026",
    },
    {
      title: "FREE vs STARTER: quand passer au plan supérieur ?",
      excerpt: "Les signaux qui montrent qu'il est temps d'upgrader.",
      date: "1 avril 2026",
    },
  ];

  return (
    <MarketingLayout
      category="Blog"
      title="Conseils marketing et productivité créateur"
      description="Retours d'expérience, tutoriels et stratégies pour mieux performer en ligne."
      updatedAt="13 avril 2026"
    >
      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.title} className="rounded-2xl border border-gray-200 p-5">
            <p className="text-xs text-gray-400">{post.date}</p>
            <h2 className="text-lg font-bold text-gray-900 mt-1">{post.title}</h2>
            <p className="text-sm text-gray-600 mt-2">{post.excerpt}</p>
          </article>
        ))}
      </div>
      <p className="text-sm text-gray-500">
        Envie d'un sujet précis ? Écrivez-nous via <Link href="/contact" className="text-[#8F00FF] hover:underline">la page contact</Link>.
      </p>
    </MarketingLayout>
  );
}
