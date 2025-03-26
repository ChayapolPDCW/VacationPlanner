import { Router } from "express";
import { register, login, check } from "../controllers/authController.js";
const router = Router();

// POST /api/auth/register
router.post("/register", register);


router.post("/login", login);


router.post("/check", check);

export default router;  