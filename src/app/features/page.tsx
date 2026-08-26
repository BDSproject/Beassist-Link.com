import type { Metadata } from "next";
import { FeaturesPageContent } from "@/components/landing/features-page-content";

const BASE = "https://www.beassist-link.com";
const PAGE_URL = `${BASE}/features`;

export const metadata: Metadata = {
  title: "Fonctionnalités lien en bio | BeassistLink",
  description:
    "Découvrez les fonctionnalités BeassistLink : lien en bio, liens courts, QR codes, analytics et personnalisation pour créateurs et entreprises.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Fonctionnalités lien en bio | BeassistLink",
    description:
      "Lien en bio, liens courts, QR codes et personnalisation : toutes les fonctionnalités BeassistLink pour mieux convertir votre audience.",
    url: PAGE_URL,
    type: "website",
    images: [
      {
        url: `${BASE}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Fonctionnalités BeassistLink",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fonctionnalités lien en bio | BeassistLink",
    description:
      "Explorez les fonctionnalités BeassistLink pour créer un lien en bio performant et mieux convertir votre audience.",
    images: [`${BASE}/og-image.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: BASE,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Fonctionnalités",
          item: PAGE_URL,
        },
      ],
    },
    {
      "@type": "Service",
      name: "BeassistLink",
      serviceType: "Plateforme de lien en bio",
      provider: {
        "@type": "Organization",
        name: "BeassistLink",
        url: BASE,
      },
      areaServed: "FR",
      url: PAGE_URL,
      description:
        "Plateforme de lien en bio avec personnalisation, liens raccourcis, QR codes et analytics pour créateurs et entreprises.",
    },
  ],
};

export default function FeaturesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FeaturesPageContent />
    </>
  );
}
