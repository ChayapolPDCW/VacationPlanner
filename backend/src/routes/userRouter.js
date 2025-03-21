import { Router } from "express";
import { getAllUsers, createUser ,  updateUser, deleteUser} from "../controllers/userController.js";

const router = Router();

router.get("/users", getAllUsers);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;