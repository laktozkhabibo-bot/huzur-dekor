import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/data";
import { locales, localePath } from "@/lib/i18n/config";
import { siteUrl } from "@/lib/utils";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const paths = ["/", "/hizmetler", "/projeler", "/hakkimizda", "/iletisim", ...projects.map((p) => `/projeler/${p.slug}`)];
  const now = new Date();

  return paths.map((path) => ({
    url: `${siteUrl}${localePath("tr", path)}`,
    lastModified: now,
    changeFrequency: path.startsWith("/projeler/") ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/projeler" || path === "/hizmetler" ? 0.9 : path.startsWith("/projeler/") ? 0.8 : 0.6,
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}${localePath(l, path)}`])) },
  }));
}
