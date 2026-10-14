"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { useLocale } from "@/components/layout/LocaleProvider";
import { localePath } from "@/lib/i18n/config";
import type { SiteContent } from "@/lib/types";
import { t, whatsappLink } from "@/lib/utils";

/** Closing call-to-action over a full-bleed photograph with scroll parallax */
export function CtaSection({ cta }: { cta: SiteContent["cta"] }) {
  const { locale, dict, contact } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-28 text-cream md:py-40" aria-labelledby="cta-title">
      {cta.image && (
        <motion.div aria-hidden className="absolute -inset-y-[14%] inset-x-0" style={{ y }}>
          <SmartImage src={cta.image} alt="" fill sizes="100vw" className="object-cover" />
        </motion.div>
      )}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/40 rtl:bg-gradient-to-l" />
      <div className="container relative">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-gold-300 before:bg-gold-400">{dict.nav.quote}</p>
          <h2 id="cta-title" className="h-section mt-5 text-cream">{t(cta.title, locale)}</h2>
          <p className="mt-6 text-lg leading-relaxed text-cream/75">{t(cta.text, locale)}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            {contact.whatsapp && (
              <a href={whatsappLink(contact.whatsapp, dict.contact.whatsappText)} target="_blank" rel="noopener noreferrer" className="btn bg-[#25D366] text-white hover:bg-[#1ebe5b]">
                <WhatsAppIcon width={20} />
                {dict.contact.whatsappCta}
              </a>
            )}
            <Link href={localePath(locale, "/iletisim")} className="btn-light">
              {t(cta.button, locale)}
              <ArrowIcon width={18} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
