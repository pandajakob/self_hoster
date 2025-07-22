import { Router } from 'express';
import {
  getUserById,
  updateUser,
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
router.put('/:id', authenticator, updateUser);
router.delete('/:id', authenticator, deleteUser);
router.post('/logout', logout);

export default router;
