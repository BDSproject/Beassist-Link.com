import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ArrowRight } from "lucide-react";

const BASE = "https://www.beassist-link.com";
const SLUG = "7-erreurs-lien-en-bio";
const PUBLISHED = "2026-09-28";

export const metadata: Metadata = {
  title: "7 erreurs qui font fuir les visiteurs de ton lien en bio : et comment les corriger",
  description:
    "Lien mort, page impersonnelle, zéro appel à l'action : découvre les 7 erreurs qui font fuir les visiteurs de ton lien en bio, et corrige-les en 10 minutes pour enfin convertir.",
  keywords: [
    "erreurs lien en bio",
    "optimiser son lien en bio",
    "lien en bio qui convertit",
    "améliorer sa bio instagram",
    "page de liens conversion",
    "lien en bio instagram",
    "créer une page de liens",
  ],
  alternates: {
    canonical: `${BASE}/blog/${SLUG}`,
  },
  openGraph: {
    title: "7 erreurs qui font fuir les visiteurs de ton lien en bio",
    description:
      "Les 7 erreurs les plus fréquentes sur les pages de liens (et leurs correctifs) : par l'équipe BeassistLink 🇫🇷",
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
      headline: "7 erreurs qui font fuir les visiteurs de ton lien en bio",
      description:
        "Lien mort, page impersonnelle, zéro appel à l'action : les 7 erreurs qui coûtent des clients aux créateurs, et comment les corriger.",
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
          name: "Combien de liens faut-il mettre dans sa bio Instagram ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Instagram n'autorise qu'un seul lien cliquable dans la bio : c'est pourquoi une page de liens est indispensable. Sur cette page, mets en avant 3 à 5 liens essentiels plutôt qu'une longue liste : le visiteur clique plus quand il a moins de choix.",
          },
        },
        {
          "@type": "Question",
          name: "À quelle fréquence faut-il mettre à jour son lien en bio ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Une fois par semaine au minimum, et systématiquement avant et après chaque lancement ou promo. Un lien à jour est un signal de sérieux envoyé à ton audience.",
          },
        },
        {
          "@type": "Question",
          name: "Comment savoir si mon lien en bio fonctionne ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Regarde les statistiques de clics : nombre de visites, pays, appareils, sources de trafic. Si un lien reçoit peu de clics, déplace-le ou reformule son libellé : les données te disent quoi corriger.",
          },
        },
      ],
    },
  ],
};

export default function BlogErreursLienEnBio() {
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
              <span className="text-xs text-gray-400">28 septembre 2026 · 6 min de lecture</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight tracking-tight">
              7 erreurs qui font fuir les visiteurs de ton lien en bio
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Ta bio Instagram est la porte d'entrée de ton business. Voici les 7 erreurs qui te coûtent des clients :
              et comment les corriger <strong>en 10 minutes</strong>.
            </p>
          </div>
        </header>

        {/* ── Article body ── */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-12">

          {/* Intro */}
          <div className="prose prose-gray max-w-none text-[15px] leading-relaxed">
            <p>
              Chaque jour, tes abonnés cliquent sur ton lien en bio… ou passent leur chemin. La différence tient
              rarement au contenu : elle tient à <strong>la façon dont tu présentes tes liens</strong>. On a analysé
              des centaines de pages créées avec BeassistLink, et les mêmes erreurs reviennent partout.
            </p>
            <p>
              Bonne nouvelle : ce sont toutes des erreurs simples à corriger. Voici les 7 plus fréquentes, avec le
              correctif à appliquer immédiatement.
            </p>
          </div>

          {/* Erreurs */}
          <section className="space-y-8">
            {[
              {
                n: 1,
                title: "Ton lien pointe vers une page morte",
                body: "Un lien cassé, une page supprimée, une faute dans l'URL : c'est l'erreur numéro un, et elle est plus fréquente qu'on ne le croit. Un visiteur qui tombe sur une erreur 404 ne revient pas.",
                fix: "Vérifie ton lien chaque semaine, depuis un autre compte que le tien. Et si tu changes souvent de destination, utilise la fonction de redirection : tu gardes le même lien dans ta bio, et tu changes la cible quand tu veux.",
              },
              {
                n: 2,
                title: "Trop de liens, trop de choix",
                body: "Quand tu proposes 20 liens d'un coup, le visiteur ne clique sur aucun. Le paradoxe du choix est encore plus fort sur mobile, où chaque lien est un petit bouton et chaque seconde compte.",
                fix: "Garde 3 à 5 liens essentiels en haut de ta page. Ce que tu ne veux pas montrer en permanence, range-le plus bas ou réserve-le à tes moments forts.",
              },
              {
                n: 3,
                title: "Une page qui ne te ressemble pas",
                body: "Une page de liens générique, avec un logo imposé et un thème par défaut, ressemble à de la publicité. Tes abonnés doutent : « c'est bien la bonne personne ? »",
                fix: "Ajoute ta photo, ton nom et une courte bio, puis personnalise les couleurs avec ton identité. Sur BeassistLink, la page est à toi en quelques clics : personnalise les couleurs et ta mise en page, même en plan gratuit.",
              },
              {
                n: 4,
                title: "Aucun appel à l'action",
                body: "« Mon site », « Mes réseaux », « Vidéos » : des libellés vagues ne donnent aucune raison de cliquer. Un lien doit vendre le clic lui-même.",
                fix: "Utilise des verbes et des bénéfices : « Télécharge mon guide gratuit », « Réserve ton appel découverte », « −20 % cette semaine ». Chaque lien doit répondre à la question : pourquoi cliquer ?",
              },
              {
                n: 5,
                title: "Une page illisible sur mobile",
                body: "Plus de 80 % de ton trafic vient d'un téléphone. Si ta page est lente, mal dimensionnée ou difficile à lire sur petit écran, tu perds l'essentiel de tes visiteurs avant même qu'ils cliquent.",
                fix: "Teste ta page sur ton propre téléphone, dans de vraies conditions (réseau mobile, pas le Wi-Fi). Choisis un outil pensé mobile-first, avec de gros boutons faciles à toucher du pouce.",
              },
              {
                n: 6,
                title: "Des liens jamais mis à jour",
                body: "Une promo expirée, un vieux post épinglé, un produit épuisé : c'est le signal d'une bio abandonnée, et d'un créateur qui ne prend pas soin de son audience.",
                fix: "Programme un rappel mensuel pour rafraîchir tes liens. Avec les liens programmés de BeassistLink, tu peux même activer et désactiver des liens à l'avance selon tes lancements.",
              },
              {
                n: 7,
                title: "Ne jamais regarder ses statistiques",
                body: "Sans données, tu optimises à l'aveugle. Tu ne sais pas quel lien convertit, ni ce qui intéresse vraiment ton audience : et tu laisses de l'argent sur la table.",
                fix: "Suis les clics de ta page : visites, pays, appareils, sources de trafic. Garde ce qui marche, reformule ou supprime ce qui ne marche pas. C'est comme ça qu'une bio décorative devient une bio qui vend.",
              },
            ].map(({ n, title, body, fix }) => (
              <div key={n} className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-red-100 text-red-600 font-black text-sm flex items-center justify-center">
                  {n}
                </div>
                <div className="flex-1">
                  <h2 className="font-bold text-gray-900 text-lg mb-2">{title}</h2>
                  <p className="text-[15px] text-gray-600 leading-relaxed mb-2">{body}</p>
                  <div className="rounded-xl bg-green-50 border border-green-100 p-4">
                    <p className="text-[15px] text-gray-700 leading-relaxed">
                      <strong className="text-green-700">Le correctif : </strong>
                      {fix}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Checklist */}
          <section className="rounded-2xl border border-[#8F00FF]/20 bg-[#F9F5FF] p-6 sm:p-8">
            <h2 className="text-xl font-black text-gray-900 mb-4">La checklist d'une bio qui convertit</h2>
            <ul className="space-y-3 text-[15px] text-gray-700">
              {[
                "Mon lien fonctionne et mène où je veux",
                "Mes 3 à 5 liens essentiels sont en haut de la page",
                "Ma page a ma photo, mon nom et mes couleurs",
                "Chaque lien a un libellé avec un verbe d'action",
                "La page se charge vite et se lit bien sur mobile",
                "Mes liens sont à jour (pas de promo expirée)",
                "Je regarde mes statistiques au moins une fois par semaine",
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
                  q: "Combien de liens faut-il mettre dans sa bio Instagram ?",
                  a: "Instagram n'autorise qu'un seul lien cliquable dans la bio : c'est pourquoi une page de liens est indispensable. Sur cette page, mets en avant 3 à 5 liens essentiels plutôt qu'une longue liste.",
                },
                {
                  q: "À quelle fréquence faut-il mettre à jour son lien en bio ?",
                  a: "Une fois par semaine au minimum, et systématiquement avant et après chaque lancement ou promo. Un lien à jour est un signal de sérieux envoyé à ton audience.",
                },
                {
                  q: "Comment savoir si mon lien en bio fonctionne ?",
                  a: "Regarde les statistiques de clics : visites, pays, appareils, sources de trafic. Si un lien reçoit peu de clics, déplace-le ou reformule son libellé.",
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
            <h2 className="text-2xl font-black mb-2">Corrige tes erreurs dès aujourd'hui</h2>
            <p className="text-purple-100 mb-6 leading-relaxed max-w-md mx-auto">
              Crée ta page BeassistLink en 30 secondes, personnalisée et sans carte bancaire.
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
              <Link href="/blog/10-liens-bio-instagram" className="text-[#8F00FF] hover:underline">
                → 10 liens à mettre dans ta bio Instagram pour convertir
              </Link>
              <Link href="/blog/plusieurs-liens-instagram" className="text-[#8F00FF] hover:underline">
                → Comment avoir plusieurs liens sur Instagram sans payer
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
