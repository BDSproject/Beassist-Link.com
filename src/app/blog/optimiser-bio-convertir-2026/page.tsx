import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ArrowRight } from "lucide-react";

const BASE = "https://www.beassist-link.com";
const SLUG = "optimiser-bio-convertir-2026";
const PUBLISHED = "2026-04-01";

export const metadata: Metadata = {
  title: "Comment optimiser sa bio pour convertir en 2026",
  description:
    "Ordre des liens, libellés avec bénéfice, cohérence visuelle, preuve sociale : 7 leviers simples pour transformer les visiteurs de ton lien en bio en clients, en 2026.",
  keywords: [
    "optimiser sa bio instagram",
    "lien en bio qui convertit",
    "bio instagram 2026",
    "convertir lien en bio",
    "stratégie lien en bio",
    "augmenter clics lien en bio",
    "page de liens conversion",
  ],
  alternates: {
    canonical: `${BASE}/blog/${SLUG}`,
  },
  openGraph: {
    title: "Comment optimiser sa bio pour convertir en 2026",
    description:
      "7 leviers simples pour transformer tes visiteurs en clients — par l'équipe BeassistLink 🇫🇷",
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
      headline: "Comment optimiser sa bio pour convertir en 2026",
      description:
        "Ordre des liens, libellés avec bénéfice, cohérence visuelle, preuve sociale : les 7 leviers qui transforment les visiteurs d'un lien en bio en clients.",
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
          name: "Combien de temps faut-il pour optimiser son lien en bio ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Moins de 30 minutes pour appliquer les 7 leviers : réordonner les liens, reformuler les libellés et ajouter une preuve sociale prennent quelques minutes chacun. Le plus long, c'est de prendre l'habitude de la mise à jour hebdomadaire.",
          },
        },
        {
          "@type": "Question",
          name: "Faut-il payer pour optimiser sa page de liens ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Non. L'ordre des liens, les libellés, la cohérence visuelle et la preuve sociale ne demandent aucun outil payant. Les statistiques de clics et les QR codes arrivent avec le plan STARTER de BeassistLink (6 €/mois ou 65 €/an), si tu veux aller plus loin.",
          },
        },
        {
          "@type": "Question",
          name: "À quelle fréquence faut-il regarder ses statistiques ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Une fois par semaine, idéalement toujours le même jour. Une lecture de 5 minutes suffit : repère le lien qui performe, celui qui stagne, et ajuste l'ordre ou les libellés en conséquence.",
          },
        },
      ],
    },
  ],
};

export default function BlogOptimiserBioConvertir2026() {
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
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700">Stratégie</span>
              <span className="text-xs text-gray-400">1 avril 2026 · 4 min de lecture</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight tracking-tight">
              Comment optimiser sa bio pour convertir en 2026
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              7 leviers simples pour transformer tes visiteurs en clients — des bonnes pratiques partagées par les
              créateurs qui gèrent leur présence en ligne avec soin.
            </p>
          </div>
        </header>

        {/* ── Article body ── */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-12">

          {/* Intro */}
          <div className="prose prose-gray max-w-none text-[15px] leading-relaxed">
            <p>
              Ton lien en bio reçoit du trafic tous les jours. La vraie question n'est pas d'attirer des visiteurs :
              c'est de <strong>les transformer en clients, en abonnés ou en lecteurs</strong>. En 2026, la concurrence
              est plus forte que jamais, et la différence se joue dans les détails.
            </p>
            <p>
              Voici 7 leviers simples et concrets, partagés par les créateurs qui gèrent leur page de liens avec
              soin — avec un exemple à appliquer pour chacun.
            </p>
          </div>

          {/* Leviers */}
          <section className="space-y-8">
            {[
              {
                n: 1,
                title: "Mets ton lien le plus important en première position",
                body: "Le premier lien de ta page reçoit toujours le plus de clics. Si tu places un lien secondaire en haut, tu gaspilles ta meilleure position — et ton visiteur part avant d'avoir vu l'essentiel.",
                example: "Tu lances ta boutique cette semaine ? Mets son lien tout en haut, au-dessus de tes réseaux sociaux. L'essentiel doit être visible sans scroller.",
              },
              {
                n: 2,
                title: "Écris des libellés qui donnent envie de cliquer",
                body: "« Mon site » ou « Mes liens » ne disent rien. Un bon libellé contient un verbe et un bénéfice : il répond à la question « pourquoi cliquer ? » avant même qu'elle soit posée.",
                example: "Remplace « Boutique » par « Découvrir ma nouvelle collection −20 % ». Le clic devient une évidence, pas une devinette.",
              },
              {
                n: 3,
                title: "Reste cohérent avec le reste de ton profil",
                body: "Ta page de liens prolonge ton profil Instagram ou TikTok : mêmes couleurs, même photo, même ton. Un visiteur qui reconnaît ton univers est en confiance — et la confiance précède le clic.",
                example: "Ton feed est en tons pastel ? Choisis un thème aux couleurs proches et reprends ta photo de profil. La transition entre ton profil et ta page doit être invisible.",
              },
              {
                n: 4,
                title: "Ajoute une preuve sociale",
                body: "Un chiffre, un avis, un « ils m'ont fait confiance » lèvent le dernier doute. La preuve sociale transforme un visiteur hésitant en client décidé.",
                example: "Sous ton lien de coaching, ajoute « +120 élèves accompagnés cette année ». Une ligne suffit pour rassurer.",
              },
              {
                n: 5,
                title: "Mets ta page à jour chaque semaine",
                body: "Une page vivante convertit mieux qu'une page figée. À chaque lancement, chaque promo, chaque nouveau contenu, ta page doit refléter ce qui compte maintenant — pas ce qui comptait le mois dernier.",
                example: "Chaque dimanche, mets en avant ton dernier contenu et retire les promos expirées. Avec les liens programmés du plan PRO de BeassistLink, tu peux planifier ces changements à l'avance.",
              },
              {
                n: 6,
                title: "Teste différentes positions pour tes liens",
                body: "Personne ne trouve la bonne combinaison du premier coup. Déplacer un lien peut doubler ses clics : l'optimisation est un jeu d'essais, pas de recettes figées.",
                example: "Cette semaine, place ton lien YouTube en deuxième position ; la semaine prochaine, mets-le en quatrième. Compare les clics et garde la configuration qui performe.",
              },
              {
                n: 7,
                title: "Exploite tes statistiques de clics",
                body: "Les statistiques te disent ce qui marche vraiment : quel lien attire, d'où viennent tes visiteurs, quels appareils ils utilisent. C'est ta feuille de route pour progresser, semaine après semaine.",
                example: "Si 85 % de ton trafic vient de mobile et qu'un lien performe auprès d'une audience précise, adapte tes libellés et ton ordre en conséquence. Sans données, tu devines ; avec, tu décides.",
              },
            ].map(({ n, title, body, example }) => (
              <div key={n} className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#F9F5FF] text-[#8F00FF] font-black text-sm flex items-center justify-center">
                  {n}
                </div>
                <div className="flex-1">
                  <h2 className="font-bold text-gray-900 text-lg mb-2">{title}</h2>
                  <p className="text-[15px] text-gray-600 leading-relaxed mb-2">{body}</p>
                  <div className="rounded-xl bg-green-50 border border-green-100 p-4">
                    <p className="text-[15px] text-gray-700 leading-relaxed">
                      <strong className="text-green-700">L'exemple : </strong>
                      {example}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Plans */}
          <section className="rounded-2xl border border-[#8F00FF]/20 bg-[#F9F5FF] p-6 sm:p-8">
            <h2 className="text-xl font-black text-gray-900 mb-4">De quels outils as-tu besoin ?</h2>
            <p className="text-[15px] text-gray-700 leading-relaxed">
              La plupart de ces leviers ne demandent aucun outil payant. Quand tu veux aller plus loin, les
              statistiques de clics et les QR codes arrivent avec le plan STARTER de BeassistLink (6 €/mois ou
              65 €/an), et la personnalisation complète avec le plan PRO (12 €/mois ou 130 €/an). Tous les détails
              sont sur la{" "}
              <Link href="/pricing" className="text-[#8F00FF] hover:underline">
                page tarifs
              </Link>
              , et le plan gratuit inclut déjà une page bio avec 5 liens, sans carte bancaire.
            </p>
          </section>

          {/* Checklist */}
          <section className="rounded-2xl border border-[#8F00FF]/20 bg-[#F9F5FF] p-6 sm:p-8">
            <h2 className="text-xl font-black text-gray-900 mb-4">La checklist d'une bio qui convertit</h2>
            <ul className="space-y-3 text-[15px] text-gray-700">
              {[
                "Mon lien le plus important est en première position",
                "Chaque libellé contient un verbe et un bénéfice",
                "Ma page reprend mes couleurs et ma photo de profil",
                "J'ai ajouté au moins une preuve sociale",
                "Mes liens sont à jour cette semaine",
                "J'ai testé au moins deux ordres de liens ce mois-ci",
                "J'ai regardé mes statistiques cette semaine",
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
                  q: "Combien de temps faut-il pour optimiser son lien en bio ?",
                  a: "Moins de 30 minutes pour appliquer les 7 leviers : réordonner les liens, reformuler les libellés et ajouter une preuve sociale prennent quelques minutes chacun. Le plus long, c'est de prendre l'habitude de la mise à jour hebdomadaire.",
                },
                {
                  q: "Faut-il payer pour optimiser sa page de liens ?",
                  a: "Non. L'ordre des liens, les libellés, la cohérence visuelle et la preuve sociale ne demandent aucun outil payant. Les statistiques de clics et les QR codes arrivent avec le plan STARTER de BeassistLink (6 €/mois ou 65 €/an), si tu veux aller plus loin.",
                },
                {
                  q: "À quelle fréquence faut-il regarder ses statistiques ?",
                  a: "Une fois par semaine, idéalement toujours le même jour. Une lecture de 5 minutes suffit : repère le lien qui performe, celui qui stagne, et ajuste l'ordre ou les libellés en conséquence.",
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
            <h2 className="text-2xl font-black mb-2">Transforme tes visiteurs en clients</h2>
            <p className="text-purple-100 mb-6 leading-relaxed max-w-md mx-auto">
              Crée ta page BeassistLink en 30 secondes et applique les 7 leviers dès aujourd'hui. Gratuit pour
              commencer, sans carte bancaire.
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
              <Link href="/blog/10-liens-bio-instagram" className="text-[#8F00FF] hover:underline">
                → 10 liens à mettre dans ta bio Instagram pour convertir
              </Link>
              <Link href="/blog/plusieurs-liens-instagram" className="text-[#8F00FF] hover:underline">
                → Comment avoir plusieurs liens sur Instagram sans payer
              </Link>
              <Link href="/blog/pourquoi-choisir-solution-francaise" className="text-[#8F00FF] hover:underline">
                → Pourquoi choisir une solution française pour ton lien bio ?
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
