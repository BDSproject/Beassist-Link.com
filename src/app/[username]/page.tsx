import { db } from "@/database/client";
import { notFound } from "next/navigation";
import { PLANS } from "@/lib/plans";
import { getPlatformColor, getPlatformLabel, SOCIAL_PLATFORMS } from "@/lib/utils";
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
    wrapper: "min-h-screen bg-white",
    title: "text-gray-900",
    subtitle: "text-gray-500",
    username: "text-gray-400",
    branding: "text-gray-400 hover:text-gray-600",
    emptyText: "text-gray-400",
  },
  dark: {
    wrapper: "min-h-screen bg-gray-950",
    title: "text-white",
    subtitle: "text-gray-400",
    username: "text-gray-600",
    branding: "text-gray-600 hover:text-gray-400",
    emptyText: "text-gray-600",
  },
  gradient: {
    wrapper:
      "min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500",
    title: "text-white",
    subtitle: "text-white/75",
    username: "text-white/50",
    branding: "text-white/40 hover:text-white/70",
    emptyText: "text-white/50",
  },
  minimal: {
    wrapper: "min-h-screen bg-neutral-50",
    title: "text-neutral-900",
    subtitle: "text-neutral-500",
    username: "text-neutral-400",
    branding: "text-neutral-400 hover:text-neutral-600",
    emptyText: "text-neutral-400",
  },
} as const;

export default async function UserBioPage({ params }: Props) {
  const bioPage = await db.bioPage.findUnique({
    where: { username: params.username, active: true },
    include: {
      links: {
        where: { active: true },
        orderBy: { order: "asc" },
      },
      user: { select: { plan: true } },
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

  const userPlan = bioPage.user.plan;
  const showBranding =
    !PLANS[userPlan as keyof typeof PLANS]?.limits.hasRemoveBranding;

  const primaryColor = bioPage.primaryColor || "#8F00FF";
  const theme = (bioPage.theme as keyof typeof THEME_STYLES) || "default";
  const styles = THEME_STYLES[theme] ?? THEME_STYLES.default;

  // Fond personnalisé uniquement pour les thèmes sans fond imposé
  const wrapperStyle =
    theme === "default" || theme === "minimal"
      ? { backgroundColor: bioPage.bgColor || undefined }
      : {};

  return (
    <main
      className={`${styles.wrapper} flex flex-col items-center py-10 px-4`}
      style={wrapperStyle}
    >
      <div className="w-full max-w-sm sm:max-w-md">
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
          <h1 className={`text-xl sm:text-2xl font-black ${styles.title}`}>
            {bioPage.title || params.username}
          </h1>

          {/* Description */}
          {bioPage.description && (
            <p className={`text-sm mt-2 leading-relaxed max-w-xs ${styles.subtitle}`}>
              {bioPage.description}
            </p>
          )}

          {/* Username */}
          <p className={`text-xs mt-2 ${styles.username}`}>
            @{params.username}
          </p>
        </div>

        {/* Liens */}
        <div className="space-y-3">
          {bioPage.links.map((link) => {
            const platformColor = link.platform
              ? getPlatformColor(link.platform)
              : primaryColor;
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
                  className="relative flex items-center w-full px-4 py-3.5 sm:py-4 rounded-2xl font-semibold text-sm shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 overflow-hidden"
                  style={{ backgroundColor: platformColor }}
                >
                  {/* Reflet lumineux */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />

                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <SocialIcon
                      platform={link.platform || "other"}
                      size={20}
                      color="white"
                      className="flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-white font-semibold truncate block">
                        {link.title}
                      </span>
                      {link.platform && link.platform !== "other" && platform && (
                        <span className="text-white/60 text-xs">
                          {getPlatformLabel(link.platform)}
                        </span>
                      )}
                    </div>
                  </div>

                  <ExternalLink
                    size={14}
                    className="text-white/60 group-hover:text-white/90 transition-colors flex-shrink-0 ml-2"
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

        {/* Branding BeassistLink */}
        {showBranding && (
          <div className="mt-10 flex justify-center">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 text-xs transition-colors ${styles.branding}`}
            >
              Créé avec <Logo size="sm" />
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
