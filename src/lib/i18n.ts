export type Language = "fr" | "en";

export const fr = {
  nav: {
    features: "Fonctionnalités",
    howItWorks: "Comment ça marche",
    pricing: "Tarifs",
    signIn: "Se connecter",
    getStarted: "Commencer gratuitement",
    dashboard: "Tableau de bord",
  },
  hero: {
    badge: "La plateforme bio link tout-en-un",
    heading1: "Tous vos liens.",
    heading2: "Un seul endroit.",
    subheading:
      "Créez votre page bio personnalisée, raccourcissez vos liens et partagez-les sur tous vos réseaux sociaux en un clic.",
    subheadingStrong: "Simple, rapide, efficace.",
    cta1: "Commencer gratuitement",
    cta2: "Voir comment ça marche",
    socialProof: "+10 000 créateurs nous font confiance",
  },
  features: {
    badge: "✨ Fonctionnalités",
    heading1: "Tout ce dont vous avez besoin,",
    heading2: "rien de plus.",
    subheading:
      "BeassistLink concentre tous les outils dont un créateur de contenu a besoin dans une interface simple et élégante.",
    items: [
      {
        title: "Page Bio Élégante",
        description:
          "Regroupez tous vos réseaux sociaux en une seule page personnalisée et partageable. Instagrammers, YouTubeurs, entrepreneurs — c'est fait pour vous.",
      },
      {
        title: "Liens Raccourcis",
        description:
          "Transformez n'importe quelle URL longue en un lien court et mémorable. Partagez-le partout, mesurez chaque clic.",
      },
      {
        title: "Analytiques Détaillées",
        description:
          "Suivez les performances de vos liens en temps réel. Pays, appareils, navigateurs, sources — tout est là.",
      },
      {
        title: "Personnalisation Totale",
        description:
          "Choisissez parmi nos thèmes premium ou créez le vôtre avec vos propres couleurs. Votre marque, votre identité.",
      },
      {
        title: "Codes QR Instantanés",
        description:
          "Générez un QR code unique pour chaque lien ou page bio. Parfait pour les affiches, cartes de visite et flyers.",
      },
      {
        title: "Sécurité & Fiabilité",
        description:
          "Vos données sont chiffrées et vos liens disponibles 24h/24. Infrastructure robuste avec 99.9% de disponibilité.",
      },
    ],
  },
  howItWorks: {
    badge: "🚀 Comment ça marche",
    heading1: "En 3 étapes simples,",
    heading2: "vous êtes prêt.",
    subheading:
      "Pas besoin de compétences techniques. BeassistLink a été conçu pour être aussi simple qu'envoyer un email.",
    steps: [
      {
        title: "Créez votre compte",
        description:
          "Inscrivez-vous en quelques secondes. Aucune carte bancaire requise pour le plan gratuit.",
      },
      {
        title: "Ajoutez vos liens",
        description:
          "Ajoutez vos réseaux sociaux, sites web et liens raccourcis depuis votre tableau de bord intuitif.",
      },
      {
        title: "Partagez partout",
        description:
          "Copiez votre lien unique beassistlink.com/vous et partagez-le dans toutes vos biographies.",
      },
    ],
  },
  pricing: {
    badge: "💰 Tarifs transparents",
    heading1: "Commencez gratuitement,",
    heading2: "évoluez à votre rythme.",
    subheading:
      "Aucune surprise, pas de frais cachés. Annulez quand vous voulez.",
    monthly: "Mensuel",
    yearly: "Annuel",
    perMonth: "/mois",
    free: "Gratuit",
    billedYearly: "Facturé",
    perYear: "/an",
    save: "Économisez",
    note: "✓ Annulation à tout moment   ✓ Aucune carte requise pour l'offre gratuite   ✓ Migration facile entre les plans",
    plans: {
      FREE: {
        description: "Idéal pour découvrir la plateforme et créer votre première page bio.",
        ctaLabel: "Commencer gratuitement",
        features: [
          { label: "1 page bio", included: true },
          { label: "5 liens sociaux", included: true },
          { label: "3 liens raccourcis", included: true },
          { label: "1 thème de base", included: true },
          { label: "Branding BeassistLink", included: true },
          { label: "Analytiques", included: false },
          { label: "QR Code", included: false },
          { label: "Supprimer le branding", included: false },
          { label: "Alias personnalisé", included: false },
          { label: "Domaine personnalisé", included: false },
        ],
      },
      STARTER: {
        description: "Pour les créateurs de contenu qui souhaitent se démarquer et analyser leurs performances.",
        ctaLabel: "Commencer avec Starter",
        features: [
          { label: "3 pages bio", included: true },
          { label: "20 liens sociaux", included: true },
          { label: "20 liens raccourcis", included: true },
          { label: "5 thèmes premium", included: true },
          { label: "Supprimer le branding", included: true },
          { label: "Analytiques de base", included: true },
          { label: "Génération de QR codes", included: true },
          { label: "Alias personnalisé", included: true },
          { label: "Liens programmés", included: false },
          { label: "Domaine personnalisé", included: false },
        ],
      },
      PRO: {
        description: "La solution complète pour les professionnels et agences qui veulent tout contrôler.",
        ctaLabel: "Passer au Pro",
        features: [
          { label: "Pages bio illimitées", included: true },
          { label: "Liens sociaux illimités", included: true },
          { label: "Liens raccourcis illimités", included: true },
          { label: "Tous les thèmes + couleurs custom", included: true },
          { label: "Supprimer le branding", included: true },
          { label: "Analytiques avancées", included: true },
          { label: "QR codes illimités", included: true },
          { label: "Alias illimités", included: true },
          { label: "Liens programmés", included: true },
          { label: "Domaine personnalisé", included: true },
          { label: "Accès API", included: true },
          { label: "Support prioritaire", included: true },
        ],
      },
    },
  },
  testimonials: {
    badge: "❤️ Ils nous font confiance",
    heading1: "Des milliers de créateurs",
    heading2: "nous adorent.",
    subheading:
      "Rejoignez une communauté de créateurs, entrepreneurs et marques qui utilisent BeassistLink au quotidien.",
    items: [
      {
        text: "BeassistLink a complètement changé ma façon de partager mes réseaux. Ma page bio est magnifique et mes abonnés adorent !",
      },
      {
        text: "En tant que freelance, j'utilise BeassistLink pour centraliser tous mes portfolios et réseaux. C'est devenu indispensable.",
      },
      {
        text: "Les analytiques Pro m'ont aidé à comprendre d'où viennent mes clics. J'ai augmenté mon engagement de 40% en 2 mois !",
      },
      {
        text: "Simple, rapide, efficace. Exactement ce qu'il me fallait. Le plan gratuit est déjà très généreux pour commencer.",
      },
      {
        text: "Je partage mes créations sur 5 plateformes différentes. Avec BeassistLink, mes fans n'ont qu'un seul lien à retenir.",
      },
      {
        text: "La génération de QR codes me permet de mettre mon lien bio sur tous mes flyers. Mes streams Twitch ont explosé.",
      },
    ],
  },
  cta: {
    badge: "✨ Rejoignez +10 000 créateurs",
    heading1: "Prêt à centraliser",
    heading2: "tous vos liens ?",
    subheading:
      "Créez votre page bio gratuitement en moins de 2 minutes. Aucune carte bancaire requise.",
    cta1: "Commencer gratuitement",
    cta2: "Voir les tarifs",
  },
  footer: {
    tagline:
      "La plateforme tout-en-un pour créer votre page bio et gérer vos liens raccourcis.",
    madeWith: "Fait avec",
    inFrance: "en France 🇫🇷",
    copyright: "Tous droits réservés.",
    legalNotice: "Mentions légales",
    categories: {
      Produit: "Produit",
      Entreprise: "Entreprise",
      Support: "Support",
      Légal: "Légal",
    },
    links: {
      Fonctionnalités: "Fonctionnalités",
      Tarifs: "Tarifs",
      Changelog: "Changelog",
      API: "API",
      "À propos": "À propos",
      Blog: "Blog",
      Carrières: "Carrières",
      Presse: "Presse",
      Documentation: "Documentation",
      "Centre d'aide": "Centre d'aide",
      Statut: "Statut",
      Contact: "Contact",
      Confidentialité: "Confidentialité",
      "Conditions d'utilisation": "Conditions d'utilisation",      "CGU": "CGU",      Cookies: "Cookies",
      RGPD: "RGPD",
      "Mentions légales": "Mentions légales",
    },
  },
};

export const en: typeof fr = {
  nav: {
    features: "Features",
    howItWorks: "How it works",
    pricing: "Pricing",
    signIn: "Sign in",
    getStarted: "Get started for free",
    dashboard: "Dashboard",
  },
  hero: {
    badge: "The all-in-one bio link platform",
    heading1: "All your links.",
    heading2: "One single place.",
    subheading:
      "Create your personalized bio page, shorten your links and share them across all your social networks in one click.",
    subheadingStrong: "Simple, fast, effective.",
    cta1: "Get started for free",
    cta2: "See how it works",
    socialProof: "+10,000 creators trust us",
  },
  features: {
    badge: "✨ Features",
    heading1: "Everything you need,",
    heading2: "nothing more.",
    subheading:
      "BeassistLink brings together all the tools a content creator needs in a simple and elegant interface.",
    items: [
      {
        title: "Elegant Bio Page",
        description:
          "Gather all your social networks on one personalized, shareable page. Instagrammers, YouTubers, entrepreneurs — built for you.",
      },
      {
        title: "Short Links",
        description:
          "Turn any long URL into a short, memorable link. Share it everywhere, measure every click.",
      },
      {
        title: "Detailed Analytics",
        description:
          "Track your link performance in real time. Countries, devices, browsers, sources — all in one place.",
      },
      {
        title: "Full Customization",
        description:
          "Choose from our premium themes or create your own with custom colors. Your brand, your identity.",
      },
      {
        title: "Instant QR Codes",
        description:
          "Generate a unique QR code for every link or bio page. Perfect for posters, business cards, and flyers.",
      },
      {
        title: "Security & Reliability",
        description:
          "Your data is encrypted and your links available 24/7. Robust infrastructure with 99.9% uptime.",
      },
    ],
  },
  howItWorks: {
    badge: "🚀 How it works",
    heading1: "3 simple steps,",
    heading2: "and you're ready.",
    subheading:
      "No technical skills needed. BeassistLink was designed to be as easy as sending an email.",
    steps: [
      {
        title: "Create your account",
        description:
          "Sign up in seconds. No credit card required for the free plan.",
      },
      {
        title: "Add your links",
        description:
          "Add your social networks, websites and short links from your intuitive dashboard.",
      },
      {
        title: "Share everywhere",
        description:
          "Copy your unique link beassistlink.com/you and share it in all your bios.",
      },
    ],
  },
  pricing: {
    badge: "💰 Transparent pricing",
    heading1: "Start for free,",
    heading2: "grow at your own pace.",
    subheading: "No surprises, no hidden fees. Cancel anytime.",
    monthly: "Monthly",
    yearly: "Yearly",
    perMonth: "/mo",
    free: "Free",
    billedYearly: "Billed",
    perYear: "/yr",
    save: "Save",
    note: "✓ Cancel anytime   ✓ No card required for the free plan   ✓ Easy plan migration",
    plans: {
      FREE: {
        description: "Perfect to discover the platform and create your first bio page.",
        ctaLabel: "Get started for free",
        features: [
          { label: "1 bio page", included: true },
          { label: "5 social links", included: true },
          { label: "3 short links", included: true },
          { label: "1 basic theme", included: true },
          { label: "BeassistLink branding", included: true },
          { label: "Analytics", included: false },
          { label: "QR Code", included: false },
          { label: "Remove branding", included: false },
          { label: "Custom alias", included: false },
          { label: "Custom domain", included: false },
        ],
      },
      STARTER: {
        description: "For content creators who want to stand out and track their performance.",
        ctaLabel: "Start with Starter",
        features: [
          { label: "3 bio pages", included: true },
          { label: "20 social links", included: true },
          { label: "20 short links", included: true },
          { label: "5 premium themes", included: true },
          { label: "Remove branding", included: true },
          { label: "Basic analytics", included: true },
          { label: "QR code generation", included: true },
          { label: "Custom alias", included: true },
          { label: "Scheduled links", included: false },
          { label: "Custom domain", included: false },
        ],
      },
      PRO: {
        description: "The complete solution for professionals and agencies who want full control.",
        ctaLabel: "Go Pro",
        features: [
          { label: "Unlimited bio pages", included: true },
          { label: "Unlimited social links", included: true },
          { label: "Unlimited short links", included: true },
          { label: "All themes + custom colors", included: true },
          { label: "Remove branding", included: true },
          { label: "Advanced analytics", included: true },
          { label: "Unlimited QR codes", included: true },
          { label: "Unlimited aliases", included: true },
          { label: "Scheduled links", included: true },
          { label: "Custom domain", included: true },
          { label: "API access", included: true },
          { label: "Priority support", included: true },
        ],
      },
    },
  },
  testimonials: {
    badge: "❤️ They trust us",
    heading1: "Thousands of creators",
    heading2: "love us.",
    subheading:
      "Join a community of creators, entrepreneurs and brands who use BeassistLink every day.",
    items: [
      {
        text: "BeassistLink completely changed the way I share my networks. My bio page looks amazing and my followers love it!",
      },
      {
        text: "As a freelancer, I use BeassistLink to centralize all my portfolios and social networks. It's become indispensable.",
      },
      {
        text: "The Pro analytics helped me understand where my clicks come from. I increased my engagement by 40% in 2 months!",
      },
      {
        text: "Simple, fast, effective. Exactly what I needed. The free plan is already very generous to get started.",
      },
      {
        text: "I share my creations on 5 different platforms. With BeassistLink, my fans only need to remember one link.",
      },
      {
        text: "QR code generation lets me put my bio link on all my flyers. My Twitch streams have exploded.",
      },
    ],
  },
  cta: {
    badge: "✨ Join +10,000 creators",
    heading1: "Ready to centralize",
    heading2: "all your links?",
    subheading:
      "Create your bio page for free in under 2 minutes. No credit card required.",
    cta1: "Get started for free",
    cta2: "See pricing",
  },
  footer: {
    tagline:
      "The all-in-one platform to create your bio page and manage your short links.",
    madeWith: "Made with",
    inFrance: "in France 🇫🇷",
    copyright: "All rights reserved.",
    legalNotice: "Legal Notice",
    categories: {
      Produit: "Product",
      Entreprise: "Company",
      Support: "Support",
      Légal: "Legal",
    },
    links: {
      Fonctionnalités: "Features",
      Tarifs: "Pricing",
      Changelog: "Changelog",
      API: "API",
      "À propos": "About",
      Blog: "Blog",
      Carrières: "Careers",
      Presse: "Press",
      Documentation: "Documentation",
      "Centre d'aide": "Help Center",
      Statut: "Status",
      Contact: "Contact",
      Confidentialité: "Privacy",
      "Conditions d'utilisation": "Terms of Service",      "CGU": "Terms of Use",      Cookies: "Cookies",
      RGPD: "GDPR",
      "Mentions légales": "Legal Notice",
    },
  },
};

export const translations = { fr, en };
export type Translations = typeof fr;
