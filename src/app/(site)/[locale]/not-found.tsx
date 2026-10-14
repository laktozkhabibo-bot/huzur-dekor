"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/components/layout/LocaleProvider";
import { localePath } from "@/lib/i18n/config";

export default function NotFound() {
  const { locale, dict } = useLocale();
  return (
    <section className="container flex min-h-[80vh] flex-col items-center justify-center pt-[var(--header-h)] text-center">
      <motion.svg viewBox="0 0 200 200" className="h-40 w-40" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} aria-hidden>
        <path d="M24 96 L100 30 L176 96" fill="none" stroke="#B8892F" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M44 84 V170 H156 V84" fill="none" stroke="#2E2E2E" strokeWidth="5" strokeDasharray="10 9" strokeLinecap="round" />
        <text x="100" y="145" textAnchor="middle" fontSize="46" fontWeight="600" fill="#2E2E2E" style={{ fontFamily: "var(--font-serif)" }}>404</text>
      </motion.svg>
      <h1 className="mt-8 font-serif text-4xl md:text-5xl">{dict.notFound.title}</h1>
      <p className="mt-4 text-ink-400">{dict.notFound.text}</p>
      <Link href={localePath(locale, "/")} className="btn-primary mt-8">{dict.notFound.cta}</Link>
    </section>
  );
}
