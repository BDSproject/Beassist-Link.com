import {
  SiInstagram,
  SiFacebook,
  SiGithub,
  SiTwitch,
  SiSpotify,
  SiDiscord,
  SiSnapchat,
  SiPinterest,
  SiBehance,
  SiDribbble,
  SiWhatsapp,
  SiTelegram,
  SiOnlyfans,
  SiPatreon,
} from "react-icons/si";
import { FaTiktok, FaYoutube, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Globe, Mail, Phone, Link2 } from "lucide-react";

interface SocialIconProps {
  platform: string;
  size?: number;
  className?: string;
  /** Override icon color. Defaults to brand color. */
  color?: string;
}

type IconComponent = (props: { size?: number; className?: string; style?: React.CSSProperties }) => React.ReactElement | null;

// Icônes custom pour les plateformes sans icône react-icons

/** MYM : badge arrondi rose avec « mym » en blanc gras */
const MymIcon: IconComponent = ({ size = 20, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    {/* Fond badge arrondi : currentColor = #FF3366 (ou blanc sur fond sombre) */}
    <rect width="100" height="100" rx="22" fill="currentColor" />
    {/* Texte blanc centré */}
    <text
      x="50"
      y="50"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="34"
      fontWeight="900"
      fontFamily="&apos;Arial Black&apos;, Arial, sans-serif"
      fill="white"
      letterSpacing="2"
    >
      mym
    </text>
  </svg>
);

/** Fansly : cercle bleu avec « F » en blanc gras */
const FanslyIcon: IconComponent = ({ size = 20, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <circle cx="50" cy="50" r="50" fill="currentColor" />
    <text
      x="50"
      y="50"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="56"
      fontWeight="900"
      fontFamily="&apos;Arial Black&apos;, Arial, sans-serif"
      fill="white"
    >
      F
    </text>
  </svg>
);

const PLATFORM_ICON_MAP: Record<string, IconComponent> = {
  instagram: SiInstagram as IconComponent,
  tiktok: FaTiktok as IconComponent,
  youtube: FaYoutube as IconComponent,
  twitter: FaXTwitter as IconComponent,
  facebook: SiFacebook as IconComponent,
  linkedin: FaLinkedin as IconComponent,
  github: SiGithub as IconComponent,
  twitch: SiTwitch as IconComponent,
  spotify: SiSpotify as IconComponent,
  discord: SiDiscord as IconComponent,
  snapchat: SiSnapchat as IconComponent,
  pinterest: SiPinterest as IconComponent,
  behance: SiBehance as IconComponent,
  dribbble: SiDribbble as IconComponent,
  whatsapp: SiWhatsapp as IconComponent,
  telegram: SiTelegram as IconComponent,
  website: Globe as unknown as IconComponent,
  email: Mail as unknown as IconComponent,
  phone: Phone as unknown as IconComponent,
  other: Link2 as unknown as IconComponent,
  // Plateformes adultes
  onlyfans: SiOnlyfans as IconComponent,
  mym: MymIcon,
  fansly: FanslyIcon,
  patreon: SiPatreon as IconComponent,
};

export const PLATFORM_COLORS: Record<string, string> = {
  instagram: "#E1306C",
  tiktok: "#000000",
  youtube: "#FF0000",
  twitter: "#000000",
  facebook: "#1877F2",
  linkedin: "#0A66C2",
  github: "#333333",
  twitch: "#9146FF",
  spotify: "#1DB954",
  discord: "#5865F2",
  snapchat: "#C9A800",
  pinterest: "#E60023",
  behance: "#1769FF",
  dribbble: "#EA4C89",
  whatsapp: "#25D366",
  telegram: "#2CA5E0",
  website: "#8F00FF",
  email: "#EA4335",
  phone: "#34A853",
  other: "#8F00FF",
  // Plateformes adultes
  onlyfans: "#00AFF0",
  mym: "#FF3366",
  fansly: "#0090FF",
  patreon: "#FF424D",
};

export function SocialIcon({ platform, size = 20, className, color }: SocialIconProps) {
  const Icon = PLATFORM_ICON_MAP[platform] ?? (Link2 as unknown as IconComponent);
  const iconColor = color ?? PLATFORM_COLORS[platform] ?? "#8F00FF";
  return <Icon size={size} className={className} style={{ color: iconColor }} />;
}

export function getPlatformIconColor(platform: string): string {
  return PLATFORM_COLORS[platform] ?? "#8F00FF";
}
