import { Router } from "express";
import prisma from "../config/prisma.js";
import { ensureAuthenticated } from "../middleware/auth.js";
import path from "path";

const router = Router();

// Página de detalhes do arquivo
router.get("/files/:id", ensureAuthenticated, async (req, res) => {
  const file = await prisma.file.findUnique({
    where: { id: req.params.id },
  });

  if (!file || file.userId !== req.user.id) {
    return res.redirect("/dashboard");
  }

  res.render("file-details", {
    file,
    user: req.user,
  });
});

// Download do arquivo
router.get("/files/:id/download", ensureAuthenticated, async (req, res) => {
  const file = await prisma.file.findUnique({
    where: { id: req.params.id },
  });

  if (!file || file.userId !== req.user.id || !file.path) {
    return res.redirect("/dashboard");
  }

  res.download(path.resolve(file.path), file.name);
});

export default router;