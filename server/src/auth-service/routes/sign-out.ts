import express from 'express';
const router = express.Router();
import { signOut } from '../services/sign-out-service';

router.post('/api/auth/signout', (req, res) =>{
    signOut(req, res);
})
export { router as signoutRouter };


