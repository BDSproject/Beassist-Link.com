import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ALL_FONT_VARIABLES } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { HtmlLangSync } from "@/components/html-lang-sync";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Build the combined CSS-variable class string for <html>
const fontVarClasses = ALL_FONT_VARIABLES.map((f) => f.variable).join(" ");

const BASE = "https://www.beassist-link.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "BeassistLink — Page de liens bio, liens courts et QR codes",
    template: "%s | BeassistLink",
  },
  description:
    "Crée ta page de liens bio en quelques secondes : tous tes liens, tes réseaux et tes offres au même endroit. Liens courts, QR codes et statistiques inclus.",
  keywords: [
    // FR — haute intention
    "lien en bio instagram",
    "alternative linktree",
    "plusieurs liens bio instagram",
    "page de liens personnalisée",
    "outil lien dans bio",
    // FR — longue traîne
    "linktree gratuit",
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
    "link in bio tool",
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
  },
  openGraph: {
    title: "BeassistLink — Page de liens bio, liens courts et QR codes",
    description:
      "Regroupe tous tes réseaux sociaux en un seul lien élégant. Gratuit et conforme RGPD. Fait en France 🇫🇷",
    url: BASE,
    siteName: "BeassistLink",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: `${BASE}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "BeassistLink — page de liens bio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BeassistLink — Page de liens bio gratuite 🇫🇷",
    description:
      "Plusieurs liens en bio Instagram / TikTok. Gratuit et conforme RGPD. Fait en France 🇫🇷",
    creator: "@beassistlink",
    images: [`${BASE}/og-image.png`],
  },
  icons: {
    icon: [
      { url: "/favicon.png?v=2", type: "image/png" },
      { url: "/icon.svg?v=2", type: "image/svg+xml" },
      { url: "/apple-touch-icon-180x180.png?v=2", type: "image/png", sizes: "180x180" },
    ],
    shortcut: "/favicon.png?v=2",
    apple: "/apple-touch-icon-180x180.png?v=2",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${BASE}/#website`,
        url: BASE,
        name: "BeassistLink",
        inLanguage: "fr-FR",
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
      },
    ],
  };

  return (
    <html lang="fr" suppressHydrationWarning className={`${inter.variable} ${fontVarClasses}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
        <HtmlLangSync />
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
