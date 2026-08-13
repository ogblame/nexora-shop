import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/profile", async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const user = jwt.verify(token, process.env.JWT_SECRET!);
  return res.json(user);
});

export default router;
