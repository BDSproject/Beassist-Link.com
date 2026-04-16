"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import {
  Plus, Trash2, GripVertical, Eye, Palette, User, Globe, Pencil,
  X, Check, ExternalLink, Image as ImageIcon, Type, MousePointer2,
  Share2, Instagram, Twitter, Youtube, Facebook, Linkedin, Github,
  Music, MessageCircle, Lock, Camera,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { SOCIAL_PLATFORMS } from "@/lib/utils";
import { SocialIcon } from "@/components/ui/social-icon";
import { AvatarUpload } from "@/components/ui/avatar-upload";
import { canUserDo } from "@/lib/plans";
import { useLanguage } from "@/contexts/language-context";

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
  { id: "default", preview: "bg-white" },
  { id: "dark", preview: "bg-gray-900" },
  { id: "gradient", preview: "bg-gradient-to-br from-purple-500 to-pink-500" },
  { id: "minimal", preview: "bg-gray-50" },
];

const BUTTON_STYLES = [
  { id: "rounded", cls: "rounded-xl" },
  { id: "pill", cls: "rounded-full" },
  { id: "square", cls: "rounded-none" },
  { id: "outline", cls: "rounded-xl" },
  { id: "shadow", cls: "rounded-xl shadow-xl" },
];

const FONT_STYLES: { id: string; cls: string; group: "base" | "creator" | "style" }[] = [
  // ── Basiques
  { id: "sans",       cls: "font-sans",       group: "base" },
  { id: "serif",      cls: "font-serif",      group: "base" },
  { id: "mono",       cls: "font-mono",       group: "base" },
  // ── Top créatrices ⭐ (plus utilisés par modèles & créatrices adultes)
  { id: "playfair",   cls: "font-playfair",   group: "creator" },
  { id: "greatvibes", cls: "font-greatvibes", group: "creator" },
  { id: "dancing",    cls: "font-dancing",    group: "creator" },
  { id: "cormorant",  cls: "font-cormorant",  group: "creator" },
  { id: "bodoni",     cls: "font-bodoni",     group: "creator" },
  // ── Style & Design
  { id: "montserrat", cls: "font-montserrat", group: "style" },
  { id: "raleway",    cls: "font-raleway",    group: "style" },
  { id: "josefin",    cls: "font-josefin",    group: "style" },
  { id: "cinzel",     cls: "font-cinzel",     group: "style" },
  { id: "lobster",    cls: "font-lobster",    group: "style" },
  { id: "bebas",      cls: "font-bebas",      group: "style" },
  { id: "pacifico",   cls: "font-pacifico",   group: "style" },
  { id: "oswald",     cls: "font-oswald",     group: "style" },
  { id: "abril",      cls: "font-abril",      group: "style" },
  { id: "satisfy",    cls: "font-satisfy",    group: "style" },
  { id: "lato",       cls: "font-lato",       group: "style" },
];

const THEME_BG_DEFAULTS: Record<string, string> = {
  default: "#FFFFFF",
  minimal: "#F9FAFB",
  dark: "#030712",
  gradient: "#8F00FF",
};

const SOCIAL_ICON_PLATFORM_IDS = [
  "instagram", "tiktok", "youtube", "twitter", "facebook",
  "linkedin", "github", "twitch", "whatsapp",
  "onlyfans", "mym", "fansly",
];

const ADULT_PLATFORM_IDS = ["onlyfans", "mym", "fansly", "patreon"];

type TabId = "links" | "appearance" | "background" | "style" | "social";

// ── Composant ligne sortable (drag-and-drop) ──────────────────────────────────
interface SortableLinkRowProps {
  link: { id: string; title: string; url: string; icon: string | null; platform: string | null; active: boolean; clicks: number; order: number };
  isFree: boolean;
  editingLink: string | null;
  iconMenuLinkId: string | null;
  setEditingLink: (id: string | null) => void;
  setIconMenuLinkId: (id: string | null) => void;
  setBioLinks: React.Dispatch<React.SetStateAction<{ id: string; title: string; url: string; icon: string | null; platform: string | null; order: number; clicks: number; active: boolean }[]>>;
  toggleLink: (id: string, active: boolean) => void;
  deleteLink: (id: string) => void;
  removeLinkIcon: (id: string) => void;
  setUploadIconLinkId: (id: string) => void;
  iconInputRef: React.RefObject<HTMLInputElement>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  b: any;
}

function SortableLinkRow({
  link, isFree, editingLink, iconMenuLinkId,
  setEditingLink, setIconMenuLinkId, setBioLinks,
  toggleLink, deleteLink, removeLinkIcon,
  setUploadIconLinkId, iconInputRef, b,
}: SortableLinkRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: link.id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.85 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-3 bg-white rounded-xl border transition-all ${
        link.active ? "border-gray-200" : "border-gray-100 opacity-60"
      } ${isDragging ? "shadow-xl ring-2 ring-[#8F00FF]/30" : ""}`}
    >
      {/* Drag handle */}
      <div
        className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing touch-none"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-4 h-4" />
      </div>

      {/* Icon zone — popover menu for STARTER+ */}
      <div className="relative flex-shrink-0">
        <div
          className={`relative w-8 h-8 flex items-center justify-center rounded-lg group/icon ${
            !isFree ? "cursor-pointer hover:opacity-80" : ""
          }`}
          title={!isFree ? "Changer l'icône" : undefined}
          onClick={() => {
            if (isFree) return;
            setIconMenuLinkId(iconMenuLinkId === link.id ? null : link.id);
          }}
        >
          {link.icon && link.icon.startsWith("data:") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={link.icon} alt="" className="w-7 h-7 rounded-full object-cover" />
          ) : (
            <SocialIcon platform={link.platform || "other"} size={28} />
          )}
          {!isFree && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg opacity-0 group/icon:opacity-100 transition-opacity">
              <Camera className="w-3.5 h-3.5 text-white" />
            </div>
          )}
        </div>

        {/* Popover menu */}
        {iconMenuLinkId === link.id && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIconMenuLinkId(null)} />
            <div className="absolute left-0 top-10 z-20 bg-white rounded-xl shadow-xl border border-gray-100 p-1.5 min-w-[175px] flex flex-col gap-0.5">
              <button
                type="button"
                className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-[#F5EBFF] hover:text-[#8F00FF] rounded-lg transition-colors text-left w-full"
                onClick={() => { setIconMenuLinkId(null); removeLinkIcon(link.id); }}
              >
                <SocialIcon platform={link.platform || "other"} size={16} />
                <span>Icône plateforme</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-[#F5EBFF] hover:text-[#8F00FF] rounded-lg transition-colors text-left w-full"
                onClick={() => {
                  setIconMenuLinkId(null);
                  setUploadIconLinkId(link.id);
                  iconInputRef.current?.click();
                }}
              >
                <Camera className="w-4 h-4" />
                <span>Importer une image</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Title + URL */}
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
            <p className="text-xs text-gray-400 overflow-x-auto whitespace-nowrap scrollbar-none">{link.url}</p>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <span className="text-xs text-gray-400 mr-1 hidden sm:inline">{link.clicks} {b.clics}</span>
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
          {link.active ? b.active : b.inactive}
        </button>
        <button
          onClick={() => deleteLink(link.id)}
          className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

export default function BioPage() {
  const { data: session } = useSession();
  const { t } = useLanguage();
  const b = t.dashboard.bio;
  const [bioLinks, setBioLinks] = useState<BioLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("links");
  const [showAddLink, setShowAddLink] = useState(false);
  const [editingLink, setEditingLink] = useState<string | null>(null);
  const bgImageRef = useRef<HTMLInputElement>(null);
  const iconInputRef = useRef<HTMLInputElement>(null);
  const [uploadIconLinkId, setUploadIconLinkId] = useState<string | null>(null);
  const [iconMenuLinkId, setIconMenuLinkId] = useState<string | null>(null);

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
    fontColor: null as string | null,
    fontSize: "md",
    iconSize: "md",
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
          fontColor: bioData.bioPage.fontColor || null,
          fontSize: bioData.bioPage.fontSize || "md",
          iconSize: bioData.bioPage.iconSize || "md",
          socialLinks: parsedSocial,
        });
      }
      if (linksData.links) setBioLinks(linksData.links.sort((a: BioLink, b: BioLink) => a.order - b.order));
    } catch {
      toast.error(b.loadError);
    } finally {
      setLoading(false);
    }
  }, [b.loadError]);

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
      toast.success(b.saveSuccess);
    } catch {
      toast.error(b.saveError);
    } finally {
      setSaving(false);
    }
  };

  const addLink = async () => {
    if (!newLink.title || !newLink.url) { toast.error(b.linkRequired); return; }
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
      toast.success(b.linkAdded);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : b.saveError);
    }
  };

  const deleteLink = async (id: string) => {
    try {
      await fetch(`/api/bio/links/${id}`, { method: "DELETE" });
      setBioLinks((prev) => prev.filter((l) => l.id !== id));
      toast.success(b.linkDeleted);
    } catch {
      toast.error(b.saveError);
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
    const maxSizeMB = isPro ? 15 : 5;
    if (file.size > maxSizeMB * 1024 * 1024) { toast.error(b.bgImageTooLarge.replace("5", String(maxSizeMB))); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        // Cible : format portrait téléphone 9:18 (430×860 px)
        const TARGET_W = 430;
        const TARGET_H = 860;
        const targetRatio = TARGET_W / TARGET_H; // ~0.5
        const srcRatio = img.width / img.height;

        let sx = 0, sy = 0, sw = img.width, sh = img.height;
        if (srcRatio > targetRatio) {
          // Image paysage : recadrer les côtés, garder la hauteur
          sw = Math.round(img.height * targetRatio);
          sx = Math.round((img.width - sw) / 2);
        } else {
          // Image portrait ou carrée : recadrer le bas, garder le haut
          sh = Math.round(img.width / targetRatio);
          sy = 0;
        }
        const canvas = document.createElement("canvas");
        canvas.width = TARGET_W;
        canvas.height = TARGET_H;
        canvas.getContext("2d")!.drawImage(img, sx, sy, sw, sh, 0, 0, TARGET_W, TARGET_H);
        setPageForm((p) => ({ ...p, bgImage: canvas.toDataURL("image/jpeg", 0.85) }));
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const removeLinkIcon = async (linkId: string) => {
    await fetch(`/api/bio/links/${linkId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ icon: "" }),
    });
    setBioLinks((prev) => prev.map((l) => l.id === linkId ? { ...l, icon: null } : l));
  };

  const handleLinkIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadIconLinkId) return;
    if (file.size > 2 * 1024 * 1024) { toast.error("Image trop lourde (max 2 Mo)"); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = async () => {
        const SIZE = 96;
        const canvas = document.createElement("canvas");
        canvas.width = SIZE;
        canvas.height = SIZE;
        const ctx = canvas.getContext("2d")!;
        // Crop to square from center
        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;
        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, SIZE, SIZE);
        const base64 = canvas.toDataURL("image/jpeg", 0.85);
        // Persist
        try {
          await fetch(`/api/bio/links/${uploadIconLinkId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ icon: base64 }),
          });
          setBioLinks((prev) => prev.map((l) => l.id === uploadIconLinkId ? { ...l, icon: base64 } : l));
          toast.success("Icône mise à jour !");
        } catch {
          toast.error("Erreur lors de l'upload");
        } finally {
          setUploadIconLinkId(null);
          if (iconInputRef.current) iconInputRef.current.value = "";
        }
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

  // Drag-and-drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = bioLinks.findIndex((l) => l.id === active.id);
    const newIndex = bioLinks.findIndex((l) => l.id === over.id);
    const reordered = arrayMove(bioLinks, oldIndex, newIndex).map((l, i) => ({ ...l, order: i }));
    setBioLinks(reordered);

    try {
      await fetch("/api/bio/links", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reordered.map((l) => ({ id: l.id, order: l.order }))),
      });
    } catch {
      toast.error("Erreur lors de la sauvegarde de l'ordre");
      fetchBioData(); // rollback
    }
  };

  const fontClass = FONT_STYLES.find((f) => f.id === pageForm.fontStyle)?.cls || "font-sans";
  const isDarkBg = !!(pageForm.bgImage || pageForm.theme === "dark" || pageForm.theme === "gradient");
  const isFree = !session?.user?.plan || session.user.plan === "FREE";
  const isPro = session?.user?.plan === "PRO";

  const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: "links", label: b.tabs.links, icon: <Globe className="w-4 h-4" /> },
    { id: "appearance", label: b.tabs.appearance, icon: <User className="w-4 h-4" /> },
    { id: "background", label: b.tabs.background, icon: <ImageIcon className="w-4 h-4" /> },
    { id: "style", label: b.tabs.style, icon: <Palette className="w-4 h-4" /> },
    { id: "social", label: b.tabs.social, icon: <Share2 className="w-4 h-4" /> },
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
          <h1 className="text-2xl font-bold text-gray-900">{b.title}</h1>
          <p className="text-gray-500 mt-1">{b.subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <a href={`/${session?.user?.username}`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              {b.preview}
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
            {saving ? b.saving : b.save}
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
                    <h3 className="font-medium text-gray-900">{b.newLink}</h3>
                    <button onClick={() => setShowAddLink(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">{b.platform}</label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {SOCIAL_PLATFORMS.filter(p => !ADULT_PLATFORM_IDS.includes(p.id)).map((p) => (
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
                    <div className="flex items-center gap-2 mt-3 mb-2">
                      <div className="flex-1 h-px bg-gray-200" />
                      <span className="text-xs text-gray-400 font-medium px-1">🔞 Plateformes adultes</span>
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {SOCIAL_PLATFORMS.filter(p => ADULT_PLATFORM_IDS.includes(p.id)).map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setNewLink((prev) => ({ ...prev, platform: p.id, title: prev.title || p.label }))}
                          className={`flex flex-col items-center gap-1 p-2 rounded-lg border text-xs transition-all ${
                            newLink.platform === p.id
                              ? "border-[#FF3366] bg-[#FF3366]/5 text-[#FF3366]"
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
                      label={b.titleLabel}
                      placeholder="Instagram"
                      value={newLink.title}
                      onChange={(e) => setNewLink((p) => ({ ...p, title: e.target.value }))}
                    />
                    <Input
                      label={b.urlLabel}
                      placeholder="https://..."
                      value={newLink.url}
                      onChange={(e) => setNewLink((p) => ({ ...p, url: e.target.value }))}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowAddLink(false)}>{b.cancel}</Button>
                    <Button size="sm" onClick={addLink} style={{ backgroundColor: "#8F00FF" }} className="text-white hover:opacity-90">
                      {b.add}
                    </Button>
                  </div>
                </Card>
              ) : (
                <button
                  onClick={() => {
                    if (!canAddLink) { toast.error(b.planLimit); return; }
                    setShowAddLink(true);
                  }}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-[#8F00FF] hover:text-[#8F00FF] transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  {b.addLink}
                </button>
              )}

              {bioLinks.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <Globe className="w-10 h-10 mx-auto mb-3 opacity-40" />
                  <p>{b.noLinks}</p>
                </div>
              ) : (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={bioLinks.map((l) => l.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-2">
                      {bioLinks.map((link) => (
                        <SortableLinkRow
                          key={link.id}
                          link={link}
                          isFree={isFree}
                          editingLink={editingLink}
                          iconMenuLinkId={iconMenuLinkId}
                          setEditingLink={setEditingLink}
                          setIconMenuLinkId={setIconMenuLinkId}
                          setBioLinks={setBioLinks}
                          toggleLink={toggleLink}
                          deleteLink={deleteLink}
                          removeLinkIcon={removeLinkIcon}
                          setUploadIconLinkId={setUploadIconLinkId}
                          iconInputRef={iconInputRef}
                          b={b}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
              {/* Hidden file input for custom link icons */}
              <input
                ref={iconInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLinkIconUpload}
              />
            </div>
          )}

          {activeTab === "appearance" && (
            <Card className="p-5 space-y-5">
              <div className="pb-4 border-b border-gray-100">
                <AvatarUpload
                  currentImage={pageForm.avatar}
                  name={pageForm.title || session?.user?.name}
                  onImageChange={(base64) => setPageForm((p) => ({ ...p, avatar: base64 }))}
                  label={b.avatarLabel}
                />
              </div>
              <Input
                label={b.nameLabel}
                placeholder={b.namePlaceholder}
                value={pageForm.title}
                onChange={(e) => setPageForm((p) => ({ ...p, title: e.target.value }))}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{b.descLabel}</label>
                <textarea
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8F00FF]/20 focus:border-[#8F00FF] resize-none"
                  rows={4}
                  placeholder={b.descPlaceholder}
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
                  {b.predefinedTheme}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {THEMES.map((theme) => {
                    const isLocked = isFree && theme.id !== "default";
                    return (
                      <button
                        key={theme.id}
                        onClick={() => {
                          if (isLocked) {
                            toast(
                              (t) => (
                                <span className="text-sm">
                                  🔒 {b.lockedTheme}{" "}
                                  <a
                                    href="/dashboard/billing"
                                    className="font-semibold text-[#8F00FF] underline"
                                    onClick={() => toast.dismiss(t.id)}
                                  >
                                    {b.upgrade}
                                  </a>
                                </span>
                              ),
                              { duration: 4000 }
                            );
                            return;
                          }
                          setPageForm((p) => ({
                            ...p,
                            theme: theme.id,
                            ...(theme.id !== "gradient" && { bgColor: THEME_BG_DEFAULTS[theme.id] ?? p.bgColor }),
                          }));
                        }}
                        className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                          isLocked
                            ? "border-gray-200 opacity-70 cursor-not-allowed"
                            : pageForm.theme === theme.id
                            ? "border-[#8F00FF]"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className={`h-16 ${theme.preview}`} />
                        <div className="p-2 text-xs font-medium text-center text-gray-700 bg-white">
                          {b.themes[theme.id as keyof typeof b.themes]}
                        </div>
                        {isLocked && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                            <div className="bg-white/90 rounded-full p-1.5 shadow">
                              <Lock className="w-3.5 h-3.5 text-gray-500" />
                            </div>
                          </div>
                        )}
                        {!isLocked && pageForm.theme === theme.id && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-[#8F00FF] rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold text-gray-900 mb-4">{b.customColors}</h3>
                <div className="relative">
                  {isFree && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-xl bg-white/80 backdrop-blur-[2px]">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Lock className="w-4 h-4 text-[#8F00FF]" />
                        {b.lockedColors}
                      </div>
                      <a href="/dashboard/billing" className="text-xs font-semibold text-white bg-[#8F00FF] px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity">
                        {b.upgrade}
                      </a>
                    </div>
                  )}
                  <div className={`grid grid-cols-2 gap-4 ${isFree ? "blur-[2px] pointer-events-none select-none" : ""}`}>
                    {[
                      { label: b.primaryColor, key: "primaryColor" as const },
                      { label: b.bgColor, key: "bgColor" as const },
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

                    {/* Couleur de la police */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Couleur de la police</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={pageForm.fontColor || "#000000"}
                          onChange={(e) => setPageForm((p) => ({ ...p, fontColor: e.target.value }))}
                          className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
                        />
                        <span className="text-sm font-mono text-gray-500">{pageForm.fontColor || "Auto"}</span>
                        {pageForm.fontColor && (
                          <button
                            type="button"
                            onClick={() => setPageForm((p) => ({ ...p, fontColor: null }))}
                            className="text-xs text-gray-400 hover:text-red-500 underline transition-colors"
                          >
                            Réinitialiser
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Taille de la police */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Taille de la police</label>
                      <div className="flex gap-2">
                        {(["sm", "md", "lg"] as const).map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setPageForm((p) => ({ ...p, fontSize: s }))}
                            className={`flex-1 py-2 rounded-xl border-2 text-sm font-semibold transition-all ${
                              pageForm.fontSize === s
                                ? "border-[#8F00FF] bg-[#8F00FF]/5 text-[#8F00FF]"
                                : "border-gray-200 text-gray-600 hover:border-gray-300"
                            }`}
                          >
                            {s === "sm" ? "Petit" : s === "md" ? "Normal" : "Grand"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Taille des îcones */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Taille des icônes</label>
                      <div className="flex gap-2">
                        {(["sm", "md", "lg"] as const).map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setPageForm((p) => ({ ...p, iconSize: s }))}
                            className={`flex-1 py-2 rounded-xl border-2 text-sm font-semibold transition-all ${
                              pageForm.iconSize === s
                                ? "border-[#8F00FF] bg-[#8F00FF]/5 text-[#8F00FF]"
                                : "border-gray-200 text-gray-600 hover:border-gray-300"
                            }`}
                          >
                            {s === "sm" ? "Petit" : s === "md" ? "Normal" : "Grand"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  {b.bgImage}
                </h3>
                <p className="text-xs text-gray-400 mb-4">{b.bgImageHint}</p>
                {isFree ? (
                  <div className="w-full h-32 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 cursor-not-allowed">
                    <Lock className="w-6 h-6 text-[#8F00FF]/60" />
                    <span className="text-sm font-medium text-gray-500">{b.lockedBgImage}</span>
                    <a href="/dashboard/billing" className="text-xs font-semibold text-white bg-[#8F00FF] px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity mt-1">
                      {b.upgrade}
                    </a>
                  </div>
                                ) : pageForm.bgImage ? (
                  <div className="relative rounded-xl overflow-hidden border border-gray-200 group" style={{ aspectRatio: "9/16", maxHeight: "260px" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={pageForm.bgImage} alt="Fond" className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button
                        onClick={() => bgImageRef.current?.click()}
                        className="bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-100 flex items-center gap-1.5"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        {b.changeBgImage}
                      </button>
                      <button
                        onClick={() => setPageForm((p) => ({ ...p, bgImage: null }))}
                        className="bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-red-600 flex items-center gap-1.5"
                      >
                        <X className="w-3.5 h-3.5" />
                        {b.removeBgImage}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => bgImageRef.current?.click()}
                    className="w-full h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-[#8F00FF] hover:text-[#8F00FF] transition-colors"
                  >
                    <ImageIcon className="w-8 h-8" />
                    <span className="text-sm font-medium">{b.importBgImage}</span>
                    <span className="text-xs">{b.bgImageFormat}</span>
                    <span className="text-[10px] text-green-600 font-medium">📱 Format portrait 9:16 recommandé</span>
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
                  {b.buttonStyleTitle}
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
                        {b.exampleBtn}
                      </div>
                      <p className="text-xs text-center font-medium text-gray-700">
                        {b.buttonStyles[bs.id as keyof typeof b.buttonStyles]}
                      </p>
                    </button>
                  ))}
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  {b.fontStyleTitle}
                </h3>

                {/* Basiques */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {FONT_STYLES.filter((f) => f.group === "base").map((fs) => (
                    <button
                      key={fs.id}
                      onClick={() => setPageForm((p) => ({ ...p, fontStyle: fs.id }))}
                      className={`p-2 border-2 rounded-xl transition-all ${
                        pageForm.fontStyle === fs.id
                          ? "border-[#8F00FF] bg-[#8F00FF]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <p className={`text-base text-center mb-0.5 font-semibold text-gray-800 ${fs.cls}`}>Aa</p>
                      <p className="text-[10px] text-center font-medium text-gray-600 truncate leading-tight">
                        {b.fontStyles[fs.id as keyof typeof b.fontStyles]}
                      </p>
                    </button>
                  ))}
                </div>

                {/* Top créatrices */}
                <p className="text-xs font-semibold text-pink-500 mb-2 flex items-center gap-1">
                  ⭐ {b.fontCreatorLabel}
                </p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {FONT_STYLES.filter((f) => f.group === "creator").map((fs) => (
                    <button
                      key={fs.id}
                      onClick={() => setPageForm((p) => ({ ...p, fontStyle: fs.id }))}
                      className={`p-2 border-2 rounded-xl transition-all ${
                        pageForm.fontStyle === fs.id
                          ? "border-[#8F00FF] bg-[#8F00FF]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <p className={`text-base text-center mb-0.5 font-semibold text-gray-800 ${fs.cls}`}>Aa</p>
                      <p className="text-[10px] text-center font-medium text-gray-600 truncate leading-tight">
                        {b.fontStyles[fs.id as keyof typeof b.fontStyles]}
                      </p>
                    </button>
                  ))}
                </div>

                {/* Style & Design */}
                <p className="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1">
                  🎨 {b.fontStyleLabel}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {FONT_STYLES.filter((f) => f.group === "style").map((fs) => (
                    <button
                      key={fs.id}
                      onClick={() => setPageForm((p) => ({ ...p, fontStyle: fs.id }))}
                      className={`p-2 border-2 rounded-xl transition-all ${
                        pageForm.fontStyle === fs.id
                          ? "border-[#8F00FF] bg-[#8F00FF]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <p className={`text-base text-center mb-0.5 font-semibold text-gray-800 ${fs.cls}`}>Aa</p>
                      <p className="text-[10px] text-center font-medium text-gray-600 truncate leading-tight">
                        {b.fontStyles[fs.id as keyof typeof b.fontStyles]}
                      </p>
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
                {b.socialTitle}
              </h3>
              <p className="text-xs text-gray-400 mb-5">{b.socialHint}</p>
              <div className="space-y-3">
                {SOCIAL_ICON_PLATFORM_IDS.map((id) => {
                  const platformInfo = SOCIAL_PLATFORMS.find(p => p.id === id);
                  return (
                    <div key={id} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <SocialIcon platform={id} size={16} />
                      </div>
                      <input
                        type="url"
                        placeholder={`URL ${platformInfo?.label || id}`}
                        value={pageForm.socialLinks.find((s) => s.platform === id)?.url || ""}
                        onChange={(e) => updateSocialLink(id, e.target.value)}
                        className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8F00FF]/20 focus:border-[#8F00FF]"
                      />
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </div>

        {/* LIVE PREVIEW */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-sm font-medium text-gray-500 mb-3 text-center">{b.livePreview}</p>
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
                          backgroundPosition: "center top",
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
                      <p
                        className={`${pageForm.fontSize === "sm" ? "text-[9px]" : pageForm.fontSize === "lg" ? "text-[13px]" : "text-[11px]"} font-bold text-center ${isDarkBg ? "text-white" : "text-gray-900"}`}
                        style={pageForm.fontColor ? { color: pageForm.fontColor } : undefined}
                      >
                        {pageForm.title || session?.user?.name || b.yourName}
                      </p>
                      {pageForm.description && (
                        <p
                          className={`${pageForm.fontSize === "sm" ? "text-[7px]" : pageForm.fontSize === "lg" ? "text-[11px]" : "text-[9px]"} text-center mt-0.5 leading-tight max-w-[180px] ${isDarkBg ? "text-white/70" : "text-gray-500"}`}
                          style={pageForm.fontColor ? { color: pageForm.fontColor, opacity: 0.8 } : undefined}
                        >
                          {pageForm.description.slice(0, 60)}{pageForm.description.length > 60 ? "..." : ""}
                        </p>
                      )}
                    </div>

                    {/* Links preview */}
                    {bioLinks.filter((l) => l.active).map((link) => {
                      const isOutline = pageForm.buttonStyle === "outline";
                      const btnCls = BUTTON_STYLES.find((b) => b.id === pageForm.buttonStyle)?.cls || "rounded-xl";
                      const previewIconSize = pageForm.iconSize === "sm" ? 8 : pageForm.iconSize === "lg" ? 16 : 12;
                      const previewImgCls = pageForm.iconSize === "sm" ? "w-2 h-2" : pageForm.iconSize === "lg" ? "w-4 h-4" : "w-3 h-3";
                      const previewTextCls = pageForm.fontSize === "sm" ? "text-[8px]" : pageForm.fontSize === "lg" ? "text-xs" : "text-[10px]";
                      return (
                        <div
                          key={link.id}
                          className={`flex items-center gap-2 px-3 py-2 ${previewTextCls} font-semibold ${btnCls}`}
                          style={{
                            backgroundColor: isOutline ? "transparent" : pageForm.primaryColor,
                            border: isOutline ? `1.5px solid ${pageForm.primaryColor}` : undefined,
                            color: isOutline ? (pageForm.fontColor || pageForm.primaryColor) : (pageForm.fontColor || "white"),
                          }}
                        >
                          {link.icon && link.icon.startsWith("data:") ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={link.icon} alt="" className={`${previewImgCls} rounded object-cover flex-shrink-0`} />
                          ) : (
                            <SocialIcon
                              platform={link.platform || "other"}
                              size={previewIconSize}
                              color={isOutline ? (pageForm.fontColor || pageForm.primaryColor) : (pageForm.fontColor || "white")}
                            />
                          )}
                          <span className="flex-1 text-center">{link.title}</span>
                        </div>
                      );
                    })}

                    {bioLinks.filter((l) => l.active).length === 0 && (
                      <div className="text-center text-xs text-gray-400 py-4">{b.yourLinks}</div>
                    )}

                    {/* Social icons row */}
                    {pageForm.socialLinks.filter((s) => s.url).length > 0 && (
                      <div className="flex justify-center gap-2 pt-2 flex-wrap">
                        {pageForm.socialLinks.filter((s) => s.url).map((s) => (
                            <div
                              key={s.platform}
                              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                                isDarkBg ? "bg-white/20 text-white" : "bg-gray-200 text-gray-600"
                              }`}
                            >
                              <SocialIcon platform={s.platform} size={13} color={isDarkBg ? "white" : undefined} />
                            </div>
                          ))}
                      </div>
                    )}

                    {/* Branding */}
                    <div className="text-center pt-1">
                      <span className={`text-[10px] ${isDarkBg ? "text-white/40" : "text-gray-400"}`}>
                        {b.createdWith}{" "}
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
              <p className="text-xs text-gray-500 mb-1">{b.yourLink}</p>
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
