"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { MarketingLayout } from "@/components/landing/marketing-layout";
import { Video, Gift, CheckCircle2, Star, Send, Loader2 } from "lucide-react";

const platforms = [
  { name: "YouTube", emoji: "🎥" },
  { name: "TikTok", emoji: "🎵" },
  { name: "Instagram", emoji: "📸" },
  { name: "Twitch", emoji: "🟣" },
  { name: "Podcast", emoji: "🎙️" },
  { name: "Other / Autre", emoji: "✨" },
];

export default function PartnershipPage() {
  const { lang } = useLanguage();
  const en = lang === "en";

  const [platform, setPlatform] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    handle: "",
    platform: "",
    audience: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/partenariat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      alert(
        en
          ? "An error occurred. Please try again or contact us directly."
          : "Une erreur est survenue. Réessayez ou contactez-nous directement."
      );
    } finally {
      setLoading(false);
    }
  };

  const steps = en
    ? [
        {
          number: "01",
          title: "You apply",
          description:
            "Fill in the form below with your profile, your audience and the platform you are active on.",
        },
        {
          number: "02",
          title: "We validate your profile",
          description:
            "Our team reviews your application within 48 h. Minimum 1,000 followers required on your main platform — after that, engagement and authentic content are what matter.",
        },
        {
          number: "03",
          title: "You create your video",
          description:
            "Present BeassistLink to your audience in your own way: tutorial, honest review, natural integration. You stay 100% free on the format.",
        },
        {
          number: "04",
          title: "Lifetime Pro subscription 🎁",
          description:
            "Once the video is published and validated, you immediately receive your lifetime BeassistLink Pro access — no limits, no hidden conditions.",
        },
      ]
    : [
        {
          number: "01",
          title: "Vous postulez",
          description:
            "Remplissez le formulaire ci-dessous avec votre profil, votre audience et la plateforme sur laquelle vous êtes actif.",
        },
        {
          number: "02",
          title: "On valide votre profil",
          description:
            "Notre équipe examine votre candidature sous 48 h. Minimum 1 000 abonnés requis sur votre plateforme principale — ensuite, c'est l'engagement et l'authenticité du contenu qui comptent.",
        },
        {
          number: "03",
          title: "Vous créez votre vidéo",
          description:
            "Présentez BeassistLink à votre audience à votre façon : tuto, avis honnête, intégration naturelle. Vous restez libre sur le format.",
        },
        {
          number: "04",
          title: "Abonnement Pro à vie 🎁",
          description:
            "Une fois la vidéo publiée et validée, vous recevez immédiatement votre accès Pro BeassistLink à vie — aucune limite, aucune condition.",
        },
      ];

  const requirements = en
    ? [
        "Have at least 1,000 followers on your main platform",
        "Be active on at least one platform (YouTube, TikTok, Instagram, Twitch…)",
        "Publish a video or story/reel presenting BeassistLink to your community",
        "Mention at least one key feature (bio link, analytics, QR code…)",
        "Include a link to beassist-link.com in your description or bio",
        "Content must remain online for at least 12 months",
      ]
    : [
        "Avoir minimum 1 000 abonnés / followers sur votre plateforme principale",
        "Être actif sur au moins une plateforme (YouTube, TikTok, Instagram, Twitch…)",
        "Publier une vidéo ou story/reel présentant BeassistLink à votre communauté",
        "Mentionner au moins une fonctionnalité clé (lien en bio, analytics, QR code…)",
        "Inclure un lien vers beassist-link.com dans ta description ou ta bio",
        "Le contenu doit rester en ligne au moins 12 mois",
      ];

  const included = en
    ? [
        "Unlimited bio links",
        "Unlimited short links",
        "Advanced analytics",
        "Unlimited QR codes",
        "All themes + custom colors",
        "Branding removal",
        "Custom domain",
        "Priority support",
      ]
    : [
        "Liens en bio illimités",
        "Liens raccourcis illimités",
        "Analytics avancées",
        "QR codes illimités",
        "Tous les thèmes + couleurs custom",
        "Suppression du branding",
        "Domaine personnalisé",
        "Support prioritaire",
      ];

  const faq = en
    ? [
        {
          q: "Is there a minimum follower count?",
          a: "Yes. We require a minimum of 1,000 followers on your main platform. This threshold ensures your audience can genuinely discover BeassistLink.",
        },
        {
          q: "Does the content need to be declared as sponsored / advertising?",
          a: 'Yes, in accordance with applicable advertising disclosure laws. Clearly indicate "sponsored content" or "partnership".',
        },
        {
          q: "What happens if I delete the video?",
          a: "We reserve the right to revoke the subscription if the video is deleted before 12 months.",
        },
        {
          q: "Can we collaborate multiple times?",
          a: "This program offers a lifetime Pro subscription. For long-term collaborations (affiliate, ambassador), contact us directly.",
        },
      ]
    : [
        {
          q: "Y a-t-il un minimum d'abonnés ?",
          a: "Oui. Nous demandons un minimum de 1 000 abonnés / followers sur votre plateforme principale. Ce seuil nous assure que votre audience peut réellement découvrir BeassistLink.",
        },
        {
          q: "Le contenu doit-il être sponsorisé / déclaré comme pub ?",
          a: 'Oui, conformément à la loi française sur la publicité digitale (ARPP). Indiquez clairement "contenu sponsorisé" ou "partenariat".',
        },
        {
          q: "Que se passe-t-il si je supprime la vidéo ?",
          a: "Nous nous réservons le droit de résilier l'abonnement si la vidéo est supprimée avant 12 mois.",
        },
        {
          q: "Peut-on collaborer plusieurs fois ?",
          a: "Ce programme offre un abonnement Pro à vie. Pour les collaborations long terme (affiliation, ambassador), contactez-nous directement.",
        },
      ];

  // Métadonnées dynamiques
  const pageTitle = en
    ? "Become a BeassistLink Ambassador 🌍"
    : "Devenez ambassadeur BeassistLink 🇫🇷";
  const pageDescription = en
    ? "Got 1,000+ followers? Present BeassistLink to your community in a video and get lifetime Pro access — free, no hidden conditions."
    : "Vous avez +1 000 abonnés ? Présentez BeassistLink à votre communauté dans une vidéo, et décrochez un accès Pro à vie — offert, sans condition cachée.";
  const canonicalUrl = en
    ? "https://www.beassist-link.com/en/partnership"
    : "https://www.beassist-link.com/partenariat";

  // Données structurées FAQ
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  // Données structurées pour l'offre spéciale (Product / Offer)
  const offerJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "BeassistLink Pro Lifetime",
    description: pageDescription,
    brand: {
      "@type": "Brand",
      name: "BeassistLink",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerJsonLd) }}
      />

      <MarketingLayout
        category={en ? "Partnership" : "Partenariat"}
        title={pageTitle}
        description={pageDescription}
      >
        {/* ── Minimum requirement ── */}
        <section
          aria-label={
            en ? "Minimum requirement" : "Minimum requis"
          }
          className="rounded-2xl border border-amber-300 bg-amber-50 p-4 flex items-start gap-3"
        >
          <span className="text-2xl shrink-0 mt-0.5" aria-hidden="true">
            📊
          </span>
          <div>
            <h2 className="text-sm font-bold text-amber-900">
              {en ? "Minimum requirement: 1,000 followers" : "Minimum requis : 1 000 abonnés"}
            </h2>
            <p className="text-xs text-amber-700 mt-1 leading-relaxed">
              {en
                ? "This program is reserved for creators with at least "
                : "Ce programme est réservé aux créateurs ayant au moins "}
              <strong>{en ? "1,000 followers" : "1 000 abonnés / followers"}</strong>
              {en
                ? " on their main platform (YouTube, TikTok, Instagram, Twitch…). This threshold ensures real visibility for BeassistLink."
                : " sur leur plateforme principale (YouTube, TikTok, Instagram, Twitch…). Ce seuil garantit une vraie visibilité pour BeassistLink."}
            </p>
          </div>
        </section>

        {/* ── Main pitch ── */}
        <section
          aria-label={en ? "Main offer" : "Offre principale"}
          className="rounded-2xl border-2 border-[#8F00FF]/30 bg-gradient-to-br from-[#F9F5FF] to-white p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex-1">
              <h2 className="text-xl font-black text-gray-900 leading-snug">
                {en ? "One video for lifetime Pro" : "Une vidéo contre un Pro à vie"}
              </h2>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                {en
                  ? "We genuinely believe in our product — and we know the best ad is someone who actually uses it. If you love BeassistLink, tell your community about it. In return, we give you full access to all Pro features, "
                  : "On croit sincèrement en notre produit — et on sait que la meilleure pub, c'est quelqu'un qui l'utilise vraiment. Si vous aimez BeassistLink, parlez-en à votre communauté. En échange, on vous offre l'accès complet à toutes les fonctionnalités Pro, "}
                <strong>{en ? "for life" : "à vie"}</strong>
                {en ? ", no additional strings attached." : ", sans contrepartie supplémentaire."}
              </p>
              <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                {en
                  ? "Minimum 1,000 followers required. No imposed script. You stay 100% authentic 🎯"
                  : "Minimum 1 000 abonnés requis. Aucun script imposé. Tu restes 100% authentique 🎯"}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:min-w-[200px]">
              <div className="rounded-xl bg-[#8F00FF]/10 border border-[#8F00FF]/20 p-4 text-center">
                <Video size={24} className="text-[#8F00FF] mx-auto mb-2" aria-hidden="true" />
                <p className="text-sm font-bold text-gray-900">{en ? "1 video" : "1 vidéo"}</p>
                <p className="text-xs text-gray-500 mt-0.5">{en ? "your way" : "à votre façon"}</p>
              </div>
              <div className="flex items-center justify-center text-2xl font-black text-gray-300" aria-hidden="true">
                ⇓
              </div>
              <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-center">
                <Gift size={24} className="text-green-600 mx-auto mb-2" aria-hidden="true" />
                <p className="text-sm font-bold text-gray-900">{en ? "Lifetime Pro" : "Pro à vie"}</p>
                <p className="text-xs text-gray-500 mt-0.5">{en ? "free gift" : "offert"}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── What's included ── */}
        <section
          aria-labelledby="whats-included-title"
          className="rounded-2xl border border-gray-200 p-6"
        >
          <h2
            id="whats-included-title"
            className="font-black text-gray-900 text-lg mb-4"
          >
            {en ? "What you get (full Pro plan)" : "Ce que vous obtenez (plan Pro complet)"}
          </h2>
          <ul className="grid sm:grid-cols-2 gap-2 list-none p-0">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#8F00FF] mt-0.5 shrink-0" aria-hidden="true" />
                <span className="text-sm text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-400 mt-4">
            {en ? "Estimated value: " : "Valeur estimée : "}
            <span className="font-semibold text-gray-600">{en ? "$144/year" : "144 €/an"}</span>
            {en
              ? " — free for life once your video is validated."
              : " — offert à vie dès validation de votre vidéo."}
          </p>
        </section>

        {/* ── How it works ── */}
        <section aria-labelledby="how-it-works-title">
          <h2
            id="how-it-works-title"
            className="font-black text-gray-900 text-lg mb-4"
          >
            {en ? "How it works" : "Comment ça marche ?"}
          </h2>
          <ol className="grid sm:grid-cols-2 gap-4 list-none p-0">
            {steps.map((step) => (
              <li
                key={step.number}
                className="rounded-2xl border border-gray-200 p-5 hover:border-[#8F00FF]/40 transition-colors"
              >
                <span className="text-xs font-black text-[#8F00FF] bg-[#8F00FF]/10 px-2.5 py-1 rounded-full">
                  {step.number}
                </span>
                <h3 className="font-bold text-gray-900 mt-3 mb-1">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Requirements ── */}
        <section
          aria-labelledby="requirements-title"
          className="rounded-2xl border border-amber-200 bg-amber-50 p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Star size={18} className="text-amber-500" aria-hidden="true" />
            <h2 id="requirements-title" className="font-black text-gray-900">
              {en ? "The conditions (simple)" : "Les conditions (simples)"}
            </h2>
          </div>
          <ul className="space-y-2 list-none p-0">
            {requirements.map((req) => (
              <li key={req} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-amber-500 mt-0.5 shrink-0" aria-hidden="true">✦</span>
                {req}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Application form ── */}
        <section aria-labelledby="application-form-title">
          {submitted ? (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
              <CheckCircle2 size={40} className="text-green-500 mx-auto mb-4" aria-hidden="true" />
              <h2 id="application-form-title" className="text-xl font-black text-gray-900 mb-2">
                {en ? "Application received! 🎉" : "Candidature reçue ! 🎉"}
              </h2>
              <p className="text-sm text-gray-600">
                {en
                  ? "We'll get back to you within 48 h at the address provided. In the meantime, you can already create your free account and try BeassistLink."
                  : "On revient vers vous sous 48 h à l'adresse indiquée. En attendant, vous pouvez déjà créer votre compte gratuit et tester BeassistLink."}
              </p>
              <Link
                href="/register"
                className="inline-flex mt-5 px-5 py-2.5 rounded-xl bg-[#8F00FF] text-white font-semibold hover:bg-[#7200CC] transition-colors text-sm"
              >
                {en ? "Create my free account" : "Créer mon compte gratuit"}
              </Link>
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-200 p-6 sm:p-8">
              <h2 id="application-form-title" className="font-black text-gray-900 text-lg mb-1">
                {en ? "Apply to the program" : "Postuler au programme"}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                {en ? "No commitment. We reply within 48 h." : "Aucun engagement. On vous répond sous 48 h."}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-sm font-semibold text-gray-700">
                      {en ? "Full name *" : "Nom / Prénom *"}
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      aria-required="true"
                      className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8F00FF]/40 focus:border-[#8F00FF]"
                      placeholder={en ? "Jane Smith" : "Julie Dupont"}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      required
                      type="email"
                      aria-required="true"
                      className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8F00FF]/40 focus:border-[#8F00FF]"
                      placeholder={en ? "you@example.com" : "vous@exemple.com"}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>

                {/* Platform selector */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">
                    {en ? "Your main platform *" : "Votre plateforme principale *"}
                  </label>
                  <div
                    role="group"
                    aria-label={en ? "Select your main platform" : "Sélectionnez votre plateforme principale"}
                    className="flex flex-wrap gap-2"
                  >
                    {platforms.map((p) => (
                      <button
                        key={p.name}
                        type="button"
                        aria-pressed={platform === p.name}
                        onClick={() => {
                          setPlatform(p.name);
                          setForm({ ...form, platform: p.name });
                        }}
                        className={`px-3 py-2 rounded-xl border text-sm font-medium transition-all duration-150 ${
                          platform === p.name
                            ? "border-[#8F00FF] bg-[#8F00FF]/10 text-[#8F00FF]"
                            : "border-gray-200 text-gray-600 hover:border-[#8F00FF]/40"
                        }`}
                      >
                        {p.emoji} {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="handle" className="text-sm font-semibold text-gray-700">
                      {en ? "Your handle / channel *" : "Votre handle / chaîne *"}
                    </label>
                    <input
                      id="handle"
                      name="handle"
                      required
                      aria-required="true"
                      className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8F00FF]/40 focus:border-[#8F00FF]"
                      placeholder={en ? "@yourhandle or URL" : "@votrepseudo ou URL"}
                      value={form.handle}
                      onChange={(e) => setForm({ ...form, handle: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="audience" className="text-sm font-semibold text-gray-700">
                      {en ? "Your audience size" : "Taille de votre audience"}
                    </label>
                    <select
                      id="audience"
                      name="audience"
                      className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8F00FF]/40 focus:border-[#8F00FF] bg-white"
                      value={form.audience}
                      onChange={(e) => setForm({ ...form, audience: e.target.value })}
                    >
                      <option value="">{en ? "-- Select --" : "-- Sélectionner --"}</option>
                      <option>1,000 – 10,000</option>
                      <option>10,000 – 50,000</option>
                      <option>50,000 – 200,000</option>
                      <option>{en ? "Over 200,000" : "Plus de 200 000"}</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="message" className="text-sm font-semibold text-gray-700">
                    {en ? "Why do you want to collaborate? (optional)" : "Pourquoi voulez-vous collaborer ? (optionnel)"}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8F00FF]/40 focus:border-[#8F00FF] resize-none"
                    placeholder={
                      en
                        ? "Describe your audience, your content, why BeassistLink suits you…"
                        : "Décrivez votre audience, votre contenu, pourquoi BeassistLink vous correspond…"
                    }
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !form.name || !form.email || !form.handle || !form.platform}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#8F00FF] text-white font-bold text-sm hover:bg-[#7200CC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <Send size={16} aria-hidden="true" />}
                  {loading
                    ? en ? "Sending…" : "Envoi en cours…"
                    : en ? "Send my application" : "Envoyer ma candidature"}
                </button>
              </form>
            </div>
          )}
        </section>

        {/* ── FAQ ── */}
        <section aria-labelledby="faq-title" className="rounded-2xl border border-gray-200 p-6 space-y-5">
          <h2 id="faq-title" className="font-black text-gray-900 text-lg">
            {en ? "Frequently asked questions" : "Questions fréquentes"}
          </h2>
          {faq.map(({ q, a }) => (
            <div key={q}>
              <p className="text-sm font-bold text-gray-900">{q}</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">{a}</p>
            </div>
          ))}
        </section>
      </MarketingLayout>
    </>
  );
}