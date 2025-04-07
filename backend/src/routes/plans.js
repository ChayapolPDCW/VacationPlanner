// TODO:
//  - Implement handlers for personal plans

import { Router } from "express";

// Controllers
import {
  createTravelPlan,
  getAllTravelPlans,
  getTravelPlanById,
  updateTravelPlan,
  deleteTravelPlan,
} from "../controllers/travelPlanController.js";
import {
  createDestination,
  deleteDestination,
} from "../controllers/destinationController.js";

// Middleware
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = Router();

// ===== Handlers =====
router.get("/:id",isAuthenticated, getTravelPlanById);

router.get("/",  getAllTravelPlans);

router.post("/", isAuthenticated,createTravelPlan);

router.put("/:id", isAuthenticated, updateTravelPlan);

router.delete("/:id", isAuthenticated, deleteTravelPlan);

export default router;
