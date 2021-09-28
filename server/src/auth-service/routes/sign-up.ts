import express from 'express';
const router = express.Router();
import { signUp } from '../services/sign-up-service';

router.post('/api/auth/signup', (req, res) =>{
    signUp(req, res);
})

export { router as signUpRouter };