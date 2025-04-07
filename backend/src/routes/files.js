import { Router } from "express";
import path from "node:path";

import upload from "../services/fsService.js";

const router = Router();


router.post('/avatars', upload.single('avatarFile'), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: 'error',
                message: 'No file uploaded'
            });
        }

        const url = path.join(req.file.destination, req.file.filename);
        console.log("Avatar saved at: ", url);
        
        res.status(200).json({
            status: 'success',
            message: 'File uploaded successfully',
            url: url
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error uploading file',
            error: error.message
        });
    }
});


export default router;
