import Link from "next/link";
import type { Metadata } from "next";
import { MarketingLayout } from "@/components/landing/marketing-layout";

export const metadata: Metadata = {
  title: "Blog — Conseils Link in Bio, Comparatifs Linktree & Stratégies.",
  description:
    "Tutoriels, comparatifs et conseils pour optimiser votre lien bio Instagram, TikTok et YouTube. Alternative française à Linktree — articles en français.",
  keywords: [
    "blog lien bio",
    "comparatif linktree",
    "alternative linktree blog",
    "plusieurs liens instagram",
    "optimiser bio instagram",
    "link in bio conseils",
  ],
  alternates: {
    canonical: "https://www.beassist-link.com/blog",
  },
};

const posts = [
  {
    slug: "plusieurs-liens-instagram",
    tag: "Tutoriel",
    tagColor: "bg-green-100 text-green-700",
    title: "Comment avoir plusieurs liens sur Instagram sans payer",
    excerpt:
      "Guide étape par étape : créez une page de liens personnalisée gratuite et mettez-la dans votre bio Instagram en 5 minutes — sans logo, sans abonnement.",
    date: "14 avril 2026",
    readTime: "5 min",
    featured: false,
  },
  {
    slug: "beassistlink-vs-linktree-2026",
    tag: "Comparatif",
    tagColor: "bg-purple-100 text-purple-700",
    title: "BeassistLink vs Linktree en 2026 : le comparatif complet",
    excerpt:
      "Prix, fonctionnalités, analytics, RGPD… On décortique chaque différence entre BeassistLink et Linktree pour vous aider à choisir.",
    date: "12 avril 2026",
    readTime: "6 min",
    featured: true,
  },
  {
    slug: "beassistlink-vs-bio-link-alternatives",
    tag: "Comparatif",
    tagColor: "bg-purple-100 text-purple-700",
    title: "Linktree, Milkshake, Later Link in Bio, Shorby… lequel choisir ?",
    excerpt:
      "Tour d'horizon des principales alternatives de page bio en 2026. Spoiler : l'origine française de BeassistLink fait la différence.",
    date: "8 avril 2026",
    readTime: "8 min",
    featured: false,
  },
  {
    slug: "pourquoi-choisir-solution-francaise",
    tag: "🇫🇷 Made in France",
    tagColor: "bg-blue-100 text-blue-700",
    title: "Pourquoi choisir une solution française pour votre lien bio ?",
    excerpt:
      "Hébergement en Europe, conformité RGPD native, support en français… Ce que les outils américains ne peuvent pas vous offrir.",
    date: "5 avril 2026",
    readTime: "5 min",
    featured: false,
  },
  {
    slug: "optimiser-bio-convertir-2026",
    tag: "Stratégie",
    tagColor: "bg-green-100 text-green-700",
    title: "Comment optimiser sa bio pour convertir en 2026",
    excerpt:
      "7 leviers simples pour transformer vos visiteurs en clients — des bonnes pratiques partagées par les créateurs qui gèrent leur présence en ligne avec soin.",
    date: "1 avril 2026",
    readTime: "4 min",
    featured: false,
  },
  {
    slug: "qr-codes-bonnes-pratiques",
    tag: "Tutoriel",
    tagColor: "bg-orange-100 text-orange-700",
    title: "QR codes : les bonnes pratiques pour l'impression",
    excerpt:
      "Taille, contraste, correction d'erreurs, test sur différents fonds : le guide pratique pour des QR codes qui se scannent à coup sûr.",
    date: "28 mars 2026",
    readTime: "4 min",
    featured: false,
  },
  {
    slug: "free-vs-starter-quand-upgrader",
    tag: "Conseils",
    tagColor: "bg-yellow-100 text-yellow-700",
    title: "FREE vs STARTER : quand passer au plan supérieur ?",
    excerpt:
      "Les 5 signaux concrets qui montrent qu'il est temps d'upgrader et ce que vous gagnez vraiment en passant au Starter.",
    date: "22 mars 2026",
    readTime: "3 min",
    featured: false,
  },
];

// ── Comparatif table data ─────────────────────────────────────────────────────
const comparison = [
  {
    feature: "Lien bio illimité (plan gratuit)",
    beassist: true,
    linktree: false,
    milkshake: true,
    shorby: false,
  },
  {
    feature: "Analytics avancées",
    beassist: true,
    linktree: false,
    milkshake: false,
    shorby: true,
  },
  {
    feature: "QR Code intégré",
    beassist: true,
    linktree: false,
    milkshake: false,
    shorby: false,
  },
  {
    feature: "Short links personnalisés",
    beassist: true,
    linktree: false,
    milkshake: false,
    shorby: true,
  },
  {
    feature: "Hébergement Europe / RGPD natif",
    beassist: true,
    linktree: false,
    milkshake: false,
    shorby: false,
  },
  {
    feature: "Support en français",
    beassist: true,
    linktree: false,
    milkshake: false,
    shorby: false,
  },
  {
    feature: "Domaine personnalisé",
    beassist: true,
    linktree: true,
    milkshake: false,
    shorby: true,
  },
  {
    feature: "Prix plan payant (mensuel)",
    beassist: "6 €",
    linktree: "9 $",
    milkshake: "gratuit",
    shorby: "15 $",
  },
];

function Check() {
  return <span className="text-green-500 font-bold">✓</span>;
}
function Cross() {
  return <span className="text-gray-300 font-bold">✗</span>;
}
function Cell({ val }: { val: boolean | string }) {
  if (typeof val === "string") return <span className="text-gray-700 font-medium">{val}</span>;
  return val ? <Check /> : <Cross />;
}

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <MarketingLayout
      category="Blog"
      title="Conseils, comparatifs & stratégies créateur"
      description="Retours d'expérience, tutoriels et analyses pour mieux performer en ligne — par l'équipe BeassistLink 🇫🇷"
      updatedAt="14 avril 2026"
    >
      {/* ── Article vedette ── */}
      <article className="rounded-2xl border-2 border-[#8F00FF]/30 bg-gradient-to-br from-[#F9F5FF] to-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${featured.tagColor}`}>
            {featured.tag}
          </span>
          <span className="text-xs text-gray-400">{featured.date} · {featured.readTime} de lecture</span>
          <span className="text-xs font-semibold text-[#8F00FF] bg-[#8F00FF]/10 px-2.5 py-1 rounded-full">Article vedette</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug">{featured.title}</h2>
        <p className="text-sm text-gray-600 mt-3 leading-relaxed">{featured.excerpt}</p>
        <Link
          href={`/blog/${featured.slug}`}
          className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-[#8F00FF] hover:underline"
        >
          Lire l'article →
        </Link>
      </article>

      {/* ── Tableau comparatif ── */}
      <div className="rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <p className="text-xs font-bold text-[#8F00FF] uppercase tracking-wide">Comparatif</p>
          <h2 className="text-lg font-black text-gray-900 mt-1">BeassistLink vs la concurrence</h2>
          <p className="text-sm text-gray-500 mt-1">Les critères qui comptent vraiment, en un coup d'œil.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-3 text-gray-500 font-semibold w-[40%]">Fonctionnalité</th>
                <th className="px-4 py-3 text-center text-[#8F00FF] font-bold">BeassistLink 🇫🇷</th>
                <th className="px-4 py-3 text-center text-gray-500 font-semibold">Linktree</th>
                <th className="px-4 py-3 text-center text-gray-500 font-semibold">Milkshake</th>
                <th className="px-4 py-3 text-center text-gray-500 font-semibold">Shorby</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-4 py-3 text-gray-700 font-medium">{row.feature}</td>
                  <td className="px-4 py-3 text-center"><Cell val={row.beassist} /></td>
                  <td className="px-4 py-3 text-center"><Cell val={row.linktree} /></td>
                  <td className="px-4 py-3 text-center"><Cell val={row.milkshake} /></td>
                  <td className="px-4 py-3 text-center"><Cell val={row.shorby} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-[#8F00FF]/5 border-t border-[#8F00FF]/10">
          <p className="text-xs text-gray-500">
            ✦ Données vérifiées en avril 2026 sur les pages officielles de chaque service. Les tarifs sont en USD/mois pour les concurrents.
          </p>
        </div>
      </div>

      {/* ── Encart Made in France ── */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 flex gap-4 items-start">
        <span className="text-3xl leading-none">🇫🇷</span>
        <div>
          <h2 className="font-black text-gray-900 text-lg">BeassistLink, fièrement français</h2>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            Conçu et développé en France, BeassistLink héberge vos données en Europe et respecte le RGPD nativement —
            pas comme une option payante, mais comme standard. Notre support répond en français, en heures ouvrées françaises.
            Pas de barrière de la langue, pas de délai à cause du décalage horaire.
          </p>
          <Link
            href="/blog/pourquoi-choisir-solution-francaise"
            className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-blue-700 hover:underline"
          >
            En savoir plus →
          </Link>
        </div>
      </div>

      {/* ── Autres articles ── */}
      <div>
        <h2 className="text-lg font-black text-gray-900 mb-4">Tous les articles</h2>
        <div className="space-y-3">
          {rest.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-gray-200 p-5 hover:border-[#8F00FF]/40 hover:bg-[#F9F5FF]/50 transition-all duration-200"
            >
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${post.tagColor}`}>
                  {post.tag}
                </span>
                <span className="text-xs text-gray-400">{post.date} · {post.readTime}</span>
              </div>
              <h3 className="text-base font-bold text-gray-900">{post.title}</h3>
              <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-[#8F00FF] hover:underline"
              >
                Lire l'article →
              </Link>
            </article>
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-500">
        Un sujet qui vous intéresse ?{" "}
        <Link href="/contact" className="text-[#8F00FF] hover:underline font-medium">
          Proposez-le nous
        </Link>
        .
      </p>
    </MarketingLayout>
  );
}
