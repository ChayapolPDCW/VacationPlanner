import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandling from "./middlewares/errorHandler.js";
import bodyParser from "body-parser";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

// >>>>> Avatars
import { Router } from "express";
import lodash from 'lodash';
import path from 'path';
import multer from 'multer';
import AvatarStorage from './helpers/AvatarStorage.js';

const router = Router();
// <<<<< Avatars

dotenv.config();

const app = express(); 
const port = process.env.PORT || 5000;

app.get("/home", (req, res) => {
  res.send(`<form action="/upload" method="POST" enctype="multipart/form-data">
    <legend>Upload Avatar</legend>
    <input type="file" name="${process.env.AVATAR_FIELD}">
    <button type="submit" class="btn btn-primary">Upload</button>
</form>`);
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



// >>>>> Avatars
var storage = AvatarStorage();

var fileFilter = function (req, file, cb) {
    // Supported image file mimetypes
    var allowedMimes = ['image/jpeg', 'image/png'];

    if (lodash.includes(allowedMimes, file.mimetype)) {
        // Allow supported image files
        cb(null, true);
    } else {
        // Throw error for invalid files
        cb(new Error('Invalid file type.'));
    }
};

const upload = multer({
  dest: process.env.AVATAR_STORAGE,
  storage: storage,
  fileFilter: fileFilter,
});

app.post('/upload', upload.single(process.env.AVATAR_FIELD), function (req, res, next) {
  var files;
  var file = req.file.filename;

  files = [file];

  files = lodash.map(files, function (file) {
      var port = req.app.get('port');
      var base = req.protocol + '://' + req.hostname + (port ? ':' + port : '');
      var url = path.join(req.file.baseUrl, file).replace(/[\\\/]+/g, '/').replace(/^[\/]+/g, '');

      console.log("base: " + base);

      return (req.file.storage == 'local' ? base : '') + '/' + url;
  });

  res.json({
      images: files
  });
});
// <<<<< Avatars

// Error handling middleware 
app.use(errorHandling);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
