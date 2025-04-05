import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { validateUpdateUser, validateUpdatePassword } from "../middlewares/validationMiddleware.js";

// Controllers
import {
  getAllUsers,
  getUserById,
  updateUserInfo,
  deleteUser,
  updatePassword,
} from "../controllers/userController.js";

const router = Router();

// ===== Handlers =====
router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.put("/:id", validateUpdateUser, updateUserInfo);

router.put("/:id/password", validateUpdatePassword, updatePassword);

router.delete("/:id", deleteUser);

export default router;
