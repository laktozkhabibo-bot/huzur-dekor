"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowIcon } from "@/components/ui/Icons";
import { useLocale } from "@/components/layout/LocaleProvider";
import { localePath } from "@/lib/i18n/config";
import type { CategoryDTO, ProjectDTO } from "@/lib/types";
import { cn, t } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Portfolio card: photo unveiled on scroll, category + title on a soft dark gradient */
export function ProjectCard({
  project,
  category,
  className,
  sizes = "(min-width:1024px) 33vw, (min-width:640px) 50vw, 92vw",
  delay = 0,
  priority = false,
}: {
  project: ProjectDTO;
  category?: CategoryDTO;
  className?: string;
  sizes?: string;
  delay?: number;
  priority?: boolean;
}) {
  const { locale, dict } = useLocale();
  const reduce = useReducedMotion();
  const title = t(project.title, locale);

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: { opacity: 0, y: reduce ? 0 : 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay } } }}
      className={cn("relative", className)}
    >
      <Link
        href={localePath(locale, `/projeler/${project.slug}`)}
        className="group relative block h-full min-h-[280px] overflow-hidden rounded-[26px] bg-cream-300 shadow-card"
        aria-label={`${title} — ${dict.common.viewProject}`}
      >
        <motion.div
          className="absolute inset-0"
          variants={{ hidden: { scale: reduce ? 1 : 1.15 }, show: { scale: 1, transition: { duration: 1.6, ease: EASE, delay } } }}
        >
          <SmartImage src={project.images[0] ?? ""} alt={title} fill priority={priority} sizes={sizes} className="object-cover" />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-7">
          <div className="min-w-0 text-cream">
            {category && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-300 rtl:tracking-normal">{t(category.name, locale)}</p>
            )}
            <h3 className="mt-2 font-serif text-2xl leading-tight md:text-[1.75rem]">{title}</h3>
          </div>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-cream/30 text-cream transition-colors duration-300 group-hover:border-gold-400 group-hover:bg-gold-500">
            <ArrowIcon width={18} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
