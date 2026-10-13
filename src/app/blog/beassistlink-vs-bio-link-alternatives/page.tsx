import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ArrowRight } from "lucide-react";

const BASE = "https://www.beassist-link.com";
const SLUG = "beassistlink-vs-bio-link-alternatives";
const PUBLISHED = "2026-04-08";

export const metadata: Metadata = {
  title: "Linktree, Milkshake, Later Link in Bio, Shorby… lequel choisir ?",
  description:
    "Comparatif 2026 des alternatives de lien en bio : Linktree, Milkshake, Later Link in Bio, Shorby et BeassistLink. Prix, fonctionnalités, RGPD : choisis le bon outil.",
  keywords: [
    "alternative linktree",
    "milkshake vs linktree",
    "later link in bio",
    "shorby avis",
    "lien en bio comparatif",
    "meilleur lien en bio 2026",
    "alternative française linktree",
  ],
  alternates: {
    canonical: `${BASE}/blog/${SLUG}`,
  },
  openGraph: {
    title: "Linktree, Milkshake, Later Link in Bio, Shorby… lequel choisir ?",
    description:
      "Tour d'horizon 2026 des principales alternatives de page bio : forces, faiblesses et verdict par profil — par l'équipe BeassistLink 🇫🇷",
    url: `${BASE}/blog/${SLUG}`,
    type: "article",
    publishedTime: PUBLISHED,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      headline: "Linktree, Milkshake, Later Link in Bio, Shorby… lequel choisir ?",
      description:
        "Tour d'horizon 2026 des principales alternatives de page bio : Linktree, Milkshake, Later Link in Bio, Shorby et BeassistLink, avec forces, faiblesses et verdict par profil.",
      datePublished: PUBLISHED,
      author: { "@type": "Organization", name: "BeassistLink" },
      publisher: {
        "@type": "Organization",
        name: "BeassistLink",
        logo: { "@type": "ImageObject", url: `${BASE}/icon.svg` },
      },
      mainEntityOfPage: `${BASE}/blog/${SLUG}`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Quelle est la meilleure alternative gratuite à Linktree en 2026 ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "BeassistLink arrive en tête : le plan FREE comprend une vraie page bio avec 5 liens et 3 liens courts, sans carte bancaire. Milkshake est aussi gratuit, mais sans statistiques ni QR codes. Tout dépend de ce que tu veux en faire.",
          },
        },
        {
          "@type": "Question",
          name: "Milkshake est-il suffisant pour un créateur ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Pour commencer, oui : c'est gratuit et le rendu est joli. Dès que tu as besoin de statistiques de clics, de QR codes ou de liens raccourcis, il devient limitant, et tu devras changer d'outil. BeassistLink couvre les deux étapes sans migration.",
          },
        },
        {
          "@type": "Question",
          name: "Pourquoi l'hébergement en Europe change-t-il quelque chose ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Parce que tes visiteurs sont européens, et que leurs données restent alors dans un cadre RGPD strict, sans cookie de tracking tiers. Pour ton audience, c'est un signal de sérieux ; pour toi, une tranquillité juridique. Linktree, Later et Shorby hébergent hors Europe.",
          },
        },
      ],
    },
  ],
};

export default function BlogBeassistlinkVsBioLinkAlternatives() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="overflow-hidden bg-white min-h-screen">
        <Navbar />

        {/* ── Article header ── */}
        <header className="pt-28 pb-10 border-b border-gray-100 bg-gradient-to-b from-[#F9F5FF] to-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-700">Comparatif</span>
              <span className="text-xs text-gray-400">8 avril 2026 · 8 min de lecture</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight tracking-tight">
              Linktree, Milkshake, Later Link in Bio, Shorby… lequel choisir ?
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Tour d'horizon des principales alternatives de page bio en 2026. Spoiler :{" "}
              <strong>l'origine française de BeassistLink fait la différence</strong>.
            </p>
          </div>
        </header>

        {/* ── Article body ── */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-12">

          {/* Intro */}
          <div className="prose prose-gray max-w-none text-[15px] leading-relaxed">
            <p>
              Cinq outils, une seule place dans ta bio Instagram ou TikTok. Linktree domine la catégorie, Milkshake
              séduit les créateurs, Later Link in Bio vise les marques, Shorby joue la carte des messageries — et
              BeassistLink, la solution française, bouscule tout le monde. Voici le tour d'horizon 2026, outil par
              outil, pour que tu choisisses en connaissance de cause.
            </p>
            <p>
              Si tu découvres le principe de la page de liens, commence par notre guide sur{" "}
              <Link href="/blog/plusieurs-liens-instagram" className="text-[#8F00FF] font-medium hover:underline">
                comment avoir plusieurs liens sur Instagram sans payer
              </Link>
              {" "}: il pose les bases en 5 minutes.
            </p>
          </div>

          {/* Linktree */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">Linktree : la référence, pas forcément le meilleur choix</h2>
            <p className="text-[15px] text-gray-600 leading-relaxed mb-4">
              Linktree reste le nom le plus connu de la page de liens, et c'est mérité : c'est lui qui a créé la
              catégorie. Il reste pertinent pour les audiences internationales, mais ses limites se voient de plus en
              plus en Europe.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-green-50 border border-green-100 p-4">
                <p className="text-sm font-bold text-green-700 mb-2">Ses forces</p>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  {[
                    "interface complète et intégrations nombreuses (boutique, dons, musique)",
                    "présence mondiale et très large communauté",
                    "personnalisation poussée sur les plans payants",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-green-600">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl bg-red-50 border border-red-100 p-4">
                <p className="text-sm font-bold text-red-700 mb-2">Ses faiblesses</p>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  {[
                    "plan gratuit limité, avec un passage au payant vite nécessaire",
                    "abonnement autour de 9 $/mois en 2026, facturé en dollars",
                    "hébergement hors Europe et support essentiellement en anglais",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-red-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Milkshake */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">Milkshake : le gratuit joli pour créateurs</h2>
            <p className="text-[15px] text-gray-600 leading-relaxed mb-4">
              Milkshake est une application gratuite pensée pour les créateurs, avec des designs soignés et une prise
              en main ultra simple depuis un téléphone.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-green-50 border border-green-100 p-4">
                <p className="text-sm font-bold text-green-700 mb-2">Ses forces</p>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  {[
                    "100 % gratuit, sans formule payante",
                    "rendu esthétique, pensé pour Instagram",
                    "idéal pour partager quelques liens « carte par carte »",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-green-600">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl bg-red-50 border border-red-100 p-4">
                <p className="text-sm font-bold text-red-700 mb-2">Ses faiblesses</p>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  {[
                    "fonctionnalités limitées : pas de vraies statistiques, pas de QR codes",
                    "personnalisation encadrée par les thèmes proposés",
                    "difficile de basculer vers une activité qui monétise",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-red-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Later Link in Bio */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">Later Link in Bio : l'outil des marques organisées</h2>
            <p className="text-[15px] text-gray-600 leading-relaxed mb-4">
              Later Link in Bio prolonge Later, le planificateur de posts Instagram bien connu des community managers.
              La logique est différente : ta page bio devient le prolongement de ton calendrier de contenu.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-green-50 border border-green-100 p-4">
                <p className="text-sm font-bold text-green-700 mb-2">Ses forces</p>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  {[
                    "tes posts et ta page bio sont reliés : chaque publication devient un lien cliquable",
                    "analytics couplées à ton calendrier de contenu",
                    "taillé pour l'e-commerce et les marques",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-green-600">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl bg-red-50 border border-red-100 p-4">
                <p className="text-sm font-bold text-red-700 mb-2">Ses faiblesses</p>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  {[
                    "offre payante, pensée pour les équipes marketing",
                    "trop riche (et trop cher) pour un créateur qui démarre",
                    "interface en anglais, hébergement hors Europe",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-red-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Shorby */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">Shorby : le spécialiste des messageries</h2>
            <p className="text-[15px] text-gray-600 leading-relaxed mb-4">
              Shorby mise tout sur un usage : amener tes visiteurs vers WhatsApp, Telegram ou Messenger en un clic,
              avec des liens courts intégrés.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-green-50 border border-green-100 p-4">
                <p className="text-sm font-bold text-green-700 mb-2">Ses forces</p>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  {[
                    "excellent pour transformer un visiteur en conversation",
                    "liens courts et pages orientées conversion",
                    "utile sur les marchés où la messagerie est reine",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-green-600">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl bg-red-50 border border-red-100 p-4">
                <p className="text-sm font-bold text-red-700 mb-2">Ses faiblesses</p>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  {[
                    "tarif élevé, environ 15 $/mois en 2026",
                    "personnalisation de la page plus limitée",
                    "interface en anglais, peu adapté au public français",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-red-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* BeassistLink */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">BeassistLink : l'outsider français qui coche tout</h2>
            <p className="text-[15px] text-gray-600 leading-relaxed mb-3">
              BeassistLink rassemble tout ce que les autres morcellent : une page bio personnalisable, des liens
              raccourcis, des QR codes et des statistiques, le tout hébergé en Europe, RGPD natif, avec un support en
              français. Le plan FREE à 0 € comprend une page bio, 5 liens sur la page, 3 liens courts et un thème de
              base.
            </p>
            <p className="text-[15px] text-gray-600 leading-relaxed mb-3">
              Le plan STARTER (6 €/mois ou 65 €/an) ajoute 3 pages bio, 20 liens, 20 liens courts, 5 thèmes premium,
              les statistiques des clics, les QR codes et un lien personnalisé. Le plan PRO (12 €/mois ou 130 €/an)
              passe tout en illimité : statistiques avancées par pays, appareils et sources, QR illimités, liens
              programmés, domaine personnalisé et support prioritaire. Le détail est sur notre{" "}
              <Link href="/pricing" className="text-[#8F00FF] font-medium hover:underline">page tarifs</Link>.
            </p>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              Et une fois ta page en ligne, notre article sur{" "}
              <Link href="/blog/7-erreurs-lien-en-bio" className="text-[#8F00FF] font-medium hover:underline">
                les 7 erreurs qui font fuir les visiteurs de ton lien en bio
              </Link>{" "}
              est le compagnon idéal pour convertir dès le premier jour.
            </p>
          </section>

          {/* Tableau récap */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-2">Le tableau récap 2026</h2>
            <p className="text-sm text-gray-500 mb-5">Données vérifiées en avril 2026 sur les pages officielles de chaque service.</p>
            <div className="rounded-2xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-4 py-3.5 text-gray-500 font-semibold">Outil</th>
                      <th className="text-left px-4 py-3.5 text-gray-500 font-semibold">Prix d'entrée</th>
                      <th className="text-left px-4 py-3.5 text-gray-500 font-semibold">Public visé</th>
                      <th className="text-center px-4 py-3.5 text-gray-500 font-semibold">Stats</th>
                      <th className="text-center px-4 py-3.5 text-gray-500 font-semibold">QR</th>
                      <th className="text-center px-4 py-3.5 text-gray-500 font-semibold">Europe / RGPD</th>
                      <th className="text-center px-4 py-3.5 text-gray-500 font-semibold">FR</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-[#8F00FF]/5 border-b border-gray-100">
                      <td className="px-4 py-3 font-bold text-[#8F00FF]">BeassistLink 🇫🇷</td>
                      <td className="px-4 py-3 text-gray-700">0 €</td>
                      <td className="px-4 py-3 text-gray-700">Créateurs & PME</td>
                      <td className="px-4 py-3 text-center text-gray-700">Dès STARTER</td>
                      <td className="px-4 py-3 text-center text-green-600 font-bold">✓</td>
                      <td className="px-4 py-3 text-center text-green-600 font-bold">✓</td>
                      <td className="px-4 py-3 text-center text-green-600 font-bold">✓</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 font-semibold text-gray-900">Linktree</td>
                      <td className="px-4 py-3 text-gray-700">Gratuit limité, ≈ 9 $/mois</td>
                      <td className="px-4 py-3 text-gray-700">Généraliste</td>
                      <td className="px-4 py-3 text-center text-gray-700">Payant</td>
                      <td className="px-4 py-3 text-center text-gray-700">Payant</td>
                      <td className="px-4 py-3 text-center text-gray-400">—</td>
                      <td className="px-4 py-3 text-center text-gray-400">—</td>
                    </tr>
                    <tr className="bg-gray-50/60 border-b border-gray-100">
                      <td className="px-4 py-3 font-semibold text-gray-900">Milkshake</td>
                      <td className="px-4 py-3 text-gray-700">Gratuit</td>
                      <td className="px-4 py-3 text-gray-700">Créateurs</td>
                      <td className="px-4 py-3 text-center text-gray-700">Limitées</td>
                      <td className="px-4 py-3 text-center text-gray-400">—</td>
                      <td className="px-4 py-3 text-center text-gray-400">—</td>
                      <td className="px-4 py-3 text-center text-gray-400">—</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 font-semibold text-gray-900">Later Link in Bio</td>
                      <td className="px-4 py-3 text-gray-700">Payant</td>
                      <td className="px-4 py-3 text-gray-700">Marques</td>
                      <td className="px-4 py-3 text-center text-gray-700">Avancées</td>
                      <td className="px-4 py-3 text-center text-gray-400">—</td>
                      <td className="px-4 py-3 text-center text-gray-400">—</td>
                      <td className="px-4 py-3 text-center text-gray-400">—</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900">Shorby</td>
                      <td className="px-4 py-3 text-gray-700">≈ 15 $/mois</td>
                      <td className="px-4 py-3 text-gray-700">Messageries</td>
                      <td className="px-4 py-3 text-center text-gray-700">Oui</td>
                      <td className="px-4 py-3 text-center text-gray-400">—</td>
                      <td className="px-4 py-3 text-center text-gray-400">—</td>
                      <td className="px-4 py-3 text-center text-gray-400">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 bg-[#8F00FF]/5 border-t border-[#8F00FF]/10">
                <p className="text-xs text-gray-500">Tarifs concurrents constatés en avril 2026, en USD pour les outils américains. « — » : fonctionnalité absente ou non confirmée. Plans BeassistLink : FREE, STARTER et PRO.</p>
              </div>
            </div>
          </section>

          {/* Lequel choisir */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-5">Lequel choisir selon ton profil ?</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  emoji: "🎨",
                  title: "Tu es un jeune créateur",
                  desc: "Milkshake est parfait pour jouer avec le format. Dès que tu veux des statistiques, des QR codes ou des liens courts, BeassistLink prend le relais avec un plan FREE généreux et des upgrades à 6 €.",
                },
                {
                  emoji: "🏢",
                  title: "Tu es une marque",
                  desc: "Later Link in Bio a du sens si tu vis déjà dans Later. Sinon, BeassistLink PRO offre stats avancées, domaine personnalisé et support prioritaire pour un budget bien inférieur.",
                },
                {
                  emoji: "🇫🇷",
                  title: "Le RGPD et le français comptent",
                  desc: "BeassistLink est le seul de cette liste hébergé en Europe, RGPD natif, avec un support en français. Pour une audience européenne, la question est vite répondue.",
                },
                {
                  emoji: "💶",
                  title: "Ton budget est serré",
                  desc: "BeassistLink FREE coûte 0 €, Milkshake aussi. Mais seul BeassistLink te laisse grandir sans changer d'outil : STARTER à 6 €/mois, PRO à 12 €/mois.",
                },
              ].map(({ emoji, title, desc }) => (
                <div key={title} className="rounded-2xl border border-gray-200 p-5 hover:border-[#8F00FF]/30 hover:bg-[#F9F5FF]/40 transition-all">
                  <div className="text-2xl mb-2">{emoji}</div>
                  <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <p className="text-[15px] text-gray-600 leading-relaxed mt-5">
              Et si tu veux une vue encore plus détaillée du duel avec le leader, notre article{" "}
              <Link href="/blog/beassistlink-vs-linktree-2026" className="text-[#8F00FF] font-medium hover:underline">
                BeassistLink vs Linktree : le comparatif complet
              </Link>{" "}
              prolonge la lecture.
            </p>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-5">Questions fréquentes</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Quelle est la meilleure alternative gratuite à Linktree en 2026 ?",
                  a: "BeassistLink arrive en tête : le plan FREE comprend une vraie page bio avec 5 liens et 3 liens courts, sans carte bancaire. Milkshake est aussi gratuit, mais sans statistiques ni QR codes.",
                },
                {
                  q: "Milkshake est-il suffisant pour un créateur ?",
                  a: "Pour commencer, oui : c'est gratuit et le rendu est joli. Dès que tu as besoin de statistiques, de QR codes ou de liens raccourcis, il devient limitant, et tu devras changer d'outil.",
                },
                {
                  q: "Pourquoi l'hébergement en Europe change-t-il quelque chose ?",
                  a: "Parce que les données de tes visiteurs restent dans un cadre RGPD strict, sans cookie de tracking tiers. Pour ton audience, c'est un signal de sérieux ; pour toi, une tranquillité juridique.",
                },
              ].map(({ q, a }) => (
                <div key={q} className="rounded-2xl border border-gray-200 p-5">
                  <h3 className="font-bold text-gray-900 text-[15px] mb-2">{q}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl bg-gradient-to-br from-[#8F00FF] to-[#6200CC] p-8 text-center text-white">
            <h2 className="text-2xl font-black mb-2">Ta page bio mérite le bon outil</h2>
            <p className="text-purple-100 mb-6 leading-relaxed max-w-md mx-auto">
              Teste BeassistLink gratuitement en 30 secondes, et compare par toi-même — sans carte bancaire.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-[#8F00FF] font-bold hover:bg-purple-50 transition-colors shadow-lg"
            >
              Créer ma page bio gratuite
              <ArrowRight size={16} />
            </Link>
          </section>

          {/* Related posts */}
          <nav aria-label="Articles connexes" className="border-t border-gray-100 pt-8">
            <p className="text-sm font-semibold text-gray-500 mb-3">À lire aussi</p>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/blog/beassistlink-vs-linktree-2026" className="text-[#8F00FF] hover:underline">
                → BeassistLink vs Linktree en 2026 : le comparatif complet
              </Link>
              <Link href="/blog/10-liens-bio-instagram" className="text-[#8F00FF] hover:underline">
                → 10 liens à mettre dans ta bio Instagram pour convertir
              </Link>
              <Link href="/blog/plusieurs-liens-instagram" className="text-[#8F00FF] hover:underline">
                → Comment avoir plusieurs liens sur Instagram sans payer
              </Link>
              <Link href="/fr/comparatif-linktree" className="text-[#8F00FF] hover:underline">
                → Comparatif Linktree 2026 — quelle alternative choisir ?
              </Link>
            </div>
          </nav>
        </article>

        <Footer />
      </main>
    </>
  );
}
