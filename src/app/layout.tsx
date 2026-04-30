import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ALL_FONT_VARIABLES } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Build the combined CSS-variable class string for <html>
const fontVarClasses = ALL_FONT_VARIABLES.map((f) => f.variable).join(" ");

const BASE = "https://www.beassist-link.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "BeassistLink — Alternative Linktree Française Gratuite",
    template: "%s | BeassistLink",
  },
  description:
    "Créez votre page de liens personnalisée en quelques secondes. Alternative française à Linktree : plusieurs liens en bio Instagram, TikTok, YouTube — gratuit, sans logo, conforme RGPD.",
  keywords: [
    // FR — haute intention
    "lien en bio instagram",
    "alternative linktree",
    "plusieurs liens bio instagram",
    "page de liens personnalisée",
    "outil lien dans bio",
    // FR — longue traîne
    "linktree sans logo",
    "mettre lien spotify dans bio",
    "créer page redirection gratuite",
    "alternative linktree française",
    "lien bio gratuit france",
    "page bio instagram",
    "lien bio tiktok",
    // EN — volume
    "link in bio",
    "linktree alternative",
    "free link in bio tool",
    "bio link website",
    // EN — conversion
    "no logo link in bio",
    "unlimited links bio",
    "custom bio link page",
    "best link in bio for tiktok",
    // Brand
    "beassistlink",
    "url shortener",
    "liens raccourcis",
  ],
  authors: [{ name: "BeassistLink", url: BASE }],
  creator: "BeassistLink",
  publisher: "BeassistLink",
  alternates: {
    canonical: BASE,
    languages: {
      "fr-FR": BASE,
      "en-US": `${BASE}/en`,
    },
  },
  openGraph: {
    title: "BeassistLink — Alternative Linktree Française Gratuite",
    description:
      "Regroupez tous vos réseaux sociaux en un seul lien élégant. Gratuit, sans logo, conforme RGPD. Fait en France 🇫🇷",
    url: BASE,
    siteName: "BeassistLink",
    locale: "fr_FR",
    alternateLocale: "en_US",
    type: "website",
    images: [
      {
        url: `${BASE}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "BeassistLink — Alternative Linktree Française",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BeassistLink — Alternative Linktree Gratuite 🇫🇷",
    description:
      "Plusieurs liens en bio Instagram / TikTok. Gratuit, sans logo, RGPD. Alternative française à Linktree.",
    creator: "@beassistlink",
    images: [`${BASE}/og-image.png`],
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/apple-touch-icon-180x180.png", type: "image/png", sizes: "180x180" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon-180x180.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "8o5nEUX6BIXJU3MYVcIdxPNsFZERlqdROcoUpApBcUg",
  },
};

export const viewport: Viewport = {
  themeColor: "#8F00FF",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${inter.variable} ${fontVarClasses}`}>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
