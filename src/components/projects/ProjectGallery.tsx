"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowIcon, CloseIcon, ExpandIcon } from "@/components/ui/Icons";
import { getLenis } from "@/components/motion/SmoothScroll";
import { useLocale } from "@/components/layout/LocaleProvider";
import { fmt } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Project photos: an editorial grid that opens a full-screen lightbox (keyboard + swipe) */
export function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const { dict } = useLocale();
  const [open, setOpen] = useState<number | null>(null);
  const [dirn, setDirn] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const show = (i: number) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setOpen(i);
  };
  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (d: number) => {
      setDirn(d);
      setOpen((i) => (i === null ? i : (i + d + images.length) % images.length));
    },
    [images.length],
  );

  // keyboard, scroll lock & focus handling while the lightbox is open
  useEffect(() => {
    if (open === null) return;
    const rtl = document.documentElement.dir === "rtl";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(rtl ? -1 : 1);
      if (e.key === "ArrowLeft") go(rtl ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    getLenis()?.stop();
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      getLenis()?.start();
      document.documentElement.style.overflow = "";
      lastFocus.current?.focus();
    };
  }, [open, close, go]);

  if (!images.length) return null;
  const single = images.length === 1;

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 80) go(info.offset.x < 0 ? 1 : -1);
  };

  return (
    <>
      <div className={cn("grid gap-4 md:gap-5", single ? "" : "sm:grid-cols-2")} aria-label={dict.projects.gallery}>
        {images.map((src, i) => (
          <motion.button
            key={src + i}
            type="button"
            onClick={() => show(i)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, ease: EASE, delay: (i % 2) * 0.1 }}
            className={cn(
              "group relative block w-full overflow-hidden rounded-[26px] bg-cream-300 text-start shadow-card",
              single ? "aspect-[16/10]" : i % 3 === 0 ? "aspect-[16/10] sm:col-span-2" : "aspect-[4/5]",
            )}
            aria-label={`${dict.projects.open}: ${title} ${i + 1}`}
          >
            <SmartImage src={src} alt={`${title} — ${i + 1}`} fill sizes={single || i % 3 === 0 ? "(min-width:1024px) 66vw, 100vw" : "(min-width:1024px) 33vw, 50vw"} className="object-cover" />
            <span className="absolute end-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-cream/90 text-ink shadow-card transition-colors group-hover:bg-gold-500">
              <ExpandIcon width={18} />
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col bg-ink/95 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            data-lenis-prevent
          >
            <div className="flex items-center justify-between px-5 py-4 text-cream md:px-8">
              <p className="text-sm tabular-nums text-cream/70">{fmt(dict.projects.imageOf, { i: open + 1, n: images.length })}</p>
              <button ref={closeRef} onClick={close} aria-label={dict.a11y.close} className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 hover:bg-cream hover:text-ink">
                <CloseIcon width={20} />
              </button>
            </div>

            <div className="relative flex-1 overflow-hidden" onClick={(e) => e.target === e.currentTarget && close()}>
              <AnimatePresence initial={false} custom={dirn} mode="popLayout">
                <motion.div
                  key={open}
                  custom={dirn}
                  className="absolute inset-4 md:inset-x-24 md:inset-y-6"
                  variants={{
                    enter: (d: number) => ({ opacity: 0, x: d * 60 }),
                    center: { opacity: 1, x: 0 },
                    exit: (d: number) => ({ opacity: 0, x: d * -60 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: EASE }}
                  drag={single ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={onDragEnd}
                >
                  <SmartImage src={images[open]} alt={`${title} — ${open + 1}`} fill sizes="100vw" className="pointer-events-none select-none object-contain" />
                </motion.div>
              </AnimatePresence>

              {!single && (
                <>
                  <button onClick={() => go(-1)} aria-label={dict.a11y.prev} className="absolute start-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-cream/10 text-cream backdrop-blur hover:bg-cream hover:text-ink md:start-6">
                    <ArrowIcon width={20} className="rotate-180" />
                  </button>
                  <button onClick={() => go(1)} aria-label={dict.a11y.next} className="absolute end-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-cream/10 text-cream backdrop-blur hover:bg-cream hover:text-ink md:end-6">
                    <ArrowIcon width={20} />
                  </button>
                </>
              )}
            </div>

            {!single && (
              <div className="no-scrollbar flex justify-center gap-2 overflow-x-auto px-5 py-4">
                {images.map((src, i) => (
                  <button
                    key={src + i}
                    onClick={() => {
                      setDirn(i > open ? 1 : -1);
                      setOpen(i);
                    }}
                    aria-label={`${i + 1}`}
                    aria-current={i === open}
                    className={cn("relative h-14 w-20 shrink-0 overflow-hidden rounded-lg ring-2 transition", i === open ? "ring-gold-400" : "opacity-50 ring-transparent hover:opacity-100")}
                  >
                    <SmartImage src={src} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
