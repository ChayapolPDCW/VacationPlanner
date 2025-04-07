import multer from "multer";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// ===== Globals =====
const APP_DIR = process.cwd();

const STORAGE_UPLOADS = path.resolve(APP_DIR, process.env.STORAGE_UPLOADS);
const STORAGE_UPLOADS_AVATARS = path.resolve(STORAGE_UPLOADS, process.env.STORAGE_UPLOADS_AVATARS);
const STORAGE_UPLOADS_IMAGES = path.resolve(STORAGE_UPLOADS, process.env.STORAGE_UPLOADS_IMAGES);

const appPaths = {
  APP_DIR: APP_DIR,
  STORAGE_UPLOADS: STORAGE_UPLOADS,
  STORAGE_UPLOADS_AVATARS: STORAGE_UPLOADS_AVATARS,
  STORAGE_UPLOADS_IMAGES: STORAGE_UPLOADS_IMAGES,
};

// ===== Storages =====
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(STORAGE_UPLOADS_AVATARS, { recursive: true });
    cb(null, STORAGE_UPLOADS_AVATARS);
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(STORAGE_UPLOADS_IMAGES, { recursive: true });
    cb(null, STORAGE_UPLOADS_IMAGES);
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

// ===== File filters =====
const avatarFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type: only accepts image files"), false);
  }
};

const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type: only accepts image files"), false);
  }
};

// ===== Multer clients =====
const avatarUpload = multer({
  storage: avatarStorage,
  limits: {
    fileSize: process.env.STORAGE_AVATARS_MAX_BYTES
  },
  fileFilter: avatarFileFilter
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: process.env.STORAGE_IMAGES_MAX_BYTES
  },
  fileFilter: imageFileFilter
});

export { appPaths, avatarUpload, imageUpload };
