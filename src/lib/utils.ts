import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date, locale = "fr-FR") {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toString();
}

export function formatPrice(
  amount: number,
  currency = "EUR",
  locale = "fr-FR"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export function generateSlug(length = 6): string {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 30);
}

export function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max) + "…" : str;
}

export const SOCIAL_PLATFORMS = [
  { id: "instagram", label: "Instagram", color: "#E1306C" },
  { id: "tiktok", label: "TikTok", color: "#000000" },
  { id: "youtube", label: "YouTube", color: "#FF0000" },
  { id: "twitter", label: "X (Twitter)", color: "#1DA1F2" },
  { id: "facebook", label: "Facebook", color: "#1877F2" },
  { id: "linkedin", label: "LinkedIn", color: "#0A66C2" },
  { id: "github", label: "GitHub", color: "#333333" },
  { id: "twitch", label: "Twitch", color: "#9146FF" },
  { id: "spotify", label: "Spotify", color: "#1DB954" },
  { id: "discord", label: "Discord", color: "#5865F2" },
  { id: "snapchat", label: "Snapchat", color: "#FFFC00" },
  { id: "pinterest", label: "Pinterest", color: "#E60023" },
  { id: "behance", label: "Behance", color: "#1769FF" },
  { id: "dribbble", label: "Dribbble", color: "#EA4C89" },
  { id: "website", label: "Site web", color: "#8F00FF" },
  { id: "email", label: "Email", color: "#EA4335" },
  { id: "phone", label: "Téléphone", color: "#34A853" },
  { id: "whatsapp", label: "WhatsApp", color: "#25D366" },
  { id: "telegram", label: "Telegram", color: "#2CA5E0" },
  { id: "other", label: "Autre", color: "#8F00FF" },
  // === Plateformes adultes ===
  { id: "onlyfans", label: "OnlyFans", color: "#00AFF0" },
  { id: "mym", label: "MYM", color: "#FF3366" },
  { id: "fansly", label: "Fansly", color: "#0090FF" },
  { id: "patreon", label: "Patreon", color: "#FF424D" },
] as const;

export function getPlatformColor(platform: string): string {
  const found = SOCIAL_PLATFORMS.find((p) => p.id === platform);
  return found?.color ?? "#8F00FF";
}

export function getPlatformLabel(platform: string): string {
  const found = SOCIAL_PLATFORMS.find((p) => p.id === platform);
  return found?.label ?? platform;
}

/** Detect social platform from a URL (used for short-link icons) */
export function detectPlatformFromUrl(url: string): string {
  try {
    const host = new URL(url).hostname.toLowerCase().replace(/^www\./, "");
    if (host.includes("instagram.com")) return "instagram";
    if (host.includes("tiktok.com")) return "tiktok";
    if (host.includes("youtube.com") || host.includes("youtu.be")) return "youtube";
    if (host.includes("twitter.com") || host.includes("x.com")) return "twitter";
    if (host.includes("facebook.com") || host.includes("fb.com")) return "facebook";
    if (host.includes("linkedin.com")) return "linkedin";
    if (host.includes("github.com")) return "github";
    if (host.includes("twitch.tv")) return "twitch";
    if (host.includes("spotify.com")) return "spotify";
    if (host.includes("discord.gg") || host.includes("discord.com")) return "discord";
    if (host.includes("snapchat.com")) return "snapchat";
    if (host.includes("pinterest.")) return "pinterest";
    if (host.includes("behance.net")) return "behance";
    if (host.includes("dribbble.com")) return "dribbble";
    if (host.includes("wa.me") || host.includes("whatsapp.com")) return "whatsapp";
    if (host.includes("t.me") || host.includes("telegram.org") || host.includes("telegram.me")) return "telegram";
    if (host.includes("onlyfans.com")) return "onlyfans";
    if (host.includes("mym.fans")) return "mym";
    if (host.includes("fansly.com")) return "fansly";
    if (host.includes("patreon.com")) return "patreon";
    return "other";
  } catch {
    return "other";
  }
}

export function getDeviceType(userAgent: string): string {
  if (/mobile/i.test(userAgent)) return "Mobile";
  if (/tablet|ipad/i.test(userAgent)) return "Tablette";
  return "Desktop";
}

export function getBrowserName(userAgent: string): string {
  if (/chrome/i.test(userAgent) && !/edg/i.test(userAgent)) return "Chrome";
  if (/firefox/i.test(userAgent)) return "Firefox";
  if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) return "Safari";
  if (/edg/i.test(userAgent)) return "Edge";
  if (/opera|opr/i.test(userAgent)) return "Opera";
  return "Autre";
}
