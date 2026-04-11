"use client";

import { useState, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import { QRCodeCanvas } from "qrcode.react";
import { toast } from "react-hot-toast";
import {
  Download, Link2, Globe, Palette, Copy, Check,
  Smartphone, ExternalLink, RefreshCw, QrCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

const SIZES = [128, 200, 256, 512];
const ERROR_LEVELS = [
  { id: "L", label: "L — 7%", desc: "Faible" },
  { id: "M", label: "M — 15%", desc: "Moyen" },
  { id: "Q", label: "Q — 25%", desc: "Eleve" },
  { id: "H", label: "H — 30%", desc: "Max" },
] as const;

const PRESET_COLORS = [
  "#8F00FF", "#6200CC", "#0EA5E9", "#10B981",
  "#F59E0B", "#EF4444", "#EC4899", "#000000",
];

type ErrorLevel = "L" | "M" | "Q" | "H";
type SourceType = "bio" | "custom";

export default function QRCodePage() {
  const { data: session } = useSession();
  const { lang } = useLanguage();
  const qrRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const bioUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/${session?.user?.username || ""}`
      : `https://beassistlink.com/${session?.user?.username || ""}`;

  const [customUrl, setCustomUrl] = useState("");
  const [activeSource, setActiveSource] = useState<SourceType>("bio");
  const [fgColor, setFgColor] = useState("#8F00FF");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [size, setSize] = useState(256);
  const [errorLevel, setErrorLevel] = useState<ErrorLevel>("M");
  const [includeMargin, setIncludeMargin] = useState(true);

  const qrValue =
    activeSource === "bio" ? bioUrl : customUrl.trim() || bioUrl;
  const isValidUrl =
    qrValue.startsWith("http://") || qrValue.startsWith("https://");

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(qrValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success(lang === "fr" ? "URL copiee !" : "URL copied!");
    } catch {
      toast.error("Erreur");
    }
  };

  const downloadPNG = useCallback(() => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) { toast.error("Erreur"); return; }
    const exportSize = 512;
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = exportSize;
    exportCanvas.height = exportSize;
    const ctx = exportCanvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(canvas, 0, 0, exportSize, exportSize);
    const link = document.createElement("a");
    link.download = `qrcode-${session?.user?.username || "beassistlink"}.png`;
    link.href = exportCanvas.toDataURL("image/png");
    link.click();
    toast.success(lang === "fr" ? "QR code telecharge !" : "QR code downloaded!");
  }, [session, lang]);

  const isFr = lang === "fr";
  const t = {
    title: isFr ? "Generateur de QR Codes" : "QR Code Generator",
    subtitle: isFr
      ? "Creez des QR codes personnalises pour vos liens, flyers, cartes de visite et affiches."
      : "Create custom QR codes for your links, flyers, business cards, and posters.",
    sourceTab: isFr ? "Source du lien" : "Link source",
    myBioPage: isFr ? "Ma page bio" : "My bio page",
    customLink: isFr ? "Lien personnalise" : "Custom link",
    customLabel: isFr ? "URL personnalisee" : "Custom URL",
    colorSection: isFr ? "Couleurs" : "Colors",
    fgLabel: isFr ? "Couleur du QR" : "QR color",
    bgLabel: isFr ? "Arriere-plan" : "Background",
    sizeSection: isFr ? "Taille" : "Size",
    errorSection: isFr ? "Correction d'erreurs" : "Error correction",
    marginLabel: isFr ? "Marge blanche" : "White margin",
    downloadPNG: isFr ? "Telecharger PNG" : "Download PNG",
    copyUrl: isFr ? "Copier l'URL" : "Copy URL",
    preview: isFr ? "Apercu" : "Preview",
    resetColors: isFr ? "Reinitialiser" : "Reset",
    tip: isFr
      ? "Astuce : Utilisez la correction H pour les QR sur supports imprimes (resiste aux dommages)."
      : "Tip: Use H correction for printed QR codes (damage-resistant).",
    invalidUrl: isFr
      ? "URL invalide. Commencez par https://"
      : "Invalid URL. Start with https://",
    quickColors: isFr ? "Couleurs rapides" : "Quick colors",
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#8F00FF]/10 flex items-center justify-center">
            <QrCode className="w-5 h-5 text-[#8F00FF]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
            <p className="text-gray-500 text-sm mt-0.5">{t.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* CONTROLS */}
        <div className="lg:col-span-3 space-y-5">

          {/* Source selector */}
          <Card className="p-5">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Link2 className="w-4 h-4 text-[#8F00FF]" />
              {t.sourceTab}
            </h3>
            <div className="flex gap-2 mb-4">
              {(["bio", "custom"] as SourceType[]).map((src) => (
                <button
                  key={src}
                  onClick={() => setActiveSource(src)}
                  className={
                    "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all " +
                    (activeSource === src
                      ? "border-[#8F00FF] bg-[#8F00FF]/5 text-[#8F00FF]"
                      : "border-gray-200 text-gray-600 hover:border-gray-300")
                  }
                >
                  {src === "bio" ? <Globe className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                  {src === "bio" ? t.myBioPage : t.customLink}
                </button>
              ))}
            </div>

            {activeSource === "bio" ? (
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                <Globe className="w-4 h-4 text-[#8F00FF] flex-shrink-0" />
                <span className="text-sm text-gray-700 truncate flex-1">{bioUrl}</span>
                <a
                  href={"/" + (session?.user?.username || "")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#8F00FF]"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ) : (
              <Input
                label={t.customLabel}
                placeholder="https://..."
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
              />
            )}

            {!isValidUrl && activeSource === "custom" && customUrl && (
              <p className="text-xs text-red-500 mt-2">{t.invalidUrl}</p>
            )}
          </Card>

          {/* Colors */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#8F00FF]" />
                {t.colorSection}
              </h3>
              <button
                onClick={() => { setFgColor("#8F00FF"); setBgColor("#FFFFFF"); }}
                className="text-xs text-gray-400 hover:text-[#8F00FF] flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                {t.resetColors}
              </button>
            </div>

            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">{t.quickColors}</p>
              <div className="flex gap-2 flex-wrap">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setFgColor(color)}
                    title={color}
                    className={
                      "w-7 h-7 rounded-lg border-2 transition-all " +
                      (fgColor === color
                        ? "border-gray-400 scale-110"
                        : "border-transparent hover:scale-105")
                    }
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {([
                { label: t.fgLabel, value: fgColor, onChange: setFgColor },
                { label: t.bgLabel, value: bgColor, onChange: setBgColor },
              ] as const).map(({ label, value, onChange }) => (
                <div key={label}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                      className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
                    />
                    <span className="text-xs font-mono text-gray-500">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Size + Error correction */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Card className="p-5">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">{t.sizeSection}</h3>
              <div className="grid grid-cols-2 gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={
                      "py-2 rounded-xl text-xs font-semibold border-2 transition-all " +
                      (size === s
                        ? "border-[#8F00FF] bg-[#8F00FF]/5 text-[#8F00FF]"
                        : "border-gray-200 text-gray-600 hover:border-gray-300")
                    }
                  >
                    {s}px
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">{t.errorSection}</h3>
              <div className="grid grid-cols-2 gap-2">
                {ERROR_LEVELS.map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => setErrorLevel(lvl.id)}
                    className={
                      "py-2 rounded-xl text-xs font-semibold border-2 transition-all " +
                      (errorLevel === lvl.id
                        ? "border-[#8F00FF] bg-[#8F00FF]/5 text-[#8F00FF]"
                        : "border-gray-200 text-gray-600 hover:border-gray-300")
                    }
                  >
                    {lvl.id} · {lvl.desc}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Margin toggle */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{t.marginLabel}</span>
              <button
                onClick={() => setIncludeMargin(!includeMargin)}
                className={
                  "w-11 h-6 rounded-full transition-colors relative " +
                  (includeMargin ? "bg-[#8F00FF]" : "bg-gray-200")
                }
                role="switch"
                aria-checked={includeMargin}
              >
                <span
                  className={
                    "absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform " +
                    (includeMargin ? "translate-x-5" : "translate-x-0.5")
                  }
                />
              </button>
            </div>
          </Card>

          <p className="text-xs text-gray-400 leading-relaxed">
            <span className="font-semibold">💡</span> {t.tip}
          </p>
        </div>

        {/* PREVIEW */}
        <div className="lg:col-span-2">
          <div className="sticky top-24">
            <p className="text-sm font-medium text-gray-500 mb-3 text-center">{t.preview}</p>

            <Card className="p-6 flex flex-col items-center gap-4">
              <div
                ref={qrRef}
                className="p-4 rounded-2xl border border-gray-100 shadow-sm"
                style={{ backgroundColor: bgColor }}
              >
                <QRCodeCanvas
                  value={isValidUrl ? qrValue : "https://beassistlink.com"}
                  size={Math.min(size, 240)}
                  fgColor={fgColor}
                  bgColor={bgColor}
                  level={errorLevel}
                  includeMargin={includeMargin}
                  imageSettings={{
                    src: "/favicon.ico",
                    height: 24,
                    width: 24,
                    excavate: true,
                  }}
                />
              </div>

              <div className="w-full">
                <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl">
                  <Smartphone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <span className="text-xs text-gray-500 truncate flex-1">
                    {isValidUrl ? qrValue : bioUrl}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Button
                  onClick={downloadPNG}
                  style={{ backgroundColor: "#8F00FF" }}
                  className="w-full text-white hover:opacity-90"
                  size="sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t.downloadPNG}
                </Button>
                <Button onClick={copyUrl} variant="outline" className="w-full" size="sm">
                  {copied ? (
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 mr-2" />
                  )}
                  {t.copyUrl}
                </Button>
              </div>
            </Card>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
              <QrCode className="w-3.5 h-3.5" />
              <span>Scan me</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
