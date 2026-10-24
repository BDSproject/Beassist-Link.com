import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ArrowRight } from "lucide-react";

const BASE = "https://www.beassist-link.com";
const SLUG = "qr-code-printing-tips";
const PUBLISHED = "2026-03-28";

export const metadata: Metadata = {
  title: "QR Codes: Best Practices for Printing",
  description:
    "Size, contrast, error correction, testing on different backgrounds: the practical guide to QR codes that scan every time.",
  keywords: [
    "qr code printing",
    "qr code best practices",
    "qr code print size",
    "qr code flyer",
    "qr code png svg",
    "create a qr code",
    "qr code link in bio",
  ],
  alternates: {
    canonical: `${BASE}/en/blog/${SLUG}`,
    languages: {
      "en": `${BASE}/en/blog/${SLUG}`,
      "fr": `${BASE}/blog/qr-codes-bonnes-pratiques`,
      "x-default": `${BASE}/blog/qr-codes-bonnes-pratiques`,
    },
  },
  openGraph: {
    title: "QR Codes: Best Practices for Printing",
    description:
      "Size, contrast, error correction, testing: the practical guide to QR codes that scan every time : by the BeassistLink team",
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
      headline: "QR Codes: Best Practices for Printing",
      description:
        "Size, contrast, error correction, testing on different backgrounds: the practical guide to QR codes that scan every time.",
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
          name: "What is the minimum size for a printed QR code?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Allow at least 0.8 x 0.8 inches (2 x 2 cm) on a handheld item, and more on large formats: a good rule of thumb is about one-tenth of the reading distance. A QR code scanned from 5 feet should measure around 6 inches.",
          },
        },
        {
          "@type": "Question",
          name: "Do colored QR codes work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, as long as you keep high contrast between the code and the background: a dark code on a light background is the most reliable. Avoid inverted colors and tones that are too close, and test on several phones before printing. With BeassistLink you choose the color at generation.",
          },
        },
        {
          "@type": "Question",
          name: "PNG or SVG for printing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "SVG is the ideal format for print: as a vector, it stays sharp at any size. For web or small prints, a high-definition PNG of at least 1000 pixels is fine. Never enlarge a small PNG: regenerate the code at the final size.",
          },
        },
      ],
    },
  ],
};

export default function BlogQrCodePrintingTips() {
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
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700">Tutorial</span>
              <span className="text-xs text-gray-400">March 28, 2026 · 4 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight tracking-tight">
              QR Codes: Best Practices for Printing
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Size, contrast, error correction, testing: the practical guide to QR codes that scan{" "}
              <strong>every time</strong>.
            </p>
          </div>
        </header>

        {/* ── Article body ── */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-12">

          {/* Intro */}
          <div className="prose prose-gray max-w-none text-[15px] leading-relaxed">
            <p>
              A QR code gives you about three seconds to convince someone to pull out their phone : assuming it scans
              at all. On screen, a blurry or undersized QR code rarely forgives you. On paper, a mistake costs real
              money: a flyer, poster or business card already printed can't be fixed.
            </p>
            <p>
              The good news: QR codes aren't a lottery. Follow a handful of simple rules and the odds tilt your way.
              Here are the best practices to apply <strong>before every print run</strong>, and the method to generate
              a print-ready QR code with BeassistLink.
            </p>
          </div>

          {/* Best practices */}
          <section className="space-y-8">
            <h2 className="text-2xl font-black text-gray-900">The 8 golden rules of a QR code that scans</h2>
            {[
              {
                n: 1,
                title: "A minimum size of 0.8 x 0.8 inches",
                body: "On a handheld item, never go below 0.8 x 0.8 inches (2 x 2 cm). On large formats, size the code to the reading distance: about one-tenth of the scan distance. A QR code on a poster viewed from 5 feet should measure roughly 6 inches.",
              },
              {
                n: 2,
                title: "Maximum contrast",
                body: "A QR code should be dark on a light background : black on white remains the most reliable. Avoid inversions (a light code on a dark background) and colors that are too close: if the contrast is weak, the camera struggles to separate the modules.",
              },
              {
                n: 3,
                title: "The quiet zone",
                body: "Leave a white border all around the code: this 'quiet zone' lets the scanner identify the code's edges. Keep at least four modules of margin, or about 0.2 inches for a 1.2-inch code. Never place text or graphics right against the code.",
              },
              {
                n: 4,
                title: "A solid background, not a photo",
                body: "A QR code on a photo or busy pattern becomes unreadable: the modules blend into the artwork. Choose a solid background, or frame the code in a white box if the design requires it.",
              },
              {
                n: 5,
                title: "Test on several phones",
                body: "Test before you print, on both an iPhone and an Android, in real lighting conditions: outdoors in full sun, indoors in dim light, a dirty screen. If even one device fails, enlarge the code or boost the contrast : far easier before printing than after.",
              },
              {
                n: 6,
                title: "Never resize blindly",
                body: "A 200 x 200 pixel PNG stretched to 4 inches will be blurry, and a blurry QR code doesn't scan. Always regenerate the code at its final size instead of scaling a small image: you keep sharp edges, module by module.",
              },
              {
                n: 7,
                title: "Export as high-definition PNG or SVG",
                body: "For print, export as high-definition PNG (at least 1000 x 1000 pixels) or, better, as SVG: the vector format stays perfectly sharp at any size, from a business card to a billboard.",
              },
              {
                n: 8,
                title: "Put the code within reach",
                body: "On a flyer, avoid the folded corner or the bottom edge near the trim. On a poster, place the code between 3 and 5 feet off the ground. Scanning should stay comfortable : nobody crouches down to scan a QR code.",
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-orange-100 text-orange-700 font-black text-sm flex items-center justify-center">
                  {n}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Generate with BeassistLink */}
          <section className="rounded-2xl border border-[#8F00FF]/20 bg-[#F9F5FF] p-6 sm:p-8">
            <h2 className="text-xl font-black text-gray-900 mb-4">Generate a print-ready QR code with BeassistLink</h2>
            <div className="space-y-3 text-[15px] text-gray-700">
              <p>
                On BeassistLink, every link has its own QR code. From your dashboard, open the link, click the QR code
                tab, then choose the <strong>color and size</strong>. You can generate a code in your brand colors :
                as long as you keep enough contrast : then export it as <strong>high-definition PNG</strong> for the
                web or <strong>SVG</strong> for print.
              </p>
              <p>
                QR codes are available starting with the STARTER plan ($7/month or $76/year). Compare the three plans
                on the <Link href="/en/pricing" className="text-[#8F00FF] font-semibold hover:underline">pricing page</Link>,
                and read <Link href="/en/blog/free-vs-starter-upgrade" className="text-[#8F00FF] font-semibold hover:underline">our FREE vs STARTER guide</Link> to
                know when to upgrade.
              </p>
              <p>
                One reminder: <strong>one QR code = one link</strong>. To point people to your full bio page, generate
                the QR code of your BeassistLink link rather than multiplying codes across different pages. Your
                links, QR codes and analytics all live in one tool :{" "}
                <Link href="/en" className="text-[#8F00FF] font-semibold hover:underline">learn more about BeassistLink</Link>.
              </p>
            </div>
          </section>

          {/* Use cases */}
          <section className="space-y-5">
            <h2 className="text-2xl font-black text-gray-900">Flyer, business card, poster, packaging: 4 use cases</h2>
            <div className="space-y-4">
              {[
                {
                  t: "On a flyer",
                  b: "The QR code points to your link page or a short link dedicated to the event. Place it in a white box, at least 1 inch, away from the fold and the trim.",
                },
                {
                  t: "On a business card",
                  b: "Space is tight: 0.8 inches minimum, on a dedicated side, with your URL written out next to it. The code points to your BeassistLink bio page, which gathers all your links.",
                },
                {
                  t: "On a poster",
                  b: "Large format means long reading distance: enlarge the code accordingly and export as SVG to keep it sharp. Aim for a code measuring about one-tenth of the distance at which passersby will see it.",
                },
                {
                  t: "On packaging",
                  b: "The code must stay flat while scanning: place it on a flat face of the package, never on an angle or a curved surface. On a box, choose a wide face and strong contrast.",
                },
              ].map(({ t, b }) => (
                <div key={t} className="rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold text-gray-900 text-[15px] mb-2">{t}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Checklist */}
          <section className="rounded-2xl border border-[#8F00FF]/20 bg-[#F9F5FF] p-6 sm:p-8">
            <h2 className="text-xl font-black text-gray-900 mb-4">The checklist before you send to the printer</h2>
            <ul className="space-y-3 text-[15px] text-gray-700">
              {[
                "My QR code is at least 0.8 x 0.8 inches (more on large formats)",
                "Contrast is strong: a dark code on a light background",
                "The quiet zone is respected all around the code",
                "The code isn't on a photo or a busy pattern",
                "I tested on iPhone and Android, outdoors and indoors",
                "I exported as high-definition PNG or SVG",
                "The QR code sits at a comfortable scanning height",
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
                  q: "What is the minimum size for a printed QR code?",
                  a: "Allow at least 0.8 x 0.8 inches on a handheld item, and more on large formats: a good rule of thumb is about one-tenth of the reading distance. A QR code scanned from 5 feet should measure around 6 inches.",
                },
                {
                  q: "Do colored QR codes work?",
                  a: "Yes, as long as you keep high contrast between the code and the background: a dark code on a light background is the most reliable. Avoid inverted colors and tones that are too close, and test on several phones before printing.",
                },
                {
                  q: "PNG or SVG for printing?",
                  a: "SVG is ideal for print: as a vector, it stays sharp at any size. For web, a high-definition PNG of at least 1000 pixels is fine. Never enlarge a small PNG: regenerate the code at the final size.",
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
            <h2 className="text-2xl font-black mb-2">Print QR codes that scan every time</h2>
            <p className="text-purple-100 mb-6 leading-relaxed max-w-md mx-auto">
              Create your BeassistLink page in 30 seconds, then generate color QR codes starting with the Starter
              plan.
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
