import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ArrowRight } from "lucide-react";

const BASE = "https://www.beassist-link.com";
const SLUG = "free-vs-starter-upgrade";
const PUBLISHED = "2026-03-22";

export const metadata: Metadata = {
  title: "FREE vs STARTER: When Should You Upgrade?",
  description:
    "The 5 concrete signs it's time to upgrade : and what you actually gain with the BeassistLink Starter plan.",
  keywords: [
    "free link in bio plan",
    "beassistlink starter",
    "beassistlink pricing",
    "when to upgrade link in bio",
    "qr code starter plan",
    "link in bio stats",
    "custom link bio",
  ],
  alternates: {
    canonical: `${BASE}/en/blog/${SLUG}`,
    languages: {
      "en": `${BASE}/en/blog/${SLUG}`,
      "fr": `${BASE}/blog/free-vs-starter-quand-upgrader`,
      "x-default": `${BASE}/blog/free-vs-starter-quand-upgrader`,
    },
  },
  openGraph: {
    title: "FREE vs STARTER: When Should You Upgrade?",
    description:
      "The 5 concrete signs it's time to upgrade : and what you actually gain with the Starter plan : by the BeassistLink team",
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
      headline: "FREE vs STARTER: When Should You Upgrade?",
      description:
        "The 5 concrete signs it's time to upgrade : and what you actually gain with the BeassistLink Starter plan.",
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
          name: "Is the BeassistLink FREE plan really free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes: it costs $0 and stays that way. It includes 1 bio page, 5 links on the page, 3 short links and 1 basic theme : no stats and no QR codes. You can create your page without paying and use it as long as you want.",
          },
        },
        {
          "@type": "Question",
          name: "What is included in the STARTER plan stats?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Click stats: number of visits, countries, devices and traffic sources. They tell you which link converts, what your audience actually cares about and what to optimize on your page.",
          },
        },
        {
          "@type": "Question",
          name: "Which plan includes QR codes?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "QR codes are available starting with the STARTER plan: one QR code per link, with your choice of color and size, exported as high-definition PNG or SVG. The PRO plan makes them unlimited.",
          },
        },
      ],
    },
  ],
};

export default function BlogFreeVsStarterUpgrade() {
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
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700">Tips</span>
              <span className="text-xs text-gray-400">March 22, 2026 · 3 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight tracking-tight">
              FREE vs STARTER: When Should You Upgrade?
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              The 5 concrete signs it's time to upgrade : and what you actually gain with the{" "}
              <strong>Starter plan</strong>.
            </p>
          </div>
        </header>

        {/* ── Article body ── */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-12">

          {/* Intro */}
          <div className="prose prose-gray max-w-none text-[15px] leading-relaxed">
            <p>
              BeassistLink's free plan is generous: one bio page, five links, three short links : enough to launch
              your project without entering a credit card.{" "}
              <Link href="/en" className="text-[#8F00FF] hover:underline">One tool</Link>{" "}
              brings together your links, short links, QR codes and analytics. But there comes a moment when the FREE
              plan holds you back instead of pushing you forward.
            </p>
            <p>
              It's not a question of budget, but of needs: creators who move to the STARTER plan almost always do it
              for the same handful of reasons. Here are the 5 signs it's time to upgrade : and what you actually gain
              with the Starter plan.
            </p>
          </div>

          {/* Plans */}
          <section className="rounded-2xl border border-[#8F00FF]/20 bg-[#F9F5FF] p-6 sm:p-8">
            <h2 className="text-xl font-black text-gray-900 mb-4">What each plan includes</h2>
            <div className="space-y-4">
              <div className="rounded-xl bg-white border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900 text-[15px] mb-2">FREE : $0</h3>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  <li>• 1 bio page and 5 links on the page</li>
                  <li>• 3 short links and 1 basic theme</li>
                  <li>• No stats and no QR codes</li>
                </ul>
              </div>
              <div className="rounded-xl bg-white border border-[#8F00FF]/30 p-4">
                <h3 className="font-bold text-gray-900 text-[15px] mb-2">STARTER : $7/month or $76/year</h3>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  <li>• 3 bio pages and 20 links on the page</li>
                  <li>• 20 short links and 5 premium themes</li>
                  <li>• Click stats, QR codes and a custom link</li>
                </ul>
              </div>
              <div className="rounded-xl bg-white border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900 text-[15px] mb-2">PRO : $13/month or $140/year</h3>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  <li>• Everything unlimited, advanced stats and unlimited QR codes</li>
                  <li>• Scheduled links, custom domain and priority support</li>
                </ul>
              </div>
              <p className="text-sm text-gray-700">
                The full breakdown of every plan is on the{" "}
                <Link href="/en/pricing" className="text-[#8F00FF] font-semibold hover:underline">pricing page</Link>.
              </p>
            </div>
          </section>

          {/* 5 signs */}
          <section className="space-y-8">
            <h2 className="text-2xl font-black text-gray-900">The 5 signs it's time to upgrade</h2>
            {[
              {
                n: 1,
                title: "You need more than 5 links",
                body: "Your page is full and every new link forces a painful tradeoff: the store, the podcast, the contact form, this month's event. With Starter you get 20 links on the page.",
              },
              {
                n: 2,
                title: "You want to track your clicks",
                body: "Without stats you're publishing blind: you don't know which link converts or where your visitors come from. Starter unlocks click stats : visits, countries, devices, traffic sources : so you know what works and can fix the rest.",
                link: { href: "/en/blog/optimize-bio-convert", label: "Then apply our 7 levers to optimize your bio" },
              },
              {
                n: 3,
                title: "You want a QR code",
                body: "Flyers, business cards, posters: the QR code is still the shortest bridge between paper and your page. Available starting with Starter, with the color and size you choose, and a high-definition PNG or SVG export for print.",
                link: { href: "/en/blog/qr-code-printing-tips", label: "Check our QR code printing best practices" },
              },
              {
                n: 4,
                title: "You want 3 bio pages or premium themes",
                body: "One page per project: your music, your coaching, your store. Starter gives you 3 bio pages and 5 premium themes so each page actually looks like what you do : without starting from a blank page every time.",
              },
              {
                n: 5,
                title: "Your link in bio becomes a real acquisition channel",
                body: "When your bio brings you customers, sales or signups, $7 a month pays for itself fast: one customer won thanks to your stats can cover the whole year. That's the most reliable sign: you're no longer upgrading 'to try it', you're investing in a channel that pays you back.",
              },
            ].map(({ n, title, body, link }) => (
              <div key={n} className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-yellow-100 text-yellow-700 font-black text-sm flex items-center justify-center">
                  {n}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed">
                    {body}
                    {link && (
                      <>
                        {" "}
                        <Link href={link.href} className="text-[#8F00FF] font-semibold hover:underline">
                          {link.label}
                        </Link>
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </section>

          {/* What you gain */}
          <section className="space-y-5">
            <h2 className="text-2xl font-black text-gray-900">What you actually gain</h2>
            <div className="space-y-4">
              {[
                {
                  t: "Click stats",
                  b: "You finally know which link converts. That's the difference between a decorative bio and a bio that works: keep what performs, rewrite what doesn't.",
                },
                {
                  t: "QR codes",
                  b: "One QR code per link, in color, exported as high-definition PNG or SVG. Enough to put your link on every printed surface, from flyers to packaging.",
                },
                {
                  t: "Premium themes and 3 pages",
                  b: "A page in your image, and one page per project. Your audience finds your visual world at every click, and you separate your activities without creating multiple accounts.",
                },
                {
                  t: "A custom link",
                  b: "A short URL with your name, more professional to share in a story, a caption or on print : and easier for your audience to remember.",
                },
              ].map(({ t, b }) => (
                <div key={t} className="rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold text-gray-900 text-[15px] mb-2">{t}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Price */}
          <section className="rounded-2xl border border-[#8F00FF]/20 bg-[#F9F5FF] p-6 sm:p-8">
            <h2 className="text-xl font-black text-gray-900 mb-4">The price, plainly</h2>
            <p className="text-[15px] text-gray-700 leading-relaxed mb-3">
              The STARTER plan costs <strong>$7/month</strong>, or <strong>$76/year</strong> : about $6.33 a month on
              annual billing. That's roughly one coffee a week to turn your bio into a working tool.
            </p>
            <p className="text-[15px] text-gray-700 leading-relaxed">
              Compare the three plans on the{" "}
              <Link href="/en/pricing" className="text-[#8F00FF] font-semibold hover:underline">pricing page</Link>{" "}
              before you choose: the right plan is the one that covers today's needs, not someone else's.
            </p>
          </section>

          {/* When not to upgrade */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-gray-900">When not to upgrade</h2>
            <div className="space-y-4">
              {[
                {
                  t: "You're just starting and still testing the tool",
                  b: "Stay on FREE while you get your bearings: create your page, publish your first links, watch how your audience reacts. The free plan has no expiration date.",
                },
                {
                  t: "You use fewer than 5 links and no print materials",
                  b: "If your page fits in 5 links, stats wouldn't help you yet and you're not printing anything, the free plan is plenty. Upgrading isn't a required step: it's a response to a need.",
                },
                {
                  t: "You would upgrade 'just in case'",
                  b: "Don't upgrade out of principle : upgrade when a concrete need appears. The best time to move to Starter is when the FREE plan is costing you time or clicks.",
                },
              ].map(({ t, b }) => (
                <div key={t} className="rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold text-gray-900 text-[15px] mb-2">{t}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{b}</p>
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
                  q: "Is the BeassistLink FREE plan really free?",
                  a: "Yes: $0, and it stays that way. It includes 1 bio page, 5 links on the page, 3 short links and 1 basic theme : no stats and no QR codes. You can create your page without paying.",
                },
                {
                  q: "What is included in the STARTER plan stats?",
                  a: "Click stats: number of visits, countries, devices and traffic sources. Enough to know which link converts and to optimize your page every week.",
                },
                {
                  q: "Which plan includes QR codes?",
                  a: "The STARTER plan, with one QR code per link. You choose the color and size, and you export as high-definition PNG or SVG. The PRO plan makes them unlimited.",
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
            <h2 className="text-2xl font-black mb-2">Upgrade at the right time, not out of habit</h2>
            <p className="text-purple-100 mb-6 leading-relaxed max-w-md mx-auto">
              Create your free page in 30 seconds, see what you actually use, and move to Starter when you need it.
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
          <nav aria-label="Read next" className="border-t border-gray-100 pt-8">
            <p className="text-sm font-semibold text-gray-500 mb-3">Read next</p>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/en/blog/optimize-bio-convert" className="text-[#8F00FF] hover:underline">
                → How to Optimize Your Bio to Convert in 2026
              </Link>
              <Link href="/en/blog/qr-code-printing-tips" className="text-[#8F00FF] hover:underline">
                → QR Codes: Best Practices for Printing
              </Link>
              <Link href="/fr/comparatif-linktree" className="text-[#8F00FF] hover:underline">
                → Linktree Comparison 2026 : which alternative should you choose?
              </Link>
            </div>
          </nav>
        </article>

        <Footer />
      </main>
    </>
  );
}
