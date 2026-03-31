import { uploadImage, deleteImage } from "../services/cloudinary.service.js";
import prisma from "../services/prisma.service.js";

export const uploadProductImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const { productId } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { images: true },
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const result = await uploadImage(req.file.buffer);

    const isPrimary = product.images.length === 0;

    const image = await prisma.image.create({
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        isPrimary,
        order: product.images.length,
        productId,
      },
    });

    res.status(201).json({ success: true, data: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
};

export const deleteProductImage = async (req, res) => {
  try {
    const { imageId } = req.params;

    const image = await prisma.image.findUnique({
      where: { id: imageId },
    });

    if (!image) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }

    await deleteImage(image.publicId);
    await prisma.image.delete({ where: { id: imageId } });

    res.json({ success: true, message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};
