/**
 * Seeds a fresh database with the portfolio, all site texts and the first host password.
 * Safe to run multiple times: it only fills what's missing and never overwrites your edits.
 *   npm run db:seed
 */
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { defaultCategories, defaultContent, defaultProjects } from "../src/lib/defaults";

const prisma = new PrismaClient();

async function main() {
  // ── Site texts ──
  for (const [key, value] of Object.entries(defaultContent)) {
    await prisma.siteSetting.upsert({ where: { key }, update: {}, create: { key, value: value as Prisma.InputJsonValue } });
  }
  console.log("✔ Site texts ready");

  // ── Portfolio (only when it is completely empty) ──
  const [projectCount, categoryCount] = await Promise.all([prisma.project.count(), prisma.category.count()]);
  if (projectCount === 0 && categoryCount === 0) {
    const catIds = new Map<string, string>();
    for (const c of defaultCategories) {
      const created = await prisma.category.create({ data: { slug: c.slug, name: c.name, sortOrder: c.sortOrder } });
      catIds.set(c.slug, created.id);
    }
    for (const [i, p] of defaultProjects.entries()) {
      await prisma.project.create({
        data: {
          slug: p.slug,
          title: p.title,
          description: p.description,
          location: p.location,
          year: p.year,
          images: p.images,
          featured: p.featured,
          visible: true,
          sortOrder: i,
          categoryId: catIds.get(p.categorySlug) ?? null,
        },
      });
    }
    console.log(`✔ ${defaultCategories.length} categories & ${defaultProjects.length} projects created`);
  } else {
    console.log("• Portfolio already has data — skipped");
  }

  // ── Host password ──
  const cred = await prisma.adminCredential.findUnique({ where: { id: 1 } });
  if (!cred) {
    const initial = process.env.HOST_INITIAL_PASSWORD || "123456789";
    await prisma.adminCredential.create({ data: { id: 1, passwordHash: await bcrypt.hash(initial, 12), tokenVersion: 1 } });
    console.log(process.env.HOST_INITIAL_PASSWORD ? "✔ Host password set from HOST_INITIAL_PASSWORD" : '✔ Host password set to the default "123456789" — change it from /hostpage');
  } else {
    console.log("• Host password already set — skipped");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
