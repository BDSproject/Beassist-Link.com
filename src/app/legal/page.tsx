"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Logo } from "@/components/shared/logo";
import { ArrowLeft } from "lucide-react";

const LEGAL_CONTENT = {
  fr: {
    title: "Mentions Légales",
    updatedAt: "Dernière mise à jour : Janvier 2025",
    sections: [
      {
        title: "1. Éditeur du site",
        content: [
          "Le site BeassistLink est édité par la société :",
          "**Beassisted SASU**",
          "Forme juridique : Société par Actions Simplifiée Unipersonnelle (SASU)",
          "SIREN : 101 096 154",
          "SIRET : 101 096 154 00014",
          "RCS : CRÉTEIL",
          "N° TVA intracommunautaire : FR29 101 096 154",
          "Siège social : 9 Rue de Paris, 94450 Limeil-Brévannes, France",
          "Site web : beassistwebapp.fr",
        ],
      },
      {
        title: "2. Directeur de la publication",
        content: [
          "Le directeur de la publication est le représentant légal de la société Beassisted SASU.",
        ],
      },
      {
        title: "3. Hébergement",
        content: [
          "Le site BeassistLink est hébergé par :",
          "**o2switch**",
          "Chemin des Pardiaux",
          "63000 Clermont-Ferrand, France",
          "Site web : https://www.o2switch.fr",
          "o2switch est un hébergeur web français certifié ISO 27001.",
        ],
      },
      {
        title: "4. Propriété intellectuelle",
        content: [
          "L'ensemble des éléments constituant le site BeassistLink (textes, graphiques, logiciels, photographies, images, vidéos, sons, plans, noms, logo, marques, créations et œuvres protégeables diverses, bases de données) sont la propriété exclusive de Beassisted SASU ou de ses partenaires.",
          "Ces éléments sont protégés par les lois françaises et internationales relatives à la propriété intellectuelle.",
          "Toute reproduction, représentation, utilisation ou adaptation, sous quelque forme que ce soit, de tout ou partie de ces éléments, sans l'accord préalable et écrit de Beassisted SASU, est strictement interdite.",
          "Le fait de ne pas respecter cette interdiction constitue une contrefaçon pouvant engager la responsabilité civile et pénale du contrefacteur.",
        ],
      },
      {
        title: "5. Données personnelles et RGPD",
        content: [
          "Beassisted SASU s'engage à protéger vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679) et à la loi Informatique et Libertés.",
          "Les données collectées (nom, adresse e-mail, etc.) sont utilisées uniquement pour :",
          "• Fournir les services BeassistLink",
          "• Vous envoyer des communications relatives à votre compte",
          "• Améliorer nos services",
          "Vous disposez des droits suivants concernant vos données : droit d'accès, de rectification, d'effacement, de portabilité, d'opposition et de limitation du traitement.",
          "Pour exercer vos droits ou pour toute question relative à vos données personnelles, contactez-nous à : contact@beassistwebapp.fr",
          "En cas de réclamation non résolue, vous pouvez saisir la CNIL (Commission Nationale de l'Informatique et des Libertés) : www.cnil.fr",
        ],
      },
      {
        title: "6. Cookies",
        content: [
          "Le site BeassistLink utilise des cookies pour améliorer votre expérience de navigation.",
          "Les cookies utilisés sont :",
          "• **Cookies de session** : nécessaires au fonctionnement du site (authentification, préférences de langue)",
          "• **Cookies analytiques** : pour mesurer l'audience et améliorer le site (données anonymisées)",
          "Vous pouvez à tout moment désactiver les cookies via les paramètres de votre navigateur. Certaines fonctionnalités du site peuvent être affectées.",
        ],
      },
      {
        title: "7. Limitation de responsabilité",
        content: [
          "Beassisted SASU met tout en œuvre pour assurer l'accessibilité et la disponibilité du site BeassistLink. Toutefois, la société ne saurait être tenue responsable :",
          "• Des interruptions temporaires de service pour maintenance ou mise à jour",
          "• Des dommages directs ou indirects résultant d'une utilisation inappropriée du service",
          "• Du contenu des sites tiers accessibles via des liens hypertextes présents sur le site",
          "• Des erreurs ou omissions dans les informations publiées",
          "L'utilisateur est seul responsable de l'utilisation qu'il fait du site et des contenus qu'il y publie.",
        ],
      },
      {
        title: "8. Liens hypertextes",
        content: [
          "Le site BeassistLink peut contenir des liens vers d'autres sites internet. Beassisted SASU n'exerce aucun contrôle sur ces sites et n'est pas responsable de leur contenu, de leurs politiques de confidentialité ou de leurs pratiques.",
          "La création de liens vers le site BeassistLink est autorisée sous réserve qu'elle ne porte pas atteinte à l'image de la société et qu'elle respecte la législation en vigueur.",
        ],
      },
      {
        title: "9. Droit applicable et juridiction compétente",
        content: [
          "Les présentes mentions légales sont régies par le droit français.",
          "En cas de litige relatif à l'utilisation du site ou à l'interprétation des présentes mentions légales, les parties s'efforceront de trouver une solution amiable.",
          "À défaut d'accord amiable, tout litige sera soumis à la compétence exclusive du **Tribunal de Commerce de Créteil**, nonobstant pluralité de défendeurs ou appel en garantie.",
        ],
      },
    ],
  },
  en: {
    title: "Legal Notice",
    updatedAt: "Last updated: January 2025",
    sections: [
      {
        title: "1. Website Publisher",
        content: [
          "The BeassistLink website is published by:",
          "**Beassisted SASU**",
          "Legal form: Société par Actions Simplifiée Unipersonnelle (Single-member simplified joint-stock company)",
          "SIREN: 101 096 154",
          "SIRET: 101 096 154 00014",
          "RCS: CRÉTEIL",
          "EU VAT number: FR29 101 096 154",
          "Registered office: 9 Rue de Paris, 94450 Limeil-Brévannes, France",
          "Website: beassistwebapp.fr",
        ],
      },
      {
        title: "2. Publication Director",
        content: [
          "The publication director is the legal representative of Beassisted SASU.",
        ],
      },
      {
        title: "3. Web Hosting",
        content: [
          "The BeassistLink website is hosted by:",
          "**o2switch**",
          "Chemin des Pardiaux",
          "63000 Clermont-Ferrand, France",
          "Website: https://www.o2switch.fr",
          "o2switch is a French web hosting provider certified ISO 27001.",
        ],
      },
      {
        title: "4. Intellectual Property",
        content: [
          "All elements of the BeassistLink website (texts, graphics, software, photographs, images, videos, sounds, plans, names, logos, trademarks, creations, and other protectable works, databases) are the exclusive property of Beassisted SASU or its partners.",
          "These elements are protected by French and international intellectual property laws.",
          "Any reproduction, representation, use or adaptation, in any form whatsoever, of all or part of these elements, without the prior written consent of Beassisted SASU, is strictly prohibited.",
          "Failure to comply with this prohibition constitutes an infringement that may give rise to civil and criminal liability.",
        ],
      },
      {
        title: "5. Personal Data & GDPR",
        content: [
          "Beassisted SASU is committed to protecting your personal data in accordance with the General Data Protection Regulation (GDPR — EU Regulation 2016/679) and the French Data Protection Act.",
          "Data collected (name, email address, etc.) is used solely for:",
          "• Providing BeassistLink services",
          "• Sending you communications related to your account",
          "• Improving our services",
          "You have the following rights regarding your data: right of access, rectification, erasure, portability, objection, and restriction of processing.",
          "To exercise your rights or for any question regarding your personal data, contact us at: contact@beassistwebapp.fr",
          "If your complaint remains unresolved, you may contact the CNIL (French Data Protection Authority): www.cnil.fr",
        ],
      },
      {
        title: "6. Cookies",
        content: [
          "The BeassistLink website uses cookies to improve your browsing experience.",
          "Cookies used include:",
          "• **Session cookies**: necessary for the site to function (authentication, language preferences)",
          "• **Analytics cookies**: to measure audience and improve the site (anonymized data)",
          "You can disable cookies at any time through your browser settings. Some site features may be affected.",
        ],
      },
      {
        title: "7. Limitation of Liability",
        content: [
          "Beassisted SASU makes every effort to ensure the accessibility and availability of the BeassistLink website. However, the company shall not be held liable for:",
          "• Temporary service interruptions for maintenance or updates",
          "• Direct or indirect damages resulting from inappropriate use of the service",
          "• The content of third-party sites accessible via hyperlinks on the site",
          "• Errors or omissions in published information",
          "The user is solely responsible for their use of the site and the content they publish on it.",
        ],
      },
      {
        title: "8. Hyperlinks",
        content: [
          "The BeassistLink website may contain links to other websites. Beassisted SASU has no control over these sites and is not responsible for their content, privacy policies or practices.",
          "Creating links to the BeassistLink website is permitted provided they do not harm the company's image and comply with applicable law.",
        ],
      },
      {
        title: "9. Applicable Law and Jurisdiction",
        content: [
          "These legal notices are governed by French law.",
          "In the event of a dispute relating to the use of the site or the interpretation of these legal notices, the parties shall endeavour to find an amicable solution.",
          "Failing amicable agreement, any dispute shall be submitted to the exclusive jurisdiction of the **Commercial Court of Créteil (Tribunal de Commerce de Créteil)**, notwithstanding multiple defendants or guarantee actions.",
        ],
      },
    ],
  },
};

function renderLine(line: string, idx: number) {
  // Handle **bold** markdown
  const parts = line.split(/\*\*(.*?)\*\*/g);
  return (
    <span key={idx}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-gray-900">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </span>
  );
}

export default function LegalPage() {
  const { lang } = useLanguage();
  const content = LEGAL_CONTENT[lang];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Logo size="md" />
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#8F00FF] transition-colors mb-10"
        >
          <ArrowLeft size={16} />
          {lang === "fr" ? "Retour à l'accueil" : "Back to home"}
        </Link>

        {/* Title */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3">
            {content.title}
          </h1>
          <p className="text-sm text-gray-400">{content.updatedAt}</p>
          <div className="mt-4 h-1 w-16 rounded-full bg-[#8F00FF]" />
        </div>

        {/* Company highlight box */}
        <div className="mb-12 p-6 rounded-2xl bg-[#F5EBFF] border border-[#EAD6FF]">
          <div className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-white font-black text-sm"
              style={{ backgroundColor: "#8F00FF" }}
            >
              B
            </div>
            <div>
              <p className="font-bold text-gray-900">Beassisted SASU</p>
              <p className="text-sm text-gray-600 mt-0.5">
                SIREN 101 096 154 &nbsp;·&nbsp; SIRET 101 096 154 00014
              </p>
              <p className="text-sm text-gray-600">
                9 Rue de Paris, 94450 Limeil-Brévannes, France
              </p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {content.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.content.map((line, idx) => (
                  <p key={idx} className="text-gray-600 leading-relaxed text-sm">
                    {renderLine(line, idx)}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            {lang === "fr"
              ? "© 2025 Beassisted SASU — Tous droits réservés"
              : "© 2025 Beassisted SASU — All rights reserved"}
          </p>
          <Link
            href="/"
            className="inline-block mt-3 text-xs text-[#8F00FF] hover:underline"
          >
            {lang === "fr" ? "← Retour au site" : "← Back to site"}
          </Link>
        </div>
      </main>
    </div>
  );
}
