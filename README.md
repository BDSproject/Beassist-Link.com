# Linkassisted

**Linkassisted** est une plateforme SaaS de liens raccourcis et de pages bio (link-in-bio), construite avec Next.js 14, TypeScript, Prisma et Stripe.

🌐 **Domaine** : linkassisted.com

---

## ✨ Fonctionnalités

- 🔗 **Liens raccourcis** — Créez des liens courts avec votre propre domaine
- 📄 **Page Bio** — Regroupez tous vos réseaux sociaux en un seul lien
- 📊 **Analytics** — Suivez vos clics et performances (plans payants)
- 🎨 **Personnalisation** — Couleurs, thèmes, avatars
- 💳 **Abonnements Stripe** — 3 plans (Free, Starter, Pro)
- 🔐 **Auth complète** — Email/password, Google, GitHub

---

## 🚀 Stack Technique

| Technologie | Usage |
|---|---|
| **Next.js 14** | Framework fullstack (App Router) |
| **TypeScript** | Typage statique |
| **Tailwind CSS** | Styles |
| **Prisma** | ORM |
| **PostgreSQL** | Base de données |
| **NextAuth.js** | Authentification |
| **Stripe** | Paiements et abonnements |
| **Zod** | Validation des données |

---

## 📦 Installation

### 1. Prérequis

- Node.js 18+
- PostgreSQL (local ou cloud via [Supabase](https://supabase.com), [Neon](https://neon.tech), etc.)
- Compte [Stripe](https://stripe.com)
- Compte [Google Cloud Console](https://console.cloud.google.com) (pour OAuth Google)
- Compte [GitHub OAuth Apps](https://github.com/settings/developers) (pour OAuth GitHub)

### 2. Cloner le projet

```bash
git clone https://github.com/votre-username/linkassisted.git
cd linkassisted
```

### 3. Installer les dépendances

```bash
npm install
```

### 4. Configurer les variables d'environnement

```bash
cp .env.example .env
```

Remplissez les variables dans `.env` :

```env
# Base de données
DATABASE_URL="postgresql://user:password@localhost:5432/linkassisted"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-secret-nextauth"  # openssl rand -base64 32

# Google OAuth (optionnel)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# GitHub OAuth (optionnel)
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Prix Stripe (créez les produits dans le dashboard Stripe)
STRIPE_STARTER_MONTHLY_PRICE_ID="price_..."
STRIPE_STARTER_ANNUAL_PRICE_ID="price_..."
STRIPE_PRO_MONTHLY_PRICE_ID="price_..."
STRIPE_PRO_ANNUAL_PRICE_ID="price_..."

# URL publique
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 5. Configurer la base de données

```bash
# Générer le client Prisma
npm run db:generate

# Pousser le schéma vers la base de données
npm run db:push

# Optionnel : Peupler avec des données de démonstration
npm run db:seed
```

### 6. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) 🎉

---

## 💳 Configuration Stripe

### Créer les produits

1. Allez dans votre [Dashboard Stripe](https://dashboard.stripe.com/products)
2. Créez un produit **Starter** avec 2 prix :
   - Mensuel : 5€/mois → notez le `price_xxx`
   - Annuel : 54€/an → notez le `price_xxx`
3. Créez un produit **Pro** avec 2 prix :
   - Mensuel : 10€/mois → notez le `price_xxx`
   - Annuel : 108€/an → notez le `price_xxx`
4. Ajoutez les IDs dans votre `.env`

### Configurer le webhook

```bash
# Installer la CLI Stripe
brew install stripe/stripe-cli/stripe

# Écouter les webhooks en local
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copiez le `whsec_...` affiché et ajoutez-le dans `STRIPE_WEBHOOK_SECRET`.

---

## 🔐 Configuration OAuth

### Google

1. [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → Credentials
2. Créez un "OAuth 2.0 Client ID"
3. Redirect URI : `http://localhost:3000/api/auth/callback/google`
4. Copiez Client ID et Secret dans `.env`

### GitHub

1. [GitHub Settings](https://github.com/settings/developers) → OAuth Apps → New OAuth App
2. Homepage URL : `http://localhost:3000`
3. Callback URL : `http://localhost:3000/api/auth/callback/github`
4. Copiez Client ID et Secret dans `.env`

---

## 📁 Structure du projet

```
linkassisted/
├── prisma/
│   ├── schema.prisma          # Schéma base de données
│   └── seed.ts                # Données de démonstration
├── src/
│   ├── app/
│   │   ├── (auth)/            # Pages d'authentification
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/       # Dashboard (protégé)
│   │   │   └── dashboard/
│   │   │       ├── page.tsx   # Accueil dashboard
│   │   │       ├── links/     # Gestion des liens courts
│   │   │       ├── bio/       # Éditeur de page bio
│   │   │       ├── analytics/ # Analytics
│   │   │       ├── billing/   # Facturation
│   │   │       └── settings/  # Paramètres
│   │   ├── api/               # Routes API
│   │   │   ├── auth/          # NextAuth + inscription
│   │   │   ├── links/         # CRUD liens courts
│   │   │   ├── bio/           # CRUD page bio
│   │   │   ├── stripe/        # Checkout, webhook, portal
│   │   │   └── user/          # Profil, mot de passe, suppression
│   │   ├── r/[slug]/          # Redirection liens courts
│   │   ├── [username]/        # Page bio publique
│   │   ├── layout.tsx
│   │   ├── page.tsx           # Landing page
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                # Button, Input, Card, Badge
│   │   ├── shared/            # Logo
│   │   ├── landing/           # Sections landing page
│   │   └── dashboard/         # Sidebar
│   ├── lib/
│   │   ├── auth.ts            # NextAuth config
│   │   ├── db.ts              # Prisma client
│   │   ├── stripe.ts          # Stripe client
│   │   ├── utils.ts           # Utilitaires
│   │   └── plans.ts           # Config des plans
│   └── types/
│       └── next-auth.d.ts     # Types NextAuth étendus
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 💰 Plans tarifaires

| Fonctionnalité | Free | Starter (5€/mois) | Pro (10€/mois) |
|---|:---:|:---:|:---:|
| Pages bio | 1 | 3 | Illimité |
| Liens bio par page | 5 | 20 | Illimité |
| Liens raccourcis | 3 | 50 | Illimité |
| Analytics | ❌ | ✅ Basique | ✅ Avancé |
| QR Codes | ❌ | ✅ | ✅ |
| Alias personnalisés | ❌ | ✅ | ✅ |
| Domaine personnalisé | ❌ | ❌ | ✅ |
| Accès API | ❌ | ❌ | ✅ |
| Support prioritaire | ❌ | ❌ | ✅ |

> Réduction **-10%** sur les abonnements annuels.

---

## 🛠️ Scripts disponibles

```bash
npm run dev          # Démarrer en développement
npm run build        # Build de production
npm run start        # Lancer la production
npm run lint         # Linter ESLint
npm run db:generate  # Générer le client Prisma
npm run db:push      # Synchroniser le schéma
npm run db:studio    # Ouvrir Prisma Studio
npm run db:seed      # Peupler la base de données
```

---

## 👤 Comptes de démonstration (après `npm run db:seed`)

| Email | Mot de passe | Plan |
|---|---|---|
| demo@linkassisted.com | Demo1234! | FREE |
| pro@linkassisted.com | Demo1234! | PRO |

---

## 📄 Licence

MIT © 2024 Linkassisted
