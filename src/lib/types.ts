import type { Locale } from "./i18n/config";

/** A string translated into every site language */
export type L10n = Record<Locale, string>;

export interface CategoryDTO {
  id: string;
  slug: string;
  name: L10n;
  sortOrder: number;
}

/** A finished work in the portfolio */
export interface ProjectDTO {
  id: string;
  slug: string;
  title: L10n;
  description: L10n;
  location: string;
  year: string;
  images: string[];
  visible: boolean;
  featured: boolean;
  sortOrder: number;
  categoryId: string | null;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  text: L10n;
}

export interface FeatureItem {
  title: L10n;
  text: L10n;
}

/** Icons available for a service card (chosen in the host panel) */
export const SERVICE_ICONS = ["interior", "furniture", "paint", "ceiling", "kitchen", "tv", "bath", "lighting", "floor", "wardrobe"] as const;
export type ServiceIcon = (typeof SERVICE_ICONS)[number];

export interface ServiceItem extends FeatureItem {
  icon: ServiceIcon;
  image: string;
}

/** A step of the "Çalışma Sürecimiz" story, with its picture */
export interface ProcessStep extends FeatureItem {
  image: string;
}

export interface SiteContent {
  announcement: { enabled: boolean; text: L10n; link: string };
  hero: { eyebrow: L10n; title: L10n; subtitle: L10n; ctaPrimary: L10n; ctaSecondary: L10n; images: string[] };
  stats: { projects: number; years: number; clients: number; satisfaction: number };
  services: { title: L10n; subtitle: L10n; items: ServiceItem[] };
  process: { title: L10n; subtitle: L10n; steps: ProcessStep[] };
  why: { title: L10n; subtitle: L10n; items: FeatureItem[] };
  about: { title: L10n; intro: L10n; story: L10n; quote: L10n; mission: L10n; image: string };
  testimonials: { title: L10n; items: Testimonial[] };
  cta: { title: L10n; text: L10n; button: L10n; image: string };
  brand: { tagline: L10n; footerText: L10n };
  contact: {
    whatsapp: string;
    phone: string;
    email: string;
    address: L10n;
    hours: L10n;
    mapUrl: string;
    instagram: string;
    facebook: string;
    youtube: string;
    tiktok: string;
  };
  seo: { title: L10n; description: L10n };
}

export type SiteContentKey = keyof SiteContent;
