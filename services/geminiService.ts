
import { GoogleGenAI, Type } from "@google/genai";
import { Category, AgeRange, QuizQuestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateQuizQuestions = async (
  category: Category,
  ageRange: AgeRange
): Promise<QuizQuestion[]> => {
  const prompt = `Generate a set of 5 fun, educational multiple-choice quiz questions for a child aged ${ageRange} in the category of ${category}. 
  The questions should be engaging and educational. Include a fun fact for each question related to the topic.
  Ensure the difficulty is appropriate for a ${ageRange} year old. 
  Occasionally (about 1 in 5 questions) mention something about health, vitamins, or brain power in a subtle, educational way.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctAnswer: { type: Type.STRING },
              explanation: { type: Type.STRING },
              funFact: { type: Type.STRING }
            },
            required: ["question", "options", "correctAnswer", "explanation", "funFact"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw error;
  }
};
