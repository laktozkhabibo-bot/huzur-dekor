import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { ArrowIcon, CalendarIcon, GemIcon, HomeSearchIcon, TagIcon } from "@/components/ui/Icons";
import { ParallaxImage } from "@/components/about/ParallaxImage";
import { ProcessSection } from "@/components/home/ProcessSection";
import { getSiteContent } from "@/lib/data";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localePath } from "@/lib/i18n/config";
import { resolveLocale } from "@/lib/page-locale";
import { pageMetadata } from "@/lib/seo";
import { t } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const content = await getSiteContent();
  return pageMetadata({ locale, path: "/hakkimizda", title: getDictionary(locale).about.title, description: t(content.about.intro, locale) });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const content = await getSiteContent();
  const a = content.about;
  const paragraphs = t(a.story, locale).split(/\n\s*\n/).filter(Boolean);
  const icons = [GemIcon, CalendarIcon, TagIcon, HomeSearchIcon];
  const numberLocale = locale === "tr" ? "tr-TR" : locale === "ar" ? "ar-u-nu-latn" : "en-US";
  const second = content.hero.images.find((i) => i !== a.image) ?? content.hero.images[0];

  return (
    <>
      <PageHeader eyebrow={dict.about.title} title={t(a.title, locale)} subtitle={t(a.intro, locale)} image={a.image} arabic={locale === "ar"} />

      <section className="container grid items-center gap-16 py-20 md:py-28 lg:grid-cols-2">
        <ParallaxImage main={a.image} second={second} />
        <div>
          <Reveal>
            <p className="eyebrow">Huzur Dekor</p>
            <div className="prose-rich mt-6 text-lg leading-relaxed text-ink-600">
              {paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "first-letter:float-left first-letter:me-3 first-letter:font-serif first-letter:text-7xl first-letter:leading-[.8] first-letter:text-gold-600 rtl:first-letter:float-right" : ""}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-ink/10 pt-8">
              {[
                { v: content.stats.years, l: dict.home.stats.years, s: "+" },
                { v: content.stats.projects, l: dict.home.stats.projects, s: "+" },
                { v: content.stats.clients, l: dict.home.stats.clients, s: "+" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-serif text-4xl font-semibold text-gold-700"><Counter value={s.v} suffix={s.s} locale={numberLocale} /></p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-ink-400 rtl:tracking-normal">{s.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-24 text-cream md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "linear-gradient(to right,#CFA858 1px,transparent 1px),linear-gradient(to bottom,#CFA858 1px,transparent 1px)", backgroundSize: "96px 96px" }}
        />
        <div className="container relative max-w-4xl text-center">
          <Reveal>
            <p className="eyebrow justify-center text-gold-300 before:bg-gold-400">{dict.about.mission}</p>
            <blockquote className="mt-8 font-serif text-3xl leading-snug md:text-5xl">“{t(a.quote, locale)}”</blockquote>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-cream/60">{t(a.mission, locale)}</p>
          </Reveal>
        </div>
      </section>

      <section className="container py-24 md:py-32">
        <Reveal>
          <p className="eyebrow">{dict.about.values}</p>
          <h2 className="h-section mt-4">{t(content.why.title, locale)}</h2>
        </Reveal>
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.why.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <StaggerItem key={i}>
                <div className="card h-full p-8">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-gold-100 text-gold-700">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 font-serif text-2xl">{t(item.title, locale)}</h3>
                  <p className="mt-3 text-ink-500">{t(item.text, locale)}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
        <Reveal className="mt-16 text-center">
          <Link href={localePath(locale, "/iletisim")} className="btn-primary">
            {t(content.hero.ctaPrimary, locale)}
            <ArrowIcon width={18} />
          </Link>
        </Reveal>
      </section>

      <ProcessSection process={content.process} />
    </>
  );
}
