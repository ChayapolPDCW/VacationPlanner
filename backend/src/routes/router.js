import { Router } from 'express';
import { register, login, check } from '../controllers/authController.js';
import { createTravelPlan, getAllTravelPlans } from '../controllers/travelPlanController.js';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.get('/check', check);

// Travel plan routes
router.post('/plans', createTravelPlan);
router.get('/plans', getAllTravelPlans);

// User routes
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id',authMiddleware, updateUser);
router.delete('/users/:id',authMiddleware, deleteUser);

export default router;