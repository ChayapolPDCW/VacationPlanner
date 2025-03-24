import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandling from "./middlewares/errorHandler.js";
import bodyParser from "body-parser";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import travelPlanRouter from "./routes/travelPlanRouter.js";
// >>>>> Avatars
import { Router } from "express";
import multer from 'multer';
import path from 'path';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploads/avatars');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// <<<<< Avatars
dotenv.config();

const app = express(); 
const port = process.env.PORT || 5000;

app.get("/upload", (req, res) => {
  res.send(`<form action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" />
  <input type="submit" value="UPLOAD" class="btn btn-default">
</form>`);
});

app.post('/upload', upload.single('avatar'), (req, res, next) => {
    let file = req.file;
    res.send(`File uploaded: ${file.originalname}`);
});

// Middleware
app.use(express.json());
app.use(cors()); 
app.use(bodyParser.json());
//error handling
app.use(errorHandling);
// Routes

app.use(authRouter);
app.use(userRouter);
app.use(travelPlanRouter);
// Upload endpoint



// Error handling middleware 
app.use(errorHandling);

console.log(process.env.DB_HOST);
console.log(process.env.DB_PORT);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
