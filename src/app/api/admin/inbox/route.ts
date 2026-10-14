import { NextResponse } from "next/server";
import { z } from "zod";
import { adminRoute } from "@/lib/admin-route";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/** Quote / contact requests from the website */
export const GET = adminRoute(async () => {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 300 });
  return NextResponse.json({ messages });
});

const actionSchema = z.object({
  action: z.enum(["read", "unread", "delete-message"]),
  id: z.string().min(1),
});

export const POST = adminRoute(async (req: Request) => {
  const parsed = actionSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  const { action, id } = parsed.data;
  if (action === "read" || action === "unread") await prisma.contactMessage.update({ where: { id }, data: { read: action === "read" } });
  if (action === "delete-message") await prisma.contactMessage.delete({ where: { id } });
  return NextResponse.json({ ok: true });
});
