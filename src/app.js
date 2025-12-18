import express from "express";
import sessionMiddleware from "./config/session.js";
import passport from "./config/passport.js";

const app = express();

// middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Servidor rodando 🚀");
});

export default app;