import { VercelRequest, VercelResponse } from '@vercel/node';
import Busboy from 'busboy';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("GEMINI_API_KEY exists:", !!process.env.GEMINI_API_KEY);
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const busboy = Busboy({ headers: req.headers, limits: { fileSize: 5 * 1024 * 1024 } });
  let fileBuffer: Buffer | null = null;
  let mimeType = '';

  busboy.on('file', (fieldname, file, info) => {
    const chunks: Buffer[] = [];
    file.on('data', (chunk) => chunks.push(chunk));
    file.on('end', () => {
      fileBuffer = Buffer.concat(chunks);
      mimeType = info.mimeType;
    });
  });

  busboy.on('finish', async () => {
    if (!fileBuffer) {
      return res.status(400).json({ error: 'No image uploaded or file too large (max 5MB)' });
    }

    try {
      const base64Image = fileBuffer.toString("base64");

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: mimeType,
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

  req.pipe(busboy);
}
