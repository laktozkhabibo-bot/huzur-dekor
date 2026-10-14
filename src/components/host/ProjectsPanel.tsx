"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowIcon, CloseIcon, EyeIcon, EyeOffIcon, PlusIcon, SearchIcon, StarIcon, StarOutlineIcon, TrashIcon } from "@/components/ui/Icons";
import type { CategoryDTO, ProjectDTO } from "@/lib/types";
import { cn, slugify } from "@/lib/utils";
import { Card, L10nField, TextField, Toggle, Label, useEditLang } from "./fields";
import { ImageUploader } from "./ImageUploader";

const emptyProject = (sortOrder: number, categoryId: string | null): ProjectDTO => ({
  id: `new-${Math.random().toString(36).slice(2, 10)}`,
  slug: "",
  title: { tr: "", en: "", ar: "" },
  description: { tr: "", en: "", ar: "" },
  location: "",
  year: "",
  images: [],
  visible: true,
  featured: false,
  sortOrder,
  categoryId,
});

export function ProjectsPanel({
  projects,
  categories,
  onChange,
}: {
  projects: ProjectDTO[];
  categories: CategoryDTO[];
  onChange: (projects: ProjectDTO[]) => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const editing = projects.find((p) => p.id === editingId) ?? null;

  const update = (id: string, patch: Partial<ProjectDTO>) => onChange(projects.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const remove = (p: ProjectDTO) => {
    if (!confirm(`“${p.title.tr || "İsimsiz proje"}” silinsin mi? (Kaydet'e bastığınızda kalıcı olarak silinir)`)) return;
    onChange(projects.filter((x) => x.id !== p.id));
    if (editingId === p.id) setEditingId(null);
  };

  const add = () => {
    const p = emptyProject(projects.length, categories[0]?.id ?? null);
    onChange([...projects, p]);
    setEditingId(p.id);
  };

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= projects.length) return;
    const next = [...projects];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next.map((p, i) => ({ ...p, sortOrder: i })));
  };

  const visibleList = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr");
    return projects
      .map((p, index) => ({ p, index }))
      .filter(({ p }) => (filter === "all" ? true : filter === "none" ? !p.categoryId : p.categoryId === filter))
      .filter(({ p }) => !q || `${p.title.tr} ${p.title.en} ${p.slug}`.toLocaleLowerCase("tr").includes(q));
  }, [projects, query, filter]);

  return (
    <>
      <Card
        title={`Projeler (${projects.length})`}
        description="Proje eklemek, düzenlemek veya kaldırmak için listeyi kullanın. Değişiklikler “Değişiklikleri Kaydet” ile yayına alınır."
        actions={
          <button onClick={add} className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-cream hover:bg-gold-600">
            <PlusIcon width={18} /> Yeni Proje
          </button>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Proje ara</span>
            <SearchIcon width={18} className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-ink-300" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Proje ara…" className="w-full rounded-xl border border-ink/10 bg-[#FBFAF7] py-2.5 pe-3 ps-10 text-sm focus:border-gold-500 focus:outline-none" />
          </label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-xl border border-ink/10 bg-[#FBFAF7] px-3 py-2.5 text-sm" aria-label="Kategori filtresi">
            <option value="all">Tüm kategoriler</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name.tr}</option>
            ))}
            <option value="none">Kategorisiz</option>
          </select>
        </div>

        <ul className="divide-y divide-ink/[0.06] overflow-hidden rounded-2xl border border-ink/[0.07]">
          {visibleList.length === 0 && <li className="p-8 text-center text-sm text-ink-400">Proje bulunamadı.</li>}
          {visibleList.map(({ p, index }) => {
            const cat = categories.find((c) => c.id === p.categoryId);
            return (
              <li key={p.id} className={cn("flex items-center gap-3 bg-white p-3 transition-colors hover:bg-[#FBFAF7] sm:gap-4", !p.visible && "opacity-60")}>
                <div className="hidden flex-col sm:flex">
                  <button onClick={() => move(index, -1)} disabled={index === 0} aria-label="Yukarı taşı" className="rounded p-0.5 text-ink-300 hover:text-ink disabled:opacity-30">
                    <ArrowIcon width={14} className="-rotate-90" />
                  </button>
                  <button onClick={() => move(index, 1)} disabled={index === projects.length - 1} aria-label="Aşağı taşı" className="rounded p-0.5 text-ink-300 hover:text-ink disabled:opacity-30">
                    <ArrowIcon width={14} className="rotate-90" />
                  </button>
                </div>
                <button onClick={() => setEditingId(p.id)} className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-cream-200">
                  {p.images[0] ? <SmartImage src={p.images[0]} alt="" fill sizes="56px" className="object-cover" /> : <span className="grid h-full place-items-center text-xl">🏠</span>}
                </button>
                <button onClick={() => setEditingId(p.id)} className="min-w-0 flex-1 text-start">
                  <p className="truncate font-semibold">{p.title.tr || <span className="italic text-ink-300">İsimsiz proje</span>}</p>
                  <p className="truncate text-xs text-ink-400">
                    {cat?.name.tr ?? "Kategorisiz"} · {p.images.length} görsel{p.location ? ` · ${p.location}` : ""}
                  </p>
                </button>
                <div className="flex items-center gap-1">
                  <button onClick={() => update(p.id, { featured: !p.featured })} title={p.featured ? "Öne çıkarılan (kaldır)" : "Öne çıkar"} aria-label="Öne çıkar" aria-pressed={p.featured} className={cn("grid h-9 w-9 place-items-center rounded-lg hover:bg-gold-50", p.featured ? "text-gold-500" : "text-ink-300")}>
                    {p.featured ? <StarIcon width={18} /> : <StarOutlineIcon width={18} />}
                  </button>
                  <button onClick={() => update(p.id, { visible: !p.visible })} title={p.visible ? "Sitede görünüyor (gizle)" : "Gizli (göster)"} aria-label="Görünürlük" aria-pressed={p.visible} className="grid h-9 w-9 place-items-center rounded-lg text-ink-400 hover:bg-ink/5">
                    {p.visible ? <EyeIcon width={18} /> : <EyeOffIcon width={18} />}
                  </button>
                  <button onClick={() => remove(p)} title="Sil" aria-label="Sil" className="grid h-9 w-9 place-items-center rounded-lg text-ink-300 hover:bg-red-50 hover:text-red-600">
                    <TrashIcon width={18} />
                  </button>
                  <button onClick={() => setEditingId(p.id)} className="ms-1 hidden rounded-lg border border-ink/10 px-3 py-2 text-sm font-medium hover:bg-ink hover:text-cream md:block">
                    Düzenle
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </Card>

      <AnimatePresence>
        {editing && (
          <ProjectEditor
            key={editing.id}
            project={editing}
            categories={categories}
            allProjects={projects}
            onChange={(patch) => update(editing.id, patch)}
            onClose={() => setEditingId(null)}
            onDelete={() => remove(editing)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/** Slide-over editor with every product field */
function ProjectEditor({
  project: p,
  categories,
  allProjects,
  onChange,
  onClose,
  onDelete,
}: {
  project: ProjectDTO;
  categories: CategoryDTO[];
  allProjects: ProjectDTO[];
  onChange: (patch: Partial<ProjectDTO>) => void;
  onClose: () => void;
  onDelete: () => void;
}) {
  const lang = useEditLang();
  const [slugTouched, setSlugTouched] = useState(!!p.slug && !p.id.startsWith("new-"));
  const slugTaken = !!p.slug && allProjects.some((x) => x.id !== p.id && x.slug === p.slug);
  
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Proje düzenle">
      <motion.button aria-label="Kapat" className="absolute inset-0 h-full w-full bg-ink/40 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.div
        className="absolute inset-y-0 end-0 flex w-full max-w-2xl flex-col bg-[#F7F4EE] shadow-2xl"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 280, damping: 32 }}
      >
        <header className="flex items-center justify-between gap-3 border-b border-ink/10 bg-white px-6 py-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-700">Proje Düzenle · {lang.toUpperCase()}</p>
            <h3 className="truncate text-lg font-semibold">{p.title.tr || "Yeni proje"}</h3>
          </div>
          <button onClick={onClose} className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-cream">
            Tamam <CloseIcon width={16} />
          </button>
        </header>

        <div className="flex-1 space-y-5 overflow-y-auto p-6">
          <Card title="Temel Bilgiler">
            <L10nField
              label="Proje adı"
              value={p.title}
              onChange={(title) => onChange({ title, ...(!slugTouched && lang === "tr" ? { slug: slugify(title.tr) } : {}) })}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <TextField
                  label="Adres (URL)"
                  value={p.slug}
                  onChange={(v) => {
                    setSlugTouched(true);
                    onChange({ slug: slugify(v) || v.toLowerCase() });
                  }}
                  hint={`/projeler/${p.slug || "…"}`}
                  dir="ltr"
                />
                {slugTaken && <p className="mt-1 text-xs text-red-500">Bu adres başka bir projede kullanılıyor; kaydederken otomatik numaralandırılır.</p>}
              </div>
              <div>
                <Label htmlFor="pe-cat">Kategori</Label>
                <select id="pe-cat" value={p.categoryId ?? ""} onChange={(e) => onChange({ categoryId: e.target.value || null })} className="w-full rounded-xl border border-ink/10 bg-[#FBFAF7] px-3.5 py-2.5 text-[15px]">
                  <option value="">Kategorisiz</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name.tr}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Konum" hint="isteğe bağlı" value={p.location} onChange={(location) => onChange({ location })} placeholder="örn. İstanbul, Başakşehir" />
              <TextField label="Yıl" hint="isteğe bağlı" value={p.year} onChange={(year) => onChange({ year })} placeholder="örn. 2025" />
            </div>
          </Card>

          <Card title="Görseller">
            <ImageUploader images={p.images} onChange={(images) => onChange({ images })} />
          </Card>

          <Card title="Açıklama" description="Üstteki dil seçiciden TR / EN / AR arasında geçiş yapın.">
            <L10nField label="Proje açıklaması" value={p.description} onChange={(description) => onChange({ description })} multiline rows={6} hint="Paragrafları ayırmak için arada bir boş satır bırakın." />
          </Card>

          <Card title="Yayın Ayarları">
            <Toggle label="Sitede göster" description="Kapalıysa proje sitede görünmez." checked={p.visible} onChange={(visible) => onChange({ visible })} />
            <Toggle label="Ana sayfada öne çıkar" description="Ana sayfadaki “Bazı Çalışmalarımız” galerisinde önce gösterilir." checked={p.featured} onChange={(featured) => onChange({ featured })} />
          </Card>

          <button onClick={onDelete} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 py-3 text-sm font-semibold text-red-600 hover:bg-red-50">
            <TrashIcon width={18} /> Bu projeyi sil
          </button>
        </div>
      </motion.div>
    </div>
  );
}
