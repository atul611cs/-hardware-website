import { Router } from "express";
import {
  createInquiry,
  getAllInquiries,
  updateInquiryStatus,
} from "../controllers/inquiry.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

// Public route — anyone can submit an inquiry
router.post("/", createInquiry);

// Protected routes — admin only
router.get("/", protect, getAllInquiries);
router.put("/:id/status", protect, updateInquiryStatus);

export default router;
