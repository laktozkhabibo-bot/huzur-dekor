import { SplitText } from "@/components/motion/SplitText";
import { SmartImage } from "./SmartImage";

/**
 * Shared intro band for inner pages (services, projects, about, contact…).
 * With `image`: a full-bleed photograph under a dark veil, the title rising letter by letter.
 */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  image,
  arabic = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
  arabic?: boolean;
}) {
  const dark = !!image;
  return (
    <section
      data-dark-hero={dark ? "" : undefined}
      className={
        dark
          ? "relative flex min-h-[62svh] items-end overflow-hidden bg-ink pb-16 pt-[calc(var(--header-h)+80px)] text-cream md:min-h-[68svh] md:pb-20"
          : "relative overflow-hidden bg-cream-200 pb-16 pt-[calc(var(--header-h)+64px)] md:pb-20 md:pt-[calc(var(--header-h)+96px)]"
      }
    >
      {image ? (
        <>
          <SmartImage src={image} alt="" fill priority sizes="100vw" className="animate-img-in object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
          <div aria-hidden className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink/70 to-transparent" />
        </>
      ) : (
        <div className="pointer-events-none absolute -end-24 -top-24 h-96 w-96 rounded-full bg-gold-300/40 blur-3xl" />
      )}
      <div className="container relative">
        {eyebrow && (
          <p className={dark ? "eyebrow animate-fade-up text-gold-300 before:bg-gold-400" : "eyebrow animate-fade-up"} style={{ animationDelay: "0.05s" }}>
            {eyebrow}
          </p>
        )}
        <h1 className={dark ? "h-section mt-4 max-w-4xl text-cream" : "h-section mt-4 max-w-3xl"}>
          <SplitText text={title} delay={0.12} stagger={0.022} byWord={arabic} />
        </h1>
        {subtitle && (
          <p className={dark ? "mt-6 max-w-2xl animate-fade-up text-lg text-cream/75" : "mt-5 max-w-xl animate-fade-up text-lg text-ink-500"} style={{ animationDelay: "0.45s" }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
