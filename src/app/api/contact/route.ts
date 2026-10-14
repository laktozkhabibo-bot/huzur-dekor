import { NextResponse } from "next/server";
import { z } from "zod";
import { isDbConfigured, prisma } from "@/lib/prisma";
import { allowRequest } from "@/lib/rate-limit";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(40),
  email: z.union([z.literal(""), z.string().trim().email().max(200)]).optional().default(""),
  service: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(5).max(4000),
  website: z.string().optional().nullable(), // honeypot (bots fill it, people never see it)
});

/** Stores quote / contact requests; the owner reads them in /hostpage → Gelen Kutusu */
export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ ok: true });
  if (!isDbConfigured()) return NextResponse.json({ error: "no_database" }, { status: 503 });
  if (!(await allowRequest("contact", 5))) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const { name, phone, email, service, message } = parsed.data;
  await prisma.contactMessage.create({ data: { name, phone, email: email ?? "", service: service ?? "", message } });
  return NextResponse.json({ ok: true });
}
