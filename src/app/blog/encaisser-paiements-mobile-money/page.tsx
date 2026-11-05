import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ArrowRight } from "lucide-react";

const BASE = "https://www.beassist-link.com";
const SLUG = "encaisser-paiements-mobile-money";
const PUBLISHED = "2026-11-05";

export const metadata: Metadata = {
  title: "Encaisser des paiements et pourboires depuis ton lien en bio",
  description:
    "Wave, Orange Money, MTN, Lydia : transforme ton lien en bio en caisse enregistreuse et encaisse directement de ton audience, sans carte bancaire.",
  keywords: [
    "encaisser mobile money",
    "lien en bio paiement",
    "recevoir un paiement Wave",
    "Orange Money paiement en ligne",
    "pourboire lien en bio",
    "monétiser son audience",
    "lien en bio monétisation",
    "paiement mobile money créateurs",
    "link in bio paiement",
  ],
  alternates: {
    canonical: `${BASE}/blog/${SLUG}`,
  },
  openGraph: {
    title: "Encaisser des paiements et pourboires depuis ton lien en bio",
    description:
      "Wave, Orange Money, MTN, Lydia : transforme ton lien en bio en caisse enregistreuse et encaisse directement de ton audience, sans carte bancaire.",
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
      headline: "Encaisser des paiements et pourboires depuis ton lien en bio",
      description:
        "Comment transformer son lien en bio en caisse enregistreuse et encaisser en mobile money (Wave, Orange Money, MTN) sans carte bancaire.",
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
          name: "Peut-on encaisser des paiements mobile money depuis un lien en bio ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui. Un créateur connecte son propre compte marchand (PayDunya, qui agrège Wave, Orange Money, MTN et d'autres), configure un lien de paiement ou de pourboire avec un montant et une devise, et l'argent arrive directement sur son compte. L'outil de lien en bio ne fait qu'initier la transaction.",
          },
        },
        {
          "@type": "Question",
          name: "Quelles devises sont acceptées pour les paiements ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Le FCFA (XOF, XAF) pour le mobile money, et l'euro, le dollar, le franc suisse, le dollar canadien, la livre sterling, le dirham, le dinar et d'autres devises pour l'affichage des montants. Le montant est toujours libellé dans la devise que le créateur choisit.",
          },
        },
        {
          "@type": "Question",
          name: "Quelle est la différence entre un lien de paiement et un lien de pourboire ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Un lien de paiement correspond à un montant fixe pour un produit ou un service. Un lien de pourboire invite l'audience à soutenir librement le créateur, souvent avec un montant suggéré. Les deux passent par les mêmes rails de paiement.",
          },
        },
        {
          "@type": "Question",
          name: "L'outil de lien en bio prélève-t-il une commission sur les paiements ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Non. L'argent du payeur va directement sur le compte marchand du créateur : la plateforme ne détient jamais de fonds et ne prélève pas de commission sur les transactions. Elle se rémunère par son abonnement.",
          },
        },
      ],
    },
  ],
};

export default function BlogEncaisserPaiementsMobileMoney() {
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
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700">Monétisation</span>
              <span className="text-xs text-gray-400">5 novembre 2026 · 6 min de lecture</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight tracking-tight">
              Encaisser des paiements et des pourboires depuis ton lien en bio
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Wave, Orange Money, MTN, Lydia : transforme ta page de liens en caisse enregistreuse, et fais payer ton
              audience <strong>sans carte bancaire</strong>.
            </p>
          </div>
        </header>

        {/* ── Article body ── */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-12">

          {/* Intro */}
          <div className="prose prose-gray max-w-none text-[15px] leading-relaxed">
            <p>
              Tu as une audience. Elle te suit, elle t'écoute, elle te fait confiance. Et pourtant, quand vient le
              moment de te soutenir : acheter ton produit, payer ton service, te laisser un pourboire : il n'y a
              souvent <strong>aucun moyen simple</strong> de le faire.
            </p>
            <p>
              La raison est simple : la plupart des outils de lien en bio ont été conçus pour une audience qui paie
              <strong> par carte bancaire</strong>. Mais en Afrique francophone, la carte n'est pas le réflexe. L'argent
              circule par <strong>mobile money</strong> : Wave, Orange Money, MTN Mobile Money.
            </p>
            <p>
              Résultat : un créateur peut avoir des milliers d'abonnés et aucun moyen d'encaisser 1 000 FCFA depuis sa
              bio. Ce guide t'explique comment y remédier.
            </p>
          </div>

          {/* Le mobile money change tout */}
          <section className="space-y-5">
            <h2 className="text-2xl font-black text-gray-900">Pourquoi le mobile money change tout</h2>
            <div className="space-y-4">
              {[
                {
                  t: "Ton audience paie déjà comme ça",
                  b: "Wave au Sénégal et en Côte d'Ivoire, Orange Money dans toute la zone, MTN au Cameroun et au Bénin : le mobile money est le moyen de paiement par défaut de millions de personnes. Leur proposer un paiement par carte, c'est leur demander de changer leurs habitudes.",
                },
                {
                  t: "La barrière d'entrée disparaît",
                  b: "Pas de formulaire de carte, pas de banque en ligne, pas de compte étranger. Ton audience paie depuis son téléphone, avec le numéro qu'elle utilise déjà tous les jours.",
                },
                {
                  t: "Le montant reste humain",
                  b: "Un pourboire de 500 FCFA, un produit à 5 000 FCFA : ce sont des montants que ton audience peut payer sans réfléchir. C'est la clé de la monétisation des créateurs : des petits montants, répétés.",
                },
              ].map(({ t, b }) => (
                <div key={t} className="rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold text-gray-900 text-[15px] mb-2">{t}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Ce que tu peux encaisser */}
          <section className="rounded-2xl border border-[#8F00FF]/20 bg-[#F9F5FF] p-6 sm:p-8">
            <h2 className="text-xl font-black text-gray-900 mb-4">Ce que tu peux encaisser depuis ta bio</h2>
            <div className="space-y-4">
              <div className="rounded-xl bg-white border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900 text-[15px] mb-2">Un paiement</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Un montant fixe pour un produit, un service, un accès : ta formation, ta boutique, ta prestation.
                  Le visiteur clique, voit le montant, paie avec le moyen de son choix.
                </p>
              </div>
              <div className="rounded-xl bg-white border border-[#8F00FF]/30 p-4">
                <h3 className="font-bold text-gray-900 text-[15px] mb-2">Un pourboire</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Un lien « soutiens-moi » pour que ton audience te laisse librement une contribution. C'est le
                  réflexe des créateurs : tu donnes du contenu gratuitement, et ceux qui veulent te remercier le
                  peuvent en deux clics.
                </p>
              </div>
              <p className="text-sm text-gray-700">
                Dans les deux cas, le montant et la devise sont définis par toi : le visiteur n'a rien à calculer.
              </p>
            </div>
          </section>

          {/* Comment ça marche */}
          <section className="space-y-5">
            <h2 className="text-2xl font-black text-gray-900">Comment ça marche, concrètement</h2>
            {[
              {
                n: 1,
                title: "Tu connectes ton compte marchand",
                body: "Une seule fois. Tu relies ton compte PayDunya (ou un autre prestataire) depuis ton tableau de bord. Tes clés sont chiffrées et ne sont jamais réaffichées.",
              },
              {
                n: 2,
                title: "Tu crées ton lien de paiement",
                body: "Tu choisis le type (paiement ou pourboire), le montant, la devise et le moyen de paiement : Wave, Orange Money, MTN, Lydia, PayPal, carte. Le lien apparaît sur ta page bio.",
              },
              {
                n: 3,
                title: "Ton audience paie",
                body: "Le visiteur clique, arrive sur la page de paiement, et paie depuis son téléphone. L'argent arrive directement sur ton compte marchand.",
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-green-100 text-green-700 font-black text-sm flex items-center justify-center">
                  {n}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
            <div className="rounded-xl border border-amber-300 bg-amber-50 p-4">
              <p className="text-sm text-amber-800 leading-relaxed">
                <strong>Important :</strong> l'argent ne transite jamais par la plateforme. Il va du payeur directement
                sur ton compte marchand. C'est ce qui rend le modèle simple et transparent.
              </p>
            </div>
          </section>

          {/* Les devises */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-gray-900">Les devises que tu peux afficher</h2>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              Ton audience paie en <strong>FCFA</strong> (XOF, XAF) pour le mobile money. Mais tu peux aussi afficher
              des montants en euro, dollar, franc suisse, dollar canadien, livre sterling, dirham marocain, dinar
              algérien ou tunisien : le montant est toujours libellé dans la devise que tu choisis, et le visiteur ne
              fait aucun calcul de conversion.
            </p>
          </section>

          {/* 5 conseils */}
          <section className="space-y-8">
            <h2 className="text-2xl font-black text-gray-900">5 conseils pour faire payer ton audience</h2>
            {[
              {
                n: 1,
                title: "Nomme le lien, ne le laisse pas anonyme",
                body: "« Soutiens mon travail » convertit mieux que « Lien de paiement ». Dis ce que le paiement finance : c'est ce qui donne envie de cliquer.",
              },
              {
                n: 2,
                title: "Commence petit",
                body: "Un pourboire à 500 FCFA convertit plus qu'un produit à 50 000 FCFA. Les petits montants répétés construisent une habitude, et c'est une habitude qui grandit.",
              },
              {
                n: 3,
                title: "Place le lien en haut de ta page",
                body: "Le premier lien est celui qui reçoit le plus de clics. Si la monétisation est ta priorité, ton lien de soutien mérite la première place.",
              },
              {
                n: 4,
                title: "Annonce-le dans ton contenu",
                body: "Un rappel en story ou en fin de vidéo : « le lien de soutien est dans ma bio ». Ton audience ne devine pas, il faut le lui dire.",
              },
              {
                n: 5,
                title: "Remercie, en public",
                body: "Un merci en story à ceux qui soutiennent crée un cercle vertueux : les autres voient que ça existe, et que ça compte pour toi.",
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-green-100 text-green-700 font-black text-sm flex items-center justify-center">
                  {n}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-5">Questions fréquentes</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Peut-on encaisser des paiements mobile money depuis un lien en bio ?",
                  a: "Oui. Tu connectes ton compte marchand, tu crées un lien de paiement ou de pourboire avec un montant et une devise, et l'argent arrive directement sur ton compte. La plateforme ne fait qu'initier la transaction.",
                },
                {
                  q: "Quelles devises sont acceptées ?",
                  a: "Le FCFA (XOF, XAF) pour le mobile money, et l'euro, le dollar, le franc suisse, le dollar canadien, la livre sterling, le dirham et le dinar pour l'affichage des montants.",
                },
                {
                  q: "Quelle est la différence entre paiement et pourboire ?",
                  a: "Un paiement a un montant fixe (un produit, un service). Un pourboire invite l'audience à soutenir librement, avec un montant suggéré. Les deux passent par les mêmes rails.",
                },
                {
                  q: "La plateforme prend-elle une commission sur les paiements ?",
                  a: "Non. L'argent va directement sur ton compte marchand, la plateforme ne détient jamais de fonds et ne prélève pas de commission sur les transactions.",
                },
              ].map(({ q, a }) => (
                <div key={q} className="rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold text-gray-900 text-[15px] mb-2">{q}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl bg-gradient-to-br from-[#8F00FF] to-[#6200CC] p-8 sm:p-10 text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-black mb-3">Transforme ta bio en caisse enregistreuse</h2>
            <p className="text-purple-100 text-base mb-7 max-w-lg mx-auto leading-relaxed">
              Crée ta page gratuitement, ajoute tes liens, et connecte ton compte marchand pour encaisser tes premiers
              paiements.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-[#8F00FF] font-bold text-base hover:bg-purple-50 transition-colors shadow-lg"
            >
              Créer ma page gratuite
              <ArrowRight size={16} />
            </Link>
            <p className="mt-4 text-xs text-purple-300">Gratuit, sans carte bancaire.</p>
          </section>
        </article>

        <Footer />
      </main>
    </>
  );
}
