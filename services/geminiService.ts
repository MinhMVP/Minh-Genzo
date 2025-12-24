
import { GoogleGenAI } from "@google/genai";

// Ensure Gemini API is initialized with process.env.API_KEY directly as per guidelines
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askTutor = async (prompt: string, grade: number) => {
  const ai = getAI();
  // Using gemini-3-pro-preview for complex reasoning/tutoring tasks
  const model = 'gemini-3-pro-preview';
  const systemInstruction = `Bạn là một gia sư tiếng Anh giàu kinh nghiệm cho học sinh lớp ${grade} tại Việt Nam. 
  Hãy giải thích các khái niệm ngữ pháp, từ vựng hoặc bài tập một cách dễ hiểu, thân thiện. 
  Nếu học sinh hỏi bằng tiếng Việt, hãy trả lời bằng tiếng Việt kèm các ví dụ tiếng Anh.
  Luôn khuyến khích học sinh.`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
    // Access .text property directly as per guidelines
    return response.text || "Xin lỗi, mình gặp chút trục trặc. Bạn thử hỏi lại nhé!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Có lỗi xảy ra khi kết nối với gia sư AI. Vui lòng thử lại sau.";
  }
};

export const translateText = async (text: string, direction: 'en-vi' | 'vi-en') => {
  const ai = getAI();
  const target = direction === 'en-vi' ? 'Tiếng Việt' : 'Tiếng Anh';
  // Using gemini-3-flash-preview for translation tasks
  const model = 'gemini-3-flash-preview';
  const systemInstruction = `Bạn là chuyên gia dịch thuật. Hãy dịch đoạn văn bản sau sang ${target}. 
  Dịch một cách tự nhiên, đúng ngữ cảnh và giải thích ngắn gọn các từ khó nếu có.`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: text,
      config: { systemInstruction },
    });
    // Access .text property directly as per guidelines
    return response.text || "Không thể dịch đoạn văn này.";
  } catch (error) {
    return "Lỗi dịch thuật. Vui lòng thử lại.";
  }
};
