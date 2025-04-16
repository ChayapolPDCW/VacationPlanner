import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { validateUpdateUser, validateUpdatePassword } from "../middlewares/validationMiddleware.js";

// นำเข้า multer สำหรับจัดการการอัปโหลดไฟล์
import { avatarUpload, imageUpload } from "../services/fsService.js";

// Controllers
import {
  getAllUsers,
  getUserById,
  updateUserInfo,
  deleteUser,
  updatePassword,
  getUserProfile,
  updateUserProfile,
  uploadUserAvatar,
} from "../controllers/userController.js";

const router = Router();


router.get("/profile", isAuthenticated, getUserProfile);

router.put("/profile", isAuthenticated, updateUserProfile);

router.post("/avatar", isAuthenticated, avatarUpload.single('avatar'), uploadUserAvatar);


router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.put("/:id", validateUpdateUser, updateUserInfo);

router.put("/:id/password", validateUpdatePassword, updatePassword);

router.delete("/:id", deleteUser);

export default router;
