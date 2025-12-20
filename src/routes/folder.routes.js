import { Router } from "express";
import { ensureAuthenticated } from "../middleware/auth.js";
import prisma from "../config/prisma.js";
import {
  createFolder,
  listFolders,
  deleteFolder
} from "../controllers/folder.controller.js";

const router = Router();

// listar pastas do usuário logado
router.get("/folders/:id", ensureAuthenticated, async (req, res) => {
  const folder = await prisma.folder.findUnique({
    where: { id: req.params.id },
    include: {
      files: true,
      sharedLinks: true,
    },
  });

  res.render("folder", {
    folder,
    user: req.user,
  });
});

// criar nova pasta
router.post("/", ensureAuthenticated, createFolder);

// deletar pasta
router.post("/:id/delete", ensureAuthenticated, deleteFolder);

export default router;