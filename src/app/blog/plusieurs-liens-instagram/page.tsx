import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ArrowRight } from "lucide-react";

const BASE = "https://www.beassist-link.com";
const SLUG = "plusieurs-liens-instagram";
const PUBLISHED = "2026-04-14";

export const metadata: Metadata = {
  title: "Comment avoir plusieurs liens sur Instagram sans payer — Guide 2026",
  description:
    "Tutoriel complet : mets plusieurs liens en bio Instagram gratuitement. Page de liens personnalisée, gratuite et sans abonnement.",
  keywords: [
    "plusieurs liens bio instagram",
    "lien en bio instagram",
    "mettre plusieurs liens instagram",
    "outil lien dans bio",
    "page de liens personnalisée",
    "linktree gratuit",
    "créer page redirection gratuite",
    "lien bio gratuit",
    "comment avoir plusieurs liens instagram",
    "bio link instagram gratuit",
  ],
  alternates: {
    canonical: `${BASE}/blog/${SLUG}`,
  },
  openGraph: {
    title: "Comment avoir plusieurs liens sur Instagram sans payer",
    description:
      "Guide étape par étape pour mettre plusieurs liens en bio Instagram — gratuit et conforme RGPD avec BeassistLink 🇫🇷",
    url: `${BASE}/blog/${SLUG}`,
    type: "article",
    publishedTime: PUBLISHED,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Comment avoir plusieurs liens sur Instagram sans payer",
  description:
    "Tutoriel complet pour mettre plusieurs liens dans sa bio Instagram gratuitement grâce à une page de liens personnalisée.",
  datePublished: PUBLISHED,
  author: { "@type": "Organization", name: "BeassistLink" },
  publisher: {
    "@type": "Organization",
    name: "BeassistLink",
    logo: { "@type": "ImageObject", url: `${BASE}/icon.svg` },
  },
  totalTime: "PT5M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" },
  step: [
    {
      "@type": "HowToStep",
      name: "Créer un compte BeassistLink",
      text: "Rends-toi sur beassist-link.com/register et crée ton compte gratuit en 30 secondes. Aucune carte bancaire requise.",
      url: `${BASE}/register`,
    },
    {
      "@type": "HowToStep",
      name: "Ajouter tes liens",
      text: "Dans le tableau de bord, ajoute autant de liens que tu souhaites : YouTube, TikTok, boutique en ligne, Spotify, newsletter, etc.",
      url: `${BASE}/dashboard/links`,
    },
    {
      "@type": "HowToStep",
      name: "Personnaliser ta page bio",
      text: "Choisis un thème, une couleur, ajoute ta photo et une description courte pour rendre ta page à ton image.",
      url: `${BASE}/dashboard/bio`,
    },
    {
      "@type": "HowToStep",
      name: "Copier ton lien dans la bio Instagram",
      text: "Copie ton URL personnalisée (ex. beassist-link.com/tonnom) et colle-la dans le champ « Site web » de ton profil Instagram.",
    },
  ],
};

export default function BlogPlusieursLiensInstagram() {
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
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700">Tutoriel</span>
              <span className="text-xs text-gray-400">{PUBLISHED.split("-").reverse().join(" ").replace(/-/g, " ")} · 5 min de lecture</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight tracking-tight">
              Comment avoir plusieurs liens sur Instagram sans payer
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Instagram ne te permet qu'un seul lien dans ta bio. Voici comment en mettre autant que tu veux —
              <strong> gratuitement</strong>, en moins de 5 minutes.
            </p>
          </div>
        </header>

        {/* ── Article body ── */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-12">

          {/* Intro */}
          <div className="prose prose-gray max-w-none text-[15px] leading-relaxed">
            <p>
              Depuis toujours, Instagram limite chaque profil à <strong>un seul lien cliquable</strong> dans la bio.
              C'est une contrainte frustrante pour les créateurs, les entrepreneurs et les artistes qui veulent partager
              plusieurs contenus simultanément.
            </p>
            <p>
              La solution ? Créer une <strong>page de liens personnalisée</strong> (aussi appelée <em>lien en bio</em> ou
              <em>link in bio</em>) qui centralise tous tes liens. Ce guide t'explique comment faire avec
              <strong> BeassistLink</strong>, l'outil gratuit et simple à prendre en main.
            </p>
          </div>

          {/* Why not Linktree */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">
              Pourquoi pas Linktree ?
            </h2>
            <div className="text-[15px] text-gray-600 leading-relaxed space-y-3">
              <p>
                Linktree est la solution la plus connue, mais le plan gratuit impose un <strong>logo Linktree visible</strong>
                sur ta page, bloque les analytics détaillées et limite la personnalisation. Le plan payant est facturé
                <strong> en dollars américains</strong> (environ 9 $/mois en 2026).
              </p>
              <p>
                <strong>BeassistLink</strong> offre tout cela gratuitement : liens
                illimités, avec analytics et hébergement en Europe conforme au <strong>RGPD</strong>.
              </p>
            </div>
          </section>

          {/* How to steps */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-6">
              Étape par étape : mettre plusieurs liens en bio Instagram
            </h2>
            <ol className="space-y-6">
              {[
                {
                  n: 1,
                  title: "Créer ton compte BeassistLink (gratuit)",
                  body: (
                    <>
                      Rends-toi sur{" "}
                      <Link href="/register" className="text-[#8F00FF] font-semibold hover:underline">
                        beassist-link.com/register
                      </Link>{" "}
                      et crée ton compte en 30 secondes. Choisis ton nom d'utilisateur — il deviendra ton URL
                      personnalisée (ex.{" "}
                      <code className="text-xs bg-gray-100 rounded px-1.5 py-0.5">beassist-link.com/juliedupont</code>).
                    </>
                  ),
                },
                {
                  n: 2,
                  title: "Ajouter tous tes liens",
                  body: "Dans le tableau de bord, clique sur « Liens » puis « Ajouter un lien ». Tu peux ajouter autant de liens que tu veux : YouTube, TikTok, boutique en ligne, Spotify, newsletter, formulaire de contact, etc.",
                },
                {
                  n: 3,
                  title: "Personnaliser ta page bio",
                  body: "Dans l'onglet « Bio », choisis ton thème, ta couleur principale, ajoute ta photo de profil et une courte description. Ta page se prévisualise en temps réel.",
                },
                {
                  n: 4,
                  title: "Copier ton lien dans la bio Instagram",
                  body: (
                    <>
                      Ouvre ton profil Instagram → <strong>Modifier le profil</strong> → champ{" "}
                      <strong>« Site web »</strong>. Colle ton URL BeassistLink. Sauvegarde.
                      Tes abonnés verront désormais un bouton cliquable qui mène à tous tes liens.
                    </>
                  ),
                },
              ].map(({ n, title, body }) => (
                <li key={n} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8F00FF] text-white font-black text-sm flex items-center justify-center">
                    {n}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                    <p className="text-[15px] text-gray-600 leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Tips */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-4">
              5 liens à mettre en priorité dans ta bio Instagram
            </h2>
            <div className="space-y-3">
              {[
                ["🎥", "Ta dernière vidéo YouTube ou Reel", "Le contenu chaud converti mieux qu'une page statique."],
                ["🛒", "Ta boutique ou offre principale", "Lien direct vers ton produit star ou ta page de paiement."],
                ["🎵", "Lien Spotify ou musique", "Indispensable pour les artistes qui veulent scorer des écoutes."],
                ["📧", "Ta newsletter ou formulaire de contact", "Pour convertir tes followers en abonnés email que tu posséderas."],
                ["🔗", "Ton profil TikTok / YouTube", "Fais croître tous tes réseaux en cross-promouvant depuis Instagram."],
              ].map(([emoji, title, tip]) => (
                <div key={title as string} className="flex gap-3 p-4 rounded-xl border border-gray-200">
                  <span className="text-xl">{emoji}</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{title as string}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{tip as string}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-5">Questions fréquentes</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Instagram autorise-t-il les outils de lien bio tiers ?",
                  a: "Oui, totalement. Instagram lui-même recommande d'utiliser ce type d'outil. Aucun risque de bannissement.",
                },
                {
                  q: "Peut-on mettre son lien Spotify dans sa bio Instagram ?",
                  a: "Oui. Ajoute ton URL Spotify dans BeassistLink, puis mets ton lien BeassistLink dans ta bio Instagram. Tes followers accèdent à ta musique en un clic.",
                },
                {
                  q: "BeassistLink est-il vraiment gratuit ?",
                  a: "Oui. Le plan FREE permet de créer une page de lien en bio sans carte bancaire. Les plans payants ajoutent les statistiques, les QR codes et la personnalisation avancée.",
                },
                {
                  q: "Combien de liens peut-on ajouter ?",
                  a: "Sur le plan FREE, tu peux ajouter jusqu'à 10 liens. Les plans Starter et Pro permettent des liens illimités avec analytics avancées.",
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
            <h2 className="text-2xl font-black mb-2">Prêt à ajouter plusieurs liens dans ta bio ?</h2>
            <p className="text-purple-100 mb-6 leading-relaxed max-w-md mx-auto">
              Crée ta page BeassistLink en 30 secondes. Gratuit, sans carte bancaire.
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
              <Link href="/fr/comparatif-linktree" className="text-[#8F00FF] hover:underline">
                → Comparatif Linktree 2026 — quelle alternative choisir ?
              </Link>
              <Link href="/blog/beassistlink-vs-linktree-2026" className="text-[#8F00FF] hover:underline">
                → BeassistLink vs Linktree : le comparatif complet
              </Link>
              <Link href="/blog/optimiser-bio-convertir-2026" className="text-[#8F00FF] hover:underline">
                → Comment optimiser sa bio pour convertir en 2026
              </Link>
            </div>
          </nav>
        </article>

        <Footer />
      </main>
    </>
  );
}
