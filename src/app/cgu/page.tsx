import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Section = {
  title: string;
  text?: string;
  bullets?: string[];
  content?: { label: string; value: string }[];
};

const SECTIONS: Section[] = [
  {
    title: "1. Objet",
    text: "Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions dans lesquelles Beassisted met à disposition de ses utilisateurs la plateforme SaaS « Beassist » accessible à l'adresse beassistwebapp.fr, ainsi que les droits et obligations des parties dans ce cadre.",
  },
  {
    title: "2. Acceptation des CGU",
    text: "L'accès et l'utilisation de la plateforme Beassist impliquent l'acceptation pleine et entière des présentes CGU. Si vous n'acceptez pas ces conditions, vous devez vous abstenir d'utiliser le service. Beassisted se réserve le droit de modifier les présentes CGU à tout moment ; les utilisateurs en seront informés par tout moyen utile.",
  },
  {
    title: "3. Description du service",
    text: "Beassist est une plateforme de gestion de la relation client (CRM) permettant notamment : la gestion de tickets de support, le suivi client, la planification (agenda), la gestion des employés, la création d'une base de connaissances, ainsi que des outils d'analyse et de notifications. Le service est accessible par abonnement selon les formules décrites dans les Conditions Générales de Vente.",
  },
  {
    title: "4. Accès au service",
    text: "L'accès à la plateforme nécessite la création d'un compte utilisateur avec une adresse e-mail valide et un mot de passe. L'utilisateur est seul responsable de la confidentialité de ses identifiants. Tout accès effectué avec ses identifiants est réputé effectué par l'utilisateur. En cas de perte ou de compromission, l'utilisateur doit en informer immédiatement Beassisted.",
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
    text: "La plateforme Beassist, son code source, son design, ses fonctionnalités et toute la documentation associée sont la propriété exclusive de Beassisted et sont protégés par les lois françaises et internationales relatives à la propriété intellectuelle. L'utilisateur ne bénéficie que d'un droit d'utilisation personnel, non exclusif et non cessible.",
  },
  {
    title: "7. Données personnelles",
    text: "Beassisted traite les données personnelles des utilisateurs conformément à sa Politique de Confidentialité et au RGPD (Règlement UE 2016/679). Les données collectées sont utilisées exclusivement pour la fourniture et l'amélioration du service. Elles ne sont pas cédées à des tiers à des fins commerciales. L'utilisateur dispose d'un droit d'accès, de rectification, de suppression et de portabilité de ses données.",
  },
  {
    title: "8. Disponibilité du service",
    text: "Beassisted s'engage à mettre en œuvre les moyens raisonnables pour assurer la disponibilité du service. Toutefois, des interruptions temporaires peuvent survenir pour maintenance, mise à jour ou en raison de causes indépendantes de la volonté de Beassisted (force majeure, défaillance d'hébergeur, etc.). Beassisted ne pourra être tenu responsable de ces interruptions.",
  },
  {
    title: "9. Suspension et résiliation",
    text: "Beassisted se réserve le droit de suspendre ou résilier l'accès d'un utilisateur en cas de violation des présentes CGU, sans préavis ni indemnité. L'utilisateur peut également résilier son compte à tout moment depuis les paramètres de son espace ou en contactant le support.",
  },
  {
    title: "10. Limitation de responsabilité",
    text: "Dans les limites permises par la loi, la responsabilité de Beassisted est limitée aux dommages directs et prévisibles. Beassisted ne saurait être tenu responsable des pertes de données, manques à gagner, ou préjudices indirects résultant de l'utilisation ou de l'impossibilité d'utiliser le service.",
  },
  {
    title: "11. Droit applicable et juridiction",
    text: "Les présentes CGU sont régies par le droit français. En cas de litige, et après tentative de résolution amiable, les tribunaux compétents du ressort du Tribunal de Commerce de Créteil seront seuls compétents.",
  },
  {
    title: "12. Programme d'affiliation",
    bullets: [
      "Beassisted propose un programme d'affiliation permettant à toute personne physique majeure ou personne morale d'obtenir une rémunération en contrepartie de la recommandation de la plateforme Beassist à des tiers.",
      "L'affilié reçoit un lien de parrainage unique généré à son inscription sur beassistwebapp.fr/affiliation. Toute souscription à un abonnement payant Beassist effectuée via ce lien est attribuée à l'affilié concerné.",
      "La commission est fixée à 20 % HT du montant hors taxes de chaque paiement d'abonnement actif du filleul, versée de manière récurrente tant que le filleul demeure abonné. Le taux de commission peut être révisé par Beassisted avec un préavis de 30 jours.",
      "L'affilié s'engage à promouvoir Beassist de manière honnête, loyale et conforme aux lois en vigueur. Toute pratique trompeuse, tout spam, auto-parrainage ou contournement du système de tracking est strictement interdit et entraîne la résiliation immédiate du compte affilié ainsi que la perte des commissions en attente.",
      "L'affilié est seul responsable des déclarations fiscales et sociales afférentes aux commissions perçues. Beassisted n'est pas employeur de l'affilié ; le présent programme ne constitue pas un contrat de travail, de mandat ou d'agent commercial.",
      "Beassisted se réserve le droit de suspendre ou clôturer un compte affilié en cas de violation des présentes conditions, sans préavis ni indemnité, et de retenir les commissions correspondant à des parrainages frauduleux ou annulés.",
      "Les modalités de calcul et de versement des commissions sont décrites à l'article 12 des Conditions Générales de Vente.",
    ],
  },
  {
    title: "13. Contact",
    content: [
      { label: "Entreprise", value: "Beassisted" },
      { label: "Adresse", value: "9 Rue de Paris, 94450 Limeil-Brévannes" },
      { label: "Site", value: "beassistwebapp.fr" },
    ],
  },
];

export const metadata = {
  title: "Conditions Générales d'Utilisation — Beassisted",
  description: "CGU de la plateforme Beassist par Beassisted SASU.",
};

export default function CGU() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-[#8F00FF]"
        >
          <ArrowLeft size={15} /> Retour à l&apos;accueil
        </Link>

        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8F00FF]">
            Beassisted
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
            Conditions Générales d&apos;Utilisation
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Dernière mise à jour : mars 2026
          </p>
        </div>

        <div className="space-y-6">
          {SECTIONS.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="mb-3 text-base font-semibold text-slate-900">
                {s.title}
              </h2>

              {s.text && (
                <p className="text-sm leading-relaxed text-slate-700">
                  {s.text}
                </p>
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
                      <dt className="w-40 shrink-0 text-sm font-medium text-slate-500">
                        {label}
                      </dt>
                      <dd className="text-sm text-slate-800">{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-slate-400">
          <Link
            href="/legal"
            className="transition hover:text-[#8F00FF]"
          >
            Mentions légales
          </Link>
          <span>·</span>
          <Link href="/cgv" className="transition hover:text-[#8F00FF]">
            CGV
          </Link>
        </div>

        <p className="mt-4 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Beassisted — 9 Rue de Paris, 94450
          Limeil-Brévannes
        </p>
      </div>
    </div>
  );
}
