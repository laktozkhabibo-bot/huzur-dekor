/**
 * Server-side data access for the website.
 * Queries are cached with tags; the host panel calls `revalidateTag(...)` after saving,
 * so changes show up on the live site instantly — no rebuild or redeploy needed.
 */
import "server-only";
import { unstable_cache } from "next/cache";
import type { Category, Project } from "@prisma/client";
import { isDbConfigured, prisma, warnNoDb } from "./prisma";
import { defaultCategories, defaultContent, fallbackProjects } from "./defaults";
import type { CategoryDTO, L10n, ProjectDTO, SiteContent } from "./types";

export const TAGS = { catalog: "catalog", content: "content" } as const;

const hasDb = () => {
  const ok = isDbConfigured();
  if (!ok) warnNoDb();
  return ok;
};
/** Log a database error once per kind (avoids flooding the terminal) */
const logged = new Set<string>();
function logDbError(kind: string, err: unknown) {
  if (logged.has(kind)) return;
  logged.add(kind);
  const msg = err instanceof Error ? err.message.split("\n").filter(Boolean).slice(-2).join(" ") : String(err);
  console.error(`[data] ${kind} query failed, using built-in demo data — ${msg}`);
}

// ─── Serialization helpers ──────────────────────────────────────────────────

const emptyL10n = (): L10n => ({ tr: "", en: "", ar: "" });

function asL10n(value: unknown): L10n {
  const v = (value ?? {}) as Partial<L10n>;
  return { tr: v.tr ?? "", en: v.en ?? "", ar: v.ar ?? "" };
}

export function toCategoryDTO(c: Category): CategoryDTO {
  return { id: c.id, slug: c.slug, name: asL10n(c.name), sortOrder: c.sortOrder };
}

export function toProjectDTO(p: Project): ProjectDTO {
  return {
    id: p.id,
    slug: p.slug,
    title: asL10n(p.title),
    description: asL10n(p.description),
    location: p.location,
    year: p.year,
    images: p.images,
    visible: p.visible,
    featured: p.featured,
    sortOrder: p.sortOrder,
    categoryId: p.categoryId,
  };
}

/** Deep-merges stored settings over defaults, so new fields always have a value */
function mergeDeep<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) return base;
  if (Array.isArray(base)) {
    if (!Array.isArray(override)) return base;
    // keep the stored list (length & order), but fill fields added later from the default item at the same index
    return override.map((item, i) => (i < base.length && typeof base[i] === "object" && base[i] !== null ? mergeDeep(base[i], item) : item)) as T;
  }
  if (typeof base === "object" && base !== null) {
    if (typeof override !== "object" || Array.isArray(override)) return base;
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const [k, v] of Object.entries(override as Record<string, unknown>)) {
      out[k] = k in out ? mergeDeep(out[k], v) : v;
    }
    return out as T;
  }
  return (typeof override === typeof base ? override : base) as T;
}

// ─── Queries ────────────────────────────────────────────────────────────────

async function loadCatalog(): Promise<{ projects: ProjectDTO[]; categories: CategoryDTO[] }> {
  if (!hasDb()) return { projects: fallbackProjects(), categories: defaultCategories };
  try {
    const [projects, categories] = await Promise.all([
      prisma.project.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] }),
      prisma.category.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] }),
    ]);
    return { projects: projects.map(toProjectDTO), categories: categories.map(toCategoryDTO) };
  } catch (err) {
    logDbError("catalog", err);
    return { projects: fallbackProjects(), categories: defaultCategories };
  }
}

async function loadContent(): Promise<SiteContent> {
  if (!hasDb()) return defaultContent;
  try {
    const rows = await prisma.siteSetting.findMany();
    const stored: Record<string, unknown> = {};
    for (const r of rows) stored[r.key] = r.value;
    return mergeDeep(defaultContent, stored);
  } catch (err) {
    logDbError("settings", err);
    return defaultContent;
  }
}

const cachedCatalog = unstable_cache(loadCatalog, ["huzur-catalog-v1"], { tags: [TAGS.catalog], revalidate: 3600 });
const cachedContent = unstable_cache(loadContent, ["huzur-content-v1"], { tags: [TAGS.content], revalidate: 3600 });

/** Every editable text & setting of the site */
export const getSiteContent = () => cachedContent();

/** All categories, ordered */
export async function getCategories() {
  return (await cachedCatalog()).categories;
}

/** Projects visible on the website */
export async function getProjects(): Promise<ProjectDTO[]> {
  return (await cachedCatalog()).projects.filter((p) => p.visible);
}

/** Projects for the home page (featured first; falls back to the latest ones) */
export async function getFeaturedProjects(limit = 6): Promise<ProjectDTO[]> {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.featured);
  return [...featured, ...projects.filter((p) => !p.featured)].slice(0, limit);
}

export async function getProjectBySlug(slug: string): Promise<ProjectDTO | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

export async function getRelatedProjects(project: ProjectDTO, limit = 3): Promise<ProjectDTO[]> {
  const projects = await getProjects();
  const others = projects.filter((p) => p.id !== project.id);
  const same = others.filter((p) => p.categoryId && p.categoryId === project.categoryId);
  const rest = others.filter((p) => !same.includes(p));
  return [...same, ...rest].slice(0, limit);
}

/** Admin: everything including hidden projects (never cached) */
export async function getAdminSnapshot() {
  const [catalog, content] = await Promise.all([loadCatalog(), loadContent()]);
  return { ...catalog, content };
}

export { emptyL10n };
