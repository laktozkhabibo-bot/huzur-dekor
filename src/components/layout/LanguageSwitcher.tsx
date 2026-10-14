"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localePath, localeNames, localeShort, stripLocale } from "@/lib/i18n/config";
import { useLocale } from "./LocaleProvider";
import { cn } from "@/lib/utils";

/** TR / EN / AR segmented switch — keeps the current page when switching */
export function LanguageSwitcher({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const { locale, dict } = useLocale();
  const pathname = usePathname();
  const base = stripLocale(pathname || "/");

  return (
    <nav aria-label={dict.a11y.language} className={cn("flex items-center rounded-full p-1", tone === "dark" ? "bg-ink/5" : "bg-cream/10", className)}>
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={localePath(l, base)}
            hrefLang={l}
            lang={l}
            aria-current={active ? "true" : undefined}
            title={localeNames[l]}
            scroll={false}
            className={cn(
              "rounded-full px-2.5 py-1 text-[11px] font-bold tracking-widest transition-colors",
              active
                ? "bg-gold-500 text-ink"
                : tone === "dark"
                  ? "text-ink/60 hover:text-ink"
                  : "text-cream/70 hover:text-cream",
            )}
          >
            {localeShort[l]}
          </Link>
        );
      })}
    </nav>
  );
}
