import type { Metadata } from "next";
import { LanguageProvider } from "@/contexts/language-context";

const BASE = "https://www.beassist-link.com";

export const metadata: Metadata = {
  title: { absolute: "BeassistLink · Gather. Share. Grow." },
  description:
    "Create your link in bio, shorten links and generate QR codes from one simple dashboard. The all-in-one toolkit for creators and small businesses.",
  alternates: {
    canonical: `${BASE}/en`,
    languages: {
      "en": `${BASE}/en`,
      "fr": BASE,
      "x-default": BASE,
    },
  },
  openGraph: {
    title: "BeassistLink · Gather. Share. Grow.",
    description:
      "Your whole link-in-bio toolkit, in one simple tool. Bio page, short links, QR codes and analytics for creators and small businesses.",
    url: `${BASE}/en`,
    type: "website",
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <LanguageProvider initialLang="en">{children}</LanguageProvider>;
}
