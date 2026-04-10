import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "BeassistLink — Vos liens, votre marque, un seul endroit",
    template: "%s | BeassistLink",
  },
  description:
    "Créez votre page bio et regroupez tous vos réseaux sociaux en un seul lien. Raccourcissez vos URLs, analysez vos clics et partagez partout avec BeassistLink.",
  keywords: [
    "lien bio",
    "link in bio",
    "liens raccourcis",
    "réseaux sociaux",
    "page bio",
    "url shortener",
    "beassistlink",
    "linktree",
  ],
  authors: [{ name: "BeassistLink" }],
  creator: "BeassistLink",
  openGraph: {
    title: "BeassistLink — Vos liens, votre marque",
    description:
      "Regroupez tous vos réseaux sociaux en un seul lien élégant.",
    url: "https://beassistlink.com",
    siteName: "BeassistLink",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BeassistLink",
    description: "Regroupez tous vos réseaux sociaux en un seul lien.",
    creator: "@beassistlink",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#8F00FF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
