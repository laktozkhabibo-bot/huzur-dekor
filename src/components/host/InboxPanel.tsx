"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { MailIcon, PhoneIcon, TrashIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { cn, whatsappLink } from "@/lib/utils";
import { Card } from "./fields";

interface Message { id: string; name: string; phone: string; email: string; service: string; message: string; read: boolean; createdAt: string }

const date = (s: string) => new Date(s).toLocaleString("tr-TR", { dateStyle: "medium", timeStyle: "short" });

/** Quote requests sent from the contact form (actions apply immediately) */
export function InboxPanel({ onUnread }: { onUnread?: (n: number) => void }) {
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/inbox", { cache: "no-store" });
    if (!res.ok) return toast.error("Gelen kutusu yüklenemedi.");
    const data = await res.json();
    setMessages(data.messages);
    onUnread?.(data.messages.filter((m: Message) => !m.read).length);
  }, [onUnread]);

  useEffect(() => {
    load();
  }, [load]);

  const act = async (action: "read" | "unread" | "delete-message", id: string) => {
    const res = await fetch("/api/admin/inbox", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action, id }) });
    if (!res.ok) return toast.error("İşlem başarısız.");
    if (action === "delete-message") toast.success("Talep silindi");
    load();
  };

  const list = (messages ?? []).filter((m) => (filter === "unread" ? !m.read : true));
  const unread = (messages ?? []).filter((m) => !m.read).length;

  return (
    <Card
      title="Teklif Talepleri"
      description="İletişim sayfasındaki formdan gelen talepler. Bir talebe tıklayınca okundu olarak işaretlenir."
      actions={
        <div className="flex rounded-xl bg-[#F7F4EE] p-1 ring-1 ring-ink/10">
          {(["all", "unread"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={cn("rounded-lg px-3 py-1.5 text-xs font-bold transition", filter === f ? "bg-ink text-cream" : "text-ink-400 hover:text-ink")}>
              {f === "all" ? `Tümü (${messages?.length ?? 0})` : `Okunmamış (${unread})`}
            </button>
          ))}
        </div>
      }
    >
      {messages === null ? (
        <p className="text-sm text-ink-400">Yükleniyor…</p>
      ) : list.length === 0 ? (
        <p className="rounded-2xl bg-[#FBFAF7] p-8 text-center text-sm text-ink-400">{filter === "unread" ? "Okunmamış talep yok. 🎉" : "Henüz talep yok."}</p>
      ) : (
        <ul className="divide-y divide-ink/[0.06] overflow-hidden rounded-2xl border border-ink/[0.07]">
          {list.map((m) => (
            <li key={m.id} className={cn("bg-white transition-colors", !m.read && "bg-gold-50/70")}>
              <button
                className="flex w-full items-start gap-3 p-4 text-start"
                onClick={() => {
                  setOpen(open === m.id ? null : m.id);
                  if (!m.read) act("read", m.id);
                }}
                aria-expanded={open === m.id}
              >
                <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", m.read ? "bg-transparent" : "bg-gold-500")} />
                <span className="min-w-0 flex-1">
                  <span className="flex justify-between gap-2">
                    <span className="truncate font-semibold">
                      {m.name}
                      {m.service && <span className="ms-2 rounded-md bg-gold-100 px-1.5 py-0.5 text-[11px] font-semibold text-gold-800">{m.service}</span>}
                    </span>
                    <span className="shrink-0 text-xs text-ink-400">{date(m.createdAt)}</span>
                  </span>
                  <span className={cn("block text-sm text-ink-500", open === m.id ? "whitespace-pre-wrap" : "truncate")}>{m.message}</span>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === m.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                    <div className="flex flex-wrap items-center gap-2 px-9 pb-4 text-sm">
                      {m.phone && (
                        <>
                          <a href={whatsappLink(m.phone)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-1.5 font-medium text-white"><WhatsAppIcon width={14} /> WhatsApp</a>
                          <a href={`tel:${m.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3 py-1.5 text-cream" dir="ltr"><PhoneIcon width={14} /> {m.phone}</a>
                        </>
                      )}
                      {m.email && <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1.5 rounded-lg border border-ink/10 px-3 py-1.5"><MailIcon width={14} /> {m.email}</a>}
                      <button onClick={() => act("unread", m.id)} className="rounded-lg px-3 py-1.5 text-ink-500 hover:bg-ink/5">Okunmadı yap</button>
                      <button onClick={() => confirm("Bu talep silinsin mi?") && act("delete-message", m.id)} className="ms-auto inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-red-600 hover:bg-red-50">
                        <TrashIcon width={14} /> Sil
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
