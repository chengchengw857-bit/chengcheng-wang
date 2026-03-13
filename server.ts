import express from "express";
import multer from "multer";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Initialize Gemini
const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("No API key found (neither API_KEY nor GEMINI_API_KEY is set)");
}
const ai = new GoogleGenAI({ apiKey: apiKey! });

// API routes
app.post("/api/recognize", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded or file too large (max 5MB)" });
  }

  try {
    const base64Image = req.file.buffer.toString("base64");

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: req.file.mimetype,
              data: base64Image,
            },
          },
          {
            text: "Identify this Chinese medicinal herb. Provide its name, properties, functions, and usage in Chinese, English, and Portuguese.",
          },
        ],
      },
    });

    if (!response.text) {
      throw new Error("No response from AI model");
    }

    res.json({ success: true, result: response.text });
  } catch (error: any) {
    console.error("Recognition error:", error);
    res.status(500).json({ error: error.message || "Recognition failed" });
  }
});

// Vite middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
