import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal/legal-doc";

const BASE = "https://www.beassist-link.com";

export const metadata: Metadata = {
  title: "Terms of Service | BeassistLink",
  description:
    "BeassistLink Terms of Service for US users: accounts, acceptable use, payments, liability, governing law and dispute resolution.",
  alternates: {
    canonical: `${BASE}/en/terms`,
    languages: {
      "en": `${BASE}/en/terms`,
      "fr": `${BASE}/cgu`,
      "x-default": `${BASE}/cgu`,
    },
  },
};

const sections = [
  {
    title: "1. Acceptance of these Terms",
    content: [
      "These Terms of Service (the \"Terms\") govern your access to and use of the BeassistLink website, applications and services (the \"Service\"), operated by **Beassisted SASU**, a French company (\"BeassistLink\", \"we\", \"us\" or \"our\").",
      "By creating an account or using the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.",
      "The Service is intended for users in the United States. If you access it from another country, you are responsible for complying with your local laws.",
    ],
  },
  {
    title: "2. The Service",
    content: [
      "BeassistLink provides tools to create a link-in-bio page, shorten links, generate QR codes and view click analytics from a single dashboard.",
      "We may add, change or remove features at any time. We will use reasonable efforts to notify you of material changes.",
    ],
  },
  {
    title: "3. Accounts and Eligibility",
    content: [
      "You must be at least **18 years old** (or the age of majority in your state) to create an account.",
      "You are responsible for keeping your login credentials confidential and for all activity that occurs under your account. Notify us immediately at **contact@beassist-link.com** if you believe your account has been compromised.",
      "You must provide accurate and current information when you register, including a valid email address.",
    ],
  },
  {
    title: "4. Acceptable Use",
    content: [
      "You agree not to use the Service to:",
      "• Violate any applicable law or regulation",
      "• Infringe the intellectual property or privacy rights of others",
      "• Publish unlawful, defamatory, harassing or deceptive content",
      "• Distribute malware, spam or other harmful or unsolicited content",
      "• Attempt to gain unauthorized access to the Service, other users' accounts or our systems",
      "• Resell or sublicense the Service without our prior written consent",
      "You are solely responsible for the links you share and the content you publish through the Service.",
    ],
  },
  {
    title: "5. User Content",
    content: [
      "You retain ownership of the content you upload or publish through the Service (\"User Content\").",
      "By publishing User Content, you grant us a limited, non-exclusive, worldwide license to store, display and process it solely to provide the Service to you.",
      "We may remove User Content that violates these Terms or applicable law.",
    ],
  },
  {
    title: "6. Fees and Payments",
    content: [
      "The Service offers a free plan and paid plans (Starter and Pro). Paid plans are billed through our payment provider (Stripe) on a monthly or annual basis.",
      "Fees are stated in US dollars (USD) unless otherwise indicated, and are non-refundable except as required by law.",
      "You may cancel your subscription at any time; cancellation takes effect at the end of the current billing period.",
      "We may change fees with at least 30 days' advance notice; the new fees apply to the next renewal.",
    ],
  },
  {
    title: "7. Intellectual Property",
    content: [
      "The Service, including its software, design, text, graphics, logos and trademarks, is the property of Beassisted SASU or its licensors and is protected by intellectual property laws.",
      "We grant you a limited, non-exclusive, non-transferable, revocable license to use the Service in accordance with these Terms.",
    ],
  },
  {
    title: "8. Disclaimer of Warranties",
    content: [
      "THE SERVICE IS PROVIDED \"AS IS\" AND \"AS AVAILABLE\", WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.",
      "We do not warrant that the Service will be uninterrupted, error-free or secure.",
    ],
  },
  {
    title: "9. Limitation of Liability",
    content: [
      "TO THE MAXIMUM EXTENT PERMITTED BY LAW, BEASSISTED SASU SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, DATA OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE.",
      "OUR TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNTS YOU PAID TO US IN THE 12 MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED US DOLLARS ($100).",
      "Some jurisdictions do not allow certain limitations of liability; these limitations apply to you only to the extent permitted by applicable law.",
    ],
  },
  {
    title: "10. Indemnification",
    content: [
      "You agree to indemnify and hold harmless Beassisted SASU and its officers, directors, employees and agents from any claims, damages or expenses (including reasonable attorneys' fees) arising out of your use of the Service, your User Content, or your violation of these Terms or applicable law.",
    ],
  },
  {
    title: "11. Termination",
    content: [
      "You may stop using the Service at any time and delete your account from your dashboard.",
      "We may suspend or terminate your access if you breach these Terms, with reasonable notice where practicable.",
      "Provisions that by their nature should survive termination (including Sections 7, 8, 9, 10 and 12) will survive.",
    ],
  },
  {
    title: "12. Governing Law and Dispute Resolution",
    content: [
      "These Terms are governed by the laws of the **State of Delaware**, United States, without regard to its conflict-of-law principles, and excluding the United Nations Convention on Contracts for the International Sale of Goods.",
      "For any dispute, we encourage you to contact us first at **contact@beassist-link.com**; we will make a good-faith effort to resolve it informally.",
      "If a dispute cannot be resolved informally, it shall be resolved by binding individual arbitration administered in accordance with the rules of the American Arbitration Association, in Wilmington, Delaware, unless you opt out as described below. You may bring claims in small claims court if they qualify.",
      "**Class action waiver:** to the fullest extent permitted by law, all disputes shall be resolved on an individual basis, and you waive any right to participate in a class action or other collective proceeding.",
      "You may opt out of the arbitration provision within 30 days of first accepting these Terms by emailing us at **contact@beassist-link.com** with the subject \"Arbitration Opt-Out\".",
    ],
  },
  {
    title: "13. Changes to these Terms",
    content: [
      "We may update these Terms from time to time. Material changes will be announced on the Service or by email. Continued use of the Service after the changes take effect constitutes your acceptance of the revised Terms.",
    ],
  },
  {
    title: "14. Contact",
    content: [
      "Questions about these Terms may be sent to: **contact@beassist-link.com** — Beassisted SASU, 9 Rue de Paris, 94450 Limeil-Brévannes, France.",
    ],
  },
];

export default function EnTermsPage() {
  return (
    <LegalDoc
      title="Terms of Service"
      updatedAt="Last updated: September 2026"
      sections={sections}
    />
  );
}
