import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ArrowRight } from "lucide-react";

const BASE = "https://www.beassist-link.com";
const SLUG = "beassistlink-vs-linktree-2026";
const PUBLISHED = "2026-04-12";

export const metadata: Metadata = {
  title: "BeassistLink vs Linktree en 2026 : le comparatif complet",
  description:
    "Prix, limites du plan gratuit, personnalisation, statistiques, QR codes, RGPD : le comparatif complet entre BeassistLink et Linktree pour choisir ton outil de lien en bio en 2026.",
  keywords: [
    "beassistlink vs linktree",
    "comparatif linktree 2026",
    "alternative linktree",
    "alternative française linktree",
    "lien en bio comparatif",
    "linktree prix 2026",
    "meilleur outil lien en bio",
  ],
  alternates: {
    canonical: `${BASE}/blog/${SLUG}`,
  },
  openGraph: {
    title: "BeassistLink vs Linktree en 2026 : le comparatif complet",
    description:
      "Prix, plan gratuit, statistiques, QR codes et RGPD : chaque différence entre BeassistLink et Linktree passée au crible — par l'équipe BeassistLink 🇫🇷",
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
      headline: "BeassistLink vs Linktree en 2026 : le comparatif complet",
      description:
        "Prix, limites du plan gratuit, personnalisation, statistiques, QR codes et RGPD : le comparatif complet entre BeassistLink et Linktree pour choisir son lien en bio en 2026.",
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
          name: "BeassistLink est-il vraiment moins cher que Linktree ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui. BeassistLink propose un plan FREE à 0 €, un plan STARTER à 6 €/mois (ou 65 €/an) et un plan PRO à 12 €/mois (ou 130 €/an), facturés en euros. L'offre payante de Linktree coûte environ 9 $/mois en 2026, soit plus cher que le STARTER pour un périmètre de fonctionnalités proche.",
          },
        },
        {
          "@type": "Question",
          name: "Les statistiques sont-elles incluses dans le plan gratuit de BeassistLink ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Non. Le plan FREE n'inclut pas de statistiques : c'est le principal compromis du gratuit. Les statistiques des clics arrivent avec le plan STARTER (6 €/mois), et le plan PRO ajoute les données avancées par pays, appareils et sources de trafic.",
          },
        },
        {
          "@type": "Question",
          name: "BeassistLink est-il conforme au RGPD ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui. BeassistLink est hébergé en Europe et la conformité RGPD y est native : aucun cookie de tracking tiers n'est injecté sur ta page bio. C'est une différence majeure avec Linktree, entreprise américaine soumise à un cadre légal différent.",
          },
        },
      ],
    },
  ],
};

export default function BlogBeassistlinkVsLinktree2026() {
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
              <span className="text-xs text-gray-400">12 avril 2026 · 6 min de lecture</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight tracking-tight">
              BeassistLink vs Linktree en 2026 : le comparatif complet
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Prix, fonctionnalités, analytics, RGPD… On décortique <strong>chaque différence</strong> entre
              BeassistLink et Linktree pour t'aider à choisir.
            </p>
          </div>
        </header>

        {/* ── Article body ── */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-12">

          {/* Intro */}
          <div className="prose prose-gray max-w-none text-[15px] leading-relaxed">
            <p>
              Linktree est l'outil que tout le monde cite. Mais en 2026, « connu » ne veut plus dire « le mieux
              adapté » : les créateurs francophones ont désormais le choix, et BeassistLink s'est taillé une place
              sérieuse face au leader américain.
            </p>
            <p>
              Plutôt que de trancher à ta place, on passe chaque critère au crible : prix, plan gratuit,
              personnalisation, statistiques, QR codes, RGPD, support. À la fin, tu sauras exactement lequel
              correspond à ton profil.
            </p>
          </div>

          {/* Prix */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">Les prix : l'écart qui se voit tout de suite</h2>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              BeassistLink joue la transparence avec trois plans en euros. Le plan FREE est à 0 € : une page bio,
              5 liens sur la page, 3 liens courts et un thème de base. Le plan STARTER passe à 6 €/mois (ou 65 €/an),
              et le plan PRO à 12 €/mois (ou 130 €/an). Linktree, de son côté, affiche son offre payante autour de
              9 $/mois en 2026. Concrètement : le STARTER de BeassistLink coûte moins cher que l'abonnement Linktree,
              avec les statistiques et les QR codes inclus. Le détail complet des trois plans est sur notre{" "}
              <Link href="/pricing" className="text-[#8F00FF] font-medium hover:underline">page tarifs</Link>.
            </p>
          </section>

          {/* Plan gratuit */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">Le plan gratuit : ce que tu as vraiment à 0 €</h2>
            <p className="text-[15px] text-gray-600 leading-relaxed mb-3">
              Le vrai test d'un outil de lien en bio, c'est son offre gratuite. Le plan FREE de BeassistLink te donne
              une page bio fonctionnelle avec 5 liens et 3 liens courts, sans carte bancaire et sans engagement. Chez
              Linktree, le plan gratuit existe, mais il limite le nombre de liens et réserve la personnalisation aux
              formules payantes.
            </p>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              Pour un jeune créateur qui démarre, la différence est nette : avec BeassistLink, tu lances une vraie page
              bio à 0 € ; avec Linktree, tu te heurtes vite au mur du payant.
            </p>
          </section>

          {/* Personnalisation */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">La personnalisation : ta page doit te ressembler</h2>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              Une page bio générique ne convertit pas — on l'explique en détail dans notre article sur{" "}
              <Link href="/blog/7-erreurs-lien-en-bio" className="text-[#8F00FF] font-medium hover:underline">
                les 7 erreurs qui font fuir les visiteurs de ton lien en bio
              </Link>
              . BeassistLink te laisse ajouter ta photo, ton nom, une courte bio et tes couleurs dès la création. Le
              plan STARTER débloque 5 thèmes premium, et les plans payants offrent une personnalisation complète de la
              page. Linktree personnalise bien, mais ses plus belles options sont derrière l'abonnement payant. Si ton
              identité visuelle compte, regarde ce que chaque plan inclut avant de payer.
            </p>
          </section>

          {/* Statistiques */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">Les statistiques : savoir ce qui clique</h2>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              Une page de liens sans données, c'est de la décoration. BeassistLink intègre les statistiques des clics
              dès le plan STARTER, et le PRO ajoute les données avancées : pays, appareils, sources de trafic. Le plan
              FREE n'inclut pas de statistiques — c'est le compromis du gratuit, et il est important de le savoir avant
              de choisir. Chez Linktree, les analytics sont historiquement réservées aux plans payants, souvent l'offre
              la plus chère. Si tu veux savoir quel lien convertit ton audience, compare bien ce que chaque formule
              inclut.
            </p>
          </section>

          {/* QR codes */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">Les QR codes : du téléphone au monde réel</h2>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              Affiches, flyers, cartes de visite, packaging : le QR code ramène les gens hors ligne vers ta page.
              BeassistLink inclut les QR codes dès le plan STARTER, et le PRO les rend illimités. Linktree propose
              aussi des QR codes sur ses offres payantes, mais il faut monter en gamme pour en profiter. Si tu
              imprimes régulièrement des supports, un outil qui intègre le QR dans le même abonnement t'évite de payer
              un second service.
            </p>
          </section>

          {/* RGPD */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">RGPD et hébergement : la différence invisible qui compte</h2>
            <p className="text-[15px] text-gray-600 leading-relaxed mb-3">
              C'est le critère que les comparatifs oublient, et pourtant le plus structurant en Europe. BeassistLink
              est hébergé en Europe et pensé RGPD natif : aucun cookie de tracking tiers n'est injecté sur ta page.
              Linktree est une entreprise américaine, et les données de tes visiteurs traversent un cadre légal
              différent.
            </p>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              Pour ton audience, c'est un signal de confiance ; pour toi, c'est une tranquillité en cas de contrôle. Si
              tu revends, recommandes ou collectes quoi que ce soit depuis ta bio, ce point n'est pas négociable.
            </p>
          </section>

          {/* Support */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">Support et langue : le quotidien en français</h2>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              Ta page tombe en panne le jour d'un lancement ? Tu veux une réponse en français, maintenant. BeassistLink
              propose un support en français, avec une priorité sur le plan PRO. Linktree, leader mondial, gère ses
              millions d'utilisateurs essentiellement en anglais. Pour un créateur francophone, cette différence se
              ressent à chaque question.
            </p>
          </section>

          {/* Verdict */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-5">Le verdict : pour qui chacun ?</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-[#8F00FF]/30 bg-[#F9F5FF] p-6">
                <h3 className="font-bold text-[#8F00FF] text-lg mb-3">Quand choisir BeassistLink ?</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {[
                    "tu es créateur, freelance ou marque francophone",
                    "tu veux un plan gratuit généreux et des upgrades progressifs",
                    "le RGPD et l'hébergement en Europe comptent pour toi",
                    "tu veux stats, QR et support en français sans payer le prix fort",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-[#8F00FF] font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 text-lg mb-3">Quand choisir Linktree ?</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {[
                    "tu es déjà bien engagé dans l'écosystème Linktree",
                    "tu vises une audience internationale et anglophone",
                    "tu as besoin d'intégrations très spécifiques que Linktree couvre",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-gray-400 font-bold">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-[15px] text-gray-600 leading-relaxed mt-5">
              Pour la grande majorité des créateurs francophones, le verdict est clair : BeassistLink coche plus de
              cases, pour moins cher. Le mieux reste de tester — la création d'une page prend moins de 30 secondes, et
              le plan FREE ne te coûte rien.
            </p>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-5">Questions fréquentes</h2>
            <div className="space-y-4">
              {[
                {
                  q: "BeassistLink est-il vraiment moins cher que Linktree ?",
                  a: "Oui. Le plan FREE est à 0 €, le STARTER à 6 €/mois (ou 65 €/an) et le PRO à 12 €/mois (ou 130 €/an), en euros. L'offre payante de Linktree coûte environ 9 $/mois en 2026.",
                },
                {
                  q: "Les statistiques sont-elles incluses dans le plan gratuit de BeassistLink ?",
                  a: "Non, le plan FREE n'inclut pas de statistiques. Elles arrivent avec le STARTER (statistiques des clics) et le PRO (pays, appareils, sources de trafic).",
                },
                {
                  q: "BeassistLink est-il conforme au RGPD ?",
                  a: "Oui. BeassistLink est hébergé en Europe et RGPD natif : aucun cookie de tracking tiers n'est injecté sur ta page. Un point qui le distingue nettement de Linktree.",
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
            <h2 className="text-2xl font-black mb-2">Compare en conditions réelles</h2>
            <p className="text-purple-100 mb-6 leading-relaxed max-w-md mx-auto">
              Crée ta page BeassistLink gratuite en 30 secondes et juge par toi-même — sans carte bancaire.
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
              <Link href="/blog/plusieurs-liens-instagram" className="text-[#8F00FF] hover:underline">
                → Comment avoir plusieurs liens sur Instagram sans payer
              </Link>
              <Link href="/blog/10-liens-bio-instagram" className="text-[#8F00FF] hover:underline">
                → 10 liens à mettre dans ta bio Instagram pour convertir
              </Link>
              <Link href="/blog/beassistlink-vs-bio-link-alternatives" className="text-[#8F00FF] hover:underline">
                → Linktree, Milkshake, Later, Shorby… le tour d'horizon 2026
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
