import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const slugify = (text) => text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

async function main() {
  console.log("Seeding database...");

  // Clean existing data to ensure old categories are removed
  await prisma.inquiryItem.deleteMany({});
  await prisma.inquiry.deleteMany({});
  await prisma.image.deleteMany({});
  await prisma.finish.deleteMany({});
  await prisma.spec.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.admin.deleteMany({});

  // ── Admin ─────────────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.admin.create({
    data: {
      email: "admin@hardware.com",
      password: hashedPassword,
      name: "Admin User",
    },
  });
  console.log("Admin created — email: admin@hardware.com, password: admin123");

  // ── Categories ────────────────────────────────────────────────────────────
  const architectural = await prisma.category.create({
    data: {
      name: "Architectural Hardware",
      slug: "architectural-hardware",
      description: "Architectural ironmongery for residential and commercial use",
      order: 1,
    },
  });

  const gate = await prisma.category.create({
    data: {
      name: "Gate Hardware",
      slug: "gate-hardware",
      description: "Heavy duty gate hardware for all types of gates",
      order: 2,
    },
  });

  const ironmongery = await prisma.category.create({
    data: {
      name: "Ironmongery",
      slug: "ironmongery",
      description: "General hardware and ironmongery products",
      order: 3,
    },
  });
  console.log("Categories created");

  // ── Subcategories ─────────────────────────────────────────────────────────
  const archItems = ['Bolts', 'Brackets', 'Cabin Hook', 'Corners', 'Plates', 'Table Legs'];
  const gateItems = ['Band', 'Gate Spring', 'Handles', 'Hasp & Staples', 'Hinges', 'Hook', 'Latches', 'Scotch Tee Hinges', 'Strap Hinges', 'Tee Hinges'];
  const ironItems = ['Band', 'Bolts', 'Brackets', 'Cabin Hook', 'Clamps', 'Corners', 'Gate Spring', 'Handles', 'Hasp & Staples', 'Hinges', 'Hook', 'Latches', 'Plates', 'Scotch Tee Hinges', 'Strap Hinges', 'Table Legs', 'Tee Hinges'];

  for (let i = 0; i < archItems.length; i++) {
    await prisma.category.create({
      data: { name: archItems[i], slug: `arch-${slugify(archItems[i])}`, parentId: architectural.id, order: i + 1 },
    });
  }
  for (let i = 0; i < gateItems.length; i++) {
    await prisma.category.create({
      data: { name: gateItems[i], slug: `gate-${slugify(gateItems[i])}`, parentId: gate.id, order: i + 1 },
    });
  }
  for (let i = 0; i < ironItems.length; i++) {
    await prisma.category.create({
      data: { name: ironItems[i], slug: `iron-${slugify(ironItems[i])}`, parentId: ironmongery.id, order: i + 1 },
    });
  }
  console.log("Subcategories created");

  // ── Sample Products ───────────────────────────────────────────────────────
  await prisma.product.create({
    data: {
      name: "Heavy Duty Pad Bolt",
      sku: "PB-201",
      slug: "heavy-duty-pad-bolt-pb-201",
      description: "Heavy duty pad bolt for gates and doors. Built for outdoor use.",
      categoryId: gate.id,
      isFeatured: true,
      finishes: {
        create: [{ name: "Zinc" }, { name: "Powder Coating/ Black" }],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Classic Tower Bolt",
      sku: "TB-401",
      slug: "tower-bolt-tb-401",
      description: "Classic tower bolt for doors and windows. Smooth sliding action.",
      categoryId: architectural.id,
      isFeatured: true,
      finishes: {
        create: [{ name: "Chrome" }, { name: "E.brass" }],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Gate Spring 8 Inch",
      sku: "GS-800",
      slug: "gate-spring-8-inch",
      description: "Durable gate spring for automatic closing.",
      categoryId: ironmongery.id,
      isFeatured: false,
      finishes: {
        create: [{ name: "Self colour" }, { name: "Zinc" }],
      },
    },
  });

  console.log("Sample products created");
  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
