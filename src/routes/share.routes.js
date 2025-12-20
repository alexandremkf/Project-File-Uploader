import { Router } from "express";
import crypto from "crypto";
import prisma from "../config/prisma.js";
import { ensureAuthenticated } from "../middleware/auth.js";

const router = Router();

router.get("/share/:token", async (req, res) => {
  const { token } = req.params;

  const shared = await prisma.sharedFolder.findUnique({
    where: { token },
    include: {
      folder: {
        include: {
          files: true,
        },
      },
    },
  });

  if (!shared) {
    return res.status(404).send("Link inválido ou inexistente");
  }

  if (shared.expiresAt < new Date()) {
    return res.status(410).send("Este link expirou");
  }

  res.render("shared-folder", {
    folder: shared.folder,
    expiresAt: shared.expiresAt,
  });
});

router.post(
  "/folders/:id/share",
  ensureAuthenticated,
  async (req, res) => {
    const { id } = req.params;
    const { duration } = req.body;

    // converter duração para data de expiração
    let expiresAt = new Date();

    switch (duration) {
      case "1d":
        expiresAt.setDate(expiresAt.getDate() + 1);
        break;
      case "7d":
        expiresAt.setDate(expiresAt.getDate() + 7);
        break;
      case "30d":
        expiresAt.setDate(expiresAt.getDate() + 30);
        break;
      default:
        expiresAt.setDate(expiresAt.getDate() + 1);
    }

    const token = crypto.randomUUID();

    await prisma.sharedFolder.create({
      data: {
        token,
        expiresAt,
        folderId: id,
      },
    });

    res.redirect(`/folders/${id}`);
  }
);

export default router;