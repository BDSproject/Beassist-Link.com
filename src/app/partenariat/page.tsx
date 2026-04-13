"use client";

import { useState } from "react";
import Link from "next/link";
import { MarketingLayout } from "@/components/landing/marketing-layout";
import { Video, Gift, CheckCircle2, Star, Send, Loader2 } from "lucide-react";

const steps = [
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
      "Notre équipe examine votre candidature sous 48 h. Aucun minimum d'abonnés requis — la qualité du contenu prime sur la taille.",
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

const requirements = [
  "Être actif sur au moins une plateforme (YouTube, TikTok, Instagram, Twitch…)",
  "Publier une vidéo ou story/reel présentant BeassistLink à votre audience",
  "Mentionner au moins une fonctionnalité clé (lien bio, analytics, QR code…)",
  "Inclure un lien vers beassist-link.com dans la description ou la bio",
  "La vidéo doit rester en ligne au moins 12 mois",
];

const included = [
  "Pages bio illimitées",
  "Liens raccourcis illimités",
  "Analytics avancées",
  "QR codes illimités",
  "Tous les thèmes + couleurs custom",
  "Suppression du branding",
  "Domaine personnalisé",
  "Support prioritaire",
];

const platforms = [
  { name: "YouTube", emoji: "🎥" },
  { name: "TikTok", emoji: "🎵" },
  { name: "Instagram", emoji: "📸" },
  { name: "Twitch", emoji: "🟣" },
  { name: "Podcast", emoji: "🎙️" },
  { name: "Autre", emoji: "✨" },
];

export default function PartnershipPage() {
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
      alert("Une erreur est survenue. Réessayez ou contactez-nous directement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MarketingLayout
      category="Partenariat"
      title="Devenez ambassadeur BeassistLink 🇫🇷"
      description="Présentez BeassistLink à votre audience dans une vidéo, et obtenez un abonnement Pro à vie — gratuitement, sans condition cachée."
    >
      {/* ── Pitch principal ── */}
      <div className="rounded-2xl border-2 border-[#8F00FF]/30 bg-gradient-to-br from-[#F9F5FF] to-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="flex-1">
            <h2 className="text-xl font-black text-gray-900 leading-snug">
              Une vidéo contre un Pro à vie
            </h2>
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              On croit sincèrement en notre produit — et on sait que la meilleure pub, c'est
              quelqu'un qui l'utilise vraiment. Si vous aimez BeassistLink, parlez-en à votre
              communauté. En échange, on vous offre l'accès complet à toutes les fonctionnalités
              Pro, <strong>à vie</strong>, sans contrepartie supplémentaire.
            </p>
            <p className="text-sm text-gray-500 mt-3 leading-relaxed">
              Aucun minimum d'abonnés. Aucun script imposé. Vous restez authentique.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:min-w-[200px]">
            <div className="rounded-xl bg-[#8F00FF]/10 border border-[#8F00FF]/20 p-4 text-center">
              <Video size={24} className="text-[#8F00FF] mx-auto mb-2" />
              <p className="text-sm font-bold text-gray-900">1 vidéo</p>
              <p className="text-xs text-gray-500 mt-0.5">à votre façon</p>
            </div>
            <div className="flex items-center justify-center text-2xl font-black text-gray-300">⇓</div>
            <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-center">
              <Gift size={24} className="text-green-600 mx-auto mb-2" />
              <p className="text-sm font-bold text-gray-900">Pro à vie</p>
              <p className="text-xs text-gray-500 mt-0.5">offert</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Ce que comprend le Pro à vie ── */}
      <div className="rounded-2xl border border-gray-200 p-6">
        <h2 className="font-black text-gray-900 text-lg mb-4">Ce que vous obtenez (plan Pro complet)</h2>
        <div className="grid sm:grid-cols-2 gap-2">
          {included.map((item) => (
            <div key={item} className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-[#8F00FF] mt-0.5 shrink-0" />
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4">
          Valeur estimée : <span className="font-semibold text-gray-600">144 €/an</span> — offert à vie dès validation de votre vidéo.
        </p>
      </div>

      {/* ── Comment ça marche ── */}
      <div>
        <h2 className="font-black text-gray-900 text-lg mb-4">Comment ça marche ?</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {steps.map((step) => (
            <div key={step.number} className="rounded-2xl border border-gray-200 p-5 hover:border-[#8F00FF]/40 transition-colors">
              <span className="text-xs font-black text-[#8F00FF] bg-[#8F00FF]/10 px-2.5 py-1 rounded-full">
                {step.number}
              </span>
              <h3 className="font-bold text-gray-900 mt-3 mb-1">{step.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Conditions ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <div className="flex items-center gap-2 mb-3">
          <Star size={18} className="text-amber-500" />
          <h2 className="font-black text-gray-900">Les conditions (simples)</h2>
        </div>
        <ul className="space-y-2">
          {requirements.map((req) => (
            <li key={req} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-amber-500 mt-0.5 shrink-0">✦</span>
              {req}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Formulaire de candidature ── */}
      {submitted ? (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
          <CheckCircle2 size={40} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-black text-gray-900 mb-2">Candidature reçue ! 🎉</h2>
          <p className="text-sm text-gray-600">
            On revient vers vous sous 48 h à l'adresse indiquée. En attendant, vous pouvez déjà créer
            votre compte gratuit et tester BeassistLink.
          </p>
          <Link
            href="/register"
            className="inline-flex mt-5 px-5 py-2.5 rounded-xl bg-[#8F00FF] text-white font-semibold hover:bg-[#7200CC] transition-colors text-sm"
          >
            Créer mon compte gratuit
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 p-6 sm:p-8">
          <h2 className="font-black text-gray-900 text-lg mb-1">Postuler au programme</h2>
          <p className="text-sm text-gray-500 mb-6">Aucun engagement. On vous répond sous 48 h.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Nom / Prénom *</label>
                <input
                  required
                  className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8F00FF]/40 focus:border-[#8F00FF]"
                  placeholder="Julie Dupont"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Email *</label>
                <input
                  required
                  type="email"
                  className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8F00FF]/40 focus:border-[#8F00FF]"
                  placeholder="vous@exemple.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            {/* Plateforme */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">Votre plateforme principale *</label>
              <div className="flex flex-wrap gap-2">
                {platforms.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => { setPlatform(p.name); setForm({ ...form, platform: p.name }); }}
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
                <label className="text-sm font-semibold text-gray-700">Votre handle / chaîne *</label>
                <input
                  required
                  className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8F00FF]/40 focus:border-[#8F00FF]"
                  placeholder="@votrepseudo ou URL"
                  value={form.handle}
                  onChange={(e) => setForm({ ...form, handle: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Taille de votre audience</label>
                <select
                  className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8F00FF]/40 focus:border-[#8F00FF] bg-white"
                  value={form.audience}
                  onChange={(e) => setForm({ ...form, audience: e.target.value })}
                >
                  <option value="">-- Sélectionner --</option>
                  <option>Moins de 1 000</option>
                  <option>1 000 – 10 000</option>
                  <option>10 000 – 50 000</option>
                  <option>50 000 – 200 000</option>
                  <option>Plus de 200 000</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">Pourquoi voulez-vous collaborer ? (optionnel)</label>
              <textarea
                rows={3}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8F00FF]/40 focus:border-[#8F00FF] resize-none"
                placeholder="Décrivez votre audience, votre contenu, pourquoi BeassistLink vous correspond…"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !form.name || !form.email || !form.handle || !form.platform}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#8F00FF] text-white font-bold text-sm hover:bg-[#7200CC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
              {loading ? "Envoi en cours…" : "Envoyer ma candidature"}
            </button>
          </form>
        </div>
      )}

      {/* ── FAQ rapide ── */}
      <div className="rounded-2xl border border-gray-200 p-6 space-y-5">
        <h2 className="font-black text-gray-900 text-lg">Questions fréquentes</h2>
        {[
          {
            q: "Y a-t-il un minimum d'abonnés ?",
            a: "Non. Ce qui compte c'est la qualité et l'authenticité de votre contenu, pas la taille de votre audience.",
          },
          {
            q: "Le contenu doit-il être sponsorisé / déclaré comme pub ?",
            a: "Oui, conformément à la loi française sur la publicité digitale (ARPP). Indiquez clairement \"contenu sponsorisé\" ou \"partenariat\".",
          },
          {
            q: "Que se passe-t-il si je supprime la vidéo ?",
            a: "Nous nous réservons le droit de résilier l'abonnement si la vidéo est supprimée avant 12 mois.",
          },
          {
            q: "Peut-on collaborer plusieurs fois ?",
            a: "Ce programme offre un abonnement Pro à vie. Pour les collaborations long terme (affiliation, ambassador), contactez-nous directement.",
          },
        ].map(({ q, a }) => (
          <div key={q}>
            <p className="text-sm font-bold text-gray-900">{q}</p>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">{a}</p>
          </div>
        ))}
      </div>
    </MarketingLayout>
  );
}
