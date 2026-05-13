"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Retourne { textColor, accentColor } selon la luminosité du fond du parent.
 * - Fond sombre → texte blanc, violet clair
 * - Fond clair  → texte noir, violet standard
 */
export function useAdaptiveColor(deps: unknown[] = []) {
  const ref = useRef<HTMLElement | null>(null);
  const [colors, setColors] = useState({
    textColor: "#000000",
    accentColor: "#8F00FF",
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const compute = () => {
      const parent = el.parentElement;
      if (!parent) return;
      const bg = getComputedStyle(parent).backgroundColor;
      const rgb = bg.match(/\d+/g);
      if (!rgb || rgb.length < 3) return;
      const luminance =
        (0.299 * Number(rgb[0]) +
          0.587 * Number(rgb[1]) +
          0.114 * Number(rgb[2])) /
        255;
      if (luminance < 0.5) {
        setColors({ textColor: "#ffffff", accentColor: "#d9b4ff" });
      } else {
        setColors({ textColor: "#000000", accentColor: "#8F00FF" });
      }
    };

    compute();

    // Observer les changements de style (changement de thème client)
    const observer = new MutationObserver(compute);
    if (el.parentElement) {
      observer.observe(el.parentElement, {
        attributes: true,
        attributeFilter: ["style", "class"],
      });
    }

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { ref, ...colors };
}
