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
const MymIcon: IconComponent = ({ size = 20, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
    <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.18" />
    <text x="12" y="16.5" textAnchor="middle" fontSize="7.5" fontWeight="900" fontFamily="Arial, sans-serif" fill="currentColor">mym</text>
  </svg>
);

const FanslyIcon: IconComponent = ({ size = 20, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
    <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.18" />
    <text x="12" y="17" textAnchor="middle" fontSize="13" fontWeight="900" fontFamily="Arial, sans-serif" fill="currentColor">F</text>
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
