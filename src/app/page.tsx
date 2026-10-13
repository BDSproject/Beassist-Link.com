import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Pricing } from "@/components/landing/pricing";
import { CtaSection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

const BASE = "https://www.beassist-link.com";

export const metadata: Metadata = {
  title: "BeassistLink — Le lien en bio des créateurs francophones",
  description:
    "Crée ta page de liens bio pour Instagram, TikTok et YouTube en 30 secondes. Gratuit, sans carte bancaire.",
  alternates: {
    canonical: BASE,
    languages: {
      "fr": BASE,
      "en": `${BASE}/en`,
      "x-default": BASE,
    },
  },
  openGraph: {
    title: "BeassistLink — Le lien en bio des créateurs francophones",
    description:
      "Plusieurs liens en bio Instagram, TikTok, YouTube, OnlyFans, Facebook. Gratuit et conforme RGPD. Fait en France 🇫🇷",
    url: BASE,
  },
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      url: BASE,
      name: "BeassistLink",
      description:
        "Page de liens bio, liens courts et QR codes pour Instagram, TikTok, YouTube, OnlyFans et Facebook",
      inLanguage: "fr-FR",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE}/r/{search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": `${BASE}/#organization`,
      name: "BeassistLink",
      url: BASE,
      logo: {
        "@type": "ImageObject",
        url: `${BASE}/icon.svg`,
      },
      sameAs: [
        "https://twitter.com/beassistlink",
        "https://www.instagram.com/beassistlink",
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${BASE}/#app`,
      name: "BeassistLink",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "127",
      },
      description:
        "Crée ta page de liens personnalisée gratuitement pour Instagram, TikTok et YouTube.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Comment mettre plusieurs liens en bio Instagram ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Crée ta page BeassistLink gratuitement, ajoute autant de liens que tu souhaites, puis copie ton URL personnalisée (beassist-link.com/tonnom) dans ta bio Instagram. Tes abonnés accèderont à tous tes liens depuis un seul endroit.",
          },
        },
        {
          "@type": "Question",
          name: "BeassistLink est-il une bonne alternative à Linktree ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui. BeassistLink offre des liens illimités et des analytics avancées, gratuitement. Les données sont hébergées en Europe, conformément au RGPD.",
          },
        },
        {
          "@type": "Question",
          name: "Est-ce que BeassistLink est gratuit ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui, BeassistLink est gratuit sans limite de durée. Le plan FREE inclut une page bio, des liens raccourcis et des QR codes. Les plans payants (Starter à 6 €/mois, Pro à 12 €/mois) ajoutent des analytics avancées et le domaine personnalisé.",
          },
        },
        {
          "@type": "Question",
          name: "Comment utiliser BeassistLink sur TikTok ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Crée ta page BeassistLink, puis ajoute ton URL dans la bio de ton profil TikTok. Ajoute tes liens Spotify, YouTube, boutique en ligne ou tout autre contenu en quelques clics.",
          },
        },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="overflow-hidden">
        <Navbar />
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <CtaSection />
        <Footer />
      </main>
    </>
  );
}
