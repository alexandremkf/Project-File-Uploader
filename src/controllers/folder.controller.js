import prisma from "../config/prisma.js";

// LISTAR pastas do usuário
export async function listFolders(req, res) {
  const folders = await prisma.folder.findMany({
    where: {
      userId: req.user.id
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  res.render("dashboard", { folders });
}

// CRIAR pasta
export async function createFolder(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.redirect("/dashboard");
  }

  await prisma.folder.create({
    data: {
      name,
      userId: req.user.id
    }
  });

  res.redirect("/dashboard");
}

// DELETAR pasta
export async function deleteFolder(req, res) {
  const { id } = req.params;

  await prisma.folder.delete({
    where: {
      id
    }
  });

  res.redirect("/dashboard");
}
