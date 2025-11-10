import Router from 'express';
import {registerUser,getAllUsers,listOfUsers} from '../controllers/register.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', getAllUsers);
router.get('/users', listOfUsers);

export default router;