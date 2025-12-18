import { Router } from "express";
import { ensureAuthenticated } from "../middleware/auth.js";

const router = Router();

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.send(`Bem-vindo, ${req.user.username}`);
});

export default router;