import type { MetadataRoute } from "next";

const BASE = "https://www.beassist-link.com";

// Static pages with their priorities and change frequencies
const staticRoutes: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastModified?: string;
}> = [
  // Core — highest priority
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/register", priority: 0.9, changeFrequency: "monthly" },
  { path: "/login", priority: 0.7, changeFrequency: "monthly" },
  // SEO landing pages
  { path: "/fr/comparatif-linktree", priority: 0.95, changeFrequency: "monthly", lastModified: "2026-04-14" },
  { path: "/features", priority: 0.85, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.85, changeFrequency: "weekly" },
  // Blog — high frequency
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/blog/plusieurs-liens-instagram", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-04-14" },
  { path: "/blog/7-erreurs-lien-en-bio", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-09-28" },
  { path: "/blog/10-liens-bio-instagram", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-09-28" },
  // Support / docs
  { path: "/help", priority: 0.6, changeFrequency: "monthly" },
  { path: "/docs", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  // Legal
  { path: "/legal", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cgu", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.3, changeFrequency: "yearly" },
  { path: "/gdpr", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map(({ path, priority, changeFrequency, lastModified }) => ({
    url: `${BASE}${path}`,
    lastModified: lastModified ? new Date(lastModified) : new Date(),
    changeFrequency,
    priority,
  }));
}
