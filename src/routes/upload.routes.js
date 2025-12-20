import { Router } from "express";
import multer from "multer";
import prisma from "../config/prisma.js";
import { ensureAuthenticated } from "../middleware/auth.js";

const router = Router();

// Config do multer
const upload = multer({
  dest: "uploads/",
});

router.post(
  "/upload",
  ensureAuthenticated,
  upload.single("file"),
  async (req, res) => {
    const { file } = req;
    const { folderId } = req.body;

    console.log("folderId recebido:", folderId);
    
    if (!file) {
      return res.redirect("/dashboard");
    }

    await prisma.file.create({
      data: {
        name: file.originalname,
        path: file.path,
        size: file.size,
        userId: req.user.id,
        folderId: folderId || null,
      },
    });

    if (folderId) {
    return res.redirect(`/folders/${folderId}`);
    }

    res.redirect("/dashboard");
  }
);

export default router;