"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

type Section = {
  title: string;
  text?: string;
  bullets?: string[];
  content?: { label: string; value: string }[];
};

const SECTIONS: Record<string, Section[]> = {
  fr: [
    {
      title: "1. Objet",
      text: "Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions dans lesquelles BeassistLink met à disposition de ses utilisateurs la plateforme SaaS « BeassistLink » accessible à l'adresse beassist-link.com, ainsi que les droits et obligations des parties dans ce cadre.",
    },
    {
      title: "2. Acceptation des CGU",
      text: "L'accès et l'utilisation de la plateforme BeassistLink impliquent l'acceptation pleine et entière des présentes CGU. Si vous n'acceptez pas ces conditions, vous devez vous abstenir d'utiliser le service. BeassistLink se réserve le droit de modifier les présentes CGU à tout moment ; les utilisateurs en seront informés par tout moyen utile.",
    },
    {
      title: "3. Description du service",
      text: "BeassistLink est une plateforme de gestion de présence en ligne permettant notamment : la création et personnalisation d'une page bio (link-in-bio), la gestion de liens raccourcis, la génération de QR codes, ainsi que des outils d'analyse de trafic et de performance. Le service est accessible par abonnement selon les formules décrites dans les Conditions Générales de Vente.",
    },
    {
      title: "4. Accès au service",
      text: "L'accès à la plateforme nécessite la création d'un compte utilisateur avec une adresse e-mail valide et un mot de passe. L'utilisateur est seul responsable de la confidentialité de ses identifiants. Tout accès effectué avec ses identifiants est réputé effectué par l'utilisateur. En cas de perte ou de compromission, l'utilisateur doit en informer immédiatement BeassistLink.",
    },
    {
      title: "5. Obligations de l'utilisateur",
      bullets: [
        "Utiliser le service conformément à sa destination et aux présentes CGU.",
        "Ne pas tenter de contourner les mesures de sécurité de la plateforme.",
        "Ne pas utiliser le service à des fins illicites, frauduleuses ou portant atteinte aux droits de tiers.",
        "Ne pas introduire de contenus illégaux, offensants, diffamatoires ou portant atteinte à la vie privée.",
        "Maintenir à jour les informations de son compte (e-mail, coordonnées de facturation).",
      ],
    },
    {
      title: "6. Propriété intellectuelle",
      text: "La plateforme BeassistLink, son code source, son design, ses fonctionnalités et toute la documentation associée sont la propriété exclusive de BeassistLink et sont protégés par les lois françaises et internationales relatives à la propriété intellectuelle. L'utilisateur ne bénéficie que d'un droit d'utilisation personnel, non exclusif et non cessible.",
    },
    {
      title: "7. Données personnelles",
      text: "BeassistLink traite les données personnelles des utilisateurs conformément à sa Politique de Confidentialité et au RGPD (Règlement UE 2016/679). Les données collectées sont utilisées exclusivement pour la fourniture et l'amélioration du service. Elles ne sont pas cédées à des tiers à des fins commerciales. L'utilisateur dispose d'un droit d'accès, de rectification, de suppression et de portabilité de ses données.",
    },
    {
      title: "8. Disponibilité du service",
      text: "BeassistLink s'engage à mettre en œuvre les moyens raisonnables pour assurer la disponibilité du service. Toutefois, des interruptions temporaires peuvent survenir pour maintenance, mise à jour ou en raison de causes indépendantes de la volonté de BeassistLink (force majeure, défaillance d'hébergeur, etc.). BeassistLink ne pourra être tenu responsable de ces interruptions.",
    },
    {
      title: "9. Suspension et résiliation",
      text: "BeassistLink se réserve le droit de suspendre ou résilier l'accès d'un utilisateur en cas de violation des présentes CGU, sans préavis ni indemnité. L'utilisateur peut également résilier son compte à tout moment depuis les paramètres de son espace ou en contactant le support.",
    },
    {
      title: "10. Limitation de responsabilité",
      text: "Dans les limites permises par la loi, la responsabilité de BeassistLink est limitée aux dommages directs et prévisibles. BeassistLink ne saurait être tenu responsable des pertes de données, manques à gagner, ou préjudices indirects résultant de l'utilisation ou de l'impossibilité d'utiliser le service.",
    },
    {
      title: "11. Droit applicable et juridiction",
      text: "Les présentes CGU sont régies par le droit français. En cas de litige, et après tentative de résolution amiable, les tribunaux compétents seront seuls compétents.",
    },
    {
      title: "12. Contact",
      content: [
        { label: "Produit", value: "BeassistLink" },
        { label: "Site", value: "beassist-link.com" },
        { label: "Email", value: "contact@beassist-link.com" },
      ],
    },
  ],
  en: [
    {
      title: "1. Purpose",
      text: "These Terms of Service (ToS) define the terms and conditions under which BeassistLink makes the BeassistLink SaaS platform available to users at beassist-link.com, as well as the rights and obligations of the parties.",
    },
    {
      title: "2. Acceptance of ToS",
      text: "Accessing and using the BeassistLink platform implies full acceptance of these Terms of Service. If you do not accept these terms, you must refrain from using the service. BeassistLink reserves the right to modify these ToS at any time; users will be notified by any appropriate means.",
    },
    {
      title: "3. Service description",
      text: "BeassistLink is an online presence management platform offering: creation and customization of a bio page (link-in-bio), management of short links, QR code generation, and traffic and performance analytics. The service is accessible by subscription according to the plans described in the General Sales Conditions.",
    },
    {
      title: "4. Service access",
      text: "Access to the platform requires creating a user account with a valid email address and password. The user is solely responsible for the confidentiality of their credentials. Any access made with their credentials is deemed made by the user. In case of loss or compromise, the user must immediately notify BeassistLink.",
    },
    {
      title: "5. User obligations",
      bullets: [
        "Use the service in accordance with its purpose and these ToS.",
        "Not attempt to bypass the platform's security measures.",
        "Not use the service for illegal, fraudulent or third-party rights-infringing purposes.",
        "Not introduce illegal, offensive, defamatory or privacy-violating content.",
        "Keep account information up to date (email, billing details).",
      ],
    },
    {
      title: "6. Intellectual property",
      text: "The BeassistLink platform, its source code, design, features and all associated documentation are the exclusive property of BeassistLink and are protected by French and international intellectual property laws. The user only has a personal, non-exclusive and non-transferable right of use.",
    },
    {
      title: "7. Personal data",
      text: "BeassistLink processes users' personal data in accordance with its Privacy Policy and the GDPR (EU Regulation 2016/679). Data collected is used exclusively for providing and improving the service. It is not transferred to third parties for commercial purposes. Users have the right to access, rectify, delete and port their data.",
    },
    {
      title: "8. Service availability",
      text: "BeassistLink undertakes to implement reasonable means to ensure service availability. However, temporary interruptions may occur for maintenance, updates or due to causes beyond BeassistLink's control (force majeure, hosting failure, etc.). BeassistLink cannot be held responsible for these interruptions.",
    },
    {
      title: "9. Suspension and termination",
      text: "BeassistLink reserves the right to suspend or terminate a user's access in case of violation of these ToS, without notice or compensation. The user may also terminate their account at any time from their account settings or by contacting support.",
    },
    {
      title: "10. Limitation of liability",
      text: "To the extent permitted by law, BeassistLink's liability is limited to direct and foreseeable damages. BeassistLink cannot be held liable for data loss, lost profits, or indirect damages resulting from the use or inability to use the service.",
    },
    {
      title: "11. Applicable law and jurisdiction",
      text: "These ToS are governed by French law. In case of dispute, and after an amicable resolution attempt, the competent courts will have sole jurisdiction.",
    },
    {
      title: "12. Contact",
      content: [
        { label: "Product", value: "BeassistLink" },
        { label: "Website", value: "beassist-link.com" },
        { label: "Email", value: "contact@beassist-link.com" },
      ],
    },
  ],
};

export default function CGU() {
  const { lang } = useLanguage();
  const en = lang === "en";
  const sections = SECTIONS[lang] ?? SECTIONS.fr;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-[#8F00FF]"
        >
          <ArrowLeft size={15} /> {en ? "Back to home" : "Retour à l'accueil"}
        </Link>

        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8F00FF]">
            BeassistLink
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
            {en ? "Terms of Service" : "Conditions Générales d'Utilisation"}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {en ? "Last updated: April 2026" : "Dernière mise à jour : avril 2026"}
          </p>
        </div>

        <div className="space-y-6">
          {sections.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="mb-3 text-base font-semibold text-slate-900">{s.title}</h2>

              {s.text && (
                <p className="text-sm leading-relaxed text-slate-700">{s.text}</p>
              )}

              {s.bullets && (
                <ul className="mt-1 space-y-1.5 pl-1">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-sm text-slate-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8F00FF]/60" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}

              {s.content && (
                <dl className="space-y-2">
                  {s.content.map(({ label, value }) => (
                    <div key={label} className="flex flex-wrap gap-x-4">
                      <dt className="w-40 shrink-0 text-sm font-medium text-slate-500">{label}</dt>
                      <dd className="text-sm text-slate-800">{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-slate-400">
          <Link href="/legal" className="transition hover:text-[#8F00FF]">
            {en ? "Legal notice" : "Mentions légales"}
          </Link>
          <span>·</span>
          <Link href="/privacy" className="transition hover:text-[#8F00FF]">
            {en ? "Privacy policy" : "Politique de confidentialité"}
          </Link>
        </div>

        <p className="mt-4 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} BeassistLink — beassist-link.com
        </p>
      </div>
    </div>
  );
}

