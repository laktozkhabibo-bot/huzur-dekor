"use client";

import { useState } from "react";
import { ArrowIcon, PlusIcon, StarIcon, TrashIcon } from "@/components/ui/Icons";
import { SERVICE_ICON_LABELS, ServiceIcon } from "@/components/ui/ServiceIcon";
import { SERVICE_ICONS, type ServiceIcon as ServiceIconName, type SiteContent } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card, L10nField, NumberField, TextField } from "./fields";
import { ImageUploader } from "./ImageUploader";

type Setter = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void;

const SECTIONS = [
  { id: "hero", label: "Ana Sayfa Girişi" },
  { id: "services", label: "Hizmetler" },
  { id: "process", label: "Çalışma Süreci" },
  { id: "why", label: "Neden Biz" },
  { id: "stats", label: "Rakamlar" },
  { id: "about", label: "Hakkımızda" },
  { id: "testimonials", label: "Müşteri Yorumları" },
  { id: "cta", label: "Teklif Bölümü" },
  { id: "brand", label: "Slogan & Alt Bilgi" },
  { id: "seo", label: "SEO (Google)" },
] as const;

const empty = () => ({ tr: "", en: "", ar: "" });

/** Small card wrapper for one item of a list (service, step, value…) with move / delete controls */
function ItemBox({
  label,
  index,
  count,
  onMove,
  onRemove,
  children,
}: {
  label: string;
  index: number;
  count: number;
  onMove?: (dir: -1 | 1) => void;
  onRemove?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-ink/[0.07] bg-[#FBFAF7] p-4 md:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-widest text-ink-400">{label} {index + 1}</p>
        <div className="flex items-center gap-1">
          {onMove && (
            <>
              <button onClick={() => onMove(-1)} disabled={index === 0} aria-label="Yukarı taşı" className="grid h-8 w-8 place-items-center rounded-lg text-ink-400 hover:bg-white disabled:opacity-30"><ArrowIcon width={14} className="-rotate-90" /></button>
              <button onClick={() => onMove(1)} disabled={index === count - 1} aria-label="Aşağı taşı" className="grid h-8 w-8 place-items-center rounded-lg text-ink-400 hover:bg-white disabled:opacity-30"><ArrowIcon width={14} className="rotate-90" /></button>
            </>
          )}
          {onRemove && (
            <button onClick={onRemove} aria-label="Sil" className="grid h-8 w-8 place-items-center rounded-lg text-ink-300 hover:bg-red-50 hover:text-red-600"><TrashIcon width={16} /></button>
          )}
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function move<T>(list: T[], i: number, dir: -1 | 1): T[] {
  const j = i + dir;
  if (j < 0 || j >= list.length) return list;
  const next = [...list];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

const addBtn = "inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-cream hover:bg-gold-600";

/** Every text & picture on the website, grouped by page section */
export function ContentPanel({ content, set }: { content: SiteContent; set: Setter }) {
  const [section, setSection] = useState<(typeof SECTIONS)[number]["id"]>("hero");
  const { hero, services, process, why, about, testimonials, cta } = content;

  return (
    <div className="space-y-5">
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSection(s.id)}
            className={cn("shrink-0 rounded-full px-4 py-2 text-sm font-medium transition", section === s.id ? "bg-ink text-cream" : "bg-white text-ink-500 ring-1 ring-ink/10 hover:text-ink")}
          >
            {s.label}
          </button>
        ))}
      </div>

      {section === "hero" && (
        <Card title="Ana Sayfa Girişi" description="Sitenin en üstündeki büyük başlık alanı ve yanındaki iki fotoğraf.">
          <L10nField label="Üst küçük başlık" value={hero.eyebrow} onChange={(eyebrow) => set("hero", { ...hero, eyebrow })} />
          <L10nField label="Ana başlık" value={hero.title} onChange={(title) => set("hero", { ...hero, title })} hint="Harf harf animasyonla görünür. Kısa ve etkileyici tutun." />
          <L10nField label="Açıklama" value={hero.subtitle} onChange={(subtitle) => set("hero", { ...hero, subtitle })} multiline />
          <div className="grid gap-4 sm:grid-cols-2">
            <L10nField label="1. buton (Teklif)" value={hero.ctaPrimary} onChange={(ctaPrimary) => set("hero", { ...hero, ctaPrimary })} />
            <L10nField label="2. buton (Projeler)" value={hero.ctaSecondary} onChange={(ctaSecondary) => set("hero", { ...hero, ctaSecondary })} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <ImageUploader
              single
              label="Büyük kemerli fotoğraf (dikey önerilir)"
              images={hero.images[0] ? [hero.images[0]] : []}
              onChange={(imgs) => set("hero", { ...hero, images: [imgs[0] ?? "", hero.images[1] ?? ""].filter(Boolean) })}
            />
            <ImageUploader
              single
              label="Küçük fotoğraf (yatay önerilir)"
              images={hero.images[1] ? [hero.images[1]] : []}
              onChange={(imgs) => set("hero", { ...hero, images: [hero.images[0] ?? "", imgs[0] ?? ""].filter(Boolean) })}
            />
          </div>
        </Card>
      )}

      {section === "services" && (
        <Card
          title="Hizmetler"
          description="Ana sayfadaki hizmet kartları ve Hizmetlerimiz sayfası. Her hizmet için bir ikon ve fotoğraf seçin."
          actions={
            <button onClick={() => set("services", { ...services, items: [...services.items, { icon: "interior", image: "", title: empty(), text: empty() }] })} className={addBtn}>
              <PlusIcon width={18} /> Hizmet Ekle
            </button>
          }
        >
          <L10nField label="Bölüm başlığı" value={services.title} onChange={(title) => set("services", { ...services, title })} />
          <L10nField label="Alt başlık" value={services.subtitle} onChange={(subtitle) => set("services", { ...services, subtitle })} />
          {services.items.map((item, i) => {
            const patch = (p: Partial<typeof item>) => set("services", { ...services, items: services.items.map((x, j) => (j === i ? { ...x, ...p } : x)) });
            return (
              <ItemBox
                key={i}
                label="Hizmet"
                index={i}
                count={services.items.length}
                onMove={(d) => set("services", { ...services, items: move(services.items, i, d) })}
                onRemove={() => confirm("Bu hizmet silinsin mi?") && set("services", { ...services, items: services.items.filter((_, j) => j !== i) })}
              >
                <L10nField label="Hizmet adı" value={item.title} onChange={(title) => patch({ title })} />
                <L10nField label="Kısa açıklama" value={item.text} onChange={(text) => patch({ text })} multiline rows={2} />
                <div>
                  <span className="mb-1.5 block text-sm font-medium text-ink-600">İkon</span>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_ICONS.map((name: ServiceIconName) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => patch({ icon: name })}
                        title={SERVICE_ICON_LABELS[name]}
                        aria-label={SERVICE_ICON_LABELS[name]}
                        aria-pressed={item.icon === name}
                        className={cn(
                          "grid h-11 w-11 place-items-center rounded-xl ring-1 transition",
                          item.icon === name ? "bg-ink text-gold-300 ring-ink" : "bg-white text-ink-400 ring-ink/10 hover:text-ink",
                        )}
                      >
                        <ServiceIcon name={name} width={20} height={20} />
                      </button>
                    ))}
                  </div>
                </div>
                <ImageUploader single label="Fotoğraf" images={item.image ? [item.image] : []} onChange={(imgs) => patch({ image: imgs[0] ?? "" })} />
              </ItemBox>
            );
          })}
        </Card>
      )}

      {section === "process" && (
        <Card
          title="Çalışma Sürecimiz"
          description="Sayfa kaydırıldıkça fotoğrafı değişen adım adım süreç bölümü."
          actions={
            <button onClick={() => set("process", { ...process, steps: [...process.steps, { image: "", title: empty(), text: empty() }] })} className={addBtn}>
              <PlusIcon width={18} /> Adım Ekle
            </button>
          }
        >
          <L10nField label="Başlık" value={process.title} onChange={(title) => set("process", { ...process, title })} />
          <L10nField label="Alt başlık" value={process.subtitle} onChange={(subtitle) => set("process", { ...process, subtitle })} />
          {process.steps.map((step, i) => {
            const patch = (p: Partial<typeof step>) => set("process", { ...process, steps: process.steps.map((x, j) => (j === i ? { ...x, ...p } : x)) });
            return (
              <ItemBox
                key={i}
                label="Adım"
                index={i}
                count={process.steps.length}
                onMove={(d) => set("process", { ...process, steps: move(process.steps, i, d) })}
                onRemove={() => confirm("Bu adım silinsin mi?") && set("process", { ...process, steps: process.steps.filter((_, j) => j !== i) })}
              >
                <L10nField label="Başlık" value={step.title} onChange={(title) => patch({ title })} />
                <L10nField label="Metin" value={step.text} onChange={(text) => patch({ text })} multiline rows={2} />
                <ImageUploader single label="Fotoğraf" images={step.image ? [step.image] : []} onChange={(imgs) => patch({ image: imgs[0] ?? "" })} />
              </ItemBox>
            );
          })}
        </Card>
      )}

      {section === "why" && (
        <Card title="Neden Huzur Dekor?" description="Ana sayfadaki koyu renkli bölüm ve Hakkımızda sayfasındaki değer kartları.">
          <L10nField label="Başlık" value={why.title} onChange={(title) => set("why", { ...why, title })} />
          <L10nField label="Alt başlık" value={why.subtitle} onChange={(subtitle) => set("why", { ...why, subtitle })} multiline rows={2} />
          {why.items.map((item, i) => (
            <ItemBox key={i} label="Kart" index={i} count={why.items.length}>
              <L10nField label="Başlık" value={item.title} onChange={(title) => set("why", { ...why, items: why.items.map((x, j) => (j === i ? { ...x, title } : x)) })} />
              <L10nField label="Metin" value={item.text} onChange={(text) => set("why", { ...why, items: why.items.map((x, j) => (j === i ? { ...x, text } : x)) })} multiline rows={2} />
            </ItemBox>
          ))}
        </Card>
      )}

      {section === "stats" && (
        <Card title="Rakamlar" description="Sayfada kayarken sayarak artan sayaçlar. Gerçek rakamlarınızı yazın.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <NumberField label="Tamamlanan proje" value={content.stats.projects} onChange={(v) => set("stats", { ...content.stats, projects: Math.round(v ?? 0) })} />
            <NumberField label="Yıllık tecrübe" value={content.stats.years} onChange={(v) => set("stats", { ...content.stats, years: Math.round(v ?? 0) })} />
            <NumberField label="Mutlu müşteri" value={content.stats.clients} onChange={(v) => set("stats", { ...content.stats, clients: Math.round(v ?? 0) })} />
            <NumberField label="Memnuniyet" suffix="%" value={content.stats.satisfaction} onChange={(v) => set("stats", { ...content.stats, satisfaction: Math.min(100, Math.round(v ?? 0)) })} />
          </div>
        </Card>
      )}

      {section === "about" && (
        <Card title="Hakkımızda" description="Hakkımızda sayfasındaki firma hikâyesi.">
          <L10nField label="Sayfa başlığı" value={about.title} onChange={(title) => set("about", { ...about, title })} />
          <L10nField label="Giriş cümlesi" value={about.intro} onChange={(intro) => set("about", { ...about, intro })} multiline rows={2} />
          <L10nField label="Hikâyemiz" value={about.story} onChange={(story) => set("about", { ...about, story })} multiline rows={9} hint="Paragrafları ayırmak için arada bir boş satır bırakın." />
          <L10nField label="Alıntı / Söz" value={about.quote} onChange={(quote) => set("about", { ...about, quote })} multiline rows={2} />
          <L10nField label="Misyon" value={about.mission} onChange={(mission) => set("about", { ...about, mission })} multiline rows={2} />
          <ImageUploader single label="Sayfa fotoğrafı" images={about.image ? [about.image] : []} onChange={(imgs) => set("about", { ...about, image: imgs[0] ?? "" })} />
        </Card>
      )}

      {section === "testimonials" && (
        <Card
          title="Müşteri Yorumları"
          description="Ana sayfada otomatik dönen yorumlar. Liste boşsa bölüm sitede gizlenir — yalnızca gerçek müşteri yorumlarını ekleyin."
          actions={
            <button
              onClick={() => set("testimonials", { ...testimonials, items: [...testimonials.items, { id: `t-${Date.now()}`, name: "", city: "", rating: 5, text: empty() }] })}
              className={addBtn}
            >
              <PlusIcon width={18} /> Yorum Ekle
            </button>
          }
        >
          <L10nField label="Bölüm başlığı" value={testimonials.title} onChange={(title) => set("testimonials", { ...testimonials, title })} />
          {testimonials.items.length === 0 && <p className="rounded-2xl bg-[#FBFAF7] p-6 text-center text-sm text-ink-400">Henüz yorum yok — bölüm sitede gizli.</p>}
          {testimonials.items.map((item, i) => {
            const patch = (p: Partial<typeof item>) => set("testimonials", { ...testimonials, items: testimonials.items.map((x, j) => (j === i ? { ...x, ...p } : x)) });
            return (
              <ItemBox
                key={item.id}
                label="Yorum"
                index={i}
                count={testimonials.items.length}
                onRemove={() => confirm("Bu yorum silinsin mi?") && set("testimonials", { ...testimonials, items: testimonials.items.filter((_, j) => j !== i) })}
              >
                <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto]">
                  <TextField label="İsim" value={item.name} onChange={(name) => patch({ name })} />
                  <TextField label="Şehir" value={item.city} onChange={(city) => patch({ city })} />
                  <div>
                    <span className="mb-1.5 block text-sm font-medium text-ink-600">Puan</span>
                    <div className="flex h-[46px] items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button key={n} onClick={() => patch({ rating: n })} aria-label={`${n} yıldız`} className={n <= item.rating ? "text-gold-500" : "text-ink-200"}>
                          <StarIcon width={22} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <L10nField label="Yorum" value={item.text} onChange={(text) => patch({ text })} multiline rows={3} />
              </ItemBox>
            );
          })}
        </Card>
      )}

      {section === "cta" && (
        <Card title="Teklif Bölümü" description="Sayfaların altındaki büyük fotoğraflı “Projenize Bugün Başlayalım” alanı.">
          <L10nField label="Başlık" value={cta.title} onChange={(title) => set("cta", { ...cta, title })} />
          <L10nField label="Metin" value={cta.text} onChange={(text) => set("cta", { ...cta, text })} multiline rows={2} />
          <L10nField label="Buton yazısı" value={cta.button} onChange={(button) => set("cta", { ...cta, button })} />
          <ImageUploader single label="Arka plan fotoğrafı" images={cta.image ? [cta.image] : []} onChange={(imgs) => set("cta", { ...cta, image: imgs[0] ?? "" })} />
        </Card>
      )}

      {section === "brand" && (
        <Card title="Slogan & Alt Bilgi">
          <L10nField label="Slogan" value={content.brand.tagline} onChange={(tagline) => set("brand", { ...content.brand, tagline })} />
          <L10nField label="Alt bilgi (footer) metni" value={content.brand.footerText} onChange={(footerText) => set("brand", { ...content.brand, footerText })} multiline rows={2} />
        </Card>
      )}

      {section === "seo" && (
        <Card title="SEO — Google'da Görünüm" description="Arama sonuçlarında ve paylaşımlarda görünen başlık ve açıklama.">
          <L10nField label="Site başlığı" value={content.seo.title} onChange={(title) => set("seo", { ...content.seo, title })} hint="Önerilen: 50–60 karakter" />
          <L10nField label="Site açıklaması" value={content.seo.description} onChange={(description) => set("seo", { ...content.seo, description })} multiline rows={3} hint="Önerilen: 140–160 karakter" />
          <div className="rounded-2xl border border-ink/[0.07] bg-[#FBFAF7] p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-400">Google önizleme</p>
            <p className="mt-3 truncate text-lg text-[#1a0dab]">{content.seo.title.tr}</p>
            <p className="text-sm text-[#006621]">huzurdekor.com</p>
            <p className="line-clamp-2 text-sm text-ink-500">{content.seo.description.tr}</p>
          </div>
        </Card>
      )}
    </div>
  );
}
