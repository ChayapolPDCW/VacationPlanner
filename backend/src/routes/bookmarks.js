import { Router } from "express";
import {
  createBookmark,
  deleteBookmark,
} from "../controllers/travelPlanController.js";


const router = Router();

// ===== Handlers =====
router.post("/:id/:travelPlanId", createBookmark);

router.delete("/:id/:travelPlanId", deleteBookmark);

export default router;