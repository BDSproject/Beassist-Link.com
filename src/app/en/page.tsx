import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Pricing } from "@/components/landing/pricing";
import { CtaSection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

const BASE = "https://www.beassist-link.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${BASE}/en/#website`,
      url: `${BASE}/en`,
      name: "BeassistLink",
      description:
        "Link in bio, short links, QR codes and analytics for creators and small businesses — all in one simple tool.",
      inLanguage: "en-US",
    },
    {
      "@type": "Organization",
      "@id": `${BASE}/en/#organization`,
      name: "BeassistLink",
      url: `${BASE}/en`,
      logo: {
        "@type": "ImageObject",
        url: `${BASE}/icon.svg`,
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is BeassistLink?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "BeassistLink is an all-in-one tool for creators: a link in bio page, short links, QR codes and click analytics, in one simple dashboard.",
          },
        },
        {
          "@type": "Question",
          name: "Is BeassistLink free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The FREE plan includes a link in bio page, short links and a basic theme, with no credit card required. Paid plans add stats, QR codes and advanced customization.",
          },
        },
        {
          "@type": "Question",
          name: "How do I put multiple links in my bio?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Create your BeassistLink page, add all your links, then paste your personal URL in your Instagram, TikTok or YouTube bio. Your followers will find everything in one click.",
          },
        },
      ],
    },
  ],
};

export default function EnHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="overflow-hidden">
        <Navbar />
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <CtaSection />
        <Footer />
      </main>
    </>
  );
}
