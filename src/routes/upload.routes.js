import { Router } from "express";
import prisma from "../config/prisma.js";
import upload from "../config/multer.js";
import { ensureAuthenticated } from "../middleware/auth.js";

const router = Router();

router.post(
  "/upload",
  ensureAuthenticated,
  (req, res) => {
    upload.single("file")(req, res, async (err) => {
      const { folderId } = req.body;

      if (err) {
        return res.render("dashboard", {
          user: req.user,
          folders: [],
          files: [],
          error: err.message,
        });
      }

      if (!req.file) {
        return res.render("dashboard", {
          user: req.user,
          folders: [],
          files: [],
          error: "Nenhum arquivo enviado",
        });
      }

      const file = req.file;

      console.log("folderId recebido:", folderId);

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
    });
  }
);

export default router;