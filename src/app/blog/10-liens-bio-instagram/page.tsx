import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ArrowRight } from "lucide-react";

const BASE = "https://www.beassist-link.com";
const SLUG = "10-liens-bio-instagram";
const PUBLISHED = "2026-09-28";

export const metadata: Metadata = {
  title: "10 liens à mettre dans ta bio Instagram pour convertir tes abonnés",
  description:
    "Boutique, newsletter, rendez-vous, Spotify… Les 10 liens qui transforment vraiment tes abonnés en clients, et comment les réunir en un seul lien gratuit.",
  keywords: [
    "liens à mettre en bio instagram",
    "idées lien en bio",
    "lien en bio qui convertit",
    "bio instagram boutique",
    "lien en bio créateur",
    "page de liens idées",
    "lien en bio instagram",
  ],
  alternates: {
    canonical: `${BASE}/blog/${SLUG}`,
  },
  openGraph: {
    title: "10 liens à mettre dans ta bio Instagram pour convertir",
    description:
      "Les 10 liens qui transforment tes abonnés en clients : par l'équipe BeassistLink 🇫🇷",
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
      headline: "10 liens à mettre dans ta bio Instagram pour convertir tes abonnés",
      description:
        "Boutique, newsletter, rendez-vous, Spotify : les 10 liens qui transforment tes abonnés en clients, réunis en un seul lien.",
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
          name: "Quel lien mettre en premier dans sa bio ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Celui qui te rapporte le plus : ta boutique, ton offre ou ton appel découverte. La première position capte l'essentiel des clics, alors mets-y ton objectif principal.",
          },
        },
        {
          "@type": "Question",
          name: "Peut-on changer ses liens régulièrement ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui, et c'est recommandé. Beaucoup de créateurs changent leur lien principal chaque semaine pour suivre leur contenu du moment : une vidéo, une promo, un lancement.",
          },
        },
        {
          "@type": "Question",
          name: "Est-ce que BeassistLink est vraiment gratuit ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Le plan FREE comprend une page de lien en bio avec plusieurs liens, sans carte bancaire. Les plans payants ajoutent les statistiques, les QR codes et la personnalisation avancée.",
          },
        },
      ],
    },
  ],
};

export default function BlogDixLiensBioInstagram() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="overflow-hidden bg-white min-h-screen">
        <Navbar />

        {/* ── Article header ── */}
        <header className="pt-28 pb-10 border-b border-gray-100 bg-gradient-to-b from-[#FFF7ED] to-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700">Idées</span>
              <span className="text-xs text-gray-400">28 septembre 2026 · 5 min de lecture</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight tracking-tight">
              10 liens à mettre dans ta bio Instagram pour convertir
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Un seul lien cliquable dans ta bio, mais des dizaines de choses à montrer. La clé n'est pas d'en mettre
              le plus possible : c'est de <strong>choisir les bons</strong>.
            </p>
          </div>
        </header>

        {/* ── Article body ── */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-12">

          {/* Intro */}
          <div className="prose prose-gray max-w-none text-[15px] leading-relaxed">
            <p>
              Ta bio Instagram est un couloir : tes abonnés y passent quelques secondes avant de décider où aller.
              Chaque lien que tu y mets doit donc avoir un rôle précis. Voici les <strong>10 liens qui convertissent
              vraiment</strong>, quel que soit ton domaine : puis comment les réunir en un seul.
            </p>
          </div>

          {/* Les 10 liens */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-6">Les 10 liens qui transforment tes abonnés en clients</h2>
            <div className="space-y-3">
              {[
                ["🛒", "Ta boutique ou ton offre principale", "Le lien qui rapporte. Mets ton produit star ou ta page de paiement en premier : c'est ce que tes abonnés doivent voir en arrivant."],
                ["🎥", "Ta dernière vidéo YouTube ou ton Reel", "Le contenu chaud donne envie de cliquer. Remplace ce lien à chaque nouvelle publication pour rester dans l'instant."],
                ["📱", "Ton profil TikTok ou ta chaîne YouTube", "La cross-promo est le moyen le plus simple de faire grandir plusieurs réseaux à la fois : un abonné Instagram devient un abonné TikTok."],
                ["💌", "Ta newsletter ou ton cadeau de bienvenue", "Transforme tes followers en abonnés email que tu possèdes vraiment. L'algorithme pourra te cacher des posts, jamais ton fichier email."],
                ["🎵", "Ton lien Spotify ou Apple Music", "Indispensable pour les artistes : une seule page pour les écoutes, les clips et les dates de concert."],
                ["📅", "Ton lien de prise de rendez-vous", "Coaching, prestations, services : un lien direct vers ton agenda supprime toutes les frictions entre l'envie et la réservation."],
                ["⚡", "Le lien court de ta promo du moment", "Une URL courte et mémorable que tu peux coller en story, en légende ou sur un flyer : avec un QR code généré en un clic."],
                ["🤝", "Ton media kit ou ta page partenariats", "Les marques qui veulent collaborer cherchent tes chiffres. Rends-les accessibles en un clic et tu deviens facile à contacter."],
                ["💰", "Ton programme d'affiliation", "Chaque recommandation peut devenir une source de revenus. Un lien propre et traçable vaut mieux qu'une liste interminable de codes promo."],
                ["🌟", "Ta plateforme exclusive (OnlyFans, MYM, Fansly…)", "Si tu proposes du contenu exclusif, ta page de liens doit y mener discrètement mais sûrement : accessible sans en faire la une."],
              ].map(([emoji, title, tip]) => (
                <div key={title as string} className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#8F00FF]/40 transition-colors">
                  <span className="text-2xl">{emoji}</span>
                  <div>
                    <p className="font-semibold text-gray-900">{title as string}</p>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{tip as string}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Comment tout réunir */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">Comment faire tenir tout ça dans un seul lien ?</h2>
            <div className="text-[15px] text-gray-600 leading-relaxed space-y-3">
              <p>
                Instagram n'accepte qu'<strong>un seul lien cliquable</strong> dans la bio. La solution, c'est une
                page de liens qui regroupe tes 10 destinations, organisées par priorité : les plus importantes en
                haut, les autres juste en dessous.
              </p>
              <p>
                Avec <strong>BeassistLink</strong>, tu crées cette page gratuitement en 30 secondes : tu choisis ton
                nom d'utilisateur (il devient ton URL), tu ajoutes tes liens, tu personnalises les couleurs : et tu
                suis les clics sur chaque lien pour savoir ce qui convertit.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-5">Questions fréquentes</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Quel lien mettre en premier dans sa bio ?",
                  a: "Celui qui te rapporte le plus : ta boutique, ton offre ou ton appel découverte. La première position capte l'essentiel des clics, alors mets-y ton objectif principal.",
                },
                {
                  q: "Peut-on changer ses liens régulièrement ?",
                  a: "Oui, et c'est recommandé. Beaucoup de créateurs changent leur lien principal chaque semaine pour suivre leur contenu du moment : une vidéo, une promo, un lancement.",
                },
                {
                  q: "Est-ce que BeassistLink est vraiment gratuit ?",
                  a: "Le plan FREE comprend une page de lien en bio avec plusieurs liens, sans carte bancaire. Les plans payants ajoutent les statistiques, les QR codes et la personnalisation avancée.",
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
            <h2 className="text-2xl font-black mb-2">Réunis tes 10 liens en un seul</h2>
            <p className="text-purple-100 mb-6 leading-relaxed max-w-md mx-auto">
              Crée ta page de liens en 30 secondes, personnalisée à tes couleurs. Gratuit, sans carte bancaire.
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
              <Link href="/blog/7-erreurs-lien-en-bio" className="text-[#8F00FF] hover:underline">
                → 7 erreurs qui font fuir les visiteurs de ton lien en bio
              </Link>
              <Link href="/blog/plusieurs-liens-instagram" className="text-[#8F00FF] hover:underline">
                → Comment avoir plusieurs liens sur Instagram sans payer
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
