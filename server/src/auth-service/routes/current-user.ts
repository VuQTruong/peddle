import express from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { currentUser  } from '../services/current-user-service';
const router = express.Router();

router.get('/api/auth/currentuser', requireAuth, (req, res) =>{
    currentUser(req, res);
});

export { router as currentUserRouter };


