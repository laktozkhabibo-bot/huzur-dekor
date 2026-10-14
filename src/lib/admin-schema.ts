/** Validation schemas for data sent by the host panel */
import { z } from "zod";
import { SERVICE_ICONS } from "./types";

const l10n = z.object({ tr: z.string().max(5000), en: z.string().max(5000), ar: z.string().max(5000) });
const feature = z.object({ title: l10n, text: l10n });
const url = z.string().trim().max(500);
const image = z.string().max(1000);

export const categorySchema = z.object({
  id: z.string().min(1).max(60),
  slug: z.string().trim().max(80), // empty → generated from the name
  name: l10n,
  sortOrder: z.number().int(),
});

export const projectSchema = z.object({
  id: z.string().min(1).max(60),
  slug: z.string().trim().max(100), // empty → generated from the title
  title: l10n,
  description: l10n,
  location: z.string().max(120),
  year: z.string().max(20),
  images: z.array(image).max(30),
  visible: z.boolean(),
  featured: z.boolean(),
  sortOrder: z.number().int(),
  categoryId: z.string().max(60).nullable(),
});

export const contentSchema = z.object({
  announcement: z.object({ enabled: z.boolean(), text: l10n, link: url }),
  hero: z.object({ eyebrow: l10n, title: l10n, subtitle: l10n, ctaPrimary: l10n, ctaSecondary: l10n, images: z.array(image).max(2) }),
  stats: z.object({
    projects: z.number().int().min(0),
    years: z.number().int().min(0),
    clients: z.number().int().min(0),
    satisfaction: z.number().int().min(0).max(100),
  }),
  services: z.object({
    title: l10n,
    subtitle: l10n,
    items: z.array(feature.extend({ icon: z.enum(SERVICE_ICONS), image })).max(12),
  }),
  process: z.object({ title: l10n, subtitle: l10n, steps: z.array(feature.extend({ image })).max(8) }),
  why: z.object({ title: l10n, subtitle: l10n, items: z.array(feature).max(8) }),
  about: z.object({ title: l10n, intro: l10n, story: l10n, quote: l10n, mission: l10n, image }),
  testimonials: z.object({
    title: l10n,
    items: z.array(z.object({ id: z.string().max(60), name: z.string().max(120), city: z.string().max(120), rating: z.number().int().min(1).max(5), text: l10n })).max(30),
  }),
  cta: z.object({ title: l10n, text: l10n, button: l10n, image }),
  brand: z.object({ tagline: l10n, footerText: l10n }),
  contact: z.object({
    whatsapp: z.string().max(40),
    phone: z.string().max(40),
    email: z.string().max(200),
    address: l10n,
    hours: l10n,
    mapUrl: url,
    instagram: url,
    facebook: url,
    youtube: url,
    tiktok: url,
  }),
  seo: z.object({ title: l10n, description: l10n }),
});

export const saveSchema = z.object({
  categories: z.array(categorySchema).max(100),
  projects: z.array(projectSchema).max(1000),
  content: contentSchema,
});

export type SavePayload = z.infer<typeof saveSchema>;
