import { Router } from "express";
import { ensureAuthenticated } from "../middleware/auth.js";
import prisma from "../config/prisma.js";

const router = Router();

// Dashboard
router.get("/dashboard", ensureAuthenticated, async (req, res) => {
  // Pastas do usuário
  const folders = await prisma.folder.findMany({
    where: {
      userId: req.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Arquivos que NÃO estão dentro de pastas
  const files = await prisma.file.findMany({
    where: {
      userId: req.user.id,
      folderId: null,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  res.render("dashboard", {
    user: req.user,
    folders,
    files,
  });
});

export default router;