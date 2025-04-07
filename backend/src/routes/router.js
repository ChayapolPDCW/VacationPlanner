/**
 * The main route handler.
 *
 * This module delegates requests to their corresponding handlers matched the path prefix.
 */

// Dependencies
import { Router } from "express";

// Route handlers
import auth from "./auth.js";
import bookmarks from "./bookmarks.js";
import files from "./files.js";
import journals from "./journals.js";
import plans from "./plans.js";
import users from "./users.js";
import likes from "./likes.js";
import destinationAttachment from "./destinationAttachment.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

import upload from '../services/fsService.js';

// The main route handler
const router = Router();

// Pass the request to their corresponding handlers
router.use("/auth", auth);
router.use("/bookmarks", isAuthenticated, bookmarks);
router.use("/files", files);
router.use("/likes", isAuthenticated, likes);
router.use("/journals", journals);
router.use("/plans", plans);
router.use("/users",isAuthenticated, users);
router.use("/attachments", destinationAttachment)


export default router;

// MOVED TO ./auth.js
// router.post('/api/auth/register', register);
// router.post('/api/auth/login', login);
// router.post('/api/auth/check', isAuthenticated, (req, res) => {
//     res.status(200).json({
//         status: "success",
//         message: "Authenticated",
//     })
// });

// Travel plan routes

// User routes

// MOVED TO ./users.js
// router.get('/users', getAllUsers);
// router.get('/users/:id', getUserById);
// router.put('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);

// Journal routes
// router.post('/journals/:id/', isAuthenticated,createJournal);
// router.delete('/journals/:id/',isAuthenticated, deleteJournal);
// router.get('/journals', getAllJournals);
// router.get('/journals/:id',isAuthenticated, getJournalsByID);
// router.put('/journals/:id',isAuthenticated, updateJournal);

// bookmark routes
// router.post('/bookmarks/:id/:travelPlanId',isAuthenticated, createBookmark);
// router.delete('/bookmarks/:id/:travelPlanId', deleteBookmark);
