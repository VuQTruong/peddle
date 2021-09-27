import express from 'express';
const router = express.Router();
import { signIn } from '../services/sign-in-service'

router.post('/api/auth/signin', (req, res) =>{
    signIn(req, res);
})

export { router as signinRouter };

