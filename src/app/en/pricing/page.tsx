import type { Metadata } from "next";
import PricingPage from "@/app/pricing/page";

const BASE = "https://www.beassist-link.com";

export const metadata: Metadata = {
  title: "Pricing : Link in Bio Plans | BeassistLink",
  description:
    "Compare FREE, STARTER and PRO plans. Create your link in bio, shorten links and generate QR codes : start free, no credit card required.",
  alternates: {
    canonical: `${BASE}/en/pricing`,
    languages: {
      "en": `${BASE}/en/pricing`,
      "fr": `${BASE}/pricing`,
      "x-default": `${BASE}/pricing`,
    },
  },
  openGraph: {
    title: "Pricing : Link in Bio Plans | BeassistLink",
    description:
      "Compare FREE, STARTER and PRO plans to grow your link in bio with analytics, QR codes and customization.",
    url: `${BASE}/en/pricing`,
    type: "website",
  },
};

export default function EnPricingPage() {
  return <PricingPage />;
}
