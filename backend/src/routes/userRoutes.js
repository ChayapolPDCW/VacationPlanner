import express from "express";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.js";
import validateUser from "../middlewares/inputValidator.js";

const router = express.Router();

// Create new user
router.post("/", validateUser, createUser);

// Get all users
router.get("/", getAllUsers);

// Get user by ID
router.get("/:id", getUserById);

// Update user
router.put("/:id", validateUser, updateUser);

// Delete user
router.delete("/:id", deleteUser);

export default router;