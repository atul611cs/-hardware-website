import { Router } from "express";
import {
  getAllCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

// Public routes
router.get("/", getAllCategories);
router.get("/:slug", getCategoryBySlug);

// Protected routes (admin only)
router.post("/", protect, createCategory);
router.put("/:id", protect, updateCategory);
router.delete("/:id", protect, deleteCategory);

export default router;
