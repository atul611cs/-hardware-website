import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ── Admin ─────────────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.admin.upsert({
    where: { email: "admin@hardware.com" },
    update: {},
    create: {
      email: "admin@hardware.com",
      password: hashedPassword,
      name: "Admin User",
    },
  });

  console.log("Admin created — email: admin@hardware.com, password: admin123");

  // ── Categories ────────────────────────────────────────────────────────────
  const aluminium = await prisma.category.upsert({
    where: { slug: "aluminium-hardware" },
    update: {},
    create: {
      name: "Aluminium Hardware",
      slug: "aluminium-hardware",
      description: "Premium aluminium hardware fittings for doors and windows",
      order: 1,
    },
  });

  const gate = await prisma.category.upsert({
    where: { slug: "gate-hardware" },
    update: {},
    create: {
      name: "Gate Hardware",
      slug: "gate-hardware",
      description: "Heavy duty gate hardware for all types of gates",
      order: 2,
    },
  });

  const architectural = await prisma.category.upsert({
    where: { slug: "architectural-hardware" },
    update: {},
    create: {
      name: "Architectural Hardware",
      slug: "architectural-hardware",
      description:
        "Architectural ironmongery for residential and commercial use",
      order: 3,
    },
  });

  const ironmongery = await prisma.category.upsert({
    where: { slug: "hardware-ironmongery" },
    update: {},
    create: {
      name: "Hardware and Ironmongery",
      slug: "hardware-ironmongery",
      description: "General hardware and ironmongery products",
      order: 4,
    },
  });

  console.log("Categories created");

  // ── Subcategories ─────────────────────────────────────────────────────────
  await prisma.category.upsert({
    where: { slug: "alum-handle" },
    update: {},
    create: {
      name: "Alum Handle",
      slug: "alum-handle",
      parentId: aluminium.id,
      order: 1,
    },
  });

  await prisma.category.upsert({
    where: { slug: "alum-hinge" },
    update: {},
    create: {
      name: "Alum Hinge",
      slug: "alum-hinge",
      parentId: aluminium.id,
      order: 2,
    },
  });

  await prisma.category.upsert({
    where: { slug: "pad-bolt" },
    update: {},
    create: {
      name: "Pad Bolt",
      slug: "pad-bolt",
      parentId: gate.id,
      order: 1,
    },
  });

  await prisma.category.upsert({
    where: { slug: "tee-hinge" },
    update: {},
    create: {
      name: "Tee Hinge",
      slug: "tee-hinge",
      parentId: gate.id,
      order: 2,
    },
  });

  console.log("Subcategories created");

  // ── Sample Products ───────────────────────────────────────────────────────
  await prisma.product.upsert({
    where: { slug: "aluminium-door-handle-ah-101" },
    update: {},
    create: {
      name: "Aluminium Door Handle AH-101",
      sku: "AH-101",
      slug: "aluminium-door-handle-ah-101",
      description:
        "Premium aluminium door handle with smooth finish. Suitable for residential and commercial doors. Corrosion resistant and durable.",
      material: "Aluminium",
      categoryId: aluminium.id,
      isFeatured: true,
      finishes: {
        create: [
          { name: "Chrome" },
          { name: "Antique Brass" },
          { name: "Powder Coated Black" },
        ],
      },
      specs: {
        create: [
          { key: "Length", value: "200mm" },
          { key: "Weight", value: "180g" },
          { key: "Material", value: "Aluminium Alloy" },
          { key: "Fixing", value: "Screw fix" },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { slug: "heavy-duty-pad-bolt-pb-201" },
    update: {},
    create: {
      name: "Heavy Duty Pad Bolt PB-201",
      sku: "PB-201",
      slug: "heavy-duty-pad-bolt-pb-201",
      description:
        "Heavy duty pad bolt for gates and doors. Built for outdoor use with galvanized finish for rust resistance.",
      material: "Iron",
      categoryId: gate.id,
      isFeatured: true,
      finishes: {
        create: [{ name: "Galvanized" }, { name: "Black Powder Coat" }],
      },
      specs: {
        create: [
          { key: "Length", value: "300mm" },
          { key: "Weight", value: "450g" },
          { key: "Material", value: "MS Iron" },
          { key: "Bolt Diameter", value: "12mm" },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { slug: "tee-hinge-th-301" },
    update: {},
    create: {
      name: "Tee Hinge TH-301",
      sku: "TH-301",
      slug: "tee-hinge-th-301",
      description:
        "Traditional tee hinge for wooden gates and barn doors. Heavy gauge steel construction for long lasting performance.",
      material: "Iron",
      categoryId: gate.id,
      isFeatured: false,
      finishes: {
        create: [{ name: "Galvanized" }, { name: "Antique Black" }],
      },
      specs: {
        create: [
          { key: "Size", value: "300mm x 100mm" },
          { key: "Weight", value: "320g" },
          { key: "Material", value: "MS Steel" },
          { key: "Load Capacity", value: "80kg" },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { slug: "tower-bolt-tb-401" },
    update: {},
    create: {
      name: "Tower Bolt TB-401",
      sku: "TB-401",
      slug: "tower-bolt-tb-401",
      description:
        "Classic tower bolt for doors and windows. Smooth sliding action with sturdy construction.",
      material: "Brass",
      categoryId: architectural.id,
      isFeatured: true,
      finishes: {
        create: [
          { name: "Polished Brass" },
          { name: "Satin Nickel" },
          { name: "Antique Copper" },
        ],
      },
      specs: {
        create: [
          { key: "Length", value: "150mm" },
          { key: "Weight", value: "120g" },
          { key: "Material", value: "Brass" },
          { key: "Bolt Diameter", value: "8mm" },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { slug: "door-stopper-ds-501" },
    update: {},
    create: {
      name: "Door Stopper DS-501",
      sku: "DS-501",
      slug: "door-stopper-ds-501",
      description:
        "Floor mounted door stopper with rubber tip. Prevents door from hitting walls and protects surfaces.",
      material: "Stainless Steel",
      categoryId: ironmongery.id,
      isFeatured: false,
      finishes: {
        create: [{ name: "Satin Stainless" }, { name: "Polished Chrome" }],
      },
      specs: {
        create: [
          { key: "Height", value: "35mm" },
          { key: "Base Diameter", value: "40mm" },
          { key: "Material", value: "SS 304" },
          { key: "Fixing", value: "Floor mounted" },
        ],
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
