/**
 * Google Fonts — loaded via next/font/google.
 * ALL_FONT_VARIABLES must be applied to the <html> element in layout.tsx
 * so that the CSS custom properties (e.g. --font-playfair) are available globally.
 */
import {
  Playfair_Display,
  Cormorant_Garamond,
  Montserrat,
  Raleway,
  Dancing_Script,
  Great_Vibes,
  Bebas_Neue,
  Josefin_Sans,
  Cinzel,
  Lobster,
  Pacifico,
  Lato,
  Oswald,
  Abril_Fatface,
  Satisfy,
  Bodoni_Moda,
} from "next/font/google";

// ── Top créatrices / models (5 must-haves) ────────────────────────────────────

/** Luxury editorial — #1 choice among OnlyFans / MYM creators */
export const fontPlayfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

/** Romantic brush script — very popular with content creators */
export const fontGreatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-greatvibes",
  weight: "400",
  display: "swap",
});

/** Feminine handwritten script — used across adult platforms */
export const fontDancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
});

/** High-fashion serif — Vogue / premium glamour aesthetic */
export const fontCormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/** Bold editorial serif — Vogue / Playboy magazine style */
export const fontBodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
});

// ── Style & Design (10 additional fonts) ─────────────────────────────────────

/** Geometric modern — very versatile, clean brand identity */
export const fontMontserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

/** Elegant thin sans-serif */
export const fontRaleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

/** Geometric chic — stylish minimalist */
export const fontJosefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
  display: "swap",
});

/** Classical luxury serif */
export const fontCinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

/** Bold decorative — strong personality */
export const fontLobster = Lobster({
  subsets: ["latin"],
  variable: "--font-lobster",
  weight: "400",
  display: "swap",
});

/** All-caps impact — bold branding */
export const fontBebas = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  weight: "400",
  display: "swap",
});

/** Friendly round script */
export const fontPacifico = Pacifico({
  subsets: ["latin"],
  variable: "--font-pacifico",
  weight: "400",
  display: "swap",
});

/** Strong condensed editorial */
export const fontOswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

/** Impact display serif */
export const fontAbril = Abril_Fatface({
  subsets: ["latin"],
  variable: "--font-abril",
  weight: "400",
  display: "swap",
});

/** Brush casual script */
export const fontSatisfy = Satisfy({
  subsets: ["latin"],
  variable: "--font-satisfy",
  weight: "400",
  display: "swap",
});

/** Clean professional — versatile sans */
export const fontLato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["300", "400", "700"],
  display: "swap",
});

// ── Aggregate: apply all variables to <html> in layout.tsx ───────────────────

export const ALL_FONT_VARIABLES = [
  fontPlayfair,
  fontGreatVibes,
  fontDancing,
  fontCormorant,
  fontBodoni,
  fontMontserrat,
  fontRaleway,
  fontJosefin,
  fontCinzel,
  fontLobster,
  fontBebas,
  fontPacifico,
  fontOswald,
  fontAbril,
  fontSatisfy,
  fontLato,
];
