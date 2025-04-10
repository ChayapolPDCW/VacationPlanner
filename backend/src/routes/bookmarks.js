import { Router } from "express";
import {
  createBookmark,
  deleteBookmark,
} from "../controllers/travelPlanController.js";


const router = Router();

// ===== Handlers =====
router.post("/:id/", createBookmark);

router.delete("/:id/", deleteBookmark);

export default router;