import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.get("/profile", requireAuth, async (req, res) => {
  return res.json({
    message: "Authorized",
  });
});

export default router;
