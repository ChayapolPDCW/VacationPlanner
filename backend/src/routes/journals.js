import { Router } from "express";
import {
  createJournal,
  deleteJournal,
  getAllJournals,
  getJournalsByID,
  updateJournal,
} from "../controllers/travelPlanController.js";

import { isAuthenticated } from "../middlewares/authMiddleware.js";
import {
  validateCreateTravelPlan,
  validateCreateJournal,
  validateUpdateJournal
} from "../middlewares/validationMiddleware.js";

const router = Router();

// ===== Handlers =====
router.post("/:id",isAuthenticated, createJournal);

router.get("/", getAllJournals);

router.get("/:id",isAuthenticated, getJournalsByID);

router.put("/:id",isAuthenticated, validateUpdateJournal, updateJournal);

router.delete("/:id",isAuthenticated, deleteJournal);

export default router;
