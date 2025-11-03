import Router from 'express';
import {registerUser,getAllUsers} from '../controllers/register.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', getAllUsers);

export default router;