import prisma from "../services/prisma.service.js";

// GET /api/products
export const getAllProducts = async (req, res) => {
  try {
    const {
      category,
      finish,
      featured,
      page = 1,
      limit = 20,
      search,
    } = req.query;

    const where = {};
    if (category) where.category = { slug: category };
    if (finish) where.finishes = { some: { name: finish } };
    if (featured) where.isFeatured = true;
    where.isActive = true;

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { sku: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { material: { contains: search, mode: "insensitive" } },
      ];
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          images: { orderBy: { order: "asc" } },
          finishes: true,
          specs: true,
        },
        skip: Number(skip),
        take: Number(limit),
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      success: true,
      data: products,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/products/:slug
export const getProductBySlug = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: req.params.slug },
      include: {
        category: true,
        images: { orderBy: { order: "asc" } },
        finishes: true,
        specs: true,
      },
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST /api/products
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      sku,
      slug,
      description,
      material,
      categoryId,
      isFeatured,
      finishes,
      specs,
    } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        sku,
        slug,
        description,
        material,
        categoryId,
        isFeatured: isFeatured || false,
        finishes: {
          create: finishes || [],
        },
        specs: {
          create: specs || [],
        },
      },
      include: {
        category: true,
        finishes: true,
        specs: true,
      },
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      sku,
      slug,
      description,
      material,
      categoryId,
      isFeatured,
      isActive,
    } = req.body;

    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: {
        name,
        sku,
        slug,
        description,
        material,
        categoryId,
        isFeatured,
        isActive,
        ...(req.body.finishes && {
          finishes: {
            deleteMany: {},
            create: req.body.finishes,
          }
        }),
        ...(req.body.specs && {
          specs: {
            deleteMany: {},
            create: req.body.specs,
          }
        })
      },
      include: {
        category: true,
        finishes: true,
        specs: true,
        images: true,
      },
    });

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: req.params.id },
    });

    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
