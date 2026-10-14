import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ServiceRows } from "@/components/services/ServiceRows";
import { ProcessSection } from "@/components/home/ProcessSection";
import { CtaSection } from "@/components/home/CtaSection";
import { getSiteContent } from "@/lib/data";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { resolveLocale } from "@/lib/page-locale";
import { pageMetadata } from "@/lib/seo";
import { t } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const content = await getSiteContent();
  return pageMetadata({
    locale,
    path: "/hizmetler",
    title: getDictionary(locale).services.title,
    description: `${t(content.services.title, locale)} — ${content.services.items.map((s) => t(s.title, locale)).join(", ")}`,
  });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const content = await getSiteContent();
  const s = content.services;

  return (
    <>
      <PageHeader
        eyebrow={dict.services.title}
        title={t(s.title, locale)}
        subtitle={t(s.subtitle, locale)}
        image={s.items[0]?.image}
        arabic={locale === "ar"}
      />
      <ServiceRows items={s.items} />
      <ProcessSection process={content.process} />
      <CtaSection cta={content.cta} />
    </>
  );
}
