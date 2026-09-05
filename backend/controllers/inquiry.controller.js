import prisma from "../services/prisma.service.js";

// POST /api/inquiries
export const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, company, message, items } = req.body;

    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone,
        company,
        message,
        items: {
          create:
            items?.map((item) => ({
              productId: item.productId,
              quantity: item.quantity || 1,
              notes: item.notes,
            })) || [],
        },
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    res.status(201).json({ success: true, data: inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/inquiries
export const getAllInquiries = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const where = {};
    if (status) where.status = status;

    const skip = (page - 1) * limit;

    const [inquiries, total] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        include: {
          items: {
            include: { product: true },
          },
        },
        skip: Number(skip),
        take: Number(limit),
        orderBy: { createdAt: "desc" },
      }),
      prisma.inquiry.count({ where }),
    ]);

    res.json({
      success: true,
      data: inquiries,
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

// PUT /api/inquiries/:id/status
export const updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const inquiry = await prisma.inquiry.update({
      where: { id: req.params.id },
      data: { status },
    });

    res.json({ success: true, data: inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
