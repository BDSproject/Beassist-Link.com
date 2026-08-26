import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/api/",
          "/onboarding/",
        ],
      },
    ],
    sitemap: "https://www.beassist-link.com/sitemap.xml",
    host: "https://www.beassist-link.com",
  };
}
