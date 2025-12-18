import express from "express";

const app = express();

// middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Servidor rodando 🚀");
});

export default app;