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

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, "uploads/avatars");
    cb(null, "uploads/avatars");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `avatar-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

export default upload;