"use client";

import { useState, useEffect } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { AlignJustify, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";

interface NavLinkItem {
  label: string;
  href: string;
}

function MagneticNavItem({ link, active }: { link: NavLinkItem; active: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.3 });
  const smoothY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.3 });

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = (e.clientX - (rect.left + rect.width / 2)) / 7;
    const offsetY = (e.clientY - (rect.top + rect.height / 2)) / 7;
    x.set(offsetX);
    y.set(offsetY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div whileTap={{ scale: 0.98 }} className="relative">
      <Link
        href={link.href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative block"
      >
        {active && (
          <motion.span
            layoutId="nav-active-pill"
            className="absolute inset-0 rounded-full bg-gradient-to-r from-[#8F00FF]/14 to-fuchsia-400/12 border border-[#8F00FF]/25"
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          />
        )}

        <motion.span
          style={{ x: smoothX, y: smoothY }}
          className={cn(
            "relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200",
            active ? "text-[#7400D8]" : "text-gray-700 hover:text-[#8F00FF]"
          )}
        >
          {link.label}
        </motion.span>
      </Link>
    </motion.div>
  );
}

export function Navbar() {
  const { data: session } = useSession();
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("/#features");
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -8]);
  const opacity = useTransform(scrollY, [0, 140], [1, 0.94]);

  const navLinks: NavLinkItem[] = [
    { label: t.nav.features, href: "/#features" },
    { label: t.nav.howItWorks, href: "/#how-it-works" },
    { label: t.nav.pricing, href: "/#pricing" },
  ];

  const activeIndex = navLinks.findIndex((l) => l.href === activeHref);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((link) => link.href.split("#")[1]).filter(Boolean) as string[];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible?.target?.id) return;
        const nextHref = `/#${visible.target.id}`;
        setActiveHref(nextHref);
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.15, 0.4, 0.7],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [t.nav.features, t.nav.howItWorks, t.nav.pricing]);

  return (
    <motion.header
      style={{ y, opacity }}
      className={cn("fixed top-0 left-0 right-0 z-50 safe-area-top")}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-2">
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border transition-all duration-300",
            scrolled
              ? "bg-white/80 backdrop-blur-2xl border-white/70 shadow-[0_16px_70px_rgba(143,0,255,0.18)]"
              : "bg-white/55 backdrop-blur-xl border-white/60 shadow-[0_12px_50px_rgba(15,23,42,0.08)]"
          )}
        >
          <div className="pointer-events-none absolute -inset-8 opacity-60">
            <motion.div
              animate={{
                backgroundColor:
                  activeIndex === 0
                    ? "rgba(232, 121, 249, 0.48)"
                    : activeIndex === 1
                    ? "rgba(129, 140, 248, 0.48)"
                    : "rgba(56, 189, 248, 0.45)",
              }}
              transition={{ duration: 0.5 }}
              className="absolute -top-8 -left-6 w-40 h-40 rounded-full blur-3xl navbar-orb-float"
            />
            <motion.div
              animate={{
                backgroundColor:
                  activeIndex === 0
                    ? "rgba(96, 165, 250, 0.38)"
                    : activeIndex === 1
                    ? "rgba(74, 222, 128, 0.38)"
                    : "rgba(251, 146, 60, 0.35)",
              }}
              transition={{ duration: 0.5 }}
              className="absolute -bottom-10 right-8 w-40 h-40 rounded-full blur-3xl navbar-orb-float-delayed"
            />
          </div>

          <div className="relative flex items-center justify-between h-16 px-3 sm:px-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group">
              <Logo size="md" className="group-hover:tracking-normal transition-all duration-300" />
            </Link>

            {/* Nav desktop */}
            <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/70 bg-white/55 backdrop-blur px-2 py-1">
              {navLinks.map((link) => (
                <MagneticNavItem key={link.href} link={link} active={activeHref === link.href} />
              ))}
            </nav>

            {/* CTA desktop */}
            <div className="hidden md:flex items-center gap-2">
              <LanguageSwitcher />
              {session ? (
                <Link href="/dashboard">
                  <Button variant="primary" size="md" className="rounded-full">
                    {t.nav.dashboard}
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="md" className="rounded-full">
                      {t.nav.signIn}
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      variant="primary"
                      size="md"
                      className="rounded-full bg-gradient-to-r from-[#8F00FF] to-[#A800FF] hover:opacity-95"
                    >
                      {t.nav.getStarted}
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Menu mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-black/5 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <AlignJustify size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-3 sm:mx-6 mt-2 rounded-2xl border border-white/80 bg-white/90 backdrop-blur-xl px-4 py-4 space-y-3 shadow-xl"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#8F00FF] hover:bg-[#8F00FF]/5 transition-all"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              <LanguageSwitcher className="self-start" />
              {session ? (
                <Link href="/dashboard">
                  <Button variant="primary" size="md" fullWidth className="rounded-full">
                    {t.nav.dashboard}
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="md" fullWidth className="rounded-full">
                      {t.nav.signIn}
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="primary" size="md" fullWidth className="rounded-full">
                      {t.nav.getStarted}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
