"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import {
  Plus,
  Link2,
  Copy,
  Trash2,
  ExternalLink,
  Search,
  ToggleLeft,
  ToggleRight,
  Pencil,
  Check,
  X,
  AtSign,
  Sparkles,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PLANS } from "@/lib/plans";
import { formatNumber, formatDate, isValidUrl } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";
import { usePlan } from "@/hooks/use-plan";

const linkSchema = z.object({
  url: z.string().url("URL invalide — ex: https://exemple.com"),
  title: z.string().optional(),
  slug: z
    .string()
    .regex(/^[a-zA-Z0-9_-]*$/, "Uniquement lettres, chiffres, - et _")
    .optional(),
});

type LinkForm = z.infer<typeof linkSchema>;

interface Link {
  id: string;
  slug: string;
  url: string;
  title?: string;
  clicks: number;
  active: boolean;
  createdAt: string;
}

export default function LinksPage() {
  const { data: session } = useSession();
  const { t } = useLanguage();
  const d = t.dashboard.links;
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  // Édition d'alias inline
  const [editingAlias, setEditingAlias] = useState<string | null>(null);
  const [aliasValue, setAliasValue] = useState("");
  const [savingAlias, setSavingAlias] = useState(false);
  // Prévisualisation slug dans le formulaire
  const [slugPreview, setSlugPreview] = useState("");

  const { plan } = usePlan();
  const planLimits = PLANS[plan as keyof typeof PLANS]?.limits;
  const username = session?.user?.username || session?.user?.name?.toLowerCase().replace(/\s+/g, "") || "";
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://www.beassist-link.com";

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LinkForm>({ resolver: zodResolver(linkSchema) });

  const watchedSlug = watch("slug");

  useEffect(() => {
    setSlugPreview(watchedSlug || "");
  }, [watchedSlug]);

  const fetchLinks = useCallback(async () => {
    try {
      const res = await fetch("/api/links");
      const data = await res.json();
      setLinks(data.links || []);
    } catch {
      toast.error(d.loadError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const fillWithUsername = () => {
    if (!planLimits?.hasCustomAlias) {
      toast.error("Les alias personnalisés nécessitent un plan Starter ou Pro.");
      return;
    }
    setValue("slug", username);
    setSlugPreview(username);
  };

  const onSubmit = async (data: LinkForm) => {
    if (
      planLimits?.maxShortLinks !== -1 &&
      links.length >= (planLimits?.maxShortLinks || 3)
    ) {
      toast.error(
        d.limitReached.replace("{count}", String(planLimits?.maxShortLinks))
      );
      return;
    }

    setCreating(true);
    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: data.url,
          title: data.title || undefined,
          slug: data.slug?.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      }

      const { link } = await res.json();
      setLinks((prev) => [link, ...prev]);
      reset();
      setSlugPreview("");
      setShowForm(false);
      toast.success(d.created);
    } catch (error: any) {
      toast.error(error.message || d.createError);
    } finally {
      setCreating(false);
    }
  };

  const copyLink = (slug: string) => {
    const url = `${baseUrl}/r/${slug}`;
    navigator.clipboard.writeText(url);
    setCopied(slug);
    toast.success(d.copied);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleLink = async (id: string, active: boolean) => {
    try {
      await fetch(`/api/links/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !active }),
      });
      setLinks((prev) =>
        prev.map((l) => (l.id === id ? { ...l, active: !active } : l))
      );
      toast.success(active ? d.deactivated : d.activated);
    } catch {
      toast.error(d.loadError);
    }
  };

  const deleteLink = async (id: string) => {
    if (!confirm(d.confirmDelete)) return;
    try {
      await fetch(`/api/links/${id}`, { method: "DELETE" });
      setLinks((prev) => prev.filter((l) => l.id !== id));
      toast.success(d.deleted);
    } catch {
      toast.error(d.deleteError);
    }
  };

  const startEditAlias = (link: Link) => {
    if (!planLimits?.hasCustomAlias) {
      toast.error("Modification d'alias disponible dès le plan Starter.");
      return;
    }
    setEditingAlias(link.id);
    setAliasValue(link.slug);
  };

  const saveAlias = async (id: string) => {
    const trimmed = aliasValue.trim();
    if (!trimmed || !/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
      toast.error("Alias invalide — uniquement lettres, chiffres, - et _");
      return;
    }
    setSavingAlias(true);
    try {
      const res = await fetch(`/api/links/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: trimmed }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      }
      const { link: updated } = await res.json();
      setLinks((prev) => prev.map((l) => (l.id === id ? updated : l)));
      setEditingAlias(null);
      toast.success("Alias mis à jour !");
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la mise à jour");
    } finally {
      setSavingAlias(false);
    }
  };

  const filteredLinks = links.filter(
    (l) =>
      l.title?.toLowerCase().includes(search.toLowerCase()) ||
      l.slug.toLowerCase().includes(search.toLowerCase()) ||
      l.url.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900">{d.title}</h1>
          <p className="text-gray-500 mt-1 text-sm">
            {links.length} /{" "}
            {planLimits?.maxShortLinks === -1 ? "∞" : planLimits?.maxShortLinks}{" "}
            {d.linksUsed}
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={16} />
          {d.newLink}
        </Button>
      </div>

      {/* Formulaire création */}
      {showForm && (
        <Card padding="md" className="mb-6 border-[#EAD6FF]">
          <h2 className="font-bold text-gray-900 mb-4">{d.createTitle}</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label={d.urlLabel}
              type="url"
              placeholder={d.urlPlaceholder}
              leftIcon={<Link2 size={16} />}
              error={errors.url?.message}
              {...register("url")}
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label={d.titleLabel}
                placeholder={d.titlePlaceholder}
                error={errors.title?.message}
                {...register("title")}
              />

              {/* Champ alias avec prévisualisation */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    {d.aliasLabel}
                    {!planLimits?.hasCustomAlias && (
                      <span className="ml-2 inline-flex items-center gap-1 text-xs text-amber-600 font-normal">
                        <Lock size={10} /> Starter+
                      </span>
                    )}
                  </label>
                  {planLimits?.hasCustomAlias && username && (
                    <button
                      type="button"
                      onClick={fillWithUsername}
                      className="inline-flex items-center gap-1 text-xs text-[#8F00FF] hover:underline font-medium"
                    >
                      <AtSign size={11} />
                      Utiliser {username}
                    </button>
                  )}
                </div>

                {/* Input avec préfixe domaine */}
                <div className="flex items-center rounded-xl border border-gray-200 focus-within:border-[#8F00FF] focus-within:ring-2 focus-within:ring-[#8F00FF]/20 overflow-hidden bg-white transition-all">
                  <span className="px-3 text-xs text-gray-400 bg-gray-50 border-r border-gray-200 h-full flex items-center py-2.5 whitespace-nowrap select-none">
                    /r/
                  </span>
                  <input
                    type="text"
                    placeholder={planLimits?.hasCustomAlias ? "mon-alias" : "Généré automatiquement"}
                    disabled={!planLimits?.hasCustomAlias}
                    className="flex-1 px-3 py-2.5 text-sm outline-none bg-transparent disabled:text-gray-400 disabled:cursor-not-allowed"
                    {...register("slug")}
                  />
                  {planLimits?.hasCustomAlias && slugPreview && (
                    <span className="px-2">
                      <Sparkles size={13} className="text-[#8F00FF]" />
                    </span>
                  )}
                </div>

                {/* Prévisualisation URL complète */}
                {slugPreview && planLimits?.hasCustomAlias && (
                  <p className="text-xs text-[#8F00FF] font-mono bg-purple-50 rounded-lg px-3 py-1.5 truncate">
                    {baseUrl}/r/{slugPreview}
                  </p>
                )}
                {errors.slug && (
                  <p className="text-xs text-red-500">{errors.slug.message}</p>
                )}
                {!planLimits?.hasCustomAlias && (
                  <p className="text-xs text-gray-400">{d.aliasUnavailable}</p>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" variant="primary" size="md" loading={creating}>
                {d.create}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={() => { setShowForm(false); reset(); setSlugPreview(""); }}
              >
                {d.cancel}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Recherche */}
      <div className="mb-4">
        <Input
          placeholder={d.searchPlaceholder}
          leftIcon={<Search size={16} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Liste des liens */}
      <Card padding="none">
        {loading ? (
          <div className="p-8 text-center text-gray-400">{d.loading}</div>
        ) : filteredLinks.length === 0 ? (
          <div className="p-12 text-center">
            <Link2 size={40} className="mx-auto text-gray-200 mb-4" />
            <h3 className="font-semibold text-gray-700 mb-2">{d.noLinksFound}</h3>
            <p className="text-sm text-gray-400 mb-4">
              {search ? d.noLinksSearch : d.noLinksEmpty}
            </p>
            {!search && (
              <Button variant="primary" size="sm" onClick={() => setShowForm(true)}>
                {d.createLink}
              </Button>
            )}
          </div>
        ) : (
          <div>
            {filteredLinks.map((link, index) => (
              <div
                key={link.id}
                className={`flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors ${
                  index < filteredLinks.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                {/* Info lien */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-gray-900">
                      {link.title || link.slug}
                    </span>
                    <Badge variant={link.active ? "success" : "gray"} size="sm">
                      {link.active ? d.active : d.inactive}
                    </Badge>
                  </div>

                  {/* Alias éditable inline */}
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    {editingAlias === link.id ? (
                      <div className="flex items-center gap-1">
                        <span className="text-gray-400">/r/</span>
                        <input
                          autoFocus
                          value={aliasValue}
                          onChange={(e) => setAliasValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveAlias(link.id);
                            if (e.key === "Escape") setEditingAlias(null);
                          }}
                          className="border border-[#8F00FF] rounded-md px-2 py-0.5 text-xs text-gray-900 outline-none w-32 font-mono"
                        />
                        <button
                          onClick={() => saveAlias(link.id)}
                          disabled={savingAlias}
                          className="p-1 rounded text-green-600 hover:bg-green-50"
                        >
                          <Check size={12} />
                        </button>
                        <button
                          onClick={() => setEditingAlias(null)}
                          className="p-1 rounded text-gray-400 hover:bg-gray-100"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 group/alias">
                        <span className="text-[#8F00FF] font-medium font-mono">
                          /r/{link.slug}
                        </span>
                        <button
                          onClick={() => startEditAlias(link)}
                          title="Modifier l'alias"
                          className="opacity-0 group-hover/alias:opacity-100 transition-opacity p-0.5 rounded hover:bg-purple-100 text-[#8F00FF]"
                        >
                          <Pencil size={10} />
                        </button>
                        {!planLimits?.hasCustomAlias && (
                          <Lock size={10} className="text-gray-300 ml-1" />
                        )}
                      </div>
                    )}
                    <span>→</span>
                    <span className="truncate max-w-[180px]">{link.url}</span>
                  </div>
                </div>

                {/* Clics */}
                <div className="text-center hidden sm:block">
                  <p className="text-lg font-black text-gray-900">
                    {formatNumber(link.clicks)}
                  </p>
                  <p className="text-xs text-gray-400">{d.clicks}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => copyLink(link.slug)}
                    title="Copier le lien court"
                    className={`p-2 rounded-lg transition-colors ${
                      copied === link.slug
                        ? "bg-green-100 text-green-600"
                        : "hover:bg-gray-100 text-gray-400 hover:text-gray-700"
                    }`}
                  >
                    <Copy size={15} />
                  </button>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Ouvrir l'URL originale"
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    <ExternalLink size={15} />
                  </a>
                  <button
                    onClick={() => toggleLink(link.id, link.active)}
                    title={link.active ? "Désactiver" : "Activer"}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    {link.active ? (
                      <ToggleRight size={15} className="text-[#8F00FF]" />
                    ) : (
                      <ToggleLeft size={15} />
                    )}
                  </button>
                  <button
                    onClick={() => deleteLink(link.id)}
                    title="Supprimer"
                    className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

