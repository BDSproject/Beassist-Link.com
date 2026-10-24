import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ArrowRight } from "lucide-react";

const BASE = "https://www.beassist-link.com";
const SLUG = "link-in-bio-mistakes";
const PUBLISHED = "2026-09-28";

export const metadata: Metadata = {
  title: "7 Link in Bio Mistakes That Make Visitors Leave",
  description:
    "Dead links, a generic page, no call to action: the 7 mistakes costing you customers : and how to fix them in 10 minutes.",
  keywords: [
    "link in bio mistakes",
    "optimize link in bio",
    "link in bio that converts",
    "improve instagram bio",
    "link page conversion",
    "instagram link in bio",
    "create a link page",
  ],
  alternates: {
    canonical: `${BASE}/en/blog/${SLUG}`,
    languages: {
      en: `${BASE}/en/blog/${SLUG}`,
      fr: `${BASE}/blog/7-erreurs-lien-en-bio`,
      "x-default": `${BASE}/blog/7-erreurs-lien-en-bio`,
    },
  },
  openGraph: {
    title: "7 Link in Bio Mistakes That Make Visitors Leave",
    description:
      "The 7 most common link page mistakes (and their fixes) : by the BeassistLink team",
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
      headline: "7 Link in Bio Mistakes That Make Visitors Leave",
      description:
        "Dead links, a generic page, no call to action: the 7 mistakes costing creators customers, and how to fix them.",
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
          name: "How many links should I put in my Instagram bio?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Instagram only allows one clickable link in the bio : that's why a link page is essential. On that page, feature 3 to 5 essential links instead of a long list: visitors click more when they have fewer choices.",
          },
        },
        {
          "@type": "Question",
          name: "How often should I update my link in bio?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "At least once a week, and always before and after a launch or promo. An up-to-date link signals to your audience that you're serious.",
          },
        },
        {
          "@type": "Question",
          name: "How do I know if my link in bio is working?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Look at your click stats: visits, countries, devices, traffic sources. If a link gets few clicks, move it or rewrite its label : the data tells you what to fix.",
          },
        },
      ],
    },
  ],
};

export default function BlogLinkInBioMistakes() {
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
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700">Strategy</span>
              <span className="text-xs text-gray-400">September 28, 2026 · 6 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight tracking-tight">
              7 Link in Bio Mistakes That Make Visitors Leave
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Dead links, a generic page, no call to action: the 7 mistakes costing you customers : and how to fix
              them <strong>in 10 minutes</strong>.
            </p>
          </div>
        </header>

        {/* ── Article body ── */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-12">

          {/* Intro */}
          <div className="prose prose-gray max-w-none text-[15px] leading-relaxed">
            <p>
              Every day, followers tap the link in your Instagram or TikTok bio : or scroll right past it. The
              difference rarely comes down to your content: it comes down to <strong>how you present your links</strong>.
              We analyzed hundreds of pages built with{" "}
              <Link href="/en" className="text-[#8F00FF] font-semibold hover:underline">BeassistLink</Link>, and the
              same mistakes show up again and again.
            </p>
            <p>
              The good news: they're all simple to fix. Here are the 7 most common : with the fix to apply right now.
            </p>
            <p>
              BeassistLink puts your bio page, short links, QR codes and click analytics in one tool : hosted in
              Europe, GDPR-friendly, with no third-party cookies on your page.{" "}
              <Link href="/en/pricing" className="text-[#8F00FF] font-semibold hover:underline">Plans start free</Link>,
              and paid plans add stats and full customization.
            </p>
          </div>

          {/* Mistakes */}
          <section className="space-y-8">
            {[
              {
                n: 1,
                title: "Your link points to a dead page",
                body: "A broken link, a deleted page, a typo in the URL: it's mistake number one, and it happens more often than you'd think. A visitor who lands on a 404 won't come back.",
                fix: "Check your link every week : from a different account than your own. If you switch destinations often, use a short link you can retarget: keep the same URL in your bio and change the target whenever you want.",
              },
              {
                n: 2,
                title: "Too many links, too many choices",
                body: "Serve 20 links at once and visitors tap none of them. The paradox of choice hits even harder on mobile, where every link is a small button and every second counts.",
                fix: "Keep 3 to 5 essential links at the top of your page. What you don't want on display all the time, push lower down or save for launches.",
              },
              {
                n: 3,
                title: "A page that doesn't look like you",
                body: "A generic link page : with a default theme and someone else's branding : reads like an ad. Followers hesitate: 'is this even the right account?'",
                fix: "Add your photo, your name and a short bio, then pick a theme that matches your vibe. On a paid BeassistLink plan you get full customization : your colors, your layout, your domain.",
              },
              {
                n: 4,
                title: "No call to action",
                body: "'My website', 'My socials', 'Videos': vague labels give visitors no reason to tap. A link has to sell the click itself.",
                fix: "Use verbs and benefits: 'Get my free checklist', 'Book a 15-minute call', '20% off this week'. Every link should answer one question: why click?",
              },
              {
                n: 5,
                title: "A page that's unreadable on mobile",
                body: "More than 80% of your traffic comes from a phone. If your page is slow, poorly sized or hard to read on a small screen, you lose most visitors before they ever tap.",
                fix: "Test your page on your own phone, in real conditions (on cellular data, not Wi-Fi). Choose a mobile-first tool with big buttons that are easy to hit with your thumb.",
              },
              {
                n: 6,
                title: "Links that never get updated",
                body: "An expired promo, an old pinned post, a sold-out product: it's the signal of an abandoned bio : and a creator who doesn't take care of their audience.",
                fix: "Set a monthly reminder to refresh your links. With scheduled links on BeassistLink PRO, you can even turn links on and off ahead of your launches.",
              },
              {
                n: 7,
                title: "Never looking at your stats",
                body: "Without data, you're optimizing blind. You don't know which link converts or what your audience actually cares about : and you leave money on the table.",
                fix: "Track your page's clicks: visits, countries, devices, traffic sources. Keep what works, rewrite or remove what doesn't. That's how a decorative bio becomes a bio that sells.",
              },
            ].map(({ n, title, body, fix }) => (
              <div key={n} className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-red-100 text-red-600 font-black text-sm flex items-center justify-center">
                  {n}
                </div>
                <div className="flex-1">
                  <h2 className="font-bold text-gray-900 text-lg mb-2">{title}</h2>
                  <p className="text-[15px] text-gray-600 leading-relaxed mb-2">{body}</p>
                  <div className="rounded-xl bg-green-50 border border-green-100 p-4">
                    <p className="text-[15px] text-gray-700 leading-relaxed">
                      <strong className="text-green-700">The fix: </strong>
                      {fix}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Checklist */}
          <section className="rounded-2xl border border-[#8F00FF]/20 bg-[#F9F5FF] p-6 sm:p-8">
            <h2 className="text-xl font-black text-gray-900 mb-4">The checklist of a bio that converts</h2>
            <ul className="space-y-3 text-[15px] text-gray-700">
              {[
                "My link works and goes where I want",
                "My 3 to 5 essential links sit at the top of the page",
                "My page has my photo, my name and my colors",
                "Every link has a label with an action verb",
                "The page loads fast and reads well on mobile",
                "My links are current (no expired promo)",
                "I check my stats at least once a week",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-md bg-[#8F00FF] text-white text-xs font-bold flex items-center justify-center mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-5">Frequently asked questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: "How many links should I put in my Instagram bio?",
                  a: "Instagram only allows one clickable link in the bio : that's why a link page is essential. On that page, feature 3 to 5 essential links instead of a long list.",
                },
                {
                  q: "How often should I update my link in bio?",
                  a: "At least once a week, and always before and after a launch or promo. An up-to-date link signals to your audience that you're serious.",
                },
                {
                  q: "How do I know if my link in bio is working?",
                  a: "Look at your click stats: visits, countries, devices, traffic sources. If a link gets few clicks, move it or rewrite its label.",
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
            <h2 className="text-2xl font-black mb-2">Fix your mistakes today</h2>
            <p className="text-purple-100 mb-6 leading-relaxed max-w-md mx-auto">
              Create your BeassistLink page in 30 seconds : personalized, no credit card required.
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
              <Link href="/en/blog/links-instagram-bio" className="text-[#8F00FF] hover:underline">
                → 10 Links to Put in Your Instagram Bio to Convert Followers
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
