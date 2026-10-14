"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ArrowIcon } from "@/components/ui/Icons";
import { useLocale } from "@/components/layout/LocaleProvider";
import { localePath } from "@/lib/i18n/config";
import type { CategoryDTO, ProjectDTO } from "@/lib/types";

/** Editorial mosaic of featured projects on the home page */
export function ProjectsShowcase({ projects, categories }: { projects: ProjectDTO[]; categories: CategoryDTO[] }) {
  const { locale, dict } = useLocale();
  if (!projects.length) return null;
  const cat = (p: ProjectDTO) => categories.find((c) => c.id === p.categoryId);
  // tall, wide, wide, tall… → a balanced 12-column mosaic on desktop
  const spans = ["lg:col-span-5 lg:row-span-2", "lg:col-span-7", "lg:col-span-7", "lg:col-span-7 lg:row-span-2", "lg:col-span-5", "lg:col-span-5"];

  return (
    <section className="relative bg-cream-200 py-24 md:py-32" aria-labelledby="projects-title">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{dict.home.projectsEyebrow}</p>
            <h2 id="projects-title" className="h-section mt-4">{dict.home.projectsTitle}</h2>
            <p className="mt-5 text-lg text-ink-500">{dict.home.projectsSubtitle}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href={localePath(locale, "/projeler")} className="btn-primary">
              {dict.common.viewAll}
              <ArrowIcon width={18} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-flow-dense auto-rows-[300px] gap-5 sm:grid-cols-2 lg:auto-rows-[290px] lg:grid-cols-12">
          {projects.slice(0, 6).map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              category={cat(p)}
              delay={(i % 2) * 0.12}
              className={spans[i % spans.length]}
              sizes={i === 0 || i === 3 ? "(min-width:1024px) 45vw, (min-width:640px) 50vw, 92vw" : "(min-width:1024px) 55vw, (min-width:640px) 50vw, 92vw"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
