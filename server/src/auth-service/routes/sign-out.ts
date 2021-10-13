import express from 'express';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
const router = express.Router();

router.post('/api/auth/signout',currentUser, (req, res) =>{
  req.session = null;
  
  res.send({"status": 200, "message": "user signed out"});
})
export { router as signoutRouter };
