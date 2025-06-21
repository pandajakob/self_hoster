import { Router } from 'express';
import { uploadFile } from '../controllers/fileController.js';
import multer from 'multer';
import { Request, Response, NextFunction } from 'express';

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { existsSync, mkdir} from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.body.userId;

    const uploadPath = path.join(__dirname,'..','db', `uploads`, `${userId}`);
    if (!existsSync(uploadPath)) {
        mkdir(uploadPath, ()=>{})
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {cb(null, file.originalname)},
});
const upload = multer({ storage });

const router = Router();

router.post('/upload', upload.single('file'), uploadFile);

export default router;
