import { GoogleGenAI, Type } from "@google/genai";

export interface RecognitionResult {
  predicted_herb: string;
  probabilities: { name: string; probability: number }[];
  description: string;
  medicinal_properties: {
    nature: string; // 性味
    meridians: string[]; // 归经
    functions: string[]; // 功效
  };
  usage_instructions: string; // 用法用量
  side_effects: string[]; // 副作用
  contraindications: string[]; // 禁忌
  applications: {
    disease: string;
    combinations: string[];
  }[];
}

export async function recognizeHerb(base64Image: string, mimeType: string): Promise<RecognitionResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("系统未配置 GEMINI_API_KEY，请检查环境变量。");
  }
  
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `你是一个资深的中医药学专家。请深度分析这张图片中的中草药，并提供以下详细信息：
1. predicted_herb: 识别出最可能的药材名称。
2. probabilities: 提供前5种可能性的概率分布（总和为1.0）。
3. description: 充分解释这是什么药材（包括来源、形态特征等详细信息）。
4. medicinal_properties: 详细的药性（性味、归经、功效）。
5. usage_instructions: 详细的用法用量说明。
6. side_effects: 可能的副作用（数组形式）。
7. contraindications: 禁忌（数组形式）。
8. applications: 具体的应用场景：治疗哪些具体的疾病时需要用到它，以及通常和哪些其他药材配伍。

请严格按照JSON格式返回。如果图片不是中草药，请尽力猜测最接近的药材，或者说明无法识别，但必须保持JSON结构完整。`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            predicted_herb: { type: Type.STRING },
            probabilities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  probability: { type: Type.NUMBER },
                },
              },
            },
            description: { type: Type.STRING },
            medicinal_properties: {
              type: Type.OBJECT,
              properties: {
                nature: { type: Type.STRING },
                meridians: { type: Type.ARRAY, items: { type: Type.STRING } },
                functions: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
            },
            usage_instructions: { type: Type.STRING },
            side_effects: { type: Type.ARRAY, items: { type: Type.STRING } },
            contraindications: { type: Type.ARRAY, items: { type: Type.STRING } },
            applications: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  disease: { type: Type.STRING },
                  combinations: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
              },
            },
          },
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("AI 模型未返回任何数据");
    
    return JSON.parse(text) as RecognitionResult;
  } catch (error: any) {
    console.error("Error recognizing herb:", error);
    throw new Error(error.message || "识别过程中发生未知错误");
  }
}
