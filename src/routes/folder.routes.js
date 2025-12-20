import { Router } from "express";
import { ensureAuthenticated } from "../middleware/auth.js";
import {
  createFolder,
  listFolders,
  deleteFolder
} from "../controllers/folder.controller.js";

const router = Router();

// listar pastas do usuário logado
router.get("/", ensureAuthenticated, listFolders);

// criar nova pasta
router.post("/", ensureAuthenticated, createFolder);

// deletar pasta
router.post("/:id/delete", ensureAuthenticated, deleteFolder);

export default router;