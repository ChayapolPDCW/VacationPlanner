import { Router } from 'express';
import { register, login, check } from '../controllers/authController.js';
import { createTravelPlan, getAllTravelPlans } from '../controllers/travelPlanController.js';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { createBookmark, deleteBookmark } from '../controllers/bookmarkController.js';
import { createDestination, deleteDestination } from '../controllers/destinationController.js';
import { createJournal, deleteJournal, getAllJournals, getJournalsByID, updateJournal } from '../controllers/journalController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

// Auth routes
router.post('/api/auth/register', register);
router.post('/api/auth/login', login);

// Travel plan routes
router.post('/createplan', createTravelPlan);
router.get('/getplans', getAllTravelPlans);

// User routes
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id',authMiddleware, updateUser);
router.delete('/users/:id',authMiddleware, deleteUser);

// Destination routes
router.post('/createdestination', createDestination);
router.delete('/destination/:id', deleteDestination);

// Journal routes
router.post('/createjournal', createJournal);
router.delete('/journal/:id', deleteJournal);
router.get('/journals', getAllJournals);
router.get('/journals/:id', getJournalsByID);
router.put('/journals/:id', updateJournal);

// bookmark routes
router.post('/createbookmark', createBookmark);
router.delete('/bookmark/:id', deleteBookmark);

export default router;
