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
   ROTA TESTE
========================= */
app.get("/", (req, res) => {
  res.send("Servidor rodando 🚀");
});

export default app;