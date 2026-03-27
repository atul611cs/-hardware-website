import prisma from "../services/prisma.service.js";

// GET /api/categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: { parentId: null },
      include: {
        children: {
          include: {
            children: true,
          },
        },
        _count: { select: { products: true } },
      },
      orderBy: { order: "asc" },
    });

    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/categories/:slug
export const getCategoryBySlug = async (req, res) => {
  try {
    const category = await prisma.category.findUnique({
      where: { slug: req.params.slug },
      include: {
        children: true,
        products: {
          where: { isActive: true },
          include: {
            images: { orderBy: { order: "asc" }, take: 1 },
          },
        },
      },
    });

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST /api/categories
export const createCategory = async (req, res) => {
  try {
    const { name, slug, description, image, parentId, order } = req.body;

    const category = await prisma.category.create({
      data: { name, slug, description, image, parentId, order: order || 0 },
    });

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// PUT /api/categories/:id
export const updateCategory = async (req, res) => {
  try {
    const { name, slug, description, image, parentId, order } = req.body;

    const category = await prisma.category.update({
      where: { id: req.params.id },
      data: { name, slug, description, image, parentId, order },
    });

    res.json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE /api/categories/:id
export const deleteCategory = async (req, res) => {
  try {
    await prisma.category.delete({
      where: { id: req.params.id },
    });

    res.json({ success: true, message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
