"use client";

import { Stagger, StaggerItem, Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { CalendarIcon, GemIcon, HomeSearchIcon, TagIcon } from "@/components/ui/Icons";
import { useLocale } from "@/components/layout/LocaleProvider";
import type { SiteContent } from "@/lib/types";
import { t } from "@/lib/utils";

const ICONS = [GemIcon, CalendarIcon, TagIcon, HomeSearchIcon];

/** "Neden Huzur Dekor?" — dark section with value cards and animated counters */
export function WhySection({ why, stats }: { why: SiteContent["why"]; stats: SiteContent["stats"] }) {
  const { locale, dict } = useLocale();
  const numberLocale = locale === "tr" ? "tr-TR" : locale === "ar" ? "ar-u-nu-latn" : "en-US";

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-cream md:py-32" aria-labelledby="why-title">
      {/* fine architectural grid lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "linear-gradient(to right,#CFA858 1px,transparent 1px),linear-gradient(to bottom,#CFA858 1px,transparent 1px)", backgroundSize: "96px 96px" }}
      />
      <div className="pointer-events-none absolute -end-40 top-10 h-[30rem] w-[30rem] rounded-full bg-gold-500/15 blur-3xl" />
      <div className="container relative">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <Reveal>
            <p className="eyebrow text-gold-300 before:bg-gold-400">Huzur Dekor</p>
            <h2 id="why-title" className="h-section mt-4 text-cream">{t(why.title, locale)}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-cream/60">{t(why.subtitle, locale)}</p>
          </Reveal>
        </div>

        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-[28px] bg-cream/10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
          {why.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <StaggerItem key={i} className="h-full">
                <div className="relative h-full bg-ink p-8 md:p-10">
                  <span className="grid h-14 w-14 place-items-center rounded-full border border-gold-500/40 text-gold-300">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-8 font-serif text-2xl text-cream">{t(item.title, locale)}</h3>
                  <p className="mt-3 leading-relaxed text-cream/60">{t(item.text, locale)}</p>
                  <span className="absolute end-7 top-7 font-serif text-4xl text-cream/[0.07]">0{i + 1}</span>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* Animated counters */}
        <div className="mt-20 grid grid-cols-2 gap-y-12 text-center lg:grid-cols-4">
          {[
            { v: stats.projects, s: "+", label: dict.home.stats.projects },
            { v: stats.years, s: "+", label: dict.home.stats.years },
            { v: stats.clients, s: "+", label: dict.home.stats.clients },
            { v: stats.satisfaction, s: "%", label: dict.home.stats.satisfaction, prefix: true },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="font-serif text-5xl font-semibold text-gradient md:text-6xl" dir="ltr">
                {s.prefix && locale === "tr" ? "%" : ""}
                <Counter value={s.v} suffix={s.prefix && locale === "tr" ? "" : s.s} locale={numberLocale} />
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.25em] text-cream/50 rtl:tracking-normal">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
