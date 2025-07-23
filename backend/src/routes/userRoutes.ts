import { Router } from 'express';
import {
  getUserById,
  deleteUser,
  register,
  login,
  logout,
  getUserOmitPassword,
} from '../controllers/userController.js';
import { authenticator } from '../middleware/authenticator.js';


const router = Router();

router.get('/', authenticator, getUserOmitPassword);
router.post('/register', register);
router.post('/login', login);
router.get('/:id', authenticator, getUserById);
router.delete('/delete', authenticator, deleteUser);
router.post('/logout', logout);

export default router;
