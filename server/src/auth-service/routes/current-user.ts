import express from "express";
import { currentUser } from "../../middlewares/current-user";
const router = express.Router();

router.get("/api/auth/currentuser", currentUser, (req, res) => {
  res.send({
    status: 200,
    message: "Sucess",
    data: {
      currentUser: req.currentUser || null,
    },
  });
});

export { router as currentUserRouter };
