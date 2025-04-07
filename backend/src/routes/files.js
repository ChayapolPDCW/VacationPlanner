import { Router } from "express";
import path from "path";

import { appPaths, avatarUpload, imageUpload } from "../services/fsService.js";

const router = Router();

router.post("/avatars", avatarUpload.single("avatarFile"), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: "error",
                message: "No file uploaded"
            });
        }

        const url = "/" + path.relative(appPaths.STORAGE_UPLOADS, path.join(req.file.destination, req.file.filename));
        console.log("Avatar saved at: ", url);
        
        res.status(200).json({
            status: "success",
            message: "Avatar file uploaded successfully",
            url: url
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error uploading avatar file",
            error: error.message
        });
    }
});

router.post("/images", imageUpload.single("imageFile"), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: "error",
                message: "No file uploaded"
            });
        }

        const url = "/" + path.relative(appPaths.STORAGE_UPLOADS, path.join(req.file.destination, req.file.filename));
        
        res.status(200).json({
            status: "success",
            message: "Image file uploaded successfully",
            url: url
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error uploading image file",
            error: error.message
        });
    }
});

export default router;
