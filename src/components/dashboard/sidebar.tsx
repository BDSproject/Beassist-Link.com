"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Link2,
  FileText,
  BarChart3,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/dashboard/links", label: "Liens raccourcis", icon: Link2 },
  { href: "/dashboard/bio", label: "Page bio", icon: FileText },
  { href: "/dashboard/analytics", label: "Analytiques", icon: BarChart3 },
  { href: "/dashboard/billing", label: "Facturation", icon: CreditCard },
  { href: "/dashboard/settings", label: "Paramètres", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const plan = session?.user?.plan || "FREE";
  const isPro = plan === "PRO";
  const isStarter = plan === "STARTER";

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-100">
        <Link href="/dashboard">
          <Logo size="md" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-[#F5EBFF] text-[#8F00FF]"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <Icon
                size={18}
                className={cn(
                  "flex-shrink-0",
                  isActive ? "text-[#8F00FF]" : "text-gray-400 group-hover:text-gray-600"
                )}
              />
              {label}
              {isActive && (
                <ChevronRight size={14} className="ml-auto text-[#8F00FF]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade CTA */}
      {!isPro && (
        <div className="px-3 pb-4">
          <Link href="/dashboard/billing">
            <div className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-[#8F00FF] to-[#6200CC] text-white cursor-pointer hover:shadow-lg transition-shadow duration-300">
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-4 translate-x-4" />
              <Sparkles size={20} className="mb-2" />
              <p className="font-bold text-sm mb-1">
                {isStarter ? "Passer au Pro" : "Passer au Starter"}
              </p>
              <p className="text-xs text-purple-200 leading-relaxed">
                {isStarter
                  ? "Domaine custom, analytiques avancées, API"
                  : "Analytiques, QR codes, thèmes premium"}
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold">
                Voir les offres <ChevronRight size={12} />
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Profil utilisateur */}
      <div className="px-3 pb-4 border-t border-gray-100 pt-4">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8F00FF] to-[#6200CC] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {session?.user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {session?.user?.name || "Utilisateur"}
            </p>
            <div className="flex items-center gap-1.5">
              <Badge
                variant={isPro ? "primary" : isStarter ? "success" : "gray"}
                size="sm"
              >
                {plan}
              </Badge>
            </div>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2 mt-1 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
        >
          <LogOut size={16} />
          Se déconnecter
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen border-r border-gray-100 bg-white sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <Link href="/dashboard">
          <Logo size="sm" />
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-50 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-72 bg-white shadow-2xl flex flex-col overflow-y-auto">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
}
