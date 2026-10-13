import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ArrowRight } from "lucide-react";

const BASE = "https://www.beassist-link.com";
const SLUG = "multiple-links-instagram-bio";
const PUBLISHED = "2026-04-14";

export const metadata: Metadata = {
  title: "How to Add Multiple Links to Your Instagram Bio (Free)",
  description:
    "Step-by-step: build a free link page and put it in your Instagram bio in 5 minutes — no credit card required.",
  keywords: [
    "multiple links instagram bio",
    "instagram link in bio",
    "add multiple links instagram",
    "link in bio tool",
    "custom link page",
    "free linktree alternative",
    "free link page",
    "how to add multiple links instagram",
    "instagram bio link free",
  ],
  alternates: {
    canonical: `${BASE}/en/blog/${SLUG}`,
    languages: {
      en: `${BASE}/en/blog/${SLUG}`,
      fr: `${BASE}/blog/plusieurs-liens-instagram`,
      "x-default": `${BASE}/blog/plusieurs-liens-instagram`,
    },
  },
  openGraph: {
    title: "How to Add Multiple Links to Your Instagram Bio (Free)",
    description:
      "Step-by-step guide to put multiple links in your Instagram bio — free, GDPR-friendly, with BeassistLink",
    url: `${BASE}/en/blog/${SLUG}`,
    type: "article",
    publishedTime: PUBLISHED,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      headline: "How to Add Multiple Links to Your Instagram Bio (Free)",
      description:
        "Step-by-step: build a free link page and put it in your Instagram bio in 5 minutes — no credit card required.",
      datePublished: PUBLISHED,
      author: { "@type": "Organization", name: "BeassistLink" },
      publisher: {
        "@type": "Organization",
        name: "BeassistLink",
        logo: { "@type": "ImageObject", url: `${BASE}/icon.svg` },
      },
      mainEntityOfPage: `${BASE}/en/blog/${SLUG}`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Does Instagram allow third-party link-in-bio tools?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, completely. Instagram itself recommends this type of tool. No risk of a ban.",
          },
        },
        {
          "@type": "Question",
          name: "Can I put my Spotify link in my Instagram bio?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Add your Spotify URL to BeassistLink, then put your BeassistLink URL in your Instagram bio. Followers reach your music in one tap.",
          },
        },
        {
          "@type": "Question",
          name: "Is BeassistLink really free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The FREE plan lets you build a link in bio page with 5 links, no credit card required. Paid plans add click stats, QR codes and full customization.",
          },
        },
      ],
    },
  ],
};

export default function BlogMultipleLinksInstagramBio() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="overflow-hidden bg-white min-h-screen">
        <Navbar />

        {/* ── Article header ── */}
        <header className="pt-28 pb-10 border-b border-gray-100 bg-gradient-to-b from-[#F9F5FF] to-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700">Guide</span>
              <span className="text-xs text-gray-400">April 14, 2026 · 5 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight tracking-tight">
              How to Add Multiple Links to Your Instagram Bio (Free)
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Instagram only gives you one link in your bio. Here's how to add as many as you want —{" "}
              <strong>free</strong>, in under 5 minutes.
            </p>
          </div>
        </header>

        {/* ── Article body ── */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-12">

          {/* Intro */}
          <div className="prose prose-gray max-w-none text-[15px] leading-relaxed">
            <p>
              Instagram has always limited every profile to <strong>one clickable link</strong> in the bio. For
              creators, small business owners and artists who want to share several things at once, that's a
              frustrating constraint.
            </p>
            <p>
              The fix: build a <strong>custom link page</strong> (also called a <em>link in bio</em>) that holds all
              your links. This guide walks you through it with <strong>BeassistLink</strong>, the European alternative
              to Linktree.
            </p>
          </div>

          {/* Why not Linktree */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">
              Why not Linktree?
            </h2>
            <div className="text-[15px] text-gray-600 leading-relaxed space-y-3">
              <p>
                Linktree is the best-known option, but its free plan shows a <strong>Linktree badge</strong> on your
                page and locks detailed analytics and customization behind a paid plan (around{" "}
                <strong>$5–24/month in 2026</strong>).
              </p>
              <p>
                <Link href="/en" className="text-[#8F00FF] font-semibold hover:underline">BeassistLink</Link> is a
                European alternative: hosting in Europe, GDPR by default, and no third-party cookies on your page.
              </p>
            </div>
          </section>

          {/* Free plan */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">
              What you get on the FREE plan
            </h2>
            <div className="text-[15px] text-gray-600 leading-relaxed space-y-3">
              <p>
                You don't need a paid plan to get started. The BeassistLink FREE plan includes{" "}
                <strong>1 bio page</strong>, <strong>5 links</strong>, <strong>3 short links</strong> and a{" "}
                <strong>theme</strong> — enough to put a professional link in your bio today, with no credit card.
              </p>
              <p>
                When you're ready to grow, STARTER ($7/month or $76/year) adds click stats, QR codes, more pages and
                a custom link, while PRO ($13/month or $140/year) unlocks advanced analytics, unlimited QR codes,
                scheduled links and a custom domain —{" "}
                <Link href="/en/pricing" className="text-[#8F00FF] font-semibold hover:underline">see pricing</Link>.
              </p>
            </div>
          </section>

          {/* Steps */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-6">
              Step by step: add multiple links to your Instagram bio
            </h2>
            <ol className="space-y-6">
              {[
                {
                  n: 1,
                  title: "Create your BeassistLink account (free)",
                  body: (
                    <>
                      Go to{" "}
                      <Link href="/register" className="text-[#8F00FF] font-semibold hover:underline">
                        beassist-link.com/register
                      </Link>{" "}
                      and create your account in 30 seconds. Pick a username — it becomes your custom URL (e.g.{" "}
                      <code className="text-xs bg-gray-100 rounded px-1.5 py-0.5">beassist-link.com/yourname</code>).
                      No credit card required.
                    </>
                  ),
                },
                {
                  n: 2,
                  title: "Add all your links",
                  body: "In your dashboard, click Links, then Add a link. Add as many destinations as you need: TikTok, YouTube, your online store, Spotify, newsletter, contact form.",
                },
                {
                  n: 3,
                  title: "Customize your bio page",
                  body: "Open the Bio tab, choose your theme, add your profile photo and a short description. Your page previews in real time.",
                },
                {
                  n: 4,
                  title: "Paste your link into your Instagram bio",
                  body: (
                    <>
                      Open your Instagram profile → <strong>Edit profile</strong> → <strong>Website</strong>. Paste
                      your BeassistLink URL and save. Your followers now get one tappable button that leads to every
                      link.
                    </>
                  ),
                },
              ].map(({ n, title, body }) => (
                <li key={n} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8F00FF] text-white font-black text-sm flex items-center justify-center">
                    {n}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                    <p className="text-[15px] text-gray-600 leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Tips */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-4">
              5 links to prioritize in your Instagram bio
            </h2>
            <div className="space-y-3">
              {[
                ["🎥", "Your latest Reel or YouTube video", "Fresh content converts better than a static page."],
                ["🛒", "Your store or main offer", "Direct link to your hero product or checkout page."],
                ["🎵", "Your Spotify or music link", "A must for artists who want more streams."],
                ["📧", "Your newsletter or contact form", "Turn followers into email subscribers you own."],
                ["🔗", "Your TikTok / YouTube profile", "Grow every platform by cross-promoting from Instagram."],
              ].map(([emoji, title, tip]) => (
                <div key={title as string} className="flex gap-3 p-4 rounded-xl border border-gray-200">
                  <span className="text-xl">{emoji}</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{title as string}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{tip as string}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-5">Frequently asked questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Does Instagram allow third-party link-in-bio tools?",
                  a: "Yes, completely. Instagram itself recommends this type of tool. No risk of a ban.",
                },
                {
                  q: "Can I put my Spotify link in my Instagram bio?",
                  a: "Yes. Add your Spotify URL to BeassistLink, then put your BeassistLink URL in your Instagram bio. Followers reach your music in one tap.",
                },
                {
                  q: "Is BeassistLink really free?",
                  a: "Yes. The FREE plan lets you build a link in bio page with 5 links, no credit card required. Paid plans add click stats, QR codes and full customization.",
                },
              ].map(({ q, a }) => (
                <div key={q} className="rounded-2xl border border-gray-200 p-5">
                  <h3 className="font-bold text-gray-900 text-[15px] mb-2">{q}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl bg-gradient-to-br from-[#8F00FF] to-[#6200CC] p-8 text-center text-white">
            <h2 className="text-2xl font-black mb-2">Ready to add multiple links to your bio?</h2>
            <p className="text-purple-100 mb-6 leading-relaxed max-w-md mx-auto">
              Create your BeassistLink page in 30 seconds. Free, no credit card required.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-[#8F00FF] font-bold hover:bg-purple-50 transition-colors shadow-lg"
            >
              Create my free bio page
              <ArrowRight size={16} />
            </Link>
          </section>

          {/* Related posts */}
          <nav aria-label="Related articles" className="border-t border-gray-100 pt-8">
            <p className="text-sm font-semibold text-gray-500 mb-3">Read next</p>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/fr/comparatif-linktree" className="text-[#8F00FF] hover:underline">
                → Linktree 2026 comparison — which alternative to choose?
              </Link>
              <Link href="/en/blog/link-in-bio-mistakes" className="text-[#8F00FF] hover:underline">
                → 7 Link in Bio Mistakes That Make Visitors Leave
              </Link>
              <Link href="/en/blog/links-instagram-bio" className="text-[#8F00FF] hover:underline">
                → 10 Links to Put in Your Instagram Bio to Convert Followers
              </Link>
            </div>
          </nav>
        </article>

        <Footer />
      </main>
    </>
  );
}
