import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Check, X, ArrowRight } from "lucide-react";

const BASE = "https://www.beassist-link.com";

export const metadata: Metadata = {
  title: "Comparatif Linktree 2026 — Que choisir ?",
  description:
    "Linktree vs BeassistLink vs Milkshake vs Later : comparatif complet 2026. Solution française gratuite et conforme RGPD.",
  keywords: [
    "alternative linktree",
    "linktree gratuit",
    "comparatif linktree",
    "alternative linktree française",
    "linktree alternative gratuite",
    "meilleur outil lien bio",
    "linktree alternative free",
    "link in bio tool",
    "custom bio link page",
    "lien en bio instagram",
  ],
  alternates: {
    canonical: `${BASE}/fr/comparatif-linktree`,
    languages: {
      "fr-FR": `${BASE}/fr/comparatif-linktree`,
    },
  },
  openGraph: {
    title: "Comparatif Linktree 2026 — BeassistLink face à Linktree",
    description:
      "Linktree vs BeassistLink : prix, fonctionnalités, RGPD. La solution française qui surpasse Linktree à moindre coût.",
    url: `${BASE}/fr/comparatif-linktree`,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "BeassistLink face à Linktree — comparatif 2026",
  description:
    "Comparatif complet entre BeassistLink, Linktree, Milkshake et Later Link in Bio. Fonctionnalités, prix, conformité RGPD.",
  datePublished: "2026-04-14",
  dateModified: "2026-04-14",
  author: { "@type": "Organization", name: "BeassistLink" },
  publisher: {
    "@type": "Organization",
    name: "BeassistLink",
    logo: { "@type": "ImageObject", url: `${BASE}/icon.svg` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}/fr/comparatif-linktree` },
};

// ── Comparison data ─────────────────────────────────────────────────────────
type CellValue = boolean | string;

const rows: { feature: string; beassist: CellValue; linktree: CellValue; milkshake: CellValue; later: CellValue }[] = [
  { feature: "Liens illimités (plan gratuit)", beassist: true, linktree: false, milkshake: true, later: false },
  { feature: "Analytics avancées (clics, sources)", beassist: true, linktree: false, milkshake: false, later: false },
  { feature: "QR Code intégré", beassist: true, linktree: false, milkshake: false, later: false },
  { feature: "URL courte personnalisée", beassist: true, linktree: false, milkshake: false, later: false },
  { feature: "Domaine personnalisé", beassist: true, linktree: true, milkshake: false, later: true },
  { feature: "Hébergement Europe / RGPD natif", beassist: true, linktree: false, milkshake: false, later: false },
  { feature: "Support en français", beassist: true, linktree: false, milkshake: false, later: false },
  { feature: "Prix plan payant / mois", beassist: "6 €", linktree: "9 $", milkshake: "Gratuit*", later: "18 $" },
  { feature: "Thèmes & personnalisation", beassist: true, linktree: true, milkshake: true, later: false },
];

function Cell({ val }: { val: CellValue }) {
  if (typeof val === "string")
    return <span className="text-gray-800 font-semibold">{val}</span>;
  return val ? (
    <Check className="w-5 h-5 text-green-500 mx-auto" />
  ) : (
    <X className="w-5 h-5 text-gray-300 mx-auto" />
  );
}

// ── FAQ data ────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Quelle est la meilleure alternative gratuite à Linktree ?",
    a: "BeassistLink est la solution française la plus complète : liens illimités, analytics intégrées et hébergement en Europe conforme au RGPD — tout ça gratuitement.",
  },
  {
    q: "Les statistiques sont-elles incluses dans le plan gratuit ?",
    a: "Non. Le plan FREE n'inclut pas de statistiques : elles arrivent avec le plan STARTER à 6 €/mois, et le PRO ajoute les données avancées (pays, appareils, sources de trafic).",
  },
  {
    q: "BeassistLink est-il conforme au RGPD ?",
    a: "Oui. BeassistLink est une solution française dont les données sont hébergées en Europe. La conformité RGPD est native, pas une option payante. Aucun cookie de tracking tiers n'est injecté sur ta page bio.",
  },
  {
    q: "Comment avoir plusieurs liens en bio Instagram ?",
    a: "Crée ta page BeassistLink gratuite, ajoute tous tes liens, puis copie ton URL personnalisée dans la bio de ton profil Instagram. Tous tes liens seront accessibles en un clic.",
  },
  {
    q: "BeassistLink fonctionne-t-il sur TikTok ?",
    a: "Absolument. Ajoute ton lien BeassistLink dans la bio de ton profil TikTok pour partager ton Spotify, YouTube, boutique et tous tes autres contenus depuis un seul endroit.",
  },
];

export default function ComparatifLinktreePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="overflow-hidden bg-white min-h-screen">
        <Navbar />

        {/* ── Hero ── */}
        <section className="pt-28 pb-16 bg-gradient-to-b from-[#F9F5FF] to-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <span className="inline-flex px-3 py-1 rounded-full bg-[#8F00FF]/10 text-[#8F00FF] text-xs font-bold tracking-widest uppercase mb-4">
              Comparatif 2026
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-gray-900 leading-tight tracking-tight">
              BeassistLink face à Linktree
            </h1>
            <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Tu cherches un outil pour mettre <strong>plusieurs liens en bio Instagram ou TikTok</strong> ?
              Compare les deux outils point par point : prix, fonctionnalités, respect des données et
              encaissement mobile money.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#8F00FF] text-white font-bold text-base hover:bg-[#7200CC] transition-colors shadow-[0_4px_20px_rgba(143,0,255,0.3)]"
              >
                Créer ma page gratuite
                <ArrowRight size={16} />
              </Link>
              <a
                href="#comparatif"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-base hover:bg-gray-50 transition-colors"
              >
                Voir le comparatif ↓
              </a>
            </div>
            <p className="mt-4 text-xs text-gray-400">Gratuit · Sans carte bancaire · Conforme RGPD 🇫🇷</p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-20">

          {/* ── Why ── */}
          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-4">
              Pourquoi choisir BeassistLink ?
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4 text-[15px]">
              <p>
                <strong>Linktree</strong> est l'un des outils les plus connus pour créer une <em>page de liens personnalisée</em>,
                mais il souffre de limitations importantes sur son plan gratuit : logo Linktree imposé, analytics bloquées,
                personnalisation limitée — et le prix du plan payant est affiché en dollars américains.
              </p>
              <p>
                <strong>BeassistLink</strong> a été créé pour les créateurs et entrepreneurs francophones qui veulent
                une solution complète, hébergée en Europe. Zéro cookie tiers.
                Support en français. Prix en euros.
              </p>
            </div>
          </section>

          {/* ── Comparison table ── */}
          <section id="comparatif" className="scroll-mt-24">
            <h2 className="text-2xl font-black text-gray-900 mb-2">
              Tableau comparatif — Linktree vs BeassistLink vs Milkshake vs Later
            </h2>
            <p className="text-sm text-gray-500 mb-6">Données vérifiées en avril 2026 sur les pages officielles de chaque service.</p>
            <div className="rounded-2xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-4 py-3.5 text-gray-500 font-semibold w-[36%]">Critère</th>
                      <th className="px-4 py-3.5 text-center font-bold text-[#8F00FF]">BeassistLink 🇫🇷</th>
                      <th className="px-4 py-3.5 text-center text-gray-500 font-semibold">Linktree</th>
                      <th className="px-4 py-3.5 text-center text-gray-500 font-semibold">Milkshake</th>
                      <th className="px-4 py-3.5 text-center text-gray-500 font-semibold">Later</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}>
                        <td className="px-4 py-3 text-gray-700 font-medium">{row.feature}</td>
                        <td className="px-4 py-3 text-center"><Cell val={row.beassist} /></td>
                        <td className="px-4 py-3 text-center"><Cell val={row.linktree} /></td>
                        <td className="px-4 py-3 text-center"><Cell val={row.milkshake} /></td>
                        <td className="px-4 py-3 text-center"><Cell val={row.later} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 bg-[#8F00FF]/5 border-t border-[#8F00FF]/10">
                <p className="text-xs text-gray-500">* Milkshake : gratuit mais fonctionnalités très limitées. Les tarifs concurrents sont en USD/mois.</p>
              </div>
            </div>
          </section>

          {/* ── Use cases ── */}
          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-6">
              Pour qui est BeassistLink ?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  emoji: "📸",
                  title: "Créateurs Instagram",
                  desc: "Mets plusieurs liens dans ta bio Instagram : YouTube, boutique, newsletter, Spotify, TikTok — tout en un.",
                },
                {
                  emoji: "🎵",
                  title: "Artistes & musiciens",
                  desc: "Partage ton lien Spotify, Apple Music, SoundCloud et tes dates de concert depuis une seule page.",
                },
                {
                  emoji: "🛒",
                  title: "E-commerçants",
                  desc: "Redirige ton audience vers ta boutique, tes offres du moment et ta newsletter sans friction.",
                },
                {
                  emoji: "🎬",
                  title: "TikTokeurs",
                  desc: "Contourne la limite \"un seul lien\" sur TikTok avec une page bio complète et personnalisée.",
                },
                {
                  emoji: "💼",
                  title: "Freelances & consultants",
                  desc: "Centraliser portfolio, calendrier de réservation, LinkedIn et contact en un lien professionnel.",
                },
                {
                  emoji: "🏢",
                  title: "PME françaises",
                  desc: "Solution 100 % RGPD, hébergée en Europe, avec support en français. Idéale pour les entreprises soumises au droit européen.",
                },
              ].map(({ emoji, title, desc }) => (
                <div key={title} className="rounded-2xl border border-gray-200 p-5 hover:border-[#8F00FF]/30 hover:bg-[#F9F5FF]/40 transition-all">
                  <div className="text-2xl mb-2">{emoji}</div>
                  <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── FAQ ── */}
          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-6">Questions fréquentes</h2>
            <div className="space-y-4">
              {faqs.map(({ q, a }) => (
                <div key={q} className="rounded-2xl border border-gray-200 p-5">
                  <h3 className="font-bold text-gray-900 text-[15px] mb-2">{q}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="rounded-2xl bg-gradient-to-br from-[#8F00FF] to-[#6200CC] p-8 sm:p-12 text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-black mb-3">
              Crée ta page bio en 30 secondes
            </h2>
            <p className="text-purple-100 text-base mb-7 max-w-lg mx-auto leading-relaxed">
              Gratuit, sans carte bancaire. L'outil lien en bio qui respecte tes visiteurs et ta vie privée.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#8F00FF] font-bold text-base hover:bg-purple-50 transition-colors shadow-lg"
            >
              Commencer gratuitement
              <ArrowRight size={16} />
            </Link>
            <p className="mt-4 text-xs text-purple-300">Encaissement Wave, Orange Money et MTN inclus, dès l&apos;offre gratuite.</p>
          </section>

          {/* ── Internal links ── */}
          <nav aria-label="Liens connexes" className="border-t border-gray-100 pt-8">
            <p className="text-sm font-semibold text-gray-500 mb-3">Aller plus loin</p>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/blog/plusieurs-liens-instagram" className="text-[#8F00FF] hover:underline">
                → Comment avoir plusieurs liens sur Instagram
              </Link>
              <Link href="/blog/beassistlink-vs-linktree-2026" className="text-[#8F00FF] hover:underline">
                → Comparatif détaillé BeassistLink vs Linktree 2026
              </Link>
              <Link href="/blog/pourquoi-choisir-solution-francaise" className="text-[#8F00FF] hover:underline">
                → Pourquoi choisir une solution française ?
              </Link>
              <Link href="/pricing" className="text-[#8F00FF] hover:underline">
                → Nos tarifs
              </Link>
            </div>
          </nav>
        </div>

        <Footer />
      </main>
    </>
  );
}
