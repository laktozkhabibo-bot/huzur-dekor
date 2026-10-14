import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProjectsShowcase } from "@/components/home/ProjectsShowcase";
import { ProcessSection } from "@/components/home/ProcessSection";
import { WhySection } from "@/components/home/WhySection";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaSection } from "@/components/home/CtaSection";
import { getCategories, getFeaturedProjects, getSiteContent } from "@/lib/data";
import { resolveLocale } from "@/lib/page-locale";
import { pageMetadata } from "@/lib/seo";
import { t } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const content = await getSiteContent();
  return {
    ...pageMetadata({ locale, path: "/", title: t(content.seo.title, locale), description: t(content.seo.description, locale) }),
    title: { absolute: t(content.seo.title, locale) },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const [content, featured, categories] = await Promise.all([getSiteContent(), getFeaturedProjects(6), getCategories()]);
  const h = content.hero;

  return (
    <>
      <Hero
        eyebrow={t(h.eyebrow, locale)}
        title={t(h.title, locale)}
        subtitle={t(h.subtitle, locale)}
        ctaPrimary={t(h.ctaPrimary, locale)}
        ctaSecondary={t(h.ctaSecondary, locale)}
        images={h.images}
        stats={{ years: content.stats.years, projects: content.stats.projects }}
      />
      <Marquee />
      <ServicesSection services={content.services} />
      <ProjectsShowcase projects={featured} categories={categories} />
      <ProcessSection process={content.process} />
      <WhySection why={content.why} stats={content.stats} />
      <Testimonials testimonials={content.testimonials} />
      <CtaSection cta={content.cta} />
    </>
  );
}
