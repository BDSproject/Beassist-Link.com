import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Section = {
  title: string;
  text?: string;
  bullets?: string[];
  content?: { label: string; value: string }[];
  plans?: boolean;
};

const PLANS = [
  {
    name: "Starter",
    price: "Gratuit",
    description:
      "Accès limité aux fonctionnalités de base (jusqu'à 3 utilisateurs, 50 tickets/mois).",
  },
  {
    name: "Pro",
    price: "Sur devis / abonnement mensuel",
    description:
      "Accès complet à toutes les fonctionnalités, utilisateurs illimités, support prioritaire.",
  },
  {
    name: "Enterprise",
    price: "Sur devis",
    description:
      "Fonctionnalités avancées, intégrations personnalisées, SLA garanti, account manager dédié.",
  },
];

const SECTIONS: Section[] = [
  {
    title: "1. Objet",
    text: "Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre Beassisted (vendeur) et toute personne physique ou morale (client) souhaitant souscrire à un abonnement ou à une prestation de service proposés via la plateforme Beassist. Toute souscription implique l'acceptation pleine et entière des présentes CGV.",
  },
  {
    title: "2. Identification du vendeur",
    content: [
      { label: "Raison sociale", value: "Beassisted" },
      { label: "SIREN", value: "101 096 154" },
      { label: "SIRET", value: "101 096 154 00014" },
      { label: "RCS", value: "CRÉTEIL 101 096 154" },
      { label: "N° TVA", value: "FR29 101 096 154" },
      {
        label: "Adresse",
        value: "9 Rue de Paris, 94450 Limeil-Brévannes, France",
      },
    ],
  },
  {
    title: "3. Offres et tarifs",
    text: "Les offres disponibles sur la plateforme Beassist sont les suivantes :",
    plans: true,
  },
  {
    title: "4. Commande et souscription",
    text: "La souscription à un abonnement Beassist s'effectue en ligne via la plateforme. Le client choisit la formule souhaitée, renseigne ses informations de facturation et procède au paiement. Un e-mail de confirmation est envoyé à l'adresse fournie lors de l'inscription. La souscription est ferme et définitive à compter de la réception de cet e-mail.",
  },
  {
    title: "5. Paiement",
    bullets: [
      "Les paiements sont traités par notre prestataire de paiement sécurisé Stripe.",
      "Les abonnements sont facturés mensuellement ou annuellement selon le choix du client.",
      "En cas d'impayé, l'accès au service peut être suspendu après mise en demeure restée sans suite.",
      "Les prix sont indiqués en euros (€) hors taxes (HT). La TVA applicable sera ajoutée au taux en vigueur au moment de la facturation.",
    ],
  },
  {
    title: "6. Droit de rétractation et renonciation",
    bullets: [
      "Conformément à l'article L.221-18 du Code de la consommation, le client consommateur dispose en principe d'un délai de 14 jours pour exercer son droit de rétractation.",
      "En souscrivant à un abonnement Beassist et en procédant au paiement, le client reconnaît expressément demander l'exécution immédiate du service dès la confirmation de sa commande.",
      "En application de l'article L.221-28 13° du Code de la consommation, le client renonce expressément à son droit de rétractation dès lors que l'exécution du service a commencé avec son accord préalable exprès avant l'expiration du délai de rétractation.",
      "Cette renonciation est formalisée lors du processus de paiement par la case à cocher obligatoire : \"Je demande l'exécution immédiate du service et je reconnais renoncer à mon droit de rétractation.\"",
      "Aucun remboursement ne pourra être exigé au titre du droit de rétractation après le début de l'exécution du service.",
    ],
  },
  {
    title: "7. Durée et renouvellement",
    text: "Les abonnements sont souscrits pour une durée d'un mois (ou d'un an pour les offres annuelles) à compter de la date de souscription, et se renouvellent automatiquement par tacite reconduction. Chaque renouvellement donne lieu à un nouveau prélèvement à la date anniversaire de l'abonnement.",
  },
  {
    title: "8. Résiliation",
    bullets: [
      "Le client peut résilier son abonnement à tout moment depuis les paramètres de son compte.",
      "La résiliation prend effet à la fin de la période d'abonnement en cours : le service reste accessible et aucun prélèvement supplémentaire n'est effectué au titre de la période suivante.",
      "Exemple : un client ayant payé le 1er janvier bénéficie du service jusqu'au 31 janvier et ne sera pas prélevé le 1er février.",
      "La période en cours à la date de résiliation n'est pas remboursée, quelle que soit la date de la demande dans le mois.",
      "Beassisted se réserve le droit de résilier immédiatement l'accès au service en cas de violation des CGU ou des CGV, de fraude avérée, ou de non-paiement persistant.",
    ],
  },
  {
    title: "9. Responsabilité",
    text: "Beassisted s'engage à fournir le service avec soin et diligence. Sa responsabilité est limitée aux seuls dommages directs et prévisibles causés par un manquement avéré à ses obligations contractuelles, et plafonnée au montant des sommes versées par le client au cours des 3 derniers mois précédant le fait générateur.",
  },
  {
    title: "10. Force majeure",
    text: "Beassisted ne pourra être tenu responsable d'un retard ou d'une inexécution lorsque la cause est liée à un cas de force majeure tel que défini par la jurisprudence française (catastrophe naturelle, défaillance des réseaux, cyberattaque, grève, pandémie, etc.).",
  },
  {
    title: "11. Données personnelles",
    text: "Les données personnelles collectées lors de la souscription sont traitées conformément au RGPD et à la Politique de Confidentialité de Beassisted. Elles sont utilisées pour la gestion du contrat et la facturation. Le client dispose d'un droit d'accès, de rectification et de suppression de ses données.",
  },
  {
    title: "12. Programme d'affiliation — conditions de rémunération",
    bullets: [
      "Beassisted propose un programme d'affiliation accessible gratuitement depuis beassistwebapp.fr/affiliation. L'inscription vaut acceptation des présentes CGV ainsi que des Conditions Générales d'Utilisation.",
      "Taux de commission : 20 % HT calculés sur le montant hors taxes de chaque échéance d'abonnement payant (mensuel ou annuel) générée par un filleul ayant souscrit via le lien de parrainage unique de l'affilié. La commission est récurrente tant que le filleul reste abonné à une offre payante.",
      "Versement : les commissions sont réglées par virement bancaire (IBAN / BIC) le 5 de chaque mois pour les commissions acquises au cours du mois civil précédent. Tout virement est conditionné à la fourniture préalable et valide des coordonnées bancaires (IBAN + BIC + titulaire) dans l'espace affilié.",
      "Seuil minimum de versement : 50 € HT. En dessous de ce seuil, les commissions sont reportées au(x) mois suivant(s) jusqu'à atteindre le montant minimum.",
      "Conditions d'acquisition : une commission n'est définitivement acquise qu'à l'issue d'un délai de 30 jours suivant le paiement du filleul, sous réserve qu'aucune demande de remboursement ni rétractation ne soit intervenue. En cas d'annulation ou de remboursement, la commission correspondante est annulée ou déduite des versements à venir.",
      "Fiscalité : les commissions versées constituent un revenu imposable dont la déclaration et le paiement des cotisations sociales et fiscales incombent exclusivement à l'affilié. Beassisted se réserve le droit de communiquer aux autorités compétentes les informations relatives aux sommes versées, conformément aux obligations légales en vigueur.",
      "Modification du programme : Beassisted peut modifier le taux de commission, le seuil de versement ou les conditions du programme avec un préavis de 30 jours adressé à l'affilié par e-mail. La poursuite de l'activité d'affiliation après ce délai vaut acceptation des nouvelles conditions.",
      "Résiliation : l'affilié peut clôturer son compte à tout moment depuis son espace. Les commissions acquises et supérieures au seuil minimum seront versées au prochain cycle de paiement. Beassisted peut résilier un compte affilié sans préavis en cas de fraude, auto-parrainage, violation des CGU/CGV ou inactivité prolongée supérieure à 24 mois.",
    ],
  },
  {
    title: "13. Litiges et droit applicable",
    text: "Les présentes CGV sont soumises au droit français. En cas de litige, les parties s'engagent à rechercher une solution amiable avant tout recours judiciaire. À défaut d'accord amiable dans un délai de 30 jours, le litige sera porté devant les tribunaux compétents du ressort du Tribunal de Commerce de Créteil.",
  },
];

export const metadata = {
  title: "Conditions Générales de Vente — Beassisted",
  description: "CGV de la plateforme Beassist par Beassisted SASU.",
};

export default function CGV() {
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
            Conditions Générales de Vente
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

              {s.plans && (
                <div className="mt-3 space-y-3">
                  {PLANS.map((p) => (
                    <div
                      key={p.name}
                      className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <span className="text-sm font-semibold text-slate-800">
                          {p.name}
                        </span>
                        <span className="text-xs font-medium text-[#8F00FF]">
                          {p.price}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        {p.description}
                      </p>
                    </div>
                  ))}
                </div>
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
                      <dt className="w-44 shrink-0 text-sm font-medium text-slate-500">
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
          <Link href="/legal" className="transition hover:text-[#8F00FF]">
            Mentions légales
          </Link>
          <span>·</span>
          <Link href="/cgu" className="transition hover:text-[#8F00FF]">
            CGU
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
