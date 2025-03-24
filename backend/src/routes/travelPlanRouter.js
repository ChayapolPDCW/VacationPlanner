import { Router } from "express";
import { createTravelPlan, getAllTravelPlans } from "../controllers/travelPlanController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";


const router = Router();
router.get("/getPlan", getAllTravelPlans);
router.post("/createPlan", createTravelPlan);


export default router;