import { Router } from "express";
import {
  createLikes,
  deleteLikes,
} from "../controllers/travelPlanController.js";

const router = Router();

// ===== Handlers =====
router.post("/:id", createLikes);

router.delete("/:id/", deleteLikes);

export default router;