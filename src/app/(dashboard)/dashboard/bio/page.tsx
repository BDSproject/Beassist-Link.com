"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import {
  Plus,
  Trash2,
  GripVertical,
  Eye,
  Palette,
  User,
  Globe,
  Pencil,
  X,
  Check,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SOCIAL_PLATFORMS } from "@/lib/utils";
import { canUserDo } from "@/lib/plans";

interface BioPage {
  id: string;
  title: string;
  description: string | null;
  avatar: string | null;
  primaryColor: string;
  bgColor: string;
  theme: string;
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
  { id: "default", label: "Défaut", preview: "bg-white" },
  { id: "dark", label: "Sombre", preview: "bg-gray-900" },
  { id: "gradient", label: "Dégradé", preview: "bg-gradient-to-br from-purple-500 to-pink-500" },
  { id: "minimal", label: "Minimal", preview: "bg-gray-50" },
];

export default function BioPage() {
  const { data: session } = useSession();
  const [bioPage, setBioPage] = useState<BioPage | null>(null);
  const [bioLinks, setBioLinks] = useState<BioLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"links" | "appearance">("links");
  const [showAddLink, setShowAddLink] = useState(false);
  const [editingLink, setEditingLink] = useState<string | null>(null);

  const [newLink, setNewLink] = useState({
    title: "",
    url: "",
    platform: "",
    icon: "",
  });

  const [pageForm, setPageForm] = useState({
    title: "",
    description: "",
    primaryColor: "#8F00FF",
    bgColor: "#FFFFFF",
    theme: "default",
  });

  const canAddLink = session?.user?.plan
    ? canUserDo(session.user.plan as import("@/lib/plans").PlanName, "maxBioLinks", bioLinks.length)
    : false;

  const fetchBioData = useCallback(async () => {
    try {
      const [bioRes, linksRes] = await Promise.all([
        fetch("/api/bio"),
        fetch("/api/bio/links"),
      ]);
      const bioData = await bioRes.json();
      const linksData = await linksRes.json();

      if (bioData.bioPage) {
        setBioPage(bioData.bioPage);
        setPageForm({
          title: bioData.bioPage.title || "",
          description: bioData.bioPage.description || "",
          primaryColor: bioData.bioPage.primaryColor || "#8F00FF",
          bgColor: bioData.bioPage.bgColor || "#FFFFFF",
          theme: bioData.bioPage.theme || "default",
        });
      }
      if (linksData.links) {
        setBioLinks(linksData.links.sort((a: BioLink, b: BioLink) => a.order - b.order));
      }
    } catch {
      toast.error("Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBioData();
  }, [fetchBioData]);

  const saveBioPage = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/bio", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pageForm),
      });
      if (!res.ok) throw new Error();
      toast.success("Page mise à jour !");
      fetchBioData();
    } catch {
      toast.error("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  };

  const addLink = async () => {
    if (!newLink.title || !newLink.url) {
      toast.error("Titre et URL requis");
      return;
    }
    try {
      const res = await fetch("/api/bio/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newLink,
          order: bioLinks.length,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setBioLinks((prev) => [...prev, data.link]);
      setNewLink({ title: "", url: "", platform: "", icon: "" });
      setShowAddLink(false);
      toast.success("Lien ajouté !");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Erreur");
    }
  };

  const deleteLink = async (id: string) => {
    try {
      const res = await fetch(`/api/bio/links/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setBioLinks((prev) => prev.filter((l) => l.id !== id));
      toast.success("Lien supprimé");
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };

  const toggleLink = async (id: string, active: boolean) => {
    try {
      await fetch(`/api/bio/links/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !active }),
      });
      setBioLinks((prev) =>
        prev.map((l) => (l.id === id ? { ...l, active: !active } : l))
      );
    } catch {
      toast.error("Erreur");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-[#8F00FF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Page Bio</h1>
          <p className="text-gray-500 mt-1">
            Personnalisez votre page publique
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <a
            href={`/${session?.user?.username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Prévisualiser
              <ExternalLink className="w-3 h-3 ml-1.5" />
            </Button>
          </a>
          <Button
            onClick={saveBioPage}
            loading={saving}
            size="sm"
            style={{ backgroundColor: "#8F00FF" }}
            className="text-white hover:opacity-90"
          >
            <Check className="w-4 h-4 mr-2" />
            Enregistrer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left - Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {[
              { id: "links", label: "Liens", icon: Globe },
              { id: "appearance", label: "Apparence", icon: Palette },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "links" | "appearance")}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-[#8F00FF] text-[#8F00FF]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Links Tab */}
          {activeTab === "links" && (
            <div className="space-y-4">
              {/* Add Link */}
              {showAddLink ? (
                <Card className="p-4 border-2 border-[#8F00FF]/30">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">Nouveau lien</h3>
                      <button
                        onClick={() => setShowAddLink(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Platform selector */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Plateforme (optionnel)
                      </label>
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                        {SOCIAL_PLATFORMS.slice(0, 12).map((p) => (
                          <button
                            key={p.id}
                            onClick={() =>
                              setNewLink((prev) => ({
                                ...prev,
                                platform: p.id,
                                title: prev.title || p.label,
                                icon: p.icon,
                              }))
                            }
                            className={`flex flex-col items-center gap-1 p-2 rounded-lg border text-xs transition-all ${
                              newLink.platform === p.id
                                ? "border-[#8F00FF] bg-[#8F00FF]/5 text-[#8F00FF]"
                                : "border-gray-200 hover:border-gray-300 text-gray-600"
                            }`}
                          >
                            <span className="text-lg">{p.icon}</span>
                            <span className="truncate w-full text-center">{p.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Titre"
                        placeholder="Instagram"
                        value={newLink.title}
                        onChange={(e) =>
                          setNewLink((prev) => ({ ...prev, title: e.target.value }))
                        }
                      />
                      <Input
                        label="URL"
                        placeholder="https://instagram.com/..."
                        value={newLink.url}
                        onChange={(e) =>
                          setNewLink((prev) => ({ ...prev, url: e.target.value }))
                        }
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAddLink(false)}
                      >
                        Annuler
                      </Button>
                      <Button
                        size="sm"
                        onClick={addLink}
                        style={{ backgroundColor: "#8F00FF" }}
                        className="text-white hover:opacity-90"
                      >
                        Ajouter le lien
                      </Button>
                    </div>
                  </div>
                </Card>
              ) : (
                <button
                  onClick={() => {
                    if (!canAddLink) {
                      toast.error(
                        "Limite atteinte. Passez à un plan supérieur pour ajouter plus de liens."
                      );
                      return;
                    }
                    setShowAddLink(true);
                  }}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-[#8F00FF] hover:text-[#8F00FF] transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter un lien
                </button>
              )}

              {/* Links list */}
              {bioLinks.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <Globe className="w-10 h-10 mx-auto mb-3 opacity-40" />
                  <p>Aucun lien pour l&apos;instant</p>
                  <p className="text-sm">Ajoutez vos réseaux sociaux ci-dessus</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {bioLinks.map((link) => (
                    <div
                      key={link.id}
                      className={`flex items-center gap-3 p-3 bg-white rounded-xl border transition-all ${
                        link.active
                          ? "border-gray-200"
                          : "border-gray-100 opacity-60"
                      }`}
                    >
                      <div className="text-gray-400 cursor-grab">
                        <GripVertical className="w-4 h-4" />
                      </div>

                      <div className="text-xl w-8 text-center">
                        {link.icon || "🔗"}
                      </div>

                      <div className="flex-1 min-w-0">
                        {editingLink === link.id ? (
                          <div className="flex gap-2">
                            <input
                              className="flex-1 text-sm font-medium border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#8F00FF]"
                              defaultValue={link.title}
                              onBlur={async (e) => {
                                await fetch(`/api/bio/links/${link.id}`, {
                                  method: "PATCH",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ title: e.target.value }),
                                });
                                setBioLinks((prev) =>
                                  prev.map((l) =>
                                    l.id === link.id ? { ...l, title: e.target.value } : l
                                  )
                                );
                                setEditingLink(null);
                              }}
                              autoFocus
                            />
                          </div>
                        ) : (
                          <>
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {link.title}
                            </p>
                            <p className="text-xs text-gray-400 truncate">{link.url}</p>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-400 mr-1">
                          {link.clicks} clics
                        </span>
                        <button
                          onClick={() => setEditingLink(editingLink === link.id ? null : link.id)}
                          className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleLink(link.id, link.active)}
                          className={`px-2 py-1 text-xs rounded-full font-medium transition-colors ${
                            link.active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-500"
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

          {/* Appearance Tab */}
          {activeTab === "appearance" && (
            <div className="space-y-6">
              {/* Profile info */}
              <Card className="p-5">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Informations de profil
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Titre de la page"
                    placeholder="Votre nom ou pseudo"
                    value={pageForm.title}
                    onChange={(e) =>
                      setPageForm((p) => ({ ...p, title: e.target.value }))
                    }
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Description
                    </label>
                    <textarea
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8F00FF]/20 focus:border-[#8F00FF] resize-none"
                      rows={3}
                      placeholder="Décrivez-vous en quelques mots..."
                      value={pageForm.description}
                      onChange={(e) =>
                        setPageForm((p) => ({ ...p, description: e.target.value }))
                      }
                    />
                  </div>
                </div>
              </Card>

              {/* Theme */}
              <Card className="p-5">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Thème
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() =>
                        setPageForm((p) => ({ ...p, theme: theme.id }))
                      }
                      className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                        pageForm.theme === theme.id
                          ? "border-[#8F00FF]"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className={`h-16 ${theme.preview}`} />
                      <div className="p-2 text-xs font-medium text-center text-gray-700 bg-white">
                        {theme.label}
                      </div>
                      {pageForm.theme === theme.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-[#8F00FF] rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </Card>

              {/* Colors */}
              <Card className="p-5">
                <h3 className="font-semibold text-gray-900 mb-4">Couleurs</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Couleur principale
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={pageForm.primaryColor}
                        onChange={(e) =>
                          setPageForm((p) => ({ ...p, primaryColor: e.target.value }))
                        }
                        className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
                      />
                      <span className="text-sm font-mono text-gray-500">
                        {pageForm.primaryColor}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Couleur de fond
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={pageForm.bgColor}
                        onChange={(e) =>
                          setPageForm((p) => ({ ...p, bgColor: e.target.value }))
                        }
                        className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
                      />
                      <span className="text-sm font-mono text-gray-500">
                        {pageForm.bgColor}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Right - Preview */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-sm font-medium text-gray-500 mb-3 text-center">
              Aperçu en direct
            </p>
            {/* Phone mockup */}
            <div className="mx-auto w-64">
              <div className="relative bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-10" />
                {/* Screen */}
                <div
                  className="rounded-[2rem] overflow-hidden h-[500px] flex flex-col"
                  style={{ backgroundColor: pageForm.bgColor }}
                >
                  <div className="flex-1 overflow-y-auto p-4 pt-8 space-y-3">
                    {/* Avatar placeholder */}
                    <div className="flex flex-col items-center mb-4">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2"
                        style={{ backgroundColor: pageForm.primaryColor }}
                      >
                        {pageForm.title?.charAt(0) || session?.user?.name?.charAt(0) || "A"}
                      </div>
                      <p className="text-sm font-bold text-gray-900 text-center">
                        {pageForm.title || session?.user?.name || "Votre nom"}
                      </p>
                      {pageForm.description && (
                        <p className="text-xs text-gray-500 text-center mt-1 leading-relaxed">
                          {pageForm.description}
                        </p>
                      )}
                    </div>

                    {/* Links preview */}
                    {bioLinks.filter((l) => l.active).map((link) => (
                      <div
                        key={link.id}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-white text-xs font-medium"
                        style={{ backgroundColor: pageForm.primaryColor }}
                      >
                        <span>{link.icon || "🔗"}</span>
                        <span className="flex-1 text-center">{link.title}</span>
                      </div>
                    ))}

                    {bioLinks.filter((l) => l.active).length === 0 && (
                      <div className="text-center text-xs text-gray-400 py-4">
                        Vos liens apparaîtront ici
                      </div>
                    )}

                    {/* Branding */}
                    <div className="text-center pt-2">
                      <span className="text-xs text-gray-400">
                        Créé avec{" "}
                        <span className="font-semibold text-gray-600">
                          Beassist<span style={{ color: pageForm.primaryColor }}>Link</span>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Public link */}
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

            {/* Plan badge */}
            <div className="mt-3 text-center">
              <Badge
                variant={
                  session?.user?.plan === "PRO"
                    ? "primary"
                    : session?.user?.plan === "STARTER"
                    ? "outline"
                    : "gray"
                }
                size="sm"
              >
                Plan {session?.user?.plan || "FREE"}
              </Badge>
              {!canAddLink && (
                <p className="text-xs text-gray-500 mt-2">
                  Limite de liens atteinte.{" "}
                  <a href="/dashboard/billing" className="text-[#8F00FF] hover:underline">
                    Passer à Pro
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
