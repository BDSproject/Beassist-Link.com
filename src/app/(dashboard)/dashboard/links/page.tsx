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
  QrCode,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PLANS } from "@/lib/plans";
import { formatNumber, formatDate, isValidUrl } from "@/lib/utils";

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
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const plan = (session?.user?.plan as any) || "FREE";
  const planLimits = PLANS[plan as keyof typeof PLANS]?.limits;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LinkForm>({ resolver: zodResolver(linkSchema) });

  const fetchLinks = useCallback(async () => {
    try {
      const res = await fetch("/api/links");
      const data = await res.json();
      setLinks(data.links || []);
    } catch {
      toast.error("Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const onSubmit = async (data: LinkForm) => {
    if (
      planLimits?.maxShortLinks !== -1 &&
      links.length >= (planLimits?.maxShortLinks || 3)
    ) {
      toast.error(
        `Limite atteinte (${planLimits?.maxShortLinks} liens). Passez au plan supérieur !`
      );
      return;
    }

    setCreating(true);
    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      }

      const { link } = await res.json();
      setLinks((prev) => [link, ...prev]);
      reset();
      setShowForm(false);
      toast.success("Lien créé avec succès !");
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la création");
    } finally {
      setCreating(false);
    }
  };

  const copyLink = (slug: string) => {
    const url = `${window.location.origin}/r/${slug}`;
    navigator.clipboard.writeText(url);
    setCopied(slug);
    toast.success("Lien copié !");
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
      toast.success(active ? "Lien désactivé" : "Lien activé");
    } catch {
      toast.error("Erreur");
    }
  };

  const deleteLink = async (id: string) => {
    if (!confirm("Supprimer ce lien ?")) return;
    try {
      await fetch(`/api/links/${id}`, { method: "DELETE" });
      setLinks((prev) => prev.filter((l) => l.id !== id));
      toast.success("Lien supprimé");
    } catch {
      toast.error("Erreur lors de la suppression");
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
          <h1 className="text-2xl font-black text-gray-900">
            Liens raccourcis
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            {links.length} /{" "}
            {planLimits?.maxShortLinks === -1
              ? "∞"
              : planLimits?.maxShortLinks}{" "}
            liens utilisés
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={16} />
          Nouveau lien
        </Button>
      </div>

      {/* Formulaire création */}
      {showForm && (
        <Card padding="md" className="mb-6 border-[#EAD6FF]">
          <h2 className="font-bold text-gray-900 mb-4">Créer un lien raccourci</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="URL de destination *"
              type="url"
              placeholder="https://exemple.com/mon-article"
              leftIcon={<Link2 size={16} />}
              error={errors.url?.message}
              {...register("url")}
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Titre (optionnel)"
                placeholder="Mon article de blog"
                error={errors.title?.message}
                {...register("title")}
              />
              <Input
                label="Alias personnalisé (optionnel)"
                placeholder="mon-lien"
                hint={
                  planLimits?.hasCustomAlias
                    ? "Votre lien : beassistlink.com/r/mon-lien"
                    : "Disponible avec Starter ou Pro"
                }
                disabled={!planLimits?.hasCustomAlias}
                error={errors.slug?.message}
                {...register("slug")}
              />
            </div>
            <div className="flex gap-3">
              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={creating}
              >
                Créer le lien
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={() => {
                  setShowForm(false);
                  reset();
                }}
              >
                Annuler
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Recherche */}
      <div className="mb-4">
        <Input
          placeholder="Rechercher un lien..."
          leftIcon={<Search size={16} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Liste des liens */}
      <Card padding="none">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Chargement...</div>
        ) : filteredLinks.length === 0 ? (
          <div className="p-12 text-center">
            <Link2 size={40} className="mx-auto text-gray-200 mb-4" />
            <h3 className="font-semibold text-gray-700 mb-2">
              Aucun lien trouvé
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              {search
                ? "Essayez un autre terme de recherche"
                : "Créez votre premier lien raccourci"}
            </p>
            {!search && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowForm(true)}
              >
                Créer un lien
              </Button>
            )}
          </div>
        ) : (
          <div>
            {filteredLinks.map((link, index) => (
              <div
                key={link.id}
                className={`flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors ${
                  index < filteredLinks.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                {/* Info lien */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-gray-900">
                      {link.title || link.slug}
                    </span>
                    <Badge
                      variant={link.active ? "success" : "gray"}
                      size="sm"
                    >
                      {link.active ? "Actif" : "Inactif"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="text-[#8F00FF] font-medium">
                      /r/{link.slug}
                    </span>
                    <span>→</span>
                    <span className="truncate max-w-[200px]">{link.url}</span>
                  </div>
                </div>

                {/* Clics */}
                <div className="text-center hidden sm:block">
                  <p className="text-lg font-black text-gray-900">
                    {formatNumber(link.clicks)}
                  </p>
                  <p className="text-xs text-gray-400">clics</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => copyLink(link.slug)}
                    title="Copier le lien"
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
                    title="Ouvrir"
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
