import Link from "next/link";
import type { Metadata } from "next";
import { MarketingLayout } from "@/components/landing/marketing-layout";
import { ArrowRight } from "lucide-react";

const BASE = "https://www.beassist-link.com";

export const metadata: Metadata = {
  title: "Blog : Link in Bio Tips, Comparisons & Creator Strategy | BeassistLink",
  description:
    "Tutorials, comparisons and advice to optimize your link in bio on Instagram, TikTok and YouTube. English articles from BeassistLink.",
  alternates: {
    canonical: `${BASE}/en/blog`,
    languages: {
      "en": `${BASE}/en/blog`,
      "fr": `${BASE}/blog`,
      "x-default": `${BASE}/blog`,
    },
  },
  openGraph: {
    title: "Blog : Link in Bio Tips & Comparisons | BeassistLink",
    description:
      "Tutorials, comparisons and strategies to grow with your link in bio : by the BeassistLink team.",
    url: `${BASE}/en/blog`,
    type: "website",
  },
};

const posts = [
  {
    slug: "link-in-bio-mistakes",
    tag: "Strategy",
    tagColor: "bg-green-100 text-green-700",
    title: "7 Link in Bio Mistakes That Make Visitors Leave",
    excerpt:
      "Dead links, a generic page, no call to action: the 7 mistakes costing you customers : and how to fix them in 10 minutes.",
    date: "September 28, 2026",
    readTime: "6 min",
    featured: true,
  },
  {
    slug: "links-instagram-bio",
    tag: "Ideas",
    tagColor: "bg-orange-100 text-orange-700",
    title: "10 Links to Put in Your Instagram Bio to Convert Followers",
    excerpt:
      "Store, newsletter, booking, Spotify… the 10 links that actually turn followers into customers : gathered in one link.",
    date: "September 28, 2026",
    readTime: "5 min",
    featured: false,
  },
  {
    slug: "multiple-links-instagram-bio",
    tag: "Guide",
    tagColor: "bg-green-100 text-green-700",
    title: "How to Add Multiple Links to Your Instagram Bio (Free)",
    excerpt:
      "Step-by-step: build a free link page and put it in your Instagram bio in 5 minutes : no credit card required.",
    date: "April 14, 2026",
    readTime: "5 min",
    featured: false,
  },
  {
    slug: "beassistlink-vs-linktree",
    tag: "Comparison",
    tagColor: "bg-purple-100 text-purple-700",
    title: "BeassistLink vs Linktree in 2026: The Full Comparison",
    excerpt:
      "Pricing, features, analytics, privacy… every difference between BeassistLink and Linktree to help you choose.",
    date: "April 12, 2026",
    readTime: "6 min",
    featured: false,
  },
  {
    slug: "link-in-bio-alternatives",
    tag: "Comparison",
    tagColor: "bg-purple-100 text-purple-700",
    title: "Linktree, Beacons, Milkshake, Stan Store… Which One?",
    excerpt:
      "A tour of the main link-in-bio tools in 2026 : and how BeassistLink stands out on price and privacy.",
    date: "April 8, 2026",
    readTime: "8 min",
    featured: false,
  },
  {
    slug: "privacy-first-link-in-bio",
    tag: "Privacy",
    tagColor: "bg-blue-100 text-blue-700",
    title: "Why Privacy Matters for Your Link in Bio",
    excerpt:
      "European hosting, GDPR by default, no third-party tracking cookies… what most US tools can't offer.",
    date: "April 5, 2026",
    readTime: "5 min",
    featured: false,
  },
  {
    slug: "optimize-bio-convert",
    tag: "Strategy",
    tagColor: "bg-green-100 text-green-700",
    title: "How to Optimize Your Bio to Convert in 2026",
    excerpt:
      "7 simple levers to turn visitors into customers : best practices from creators who treat their bio seriously.",
    date: "April 1, 2026",
    readTime: "4 min",
    featured: false,
  },
  {
    slug: "qr-code-printing-tips",
    tag: "Tutorial",
    tagColor: "bg-orange-100 text-orange-700",
    title: "QR Codes: Best Practices for Printing",
    excerpt:
      "Size, contrast, error correction, testing: the practical guide to QR codes that scan every time.",
    date: "March 28, 2026",
    readTime: "4 min",
    featured: false,
  },
  {
    slug: "free-vs-starter-upgrade",
    tag: "Tips",
    tagColor: "bg-yellow-100 text-yellow-700",
    title: "FREE vs STARTER: When Should You Upgrade?",
    excerpt:
      "The 5 concrete signs it's time to upgrade : and what you actually gain with the Starter plan.",
    date: "March 22, 2026",
    readTime: "3 min",
    featured: false,
  },
];

export default function EnBlogPage() {
  const [featured, ...rest] = posts;

  return (
    <MarketingLayout
      category="Blog"
      title="Link in bio tips, comparisons & creator strategy"
      description="Tutorials, comparisons and analyses to perform better online : by the BeassistLink team."
      updatedAt="September 28, 2026"
    >
      {/* Featured article */}
      <article className="rounded-2xl border-2 border-[#8F00FF]/30 bg-gradient-to-br from-[#F9F5FF] to-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${featured.tagColor}`}>
            {featured.tag}
          </span>
          <span className="text-xs text-gray-400">{featured.date} · {featured.readTime} read</span>
          <span className="text-xs font-semibold text-[#8F00FF] bg-[#8F00FF]/10 px-2.5 py-1 rounded-full">Featured</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug">{featured.title}</h2>
        <p className="text-sm text-gray-600 mt-3 leading-relaxed">{featured.excerpt}</p>
        <Link
          href={`/en/blog/${featured.slug}`}
          className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-[#8F00FF] hover:underline"
        >
          Read the article →
        </Link>
      </article>

      {/* All articles */}
      <div>
        <h2 className="text-lg font-black text-gray-900 mb-4">All articles</h2>
        <div className="space-y-3">
          {rest.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-gray-200 p-5 hover:border-[#8F00FF]/40 hover:bg-[#F9F5FF]/50 transition-all duration-200"
            >
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${post.tagColor}`}>
                  {post.tag}
                </span>
                <span className="text-xs text-gray-400">{post.date} · {post.readTime}</span>
              </div>
              <h3 className="text-base font-bold text-gray-900">{post.title}</h3>
              <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{post.excerpt}</p>
              <Link
                href={`/en/blog/${post.slug}`}
                className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-[#8F00FF] hover:underline"
              >
                Read the article →
              </Link>
            </article>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="rounded-2xl bg-gradient-to-br from-[#8F00FF] to-[#6200CC] p-8 text-center text-white">
        <h2 className="text-2xl font-black mb-2">Put your links to work</h2>
        <p className="text-purple-100 mb-6 leading-relaxed max-w-md mx-auto">
          Create your link in bio in 30 seconds : free, no credit card required.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-[#8F00FF] font-bold hover:bg-purple-50 transition-colors shadow-lg"
        >
          Create my free bio page
          <ArrowRight size={16} />
        </Link>
      </section>
    </MarketingLayout>
  );
}
