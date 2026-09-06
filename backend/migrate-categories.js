import prisma from './services/prisma.service.js';

async function main() {
  const allCats = await prisma.category.findMany({
    where: { parentId: { not: null } }
  });

  // Find duplicates by name within the same parent
  const grouped = {};
  for (const cat of allCats) {
    const key = cat.parentId + '-' + cat.name;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(cat);
  }

  for (const key in grouped) {
    const cats = grouped[key];
    if (cats.length > 1) {
      // Sort so the one without full parent name is considered "old" and the one with it is "new"
      // Wait, earlier I said my new ones had longer slugs. Let's just keep the old one and delete the new one!
      // But the new one might be the only one for new items.
      // If we keep the old one, we should delete the new one.
      cats.sort((a, b) => a.slug.length - b.slug.length);
      const keep = cats[0];
      const deleteCat = cats[1];

      // Move products from deleteCat to keep
      await prisma.product.updateMany({
        where: { categoryId: deleteCat.id },
        data: { categoryId: keep.id }
      });

      // Delete the duplicate
      await prisma.category.delete({
        where: { id: deleteCat.id }
      });
      console.log(`Merged ${deleteCat.slug} into ${keep.slug}`);
    }
  }

  console.log('Migration complete');
}

main().catch(console.error).finally(() => prisma.$disconnect());
