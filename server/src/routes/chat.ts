import { Router, Request, Response } from "express";
import { callOpenAI } from "../providers/openai";
import { callXAI } from "../providers/xai";
import { callGemini } from "../providers/gemini";

const router = Router();

// ChatGPT endpoint
router.post("/chatgpt", async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const result = await callOpenAI(
      [{ role: "user", content: message }],
      process.env.OPENAI_MODEL
    );
    res.json({ reply: result.text });
  } catch (err: any) {
    console.error("ChatGPT error:", err);
    res.status(500).json({ error: "Failed to contact ChatGPT" });
  }
});

// Gemini endpoint
router.post("/gemini", async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const result = await callGemini(
      [{ role: "user", content: message }],
      process.env.GEMINI_MODEL
    );
    res.json({ reply: result.text });
  } catch (err: any) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Failed to contact Gemini" });
  }
});

// Grok (xAI) endpoint
router.post("/grok", async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const result = await callXAI(
      [{ role: "user", content: message }],
      process.env.XAI_MODEL
    );
    res.json({ reply: result.text });
  } catch (err: any) {
    console.error("Grok error:", err);
    res.status(500).json({ error: "Failed to contact Grok" });
  }
});

export default router;
