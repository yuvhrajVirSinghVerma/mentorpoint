import { drive } from "../../connections/drive.config.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "/uploads/"));
  },
  filename: (req, file, cb) => {
    const { originalname } = file;

    cb(null, originalname);
  },
});

export const upload = multer({ storage });
