"use client";

import { useAdaptiveColor } from "@/hooks/useAdaptiveColor";

interface Props {
  username: string;
  deps?: unknown[];
}

/**
 * Lien "beassist-link.com/username" qui adapte automatiquement
 * sa couleur selon la luminosité du fond parent.
 */
export function AdaptiveBioLink({ username, deps = [] }: Props) {
  const { ref, accentColor } = useAdaptiveColor(deps);

  return (
    <a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={`/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm font-medium hover:underline transition-colors duration-200"
      style={{ color: accentColor }}
    >
      beassist-link.com/{username}
    </a>
  );
}
