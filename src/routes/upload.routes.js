import { Router } from "express";
import upload from "../config/multer.js";
import { ensureAuthenticated } from "../middleware/auth.js";
import prisma from "../config/prisma.js";

const router = Router();

// Form de upload
router.get("/upload", ensureAuthenticated, (req, res) => {
  res.render("upload");
});

// Receber arquivo
router.post(
  "/upload",
  ensureAuthenticated,
  upload.single("file"),
  async (req, res) => {
    await prisma.file.create({
        data: {
            name: req.file.originalname,
            path: req.file.path, 
            size: req.file.size,
            userId: req.user.id,
        },
    });

    res.redirect("/dashboard");
  }
);

export default router;