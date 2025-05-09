/**
 * The backend server's entrypoint
 */

import "./config/env.js";

import cors from "cors";
import express from "express";
import path from "path";
import router from "./routes/router.js";
import session from "./middlewares/session.js";

// Backend port
const port = process.env.BACKEND_PORT || 5000;

// Backend server
const app = express();

// ===== Middleware =====
// Request object manipulation
app.use(express.json());

// Express >= 4.16 already included JSON parser,
// simply call `express.json()`
// app.use(bodyParser.json());

// Multi-host setup -- we host frontend and backend server separately
// TODO: Set frontend domain name in .env, not here
app.use(
  cors({
    origin: ["http://localhost:3000"], //domain ของ frontend
    // origin: ["http://frontend:3000"], //domain ของ frontend
    credentials: true,
  },
));

// Authentication -- we store user sessions on the backend server,
// within the Redis database -- see ./middlewares/session.js
app.use(session);

// Pass all requests received to the main route handler ./routes/router.js
// For example:
//    1. Given an HTTP request with header:
//        GET /users
//    2. The request would be passed along the handler chain:
//        index.js                                app.use(router);
//        |--> ./routes/router.js                 router.use("/users", users);
//             |--> ./routes/users.js             router.get("/", <handler>);
app.use("/api", router);


// ตั้งค่า static file serving สำหรับไฟล์ที่อัปโหลด
app.use("/uploads", express.static("uploads"));

// เพิ่ม static file serving สำหรับรูปภาพโปรไฟล์
app.use("/avatars", express.static("uploads/avatars"));

// แสดงข้อมูลเส้นทางที่ใช้เพื่อช่วยในการแก้ไขปัญหา
console.log("Static paths:");
console.log("- /uploads -> ", path.resolve(process.cwd(), "uploads"));
console.log("- /avatars -> ", path.resolve(process.cwd(), "uploads/avatars"));

// Start the server
app.listen(port, () => {
  console.log(`Server is running successfully on port ${port}`);
});

// >>>>> Avatars
// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "../uploads/avatars");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });

// <<<<< Avatars

// app.get("/upload", (req, res) => {
//   res.send(`<form action="/upload" method="post" enctype="multipart/form-data">
//   <input type="file" name="avatar" />
//   <input type="submit" value="UPLOAD" class="btn btn-default">
// </form>`);
// });

// app.post("/upload", upload.single("avatar"), (req, res, next) => {
//   let file = req.file;
//   res.send(`File uploaded: ${file.originalname}`);
// });
