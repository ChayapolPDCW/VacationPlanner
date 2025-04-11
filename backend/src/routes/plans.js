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
  getUserTravelPlans,
  getUserBookmarks,
} from "../controllers/travelPlanController.js";
import {
  createDestination,
  deleteDestination,
} from "../controllers/destinationController.js";

// Middleware
import { isAuthenticated } from "../middlewares/authMiddleware.js";


const router = Router();

// ===== Handlers =====

router.get("/bookmarks", isAuthenticated, getUserBookmarks);

router.get("/user", isAuthenticated, getUserTravelPlans);

router.get("/", getAllTravelPlans);

// router.get("/:id", getTravelPlanById);

router.get("/:id", isAuthenticated, getTravelPlanById);

router.post("/", isAuthenticated, createTravelPlan);

router.put("/:id", isAuthenticated, updateTravelPlan);

router.delete("/:id", isAuthenticated, deleteTravelPlan);

export default router;
