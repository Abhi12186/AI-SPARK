import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRouter from "./routes/chat";

dotenv.config();

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));

// Health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ ok: true });
});

// All chat routes mounted here
app.use("/api", chatRouter);

const port = Number(process.env.PORT || 5000);

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
