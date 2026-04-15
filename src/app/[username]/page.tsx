import type React from "react";
import { db } from "@/database/client";
import { notFound } from "next/navigation";
import { getPlatformLabel, SOCIAL_PLATFORMS } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { SocialIcon } from "@/components/ui/social-icon";
import type { Metadata } from "next";

interface Props {
  params: { username: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const bioPage = await db.bioPage.findUnique({
    where: { username: params.username },
  });

  if (!bioPage) {
    return { title: "Profil non trouvé | BeassistLink" };
  }

  return {
    title: `${bioPage.title || params.username} | BeassistLink`,
    description: bioPage.description || `La page bio de ${params.username}`,
    openGraph: {
      title: bioPage.title || params.username,
      description: bioPage.description || "",
    },
  };
}

// Configurations de style par thème
const THEME_STYLES = {
  default: {
    wrapper: "min-h-[100svh] bg-white",
    title: "text-gray-900",
    subtitle: "text-gray-500",
    username: "text-gray-400",
    branding: "text-gray-400 hover:text-gray-600",
    emptyText: "text-gray-400",
  },
  dark: {
    wrapper: "min-h-[100svh] bg-gray-950",
    title: "text-white",
    subtitle: "text-gray-400",
    username: "text-gray-600",
    branding: "text-gray-600 hover:text-gray-400",
    emptyText: "text-gray-600",
  },
  gradient: {
    wrapper:
      "min-h-[100svh] bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500",
    title: "text-white",
    subtitle: "text-white/75",
    username: "text-white/50",
    branding: "text-white/40 hover:text-white/70",
    emptyText: "text-white/50",
  },
  minimal: {
    wrapper: "min-h-[100svh] bg-neutral-50",
    title: "text-neutral-900",
    subtitle: "text-neutral-500",
    username: "text-neutral-400",
    branding: "text-neutral-400 hover:text-neutral-600",
    emptyText: "text-neutral-400",
  },
} as const;

const BUTTON_STYLE_CLASSES: Record<string, string> = {
  rounded: "rounded-2xl",
  pill: "rounded-full",
  square: "rounded-none",
  outline: "rounded-2xl",
  shadow: "rounded-2xl shadow-2xl",
};

const FONT_STYLE_CLASSES: Record<string, string> = {
  // Basiques
  sans: "font-sans",
  serif: "font-serif",
  mono: "font-mono",
  // Top créatrices
  playfair: "font-playfair",
  greatvibes: "font-greatvibes",
  dancing: "font-dancing",
  cormorant: "font-cormorant",
  bodoni: "font-bodoni",
  // Style & Design
  montserrat: "font-montserrat",
  raleway: "font-raleway",
  josefin: "font-josefin",
  cinzel: "font-cinzel",
  lobster: "font-lobster",
  bebas: "font-bebas",
  pacifico: "font-pacifico",
  oswald: "font-oswald",
  abril: "font-abril",
  satisfy: "font-satisfy",
  lato: "font-lato",
};

export default async function UserBioPage({ params }: Props) {
  const bioPage = await db.bioPage.findUnique({
    where: { username: params.username, active: true },
    include: {
      links: {
        where: { active: true },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!bioPage) {
    notFound();
  }

  // Incrémenter les vues en arrière-plan
  await db.bioPage.update({
    where: { id: bioPage.id },
    data: { views: { increment: 1 } },
  });

  const primaryColor = bioPage.primaryColor || "#8F00FF";
  const theme = (bioPage.theme as keyof typeof THEME_STYLES) || "default";
  const styles = THEME_STYLES[theme] ?? THEME_STYLES.default;
  const buttonStyle = (bioPage as { buttonStyle?: string }).buttonStyle || "rounded";
  const fontStyle = (bioPage as { fontStyle?: string }).fontStyle || "sans";
  const fontColor = (bioPage as { fontColor?: string | null }).fontColor || null;
  const fontSize = (bioPage as { fontSize?: string }).fontSize || "md";
  const iconSize = (bioPage as { iconSize?: string }).iconSize || "md";
  const fontClass = FONT_STYLE_CLASSES[fontStyle] || "font-sans";
  const btnCls = BUTTON_STYLE_CLASSES[buttonStyle] || "rounded-2xl";
  const isOutlineBtn = buttonStyle === "outline";

  // Taille de police : sm=small, md=normal, lg=large
  const FONT_SIZE_MAP: Record<string, string> = {
    sm: "text-lg sm:text-xl",
    md: "text-xl sm:text-2xl",
    lg: "text-2xl sm:text-3xl",
  };
  const DESC_SIZE_MAP: Record<string, string> = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };
  // Taille des icônes : sm=28, md=40, lg=52
  const ICON_SIZE_MAP: Record<string, number> = { sm: 28, md: 40, lg: 52 };
  const ICON_IMG_MAP: Record<string, string> = { sm: "w-7 h-7", md: "w-10 h-10", lg: "w-13 h-13" };
  const resolvedIconSize = ICON_SIZE_MAP[iconSize] ?? 40;
  const resolvedIconImg = ICON_IMG_MAP[iconSize] ?? "w-10 h-10";
  const bgImage = (bioPage as { bgImage?: string | null }).bgImage;
  let socialLinks: { platform: string; url: string }[] = [];
  try { socialLinks = JSON.parse((bioPage as { socialLinks?: string | null }).socialLinks || "[]"); } catch { /* ignore */ }

  // Calcule la luminance perçue d'une couleur hex (#RRGGBB) — retourne 0 (noir) à 1 (blanc)
  function hexLuminance(hex: string): number {
    const h = hex.replace("#", "");
    if (h.length < 6) return 1;
    const r = parseInt(h.slice(0, 2), 16) / 255;
    const g = parseInt(h.slice(2, 4), 16) / 255;
    const b = parseInt(h.slice(4, 6), 16) / 255;
    const toLinear = (c: number) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  }

  const isDarkBg = !!(bgImage || theme === "dark" || theme === "gradient");

  // Fond: bgImage > gradient (Tailwind) > bgColor (with theme-aware fallback for backward compat)
  const THEME_BG_FALLBACK: Record<string, string> = {
    dark: "#030712",
    minimal: "#F9FAFB",
    default: "#FFFFFF",
  };
  const effectiveBgColor =
    theme === "gradient"
      ? undefined
      : bioPage.bgColor && bioPage.bgColor !== "#FFFFFF"
      ? bioPage.bgColor
      : THEME_BG_FALLBACK[theme] ?? "#FFFFFF";

  const wrapperStyle: React.CSSProperties = bgImage
    ? {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll", // 'fixed' breaks on iOS Safari
      }
    : theme === "gradient"
    ? {}
    : { backgroundColor: effectiveBgColor };

  // isDarkBg prend aussi en compte les bgColor personnalisées sombres
  const badgeIsDark = isDarkBg || (effectiveBgColor ? hexLuminance(effectiveBgColor) < 0.35 : false);

  return (
    <main
      className={`${styles.wrapper} flex flex-col items-center py-10 px-4 pb-safe relative ${fontClass}`}
      style={wrapperStyle}
    >
      {bgImage && <div className="absolute inset-0 bg-black/30 pointer-events-none" />}
      <div className="w-full max-w-sm sm:max-w-md relative z-10">
        {/* Avatar + Profil */}
        <div className="flex flex-col items-center mb-8 text-center">
          {/* Avatar */}
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-white text-3xl sm:text-4xl font-black mb-4 shadow-xl ring-4 ring-white/10 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}bb)`,
            }}
          >
            {bioPage.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={bioPage.avatar}
                alt={bioPage.title || params.username}
                className="w-full h-full object-cover"
              />
            ) : (
              (bioPage.title || params.username)[0].toUpperCase()
            )}
          </div>

          {/* Nom */}
          <h1
            className={`${FONT_SIZE_MAP[fontSize]} font-black ${isDarkBg ? "text-white" : styles.title}`}
            style={fontColor ? { color: fontColor } : undefined}
          >
            {bioPage.title || params.username}
          </h1>

          {/* Description */}
          {bioPage.description && (
            <p
              className={`${DESC_SIZE_MAP[fontSize]} mt-2 leading-relaxed max-w-xs ${isDarkBg ? "text-white/75" : styles.subtitle}`}
              style={fontColor ? { color: fontColor, opacity: 0.8 } : undefined}
            >
              {bioPage.description}
            </p>
          )}

          {/* Username */}
          <p className={`text-xs mt-2 ${isDarkBg ? "text-white/50" : styles.username}`}>
            @{params.username}
          </p>
        </div>

        {/* Liens */}
        <div className="space-y-3">
          {bioPage.links.map((link) => {
            const platform = SOCIAL_PLATFORMS.find((p) => p.id === link.platform);

            return (
              <a
                key={link.id}
                href={`/api/bio/click/${link.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full"
              >
                <div
                  className={`relative flex items-center w-full px-4 py-4 sm:py-5 ${btnCls} font-semibold text-sm shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 overflow-hidden`}
                  style={{
                    backgroundColor: isOutlineBtn ? "transparent" : primaryColor,
                    border: isOutlineBtn ? `2px solid ${primaryColor}` : undefined,
                    color: isOutlineBtn ? primaryColor : "white",
                  }}
                >
                  {/* Reflet lumineux */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />

                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {link.icon && link.icon.startsWith("data:") ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={link.icon}
                        alt=""
                        className={`${resolvedIconImg} rounded object-cover flex-shrink-0`}
                      />
                    ) : (
                      <SocialIcon
                        platform={link.platform || "other"}
                        size={resolvedIconSize}
                        color={isOutlineBtn ? primaryColor : "white"}
                        className="flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <span
                        className={`${DESC_SIZE_MAP[fontSize]} font-semibold truncate block ${isOutlineBtn ? "" : "text-white"}`}
                        style={fontColor && isOutlineBtn ? { color: fontColor } : undefined}
                      >
                        {link.title}
                      </span>
                      {link.platform && link.platform !== "other" && platform && (
                        <span className={`text-xs ${isOutlineBtn ? "opacity-60" : "text-white/60"}`}>
                          {getPlatformLabel(link.platform)}
                        </span>
                      )}
                    </div>
                  </div>

                  <ExternalLink
                    size={14}
                    className={`transition-colors flex-shrink-0 ml-2 ${isOutlineBtn ? "opacity-50 group-hover:opacity-90" : "text-white/60 group-hover:text-white/90"}`}
                  />
                </div>
              </a>
            );
          })}
        </div>

        {bioPage.links.length === 0 && (
          <div className={`text-center py-16 ${styles.emptyText}`}>
            <p className="text-sm">Aucun lien pour le moment.</p>
          </div>
        )}

        {/* Social Icons */}
        {socialLinks.filter((s) => s.url).length > 0 && (
          <div className="flex justify-center gap-3 mt-6 flex-wrap">
            {socialLinks.filter((s) => s.url).map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80 ${
                  isDarkBg ? "bg-white/20 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                <SocialIcon platform={s.platform} size={18} color={isDarkBg ? "white" : undefined} />
              </a>
            ))}
          </div>
        )}

        {/* Marketing footer — toujours visible quel que soit l'arrière-plan */}
        <div className="mt-10 flex justify-center">
          <a
            href="https://www.beassist-link.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-medium transition-all hover:scale-105 backdrop-blur-sm"
            style={{
              background: badgeIsDark ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.75)",
              color: badgeIsDark ? "rgba(255,255,255,0.90)" : "rgba(30,30,30,0.85)",
              boxShadow: badgeIsDark
                ? "0 1px 8px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.12)"
                : "0 1px 8px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(0,0,0,0.07)",
            }}
          >
            Rejoindre
            <span className="font-bold">@{params.username}</span>
            sur
            <Logo size="sm" />
          </a>
        </div>
      </div>
    </main>
  );
}
