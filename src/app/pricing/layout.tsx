import type { Metadata } from "next";

const BASE = "https://www.beassist-link.com";
const PAGE_URL = `${BASE}/pricing`;

export const metadata: Metadata = {
  title: "Tarifs — Plans lien en bio | BeassistLink",
  description:
    "Compare les offres FREE, STARTER et PRO. Crée ton lien en bio, raccourcis tes liens et génère des QR codes — commence gratuitement, sans carte bancaire.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "fr": PAGE_URL,
      "en": `${BASE}/en/pricing`,
      "x-default": PAGE_URL,
    },
  },
  openGraph: {
    title: "Tarifs — Plans lien en bio | BeassistLink",
    description:
      "Compare les offres FREE, STARTER et PRO pour développer ton lien en bio avec analytics, QR codes et personnalisation.",
    url: PAGE_URL,
    type: "website",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
