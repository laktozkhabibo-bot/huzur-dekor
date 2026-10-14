"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SplitText } from "@/components/motion/SplitText";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowIcon } from "@/components/ui/Icons";
import { useLocale } from "@/components/layout/LocaleProvider";
import { localePath } from "@/lib/i18n/config";

interface HeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  images: string[];
  stats: { years: number; projects: number };
}

/**
 * Full-screen editorial hero: a letter-by-letter headline (pure CSS → visible at first paint),
 * a tall arched photograph revealed like a curtain, a second photo overlapping it,
 * a slowly turning "free site visit" seal and a gentle scroll parallax (never on hover).
 */
export function Hero({ eyebrow, title, subtitle, ctaPrimary, ctaSecondary, images, stats }: HeroProps) {
  const { locale, dict } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const yMain = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-8%"]);
  const yInner = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const ySmall = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-30%"]);
  const fadeText = useTransform(scrollYProgress, [0, 0.6], [1, reduce ? 1 : 0.2]);

  const [main, second] = [images[0], images[1] ?? images[0]];
  const ar = locale === "ar";
  const seal = ar ? "معاينة مجانية • استشارة مجانية • ".repeat(2) : locale === "en" ? "FREE SITE VISIT • FREE CONSULTATION • " : "ÜCRETSİZ KEŞİF • ÜCRETSİZ DANIŞMANLIK • ";

  return (
    <section ref={ref} className="relative overflow-hidden bg-cream pb-20 pt-[calc(var(--header-h)+48px)] md:pb-28 lg:min-h-[100svh] lg:pt-[calc(var(--header-h)+40px)]">
      {/* soft architectural backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-y-0 end-0 w-[46%] bg-cream-200 max-lg:hidden" />
        <div className="absolute -start-40 top-24 h-[34rem] w-[34rem] rounded-full bg-gold-200/30 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-ink/[0.07]" />
      </div>

      <div className="container relative grid items-center gap-14 lg:min-h-[calc(100svh-var(--header-h)-120px)] lg:grid-cols-[1.08fr_.92fr] lg:gap-10">
        <motion.div style={{ opacity: fadeText }}>
          <p className="eyebrow animate-fade-up" style={{ animationDelay: "0.05s" }}>{eyebrow}</p>
          <h1 className="h-display mt-7 text-ink">
            <SplitText text={title} delay={0.15} stagger={0.028} byWord={locale === "ar"} />
          </h1>
          <p className="mt-8 max-w-xl animate-fade-up text-lg leading-relaxed text-ink-500 md:text-xl" style={{ animationDelay: "0.55s" }}>
            {subtitle}
          </p>
          <div className="mt-10 flex animate-fade-up flex-wrap items-center gap-4" style={{ animationDelay: "0.7s" }}>
            <Link href={localePath(locale, "/iletisim")} className="btn-primary">
              {ctaPrimary}
              <ArrowIcon width={18} />
            </Link>
            <Link href={localePath(locale, "/projeler")} className="btn-ghost">
              {ctaSecondary}
            </Link>
          </div>

          {/* quick facts */}
          <dl className="mt-14 flex animate-fade-up gap-10 border-t border-ink/10 pt-8" style={{ animationDelay: "0.85s" }}>
            <div>
              <dt className="sr-only">{dict.home.stats.years}</dt>
              <dd className="font-serif text-4xl text-ink">{stats.years}+</dd>
              <dd className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink-400 rtl:tracking-normal">{dict.home.stats.years}</dd>
            </div>
            <div>
              <dt className="sr-only">{dict.home.stats.projects}</dt>
              <dd className="font-serif text-4xl text-ink">{stats.projects}+</dd>
              <dd className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink-400 rtl:tracking-normal">{dict.home.stats.projects}</dd>
            </div>
          </dl>
        </motion.div>

        {/* Imagery */}
        <div className="relative mx-auto w-full max-w-[520px] lg:me-0">
          <motion.div style={{ y: yMain }} className="relative ms-auto w-[82%]">
            {/* arched frame, revealed like a rising curtain */}
            <div className="relative aspect-[3/4] animate-curtain-up overflow-hidden rounded-t-[999px] rounded-b-[28px] bg-cream-300 shadow-lift" style={{ animationDelay: "0.2s" }}>
              <motion.div style={{ y: yInner }} className="absolute -inset-y-[8%] inset-x-0">
                <SmartImage src={main} alt={title} fill priority sizes="(min-width:1024px) 430px, 80vw" className="animate-img-in object-cover" style={{ animationDelay: "0.2s" }} />
              </motion.div>
            </div>
            {/* thin gold outline offset behind the arch */}
            <div aria-hidden className="absolute -end-4 -top-4 -z-10 h-full w-full rounded-t-[999px] rounded-b-[28px] border border-gold-400/70 max-sm:hidden" />
          </motion.div>

          <motion.div style={{ y: ySmall }} className="absolute -bottom-10 start-0 w-[46%]">
            {/* CSS entrance on the inner box so it never fights the parallax transform */}
            <div className="animate-fade-up overflow-hidden rounded-[22px] border-[6px] border-cream bg-cream shadow-lift" style={{ animationDelay: "0.9s" }}>
              <div className="relative aspect-[4/3]">
                <SmartImage src={second} alt="" fill sizes="(min-width:1024px) 240px, 45vw" className="object-cover" />
              </div>
            </div>
          </motion.div>

          {/* rotating seal */}
          <div className="absolute -start-2 top-[12%] grid h-28 w-28 animate-fade-in place-items-center rounded-full bg-ink text-cream shadow-lift md:-start-8 md:h-32 md:w-32" style={{ animationDelay: "1.1s" }} aria-hidden>
            {/* text on a circle: the SVG must stay LTR, otherwise Arabic text leaves the path */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-[spin_22s_linear_infinite] motion-reduce:animate-none" style={{ direction: "ltr" }}>
              <defs>
                <path id="seal-circle" d="M50 50 m-37 0 a37 37 0 1 1 74 0 a37 37 0 1 1 -74 0" />
              </defs>
              <text fontSize={ar ? 7.4 : 8.2} letterSpacing={ar ? 0 : 1.6} fill="#CFA858" style={{ fontFamily: ar ? "var(--font-arabic)" : "var(--font-sans)", fontWeight: 600 }}>
                {/* Latin text is stretched to close the circle exactly; Arabic is repeated (stretching would break its joined letters) */}
                <textPath href="#seal-circle" {...(ar ? {} : { textLength: 231, lengthAdjust: "spacing" })}>{seal}</textPath>
              </text>
            </svg>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/emblem-light.webp" alt="" className="h-10 w-auto md:h-11" />
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-6 start-1/2 z-10 hidden -translate-x-1/2 animate-fade-in flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-400 lg:flex rtl:translate-x-1/2"
        style={{ animationDelay: "1.2s" }}
      >
        {dict.home.scroll}
        <span className="h-10 w-[1.5px] rounded-full bg-gradient-to-b from-gold-500 to-ink/10" />
      </div>
    </section>
  );
}
