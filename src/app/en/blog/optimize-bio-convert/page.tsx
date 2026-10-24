import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ArrowRight } from "lucide-react";

const BASE = "https://www.beassist-link.com";
const SLUG = "optimize-bio-convert";
const PUBLISHED = "2026-04-01";

export const metadata: Metadata = {
  title: "How to Optimize Your Bio to Convert in 2026",
  description:
    "Link order, benefit-driven labels, visual consistency, social proof: 7 simple levers to turn your link in bio visitors into customers in 2026.",
  keywords: [
    "optimize instagram bio",
    "link in bio conversion",
    "instagram bio 2026",
    "convert link in bio",
    "link in bio strategy",
    "increase link clicks",
    "link page conversion",
  ],
  alternates: {
    canonical: `${BASE}/en/blog/${SLUG}`,
    languages: {
      "en": `${BASE}/en/blog/${SLUG}`,
      "fr": `${BASE}/blog/optimiser-bio-convertir-2026`,
      "x-default": `${BASE}/blog/optimiser-bio-convertir-2026`,
    },
  },
  openGraph: {
    title: "How to Optimize Your Bio to Convert in 2026",
    description:
      "7 simple levers to turn your visitors into customers : by the BeassistLink team",
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
      headline: "How to Optimize Your Bio to Convert in 2026",
      description:
        "Link order, benefit-driven labels, visual consistency, social proof: the 7 levers that turn link in bio visitors into customers.",
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
          name: "How long does it take to optimize a link in bio?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Less than 30 minutes to apply the 7 levers: reordering links, rewriting labels and adding social proof each take a few minutes. The longest part is building the habit of a weekly update.",
          },
        },
        {
          "@type": "Question",
          name: "Do I have to pay to optimize my link page?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Link order, labels, visual consistency and social proof don't require any paid tool. Click stats and QR codes come with the STARTER plan of BeassistLink ($7/month or $76/year) if you want to go further.",
          },
        },
        {
          "@type": "Question",
          name: "How often should I check my stats?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Once a week, ideally on the same day each time. A five-minute review is enough: spot the link that performs, the one that's flat, and adjust the order or the labels accordingly.",
          },
        },
      ],
    },
  ],
};

export default function BlogOptimizeBioConvert() {
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
              <span className="text-xs text-gray-400">April 1, 2026 · 4 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight tracking-tight">
              How to Optimize Your Bio to Convert in 2026
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              7 simple levers to turn visitors into customers : best practices from creators who treat their bio{" "}
              <strong>seriously</strong>.
            </p>
          </div>
        </header>

        {/* ── Article body ── */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-12">

          {/* Intro */}
          <div className="prose prose-gray max-w-none text-[15px] leading-relaxed">
            <p>
              Your link in bio gets traffic every day. The real question isn't how to attract visitors : it's how to{" "}
              <strong>turn them into customers, subscribers or readers</strong>. In 2026, the competition is tougher
              than ever, and the difference comes down to the details.
            </p>
            <p>
              Here are 7 simple, concrete levers, shared by creators who treat their link page seriously : with an
              example you can apply for each one.
            </p>
          </div>

          {/* Levers */}
          <section className="space-y-8">
            {[
              {
                n: 1,
                title: "Put your most important link first",
                body: "The first link on your page always gets the most clicks. If you place a secondary link at the top, you're wasting your best position : and your visitor leaves before seeing what matters.",
                example: "Launching your store this week? Put that link right at the top, above your social profiles. The essentials should be visible without scrolling.",
              },
              {
                n: 2,
                title: "Write labels that make people want to click",
                body: "Labels like 'My site' or 'My links' say nothing. A good label has a verb and a benefit: it answers 'why click?' before anyone even asks.",
                example: "Swap 'Shop' for 'Shop my new collection : 20% off'. The click becomes obvious, not a guessing game.",
              },
              {
                n: 3,
                title: "Stay consistent with the rest of your profile",
                body: "Your link page extends your Instagram or TikTok profile: same colors, same photo, same tone. Visitors who recognize your world trust you : and trust comes before the click.",
                example: "Your feed uses pastels? Pick a theme with matching colors and reuse your profile photo. Moving from your profile to your page should feel seamless.",
              },
              {
                n: 4,
                title: "Add social proof",
                body: "A number, a review, a line like 'they trusted me' clears the last doubt. Social proof turns a hesitant visitor into a decided customer.",
                example: "Under your coaching link, add '+120 students coached this year'. One line is enough to reassure people.",
              },
              {
                n: 5,
                title: "Update your page every week",
                body: "A living page converts better than a frozen one. Every launch, promo or new piece of content should show up on your page : what matters now, not what mattered last month.",
                example: "Every Sunday, feature your latest content and remove expired promos. With the PRO plan of BeassistLink, you can schedule these changes in advance.",
              },
              {
                n: 6,
                title: "Test different positions for your links",
                body: "Nobody gets the right combination on the first try. Moving a link can double its clicks: optimization is a game of experiments, not fixed recipes.",
                example: "This week, put your YouTube link second; next week, put it fourth. Compare the clicks and keep what performs.",
              },
              {
                n: 7,
                title: "Use your click stats",
                body: "Stats tell you what actually works: which link attracts clicks, where your visitors come from, what devices they use. That's your roadmap for improving week after week.",
                example: "If 85% of your traffic is mobile and one link overperforms with a specific audience, adjust your labels and order accordingly. Without data you're guessing; with it, you decide.",
              },
            ].map(({ n, title, body, example }) => (
              <div key={n} className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#F9F5FF] text-[#8F00FF] font-black text-sm flex items-center justify-center">
                  {n}
                </div>
                <div className="flex-1">
                  <h2 className="font-bold text-gray-900 text-lg mb-2">{title}</h2>
                  <p className="text-[15px] text-gray-600 leading-relaxed mb-2">{body}</p>
                  <div className="rounded-xl bg-green-50 border border-green-100 p-4">
                    <p className="text-[15px] text-gray-700 leading-relaxed">
                      <strong className="text-green-700">The example: </strong>
                      {example}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Tools */}
          <section className="rounded-2xl border border-[#8F00FF]/20 bg-[#F9F5FF] p-6 sm:p-8">
            <h2 className="text-xl font-black text-gray-900 mb-4">What tools do you need?</h2>
            <p className="text-[15px] text-gray-700 leading-relaxed">
              Most of these levers don't require a paid tool. When you're ready to go further, click stats and QR
              codes come with the STARTER plan of BeassistLink ($7/month or $76/year), and full customization with
              the PRO plan ($13/month or $140/year). See the full breakdown on the{" "}
              <Link href="/en/pricing" className="text-[#8F00FF] hover:underline">
                pricing page
              </Link>
              , and note the free plan already includes a bio page with 5 links : no credit card required.
            </p>
            <p className="text-[15px] text-gray-700 leading-relaxed mt-3">
              Your links, short links, QR codes and analytics live in one tool :{" "}
              <Link href="/en" className="text-[#8F00FF] hover:underline">
                learn more about BeassistLink
              </Link>
              .
            </p>
          </section>

          {/* Checklist */}
          <section className="rounded-2xl border border-[#8F00FF]/20 bg-[#F9F5FF] p-6 sm:p-8">
            <h2 className="text-xl font-black text-gray-900 mb-4">The checklist of a bio that converts</h2>
            <ul className="space-y-3 text-[15px] text-gray-700">
              {[
                "My most important link is in first position",
                "Every label has a verb and a benefit",
                "My page uses my colors and profile photo",
                "I added at least one social proof",
                "My links are current this week",
                "I tested at least two link orders this month",
                "I checked my stats this week",
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
                  q: "How long does it take to optimize a link in bio?",
                  a: "Less than 30 minutes to apply the 7 levers: reordering links, rewriting labels and adding social proof each take a few minutes. The longest part is building the habit of a weekly update.",
                },
                {
                  q: "Do I have to pay to optimize my link page?",
                  a: "No. Link order, labels, visual consistency and social proof don't require any paid tool. Click stats and QR codes come with the STARTER plan of BeassistLink ($7/month or $76/year) if you want to go further.",
                },
                {
                  q: "How often should I check my stats?",
                  a: "Once a week, ideally on the same day each time. A five-minute review is enough: spot the link that performs, the one that's flat, and adjust the order or the labels accordingly.",
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
            <h2 className="text-2xl font-black mb-2">Turn your visitors into customers</h2>
            <p className="text-purple-100 mb-6 leading-relaxed max-w-md mx-auto">
              Create your BeassistLink page in 30 seconds and apply the 7 levers today. Free to start, no credit card
              required.
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
              <Link href="/en/blog/qr-code-printing-tips" className="text-[#8F00FF] hover:underline">
                → QR Codes: Best Practices for Printing
              </Link>
              <Link href="/en/blog/free-vs-starter-upgrade" className="text-[#8F00FF] hover:underline">
                → FREE vs STARTER: When Should You Upgrade?
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
