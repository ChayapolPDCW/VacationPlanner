import express from "express";
import { Router } from "express";

// Controllers
import { register, login, logout, checkSession } from "../controllers/authController.js";

// Middleware
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = Router();

// ===== Handlers =====
router.post("/register", register);

router.post("/login", login);

router.post("/logout", isAuthenticated, logout);

router.post("/check", isAuthenticated, (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Authenticated",
  });
});

router.get("/check-session", isAuthenticated, checkSession);

export default router;
