import type { SiteContent } from "@/lib/types";
import { siteUrl, t } from "@/lib/utils";

function Script({ data }: { data: unknown }) {
  // JSON-LD structured data for search engines (escaped to be safe inside <script>)
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function OrganizationJsonLd({ content }: { content: SiteContent }) {
  const c = content.contact;
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "HomeAndConstructionBusiness",
        name: "Huzur Dekor",
        slogan: t(content.brand.tagline, "tr"),
        description: t(content.seo.description, "tr"),
        url: siteUrl,
        logo: `${siteUrl}/brand/emblem.png`,
        image: `${siteUrl}/og.png`,
        telephone: c.phone || undefined,
        email: c.email || undefined,
        address: t(c.address, "tr") ? { "@type": "PostalAddress", streetAddress: t(c.address, "tr"), addressCountry: "TR" } : undefined,
        sameAs: [c.instagram, c.facebook, c.youtube, c.tiktok].filter(Boolean),
        areaServed: "TR",
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: it.url })),
      }}
    />
  );
}
