import express from 'express';
import { createUser, authSignin } from '../controllers/user';

const router = express.Router();

// users Routes

router.post('/auth/signup', createUser);
router.post('/auth/signin', authSignin);

export default router;
