import { Router } from "express";
import { getAllUsers, updateUser, deleteUser} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";



const router = Router();
router.get("/users", getAllUsers);
router.put("/users/:id", authMiddleware, updateUser);
router.delete("/users/:id", authMiddleware, deleteUser);

export default router;