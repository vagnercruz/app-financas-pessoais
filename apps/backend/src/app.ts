import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 60 * 1000, max: 100 }));

// rota pública de health check
app.get("/health", (_, res) => res.json({ status: "ok" }));

// rotas de autenticação
app.use("/auth", authRoutes);
