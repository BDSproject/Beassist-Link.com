import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ArrowRight } from "lucide-react";

const BASE = "https://www.beassist-link.com";
const SLUG = "privacy-first-link-in-bio";
const PUBLISHED = "2026-04-05";

export const metadata: Metadata = {
  title: "Why Privacy Matters for Your Link in Bio",
  description:
    "European hosting, GDPR by default and no third-party tracking cookies: why privacy is becoming a deciding factor when you choose a link-in-bio tool.",
  keywords: [
    "privacy link in bio",
    "gdpr link in bio",
    "link in bio no cookies",
    "european hosting link in bio",
    "privacy first link in bio",
    "link in bio data protection",
    "beassistlink privacy",
  ],
  alternates: {
    canonical: `${BASE}/en/blog/${SLUG}`,
    languages: {
      "en": `${BASE}/en/blog/${SLUG}`,
      "fr": `${BASE}/blog/pourquoi-choisir-solution-francaise`,
      "x-default": `${BASE}/blog/pourquoi-choisir-solution-francaise`,
    },
  },
  openGraph: {
    title: "Why Privacy Matters for Your Link in Bio",
    description:
      "European hosting, GDPR by default, no third-party tracking cookies: what most US link-in-bio tools can't offer — by the BeassistLink team.",
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
      headline: "Why Privacy Matters for Your Link in Bio",
      description:
        "European hosting, GDPR by default and no third-party tracking cookies: why privacy is becoming a deciding factor when you choose a link-in-bio tool.",
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
          name: "Are my visitors' data really hosted in Europe?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. BeassistLink is hosted in Europe and built with GDPR as the default, so your data and your visitors' data stay under strong European data-protection rules — no transfer to servers outside Europe.",
          },
        },
        {
          "@type": "Question",
          name: "What does no third-party cookies actually mean?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It means BeassistLink doesn't drop tracking cookies from ad networks or analytics vendors onto your page. Your visitors aren't followed around the web after they leave your bio.",
          },
        },
        {
          "@type": "Question",
          name: "How much does a privacy-first link in bio cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The FREE plan includes one bio page and 5 links with no credit card. STARTER is $7/month (or $76/year), and PRO is $13/month (or $140/year) with everything unlimited. All prices are listed in USD on the pricing page.",
          },
        },
      ],
    },
  ],
};

export default function BlogPrivacyFirstLinkInBio() {
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
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">Privacy</span>
              <span className="text-xs text-gray-400">April 5, 2026 · 5 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight tracking-tight">
              Why Privacy Matters for Your Link in Bio
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              European hosting, GDPR by default, no third-party tracking cookies…{" "}
              <strong>what most US tools can't offer</strong>.
            </p>
          </div>
        </header>

        {/* ── Article body ── */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-12">

          {/* Intro */}
          <div className="prose prose-gray max-w-none text-[15px] leading-relaxed">
            <p>
              Your link in bio is the crossroads of your entire online presence. Every tap passes through it — and
              every tap carries data: yours, and your visitors'. So the question isn't just "which tool?" but{" "}
              <strong>"who am I trusting with that data?"</strong>
            </p>
            <p>
              Most of the popular tools are American, and they bring assumptions that don't always match what your
              audience now expects.{" "}
              <Link href="/en" className="text-[#8F00FF] font-medium hover:underline">BeassistLink</Link>{" "}
              takes a different route: European hosting, GDPR by default and no third-party tracking cookies. Here's
              why that matters in practice — for any creator, anywhere.
            </p>
          </div>

          {/* Data gateway */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">Your bio page is a data gateway</h2>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              Every time someone opens your link page, a chain of requests fires: the page itself, images, fonts and
              — on many tools — third-party trackers that log where the visitor came from and what they click. Those
              trackers aren't yours; they belong to the platform and its ad partners. You don't see them, but your
              visitors' browsers do. BeassistLink doesn't inject third-party tracking cookies on your page. What your
              audience visits stays between you and them.
            </p>
          </section>

          {/* European hosting */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">European hosting, GDPR by default</h2>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              GDPR is the strictest data-protection law in the world, and it sets the bar for how personal data
              should be handled. BeassistLink is hosted in Europe and built with GDPR as the starting point — not as
              an afterthought bolted on to satisfy a compliance checklist. For your visitors, that means their data
              is handled under strong protections; for you, it means a cleaner answer when someone asks "where does
              my data go?"
            </p>
          </section>

          {/* Trust signal */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">No third-party cookies: why that's a trust signal</h2>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              In 2026, US consumers are more privacy-literate than ever. Browsers block third-party cookies by
              default, and state laws are tightening. A link page that quietly drops trackers can feel like a small
              betrayal; a page that doesn't feels like respect. When you point your bio to BeassistLink, you're
              telling your audience their attention isn't being resold. That's a real competitive edge for creators
              who build trust as their brand.
            </p>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">Privacy without giving up features</h2>
            <p className="text-[15px] text-gray-600 leading-relaxed mb-3">
              Choosing privacy shouldn't mean choosing a bare-bones tool. BeassistLink is a full toolkit: a link in
              bio, short links, QR codes and analytics in one place. The FREE plan costs $0 and includes one bio
              page, 5 links, 3 short links and a theme. STARTER is $7/month (or $76/year), and PRO is $13/month (or
              $140/year) with everything unlimited — advanced stats, unlimited QR codes, scheduled links, a custom
              domain and priority support. Full details on the{" "}
              <Link href="/en/pricing" className="text-[#8F00FF] font-medium hover:underline">pricing page</Link>.
            </p>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              If you're still weighing your options, our{" "}
              <Link href="/en/blog/beassistlink-vs-linktree" className="text-[#8F00FF] font-medium hover:underline">
                BeassistLink vs Linktree comparison
              </Link>{" "}
              puts the privacy angle side by side with pricing and features.
            </p>
          </section>

          {/* Conclusion */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">Trust is the conversion you can't measure</h2>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              A flashy page gets the click; a trustworthy one gets the follow, the sale and the repeat visit. Privacy
              isn't a niche feature — it's becoming the default expectation. With BeassistLink, you get a page that
              converts and a hosting choice you can stand behind.
            </p>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-5">Frequently asked questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Are my visitors' data really hosted in Europe?",
                  a: "Yes. BeassistLink is hosted in Europe and built with GDPR as the default, so your data and your visitors' data stay under strong European data-protection rules — no transfer to servers outside Europe.",
                },
                {
                  q: "What does no third-party cookies actually mean?",
                  a: "It means BeassistLink doesn't drop tracking cookies from ad networks or analytics vendors onto your page. Your visitors aren't followed around the web after they leave your bio.",
                },
                {
                  q: "How much does a privacy-first link in bio cost?",
                  a: "The FREE plan includes one bio page and 5 links with no credit card. STARTER is $7/month (or $76/year), and PRO is $13/month (or $140/year) with everything unlimited.",
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
            <h2 className="text-2xl font-black mb-2">Build a bio page you can stand behind</h2>
            <p className="text-purple-100 mb-6 leading-relaxed max-w-md mx-auto">
              Create your BeassistLink page in 30 seconds: European hosting, GDPR by default, no third-party
              cookies. Free to start, no credit card required.
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
              <Link href="/en/blog/beassistlink-vs-linktree" className="text-[#8F00FF] hover:underline">
                → BeassistLink vs Linktree in 2026: The Full Comparison
              </Link>
              <Link href="/en/blog/link-in-bio-alternatives" className="text-[#8F00FF] hover:underline">
                → Linktree, Beacons, Milkshake, Stan Store… Which One?
              </Link>
              <Link href="/en/blog/multiple-links-instagram-bio" className="text-[#8F00FF] hover:underline">
                → How to Add Multiple Links to Your Instagram Bio (Free)
              </Link>
              <Link href="/fr/comparatif-linktree" className="text-[#8F00FF] hover:underline">
                → Linktree 2026 comparison — which alternative to choose?
              </Link>
            </div>
          </nav>
        </article>

        <Footer />
      </main>
    </>
  );
}
