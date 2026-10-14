import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectsClient } from "@/components/projects/ProjectsClient";
import { CtaSection } from "@/components/home/CtaSection";
import { getCategories, getProjects, getSiteContent } from "@/lib/data";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { resolveLocale } from "@/lib/page-locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const projects = await getProjects();
  return pageMetadata({ locale, path: "/projeler", title: dict.projects.title, description: dict.projects.subtitle, images: projects[0]?.images.slice(0, 1) });
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const [projects, categories, content] = await Promise.all([getProjects(), getCategories(), getSiteContent()]);

  return (
    <>
      <PageHeader eyebrow={dict.home.projectsEyebrow} title={dict.projects.title} subtitle={dict.projects.subtitle} arabic={locale === "ar"} />
      <ProjectsClient projects={projects} categories={categories} />
      <CtaSection cta={content.cta} />
    </>
  );
}
