"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { useLocale } from "@/components/layout/LocaleProvider";
import { fmt } from "@/lib/i18n/dictionaries";
import type { CategoryDTO, ProjectDTO } from "@/lib/types";
import { cn, t } from "@/lib/utils";

/**
 * Portfolio grid with category tabs. The active tab is kept in the URL (?kategori=…)
 * so a filtered view can be shared; the page itself stays static for speed & SEO.
 */
export function ProjectsClient({ projects, categories }: { projects: ProjectDTO[]; categories: CategoryDTO[] }) {
  const { locale, dict } = useLocale();
  const [active, setActive] = useState("all");

  // Only categories that actually contain projects
  const tabs = useMemo(() => categories.filter((c) => projects.some((p) => p.categoryId === c.id)), [categories, projects]);

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("kategori");
    if (slug && tabs.some((c) => c.slug === slug)) setActive(slug);
  }, [tabs]);

  const select = (slug: string) => {
    setActive(slug);
    const url = new URL(window.location.href);
    if (slug === "all") url.searchParams.delete("kategori");
    else url.searchParams.set("kategori", slug);
    window.history.replaceState(null, "", url);
  };

  const activeCat = tabs.find((c) => c.slug === active);
  const list = activeCat ? projects.filter((p) => p.categoryId === activeCat.id) : projects;

  return (
    <section className="container py-16 md:py-24">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <LayoutGroup id="project-tabs">
          <div className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1 py-1" role="tablist" aria-label={dict.projects.category}>
            {[{ slug: "all", label: dict.projects.all }, ...tabs.map((c) => ({ slug: c.slug, label: t(c.name, locale) }))].map((tab) => {
              const on = tab.slug === active;
              return (
                <button
                  key={tab.slug}
                  role="tab"
                  aria-selected={on}
                  onClick={() => select(tab.slug)}
                  className={cn("relative shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors", on ? "text-cream" : "text-ink-500 hover:text-ink")}
                >
                  {on && <motion.span layoutId="project-tab-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
                  <span className="relative">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
        <p className="text-sm text-ink-400" aria-live="polite">{fmt(dict.projects.count, { n: list.length })}</p>
      </div>

      <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="aspect-[4/5]"
            >
              <ProjectCard
                project={p}
                category={categories.find((c) => c.id === p.categoryId)}
                className="h-full"
                delay={(i % 3) * 0.1}
                priority={i < 3}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {list.length === 0 && <p className="py-20 text-center text-ink-400">{dict.projects.empty}</p>}
    </section>
  );
}
