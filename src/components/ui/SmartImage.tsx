import Image, { type ImageProps } from "next/image";

/**
 * next/image wrapper: local SVGs and local uploads are served as-is,
 * photos (bundled or Vercel Blob) go through Next's image optimiser.
 */
export function SmartImage({ src, alt, ...rest }: Omit<ImageProps, "src"> & { src: string }) {
  const safe = src || "/images/placeholder.svg";
  const unoptimized = safe.endsWith(".svg") || safe.startsWith("/uploads/");
  return <Image src={safe} alt={alt} unoptimized={unoptimized} {...rest} />;
}
