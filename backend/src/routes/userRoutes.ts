import { Router } from 'express';
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  register,
  login,
  logout,
} from '../controllers/userController.js';
import { authenticator } from '../middleware/authenticator.js';


const router = Router();

router.get('/', authenticator, getUsers);
router.post('/register', register);
router.post('/login', login);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/:id', logout);


export default router;
