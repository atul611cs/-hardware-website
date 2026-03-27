import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// routes (we'll create these next)
// import productRoutes from './routes/products.routes.js'
// import categoryRoutes from './routes/categories.routes.js'
// import inquiryRoutes from './routes/inquiry.routes.js'
// import authRoutes from './routes/auth.routes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: "http://localhost:5173", // Vite dev server
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ───────────────────────────────────────────────────────────────────
// app.use('/api/products', productRoutes)
// app.use('/api/categories', categoryRoutes)
// app.use('/api/inquiries', inquiryRoutes)
// app.use('/api/auth', authRoutes)

// ── Health check ─────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// ── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
