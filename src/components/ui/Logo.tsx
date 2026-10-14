import { cn } from "@/lib/utils";

/**
 * Huzur Dekor logo: the house-"H" emblem + the "HUZUR / DEKOR" wordmark.
 * The emblem is a transparent image; the wordmark is vector text, so it stays razor-sharp.
 * The whole logo scales with the height given in `className` (e.g. "h-11").
 *  - tone="light": for dark backgrounds (cream letters, light emblem)
 *  - compact: emblem only
 *  - tagline: adds "kaliteyi evinize taşıyoruz" under the wordmark
 */
export function Logo({
  className,
  tone = "dark",
  compact = false,
  tagline = false,
}: {
  className?: string;
  tone?: "dark" | "light";
  compact?: boolean;
  tagline?: boolean;
}) {
  const light = tone === "light";
  const ink = light ? "#F7F2E9" : "#2E2E2E";
  const gold = light ? "#CFA858" : "#B8892F";
  return (
    <span className={cn("inline-flex h-10 items-center gap-[0.3em]", className)} role="img" aria-label="Huzur Dekor">
      {/* eslint-disable-next-line @next/next/no-img-element -- small brand mark, needs to scale with the text */}
      <img
        src={light ? "/brand/emblem-light.webp" : "/brand/emblem.webp"}
        alt=""
        width={333}
        height={320}
        className="block h-full w-auto shrink-0"
        draggable={false}
      />
      {!compact && (
        <svg viewBox={tagline ? "0 0 236 100" : "0 0 196 100"} className="block h-full w-auto overflow-visible" aria-hidden style={{ direction: "ltr" }}>
          <text x="0" y={tagline ? 47 : 54} fontSize="48" fontWeight={600} letterSpacing="4" fill={ink} style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
            HUZUR
          </text>
          <rect x="2" y={tagline ? 58 : 71} width="34" height="2" fill={gold} />
          <text x="44" y={tagline ? 69 : 79} fontSize="21" fontWeight={600} letterSpacing="9" fill={gold} style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
            DEKOR
          </text>
          {tagline && (
            <text x="1" y="94" fontSize="14" letterSpacing="1.4" fill={ink} opacity={0.7} style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
              kaliteyi evinize taşıyoruz
            </text>
          )}
        </svg>
      )}
    </span>
  );
}
