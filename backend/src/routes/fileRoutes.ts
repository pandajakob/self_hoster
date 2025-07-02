import { Router } from 'express';
import { deleteFile, uploadFile } from '../controllers/fileController.js';
import multer from 'multer';
import { Request } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { authenticator } from '../middleware/authenticator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    const userId = req.user?.id;
    const uploadPath = path.join(__dirname, '..', 'db', `uploads`, `${userId}`);
    if (!existsSync(uploadPath)) {
      console.log("creating new path, at:", uploadPath);
      mkdirSync(uploadPath,{recursive: true});

    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const router = Router();

router.post('/upload', authenticator, upload.single('file'), uploadFile);
router.delete('/delete', authenticator, upload.single('file'), deleteFile);

export default router;
