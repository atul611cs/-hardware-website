import { Router } from "express";
import multer from "multer";
import {
  uploadProductImage,
  deleteProductImage,
} from "../controllers/upload.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

const router = Router();

router.post(
  "/product/:productId",
  protect,
  upload.single("image"),
  uploadProductImage,
);
router.delete(
  "/product/:productId/image/:imageId",
  protect,
  deleteProductImage,
);

export default router;
