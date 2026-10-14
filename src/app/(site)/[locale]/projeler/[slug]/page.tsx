import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ArrowIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { getCategories, getProjectBySlug, getProjects, getRelatedProjects, getSiteContent } from "@/lib/data";
import { isLocale, localePath, locales } from "@/lib/i18n/config";
import { fmt, getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { siteUrl, t, whatsappLink } from "@/lib/utils";

type Params = Promise<{ locale: string; slug: string }>;

export async function generateStaticParams() {
  const projects = await getProjects();
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return pageMetadata({
    locale,
    path: `/projeler/${project.slug}`,
    title: t(project.title, locale),
    description: t(project.description, locale).slice(0, 160),
    images: project.images.slice(0, 1),
  });
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const dict = getDictionary(locale);
  const [categories, related, content] = await Promise.all([getCategories(), getRelatedProjects(project, 3), getSiteContent()]);
  const category = categories.find((c) => c.id === project.categoryId);
  const title = t(project.title, locale);
  const paragraphs = t(project.description, locale).split(/\n\s*\n/).filter(Boolean);
  const wa = content.contact.whatsapp;

  const facts = [
    category && { label: dict.projects.category, value: t(category.name, locale) },
    project.location && { label: dict.projects.location, value: project.location },
    project.year && { label: dict.projects.year, value: project.year },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      <PageHeader eyebrow={category ? t(category.name, locale) : dict.projects.title} title={title} image={project.images[0]} arabic={locale === "ar"} />

      <section className="container grid gap-12 py-16 md:py-24 lg:grid-cols-[1fr_380px] lg:gap-16">
        <div className="min-w-0">
          <Link href={localePath(locale, "/projeler")} className="inline-flex items-center gap-2 text-sm font-semibold text-ink-500 hover:text-ink">
            <ArrowIcon width={16} className="rotate-180" /> {dict.projects.back}
          </Link>
          <Reveal className="mt-8 space-y-5 text-lg leading-relaxed text-ink-600">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
          <div className="mt-12">
            <ProjectGallery images={project.images} title={title} />
          </div>
        </div>

        <aside>
          <div className="space-y-6 lg:sticky lg:top-[calc(var(--header-h)+24px)]">
            {facts.length > 0 && (
              <dl className="divide-y divide-ink/10 rounded-[26px] bg-white/70 px-7 py-2 shadow-card ring-1 ring-ink/5">
                {facts.map((f) => (
                  <div key={f.label} className="flex items-center justify-between gap-4 py-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-400 rtl:tracking-normal">{f.label}</dt>
                    <dd className="text-end font-semibold">{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            <div className="rounded-[26px] bg-ink p-8 text-cream shadow-lift">
              <p className="font-serif text-2xl">{dict.projects.likeThis}</p>
              <p className="mt-3 text-cream/70">{dict.projects.likeThisText}</p>
              {wa && (
                <a
                  href={whatsappLink(wa, fmt(dict.projects.whatsappText, { project: title }))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn mt-7 w-full bg-[#25D366] text-white hover:bg-[#1ebe5b]"
                >
                  <WhatsAppIcon width={20} /> {dict.contact.whatsappCta}
                </a>
              )}
              <Link href={localePath(locale, "/iletisim")} className="btn-light mt-3 w-full">
                {dict.nav.quote}
              </Link>
            </div>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="bg-cream-200 py-20 md:py-28">
          <div className="container">
            <Reveal className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="h-section">{dict.projects.related}</h2>
              <Link href={localePath(locale, "/projeler")} className="btn-ghost">
                {dict.common.viewAll} <ArrowIcon width={18} />
              </Link>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <ProjectCard key={p.id} project={p} category={categories.find((c) => c.id === p.categoryId)} className="aspect-[4/5]" delay={i * 0.1} />
              ))}
            </div>
          </div>
        </section>
      )}

      <BreadcrumbJsonLd
        items={[
          { name: dict.nav.home, url: `${siteUrl}${localePath(locale, "/")}` },
          { name: dict.projects.title, url: `${siteUrl}${localePath(locale, "/projeler")}` },
          { name: title, url: `${siteUrl}${localePath(locale, `/projeler/${project.slug}`)}` },
        ]}
      />
    </>
  );
}
