"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import {
  Plus, Trash2, GripVertical, Eye, Palette, User, Globe, Pencil,
  X, Check, ExternalLink, Image as ImageIcon, Type, MousePointer2,
  Share2, Instagram, Twitter, Youtube, Facebook, Linkedin, Github,
  Music, MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { SOCIAL_PLATFORMS } from "@/lib/utils";
import { SocialIcon } from "@/components/ui/social-icon";
import { AvatarUpload } from "@/components/ui/avatar-upload";
import { canUserDo } from "@/lib/plans";

interface BioPageData {
  id: string;
  title: string;
  description: string | null;
  avatar: string | null;
  primaryColor: string;
  bgColor: string;
  bgImage: string | null;
  theme: string;
  buttonStyle: string;
  fontStyle: string;
  socialLinks: string | null;
}

interface BioLink {
  id: string;
  title: string;
  url: string;
  icon: string | null;
  platform: string | null;
  order: number;
  clicks: number;
  active: boolean;
}

const THEMES = [
  { id: "default", label: "Classique", preview: "bg-white" },
  { id: "dark", label: "Sombre", preview: "bg-gray-900" },
  { id: "gradient", label: "Degrade", preview: "bg-gradient-to-br from-purple-500 to-pink-500" },
  { id: "minimal", label: "Minimal", preview: "bg-gray-50" },
];

const BUTTON_STYLES = [
  { id: "rounded", label: "Arrondi", cls: "rounded-xl" },
  { id: "pill", label: "Pilule", cls: "rounded-full" },
  { id: "square", label: "Carre", cls: "rounded-none" },
  { id: "outline", label: "Contour", cls: "rounded-xl" },
  { id: "shadow", label: "Ombre", cls: "rounded-xl shadow-xl" },
];

const FONT_STYLES = [
  { id: "sans", label: "Moderne", cls: "font-sans" },
  { id: "serif", label: "Elegant", cls: "font-serif" },
  { id: "mono", label: "Tech", cls: "font-mono" },
];

const THEME_BG_DEFAULTS: Record<string, string> = {
  default: "#FFFFFF",
  minimal: "#F9FAFB",
  dark: "#030712",
  gradient: "#8F00FF",
};

const SOCIAL_ICON_PLATFORMS = [
  { id: "instagram", icon: Instagram },
  { id: "twitter", icon: Twitter },
  { id: "youtube", icon: Youtube },
  { id: "facebook", icon: Facebook },
  { id: "linkedin", icon: Linkedin },
  { id: "github", icon: Github },
  { id: "tiktok", icon: Music },
  { id: "whatsapp", icon: MessageCircle },
];

type TabId = "links" | "appearance" | "background" | "style" | "social";

export default function BioPage() {
  const { data: session } = useSession();
  const [bioLinks, setBioLinks] = useState<BioLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("links");
  const [showAddLink, setShowAddLink] = useState(false);
  const [editingLink, setEditingLink] = useState<string | null>(null);
  const bgImageRef = useRef<HTMLInputElement>(null);

  const [newLink, setNewLink] = useState({ title: "", url: "", platform: "" });

  const [pageForm, setPageForm] = useState({
    title: "",
    description: "",
    avatar: null as string | null,
    primaryColor: "#8F00FF",
    bgColor: "#FFFFFF",
    bgImage: null as string | null,
    theme: "default",
    buttonStyle: "rounded",
    fontStyle: "sans",
    socialLinks: [] as { platform: string; url: string }[],
  });

  const canAddLink = session?.user?.plan
    ? canUserDo(session.user.plan as import("@/lib/plans").PlanName, "maxBioLinks", bioLinks.length)
    : false;

  const fetchBioData = useCallback(async () => {
    try {
      const [bioRes, linksRes] = await Promise.all([fetch("/api/bio"), fetch("/api/bio/links")]);
      const bioData = await bioRes.json();
      const linksData = await linksRes.json();
      if (bioData.bioPage) {
        let parsedSocial: { platform: string; url: string }[] = [];
        try { parsedSocial = JSON.parse(bioData.bioPage.socialLinks || "[]"); } catch { /* ignore */ }
        setPageForm({
          title: bioData.bioPage.title || "",
          description: bioData.bioPage.description || "",
          avatar: bioData.bioPage.avatar || null,
          primaryColor: bioData.bioPage.primaryColor || "#8F00FF",
          bgColor: bioData.bioPage.bgColor || "#FFFFFF",
          bgImage: bioData.bioPage.bgImage || null,
          theme: bioData.bioPage.theme || "default",
          buttonStyle: bioData.bioPage.buttonStyle || "rounded",
          fontStyle: bioData.bioPage.fontStyle || "sans",
          socialLinks: parsedSocial,
        });
      }
      if (linksData.links) setBioLinks(linksData.links.sort((a: BioLink, b: BioLink) => a.order - b.order));
    } catch {
      toast.error("Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBioData(); }, [fetchBioData]);

  const saveBioPage = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/bio", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...pageForm,
          socialLinks: JSON.stringify(pageForm.socialLinks),
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Page mise a jour !");
    } catch {
      toast.error("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  };

  const addLink = async () => {
    if (!newLink.title || !newLink.url) { toast.error("Titre et URL requis"); return; }
    try {
      const res = await fetch("/api/bio/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newLink.title,
          url: newLink.url,
          platform: newLink.platform || undefined,
          order: bioLinks.length,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setBioLinks((prev) => [...prev, data.link]);
      setNewLink({ title: "", url: "", platform: "" });
      setShowAddLink(false);
      toast.success("Lien ajoute !");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Erreur");
    }
  };

  const deleteLink = async (id: string) => {
    try {
      await fetch(`/api/bio/links/${id}`, { method: "DELETE" });
      setBioLinks((prev) => prev.filter((l) => l.id !== id));
      toast.success("Lien supprime");
    } catch {
      toast.error("Erreur");
    }
  };

  const toggleLink = async (id: string, active: boolean) => {
    try {
      await fetch(`/api/bio/links/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !active }),
      });
      setBioLinks((prev) => prev.map((l) => (l.id === id ? { ...l, active: !active } : l)));
    } catch {
      toast.error("Erreur");
    }
  };

  const handleBgImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("Image trop lourde (max 5 Mo)"); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxW = 1200;
        let { width, height } = img;
        if (width > maxW) { height = Math.round(height * maxW / width); width = maxW; }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
        setPageForm((p) => ({ ...p, bgImage: canvas.toDataURL("image/jpeg", 0.8) }));
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const updateSocialLink = (platform: string, url: string) => {
    setPageForm((p) => {
      const existing = p.socialLinks.find((s) => s.platform === platform);
      if (existing) {
        return {
          ...p,
          socialLinks: url
            ? p.socialLinks.map((s) => s.platform === platform ? { ...s, url } : s)
            : p.socialLinks.filter((s) => s.platform !== platform),
        };
      }
      if (url) return { ...p, socialLinks: [...p.socialLinks, { platform, url }] };
      return p;
    });
  };

  const fontClass = FONT_STYLES.find((f) => f.id === pageForm.fontStyle)?.cls || "font-sans";
  const isDarkBg = !!(pageForm.bgImage || pageForm.theme === "dark" || pageForm.theme === "gradient");

  const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: "links", label: "Liens", icon: <Globe className="w-4 h-4" /> },
    { id: "appearance", label: "Profil", icon: <User className="w-4 h-4" /> },
    { id: "background", label: "Fond", icon: <ImageIcon className="w-4 h-4" /> },
    { id: "style", label: "Style", icon: <Palette className="w-4 h-4" /> },
    { id: "social", label: "Socials", icon: <Share2 className="w-4 h-4" /> },
  ];

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-[#8F00FF] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Page Bio</h1>
          <p className="text-gray-500 mt-1">Personnalisez votre mini-site public</p>
        </div>
        <div className="flex items-center gap-3">
          <a href={`/${session?.user?.username}`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Previsualiser
              <ExternalLink className="w-3 h-3 ml-1.5" />
            </Button>
          </a>
          <Button
            onClick={saveBioPage}
            disabled={saving}
            size="sm"
            style={{ backgroundColor: "#8F00FF" }}
            className="text-white hover:opacity-90"
          >
            <Check className="w-4 h-4 mr-2" />
            {saving ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* EDITOR */}
        <div className="lg:col-span-2 space-y-4">
          {/* Tabs */}
          <div className="flex overflow-x-auto border-b border-gray-200 -mb-px">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "border-[#8F00FF] text-[#8F00FF]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB: LIENS */}
          {activeTab === "links" && (
            <div className="space-y-4">
              {showAddLink ? (
                <Card className="p-4 border-2 border-[#8F00FF]/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">Nouveau lien</h3>
                    <button onClick={() => setShowAddLink(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Plateforme (optionnel)</label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {SOCIAL_PLATFORMS.slice(0, 12).map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setNewLink((prev) => ({ ...prev, platform: p.id, title: prev.title || p.label }))}
                          className={`flex flex-col items-center gap-1 p-2 rounded-lg border text-xs transition-all ${
                            newLink.platform === p.id
                              ? "border-[#8F00FF] bg-[#8F00FF]/5 text-[#8F00FF]"
                              : "border-gray-200 hover:border-gray-300 text-gray-600"
                          }`}
                        >
                          <SocialIcon platform={p.id} size={18} />
                          <span className="truncate w-full text-center">{p.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <Input
                      label="Titre"
                      placeholder="Instagram"
                      value={newLink.title}
                      onChange={(e) => setNewLink((p) => ({ ...p, title: e.target.value }))}
                    />
                    <Input
                      label="URL"
                      placeholder="https://..."
                      value={newLink.url}
                      onChange={(e) => setNewLink((p) => ({ ...p, url: e.target.value }))}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowAddLink(false)}>Annuler</Button>
                    <Button size="sm" onClick={addLink} style={{ backgroundColor: "#8F00FF" }} className="text-white hover:opacity-90">
                      Ajouter
                    </Button>
                  </div>
                </Card>
              ) : (
                <button
                  onClick={() => {
                    if (!canAddLink) { toast.error("Limite atteinte pour votre plan."); return; }
                    setShowAddLink(true);
                  }}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-[#8F00FF] hover:text-[#8F00FF] transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter un lien
                </button>
              )}

              {bioLinks.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <Globe className="w-10 h-10 mx-auto mb-3 opacity-40" />
                  <p>Aucun lien pour l&apos;instant</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {bioLinks.map((link) => (
                    <div
                      key={link.id}
                      className={`flex items-center gap-3 p-3 bg-white rounded-xl border transition-all ${
                        link.active ? "border-gray-200" : "border-gray-100 opacity-60"
                      }`}
                    >
                      <div className="text-gray-400 cursor-grab"><GripVertical className="w-4 h-4" /></div>
                      <div className="w-8 flex items-center justify-center">
                        <SocialIcon platform={link.platform || "other"} size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        {editingLink === link.id ? (
                          <input
                            className="flex-1 w-full text-sm font-medium border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#8F00FF]"
                            defaultValue={link.title}
                            onBlur={async (e) => {
                              await fetch(`/api/bio/links/${link.id}`, {
                                method: "PATCH",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ title: e.target.value }),
                              });
                              setBioLinks((prev) => prev.map((l) => l.id === link.id ? { ...l, title: e.target.value } : l));
                              setEditingLink(null);
                            }}
                            autoFocus
                          />
                        ) : (
                          <>
                            <p className="text-sm font-medium text-gray-900 truncate">{link.title}</p>
                            <p className="text-xs text-gray-400 truncate">{link.url}</p>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-400 mr-1 hidden sm:inline">{link.clicks} clics</span>
                        <button
                          onClick={() => setEditingLink(editingLink === link.id ? null : link.id)}
                          className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleLink(link.id, link.active)}
                          className={`px-2 py-1 text-xs rounded-full font-medium transition-colors ${
                            link.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {link.active ? "Actif" : "Inactif"}
                        </button>
                        <button
                          onClick={() => deleteLink(link.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: PROFIL */}
          {activeTab === "appearance" && (
            <Card className="p-5 space-y-5">
              <div className="pb-4 border-b border-gray-100">
                <AvatarUpload
                  currentImage={pageForm.avatar}
                  name={pageForm.title || session?.user?.name}
                  onImageChange={(base64) => setPageForm((p) => ({ ...p, avatar: base64 }))}
                  label="Avatar de la page"
                />
              </div>
              <Input
                label="Nom / Titre"
                placeholder="Votre nom ou pseudo"
                value={pageForm.title}
                onChange={(e) => setPageForm((p) => ({ ...p, title: e.target.value }))}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio / Description</label>
                <textarea
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8F00FF]/20 focus:border-[#8F00FF] resize-none"
                  rows={4}
                  placeholder="Decrivez-vous en quelques mots..."
                  maxLength={300}
                  value={pageForm.description}
                  onChange={(e) => setPageForm((p) => ({ ...p, description: e.target.value }))}
                />
                <p className="text-xs text-gray-400 mt-1 text-right">{pageForm.description.length}/300</p>
              </div>
            </Card>
          )}

          {/* TAB: FOND */}
          {activeTab === "background" && (
            <div className="space-y-4">
              <Card className="p-5">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Theme predifini
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() =>
                        setPageForm((p) => ({
                          ...p,
                          theme: theme.id,
                          ...(theme.id !== "gradient" && { bgColor: THEME_BG_DEFAULTS[theme.id] ?? p.bgColor }),
                        }))
                      }
                      className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                        pageForm.theme === theme.id ? "border-[#8F00FF]" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className={`h-16 ${theme.preview}`} />
                      <div className="p-2 text-xs font-medium text-center text-gray-700 bg-white">{theme.label}</div>
                      {pageForm.theme === theme.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-[#8F00FF] rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold text-gray-900 mb-4">Couleurs personnalisees</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Couleur principale", key: "primaryColor" as const },
                    { label: "Couleur de fond", key: "bgColor" as const },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={pageForm[key]}
                          onChange={(e) => setPageForm((p) => ({ ...p, [key]: e.target.value }))}
                          className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
                        />
                        <span className="text-sm font-mono text-gray-500">{pageForm[key]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Image d&apos;arriere-plan
                </h3>
                <p className="text-xs text-gray-400 mb-4">Remplace la couleur de fond · JPG/PNG · max 5 Mo</p>
                {pageForm.bgImage ? (
                  <div className="relative rounded-xl overflow-hidden h-40 border border-gray-200 group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={pageForm.bgImage} alt="Fond" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button
                        onClick={() => bgImageRef.current?.click()}
                        className="bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-100 flex items-center gap-1.5"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        Changer
                      </button>
                      <button
                        onClick={() => setPageForm((p) => ({ ...p, bgImage: null }))}
                        className="bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-red-600 flex items-center gap-1.5"
                      >
                        <X className="w-3.5 h-3.5" />
                        Supprimer
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => bgImageRef.current?.click()}
                    className="w-full h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-[#8F00FF] hover:text-[#8F00FF] transition-colors"
                  >
                    <ImageIcon className="w-8 h-8" />
                    <span className="text-sm font-medium">Importer une image de fond</span>
                    <span className="text-xs">JPG, PNG · max 5 Mo</span>
                  </button>
                )}
                <input ref={bgImageRef} type="file" accept="image/*" className="hidden" onChange={handleBgImageUpload} />
              </Card>
            </div>
          )}

          {/* TAB: STYLE */}
          {activeTab === "style" && (
            <div className="space-y-4">
              <Card className="p-5">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MousePointer2 className="w-4 h-4" />
                  Style des boutons
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {BUTTON_STYLES.map((bs) => (
                    <button
                      key={bs.id}
                      onClick={() => setPageForm((p) => ({ ...p, buttonStyle: bs.id }))}
                      className={`p-3 border-2 rounded-xl transition-all ${
                        pageForm.buttonStyle === bs.id
                          ? "border-[#8F00FF] bg-[#8F00FF]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div
                        className={`h-8 w-full flex items-center justify-center text-xs font-semibold mb-2 ${bs.cls}`}
                        style={{
                          backgroundColor: bs.id === "outline" ? "transparent" : pageForm.primaryColor,
                          border: bs.id === "outline" ? `2px solid ${pageForm.primaryColor}` : undefined,
                          color: bs.id === "outline" ? pageForm.primaryColor : "white",
                        }}
                      >
                        Exemple
                      </div>
                      <p className="text-xs text-center font-medium text-gray-700">{bs.label}</p>
                    </button>
                  ))}
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  Typographie
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {FONT_STYLES.map((fs) => (
                    <button
                      key={fs.id}
                      onClick={() => setPageForm((p) => ({ ...p, fontStyle: fs.id }))}
                      className={`p-3 border-2 rounded-xl transition-all ${
                        pageForm.fontStyle === fs.id
                          ? "border-[#8F00FF] bg-[#8F00FF]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <p className={`text-lg text-center mb-1 font-semibold text-gray-800 ${fs.cls}`}>Aa</p>
                      <p className="text-xs text-center font-medium text-gray-600">{fs.label}</p>
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* TAB: SOCIALS */}
          {activeTab === "social" && (
            <Card className="p-5">
              <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Icones de reseaux sociaux
              </h3>
              <p className="text-xs text-gray-400 mb-5">Apparaissent en bas de votre page publique.</p>
              <div className="space-y-3">
                {SOCIAL_ICON_PLATFORMS.map(({ id, icon: Icon }) => (
                  <div key={id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-gray-600" />
                    </div>
                    <input
                      type="url"
                      placeholder={`URL ${id}`}
                      value={pageForm.socialLinks.find((s) => s.platform === id)?.url || ""}
                      onChange={(e) => updateSocialLink(id, e.target.value)}
                      className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8F00FF]/20 focus:border-[#8F00FF]"
                    />
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* LIVE PREVIEW */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-sm font-medium text-gray-500 mb-3 text-center">Apercu en direct</p>
            <div className="mx-auto w-64">
              <div className="relative bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-10" />
                <div
                  className={`rounded-[2rem] overflow-hidden h-[500px] flex flex-col relative ${fontClass}`}
                  style={
                    pageForm.bgImage
                      ? {
                          backgroundImage: `url(${pageForm.bgImage})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }
                      : pageForm.theme === "gradient"
                      ? { background: "linear-gradient(135deg, #7c3aed, #ec4899)" }
                      : { backgroundColor: pageForm.bgColor }
                  }
                >
                  {pageForm.bgImage && <div className="absolute inset-0 bg-black/25" />}
                  <div className="flex-1 overflow-y-auto p-4 pt-8 space-y-2.5 relative z-10">
                    {/* Avatar + title */}
                    <div className="flex flex-col items-center mb-4">
                      <div
                        className="w-16 h-16 rounded-full overflow-hidden mb-2 shadow-lg"
                        style={{ backgroundColor: pageForm.primaryColor }}
                      >
                        {pageForm.avatar ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={pageForm.avatar} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
                            {pageForm.title?.charAt(0) || session?.user?.name?.charAt(0) || "A"}
                          </div>
                        )}
                      </div>
                      <p className={`text-sm font-bold text-center ${isDarkBg ? "text-white" : "text-gray-900"}`}>
                        {pageForm.title || session?.user?.name || "Votre nom"}
                      </p>
                      {pageForm.description && (
                        <p className={`text-xs text-center mt-0.5 leading-tight max-w-[180px] ${isDarkBg ? "text-white/70" : "text-gray-500"}`}>
                          {pageForm.description.slice(0, 60)}{pageForm.description.length > 60 ? "..." : ""}
                        </p>
                      )}
                    </div>

                    {/* Links preview */}
                    {bioLinks.filter((l) => l.active).map((link) => {
                      const isOutline = pageForm.buttonStyle === "outline";
                      const btnCls = BUTTON_STYLES.find((b) => b.id === pageForm.buttonStyle)?.cls || "rounded-xl";
                      return (
                        <div
                          key={link.id}
                          className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold ${btnCls}`}
                          style={{
                            backgroundColor: isOutline ? "transparent" : pageForm.primaryColor,
                            border: isOutline ? `1.5px solid ${pageForm.primaryColor}` : undefined,
                            color: isOutline ? pageForm.primaryColor : "white",
                          }}
                        >
                          <SocialIcon
                            platform={link.platform || "other"}
                            size={12}
                            color={isOutline ? pageForm.primaryColor : "white"}
                          />
                          <span className="flex-1 text-center">{link.title}</span>
                        </div>
                      );
                    })}

                    {bioLinks.filter((l) => l.active).length === 0 && (
                      <div className="text-center text-xs text-gray-400 py-4">Vos liens ici</div>
                    )}

                    {/* Social icons row */}
                    {pageForm.socialLinks.filter((s) => s.url).length > 0 && (
                      <div className="flex justify-center gap-2 pt-2 flex-wrap">
                        {pageForm.socialLinks.filter((s) => s.url).map((s) => {
                          const PlatformIcon = SOCIAL_ICON_PLATFORMS.find((p) => p.id === s.platform)?.icon;
                          return PlatformIcon ? (
                            <div
                              key={s.platform}
                              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                                isDarkBg ? "bg-white/20 text-white" : "bg-gray-200 text-gray-600"
                              }`}
                            >
                              <PlatformIcon size={13} />
                            </div>
                          ) : null;
                        })}
                      </div>
                    )}

                    {/* Branding */}
                    <div className="text-center pt-1">
                      <span className={`text-[10px] ${isDarkBg ? "text-white/40" : "text-gray-400"}`}>
                        Cree avec{" "}
                        <span className="font-semibold">
                          Beassist<span style={{ color: pageForm.primaryColor }}>Link</span>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-xl text-center">
              <p className="text-xs text-gray-500 mb-1">Votre lien public</p>
              <a
                href={`/${session?.user?.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#8F00FF] hover:underline"
              >
                beassistlink.com/{session?.user?.username}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
