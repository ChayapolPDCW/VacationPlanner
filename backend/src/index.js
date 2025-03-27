import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandling from "./middlewares/errorHandler.js";
import bodyParser from "body-parser";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import travelPlanRouter from "./routes/travelPlanRouter.js";
// >>>>> Avatars
import multer from "multer";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Configure multer for avatar uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/avatars"); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// Middleware
app.use(cors());
app.use(express.json()); // This replaces bodyParser.json()
app.use(express.static("uploads")); // Serve static files from the uploads directory

// Routes
app.use("/api/auth", authRouter); // Mount authRouter at /api/auth
app.use("/api/users", userRouter); // Mount userRouter at /api/users
app.use("/api/plans", travelPlanRouter); // Mount travelPlanRouter at /api/plans

// Upload endpoint for avatars
app.get("/upload", (req, res) => {
    res.send(`<form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="avatar" />
    <input type="submit" value="UPLOAD" class="btn btn-default">
</form>`);
});

app.post("/upload", upload.single("avatar"), (req, res, next) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send("No file uploaded.");
    }
    res.send(`File uploaded: ${file.originalname}`);
});

// Error handling middleware (should be the last middleware)
app.use(errorHandling);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log("DB_HOST:", process.env.DB_HOST);
    console.log("DB_PORT:", process.env.DB_PORT);
});