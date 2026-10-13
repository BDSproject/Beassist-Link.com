import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal/legal-doc";

const BASE = "https://www.beassist-link.com";

export const metadata: Metadata = {
  title: "Privacy Policy (US & CCPA) | BeassistLink",
  description:
    "BeassistLink privacy policy for US users, including California Consumer Privacy Act (CCPA) rights: data we collect, how we use it, and how to exercise your rights.",
  alternates: {
    canonical: `${BASE}/en/privacy`,
    languages: {
      "en": `${BASE}/en/privacy`,
      "fr": `${BASE}/privacy`,
      "x-default": `${BASE}/privacy`,
    },
  },
};

const sections = [
  {
    title: "1. Introduction",
    content: [
      "This Privacy Policy describes how **Beassisted SASU** (\"BeassistLink\", \"we\", \"us\") collects, uses, shares and protects personal information when you use the BeassistLink website and services (the \"Service\").",
      "This policy is intended for users in the United States. If you are located in the European Economic Area, the United Kingdom or Switzerland, please also see our GDPR information at **/gdpr**.",
    ],
  },
  {
    title: "2. Information We Collect",
    content: [
      "We collect the following categories of personal information:",
      "• **Identifiers** — name, email address, username, and (if you provide it) profile photo",
      "• **Account information** — hashed password, account settings and subscription plan",
      "• **Content you create** — the links, bio description and media you add to your page",
      "• **Payment information** — processed by our payment provider (Stripe); we do not store your full card number",
      "• **Usage data** — pages viewed, clicks, referring sources, device and browser type, IP address (used for analytics and security)",
      "• **Communications** — messages you send to our support team",
    ],
  },
  {
    title: "3. How We Use Your Information",
    content: [
      "We use your personal information to:",
      "• Provide, maintain and improve the Service",
      "• Create and manage your account",
      "• Process payments and subscriptions",
      "• Send transactional emails (account verification, password reset) and, where applicable, service announcements",
      "• Provide analytics to you (clicks, traffic sources)",
      "• Detect and prevent fraud, abuse and security incidents",
      "• Comply with legal obligations",
    ],
  },
  {
    title: "4. How We Share Your Information",
    content: [
      "We do **not sell** your personal information.",
      "We may share personal information with:",
      "• **Service providers** — hosting (Vercel), payments (Stripe), email delivery (Resend), and analytics, each bound by contract to process data only on our behalf",
      "• **Legal authorities** — when required by law or to protect our rights and users",
      "• **Business transfers** — in connection with a merger, acquisition or sale of assets",
    ],
  },
  {
    title: "5. Cookies and Tracking Technologies",
    content: [
      "We use strictly necessary cookies (authentication, language preferences) and, with your consent, analytics cookies to understand how the Service is used. Analytics data is aggregated and does not identify you directly.",
      "You can manage cookie preferences through our cookie banner and your browser settings.",
    ],
  },
  {
    title: "6. Data Retention",
    content: [
      "We retain your personal information for as long as your account is active, and for a reasonable period thereafter as needed for legal, tax or security purposes. You may delete your account at any time from your dashboard, after which we delete your data within 30 days, except where retention is required by law.",
    ],
  },
  {
    title: "7. Security",
    content: [
      "We use industry-standard technical and organizational measures to protect your personal information, including encryption in transit (TLS) and at rest, access controls, and regular review of our practices. No method of transmission or storage is 100% secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    title: "8. Your Choices and Rights",
    content: [
      "Depending on your state of residence, you may have the right to access, correct, delete or obtain a copy of your personal information, and to opt out of certain processing. You can update or delete most information directly in your dashboard.",
      "To exercise any right, email us at **contact@beassist-link.com**. We will respond within the time required by law and may verify your identity before acting.",
    ],
  },
  {
    title: "9. California Residents (CCPA / CPRA)",
    content: [
      "This section supplements the rest of this policy and applies to residents of California under the **California Consumer Privacy Act**, as amended by the **California Privacy Rights Act**.",
      "**Categories of personal information collected in the past 12 months:** identifiers (name, email), account information, content you create, payment information (via Stripe), usage data and communications. See Section 2.",
      "**Categories sold or shared:** We do **not sell** your personal information and do **not share** it for cross-context behavioral advertising.",
      "**Your California rights:**",
      "• **Right to Know** — request the categories and specific pieces of personal information we have collected about you",
      "• **Right to Delete** — request deletion of your personal information, subject to legal exceptions",
      "• **Right to Correct** — request correction of inaccurate personal information",
      "• **Right to Opt-Out of Sale or Sharing** — we do not sell or share, so no opt-out is required, but you may still submit a request",
      "• **Right to Limit Use of Sensitive Personal Information** — we do not collect or use sensitive personal information for purposes that would trigger this right",
      "• **Right to Non-Discrimination** — we will not discriminate against you for exercising any of these rights",
      "**How to exercise your rights:** email **contact@beassist-link.com** with the subject \"California Privacy Request\". You may designate an authorized agent to make a request on your behalf. We will verify your identity and respond within 45 days (extendable by 45 days where permitted).",
      "**Do Not Track:** we do not currently respond to browser \"Do Not Track\" signals.",
    ],
  },
  {
    title: "10. Children's Privacy (COPPA)",
    content: [
      "The Service is not directed to children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child under 13 has provided us with personal information, contact us and we will delete it.",
    ],
  },
  {
    title: "11. International Data Transfers",
    content: [
      "Your data is hosted in the European Union. If we transfer personal information to service providers outside your country, we use appropriate safeguards (such as standard contractual clauses) to protect it.",
    ],
  },
  {
    title: "12. Changes to this Policy",
    content: [
      "We may update this Privacy Policy from time to time. The \"Last updated\" date at the top of this page will be revised accordingly. Material changes will be announced on the Service.",
    ],
  },
  {
    title: "13. Contact Us",
    content: [
      "For any question about this Privacy Policy or your personal information, contact us at: **contact@beassist-link.com** — Beassisted SASU, 9 Rue de Paris, 94450 Limeil-Brévannes, France.",
    ],
  },
];

export default function EnPrivacyPage() {
  return (
    <LegalDoc
      title="Privacy Policy"
      updatedAt="Last updated: September 2026"
      sections={sections}
    />
  );
}
