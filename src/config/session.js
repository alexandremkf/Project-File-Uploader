import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import prisma from "./prisma.js";

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "supersecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 dia
  },
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000, // limpa sessões expiradas
  }),
});

export default sessionMiddleware;