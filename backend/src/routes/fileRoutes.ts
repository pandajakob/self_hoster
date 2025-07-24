import { Router } from 'express';
import { deleteFile, uploadFile,getAllFiles, upload } from '../controllers/fileController.js';
import { authenticator } from '../middleware/authenticator.js';

const router = Router();

router.get('/', authenticator, getAllFiles);
router.post('/upload', authenticator, upload.single('file'), uploadFile);
router.delete('/delete:fileName', authenticator, deleteFile);

export default router;
