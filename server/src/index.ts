// server/index.js (या app.js)
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Base Route
app.get("/", (req, res) => {
  res.send("🚀 AI-Spark Backend is running!");
});

// API Route
app.get("/api", (req, res) => {
  res.json({ message: "API is working fine 🚀" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
