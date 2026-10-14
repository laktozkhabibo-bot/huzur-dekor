"use client";

import { useLocale } from "@/components/layout/LocaleProvider";

/** Slow, endless band of service names between the hero and the content (pure CSS) */
export function Marquee() {
  const { dict } = useLocale();
  const items = dict.home.marquee;
  return (
    <div className="relative overflow-hidden border-y border-gold-500/20 bg-ink py-6 text-cream" aria-hidden>
      <div dir="ltr" className="flex w-max animate-marquee motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" dir="auto">
            {[...items, ...items].map((item, i) => (
              <span key={i} className="flex items-center">
                <span className="px-8 font-serif text-2xl tracking-wide text-cream/90 md:text-3xl">{item}</span>
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-gold-400"><path d="M10 0l2.4 7.6L20 10l-7.6 2.4L10 20l-2.4-7.6L0 10l7.6-2.4z" fill="currentColor" /></svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
