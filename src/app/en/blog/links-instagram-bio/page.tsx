import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ArrowRight } from "lucide-react";

const BASE = "https://www.beassist-link.com";
const SLUG = "links-instagram-bio";
const PUBLISHED = "2026-09-28";

export const metadata: Metadata = {
  title: "10 Links to Put in Your Instagram Bio to Convert Followers",
  description:
    "Store, newsletter, booking, Spotify… the 10 links that actually turn followers into customers : gathered in one link.",
  keywords: [
    "links to put in instagram bio",
    "link in bio ideas",
    "link in bio that converts",
    "instagram bio store",
    "creator link in bio",
    "link page ideas",
    "instagram link in bio",
  ],
  alternates: {
    canonical: `${BASE}/en/blog/${SLUG}`,
    languages: {
      en: `${BASE}/en/blog/${SLUG}`,
      fr: `${BASE}/blog/10-liens-bio-instagram`,
      "x-default": `${BASE}/blog/10-liens-bio-instagram`,
    },
  },
  openGraph: {
    title: "10 Links to Put in Your Instagram Bio to Convert Followers",
    description:
      "The 10 links that turn followers into customers : by the BeassistLink team",
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
      headline: "10 Links to Put in Your Instagram Bio to Convert Followers",
      description:
        "Store, newsletter, booking, Spotify: the 10 links that turn followers into customers, gathered in one link.",
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
          name: "Which link should go first in my Instagram bio?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The one that pays you: your store, your offer or your booking link. The first position gets most of the clicks, so put your main goal there.",
          },
        },
        {
          "@type": "Question",
          name: "Can I change my links regularly?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, and you should. Plenty of creators swap their main link every week to match their current content : a video, a promo, a launch.",
          },
        },
        {
          "@type": "Question",
          name: "Is BeassistLink really free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The FREE plan includes a link in bio page with up to 5 links, no credit card required. Paid plans add click stats, QR codes and full customization.",
          },
        },
      ],
    },
  ],
};

export default function BlogLinksInstagramBio() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="overflow-hidden bg-white min-h-screen">
        <Navbar />

        {/* ── Article header ── */}
        <header className="pt-28 pb-10 border-b border-gray-100 bg-gradient-to-b from-[#FFF7ED] to-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700">Ideas</span>
              <span className="text-xs text-gray-400">September 28, 2026 · 5 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight tracking-tight">
              10 Links to Put in Your Instagram Bio to Convert Followers
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Store, newsletter, booking, Spotify… the 10 links that actually turn followers into customers : gathered
              in <strong>one link</strong>.
            </p>
          </div>
        </header>

        {/* ── Article body ── */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-12">

          {/* Intro */}
          <div className="prose prose-gray max-w-none text-[15px] leading-relaxed">
            <p>
              Your Instagram bio is a hallway: followers walk through it for a few seconds before deciding where to
              go. Every link you put there needs a clear job. Here are the <strong>10 links that actually convert</strong>,
              no matter your niche : and how to gather them into one.
            </p>
            <p>
              Whether you're a TikTok creator, an Etsy seller or a local bakery, the rule is the same: don't make
              people guess. Give each link one clear job, and order them so the most valuable one sits at the top.
            </p>
          </div>

          {/* The 10 links */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-6">The 10 links that turn followers into customers</h2>
            <div className="space-y-3">
              {[
                ["🛒", "Your store or main offer", "The link that makes you money. Put your hero product, Shopify store or Etsy shop first: it's what followers should see the moment they land."],
                ["🎥", "Your latest Reel or YouTube video", "Fresh content makes people want to tap. Swap this link every time you post to stay current."],
                ["📱", "Your TikTok or YouTube channel", "Cross-promotion is the easiest way to grow several platforms at once : an Instagram follower becomes a TikTok follower."],
                ["💌", "Your newsletter or freebie", "Turn followers into email subscribers you actually own. The algorithm can hide your posts; it can't hide your email list."],
                ["🎵", "Your Spotify or Apple Music link", "A must for artists: one page for streams, tracks and tour dates."],
                ["📅", "Your booking link", "Coaching, services, appointments: a direct link to your Calendly or scheduler removes all friction between 'I want it' and 'I booked it'."],
                ["⚡", "A short link to your current promo", "A short, memorable URL you can drop in stories, captions or a flyer : with a QR code generated in one click."],
                ["🤝", "Your media kit or brand partnerships page", "Brands looking to work with you want your numbers. Make them one click away and you become easy to contact."],
                ["💰", "Your affiliate program", "Every recommendation can become income. A clean, trackable link beats a wall of promo codes."],
                ["🌟", "Your members-only platform (Patreon, OnlyFans, Substack…)", "If you sell exclusive content, your link page should lead there quietly but reliably."],
              ].map(([emoji, title, tip]) => (
                <div key={title as string} className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#8F00FF]/40 transition-colors">
                  <span className="text-2xl">{emoji}</span>
                  <div>
                    <p className="font-semibold text-gray-900">{title as string}</p>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{tip as string}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How to fit it all */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">How do you fit all of this into one link?</h2>
            <div className="text-[15px] text-gray-600 leading-relaxed space-y-3">
              <p>
                Instagram only allows <strong>one clickable link</strong> in the bio. The fix: a link page that gathers
                your 10 destinations, ordered by priority : the most important on top, the rest just below.
              </p>
              <p>
                With <Link href="/en" className="text-[#8F00FF] font-semibold hover:underline">BeassistLink</Link>, you
                build that page free in 30 seconds: choose your username (it becomes your URL), add your links and pick
                a theme. Paid plans add click stats on every link and full customization :{" "}
                <Link href="/en/pricing" className="text-[#8F00FF] font-semibold hover:underline">see pricing</Link>.
              </p>
              <p>
                Start with three to five links, then add more as your business grows. A short, focused page beats a
                long wall of buttons: followers tap more when the choice feels obvious.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-5">Frequently asked questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Which link should go first in my Instagram bio?",
                  a: "The one that pays you: your store, your offer or your booking link. The first position gets most of the clicks, so put your main goal there.",
                },
                {
                  q: "Can I change my links regularly?",
                  a: "Yes, and you should. Plenty of creators swap their main link every week to match their current content : a video, a promo, a launch.",
                },
                {
                  q: "Is BeassistLink really free?",
                  a: "The FREE plan includes a link in bio page with up to 5 links, no credit card required. Paid plans add click stats, QR codes and full customization.",
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
            <h2 className="text-2xl font-black mb-2">Gather your 10 links into one</h2>
            <p className="text-purple-100 mb-6 leading-relaxed max-w-md mx-auto">
              Create your link page in 30 seconds, in your style. Free, no credit card required.
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
              <Link href="/en/blog/link-in-bio-mistakes" className="text-[#8F00FF] hover:underline">
                → 7 Link in Bio Mistakes That Make Visitors Leave
              </Link>
              <Link href="/en/blog/multiple-links-instagram-bio" className="text-[#8F00FF] hover:underline">
                → How to Add Multiple Links to Your Instagram Bio (Free)
              </Link>
              <Link href="/fr/comparatif-linktree" className="text-[#8F00FF] hover:underline">
                → Linktree 2026 comparison : which alternative to choose?
              </Link>
            </div>
          </nav>
        </article>

        <Footer />
      </main>
    </>
  );
}
