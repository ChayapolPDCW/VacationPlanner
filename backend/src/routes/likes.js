import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js"
import {
  createLikes,
  deleteLikes,
} from "../controllers/travelPlanController.js";

const router = Router();

// ===== Handlers =====
router.post("/:id", isAuthenticated, createLikes);

router.delete("/:id", isAuthenticated, deleteLikes);

export default router;