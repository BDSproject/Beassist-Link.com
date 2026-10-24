import type { MetadataRoute } from "next";

const BASE = "https://www.beassist-link.com";

// Static pages with their priorities and change frequencies
const staticRoutes: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastModified?: string;
}> = [
  // Core : highest priority
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/en", priority: 1.0, changeFrequency: "weekly" },
  { path: "/register", priority: 0.9, changeFrequency: "monthly" },
  { path: "/login", priority: 0.7, changeFrequency: "monthly" },
  // SEO landing pages
  { path: "/fr/comparatif-linktree", priority: 0.95, changeFrequency: "monthly", lastModified: "2026-04-14" },
  { path: "/features", priority: 0.85, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.85, changeFrequency: "weekly" },
  { path: "/en/features", priority: 0.85, changeFrequency: "monthly" },
  { path: "/en/pricing", priority: 0.85, changeFrequency: "weekly" },
  // Blog : high frequency
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/blog/plusieurs-liens-instagram", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-04-14" },
  { path: "/blog/7-erreurs-lien-en-bio", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-09-28" },
  { path: "/blog/10-liens-bio-instagram", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-09-28" },
  { path: "/blog/beassistlink-vs-linktree-2026", priority: 0.85, changeFrequency: "monthly", lastModified: "2026-04-12" },
  { path: "/blog/beassistlink-vs-bio-link-alternatives", priority: 0.85, changeFrequency: "monthly", lastModified: "2026-04-08" },
  { path: "/blog/pourquoi-choisir-solution-francaise", priority: 0.85, changeFrequency: "monthly", lastModified: "2026-04-05" },
  { path: "/blog/optimiser-bio-convertir-2026", priority: 0.85, changeFrequency: "monthly", lastModified: "2026-04-01" },
  { path: "/blog/qr-codes-bonnes-pratiques", priority: 0.85, changeFrequency: "monthly", lastModified: "2026-03-28" },
  { path: "/blog/free-vs-starter-quand-upgrader", priority: 0.85, changeFrequency: "monthly", lastModified: "2026-03-22" },
  // Blog : English (US)
  { path: "/en/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/en/blog/link-in-bio-mistakes", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-09-28" },
  { path: "/en/blog/links-instagram-bio", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-09-28" },
  { path: "/en/blog/multiple-links-instagram-bio", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-04-14" },
  { path: "/en/blog/beassistlink-vs-linktree", priority: 0.85, changeFrequency: "monthly", lastModified: "2026-04-12" },
  { path: "/en/blog/link-in-bio-alternatives", priority: 0.85, changeFrequency: "monthly", lastModified: "2026-04-08" },
  { path: "/en/blog/privacy-first-link-in-bio", priority: 0.85, changeFrequency: "monthly", lastModified: "2026-04-05" },
  { path: "/en/blog/optimize-bio-convert", priority: 0.85, changeFrequency: "monthly", lastModified: "2026-04-01" },
  { path: "/en/blog/qr-code-printing-tips", priority: 0.85, changeFrequency: "monthly", lastModified: "2026-03-28" },
  { path: "/en/blog/free-vs-starter-upgrade", priority: 0.85, changeFrequency: "monthly", lastModified: "2026-03-22" },
  // Support / docs
  { path: "/help", priority: 0.6, changeFrequency: "monthly" },
  { path: "/docs", priority: 0.6, changeFrequency: "monthly" },
  { path: "/api-docs", priority: 0.4, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  // Entreprise
  { path: "/about", priority: 0.5, changeFrequency: "monthly" },
  { path: "/product", priority: 0.7, changeFrequency: "monthly" },
  { path: "/partenariat", priority: 0.5, changeFrequency: "monthly" },
  { path: "/support", priority: 0.5, changeFrequency: "monthly" },
  { path: "/careers", priority: 0.4, changeFrequency: "monthly" },
  // Legal
  { path: "/legal", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cgu", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.3, changeFrequency: "yearly" },
  { path: "/gdpr", priority: 0.3, changeFrequency: "yearly" },
  // Legal : English (US)
  { path: "/en/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/en/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/en/cookies", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map(({ path, priority, changeFrequency, lastModified }) => ({
    url: `${BASE}${path}`,
    lastModified: lastModified ? new Date(lastModified) : new Date(),
    changeFrequency,
    priority,
  }));
}
