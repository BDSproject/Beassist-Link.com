import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ArrowRight } from "lucide-react";

const BASE = "https://www.beassist-link.com";
const SLUG = "free-vs-starter-quand-upgrader";
const PUBLISHED = "2026-03-22";

export const metadata: Metadata = {
  title: "FREE vs STARTER : quand passer au plan supérieur ?",
  description:
    "Les 5 signaux concrets qui montrent qu'il est temps d'upgrader et ce que tu gagnes vraiment en passant au Starter.",
  keywords: [
    "plan gratuit lien en bio",
    "beassistlink starter",
    "beassistlink tarifs",
    "quand upgrader lien en bio",
    "qr code plan starter",
    "statistiques lien en bio",
    "lien personnalisé bio",
  ],
  alternates: {
    canonical: `${BASE}/blog/${SLUG}`,
  },
  openGraph: {
    title: "FREE vs STARTER : quand passer au plan supérieur ?",
    description:
      "Les 5 signaux concrets qui montrent qu'il est temps d'upgrader et ce que tu gagnes vraiment en passant au Starter — par l'équipe BeassistLink 🇫🇷",
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
      headline: "FREE vs STARTER : quand passer au plan supérieur ?",
      description:
        "Les 5 signaux concrets qui montrent qu'il est temps d'upgrader et ce que tu gagnes vraiment en passant au Starter.",
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
          name: "Le plan FREE de BeassistLink est-il vraiment gratuit ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui : le plan FREE coûte 0 € et le reste. Il comprend 1 page bio, 5 liens sur la page, 3 liens courts et 1 thème de base, sans statistiques ni QR codes. Tu peux créer ta page sans payer et l'utiliser aussi longtemps que tu veux.",
          },
        },
        {
          "@type": "Question",
          name: "Que contiennent les statistiques du plan STARTER ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Les statistiques des clics : nombre de visites, pays, appareils et sources de trafic. Elles te disent quel lien convertit, ce qui intéresse vraiment ton audience et ce qu'il faut optimiser sur ta page.",
          },
        },
        {
          "@type": "Question",
          name: "À partir de quel plan les QR codes sont-ils disponibles ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Les QR codes sont disponibles à partir du plan STARTER : un QR code par lien, avec le choix de la couleur et de la taille, exportable en PNG haute définition ou en SVG. Le plan PRO les rend illimités.",
          },
        },
      ],
    },
  ],
};

export default function BlogFreeVsStarterQuandUpgrader() {
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
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700">Conseils</span>
              <span className="text-xs text-gray-400">22 mars 2026 · 3 min de lecture</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight tracking-tight">
              FREE vs STARTER : quand passer au plan supérieur ?
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Les 5 signaux concrets qui montrent qu'il est temps d'upgrader et ce que tu gagnes vraiment en passant
              au <strong>Starter</strong>.
            </p>
          </div>
        </header>

        {/* ── Article body ── */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-12">

          {/* Intro */}
          <div className="prose prose-gray max-w-none text-[15px] leading-relaxed">
            <p>
              Le plan gratuit de BeassistLink est généreux : une page bio, cinq liens, trois liens courts, de quoi
              lancer ton projet sans sortir la carte bancaire. Mais il arrive un moment où le plan FREE devient un
              frein plutôt qu'un tremplin.
            </p>
            <p>
              Ce n'est pas une question de budget, mais de besoins : les créateurs qui passent au plan STARTER le font
              presque toujours pour la même poignée de raisons. Voici les 5 signaux qui montrent qu'il est temps
              d'upgrader — et ce que tu gagnes vraiment en passant au Starter.
            </p>
          </div>

          {/* Plans */}
          <section className="rounded-2xl border border-[#8F00FF]/20 bg-[#F9F5FF] p-6 sm:p-8">
            <h2 className="text-xl font-black text-gray-900 mb-4">Ce que contient chaque plan</h2>
            <div className="space-y-4">
              <div className="rounded-xl bg-white border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900 text-[15px] mb-2">FREE — 0 €</h3>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  <li>• 1 page bio et 5 liens sur la page</li>
                  <li>• 3 liens courts et 1 thème de base</li>
                  <li>• Pas de statistiques ni de QR codes</li>
                </ul>
              </div>
              <div className="rounded-xl bg-white border border-[#8F00FF]/30 p-4">
                <h3 className="font-bold text-gray-900 text-[15px] mb-2">STARTER — 6 €/mois ou 65 €/an</h3>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  <li>• 3 pages bio et 20 liens sur la page</li>
                  <li>• 20 liens courts et 5 thèmes premium</li>
                  <li>• Statistiques des clics, QR codes et lien personnalisé</li>
                </ul>
              </div>
              <div className="rounded-xl bg-white border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900 text-[15px] mb-2">PRO — 12 €/mois ou 130 €/an</h3>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  <li>• Tout illimité, statistiques avancées et QR illimités</li>
                  <li>• Liens programmés, domaine personnalisé et support prioritaire</li>
                </ul>
              </div>
              <p className="text-sm text-gray-700">
                Le détail complet de chaque plan est sur la{" "}
                <Link href="/pricing" className="text-[#8F00FF] font-semibold hover:underline">page des tarifs</Link>.
              </p>
            </div>
          </section>

          {/* 5 signaux */}
          <section className="space-y-8">
            <h2 className="text-2xl font-black text-gray-900">Les 5 signaux qu'il est temps d'upgrader</h2>
            {[
              {
                n: 1,
                title: "Tu as besoin de plus de 5 liens",
                body: "Ta page est pleine et tu dois faire des choix douloureux à chaque nouveau lien : la boutique, le podcast, le formulaire de contact, l'événement du mois. Avec le Starter, tu passes à 20 liens sur la page. Si ton seul besoin est d'afficher plusieurs liens Instagram, commence par lire notre guide pour avoir plusieurs liens sur Instagram.",
                link: { href: "/blog/plusieurs-liens-instagram", label: "Comment avoir plusieurs liens sur Instagram" },
              },
              {
                n: 2,
                title: "Tu veux suivre tes clics",
                body: "Sans statistiques, tu publies à l'aveugle : tu ne sais pas quel lien convertit, ni d'où viennent tes visiteurs. Le Starter débloque les statistiques des clics — visites, pays, appareils, sources de trafic — pour savoir ce qui marche et corriger le reste.",
              },
              {
                n: 3,
                title: "Tu veux un QR code",
                body: "Flyers, cartes de visite, affiches : le QR code reste le pont le plus court entre le papier et ta page. Disponible à partir du Starter, avec la couleur et la taille de ton choix, et un export en PNG haute définition ou en SVG pour le print.",
                link: { href: "/blog/qr-codes-bonnes-pratiques", label: "QR codes : les bonnes pratiques pour l'impression" },
              },
              {
                n: 4,
                title: "Tu veux 3 pages bio ou des thèmes premium",
                body: "Une page par projet : ta musique, ton coaching, ta boutique. Le Starter te donne 3 pages bio et 5 thèmes premium pour que chaque page ressemble vraiment à ce que tu fais — sans repartir d'une page vierge à chaque fois.",
              },
              {
                n: 5,
                title: "Ton lien en bio devient un canal d'acquisition sérieux",
                body: "Quand ta bio t'apporte des clients, des ventes ou des inscriptions, 6 € par mois se rentabilise vite : un seul client gagné grâce à tes statistiques peut couvrir l'année. C'est le signal le plus fiable : tu n'upgrades plus pour « tester », tu investis dans un canal qui rapporte.",
              },
            ].map(({ n, title, body, link }) => (
              <div key={n} className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-yellow-100 text-yellow-700 font-black text-sm flex items-center justify-center">
                  {n}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed">
                    {body}
                    {link && (
                      <>
                        {" "}
                        <Link href={link.href} className="text-[#8F00FF] font-semibold hover:underline">
                          {link.label}
                        </Link>
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </section>

          {/* Ce que tu gagnes */}
          <section className="space-y-5">
            <h2 className="text-2xl font-black text-gray-900">Ce que tu gagnes concrètement</h2>
            <div className="space-y-4">
              {[
                {
                  t: "Les statistiques des clics",
                  b: "Tu sais enfin quel lien convertit. C'est la différence entre une bio décorative et une bio qui travaille : garde ce qui marche, reformule ce qui ne marche pas.",
                },
                {
                  t: "Les QR codes",
                  b: "Un QR code par lien, en couleur, exportable en PNG haute définition ou en SVG. De quoi poser ton lien sur tous tes supports print, du flyer au packaging.",
                },
                {
                  t: "Les thèmes premium et les 3 pages",
                  b: "Une page à ton image, et une page par projet. Ton audience retrouve ton univers visuel à chaque clic, et tu sépares tes activités sans créer plusieurs comptes.",
                },
                {
                  t: "Le lien personnalisé",
                  b: "Une URL courte à ton nom, plus pro à partager en story, en description ou sur un support imprimé — et plus simple à retenir pour ton audience.",
                },
              ].map(({ t, b }) => (
                <div key={t} className="rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold text-gray-900 text-[15px] mb-2">{t}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Prix */}
          <section className="rounded-2xl border border-[#8F00FF]/20 bg-[#F9F5FF] p-6 sm:p-8">
            <h2 className="text-xl font-black text-gray-900 mb-4">Le prix, en clair</h2>
            <p className="text-[15px] text-gray-700 leading-relaxed mb-3">
              Le plan STARTER coûte <strong>6 €/mois</strong>, ou <strong>65 €/an</strong> — soit environ
              5,40 €/mois en paiement annuel. C'est le prix d'un café par semaine pour transformer ta bio en outil de
              travail.
            </p>
            <p className="text-[15px] text-gray-700 leading-relaxed">
              Compare les trois plans sur la{" "}
              <Link href="/pricing" className="text-[#8F00FF] font-semibold hover:underline">page des tarifs</Link>{" "}
              avant de choisir : le bon plan, c'est celui qui couvre tes besoins d'aujourd'hui, pas celui des autres.
            </p>
          </section>

          {/* Quand ne pas upgrader */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-gray-900">Quand ne pas upgrader</h2>
            <div className="space-y-4">
              {[
                {
                  t: "Tu débutes et tu testes encore l'outil",
                  b: "Reste en FREE le temps de prendre tes marques : crée ta page, publie tes premiers liens, observe comment ton audience réagit. Le plan gratuit n'a pas de date d'expiration.",
                },
                {
                  t: "Tu utilises moins de 5 liens et aucun support print",
                  b: "Si ta page tient en 5 liens, que les statistiques ne te serviraient pas encore et que tu n'imprimes rien, le gratuit suffit amplement. L'upgrade n'est pas une étape obligatoire : c'est une réponse à un besoin.",
                },
                {
                  t: "Tu upgrades « au cas où »",
                  b: "N'upgrade pas par principe, upgrade quand un besoin concret apparaît. Le meilleur moment pour passer au Starter, c'est celui où le plan FREE te fait perdre du temps ou des clics.",
                },
              ].map(({ t, b }) => (
                <div key={t} className="rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold text-gray-900 text-[15px] mb-2">{t}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{b}</p>
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
                  q: "Le plan FREE de BeassistLink est-il vraiment gratuit ?",
                  a: "Oui : 0 €, et ça le reste. Il comprend 1 page bio, 5 liens sur la page, 3 liens courts et 1 thème de base, sans statistiques ni QR codes. Tu peux créer ta page sans payer.",
                },
                {
                  q: "Que contiennent les statistiques du plan STARTER ?",
                  a: "Les statistiques des clics : nombre de visites, pays, appareils et sources de trafic. De quoi savoir quel lien convertit et optimiser ta page chaque semaine.",
                },
                {
                  q: "À partir de quel plan les QR codes sont-ils disponibles ?",
                  a: "Du plan STARTER, avec un QR code par lien. Tu choisis la couleur et la taille, et tu exportes en PNG haute définition ou en SVG. Le plan PRO les rend illimités.",
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
            <h2 className="text-2xl font-black mb-2">Upgrade au bon moment, pas par habitude</h2>
            <p className="text-purple-100 mb-6 leading-relaxed max-w-md mx-auto">
              Crée ta page gratuite en 30 secondes, vois ce que tu utilises vraiment, et passe au Starter quand tu en
              as besoin.
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
              <Link href="/blog/qr-codes-bonnes-pratiques" className="text-[#8F00FF] hover:underline">
                → QR codes : les bonnes pratiques pour l'impression
              </Link>
              <Link href="/blog/7-erreurs-lien-en-bio" className="text-[#8F00FF] hover:underline">
                → 7 erreurs qui font fuir les visiteurs de ton lien en bio
              </Link>
              <Link href="/blog/10-liens-bio-instagram" className="text-[#8F00FF] hover:underline">
                → 10 liens à mettre dans ta bio Instagram pour convertir
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
