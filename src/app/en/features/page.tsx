import type { Metadata } from "next";
import { FeaturesPageContent } from "@/components/landing/features-page-content";

const BASE = "https://www.beassist-link.com";

export const metadata: Metadata = {
  title: "Features : Link in Bio, Short Links & QR Codes | BeassistLink",
  description:
    "Discover BeassistLink features: link in bio, short links, QR codes, analytics and customization for creators and businesses.",
  alternates: {
    canonical: `${BASE}/en/features`,
    languages: {
      "en": `${BASE}/en/features`,
      "fr": `${BASE}/features`,
      "x-default": `${BASE}/features`,
    },
  },
  openGraph: {
    title: "Features : Link in Bio, Short Links & QR Codes | BeassistLink",
    description:
      "Link in bio, short links, QR codes and analytics: everything you need to share and convert your audience.",
    url: `${BASE}/en/features`,
    type: "website",
  },
};

export default function EnFeaturesPage() {
  return <FeaturesPageContent />;
}
