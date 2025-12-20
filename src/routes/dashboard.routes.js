import { Router } from "express";
import { ensureAuthenticated } from "../middleware/auth.js";
import prisma from "../config/prisma.js";

const router = Router();

router.get("/dashboard", ensureAuthenticated, async (req, res) => {
  const files = await prisma.file.findMany({
    where: { userId: req.user.id },
  });

  res.render("dashboard", {
    user: req.user,
    files,
  });
});

export default router;