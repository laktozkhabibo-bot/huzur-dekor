"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { ArrowIcon } from "@/components/ui/Icons";
import { useLocale } from "@/components/layout/LocaleProvider";
import { localePath } from "@/lib/i18n/config";
import type { SiteContent } from "@/lib/types";
import { t } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Services grid. Each card's photo is unveiled by a sliding cream panel as it scrolls into view,
 * then its text rises in — a calm, editorial rhythm. Nothing moves on hover.
 */
export function ServicesSection({ services }: { services: SiteContent["services"] }) {
  const { locale, dict } = useLocale();
  const reduce = useReducedMotion();

  return (
    <section className="relative py-24 md:py-32" aria-labelledby="services-title">
      <div className="container">
        <div className="grid items-end gap-6 md:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <p className="eyebrow">{dict.home.servicesEyebrow}</p>
              <h2 id="services-title" className="h-section mt-4 max-w-2xl">{t(services.title, locale)}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-ink-500 md:text-end">{t(services.subtitle, locale)}</p>
            </Reveal>
        </div>

        <div className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((item, i) => (
            <motion.article
              key={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              className="group"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[26px] bg-cream-200">
                {item.image && (
                  <motion.div
                    className="absolute inset-0"
                    variants={{ hidden: { scale: reduce ? 1 : 1.18 }, show: { scale: 1, transition: { duration: 1.6, ease: EASE, delay: (i % 3) * 0.12 } } }}
                  >
                    <SmartImage src={item.image} alt={t(item.title, locale)} fill sizes="(min-width:1024px) 400px, (min-width:640px) 50vw, 92vw" className="object-cover" />
                  </motion.div>
                )}
                {/* cream curtain sliding away */}
                {!reduce && (
                  <motion.div
                    aria-hidden
                    className="absolute inset-0 origin-top bg-cream-200"
                    variants={{ hidden: { scaleY: 1 }, show: { scaleY: 0, transition: { duration: 1.1, ease: [0.77, 0, 0.18, 1], delay: (i % 3) * 0.12 } } }}
                  />
                )}
                <span className="absolute start-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-cream/95 text-gold-600 shadow-card backdrop-blur">
                  <ServiceIcon name={item.icon} width={22} height={22} />
                </span>
                <span className="absolute end-5 top-4 font-serif text-sm text-cream/90 drop-shadow">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <motion.div
                variants={{ hidden: { opacity: 0, y: reduce ? 0 : 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay: 0.35 + (i % 3) * 0.12 } } }}
                className="mt-6 px-1"
              >
                <h3 className="font-serif text-2xl text-ink md:text-[1.7rem]">{t(item.title, locale)}</h3>
                <p className="mt-3 leading-relaxed text-ink-500">{t(item.text, locale)}</p>
              </motion.div>
            </motion.article>
          ))}
        </div>

        <Reveal className="mt-16 text-center">
          <Link href={localePath(locale, "/hizmetler")} className="btn-ghost">
            {dict.common.viewAll}
            <ArrowIcon width={18} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
