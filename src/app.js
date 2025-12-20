import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import sessionMiddleware from "./config/session.js";
import passport from "./config/passport.js";

import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import folderRoutes from "./routes/folder.routes.js";
import fileRoutes from "./routes/files.routes.js";
import shareRoutes from "./routes/share.routes.js";

const app = express();

/* =========================
   CONFIGURAÇÃO DE PATH
   (necessário para ES Modules)
========================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =========================
   VIEW ENGINE (EJS)
========================= */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* =========================
   MIDDLEWARES BÁSICOS
========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   SESSÃO + PASSPORT
========================= */
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

/* =========================
   ROTAS
========================= */
app.use(authRoutes);
app.use(dashboardRoutes);
app.use(uploadRoutes);
app.use(folderRoutes);
app.use(fileRoutes);
app.use(shareRoutes);

/* =========================
   Estilo
========================= */
app.use(express.static("src/public"));

/* =========================
   ROTA PRINCIPAL
========================= */
app.get("/", (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return res.redirect("/dashboard");
  }

  return res.redirect("/login");
});

/* =========================
   porta
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;