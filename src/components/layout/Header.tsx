"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { ArrowIcon, CloseIcon, MenuIcon } from "@/components/ui/Icons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLocale } from "./LocaleProvider";
import { localePath, stripLocale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export function Header() {
  const { locale, dict } = useLocale();
  const pathname = usePathname();
  const current = stripLocale(pathname || "/");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [darkHero, setDarkHero] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => setMenuOpen(false), [pathname]);
  // Pages that open with a dark photo header get a light (cream) header until scrolled
  useEffect(() => {
    setDarkHero(!!document.querySelector("[data-dark-hero]"));
    setScrolled(window.scrollY > 20);
  }, [pathname]);

  // Glass background after scrolling; hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 20);
    setHidden(y > 300 && y > prev && !menuOpen);
  });

  const links = [
    { href: "/", label: dict.nav.home },
    { href: "/hizmetler", label: dict.nav.services },
    { href: "/projeler", label: dict.nav.projects },
    { href: "/hakkimizda", label: dict.nav.about },
    { href: "/iletisim", label: dict.nav.contact },
  ];
  const isActive = (href: string) => (href === "/" ? current === "/" : current.startsWith(href));
  const light = menuOpen || (darkHero && !scrolled);

  return (
    <>
      <motion.header
        className="sticky top-0 z-40"
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={cn(
            "transition-[background-color,box-shadow,backdrop-filter] duration-500",
            scrolled && !menuOpen ? "bg-cream/80 shadow-[0_1px_0_rgba(27,24,20,.06)] backdrop-blur-xl" : "bg-transparent",
          )}
        >
          <div className="container flex h-[var(--header-h)] items-center justify-between gap-4">
            <Link href={localePath(locale, "/")} aria-label="Huzur Dekor — Ana Sayfa" className="shrink-0">
              <Logo tone={light ? "light" : "dark"} className="h-11 md:h-[52px]" />
            </Link>

            <nav aria-label="Ana menü" className="hidden items-center gap-1 lg:flex">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={localePath(locale, l.href)}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={cn(
                    "group relative px-3.5 py-2 text-[15px] font-medium transition-colors xl:px-4",
                    light ? "text-cream/85 hover:text-cream" : "text-ink/80 hover:text-ink",
                  )}
                >
                  {l.label}
                  <span
                    className={cn(
                      "absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-gold-500 xl:inset-x-4",
                      isActive(l.href) ? "opacity-100" : "opacity-0",
                    )}
                  />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              <LanguageSwitcher tone={light ? "light" : "dark"} className="hidden sm:flex" />
              <Link
                href={localePath(locale, "/iletisim")}
                className={cn(
                  "hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors md:inline-flex",
                  light ? "bg-gold-500 text-ink hover:bg-gold-400" : "bg-ink text-cream hover:bg-gold-600",
                )}
              >
                {dict.nav.quote}
                <ArrowIcon width={16} />
              </Link>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? dict.a11y.closeMenu : dict.a11y.openMenu}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className={cn(
                  "grid h-11 w-11 place-items-center rounded-full border transition-colors lg:hidden",
                  light ? "border-cream/25 text-cream" : "border-ink/10 text-ink",
                )}
              >
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[35] flex flex-col bg-ink pt-[calc(var(--header-h)+56px)] text-cream lg:hidden"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
          >
            <nav className="container flex flex-col gap-2" aria-label="Mobil menü">
              {links.map((l, i) => (
                <motion.div key={l.href} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.07 }}>
                  <Link
                    href={localePath(locale, l.href)}
                    className={cn("block py-2 font-serif text-5xl", isActive(l.href) ? "text-gold-400" : "text-cream")}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="container mt-auto flex flex-wrap items-center justify-between gap-4 pb-10">
              <LanguageSwitcher tone="light" className="w-fit" />
              <Link href={localePath(locale, "/iletisim")} className="btn bg-gold-500 text-ink">
                {dict.nav.quote}
                <ArrowIcon width={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
