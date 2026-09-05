import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categoriesData = [
  {
    name: 'Architectural Hardware',
    sub: [
      'Bolts', 'Brackets', 'Cabin Hook', 'Corners', 'Hinges', 'Plates', 'Table Legs'
    ]
  },
  {
    name: 'Gate Hardware',
    sub: [
      'Band', 'Gate Spring', 'Handles', 'Hasp & Staples', 'Hinges', 'Hook', 'Latches', 'Scotch Tee Hinges', 'Strap Hinges', 'Tee Hinges'
    ]
  },
  {
    name: 'Ironmongery',
    sub: [
      'Band', 'Bolts', 'Brackets', 'Cabin Hook', 'Clamps', 'Corners', 'Gate Spring', 'Handles', 'Hasp & Staples', 'Hinges', 'Hook', 'Latches', 'Plates', 'Scotch Tee Hinges', 'Strap Hinges', 'Table Legs', 'Tee Hinges'
    ]
  }
];

function generateSlug(name, parentName = '') {
  const base = parentName ? `${parentName}-${name}` : name;
  return base.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function main() {
  console.log('Starting category seed...');
  // Optional: await prisma.category.deleteMany({}); // Let's NOT delete old categories in case products are tied to them, but we will seed new ones if they don't exist.
  
  for (const mainCat of categoriesData) {
    let parent = await prisma.category.findUnique({ where: { slug: generateSlug(mainCat.name) } });
    if (!parent) {
      parent = await prisma.category.create({
        data: {
          name: mainCat.name,
          slug: generateSlug(mainCat.name),
        }
      });
      console.log(`Created parent category: ${mainCat.name}`);
    } else {
      console.log(`Parent category exists: ${mainCat.name}`);
    }

    for (const subName of mainCat.sub) {
      const subSlug = generateSlug(subName, mainCat.name);
      let sub = await prisma.category.findUnique({ where: { slug: subSlug } });
      if (!sub) {
        await prisma.category.create({
          data: {
            name: subName,
            slug: subSlug,
            parentId: parent.id
          }
        });
        console.log(`Created subcategory: ${subName} under ${mainCat.name}`);
      }
    }
  }

  console.log('Finished seeding categories.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
