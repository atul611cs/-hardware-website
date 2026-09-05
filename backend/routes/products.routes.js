import { Router } from "express";
import {
  getAllProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:slug", getProductBySlug);

// Protected routes (admin only)
router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;
