import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ArrowRight } from "lucide-react";

const BASE = "https://www.beassist-link.com";
const SLUG = "qr-codes-bonnes-pratiques";
const PUBLISHED = "2026-03-28";

export const metadata: Metadata = {
  title: "QR codes : les bonnes pratiques pour l'impression",
  description:
    "Taille, contraste, correction d'erreurs, test sur différents fonds : le guide pratique pour des QR codes qui se scannent à coup sûr.",
  keywords: [
    "qr code impression",
    "bonnes pratiques qr code",
    "taille qr code print",
    "qr code flyer",
    "qr code png svg",
    "créer un qr code",
    "qr code lien en bio",
  ],
  alternates: {
    canonical: `${BASE}/blog/${SLUG}`,
  },
  openGraph: {
    title: "QR codes : les bonnes pratiques pour l'impression",
    description:
      "Taille, contraste, correction d'erreurs, test sur différents fonds : le guide pratique pour des QR codes qui se scannent à coup sûr : par l'équipe BeassistLink 🇫🇷",
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
      headline: "QR codes : les bonnes pratiques pour l'impression",
      description:
        "Taille, contraste, correction d'erreurs, test sur différents fonds : le guide pratique pour des QR codes qui se scannent à coup sûr.",
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
          name: "Quelle taille minimale pour un QR code imprimé ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Compte 2 × 2 cm minimum sur un support tenu en main, et davantage sur les grands formats : la taille recommandée vaut environ un dixième de la distance de lecture. Un QR code scanné à 1,5 m doit mesurer environ 15 cm.",
          },
        },
        {
          "@type": "Question",
          name: "Un QR code en couleur fonctionne-t-il ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui, à condition de conserver un contraste élevé entre le code et le fond : un code sombre sur fond clair reste le plus fiable. Évite les inversions et les teintes trop proches, et teste sur plusieurs téléphones avant d'imprimer. Avec BeassistLink, tu choisis la couleur de ton QR code à la génération.",
          },
        },
        {
          "@type": "Question",
          name: "PNG ou SVG pour l'impression ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Le SVG est le format idéal pour le print : vectoriel, il reste net à n'importe quelle taille. Pour le web ou les petites impressions, un PNG haute définition d'au moins 1000 pixels suffit. N'agrandis jamais un petit PNG : régénère le code à la taille finale.",
          },
        },
      ],
    },
  ],
};

export default function BlogQrCodesBonnesPratiques() {
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
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700">Tutoriel</span>
              <span className="text-xs text-gray-400">28 mars 2026 · 4 min de lecture</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight tracking-tight">
              QR codes : les bonnes pratiques pour l'impression
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Taille, contraste, correction d'erreurs, test sur différents fonds : le guide pratique pour des QR codes
              qui se scannent <strong>à coup sûr</strong>.
            </p>
          </div>
        </header>

        {/* ── Article body ── */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-12">

          {/* Intro */}
          <div className="prose prose-gray max-w-none text-[15px] leading-relaxed">
            <p>
              Un QR code, c'est trois secondes pour convaincre quelqu'un de sortir son téléphone. Encore faut-il qu'il
              se scanne. À l'écran, un QR code flou ou trop petit pardonne rarement : et sur papier, l'erreur coûte
              cher : un flyer, une affiche ou une carte de visite déjà imprimés ne se corrigent pas.
            </p>
            <p>
              Bonne nouvelle : les QR codes ne sont pas une loterie. En respectant une poignée de règles simples, tu
              mets toutes les chances de ton côté. Voici les bonnes pratiques à appliquer <strong>avant chaque
              impression</strong>, et la méthode pour générer un QR code prêt pour le print avec BeassistLink.
            </p>
          </div>

          {/* Bonnes pratiques */}
          <section className="space-y-8">
            <h2 className="text-2xl font-black text-gray-900">Les 8 règles d'or d'un QR code qui se scanne</h2>
            {[
              {
                n: 1,
                title: "Une taille minimale de 2 × 2 cm",
                body: "Sur un support tenu en main, ne descends jamais sous 2 × 2 cm. Pour les grands formats, adapte la taille à la distance de lecture : compte environ un dixième de la distance de scan. Un QR code sur une affiche regardée à 1,50 m doit mesurer environ 15 cm.",
              },
              {
                n: 2,
                title: "Un contraste maximal",
                body: "Un QR code doit être sombre sur fond clair. Le duo noir sur blanc reste le plus fiable. Évite les inversions (code clair sur fond sombre) et les couleurs trop proches : si le contraste est faible, l'appareil photo aura du mal à distinguer les modules du code.",
              },
              {
                n: 3,
                title: "La zone de silence",
                body: "Laisse un cadre blanc tout autour du code : c'est la « zone de silence » qui permet au lecteur de délimiter le code. Garde au minimum quatre modules de marge, soit environ 0,5 cm pour un QR code de 3 cm. Ne colle jamais de texte ou d'éléments graphiques contre le code.",
              },
              {
                n: 4,
                title: "Un fond uni plutôt qu'une photo",
                body: "Un QR code posé sur une photo ou un motif chargé devient illisible : les modules se confondent avec le décor. Choisis un fond uni, ou encadre le code dans un cartouche blanc si le design l'exige.",
              },
              {
                n: 5,
                title: "Des tests sur plusieurs téléphones",
                body: "Teste avant d'imprimer, avec un iPhone et un Android, dans les vraies conditions de lumière : extérieur en plein soleil, intérieur tamisé, écran sale. Si un seul modèle échoue, agrandis le code ou renforce le contraste : c'est plus simple avant l'impression qu'après.",
              },
              {
                n: 6,
                title: "Jamais de redimensionnement à l'aveugle",
                body: "Un PNG de 200 × 200 pixels étiré en 10 cm sera flou, et un QR code flou ne se scanne pas. Régénère toujours le code à sa taille finale plutôt que de redimensionner une petite image : tu gardes des bords nets, module par module.",
              },
              {
                n: 7,
                title: "Un export en PNG haute définition ou en SVG",
                body: "Pour le print, exporte en PNG haute définition (au moins 1000 × 1000 pixels) ou, mieux, en SVG : le format vectoriel reste parfaitement net à n'importe quelle taille, du carton de visite à la bâche publicitaire.",
              },
              {
                n: 8,
                title: "Un QR code à portée de main",
                body: "Sur un flyer, évite le coin replié ou le bas de page trop proche de la découpe. Sur une affiche, place le code entre 90 cm et 1,60 m du sol. Le scan doit rester confortable : personne ne s'accroupit pour scanner un QR code.",
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-orange-100 text-orange-700 font-black text-sm flex items-center justify-center">
                  {n}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Générer un QR avec BeassistLink */}
          <section className="rounded-2xl border border-[#8F00FF]/20 bg-[#F9F5FF] p-6 sm:p-8">
            <h2 className="text-xl font-black text-gray-900 mb-4">Générer un QR code prêt pour le print avec BeassistLink</h2>
            <div className="space-y-3 text-[15px] text-gray-700">
              <p>
                Sur BeassistLink, chaque lien a son QR code. Depuis ton tableau de bord, ouvre le lien concerné, clique
                sur l'onglet QR code, puis choisis <strong>la couleur et la taille</strong> de ton code. Tu peux
                générer un code aux couleurs de ta marque : à condition de garder un contraste suffisant : puis
                l'exporter en <strong>PNG haute définition</strong> pour le web ou en <strong>SVG</strong> pour le
                print.
              </p>
              <p>
                La fonctionnalité QR codes est disponible à partir du plan STARTER. Tu peux comparer les trois plans
                sur la <Link href="/pricing" className="text-[#8F00FF] font-semibold hover:underline">page des tarifs</Link>,
                et lire <Link href="/blog/free-vs-starter-quand-upgrader" className="text-[#8F00FF] font-semibold hover:underline">notre guide FREE vs STARTER</Link> pour
                savoir quand upgrader.
              </p>
              <p>
                Petit rappel : <strong>un QR code = un lien</strong>. Si tu veux renvoyer vers ta page bio complète,
                génère le QR code de ton lien BeassistLink plutôt que de multiplier les codes vers des pages différentes.
              </p>
            </div>
          </section>

          {/* Cas d'usage */}
          <section className="space-y-5">
            <h2 className="text-2xl font-black text-gray-900">Flyer, carte de visite, affiche, packaging : 4 cas d'usage</h2>
            <div className="space-y-4">
              {[
                {
                  t: "Sur un flyer",
                  b: "Le QR code renvoie vers ta page de liens ou vers un lien court dédié à l'événement. Place-le dans un cartouche blanc, à 2,5 cm minimum, loin du pli et de la découpe.",
                },
                {
                  t: "Sur une carte de visite",
                  b: "Le format est réduit : 2 cm minimum, sur une face dédiée, avec ton URL écrite en toutes lettres à côté. Le code pointe vers ta page bio BeassistLink, qui concentre tous tes liens.",
                },
                {
                  t: "Sur une affiche",
                  b: "Grand format = grande distance de lecture : agrandis le code en conséquence et exporte en SVG pour qu'il reste net. Vise un code mesurant un dixième de la distance à laquelle les passants le verront.",
                },
                {
                  t: "Sur un packaging",
                  b: "Le code doit rester plan au moment du scan : colle-le sur une face plate de l'emballage, jamais sur un angle ou une surface courbée. Sur un étui, préfère une face large et un contraste fort.",
                },
              ].map(({ t, b }) => (
                <div key={t} className="rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold text-gray-900 text-[15px] mb-2">{t}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Checklist */}
          <section className="rounded-2xl border border-[#8F00FF]/20 bg-[#F9F5FF] p-6 sm:p-8">
            <h2 className="text-xl font-black text-gray-900 mb-4">La checklist avant d'envoyer chez l'imprimeur</h2>
            <ul className="space-y-3 text-[15px] text-gray-700">
              {[
                "Mon QR code mesure au moins 2 × 2 cm (et plus sur les grands formats)",
                "Le contraste est fort : code sombre sur fond clair",
                "La zone de silence est respectée tout autour du code",
                "Le code n'est pas posé sur une photo ou un motif chargé",
                "J'ai testé le scan sur iPhone et Android, en extérieur et en intérieur",
                "J'ai exporté en PNG haute définition ou en SVG",
                "Le QR code est placé à une hauteur de scan confortable",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-md bg-[#8F00FF] text-white text-xs font-bold flex items-center justify-center mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-5">Questions fréquentes</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Quelle taille minimale pour un QR code imprimé ?",
                  a: "2 × 2 cm sur un support tenu en main, et davantage sur les grands formats : compte environ un dixième de la distance de lecture. Un QR code scanné à 1,5 m doit mesurer environ 15 cm.",
                },
                {
                  q: "Un QR code en couleur fonctionne-t-il ?",
                  a: "Oui, à condition de garder un contraste élevé : un code sombre sur un fond clair. Évite les inversions et les couleurs proches, et teste sur plusieurs téléphones avant d'imprimer.",
                },
                {
                  q: "PNG ou SVG pour l'impression ?",
                  a: "Le SVG est idéal pour le print : vectoriel, il reste net à n'importe quelle taille. Pour le web, un PNG haute définition d'au moins 1000 pixels suffit. N'agrandis jamais un petit PNG : régénère le code.",
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
            <h2 className="text-2xl font-black mb-2">Imprime des QR codes qui se scannent</h2>
            <p className="text-purple-100 mb-6 leading-relaxed max-w-md mx-auto">
              Crée ta page BeassistLink en 30 secondes, puis génère tes QR codes en couleur dès le plan Starter.
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
              <Link href="/blog/10-liens-bio-instagram" className="text-[#8F00FF] hover:underline">
                → 10 liens à mettre dans ta bio Instagram pour convertir
              </Link>
              <Link href="/fr/comparatif-linktree" className="text-[#8F00FF] hover:underline">
                → Comparatif Linktree 2026 : quelle alternative choisir ?
              </Link>
            </div>
          </nav>
        </article>

        <Footer />
      </main>
    </>
  );
}
