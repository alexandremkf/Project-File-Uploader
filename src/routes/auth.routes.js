import { Router } from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import prisma from "../config/prisma.js";

const router = Router();

// Tela de registro
router.get("/register", (req, res) => {
  res.render("register");
});

// POST REGISTER
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  res.redirect("/login");
});

// Tela de login
router.get("/login", (req, res) => {
  res.render("login");
});

// Login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })
);

// Logout
router.get("/logout", (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect("/login");
  });
});

export default router;