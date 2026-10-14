"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { useLocale } from "@/components/layout/LocaleProvider";
import { fmt } from "@/lib/i18n/dictionaries";
import type { ServiceItem } from "@/lib/types";
import { cn, t, whatsappLink } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** One service: large photo (parallax inside an unveiling frame) beside its story; sides alternate */
function ServiceRow({ item, index }: { item: ServiceItem; index: number }) {
  const { locale, dict, contact } = useLocale();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);
  const flip = index % 2 === 1;
  const title = t(item.title, locale);

  return (
    <article ref={ref} id={`hizmet-${index + 1}`} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-20">
      <motion.div
        className={cn("relative aspect-[5/4] overflow-hidden rounded-[32px] bg-cream-300 shadow-lift", flip && "lg:order-2")}
        initial={reduce ? false : { clipPath: "inset(12% 12% 12% 12% round 32px)", opacity: 0.4 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 32px)", opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 1.3, ease: EASE }}
      >
        {item.image && (
          <motion.div className="absolute -inset-y-[9%] inset-x-0" style={{ y }}>
            <SmartImage src={item.image} alt={title} fill sizes="(min-width:1024px) 50vw, 92vw" className="object-cover" />
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 1, ease: EASE, delay: 0.15 }}
      >
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-ink text-gold-300">
            <ServiceIcon name={item.icon} width={24} height={24} />
          </span>
          <span className="font-serif text-5xl text-gold-500/30">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <h2 className="mt-7 font-serif text-4xl leading-tight text-ink md:text-5xl">{title}</h2>
        <span className="mt-6 block h-px w-20 bg-gold-500" />
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-500">{t(item.text, locale)}</p>
        {contact.whatsapp && (
          <a
            href={whatsappLink(contact.whatsapp, fmt(dict.services.whatsappText, { service: title }))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost mt-9"
          >
            <WhatsAppIcon width={18} className="text-[#25D366]" />
            {dict.services.askQuote}
          </a>
        )}
      </motion.div>
    </article>
  );
}

export function ServiceRows({ items }: { items: ServiceItem[] }) {
  return (
    <div className="container space-y-28 py-24 md:space-y-36 md:py-32">
      {items.map((item, i) => (
        <ServiceRow key={i} item={item} index={i} />
      ))}
    </div>
  );
}
