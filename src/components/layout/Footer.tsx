import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ArrowIcon, FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon, TiktokIcon, WhatsAppIcon, YoutubeIcon } from "@/components/ui/Icons";
import { localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { SiteContent } from "@/lib/types";
import { t, whatsappLink } from "@/lib/utils";

export function Footer({ locale, content }: { locale: Locale; content: SiteContent }) {
  const dict = getDictionary(locale);
  const c = content.contact;
  const socials = [
    { href: c.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: c.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: c.youtube, label: "YouTube", Icon: YoutubeIcon },
    { href: c.tiktok, label: "TikTok", Icon: TiktokIcon },
    { href: c.whatsapp ? whatsappLink(c.whatsapp) : "", label: "WhatsApp", Icon: WhatsAppIcon },
  ].filter((s) => s.href);

  const pages = [
    { href: "/", label: dict.nav.home },
    { href: "/hizmetler", label: dict.nav.services },
    { href: "/projeler", label: dict.nav.projects },
    { href: "/hakkimizda", label: dict.nav.about },
    { href: "/iletisim", label: dict.nav.contact },
  ];

  return (
    <footer className="relative overflow-hidden bg-ink text-cream/80">
      <div className="pointer-events-none absolute -top-40 start-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl" />

      {/* Big closing line */}
      <div className="container relative border-b border-cream/10 py-16 md:py-20">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <p className="max-w-3xl font-serif text-4xl leading-tight text-cream md:text-6xl">{t(content.brand.tagline, locale)}</p>
          <Link href={localePath(locale, "/iletisim")} className="btn bg-gold-500 text-ink hover:bg-gold-400">
            {dict.nav.quote}
            <ArrowIcon width={18} />
          </Link>
        </div>
      </div>

      <div className="container relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
        <div>
          <Logo tone="light" tagline className="h-16" />
          <p className="mt-6 max-w-sm leading-relaxed text-cream/60">{t(content.brand.footerText, locale)}</p>
          <div className="mt-8 flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-gold-500 hover:bg-gold-500 hover:text-ink"
              >
                <Icon width={18} height={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-lg text-cream">{dict.footer.explore}</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {pages.map((p) => (
              <li key={p.href}><Link className="hover:text-gold-300" href={localePath(locale, p.href)}>{p.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-lg text-cream">{dict.footer.services}</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {content.services.items.map((s, i) => (
              <li key={i}><Link className="hover:text-gold-300" href={localePath(locale, "/hizmetler")}>{t(s.title, locale)}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-lg text-cream">{dict.footer.contact}</h2>
          <ul className="mt-5 space-y-4 text-sm">
            {c.phone && (
              <li className="flex items-start gap-3"><PhoneIcon width={18} className="mt-0.5 shrink-0 text-gold-400" /><a dir="ltr" className="hover:text-gold-300" href={`tel:${c.phone.replace(/\s/g, "")}`}>{c.phone}</a></li>
            )}
            {c.email && (
              <li className="flex items-start gap-3"><MailIcon width={18} className="mt-0.5 shrink-0 text-gold-400" /><a className="break-all hover:text-gold-300" href={`mailto:${c.email}`}>{c.email}</a></li>
            )}
            {c.instagram && (
              <li className="flex items-start gap-3"><InstagramIcon width={18} className="mt-0.5 shrink-0 text-gold-400" /><a dir="ltr" className="hover:text-gold-300" href={c.instagram} target="_blank" rel="noopener noreferrer">@{c.instagram.replace(/\/+$/, "").split("/").pop()}</a></li>
            )}
            {t(c.address, locale) && (
              <li className="flex items-start gap-3"><PinIcon width={18} className="mt-0.5 shrink-0 text-gold-400" /><span>{t(c.address, locale)}</span></li>
            )}
          </ul>
        </div>
      </div>
      <div className="relative border-t border-cream/10">
        <div className="container flex flex-col items-center justify-between gap-2 py-6 text-xs text-cream/45 sm:flex-row">
          <p>© {new Date().getFullYear()} Huzur Dekor. {dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
